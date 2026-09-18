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
  ArrowLeft,
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
  ChevronLeft,
  TrendingUp,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { exportSeatsToExcel } from '../utils/excelUtils';

export default function DashboardOverview({ 
  stats, 
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
  const reservedCount = stats.reserved || 0;
  const checkedInCount = stats.checkedIn || 0;
  const availableCount = stats.available || 0;
  
  const occupancyRate = totalSeats > 0 ? Math.round(((reservedCount + checkedInCount) / totalSeats) * 100) : 0;
  const attendanceRate = (reservedCount + checkedInCount) > 0 
    ? Math.round((checkedInCount / (reservedCount + checkedInCount)) * 100) 
    : 0;

  // Level stats
  const groundSeats = seats.filter(s => s.level !== 'B');
  const balconySeats = seats.filter(s => s.level === 'B');
  
  const groundOccupied = groundSeats.filter(s => s.status === 'reserved' || s.status === 'checked_in').length;
  const balconyOccupied = balconySeats.filter(s => s.status === 'reserved' || s.status === 'checked_in').length;
  
  const groundRate = groundSeats.length > 0 ? Math.round((groundOccupied / groundSeats.length) * 100) : 0;
  const balconyRate = balconySeats.length > 0 ? Math.round((balconyOccupied / balconySeats.length) * 100) : 0;

  // VIP stats
  const vipSeats = seats.filter(s => s.isVip);
  const vipOccupied = vipSeats.filter(s => s.status === 'reserved' || s.status === 'checked_in').length;

  // Recent checked-in guests
  const recentCheckedIn = seats
    .filter(s => s.status === 'checked_in' && s.guest)
    .sort((a, b) => new Date(b.guest?.checkedInAt || 0) - new Date(a.guest?.checkedInAt || 0))
    .slice(0, 5);

  const handleShareLink = () => {
    const shareUrl = window.location.origin + window.location.pathname;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert('تم نسخ الرابط العام للنظام إلى الحافظة بنجاح!');
    } else {
      alert(`الرابط: ${shareUrl}`);
    }
  };

  const handleExportExcel = () => {
    exportSeatsToExcel(seats, eventDetails);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10" dir="rtl">
      
      {/* Top Welcome Header & Live Clock Banner */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-gradient-to-r from-[#0d1f3d]/90 via-[#0a1830]/95 to-[#071124] border border-cyan-500/20 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -left-20 -top-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Welcome Text */}
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs bg-amber-500/15 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30 font-bold flex items-center gap-1.5 shadow-sm">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>{eventDetails.orgName || 'الإدارة العامة للتعليم بمنطقة عسير'}</span>
            </span>
            <span className="text-xs bg-cyan-500/15 text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/30 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>لوحة القيادة والمتابعة الحية</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            {eventDetails.title || 'مسرح الإدارة العامة للتعليم بمنطقة عسير'}
          </h1>
          <div className="text-xs text-slate-300 flex items-center gap-2.5 flex-wrap font-medium">
            <span className="flex items-center gap-1">📍 <span>{eventDetails.venue || 'المسرح الرئيسي - القاعة الكبرى'}</span></span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">📅 <span>{eventDetails.date || 'الجمعة، 25 أكتوبر 2026'}</span></span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">⏰ <span>{eventDetails.time || '08:00 مساءً (تفتح الأبواب 07:00 مساءً)'}</span></span>
          </div>
        </div>

        {/* Live Digital Clock Widget */}
        <div className="bg-[#060c17]/95 border border-cyan-400/30 rounded-2xl p-4 flex items-center gap-4 shadow-xl shadow-cyan-500/5 w-full lg:w-auto shrink-0 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center font-bold text-xl shrink-0">
            <Clock className="w-6 h-6 animate-pulse text-cyan-300" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black font-mono tracking-wider text-cyan-300">
              {timeStr || '00:00:00'}
            </div>
            <div className="text-xs font-bold text-slate-400 mt-0.5">
              {dateStr || 'اليوم'}
            </div>
          </div>
        </div>
      </div>

      {/* Primary 4 Metric Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Capacity */}
        <div className="bg-gradient-to-br from-[#0c1b36] to-[#071124] border border-cyan-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-cyan-400/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">إجمالي الطاقة الاستيعابية</span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 flex items-center justify-center">
              <Armchair className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{totalSeats}</span>
            <span className="text-xs text-slate-400 font-bold">مقعد مجهز</span>
          </div>
          <div className="mt-2 text-[11px] text-cyan-300/90 font-medium">
            الأرضي ({groundSeats.length}) • البلكونة ({balconySeats.length})
          </div>
        </div>

        {/* Metric 2: Reserved Bookings */}
        <div className="bg-gradient-to-br from-[#0c1b36] to-[#071124] border border-amber-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-amber-400/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">المقاعد المحجوزة</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-300">{reservedCount + checkedInCount}</span>
            <span className="text-xs text-amber-400/80 font-bold">حجز مؤكد</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">نسبة الإشغال:</span>
            <span className="text-amber-300 font-bold">{occupancyRate}%</span>
          </div>
        </div>

        {/* Metric 3: Live Checked-in Attendees */}
        <div className="bg-gradient-to-br from-[#0c1b36] to-[#071124] border border-emerald-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-emerald-400/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">الحضور الفعلي (تم المسح)</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-300">{checkedInCount}</span>
            <span className="text-xs text-emerald-400/80 font-bold">ضيف حاضر بالقاعة</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">نسبة الحضور للمحجوز:</span>
            <span className="text-emerald-300 font-bold">{attendanceRate}%</span>
          </div>
        </div>

        {/* Metric 4: Available Seats */}
        <div className="bg-gradient-to-br from-[#0c1b36] to-[#071124] border border-blue-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-blue-400/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">المقاعد المتبقية الشاغرة</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-300 border border-blue-400/30 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{availableCount}</span>
            <span className="text-xs text-blue-300 font-bold">مقعد متاح</span>
          </div>
          <div className="mt-2 text-[11px] text-blue-300/90 font-medium">
            VIP متاح: {vipSeats.length - vipOccupied} من {vipSeats.length}
          </div>
        </div>
      </div>

      {/* Main Balanced Layout: Left Side (Live Status & Quick Share) + Right Side (Occupancy & Quick Command Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Right Section (8 Cols): Occupancy Bars + Unified Clean Quick Action Grid */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Detailed Occupancy Breakdown by Floor / Level */}
          <div className="bg-[#0b162b] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>معدلات إشغال الأدوار والقطاعات</span>
              </h3>
              <span className="text-xs text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 font-bold">
                إشغال عام {occupancyRate}%
              </span>
            </div>

            {/* Ground Level Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-200">الدور الأرضي (القاعة الرئيسية)</span>
                <span className="text-cyan-300">{groundOccupied} / {groundSeats.length} ({groundRate}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${groundRate}%` }}
                />
              </div>
            </div>

            {/* Balcony Level Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-200">الدور الثاني (البلكونة العلوية)</span>
                <span className="text-purple-300">{balconyOccupied} / {balconySeats.length} ({balconyRate}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${balconyRate}%` }}
                />
              </div>
            </div>

            {/* VIP Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-amber-300 flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>مقاعد كبار الشخصيات والضيوف (VIP)</span>
                </span>
                <span className="text-amber-300">{vipOccupied} / {vipSeats.length} ({vipSeats.length > 0 ? Math.round((vipOccupied / vipSeats.length) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-amber-500/20">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${vipSeats.length > 0 ? Math.round((vipOccupied / vipSeats.length) * 100) : 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Action Hub: Unified 6-Card Symmetric Layout */}
          <div className="bg-[#0b162b] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>منصة الإجراءات والعمليات السريعة</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">الوصول المباشر للمهام الرئيسية</span>
            </div>

            {/* 6 Perfectly Balanced Cards (3 Columns x 2 Rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              
              {/* Action 1: Door Scanner */}
              <button
                onClick={onNavigateToScanner}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-right transition-all group hover:scale-[1.02] active:scale-95 flex items-start gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/25 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white group-hover:text-cyan-300 transition-colors">ماسح الباركود والباب</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">تسجيل الدخول الفوري عند المدخل</div>
                </div>
              </button>

              {/* Action 2: Seating Map */}
              <button
                onClick={onNavigateToMap}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 text-right transition-all group hover:scale-[1.02] active:scale-95 flex items-start gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-400/25 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Armchair className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white group-hover:text-purple-300 transition-colors">خريطة مقاعد المسرح</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">استعراض وحجز المقاعد التفاعلية</div>
                </div>
              </button>

              {/* Action 3: Invitations & Cards Hub */}
              <button
                onClick={onNavigateToInvitations}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-right transition-all group hover:scale-[1.02] active:scale-95 flex items-start gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-400/25 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white group-hover:text-amber-300 transition-colors">مركز الدعوات والبطاقات</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">إرسال وتجهيز بطاقات الدخول QR</div>
                </div>
              </button>

              {/* Action 4: Guest List */}
              <button
                onClick={onNavigateToList}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 text-right transition-all group hover:scale-[1.02] active:scale-95 flex items-start gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-400/25 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white group-hover:text-blue-300 transition-colors">كشف الضيوف والحجوزات</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">سجل الحضور والبحث السريع</div>
                </div>
              </button>

              {/* Action 5: Digital Booking Form */}
              <button
                onClick={onNavigateToBookingForm}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-right transition-all group hover:scale-[1.02] active:scale-95 flex items-start gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-400/25 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white group-hover:text-emerald-300 transition-colors">استمارة حجز القاعات</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">تقديم طلب حجز قاعة أو مسرح</div>
                </div>
              </button>

              {/* Action 6: Seat Labels Print */}
              <button
                onClick={onOpenPrintLabels}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-right transition-all group hover:scale-[1.02] active:scale-95 flex items-start gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-rose-500/15 border border-rose-400/25 flex items-center justify-center text-rose-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white group-hover:text-rose-300 transition-colors">طباعة ملصقات المقاعد QR</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">طباعة استكرات الباركود للمقاعد</div>
                </div>
              </button>

            </div>

            {/* Bottom Quick Tools Strip */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportExcel}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/25 text-xs font-bold transition-all flex items-center gap-2 active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تصدير كشف Excel</span>
                </button>
                {onOpenPrintAllTickets && (
                  <button
                    onClick={onOpenPrintAllTickets}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all flex items-center gap-2 active:scale-95"
                  >
                    <Printer className="w-3.5 h-3.5 text-cyan-400" />
                    <span>طباعة تذاكر الحضور</span>
                  </button>
                )}
                {onOpenSeatManager && (
                  <button
                    onClick={onOpenSeatManager}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all flex items-center gap-2 active:scale-95"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>تخصيص المقاعد</span>
                  </button>
                )}
              </div>
              <button
                onClick={onNavigateToItqan}
                className="px-3.5 py-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-400/30 text-xs font-bold transition-all flex items-center gap-2 active:scale-95"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>إدارة القاعات والمقرات (إتقان) 🏢</span>
              </button>
            </div>
          </div>

        </div>

        {/* Left Section (4 Cols): Live Check-in Feed + Guest Portal Hub */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Check-in Activity Feed */}
          <div className="bg-[#0b162b] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-emerald-400" />
                <span>آخر عمليات الدخول عند الباب</span>
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30 animate-pulse">
                مباشر
              </span>
            </div>

            {recentCheckedIn.length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-xs space-y-2.5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                  <ShieldCheck className="w-6 h-6 text-slate-400" />
                </div>
                <p className="font-bold text-slate-300">لم يتم تسجيل حضور ضيوف بعد</p>
                <p className="text-[11px] text-slate-400 leading-relaxed max-w-[240px] mx-auto">
                  ستظهر أسماء وبيانات الضيوف هنا تلقائياً بمجرد مسح بطاقات الـ QR عند الباب.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentCheckedIn.map((s, idx) => (
                  <div 
                    key={s.id || idx}
                    className="p-3 rounded-2xl bg-white/5 border border-emerald-500/20 flex items-center justify-between hover:border-emerald-400/40 transition-all"
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{s.guest?.name}</span>
                        {s.isVip && (
                          <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">VIP</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        الصف ({s.row}) • مقعد ({s.number}) • {s.level === 'B' ? 'البلكونة' : 'الأرضي'}
                      </div>
                    </div>
                    <div className="text-left font-mono text-[10px] text-emerald-300 font-bold">
                      {s.guest?.checkedInAt ? new Date(s.guest.checkedInAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }) : 'الآن'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Share & Beneficiary Portal Card */}
          <div className="bg-gradient-to-br from-[#0c1b36] to-[#071124] border border-cyan-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">رابط بوابة المستفيد والضيوف</h4>
                <p className="text-[11px] text-slate-400">مشاركة سريعة للاستعلام عن المقاعد والتذاكر</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              يمكنك مشاركة الرابط العام المباشر مع المنظمين أو الضيوف للاطلاع على حجزهم وبطاقات الدخول:
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleShareLink}
                className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-300" />
                <span>نسخ رابط بوابة الضيوف</span>
              </button>

              <button
                onClick={() => window.open('beneficiary.html', '_blank')}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>معاينة بوابة الضيوف ↗</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
