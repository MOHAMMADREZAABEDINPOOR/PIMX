// Cloudflare Pages Function: GET /api/analytics/stats
// Returns aggregated real analytics data from KV for the admin dashboard.

interface Env {
  PIMX_VISITS: KVNamespace;
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

interface StatsResponse {
  totalVisits: number;
  todayVisits: number;
  deviceShare: { label: string; count: number; percentage: number }[];
  locations: { label: string; count: number; percentage: number }[];
  dailyStats: { date: string; count: number }[];
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  try {
    // Ensure KV binding exists
    if (!env.PIMX_VISITS) {
      return new Response(
        JSON.stringify({ error: 'KV namespace not bound. Bind PIMX_VISITS in Cloudflare Pages settings.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);
    const allVisits: VisitRecord[] = [];
    const dailyStats: { date: string; count: number }[] = [];

    // Scan last 30 days
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().slice(0, 10);

      const data = await env.PIMX_VISITS.get(`visits:${dateKey}`);
      if (data) {
        const dayVisits: VisitRecord[] = JSON.parse(data);
        allVisits.push(...dayVisits);
        dailyStats.push({ date: dateKey, count: dayVisits.length });
      } else {
        dailyStats.push({ date: dateKey, count: 0 });
      }
    }

    // --- Total & today ---
    const totalVisits = allVisits.length;
    const todayVisits = allVisits.filter(
      (v) => new Date(v.timestamp).toISOString().slice(0, 10) === todayKey
    ).length;

    // --- Device breakdown ---
    const deviceCounts: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };
    allVisits.forEach((v) => {
      const dt = v.deviceType || 'Desktop';
      if (deviceCounts[dt] !== undefined) {
        deviceCounts[dt]++;
      } else {
        deviceCounts['Desktop']++;
      }
    });

    const totalDevice = totalVisits || 1;
    const deviceShare = Object.entries(deviceCounts)
      .map(([label, count]) => ({
        label,
        count,
        percentage: parseFloat(((count / totalDevice) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.count - a.count);

    // --- Location breakdown ---
    const locationCounts: Record<string, number> = {};
    allVisits.forEach((v) => {
      const loc = v.country || 'Unknown';
      locationCounts[loc] = (locationCounts[loc] || 0) + 1;
    });

    const totalLocation = totalVisits || 1;
    const locations = Object.entries(locationCounts)
      .map(([label, count]) => ({
        label,
        count,
        percentage: parseFloat(((count / totalLocation) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    const response: StatsResponse = {
      totalVisits,
      todayVisits,
      deviceShare,
      locations,
      dailyStats: dailyStats.reverse(), // oldest → newest
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Failed to load analytics', details: String(err) }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
// Cloudflare Pages Function: GET /api/analytics/stats
// Returns aggregated real analytics data from D1 for the admin dashboard.

interface Env {
  PIMX_VISITS: D1Database;
}

interface VisitRow {
  timestamp: number;
  device_type: string;
  country: string;
  city: string;
  page: string;
  action: string;
}

interface StatsResponse {
  totalVisits: number;
  todayVisits: number;
  deviceShare: { label: string; count: number; percentage: number }[];
  locations: { label: string; count: number; percentage: number }[];
  dailyStats: { date: string; count: number }[];
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  try {
    // Ensure D1 binding exists
    if (!env.PIMX_VISITS) {
      return new Response(
        JSON.stringify({ error: 'D1 database not bound. Bind PIMX_VISITS in Cloudflare Pages settings.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Auto-create tables in case they don't exist yet
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

    // --- Total visits (last 90 days) ---
    const ninetyDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000;

    const totalResult = await env.PIMX_VISITS.prepare(
      'SELECT COUNT(*) as count FROM visits WHERE timestamp >= ?'
    ).bind(ninetyDaysAgo).first<{ count: number }>();
    const totalVisits = totalResult?.count ?? 0;

    // --- Today's visits ---
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayResult = await env.PIMX_VISITS.prepare(
      'SELECT COUNT(*) as count FROM visits WHERE timestamp >= ?'
    ).bind(todayStart.getTime()).first<{ count: number }>();
    const todayVisits = todayResult?.count ?? 0;

    // --- Device breakdown ---
    const deviceResult = await env.PIMX_VISITS.prepare(
      'SELECT device_type, COUNT(*) as count FROM visits WHERE timestamp >= ? GROUP BY device_type ORDER BY count DESC'
    ).bind(ninetyDaysAgo).all<{ device_type: string; count: number }>();

    const totalDevice = totalVisits || 1;
    const deviceShare = (deviceResult.results || []).map((row) => ({
      label: row.device_type || 'Desktop',
      count: row.count,
      percentage: parseFloat(((row.count / totalDevice) * 100).toFixed(1)),
    }));

    // --- Location breakdown (country) ---
    const locationResult = await env.PIMX_VISITS.prepare(
      'SELECT country, COUNT(*) as count FROM visits WHERE timestamp >= ? GROUP BY country ORDER BY count DESC LIMIT 20'
    ).bind(ninetyDaysAgo).all<{ country: string; count: number }>();

    // Map country codes to full names where known
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

    const totalLocation = totalVisits || 1;
    const locations = (locationResult.results || []).map((row) => {
      const code = (row.country || 'Unknown').toUpperCase();
      const label = countryNames[code] || code;
      return {
        label,
        count: row.count,
        percentage: parseFloat(((row.count / totalLocation) * 100).toFixed(1)),
      };
    });

    // --- Daily stats for last 30 days ---
    const dailyStats: { date: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const nextD = new Date(d);
      nextD.setDate(d.getDate() + 1);
      const dateStr = d.toISOString().slice(0, 10);

      const dayResult = await env.PIMX_VISITS.prepare(
        'SELECT COUNT(*) as count FROM visits WHERE timestamp >= ? AND timestamp < ?'
      ).bind(d.getTime(), nextD.getTime()).first<{ count: number }>();

      dailyStats.push({ date: dateStr, count: dayResult?.count ?? 0 });
    }

    const response: StatsResponse = {
      totalVisits,
      todayVisits,
      deviceShare,
      locations,
      dailyStats,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Failed to load analytics', details: String(err) }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
// Cloudflare Pages Function: GET /api/analytics/stats
// Returns aggregated real analytics data from KV for the admin dashboard.

interface Env {
  EVENTS_DB: KVNamespace;
}

interface DailyVisits {
  timestamp: number;
  deviceType: string;
  location: string;
  page: string;
  action: string;
}

interface StatsResponse {
  totalVisits: number;
  todayVisits: number;
  deviceShare: { label: string; count: number; percentage: number }[];
  locations: { label: string; count: number; percentage: number }[];
  dailyStats: { date: string; count: number }[];
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    // Simple auth check
    const origin = request.headers.get('Origin') || '';
    const referer = request.headers.get('Referer') || '';
    const siteUrl = new URL(request.url).origin;

    const isLocal = siteUrl.includes('localhost') || siteUrl.includes('127.0.0.1');
    const isSameOrigin = origin === siteUrl || referer.startsWith(siteUrl);

    if (!isLocal && !isSameOrigin) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Load last 90 days of data
    const today = new Date();
    const allVisits: DailyVisits[] = [];

    // We'll scan the last 90 days (or 30 for performance)
    const daysToScan = 90;
    const dailyStats: { date: string; count: number }[] = [];

    for (let i = 0; i < daysToScan; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().slice(0, 10);

      const data = await env.EVENTS_DB.get(`visits:${dateKey}`);
      if (data) {
        const dayVisits: DailyVisits[] = JSON.parse(data);
        allVisits.push(...dayVisits);
        dailyStats.push({ date: dateKey, count: dayVisits.length });
      } else {
        dailyStats.push({ date: dateKey, count: 0 });
      }
    }

    // Calculate total visits
    const totalVisits = allVisits.length;

    // Today's visits
    const todayKey = today.toISOString().slice(0, 10);
    const todayVisits = allVisits.filter(
      (v) => new Date(v.timestamp).toISOString().slice(0, 10) === todayKey
    ).length;

    // Aggregate device types
    const deviceCounts: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };
    allVisits.forEach((v) => {
      const dt = v.deviceType || 'Desktop';
      if (deviceCounts[dt] !== undefined) {
        deviceCounts[dt]++;
      } else {
        deviceCounts['Desktop']++;
      }
    });

    const totalDevice = totalVisits || 1;
    const deviceShare = Object.entries(deviceCounts)
      .map(([label, count]) => ({
        label,
        count,
        percentage: parseFloat(((count / totalDevice) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.count - a.count);

    // Aggregate locations
    const locationCounts: Record<string, number> = {};
    allVisits.forEach((v) => {
      const loc = v.location || 'Unknown';
      locationCounts[loc] = (locationCounts[loc] || 0) + 1;
    });

    const totalLocation = totalVisits || 1;
    const locations = Object.entries(locationCounts)
      .map(([label, count]) => ({
        label,
        count,
        percentage: parseFloat(((count / totalLocation) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.count - a.count);

    const response: StatsResponse = {
      totalVisits,
      todayVisits,
      deviceShare,
      locations,
      dailyStats: dailyStats.reverse(), // newest first
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Failed to load analytics', details: String(err) }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
