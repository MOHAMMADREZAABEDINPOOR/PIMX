import React, { useState, useEffect } from 'react';
import { fetchAnalyticsStats, AnalyticsStats } from '../lib/analytics';
import {
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  MapPin,
  Loader2,
} from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';

export default function Visits() {
  const { theme } = useLanguageTheme();
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

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

  const cardBase =
    theme === 'light'
      ? 'bg-[#E5E9EE] border-slate-300 shadow-sm'
      : 'bg-[#98A2B3]/25 border-slate-700/55';

  return (
    <div
      className={`min-h-screen px-4 py-16 max-w-6xl mx-auto ${
        theme === 'light' ? 'text-slate-800' : 'text-gray-100'
      }`}
      dir="rtl"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-black mb-3">آمار بازدید</h1>
        <p className="text-slate-500">نمایش آمار دستگاه‌ها و موقعیت‌های جغرافیایی کاربران</p>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
          <p className="text-sm text-slate-500">در حال بارگذاری آمار...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-950/40 border border-red-500/40 text-red-200 text-sm px-6 py-4 rounded-xl flex items-center gap-3">
          <MapPin className="h-5 w-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {stats && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Share */}
          <div className={`p-6 rounded-2xl border transition-all ${cardBase}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-300 uppercase font-mono tracking-wider">
                آمار دستگاه‌های ورودی
              </h3>
              <Monitor className="h-5 w-5 text-indigo-400" />
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
                      <div className="flex justify-between items-center text-sm font-semibold">
                        <div className="flex items-center gap-2">
                          {isMobile ? (
                            <Smartphone className="h-4 w-4 text-cyan-400" />
                          ) : isTablet ? (
                            <Tablet className="h-4 w-4 text-purple-400" />
                          ) : (
                            <Monitor className="h-4 w-4 text-indigo-400" />
                          )}
                          <span className="font-mono">{dev.label}</span>
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
              <h3 className="text-lg font-bold text-slate-300 uppercase font-mono tracking-wider">
                آمار موقعیت‌های جغرافیایی کاربران
              </h3>
              <Globe className="h-5 w-5 text-teal-400" />
            </div>

            {stats.locations.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">هنوز بازدیدی ثبت نشده است.</p>
            ) : (
              <div className="grid grid-cols-1 gap-y-4 my-2">
                {stats.locations.slice(0, 12).map((loc, idx) => (
                  <div key={idx} className="space-y-1.5 py-1">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                        <span className="font-semibold">{loc.label}</span>
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
        </div>
      )}
    </div>
  );
}
