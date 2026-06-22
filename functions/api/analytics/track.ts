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
// Cloudflare Pages Function: POST /api/analytics/track
// Records a real visit event into D1 database for persistent analytics.

interface Env {
  PIMX_VISITS: D1Database;
}

interface TrackPayload {
  deviceType?: string;
  page?: string;
  action?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    // Ensure D1 binding exists
    if (!env.PIMX_VISITS) {
      return new Response(JSON.stringify({ error: 'D1 database not bound. Bind PIMX_VISITS in Cloudflare Pages settings.' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // --- Auto-initialize table if it doesn't exist ---
    await env.PIMX_VISITS.exec(`
      CREATE TABLE IF NOT EXISTS visits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp INTEGER NOT NULL,
        ip TEXT,
        country TEXT,
        city TEXT,
        device_type TEXT,
        user_agent TEXT,
        page TEXT,
        action TEXT
      )
    `);

    await env.PIMX_VISITS.exec(`
      CREATE TABLE IF NOT EXISTS rate_limits (
        ip TEXT PRIMARY KEY,
        last_visit INTEGER NOT NULL
      )
    `);

    // --- Get real IP from Cloudflare headers ---
    const ip =
      request.headers.get('CF-Connecting-IP') ||
      (request.headers.get('X-Forwarded-For') || '').split(',')[0].trim() ||
      'unknown';

    // --- Rate limit: one record per IP per 10 minutes ---
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    const existing = await env.PIMX_VISITS.prepare(
      'SELECT last_visit FROM rate_limits WHERE ip = ?'
    ).bind(ip).first<{ last_visit: number }>();

    if (existing && existing.last_visit > tenMinutesAgo) {
      return new Response(JSON.stringify({ ok: true, rateLimited: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Upsert rate limit record
    await env.PIMX_VISITS.prepare(
      'INSERT INTO rate_limits (ip, last_visit) VALUES (?, ?) ON CONFLICT(ip) DO UPDATE SET last_visit = excluded.last_visit'
    ).bind(ip, Date.now()).run();

    // --- Get real location from Cloudflare headers ---
    // CF-IPCountry is automatically set by Cloudflare with the 2-letter country code
    const country = request.headers.get('CF-IPCountry') || 'Unknown';
    const city = (request as any).cf?.city || '';

    // --- Get real device type from User-Agent ---
    const ua = request.headers.get('User-Agent') || '';
    let deviceType = 'Desktop';
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      deviceType = 'Tablet';
    } else if (/Mobile|iP(hone|od)|Android(?!.*Tablet)|BlackBerry|IEMobile|Kindle|Silk-Accent/i.test(ua)) {
      deviceType = 'Mobile';
    }

    // Allow override from client if provided (client-side detection is more accurate for some edge cases)
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

    // --- Insert visit record into D1 ---
    await env.PIMX_VISITS.prepare(
      'INSERT INTO visits (timestamp, ip, country, city, device_type, user_agent, page, action) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(now, ip, country, city, deviceType, ua.slice(0, 300), page, action).run();

    return new Response(JSON.stringify({ ok: true, rateLimited: false, country, deviceType }), {
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
// Cloudflare Pages Function: POST /api/analytics/track
// Records a real visit event into KV for analytics.

interface Env {
  EVENTS_DB: KVNamespace;
}

interface TrackPayload {
  deviceType: string;
  location: string;
  page?: string;
  action?: string;
}

// Rate-limit tracking per IP: one record per visitor per 5 minutes
async function shouldRecord(c: ExecutionContext, env: Env, ip: string): Promise<boolean> {
  const key = `rate:${ip}`;
  const existing = await env.EVENTS_DB.get(key);
  if (existing) return false;

  // Set a 5-minute TTL rate-limit flag
  await env.EVENTS_DB.put(key, '1', { expirationTtl: 300 });
  return true;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    // Simple auth check - only accept requests from our own site
    const origin = request.headers.get('Origin') || '';
    const referer = request.headers.get('Referer') || '';
    const siteUrl = new URL(request.url).origin;

    // In production, accept from self or known origins
    const isLocal = siteUrl.includes('localhost') || siteUrl.includes('127.0.0.1');
    const isSameOrigin = origin === siteUrl || referer.startsWith(siteUrl);

    if (!isLocal && !isSameOrigin) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get client IP
    const ip =
      (request.headers.get('CF-Connecting-IP') as string) ||
      (request.headers.get('X-Forwarded-For') as string)?.split(',')[0]?.trim() ||
      'unknown';

    // Parse body
    const body: TrackPayload = await request.json();
    const deviceType = body.deviceType || 'Desktop';
    const location = body.location || 'Unknown';
    const page = body.page || '/';
    const action = body.action || 'visit';

    // Rate limit per IP
    const canRecord = await shouldRecord(context, env, ip);
    if (!canRecord) {
      return new Response(JSON.stringify({ ok: true, rateLimited: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Create the visit record
    const visitRecord = {
      timestamp: Date.now(),
      deviceType,
      location,
      page,
      action,
      ip: ip === 'unknown' ? '' : ip,
    };

    // Store in KV as a daily list for efficient retrieval
    // Key format: visits:YYYY-MM-DD
    const today = new Date().toISOString().slice(0, 10);
    const listKey = `visits:${today}`;

    // Append to the list (max 10000 per day)
    const existingData = await env.EVENTS_DB.get(listKey);
    const visits: typeof visitRecord[] = existingData ? JSON.parse(existingData) : [];

    if (visits.length < 10000) {
      visits.push(visitRecord);
      // Store with TTL of 90 days to avoid unbounded storage
      await env.EVENTS_DB.put(listKey, JSON.stringify(visits), {
        expirationTtl: 90 * 24 * 60 * 60, // 90 days
      });
    }

    return new Response(JSON.stringify({ ok: true, rateLimited: false }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
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
