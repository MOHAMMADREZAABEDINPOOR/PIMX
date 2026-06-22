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

    // Scan last 90 days
    for (let i = 0; i < 90; i++) {
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
