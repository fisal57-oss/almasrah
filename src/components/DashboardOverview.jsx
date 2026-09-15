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
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-gradient-to-r from-[#0d1f3d]/80 via-[#0a1830]/90 to-[#071124] border border-cyan-500/20 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
        
        {/* Welcome Text */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs bg-amber-500/15 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30 font-bold flex items-center gap-1.5 shadow-sm">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>الإدارة العامة للتعليم بمنطقة عسير</span>
            </span>
            <span className="text-xs bg-cyan-500/15 text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/30 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>لوحة القيادة والمتابعة الحية</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide pt-1">
            {eventDetails.title || 'مسرح الإدارة العامة للتعليم بمنطقة عسير'}
          </h1>
          <p className="text-xs text-slate-300 flex items-center gap-2 flex-wrap">
            <span>📍 {eventDetails.venue || 'المسرح الرئيسي'}</span>
            <span>•</span>
            <span>📅 {eventDetails.date || '2026/10/07'}</span>
            <span>•</span>
            <span>⏰ {eventDetails.time || '07:00 م'}</span>
          </p>
        </div>

        {/* Live Digital Clock Widget */}
        <div className="bg-[#060c17]/90 border border-cyan-400/30 rounded-2xl p-4 flex items-center gap-4 shadow-xl shadow-cyan-500/5 min-w-[270px] shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center font-bold text-xl shrink-0">
            <Clock className="w-6 h-6 animate-pulse text-cyan-300" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black font-mono tracking-wider text-cyan-300">
              {timeStr || '07:00:00 م'}
            </div>
            <div className="text-[11px] font-bold text-slate-300 mt-0.5">
              {dateStr || 'الأربعاء، 15 سبتمبر 2026'}
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
          <div className="mt-2 text-[11px] text-cyan-300 font-medium">
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
            <span className="text-xs text-blue-300 font-bold">مقعد شاغر</span>
          </div>
          <div className="mt-2 text-[11px] text-blue-300 font-medium">
            VIP متاح: {vipSeats.length - vipOccupied} من {vipSeats.length}
          </div>
        </div>

      </div>

      {/* Main Grid: Occupancy Progress + Fast Action Bar + Live Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 cols): Occupancy Analytics & Actions */}
        <div className="lg:col-span-2 space-y-6">
          
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
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
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
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
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
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-amber-500/20">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${vipSeats.length > 0 ? Math.round((vipOccupied / vipSeats.length) * 100) : 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Action Hub Buttons Grid */}
          <div className="bg-[#0b162b] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>إجراءات وعمليات سريعة للوحة التحكم</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              
              {/* Action 1: Door Scanner */}
              <button
                onClick={onNavigateToScanner}
                className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 hover:from-cyan-500/30 hover:to-blue-600/40 border border-cyan-400/40 text-cyan-200 font-bold text-xs flex flex-col items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-400/20 flex items-center justify-center text-cyan-300">
                  <QrCode className="w-5 h-5" />
                </div>
                <span>ماسح الباركود والباب</span>
                <span className="text-[9px] text-cyan-300 font-normal">Live Check-in</span>
              </button>

              {/* Action 2: Seating Map */}
              <button
                onClick={onNavigateToMap}
                className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-600/30 hover:from-purple-500/30 hover:to-indigo-600/40 border border-purple-400/40 text-purple-200 font-bold text-xs flex flex-col items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-400/20 flex items-center justify-center text-purple-300">
                  <Armchair className="w-5 h-5" />
                </div>
                <span>خريطة المسرح التفاعلية</span>
                <span className="text-[9px] text-purple-300 font-normal">Interactive Map</span>
              </button>

              {/* Action 3: Invitations & Cards Hub */}
              <button
                onClick={onNavigateToInvitations}
                className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-600/30 hover:from-amber-500/30 hover:to-yellow-600/40 border border-amber-400/40 text-amber-200 font-bold text-xs flex flex-col items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300">
                  <Mail className="w-5 h-5" />
                </div>
                <span>مركز الدعوات والبطاقات</span>
                <span className="text-[9px] text-amber-300 font-normal">Cards & Tickets</span>
              </button>

              {/* Action 4: Guest List & Excel */}
              <button
                onClick={onNavigateToList}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
                  <FileText className="w-5 h-5" />
                </div>
                <span>قائمة الحجوزات والضيوف</span>
                <span className="text-[9px] text-slate-400 font-normal">Guest Roster</span>
              </button>

              {/* Action 5: Export to Excel */}
              <button
                onClick={handleExportExcel}
                className="p-4 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 text-emerald-300 font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                  <Download className="w-5 h-5" />
                </div>
                <span>تصدير كشف Excel</span>
                <span className="text-[9px] text-emerald-300 font-normal">Export .xlsx</span>
              </button>

              {/* Action 6: Seat Labels Print */}
              <button
                onClick={onOpenPrintLabels}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300">
                  <Printer className="w-5 h-5" />
                </div>
                <span>طباعة ملصقات المقاعد</span>
                <span className="text-[9px] text-slate-400 font-normal">Print QR Labels</span>
              </button>

            </div>
          </div>

        </div>

        {/* Right Column: Live Check-in Feed & Event Highlights */}
        <div className="space-y-6">
          
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
              <div className="py-8 text-center text-slate-400 text-xs space-y-2">
                <ShieldCheck className="w-8 h-8 text-slate-500 mx-auto" />
                <p>لم يتم تسجيل حضور ضيوف بعد</p>
                <p className="text-[10px] text-slate-400">ستظهر الأسماء هنا فور مسح الباركود عند الباب</p>
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

          {/* Quick Share & System Info */}
          <div className="bg-gradient-to-br from-[#0c1b36] to-[#071124] border border-cyan-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <h4 className="text-xs font-black text-cyan-300 uppercase tracking-wider">
              رابط بوابة المستفيد السريع
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              يمكنك مشاركة الرابط العام مع المنظمين أو الضيوف للاطلاع على مقاعدهم وتذاكرهم:
            </p>
            <button
              onClick={handleShareLink}
              className="w-full py-3 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
            >
              <Share2 className="w-4 h-4 text-cyan-300" />
              <span>نسخ رابط بوابة الضيوف</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
