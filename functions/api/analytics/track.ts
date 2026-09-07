// Cloudflare Pages Function: POST /api/analytics/track
// Records a real visit event into KV for persistent analytics.

interface Env {
  PIMX_VISITS: KVNamespace;
}

interface TrackPayload {
  deviceType?: string;
  page?: string;
  action?: string;
}

interface VisitRecord {
  timestamp: number;
  ip: string;
  country: string;
  city: string;
  deviceType: string;
  page: string;
  action: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    // Ensure KV binding exists
    if (!env.PIMX_VISITS) {
      return new Response(
        JSON.stringify({ error: 'KV namespace not bound. Bind PIMX_VISITS in Cloudflare Pages settings.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- Get real IP from Cloudflare headers ---
    const ip =
      request.headers.get('CF-Connecting-IP') ||
      (request.headers.get('X-Forwarded-For') || '').split(',')[0].trim() ||
      'unknown';

    // --- Rate limit: one record per IP per 10 minutes ---
    const rateLimitKey = `rate:${ip}`;
    const rateLimited = await env.PIMX_VISITS.get(rateLimitKey);
    if (rateLimited) {
      return new Response(JSON.stringify({ ok: true, rateLimited: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    // Set 10-minute TTL rate limit flag
    await env.PIMX_VISITS.put(rateLimitKey, '1', { expirationTtl: 600 });

    // --- Get real location from Cloudflare headers ---
    const country = request.headers.get('CF-IPCountry') || 'Unknown';
    const city = (request as any).cf?.city || '';

    // --- Get real device type from User-Agent (server-side) ---
    const ua = request.headers.get('User-Agent') || '';
    let deviceType = 'Desktop';
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      deviceType = 'Tablet';
    } else if (/Mobile|iP(hone|od)|Android(?!.*Tablet)|BlackBerry|IEMobile|Kindle|Silk-Accent/i.test(ua)) {
      deviceType = 'Mobile';
    }

    // Allow client override (client UA detection can be more accurate in edge cases)
    let body: TrackPayload = {};
    try {
      body = await request.json();
    } catch { /* ignore parse errors */ }

    if (body.deviceType && ['Desktop', 'Mobile', 'Tablet'].includes(body.deviceType)) {
      deviceType = body.deviceType;
    }

    const page = body.page || '/';
    const action = body.action || 'visit';
    const now = Date.now();

    // --- Map country code to full name ---
    const countryNames: Record<string, string> = {
      IR: 'Iran', US: 'United States', DE: 'Germany', GB: 'United Kingdom',
      FR: 'France', CA: 'Canada', AU: 'Australia', NL: 'Netherlands',
      SE: 'Sweden', NO: 'Norway', TR: 'Turkey', AE: 'UAE', SA: 'Saudi Arabia',
      IN: 'India', CN: 'China', JP: 'Japan', RU: 'Russia', BR: 'Brazil',
      PL: 'Poland', UA: 'Ukraine', IT: 'Italy', ES: 'Spain', KR: 'South Korea',
      SG: 'Singapore', HK: 'Hong Kong', CH: 'Switzerland', AT: 'Austria',
      FI: 'Finland', DK: 'Denmark', BE: 'Belgium', PT: 'Portugal',
      MX: 'Mexico', AR: 'Argentina', ZA: 'South Africa', NG: 'Nigeria',
      EG: 'Egypt', PK: 'Pakistan', BD: 'Bangladesh', ID: 'Indonesia',
      TH: 'Thailand', VN: 'Vietnam', MY: 'Malaysia', PH: 'Philippines',
      T1: 'Tor/VPN', XX: 'Unknown',
    };
    const countryCode = (country || 'Unknown').toUpperCase();
    const countryLabel = countryNames[countryCode] || countryCode;

    // --- Build visit record ---
    const visitRecord: VisitRecord = {
      timestamp: now,
      ip: ip === 'unknown' ? '' : ip,
      country: countryLabel,
      city,
      deviceType,
      page,
      action,
    };

    // --- Store in KV as daily list: key = visits:YYYY-MM-DD ---
    const today = new Date().toISOString().slice(0, 10);
    const listKey = `visits:${today}`;

    const existingData = await env.PIMX_VISITS.get(listKey);
    const visits: VisitRecord[] = existingData ? JSON.parse(existingData) : [];

    if (visits.length < 10000) {
      visits.push(visitRecord);
      // Keep each day's data for 90 days
      await env.PIMX_VISITS.put(listKey, JSON.stringify(visits), {
        expirationTtl: 90 * 24 * 60 * 60,
      });
    }

    return new Response(JSON.stringify({ ok: true, rateLimited: false, country: countryLabel, deviceType }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error', details: String(err) }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
