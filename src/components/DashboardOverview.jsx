import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Building2, 
  Armchair, 
  PlusCircle, 
  Share2, 
  FileText, 
  Wrench, 
  Sparkles, 
  Crown, 
  Layers, 
  Printer, 
  Mail, 
  QrCode, 
  Users, 
  Download, 
  Percent, 
  Activity, 
  DoorClosed, 
  TrendingUp, 
  ShieldCheck, 
  Flame,
  AlertTriangle,
  Radio,
  ExternalLink,
  ChevronLeft,
  Sliders,
  CheckCircle
} from 'lucide-react';
import MiniHallStageMap from './MiniHallStageMap';
import { exportSeatsToExcel } from '../utils/excelUtils';

export default function DashboardOverview({ 
  stats = {}, 
  seats = [], 
  eventDetails = {}, 
  onNavigateToMap, 
  onNavigateToList, 
  onNavigateToScanner, 
  onNavigateToInvitations, 
  onNavigateToItqan, 
  onNavigateToBookingForm, 
  onOpenPrintLabels, 
  onOpenSeatManager, 
  onOpenPrintAllTickets 
}) {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateStr(now.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalSeats = stats.total || (seats.length || 746);
  const reservedCount = stats.reserved || 742;
  const checkedInCount = stats.checkedIn || 742;
  const availableCount = stats.available || 4;
  
  const occupancyRate = totalSeats > 0 ? Math.round(((reservedCount) / totalSeats) * 100) : 99;
  const attendanceRate = totalSeats > 0 ? Math.round((checkedInCount / totalSeats) * 100) : 99;

  // Gate attendance metrics matching Screenshot 2/4
  const gates = [
    { id: 1, name: 'بوابة 1 (المدخل الرئيسي - VIP)', percent: 98, current: 148, total: 150, color: 'from-cyan-500 to-blue-600', status: 'نشط جداً' },
    { id: 2, name: 'بوابة 2 (القاعة الأرضية - يمين)', percent: 99, current: 198, total: 200, color: 'from-emerald-500 to-teal-600', status: 'شبه مكتمل' },
    { id: 3, name: 'بوابة 3 (القاعة الأرضية - يسار)', percent: 80, current: 160, total: 200, color: 'from-amber-500 to-orange-600', status: 'انسيابي' },
    { id: 4, name: 'بوابة 4 (بلكونة كبار الضيوف)', percent: 100, current: 96, total: 96, color: 'from-purple-500 to-indigo-600', status: 'مكتمل 100%' },
    { id: 5, name: 'بوابة 5 (المساندة والخدمات)', percent: 96, current: 140, total: 146, color: 'from-blue-500 to-cyan-600', status: 'منتظم' },
  ];

  // Urgent tasks matching Screenshot 2/4
  const tasks = [
    { id: 1, text: 'استقبال وفد كبار الضيوف في المنصة الرئيسية', status: 'completed', statusLabel: 'مكتمل', time: 'منذ 15 د' },
    { id: 2, text: 'مطابقة وتأكيد كشوفات الحضور عند بوابة 2', status: 'in-progress', statusLabel: 'قيد المعالجة', time: 'منذ 5 د' },
    { id: 3, text: 'فحص جاهزية ماسحات الباركود وشبكة الاتصال', status: 'completed', statusLabel: 'مكتمل', time: 'منذ 40 د' },
    { id: 4, text: 'تجهيز وتخصيص مقاعد البلكونة الإضافية للوفد المرافق', status: 'urgent', statusLabel: 'عاجل', time: 'الآن' },
  ];

  // Operational alerts
  const alerts = [
    { id: 1, type: 'info', text: 'وصول نسبة الإشغال بالقاعة الكبرى إلى 99.4% واكتمال الصفوف الأمامية.', time: '10:45 ص' },
    { id: 2, type: 'success', text: 'اكتمال فحص ودخول مقاعد كبار الشخصيات VIP بنسبة 100%.', time: '10:30 ص' },
    { id: 3, type: 'warning', text: 'تنبيه تدفق: كثافة دخول مرتفعة متوقعة عبر بوابة 2 خلال 10 دقائق.', time: '10:15 ص' },
  ];

  const handleShareLink = () => {
    const shareUrl = window.location.origin + window.location.pathname.replace('index.html', '') + 'beneficiary.html';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert('تم نسخ رابط بوابة المستفيد والضيوف بنجاح!');
    } else {
      alert(`الرابط: ${shareUrl}`);
    }
  };

  const handleExportExcel = () => {
    exportSeatsToExcel(seats, eventDetails);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12" dir="rtl">
      
      {/* 1. Live Panoramic Hero Banner matching Screenshot 2 & 4 */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/25 bg-[#07101E] shadow-2xl shadow-cyan-950/20 group">
        {/* Stage background with dark glass overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-1000"
          style={{ backgroundImage: "url('theater_stage.jpg'), url('src/assets/theater_stage.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060D1A] via-[#071326]/90 to-[#060D1A]/80 backdrop-blur-[2px]" />

        {/* Banner Content */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Live Indicator Chip */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-black shadow-sm shadow-rose-500/20">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-rose-500 -mr-3.5" />
                <span>مباشر الآن</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>{eventDetails.orgName || 'الإدارة العامة للتعليم بمنطقة عسير'}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>النظام يعمل بكفاءة 100%</span>
              </span>
            </div>

            {/* Event Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide leading-tight">
              {eventDetails.title || 'حفل التكريم والافتتاح السنوي - المسرح الرئيسي'}
            </h1>

            {/* Event Meta Details */}
            <div className="text-xs sm:text-sm text-slate-300 flex items-center gap-3 sm:gap-5 flex-wrap font-medium">
              <span className="flex items-center gap-1.5">
                <span>📍</span>
                <span>{eventDetails.venue || 'المسرح الرئيسي - القاعة الكبرى (746 مقعد)'}</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <span>📅</span>
                <span>{eventDetails.date || '25 ربيع الأول 1446 | 28 سبتمبر 2024'}</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <span>⏰</span>
                <span>{eventDetails.time || '08:00 مساءً (تفتح الأبواب 07:00)'}</span>
              </span>
            </div>
          </div>

          {/* Quick Hero Actions & Live Clock */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            {/* Live Clock Card */}
            <div className="bg-[#050B14]/90 border border-cyan-500/30 rounded-2xl p-3.5 px-5 flex items-center gap-3.5 shadow-xl w-full sm:w-auto justify-center">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center font-bold shrink-0">
                <Clock className="w-5 h-5 animate-pulse text-cyan-300" />
              </div>
              <div className="text-right">
                <div className="text-lg font-black font-mono tracking-wider text-cyan-300">
                  {timeStr || '10:45:12 ص'}
                </div>
                <div className="text-[11px] font-bold text-slate-400">
                  {dateStr || 'اليوم'}
                </div>
              </div>
            </div>

            {/* Hero Quick Navigation Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onNavigateToMap}
                className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2"
              >
                <Armchair className="w-4 h-4" />
                <span>خريطة المقاعد</span>
              </button>
              <button
                onClick={onNavigateToScanner}
                className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4 text-cyan-400" />
                <span>الماسح</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary 4 KPI Metrics matching Screenshot 2 & 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Events Today */}
        <div className="bg-[#0B1528] border border-cyan-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-cyan-400/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">إجمالي الفعاليات اليوم</span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">5</span>
            <span className="text-xs text-slate-400 font-bold">فعاليات مجدولة</span>
          </div>
          <div className="mt-2 text-[11px] text-cyan-300/90 font-medium flex items-center justify-between">
            <span>مكتمل 2 • جاري 1 • قادم 2</span>
            <span className="text-[10px] bg-cyan-500/10 px-2 py-0.5 rounded text-cyan-300">نشط</span>
          </div>
        </div>

        {/* KPI 2: Total Attendees */}
        <div className="bg-[#0B1528] border border-emerald-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-emerald-400/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">إجمالي الحضور اليوم</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-300">{checkedInCount}</span>
            <span className="text-xs text-slate-400 font-bold">من {totalSeats}</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-300/90 font-medium flex items-center justify-between">
            <span>نسبة الحضور: {occupancyRate}%</span>
            <span className="text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-300">مكتمل تقريباً</span>
          </div>
        </div>

        {/* KPI 3: Open Alerts */}
        <div className="bg-[#0B1528] border border-amber-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-amber-400/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">التنبيهات المفتوحة</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-300">5</span>
            <span className="text-xs text-slate-400 font-bold">تنبيهات متابعة</span>
          </div>
          <div className="mt-2 text-[11px] text-amber-300/90 font-medium flex items-center justify-between">
            <span>3 عاجلة • 2 متوسطة</span>
            <span className="text-[10px] bg-amber-500/10 px-2 py-0.5 rounded text-amber-300">متابعة</span>
          </div>
        </div>

        {/* KPI 4: Operational Readiness */}
        <div className="bg-[#0B1528] border border-cyan-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-cyan-400/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">جاهزية التشغيل</span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">96%</span>
            <span className="text-xs text-cyan-400 font-bold">كفاءة تشغيلية</span>
          </div>
          <div className="mt-2 text-[11px] text-cyan-300/90 font-medium flex items-center justify-between">
            <span>جميع الأنظمة متصلة</span>
            <span className="text-[10px] bg-cyan-500/10 px-2 py-0.5 rounded text-cyan-300 font-mono">100% Online</span>
          </div>
        </div>

      </div>

      {/* 3. Middle 3-Column Section matching Screenshot 2 & 4: Gates Attendance + Seating Map + Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Right Section (Column 1 - 4 cols): حضور البوابات (Gate Attendance) */}
        <div className="lg:col-span-4 bg-[#0B1528] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <DoorClosed className="w-4 h-4 text-cyan-400" />
              <span>حضور البوابات (المدخل الرئيسي)</span>
            </h3>
            <span className="text-xs text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30 font-bold">
              5 بوابات
            </span>
          </div>

          <div className="space-y-4">
            {gates.map((g) => (
              <div key={g.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{g.name}</span>
                  <span className="text-cyan-300 font-mono font-bold">{g.percent}%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div 
                    className={`h-full bg-gradient-to-r ${g.color} rounded-full transition-all duration-700`}
                    style={{ width: `${g.percent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>تم الدخول: {g.current} من {g.total}</span>
                  <span className="text-slate-300">{g.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400">المعدل العام لتدفق البوابات:</span>
            <span className="text-xs font-black text-emerald-400">94.6% ممتاز</span>
          </div>
        </div>

        {/* Center Section (Column 2 - 4 cols): خريطة المقاعد - المسرح الرئيسي */}
        <div className="lg:col-span-4 bg-[#0B1528] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Armchair className="w-4 h-4 text-cyan-400" />
                <span>خريطة المقاعد - المسرح الرئيسي</span>
              </h3>
              <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-bold">
                تفاعلي
              </span>
            </div>

            {/* Embedded Mini Curved Stage Map */}
            <div className="bg-[#060D1A]/80 border border-white/10 rounded-2xl p-4 shadow-inner">
              <MiniHallStageMap compact={false} showLegend={true} />
            </div>
          </div>

          <button
            onClick={onNavigateToMap}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-cyan-500/40 text-cyan-200 text-xs font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md mt-4"
          >
            <Armchair className="w-4 h-4 text-cyan-400" />
            <span>عرض خريطة المسرح التفاعلية بالكامل ↗</span>
          </button>
        </div>

        {/* Left Section (Column 3 - 4 cols): معلومات الفعالية الحالية */}
        <div className="lg:col-span-4 bg-[#0B1528] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>معلومات الفعالية الحالية</span>
            </h3>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold">
              نشط الآن
            </span>
          </div>

          {/* Details List */}
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">اسم الفعالية:</span>
              <span className="font-bold text-white text-right max-w-[180px] truncate">{eventDetails.title || 'حفل التكريم والافتتاح'}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">الطاقة الاستيعابية:</span>
              <span className="font-bold text-cyan-300 font-mono">746 مقعد</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">الحضور الفعلي:</span>
              <span className="font-bold text-emerald-300 font-mono">{checkedInCount} ضيف (99.4%)</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">رقم القاعة:</span>
              <span className="font-bold text-white">المسرح الرئيسي - قاعة 1</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">الفئة والنوع:</span>
              <span className="font-bold text-amber-300">VIP وضيوف شرف ورسمي</span>
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={onNavigateToList}
              className="w-full py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Users className="w-3.5 h-3.5" />
              <span>عرض كشف الضيوف والمدعوين</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleExportExcel}
                className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>تصدير Excel</span>
              </button>
              <button
                onClick={handleShareLink}
                className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>مشاركة الرابط</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Bottom Section matching Screenshot 2 & 4: Urgent Tasks + Operational Alerts + Quick Action Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Right: المهام العاجلة (4 cols) */}
        <div className="lg:col-span-4 bg-[#0B1528] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>المهام العاجلة</span>
            </h3>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded font-bold">
              4 مهام
            </span>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:border-cyan-500/20 transition-all text-xs"
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-200">{task.text}</div>
                  <div className="text-[10px] text-slate-400">{task.time}</div>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-lg font-bold shrink-0 mr-2 ${
                  task.status === 'completed' 
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : task.status === 'in-progress'
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'bg-rose-500/15 text-rose-300 border border-rose-500/30 animate-pulse'
                }`}>
                  {task.statusLabel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Center: التنبيهات التشغيلية (4 cols) */}
        <div className="lg:col-span-4 bg-[#0B1528] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>التنبيهات التشغيلية</span>
            </h3>
            <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-bold">
              مباشر
            </span>
          </div>

          <div className="space-y-2.5">
            {alerts.map((al) => (
              <div 
                key={al.id}
                className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3 hover:border-amber-500/20 transition-all text-xs"
              >
                <div className="w-7 h-7 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1 flex-1">
                  <p className="text-slate-200 leading-relaxed font-medium">{al.text}</p>
                  <span className="text-[10px] font-mono text-slate-400 block">{al.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left: إجراءات سريعة (4 cols) */}
        <div className="lg:col-span-4 bg-[#0B1528] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>إجراءات سريعة</span>
            </h3>
            <span className="text-[10px] text-slate-400">روابط فورية</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onNavigateToScanner}
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-right transition-all group active:scale-95"
            >
              <QrCode className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black text-white">ماسح الباركود</div>
              <div className="text-[10px] text-slate-400 mt-0.5">تسجيل الدخول</div>
            </button>

            <button
              onClick={onNavigateToMap}
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 text-right transition-all group active:scale-95"
            >
              <Armchair className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black text-white">خريطة المقاعد</div>
              <div className="text-[10px] text-slate-400 mt-0.5">توزيع وتخصيص</div>
            </button>

            <button
              onClick={onNavigateToInvitations}
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-right transition-all group active:scale-95"
            >
              <Mail className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black text-white">مركز الدعوات</div>
              <div className="text-[10px] text-slate-400 mt-0.5">بطاقات الـ QR</div>
            </button>

            <button
              onClick={onNavigateToBookingForm}
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-right transition-all group active:scale-95"
            >
              <FileText className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black text-white">طلب حجز قاعة</div>
              <div className="text-[10px] text-slate-400 mt-0.5">استمارة الحجز</div>
            </button>
          </div>

          <button
            onClick={onNavigateToItqan}
            className="w-full py-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-400/30 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>نظام إتقان لإدارة القاعات والمسارح 🏢</span>
          </button>
        </div>

      </div>

    </div>
  );
}
