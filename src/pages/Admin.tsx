import React, { useState, useEffect, useRef } from 'react';
import { trackActivity, getAnalytics, TIME_RANGE_OPTS, MetricDataPoint } from '../lib/analytics';
import { 
  Lock, 
  User, 
  TrendingUp, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Globe, 
  Clock, 
  LogOut, 
  RefreshCw, 
  ChevronDown, 
  ShieldAlert,
  ArrowUpRight,
  MapPin
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
  const [timeRange, setTimeRange] = useState('1hour');
  const [analyticsData, setAnalyticsData] = useState(() => getAnalytics('1hour'));
  const [hoveredPointIndex, setHoveredPointIndex] = useState<{ [key: string]: number | null }>({
    visits: null,
    tests: null,
    dns: null
  });
  
  // Check if already authenticated on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem('pimx_admin_authenticated') === 'true';
    if (isAuth) {
      setIsLoggedIn(true);
    }
    // Track admin page visits
    trackActivity('visit');
  }, []);

  // Update analytics when range shifts
  useEffect(() => {
    if (isLoggedIn) {
      setAnalyticsData(getAnalytics(timeRange));
    }
  }, [timeRange, isLoggedIn]);

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
  };

  const refreshAnalytics = () => {
    setAnalyticsData(getAnalytics(timeRange));
  };

  // Rendering the login page if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 font-sans p-4 relative overflow-hidden" dir="rtl">
        {/* Abstract futuristic meshes */}
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 filter blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-rose-500/10 filter blur-[80px]" />
        
        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-2xl relative z-10 transition-all duration-300">
          <div className="flex flex-col items-center mb-8">
            <div className="h-14 w-14 bg-gradient-to-tr from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4 text-slate-950">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">ورود به پنل مدیریت</h1>
            <p className="text-slate-400 text-xs mt-2 font-mono">PIMX Premium Portal Secure Authorization</p>
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
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
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
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 text-white rounded-xl py-3 pl-11 pr-4 text-sm font-mono outline-none transition-all text-left"
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
            <a href="/" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1">
              بازگشت به سایت اصلی
            </a>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING OF COMPREHENSIVELY CUSTOM GRAPH CHART COMPONENT ---
  const renderSVGChart = (
    key: 'visits' | 'tests' | 'dns', 
    points: MetricDataPoint[], 
    stats: { total: number; avg: number; max: number; min: number },
    colorHex = '#4F46E5', // default beautiful deep blue
    fillGradient = 'url(#blueGrad)'
  ) => {
    const width = 600;
    const height = 180;
    const paddingX = 30;
    const paddingY = 25;
    
    // Extract numerical array based on the key
    const values = points.map(p => {
      if (key === 'visits') return p.visits;
      if (key === 'tests') return p.tests;
      return p.dnsTested;
    });

    const maxValue = Math.max(...values, 5); // ensure we don't divide by zero
    const minValue = Math.min(...values, 0);
    const rangeVal = maxValue - minValue || 1;

    // Build absolute coordinates
    const coords = points.map((p, i) => {
      const val = key === 'visits' ? p.visits : key === 'tests' ? p.tests : p.dnsTested;
      const x = paddingX + (i / (points.length - 1)) * (width - 2 * paddingX);
      const ratio = (val - minValue) / rangeVal;
      const y = height - paddingY - ratio * (height - 2 * paddingY);
      return { x, y, val, label: p.label };
    });

    // Build SVG Path
    let linePath = '';
    let areaPath = '';
    
    if (coords.length > 0) {
      // 1. Line Path
      linePath = `M ${coords[0].x} ${coords[0].y}`;
      for (let i = 1; i < coords.length; i++) {
        // Curve smoothing using cubic bezier approximation
        const prev = coords[i - 1];
        const curr = coords[i];
        const cpX1 = prev.x + (curr.x - prev.x) / 3;
        const cpY1 = prev.y;
        const cpX2 = prev.x + 2 * (curr.x - prev.x) / 3;
        const cpY2 = curr.y;
        linePath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
      }
      
      // 2. Closed Area Path
      areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - paddingY} L ${coords[0].x} ${height - paddingY} Z`;
    }

    const hoveredIndex = hoveredPointIndex[key];

    return (
      <div className="relative w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
          <defs>
            <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.00" />
            </linearGradient>
            <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.00" />
            </linearGradient>
            <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid Horizontal Guidelines */}
          {[0, 0.25, 0.5, 0.75, 1].map((r, idx) => {
            const hY = paddingY + r * (height - 2 * paddingY);
            return (
              <line 
                key={idx} 
                x1={paddingX} 
                y1={hY} 
                x2={width - paddingX} 
                y2={hY} 
                stroke={theme === 'light' ? '#E2E8F0' : '#1E293B'} 
                strokeWidth="1" 
                strokeDasharray="4 4" 
              />
            );
          })}

          {/* The filled visual region under the curve */}
          {areaPath && (
            <path d={areaPath} fill={fillGradient} />
          )}

          {/* The main stroke curves */}
          {linePath && (
            <path d={linePath} fill="none" stroke={colorHex} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          )}

          {/* Interactive Guideline and hover elements */}
          {hoveredIndex !== null && coords[hoveredIndex] && (
            <>
              <line 
                x1={coords[hoveredIndex].x} 
                y1={paddingY} 
                x2={coords[hoveredIndex].x} 
                y2={height - paddingY} 
                stroke={colorHex} 
                strokeWidth="1.5" 
                strokeDasharray="3 3" 
              />
              <circle 
                cx={coords[hoveredIndex].x} 
                cy={coords[hoveredIndex].y} 
                r="6" 
                fill={colorHex} 
                stroke={theme === 'light' ? '#FFF' : '#0F172A'} 
                strokeWidth="2" 
              />
            </>
          )}

          {/* Invisible interactive hover slices across the timeline */}
          {coords.map((pt, idx) => {
            const sliceWidth = (width - 2 * paddingX) / coords.length;
            const xLeft = pt.x - sliceWidth / 2;
            return (
              <rect
                key={idx}
                x={xLeft}
                y={0}
                width={sliceWidth}
                height={height}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHoveredPointIndex(prev => ({ ...prev, [key]: idx }))}
                onMouseLeave={() => setHoveredPointIndex(prev => ({ ...prev, [key]: null }))}
              />
            );
          })}

          {/* Label Display ticks at both extremes */}
          {coords.length > 1 && (
            <>
              <text 
                x={coords[0].x} 
                y={height - 8} 
                textAnchor="start" 
                fill="#94A3B8" 
                className="text-[9px] font-mono leading-none"
              >
                {coords[0].label}
              </text>
              <text 
                x={coords[coords.length - 1].x} 
                y={height - 8} 
                textAnchor="end" 
                fill="#94A3B8" 
                className="text-[9px] font-mono leading-none"
              >
                {coords[coords.length - 1].label}
              </text>
            </>
          )}
        </svg>

        {/* Floating Custom Tooltip overlay */}
        {hoveredIndex !== null && coords[hoveredIndex] && (
          <div 
            className="absolute rounded bg-slate-900 border border-slate-700/80 p-2 shadow-xl shrink-0 pointer-events-none text-right z-30"
            style={{
              left: `${(coords[hoveredIndex].x / width) * 100}%`,
              top: `${Math.max(10, (coords[hoveredIndex].y / height) * 100 - 35)}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <p className="text-[10px] text-slate-400 font-mono">{coords[hoveredIndex].label}</p>
            <p className="text-xs font-black text-white mt-0.5">
              {coords[hoveredIndex].val.toLocaleString()} <span className="text-[10px] text-slate-300 font-normal">مورد</span>
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen font-sans ${theme === 'light' ? 'bg-[#F1F3F5] text-slate-900' : 'bg-[#0B0F19] text-gray-100'} transition-colors duration-300`} dir="rtl">
      
      {/* Upper Navigation and Branding Bar */}
      <header className={`border-b ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/40 border-slate-800/80 backdrop-blur-md'} sticky top-0 z-40 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-cyan-500 rounded-xl flex items-center justify-center shadow-md shadow-cyan-500/10 text-slate-950 font-black">
              P
            </div>
            <div>
              <h1 className="text-xl font-black">پنل کنترل ادمین (Admin Panel)</h1>
              <p className="text-[10px] text-slate-400 font-mono -mt-1">PIMX Premium Traffic, Diagnostics and Latency Log</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={refreshAnalytics}
              className="p-2 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors"
              title="بروزرسانی آمار"
            >
              <RefreshCw className="h-4 w-4" />
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

      {/* Main Stats Panel Content container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Row zero: Selector filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/20 px-6 py-4 rounded-2xl border border-slate-800/40">
          <div>
            <h2 className="text-base font-bold text-cyan-400">فیلتر بازه زمانی (Time Range)</h2>
            <p className="text-xs text-slate-400 mt-0.5">انتخاب رزولوشن دوره‌ای جهت ترسیم لاگ‌ها و نمودارها</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Time Range:</span>
            <div className="relative w-full sm:w-56">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700/80 px-4 py-2.5 rounded-xl text-xs font-semibold text-white cursor-pointer outline-none focus:ring-1 focus:ring-cyan-500/30 appearance-none text-right pr-4 pl-10"
              >
                {Object.entries(TIME_RANGE_OPTS).map(([key, opt]) => (
                  <option key={key} value={key} className="bg-slate-900 py-2">
                    {opt.labelFa} ({opt.labelEn})
                  </option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 1: Top 3 Aggregate Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: VISITS */}
          <div className={`p-6 rounded-2xl border transition-all ${
            theme === 'light' 
              ? 'bg-[#E5E9EE] border-slate-300 shadow-sm' 
              : 'bg-[#98A2B3]/25 border-slate-700/55'
          }`}>
            <div className="flex justify-between items-start">
              <p className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">VISITS</p>
              <div className="h-6 w-6 rounded bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
            </div>
            <h3 className="text-4xl font-black mt-2 font-mono tracking-tight text-white">
              {analyticsData.visits.toLocaleString()}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1">تعداد کل بازدیدهای وب‌سرور متصل</p>
          </div>

          {/* Card 2: TESTS */}
          <div className={`p-6 rounded-2xl border transition-all ${
            theme === 'light' 
              ? 'bg-[#E5E9EE] border-slate-300 shadow-sm' 
              : 'bg-[#98A2B3]/25 border-slate-700/55'
          }`}>
            <div className="flex justify-between items-start">
              <p className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">TESTS</p>
              <div className="h-6 w-6 rounded bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Clock className="h-4.5 w-4.5" />
              </div>
            </div>
            <h3 className="text-4xl font-black mt-2 font-mono tracking-tight text-white">
              {analyticsData.tests.toLocaleString()}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1">تعداد کل ابزارهای اجرا شده کاربران</p>
          </div>

          {/* Card 3: DNS TESTED */}
          <div className={`p-6 rounded-2xl border transition-all ${
            theme === 'light' 
              ? 'bg-[#E5E9EE] border-slate-300 shadow-sm' 
              : 'bg-[#98A2B3]/25 border-slate-700/55'
          }`}>
            <div className="flex justify-between items-start">
              <p className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">DNS TESTED</p>
              <div className="h-6 w-6 rounded bg-purple-500/10 flex items-center justify-center text-purple-400">
                <ArrowUpRight className="h-4.5 w-4.5" />
              </div>
            </div>
            <h3 className="text-4xl font-black mt-2 font-mono tracking-tight text-white">
              {analyticsData.dnsTested.toLocaleString()}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1">تعداد کل درخواست‌های پینگ و ارزیابی سرورها</p>
          </div>
        </div>

        {/* Row 2: Charts Grids (VISITS vs TESTS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card: VISITS Trend Chart */}
          <div className={`p-6 rounded-2xl border transition-all ${
            theme === 'light' 
              ? 'bg-[#E5E9EE] border-slate-300' 
              : 'bg-[#9d9d9d2a] border-slate-700/40'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-sm font-bold text-slate-300 uppercase font-mono tracking-wider">VISITS TREND (نمودار بازدیدها)</h4>
              <span className="text-[10px] font-medium bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/25">Live Line</span>
            </div>

            {renderSVGChart('visits', analyticsData.points, analyticsData.visitsStats, '#6366F1', 'url(#blueGrad)')}

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2 mt-6">
              <div className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-xl text-center">
                <p className="text-[9px] text-slate-400 font-bold">Total</p>
                <p className="text-sm font-black font-mono text-white mt-0.5">{analyticsData.visitsStats.total}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-xl text-center">
                <p className="text-[9px] text-slate-400 font-bold">Avg</p>
                <p className="text-sm font-black font-mono text-white mt-0.5">{analyticsData.visitsStats.avg}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-xl text-center">
                <p className="text-[9px] text-slate-400 font-bold">Max</p>
                <p className="text-sm font-black font-mono text-white mt-0.5">{analyticsData.visitsStats.max}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-xl text-center">
                <p className="text-[9px] text-slate-400 font-bold">Min</p>
                <p className="text-sm font-black font-mono text-white mt-0.5">{analyticsData.visitsStats.min}</p>
              </div>
            </div>
          </div>

          {/* Card: TESTS Trend Chart */}
          <div className={`p-6 rounded-2xl border transition-all ${
            theme === 'light' 
              ? 'bg-[#E5E9EE] border-slate-300' 
              : 'bg-[#9d9d9d2a] border-slate-700/40'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-sm font-bold text-slate-300 uppercase font-mono tracking-wider">TESTS TREND (نمودار سناریوها)</h4>
              <span className="text-[10px] font-medium bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/25">Analiz Line</span>
            </div>

            {renderSVGChart('tests', analyticsData.points, analyticsData.testsStats, '#06B6D4', 'url(#cyanGrad)')}

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2 mt-6">
              <div className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-xl text-center">
                <p className="text-[9px] text-slate-400 font-bold">Total</p>
                <p className="text-sm font-black font-mono text-white mt-0.5">{analyticsData.testsStats.total}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-xl text-center">
                <p className="text-[9px] text-slate-400 font-bold">Avg</p>
                <p className="text-sm font-black font-mono text-white mt-0.5">{analyticsData.testsStats.avg}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-xl text-center">
                <p className="text-[9px] text-slate-400 font-bold">Max</p>
                <p className="text-sm font-black font-mono text-white mt-0.5">{analyticsData.testsStats.max}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-xl text-center">
                <p className="text-[9px] text-slate-400 font-bold">Min</p>
                <p className="text-sm font-black font-mono text-white mt-0.5">{analyticsData.testsStats.min}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: DNS TEST TREND & Devices split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card: DNS TESTED TREND */}
          <div className={`p-6 rounded-2xl border transition-all ${
            theme === 'light' 
              ? 'bg-[#E5E9EE] border-slate-300' 
              : 'bg-[#9d9d9d2a] border-slate-700/40'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-sm font-bold text-slate-300 uppercase font-mono tracking-wider">DNS TESTED TREND (تست‌های لیتنسی)</h4>
              <span className="text-[10px] font-medium bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/25">Target Line</span>
            </div>

            {renderSVGChart('dns', analyticsData.points, analyticsData.dnsStats, '#8B5CF6', 'url(#purpleGrad)')}

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2 mt-6">
              <div className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-xl text-center">
                <p className="text-[9px] text-slate-400 font-bold">Total</p>
                <p className="text-sm font-black font-mono text-white mt-0.5">{analyticsData.dnsStats.total}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-xl text-center">
                <p className="text-[9px] text-slate-400 font-bold">Avg</p>
                <p className="text-sm font-black font-mono text-white mt-0.5">{analyticsData.dnsStats.avg}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-xl text-center">
                <p className="text-[9px] text-slate-400 font-bold">Max</p>
                <p className="text-sm font-black font-mono text-white mt-0.5">{analyticsData.dnsStats.max}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-xl text-center">
                <p className="text-[9px] text-slate-400 font-bold">Min</p>
                <p className="text-sm font-black font-mono text-white mt-0.5">{analyticsData.dnsStats.min}</p>
              </div>
            </div>
          </div>

          {/* Card: DEVICE SHARE */}
          <div className={`p-6 rounded-2xl border transition-all ${
            theme === 'light' 
              ? 'bg-[#E5E9EE] border-slate-300' 
              : 'bg-[#9d9d9d2a] border-slate-700/40'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-sm font-bold text-slate-300 uppercase font-mono tracking-wider border-slate-800">DEVICE SHARE (دستگاه‌های ورودی)</h4>
            </div>

            <div className="space-y-6 my-4">
              {analyticsData.deviceShare.map((dev, idx) => {
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
                      <span className="font-mono text-slate-300">{dev.percentage}% ({dev.count})</span>
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
          </div>
        </div>

        {/* Row 4: USER LOCATIONS */}
        <div className={`p-6 rounded-2xl border transition-all ${
          theme === 'light' 
            ? 'bg-[#E5E9EE] border-slate-300' 
            : 'bg-[#9d9d9d2a] border-slate-700/40'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-bold text-slate-300 uppercase font-mono tracking-wider">USER LOCATIONS (جغرافیا و سورس بازدید)</h4>
            <Globe className="h-4 w-4 text-teal-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 my-2">
            {analyticsData.locations.slice(0, 8).map((lic, idx) => (
              <div key={idx} className="space-y-1.5 py-1">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                    <span className="font-semibold text-white">{lic.label}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-400">{lic.percentage}% ({lic.count})</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-1000"
                    style={{ width: `${lic.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12 border-t border-slate-900 text-center select-none text-xs text-slate-500">
        <p>PIMX Premium Portal Core Console System &copy; {new Date().getFullYear()}</p>
        <p className="mt-1 font-mono uppercase text-[9px] tracking-widest text-[#94A3B8]/20">Authorized Terminal Environment</p>
      </footer>
    </div>
  );
}
