import React, { useState, useEffect } from 'react';
import { fetchAnalyticsStats, AnalyticsStats } from '../lib/analytics';
import {
  Lock,
  User,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  LogOut,
  RefreshCw,
  ShieldAlert,
  MapPin,
  Loader2,
} from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';

export default function Admin() {
  const { theme } = useLanguageTheme();

  // Authentication states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard states
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if already authenticated on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem('pimx_admin_authenticated') === 'true';
    if (isAuth) {
      setIsLoggedIn(true);
    }
  }, []);

  // Load stats when logged in
  useEffect(() => {
    if (isLoggedIn) {
      loadStats();
    }
  }, [isLoggedIn]);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAnalyticsStats();
      setStats(data);
      if (!data) setError('خطا در دریافت اطلاعات از سرور');
    } catch {
      setError('خطا در اتصال به سرور');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'pimx' && password === '123456789PIMX_ELTEx@#$%^&') {
      sessionStorage.setItem('pimx_admin_authenticated', 'true');
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('نام کاربری یا رمز عبور نامعتبر است.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('pimx_admin_authenticated');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setStats(null);
  };

  // Rendering the login page if not logged in
  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center bg-slate-950 font-sans p-4 relative overflow-hidden"
        dir="rtl"
      >
        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-2xl relative z-10 transition-all duration-300">
          <div className="flex flex-col items-center mb-8">
            <div className="h-14 w-14 bg-gradient-to-tr from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4 text-slate-950">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">ورود به پنل مدیریت</h1>
            <p className="text-slate-400 text-xs mt-2 font-mono">
              PIMX Premium Portal Secure Authorization
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="bg-red-950/40 border border-red-500/40 text-red-200 text-xs px-4 py-3 rounded-xl flex items-center gap-2.5">
                <ShieldAlert className="h-4 w-4 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">نام کاربری</label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 -translate-y-1/2 text-slate-500">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="pimx"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 text-white rounded-xl py-3 pl-11 pr-4 text-sm font-mono outline-none transition-all text-left"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">رمز عبور</label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 -translate-y-1/2 text-slate-500">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 text-white rounded-xl py-3 pl-11 pr-4 text-sm font-mono outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-cyan-500/10 cursor-pointer active:scale-[0.98] transition-all text-sm mt-4"
            >
              احراز هویت و ورود
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
            <a
              href="/"
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
            >
              بازگشت به سایت اصلی
            </a>
          </div>
        </div>
      </div>
    );
  }

  const cardBase =
    theme === 'light'
      ? 'bg-[#E5E9EE] border-slate-300 shadow-sm'
      : 'bg-[#98A2B3]/25 border-slate-700/55';

  return (
    <div
      className={`min-h-screen font-sans ${
        theme === 'light' ? 'bg-[#F1F3F5] text-slate-900' : 'bg-[#0B0F19] text-gray-100'
      } transition-colors duration-300`}
      dir="rtl"
    >
      {/* Header */}
      <header
        className={`border-b ${
          theme === 'light'
            ? 'bg-white border-slate-200'
            : 'bg-slate-900/40 border-slate-800/80 backdrop-blur-md'
        } sticky top-0 z-40 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-cyan-500 rounded-xl flex items-center justify-center shadow-md shadow-cyan-500/10 text-slate-950 font-black">
              P
            </div>
            <div>
              <h1 className="text-xl font-black">پنل کنترل ادمین</h1>
              <p className="text-[10px] text-slate-400 font-mono -mt-1">
                آمار بازدید دستگاه و موقعیت کاربران
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={loadStats}
              disabled={loading}
              className="p-2 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50"
              title="بروزرسانی آمار"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-400 hover:text-white hover:bg-red-500 rounded-lg transition-all cursor-pointer border border-transparent hover:border-red-400"
            >
              <LogOut className="h-4 w-4" />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
            <p className="text-sm text-slate-400">در حال بارگذاری آمار...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="bg-red-950/40 border border-red-500/40 text-red-200 text-sm px-6 py-4 rounded-xl flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Data loaded */}
        {stats && !loading && (
          <>
            {/* Device Share */}
            <div className={`p-6 rounded-2xl border transition-all ${cardBase}`}>
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-bold text-slate-300 uppercase font-mono tracking-wider">
                  آمار دستگاه‌های ورودی
                </h4>
                <Monitor className="h-4 w-4 text-indigo-400" />
              </div>

              {stats.deviceShare.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-8">هنوز بازدیدی ثبت نشده است.</p>
              ) : (
                <div className="space-y-6 my-4">
                  {stats.deviceShare.map((dev, idx) => {
                    const isMobile = dev.label === 'Mobile';
                    const isTablet = dev.label === 'Tablet';
                    return (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <div className="flex items-center gap-2">
                            {isMobile ? (
                              <Smartphone className="h-4 w-4 text-cyan-400" />
                            ) : isTablet ? (
                              <Tablet className="h-4 w-4 text-purple-400" />
                            ) : (
                              <Monitor className="h-4 w-4 text-indigo-400" />
                            )}
                            <span className="font-mono text-white">{dev.label}</span>
                          </div>
                          <span className="font-mono text-slate-300">
                            {dev.percentage}% ({dev.count})
                          </span>
                        </div>
                        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 bg-gradient-to-r ${
                              isMobile
                                ? 'from-cyan-500 to-teal-400'
                                : isTablet
                                ? 'from-purple-500 to-indigo-500'
                                : 'from-blue-600 to-indigo-500'
                            }`}
                            style={{ width: `${dev.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* User Locations */}
            <div className={`p-6 rounded-2xl border transition-all ${cardBase}`}>
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-bold text-slate-300 uppercase font-mono tracking-wider">
                  آمار موقعیت‌های جغرافیایی کاربران
                </h4>
                <Globe className="h-4 w-4 text-teal-400" />
              </div>

              {stats.locations.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-8">هنوز بازدیدی ثبت نشده است.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 my-2">
                  {stats.locations.slice(0, 12).map((loc, idx) => (
                    <div key={idx} className="space-y-1.5 py-1">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                          <span className="font-semibold text-white">{loc.label}</span>
                        </div>
                        <span className="font-mono font-bold text-slate-400">
                          {loc.percentage}% ({loc.count})
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-1000"
                          style={{ width: `${loc.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Empty state — no stats loaded and not loading */}
        {!stats && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-sm text-slate-400">برای مشاهده آمار، روی دکمه بروزرسانی کلیک کنید.</p>
          </div>
        )}
      </main>
    </div>
  );
}
