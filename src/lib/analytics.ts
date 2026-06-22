// Analytics library — sends real visit/device/location data to the server API.
// On Cloudflare Pages the Functions use KV for persistent storage.
// Locally (Express dev) the server stores data in-memory as a fallback.

// ---------- Types ----------

export interface AnalyticsStats {
  totalVisits: number;
  todayVisits: number;
  deviceShare: { label: string; count: number; percentage: number }[];
  locations: { label: string; count: number; percentage: number }[];
  dailyStats: { date: string; count: number }[];
}

// ---------- Helpers ----------

/** Detect real device type from the browser User-Agent */
export function getDeviceType(): 'Desktop' | 'Mobile' | 'Tablet' {
  if (typeof window === 'undefined') return 'Desktop';
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'Tablet';
  if (/Mobile|iP(hone|od)|Android(?!.*Tablet)|BlackBerry|IEMobile|Kindle|Silk-Accent/i.test(ua))
    return 'Mobile';
  return 'Desktop';
}

/** Return the current page path */
export function getCurrentPage(): string {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname;
}

// ---------- Track Activity ----------

let _trackSent = false;

/**
 * Send a visit tracking event to the server API.
 * Uses a session guard so we only send once per browser session.
 */
export async function trackActivity(): Promise<void> {
  if (typeof window === 'undefined') return;

  // Avoid duplicate sends within the same session
  const sessionKey = 'pimx_visit_tracked';
  if (sessionStorage.getItem(sessionKey)) return;
  sessionStorage.setItem(sessionKey, '1');

  if (_trackSent) return;
  _trackSent = true;

  const deviceType = getDeviceType();
  const page = getCurrentPage();

  // Fire-and-forget — we don't block the page load
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceType, page, action: 'visit' }),
      keepalive: true,
    });
  } catch {
    // Silently ignore network errors (offline, CORS, etc.)
  }
}

// ---------- Fetch Stats ----------

/**
 * Fetch aggregated analytics from the server API.
 * Returns null on failure so the UI can show a fallback.
 */
export async function fetchAnalyticsStats(): Promise<AnalyticsStats | null> {
  try {
    const res = await fetch('/api/analytics/stats', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data: AnalyticsStats = await res.json();
    return data;
  } catch {
    return null;
  }
}
