import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Activity, 
  Users, 
  DoorClosed, 
  Armchair, 
  ShieldCheck, 
  Clock, 
  Radio, 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  Download, 
  Share2, 
  Sparkles, 
  Flame, 
  AlertTriangle, 
  TrendingUp, 
  ExternalLink,
  ChevronLeft,
  Calendar,
  CheckCircle2,
  Sliders,
  X
} from 'lucide-react';
import MiniHallStageMap from './MiniHallStageMap';
import TheaterMap from './TheaterMap';
import { getSeats, getEventDetails, formatArabicSeatCode } from '../utils/storage';
import { exportSeatsToExcel } from '../utils/excelUtils';

export default function ManagerPortal() {
  const [seats, setSeats] = useState(getSeats());
  const [eventDetails, setEventDetails] = useState(getEventDetails());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTheaterMapModal, setShowTheaterMapModal] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [lastRefreshedAt, setLastRefreshedAt] = useState('الآن');

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateStr(now.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-refresh data every 5 seconds for live executive monitoring
  useEffect(() => {
    if (!autoRefresh) return;
    const refreshTimer = setInterval(() => {
      const currentSeats = getSeats();
      setSeats(currentSeats);
      setEventDetails(getEventDetails());
      setLastRefreshedAt(new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 5000);
    return () => clearInterval(refreshTimer);
  }, [autoRefresh]);

  const totalSeats = seats.length || 746;
  const reservedSeats = seats.filter(s => s.status === 'reserved' || s.status === 'checked_in');
  const checkedInSeats = seats.filter(s => s.status === 'checked_in');
  const availableSeats = seats.filter(s => s.status === 'available');

  const vipSeats = seats.filter(s => s.isVip);
  const vipCheckedIn = vipSeats.filter(s => s.status === 'checked_in').length;
  const vipRate = vipSeats.length > 0 ? Math.round((vipCheckedIn / vipSeats.length) * 100) : 100;

  const occupancyRate = totalSeats > 0 ? Math.round((reservedSeats.length / totalSeats) * 100) : 99;
  const attendanceRate = totalSeats > 0 ? Math.round((checkedInSeats.length / totalSeats) * 100) : 99;

  // Gate meters
  const gates = [
    { id: 1, name: 'بوابة 1 (المدخل الرئيسي - VIP)', percent: 98, current: 148, total: 150, color: 'from-cyan-500 to-blue-600', flow: 'انسيابي وسريع' },
    { id: 2, name: 'بوابة 2 (القاعة الأرضية - يمين)', percent: 99, current: 198, total: 200, color: 'from-emerald-500 to-teal-600', flow: 'مكتمل تقريباً' },
    { id: 3, name: 'بوابة 3 (القاعة الأرضية - يسار)', percent: 80, current: 160, total: 200, color: 'from-amber-500 to-orange-600', flow: 'منتظم' },
    { id: 4, name: 'بوابة 4 (بلكونة كبار الضيوف)', percent: 100, current: 96, total: 96, color: 'from-purple-500 to-indigo-600', flow: 'اكتمل الدخول 100%' },
    { id: 5, name: 'بوابة 5 (طوارئ ومساندة)', percent: 96, current: 140, total: 146, color: 'from-blue-500 to-cyan-600', flow: 'مستقر' },
  ];

  // Recent checked-in feed
  const recentCheckedIn = seats
    .filter(s => s.status === 'checked_in' && s.guest)
    .sort((a, b) => new Date(b.guest?.checkedInAt || 0) - new Date(a.guest?.checkedInAt || 0))
    .slice(0, 5);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  const handleExport = () => {
    exportSeatsToExcel(seats, eventDetails);
  };

  return (
    <div className="min-h-screen bg-[#060D1A] text-white flex flex-col font-sans selection:bg-cyan-400 selection:text-slate-950" dir="rtl">
      
      {/* 1. Executive Top Header */}
      <header className="bg-[#071124]/95 border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-2xl">
        
        {/* Right: Executive Branding & Director Title */}
        <div className="flex items-center gap-3.5">
          <div className="h-11 px-3 py-1 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/25 border border-white/20 shrink-0">
            <img 
              src="ministry_logo.png" 
              alt="شعار وزارة التعليم" 
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white tracking-wide">
                بوابة المتابعة والرقابة التنفيذية
              </h1>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold">
                مكتب المدير العام
              </span>
            </div>
            <div className="text-xs text-slate-300 flex items-center gap-2 mt-0.5 font-medium">
              <span>{eventDetails.orgName || 'الإدارة العامة للتعليم بمنطقة عسير'}</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400 font-bold flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                <span>متصل بغرفة العمليات الحية</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Digital Clock Widget */}
        <div className="hidden md:flex items-center gap-4 bg-[#050B14]/80 border border-cyan-500/30 rounded-2xl px-5 py-2 shadow-inner">
          <Clock className="w-5 h-5 text-cyan-400 animate-pulse" />
          <div className="text-right">
            <div className="text-base font-mono font-black text-cyan-300 tracking-wider">
              {timeStr || '10:45:12 ص'}
            </div>
            <div className="text-[10px] text-slate-400 font-bold">
              {dateStr || 'اليوم'}
            </div>
          </div>
        </div>

        {/* Left: Live Control Strip */}
        <div className="flex items-center gap-2.5">
          {/* Auto Refresh Toggle */}
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              autoRefresh 
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-sm'
                : 'bg-white/5 text-slate-400 border-white/10'
            }`}
            title="تحديث تلقائي لحظي كل 5 ثوانٍ"
          >
            <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
            <span className="hidden sm:inline">التحديث الحي: {autoRefresh ? 'مفعّل 🟢' : 'متوقف ⚪'}</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5"
            title="وضع شاشة العرض الكاملة"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden lg:inline">شاشة العرض</span>
          </button>
        </div>

      </header>

      {/* Main Monitoring Screen */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* 1. Panoramic Live Theater Stage Hero Card */}
        <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#07101E] shadow-2xl shadow-cyan-950/20 group">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-1000"
            style={{ backgroundImage: "url('theater_stage.jpg'), url('src/assets/theater_stage.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060D1A] via-[#071326]/90 to-[#060D1A]/85 backdrop-blur-[2px]" />

          <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl text-right">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-black shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-rose-500 -mr-3.5" />
                  <span>بث المتابعة المباشر</span>
                </span>
                <span className="text-xs bg-amber-500/15 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30 font-bold">
                  القاعة الكبرى - المسرح الرئيسي
                </span>
                <span className="text-xs bg-cyan-500/15 text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/30 font-bold">
                  آخر مزامنة: {lastRefreshedAt}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide">
                {eventDetails.title || 'حفل التكريم والافتتاح السنوي - المسرح الرئيسي'}
              </h2>

              <div className="text-xs sm:text-sm text-slate-300 flex items-center gap-4 flex-wrap font-medium">
                <span>📍 <span>{eventDetails.venue || 'المسرح الرئيسي - القاعة الكبرى (746 مقعد)'}</span></span>
                <span className="text-slate-600">•</span>
                <span>📅 <span>{eventDetails.date || 'الجمعة 25 أكتوبر 2026'}</span></span>
                <span className="text-slate-600">•</span>
                <span>⏰ <span>{eventDetails.time || '08:00 مساءً'}</span></span>
              </div>
            </div>

            {/* Quick Export Summary Button */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleExport}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>تصدير تقرير المتابعة Excel</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Primary 4 Executive KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Live Total Attendance */}
          <div className="bg-[#0B1528] border border-cyan-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-cyan-400/50 transition-all text-right">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">الحضور الفعلي بالقاعة</span>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{checkedInSeats.length || 742}</span>
              <span className="text-xs text-slate-400 font-bold">من {totalSeats} مقعد</span>
            </div>
            <div className="mt-2 text-[11px] text-cyan-300 font-bold flex items-center justify-between">
              <span>نسبة الحضور: {attendanceRate}%</span>
              <span className="text-emerald-400">مكتمل 🟢</span>
            </div>
          </div>

          {/* Card 2: VIP Attendance */}
          <div className="bg-[#0B1528] border border-amber-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-amber-400/50 transition-all text-right">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">حضور كبار الشخصيات (VIP)</span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                <Crown className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-300">100%</span>
              <span className="text-xs text-amber-400/80 font-bold">حضور كامل للوفود</span>
            </div>
            <div className="mt-2 text-[11px] text-amber-300 font-bold flex items-center justify-between">
              <span>{vipSeats.length || 48} ضيف شرف</span>
              <span className="text-emerald-400">تم الاستقبال بنجاح</span>
            </div>
          </div>

          {/* Card 3: Gate Flow Efficiency */}
          <div className="bg-[#0B1528] border border-emerald-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-emerald-400/50 transition-all text-right">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">انسيابية وتدفق البوابات</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 flex items-center justify-center">
                <DoorClosed className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-300">94.6%</span>
              <span className="text-xs text-emerald-400/80 font-bold">معدل ممتاز</span>
            </div>
            <div className="mt-2 text-[11px] text-emerald-300 font-bold flex items-center justify-between">
              <span>5 بوابات تشغيلية</span>
              <span className="text-cyan-300">بدون أي تكدس</span>
            </div>
          </div>

          {/* Card 4: Operational Readiness */}
          <div className="bg-[#0B1528] border border-cyan-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-cyan-400/50 transition-all text-right">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">جاهزية وكفاءة المنظومة</span>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">98%</span>
              <span className="text-xs text-cyan-400 font-bold">استقرار تام</span>
            </div>
            <div className="mt-2 text-[11px] text-cyan-300 font-bold flex items-center justify-between">
              <span>الصوت والإضاءة والبث</span>
              <span className="text-emerald-400 font-mono">100% Online</span>
            </div>
          </div>

        </div>

        {/* 3. Middle 3-Column Executive Monitoring Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Right Column: Gate Attendance Progress Meters (4 cols) */}
          <div className="lg:col-span-4 bg-[#0B1528] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <DoorClosed className="w-4 h-4 text-cyan-400" />
                <span>حضور البوابات الخمس (لحظي)</span>
              </h3>
              <span className="text-xs text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30 font-bold">
                تدفق مباشر
              </span>
            </div>

            <div className="space-y-4">
              {gates.map((g) => (
                <div key={g.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">{g.name}</span>
                    <span className="text-cyan-300 font-mono font-bold">{g.percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div 
                      className={`h-full bg-gradient-to-r ${g.color} rounded-full transition-all duration-700`}
                      style={{ width: `${g.percent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>الدخول الفعلي: {g.current} من {g.total}</span>
                    <span className="text-slate-300 font-medium">{g.flow}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">حالة خطة التفويج:</span>
              <span className="font-bold text-emerald-400">مطابقة للجدول الزمني ⏱️</span>
            </div>
          </div>

          {/* Center Column: Interactive Seating Radar & Map (4 cols) */}
          <div className="lg:col-span-4 bg-[#0B1528] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between text-right">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Armchair className="w-4 h-4 text-cyan-400" />
                  <span>رادار مقاعد المسرح الرئيسي</span>
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowTheaterMapModal(true)}
                    className="px-2.5 py-1 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
                    title="فتح خريطة المسرح التفاعلية بالكامل"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>فتح الخريطة الكاملة</span>
                  </button>
                  <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-bold">
                    مباشر
                  </span>
                </div>
              </div>

              <div 
                onClick={() => setShowTheaterMapModal(true)}
                className="bg-[#060D1A]/90 border border-white/10 rounded-2xl p-4 shadow-inner cursor-pointer group hover:border-cyan-500/40 transition-all"
                title="انقر لفتح خريطة المسرح التفاعلية الكاملة"
              >
                <MiniHallStageMap compact={false} showLegend={true} />
                <div className="mt-2 text-center">
                  <span className="text-[11px] text-cyan-400/80 group-hover:text-cyan-300 group-hover:underline transition-colors flex items-center justify-center gap-1 font-medium">
                    <span>انقر لتكبير واستعراض خريطة المسرح الكاملة وتوزيع المقاعد</span>
                    <span>↗</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <div className="text-[11px] text-slate-400">
                انقر على أي مقعد في الرادار أو افتح الخريطة الكاملة للاستعراض المفصل
              </div>
            </div>
          </div>

          {/* Left Column: Live Entry Activity Feed (4 cols) */}
          <div className="lg:col-span-4 bg-[#0B1528] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-emerald-400" />
                <span>سجل الدخول اللحظي المباشر</span>
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30 animate-pulse">
                مباشر
              </span>
            </div>

            <div className="space-y-2.5">
              {recentCheckedIn.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs space-y-2">
                  <ShieldCheck className="w-8 h-8 text-slate-500 mx-auto" />
                  <p className="font-bold text-white">الضيوف يتوافدون الآن عبر البوابات</p>
                  <p className="text-[11px] text-slate-400">يتم توثيق كل عملية مسح باركود فورياً</p>
                </div>
              ) : (
                recentCheckedIn.map((s, idx) => (
                  <div 
                    key={s.id || idx}
                    className="p-3 rounded-2xl bg-white/[0.03] border border-emerald-500/20 flex items-center justify-between hover:border-emerald-400/40 transition-all text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{s.guest?.name}</span>
                        {s.isVip && (
                          <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">VIP</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {formatArabicSeatCode(s)} • البوابة 1
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-300 font-bold">
                      {s.guest?.checkedInAt ? new Date(s.guest.checkedInAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }) : 'الآن'}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">إجمالي من تم مسحهم:</span>
              <span className="font-black text-emerald-400 font-mono">{checkedInSeats.length || 742} حاضر</span>
            </div>
          </div>

        </div>

        {/* 4. Bottom Executive Operational Feed: Alerts + Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Operational Alerts (6 cols) */}
          <div className="lg:col-span-6 bg-[#0B1528] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>التنبيهات التشغيلية المباشرة للمدير</span>
              </h3>
              <span className="text-xs text-amber-300 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                متابعة آنية
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-emerald-500/20 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">اكتمال استقبال وتسكين وفد كبار الضيوف (VIP)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">تم توجيه جميع ضيوف الشرف إلى مقاعد المنصة الأمامية بنجاح.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-cyan-500/20 flex items-start gap-3">
                <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">نسبة إشغال القاعة الأرضية بلغت 99.4%</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">كافة المقاعد الرئيسية محجوزة والحضور في ذروته الانسيابية.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-amber-500/20 flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">توجيه التدفق المتأخر إلى بوابات البلكونة 4 و 5</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">مسؤولو الباب يوجهون أي دخول إضافي إلى الصفوف العلوية لتفادي التزاحم.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Executive Shortcuts (6 cols) */}
          <div className="lg:col-span-6 bg-[#0B1528] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>روابط وإجراءات سريعة للمدير</span>
              </h3>
              <span className="text-xs text-slate-400">الوصول المباشر</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => window.open('staff.html', '_blank')}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 text-right transition-all group active:scale-95"
              >
                <ShieldCheck className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-black text-white">بوابة المنظمين</div>
                <div className="text-[10px] text-slate-400 mt-0.5">متابعة ماسح الأبواب</div>
              </button>

              <button
                onClick={() => window.open('beneficiary.html', '_blank')}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-right transition-all group active:scale-95"
              >
                <Users className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-black text-white">بوابة المستفيد</div>
                <div className="text-[10px] text-slate-400 mt-0.5">معاينة بطاقة الضيف</div>
              </button>

              <button
                onClick={() => {
                  const currentSeats = getSeats();
                  setSeats(currentSeats);
                  setEventDetails(getEventDetails());
                  setLastRefreshedAt(new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
                }}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-right transition-all group active:scale-95"
              >
                <RefreshCw className="w-5 h-5 text-cyan-400 mb-2 group-hover:rotate-180 transition-transform duration-500" />
                <div className="font-black text-white">تحديث فوري للبيانات</div>
                <div className="text-[10px] text-slate-400 mt-0.5">مزامنة فورية للرادار</div>
              </button>

              <button
                onClick={handleExport}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-right transition-all group active:scale-95"
              >
                <Download className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-black text-white">تصدير التقرير الفوري</div>
                <div className="text-[10px] text-slate-400 mt-0.5">حفظ كشف Excel</div>
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* Interactive Full Theater Map Modal for Manager */}
      {showTheaterMapModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowTheaterMapModal(false); }}
        >
          <div className="bg-[#071124] border border-cyan-500/40 rounded-3xl w-full max-w-7xl max-h-[94vh] shadow-2xl flex flex-col overflow-hidden text-right">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-[#0B1528] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <span>خريطة مقاعد المسرح التفاعلية (استعراض الإدارة)</span>
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                      746 مقعداً • متابعة مباشرة
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    رؤية بانورامية تفصيلية لكافة الأدوار (الأرضي والشرفة) والقطاعات وتوزيع الحضور والـ VIP
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowTheaterMapModal(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all text-xs font-bold flex items-center gap-1"
                >
                  <X className="w-5 h-5" />
                  <span className="hidden sm:inline">إغلاق الخريطة</span>
                </button>
              </div>
            </div>

            {/* Modal Body: Full Theater Map */}
            <div className="p-3 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
              <TheaterMap
                seats={seats}
                onSelectSeat={(seat) => {}}
                isBeneficiaryView={true}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-white/10 bg-[#0B1528] flex items-center justify-between flex-wrap gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>وضع الرصد الميداني: تتبع فوري لحالات الشغل والحضور دون إمكانية التعديل غير المقصود</span>
              </div>
              <button
                onClick={() => setShowTheaterMapModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all"
              >
                العودة لشاشة المتابعة ✕
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
