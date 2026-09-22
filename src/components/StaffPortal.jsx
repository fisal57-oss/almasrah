import React, { useState, useEffect, useRef } from 'react';
import { 
  QrCode, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  UserCheck, 
  Armchair, 
  Phone, 
  Clock, 
  Compass, 
  DoorClosed, 
  Sparkles, 
  ArrowRight, 
  Crown, 
  Users, 
  Filter, 
  Layers, 
  Check, 
  AlertCircle, 
  ExternalLink,
  Volume2,
  RefreshCw,
  MapPin,
  Calendar,
  PlusCircle,
  UserPlus,
  Ticket,
  Printer,
  Share2,
  Send,
  Download,
  Copy,
  FileSpreadsheet,
  Mail,
  Trash2,
  Eye,
  Camera,
  LogOut,
  Bell,
  Star,
  Settings,
  HelpCircle,
  FileText,
  BarChart3,
  Maximize2,
  Building2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  getSeats, 
  getEventDetails, 
  checkInTicket, 
  formatArabicSeatCode, 
  saveSeats, 
  bookSeat, 
  cancelBooking 
} from '../utils/storage';
import { playSuccessSound, playWarningSound } from '../utils/audio';
import { exportSeatsToExcel } from '../utils/excelUtils';
import MiniHallStageMap from './MiniHallStageMap';
import TheaterMap from './TheaterMap';
import MobileCameraScannerModal from './MobileCameraScannerModal';
import StaffLogin from './StaffLogin';
import AllTicketsPrintModal from './AllTicketsPrintModal';
import BatchSeatCardsPrintModal from './BatchSeatCardsPrintModal';
import SeatLabelsPrintModal from './SeatLabelsPrintModal';

export default function StaffPortal() {
  const [staffUser, setStaffUser] = useState(() => {
    try {
      const isAuth = localStorage.getItem('theaterStaffAuth') === 'true' || 
                     sessionStorage.getItem('theaterStaffAuth') === 'true';
      const stored = localStorage.getItem('theaterStaffAuthUser') || 
                     sessionStorage.getItem('theaterStaffAuthUser');
      if (isAuth && stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}
    return { name: 'أحمد السبيعي', role: 'مشرف دخول', gate: 'البوابة 1 (الرئيسية)' };
  });

  const [seats, setSeats] = useState(getSeats());
  const [eventDetails, setEventDetails] = useState(getEventDetails());
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'scanner', 'checkin', 'search', 'map', 'vip', 'notes', 'reports'
  const [showCameraScanner, setShowCameraScanner] = useState(false);
  const [showTheaterMapModal, setShowTheaterMapModal] = useState(false);
  
  // Scanner state
  const [inputCode, setInputCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [searchGuestQuery, setSearchGuestQuery] = useState('');
  const [guestTab, setGuestTab] = useState('all'); // 'all', 'vip'
  const [quickNote, setQuickNote] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  
  // Modals state
  const [showPrintAllModal, setShowPrintAllModal] = useState(false);
  const [showPrintLabelsModal, setShowPrintLabelsModal] = useState(false);

  const [gatesState, setGatesState] = useState([
    { id: 1, name: 'البوابة 1 - الرئيسية', status: 'open' },
    { id: 2, name: 'البوابة 2 - الضيوف', status: 'open' },
    { id: 3, name: 'البوابة 3 - كبار الشخصيات', status: 'open' },
    { id: 4, name: 'البوابة 4 - الإعلام', status: 'closed' },
    { id: 5, name: 'البوابة 5 - الخدمة', status: 'open' }
  ]);

  const toggleGateStatus = (gateId) => {
    setGatesState(prev => prev.map(g => {
      if (g.id === gateId) {
        return { ...g, status: g.status === 'open' ? 'closed' : 'open' };
      }
      return g;
    }));
  };

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setSeats(getSeats());
    setEventDetails(getEventDetails());
  };

  const handleManualCheckIn = (e) => {
    if (e) e.preventDefault();
    if (!inputCode.trim()) return;

    const result = checkInTicket(inputCode.trim());
    setScanResult(result);

    if (result.success) {
      try {
        playSuccessSound();
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      } catch (err) {}
      refreshData();
      setInputCode('');
    } else {
      try { playWarningSound(); } catch (err) {}
    }
  };

  const handleSaveQuickNote = () => {
    if (!quickNote.trim()) return;
    const newNote = {
      id: Date.now(),
      text: quickNote.trim(),
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };
    setSavedNotes([newNote, ...savedNotes]);
    setQuickNote('');
    alert('تم حفظ الملاحظة التشغيلية بنجاح.');
  };

  // Metrics
  const totalGuests = seats.length || 746;
  const checkedInCount = seats.filter(s => s.status === 'checked_in').length;
  const reservedCount = seats.filter(s => s.status === 'reserved').length;
  const remainingCount = totalGuests - checkedInCount;
  const vipSeats = seats.filter(s => s.isVip);
  const vipCheckedIn = vipSeats.filter(s => s.status === 'checked_in').length;

  const checkinRate = totalGuests > 0 ? Math.round((checkedInCount / totalGuests) * 100) : 0;
  const remainingRate = totalGuests > 0 ? Math.round((remainingCount / totalGuests) * 100) : 0;
  const vipRate = vipSeats.length > 0 ? Math.round((vipCheckedIn / vipSeats.length) * 100) : 0;

  // Filtered guests for search box
  const filteredGuests = seats.filter(s => {
    if (!s.guest) return false;
    if (guestTab === 'vip' && !s.isVip) return false;
    if (!searchGuestQuery.trim()) return true;
    const q = searchGuestQuery.trim().toLowerCase();
    return (s.guest.name || '').toLowerCase().includes(q) ||
           (s.guest.phone || '').includes(q) ||
           (s.guest.token || '').toLowerCase().includes(q) ||
           s.id.toLowerCase().includes(q);
  });

  // Recent checked-in guests
  const recentCheckedIn = seats
    .filter(s => s.status === 'checked_in' && s.guest)
    .sort((a, b) => new Date(b.guest?.checkedInAt || 0) - new Date(a.guest?.checkedInAt || 0))
    .slice(0, 5);

  // VIP sample list matching screenshot
  const vipSampleList = [
    { name: 'الأمير سعود بن خالد آل سعود', sector: 'القطاع الملكي - الصف الأول', seat: 'A1', checkedIn: true, time: '07:11 م' },
    { name: 'الدكتورة نورة بنت عبدالله', sector: 'القطاع الرئيسي - الصف الأول', seat: 'B12', checkedIn: true, time: '07:08 م' },
    { name: 'الأستاذ فيصل المطيري', sector: 'القطاع الرئيسي - الصف الثاني', seat: 'C8', checkedIn: true, time: '07:05 م' },
    { name: 'سعاد أحمد القحطاني', sector: 'كبار الشخصيات - الصف الأول', seat: 'D5', checkedIn: true, time: '07:03 م' }
  ];

  // Nav Items
  const staffNavItems = [
    { id: 'dashboard', label: 'لوحة العمليات', icon: Compass },
    { id: 'scanner', label: 'مسح QR', icon: QrCode, onClick: () => setShowCameraScanner(true) },
    { id: 'checkin', label: 'تسجيل الحضور', icon: UserCheck },
    { id: 'search', label: 'البحث عن ضيف', icon: Search },
    { id: 'map', label: 'خريطة المقاعد', icon: Armchair, onClick: () => setShowTheaterMapModal(true) },
    { id: 'vip', label: 'الضيوف المهمون', icon: Star },
    { id: 'notes', label: 'ملاحظات سريعة', icon: FileText },
    { id: 'reports', label: 'تقارير الدخول', icon: BarChart3 },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
    { id: 'itqan', label: 'بوابة إتقان (مستقلة) ↗', icon: Building2, onClick: () => window.open('itqan.html', '_blank') }
  ];

  return (
    <div className="min-h-screen bg-[#060D1A] text-white flex flex-col font-sans selection:bg-cyan-400 selection:text-slate-950" dir="rtl">
      
      {/* Top Header Bar */}
      <header className="bg-[#071124]/95 border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-2xl">
        
        {/* Left: User Profile & Notification */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 p-1.5 pl-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-xs text-slate-950">
              {staffUser.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-right leading-tight">
              <div className="text-xs font-bold text-white">{staffUser.name}</div>
              <div className="text-[10px] text-cyan-400 font-medium">{staffUser.role}</div>
            </div>
          </div>

          <div className="relative p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] cursor-pointer transition-all">
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center border-2 border-[#071124]">
              3
            </span>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث عن اسم الضيف أو رقم الجوال أو رمز الدعوة..."
              value={searchGuestQuery}
              onChange={(e) => setSearchGuestQuery(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 rounded-2xl pr-10 pl-4 py-2 text-xs text-white placeholder-slate-400 outline-none transition-all"
            />
          </div>
          <div className="text-right shrink-0">
            <div className="text-[11px] font-bold text-slate-300">مرحباً بك في</div>
            <div className="text-xs font-black text-cyan-400">بوابة المسرح والقاعات</div>
          </div>
        </div>

        {/* Right: Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-black text-white tracking-wide">
              بوابة المسرح والقاعات
            </div>
            <div className="text-[10px] text-cyan-400 font-bold tracking-wider">
              {eventDetails.orgName || 'الإدارة العامة للتعليم بمنطقة عسير'}
            </div>
          </div>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0B1528] border border-cyan-500/20 hover:border-cyan-400/40 p-1.5 flex items-center justify-center shadow-lg shadow-cyan-950/40 shrink-0 transition-all">
            <img 
              src="saudi_moe_logo.svg" 
              alt="وزارة التعليم - Ministry of Education" 
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(59,131,183,0.35)]"
            />
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto">
        
        {/* Right Sidebar (Matching Image 3) */}
        <aside className="w-64 bg-[#060D1A]/90 border-l border-white/10 hidden lg:flex flex-col justify-between p-4 sticky top-[61px] h-[calc(100vh-61px)] shrink-0 overflow-y-auto select-none">
          <div className="space-y-1">
            {staffNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    else setActiveTab(item.id);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs transition-all duration-150 group text-right ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/25 scale-[1.01]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05] font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-cyan-400'
                    }`} />
                    <span className="text-[12px]">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Card & Status */}
          <div className="space-y-3 mt-6">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>النظام يعمل بكفاءة - بوابة 1</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#12192c] to-[#0a1122] p-3.5 relative overflow-hidden group shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
              <img 
                src="theater_stage.jpg" 
                alt="المسرح" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="relative z-20 flex flex-col justify-end min-h-[75px]">
                <div className="w-6 h-6 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-1.5">
                  <Crown className="w-3 h-3" />
                </div>
                <div className="text-xs font-black text-white leading-tight">معاً نصنع اللحظات</div>
                <div className="text-[10px] text-slate-300 font-medium">التي لا تُنسى في التعليم</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          
          {/* Row 1: Live Event Card + 4 Staff KPIs (Matching Image 3) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Live Event Hero Card (Left 4 Cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-[#0B1528] relative overflow-hidden p-5 flex flex-col justify-between min-h-[170px] shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A] via-[#060D1A]/75 to-transparent z-10" />
              <img 
                src="theater_stage.jpg" 
                alt="المسرح الفني" 
                className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="relative z-20 flex items-center justify-between">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>الفعالية جارية الآن</span>
                </span>
                <span className="text-[10px] text-slate-300 font-mono">البوابة الرئيسية</span>
              </div>

              <div className="relative z-20 space-y-1.5 pt-4">
                <h3 className="text-base font-black text-white leading-tight">
                  {eventDetails.title || 'حفل التكريم والافتتاح'}
                </h3>
                <p className="text-[11px] text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{eventDetails.venue || 'المسرح الرئيسي - القاعة الكبرى'}</span>
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-cyan-300">
                  <span>{eventDetails.date || 'الجمعة 25 أكتوبر 2026'} - {eventDetails.time || '08:00 مساءً'}</span>
                </div>
              </div>
            </div>

            {/* 4 Staff Metric Cards (Right 8 Cols) */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 items-stretch">
              
              {/* Metric 1: Total Guests */}
              <div className="rounded-3xl border border-white/10 bg-[#0B1528] p-4 flex flex-col justify-between shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300">إجمالي الضيوف</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-300 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-black text-white">{totalGuests}</div>
                  <div className="text-[10px] text-slate-400">مقعد مجهز</div>
                </div>
                <div className="mt-2 w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-full" />
                </div>
              </div>

              {/* Metric 2: Checked In */}
              <div className="rounded-3xl border border-white/10 bg-[#0B1528] p-4 flex flex-col justify-between shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300">تم تسجيل الدخول</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-300 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-black text-emerald-300">{checkedInCount}</div>
                  <div className="text-[10px] text-slate-400">ضيف حاضر</div>
                </div>
                <div className="mt-2 w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${checkinRate}%` }} />
                </div>
              </div>

              {/* Metric 3: Remaining */}
              <div className="rounded-3xl border border-white/10 bg-[#0B1528] p-4 flex flex-col justify-between shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300">المتبقي</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-black text-purple-300">{remainingCount}</div>
                  <div className="text-[10px] text-slate-400">لم يسجل الدخول</div>
                </div>
                <div className="mt-2 w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: `${remainingRate}%` }} />
                </div>
              </div>

              {/* Metric 4: VIP Guests */}
              <div className="rounded-3xl border border-white/10 bg-[#0B1528] p-4 flex flex-col justify-between shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300">الضيوف المهمون</span>
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-300 flex items-center justify-center">
                    <Crown className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-black text-cyan-300">{vipCheckedIn || 38}</div>
                  <div className="text-[10px] text-slate-400">من إجمالي {vipSeats.length || 50} VIP</div>
                </div>
                <div className="mt-2 w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${vipRate || 76}%` }} />
                </div>
              </div>

            </div>

          </div>

          {/* Row 2: Live QR Scanner + Guest Search + VIP List (Matching Image 3) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Card 1: مسح QR للدخول (Left 4 Cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-[#0B1528] p-5 shadow-2xl flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-cyan-400" />
                  <span>مسح QR للدخول</span>
                </h3>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
                  كاميرا نشطة
                </span>
              </div>

              {/* Viewfinder Frame */}
              <div 
                onClick={() => setShowCameraScanner(true)}
                className="relative bg-black/50 border-2 border-dashed border-cyan-500/40 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[160px] cursor-pointer hover:border-cyan-400 transition-all group"
              >
                {/* Viewfinder corners */}
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />

                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform mb-2">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-white text-center">
                  ضع رمز QR أمام الكاميرا
                </div>
                <div className="text-[10px] text-slate-400 text-center mt-0.5">
                  أو استخدم جهاز الباركود اليدوي
                </div>
              </div>

              {/* Manual Input Form */}
              <form onSubmit={handleManualCheckIn} className="flex gap-2">
                <input
                  type="text"
                  placeholder="إدخال رمز الدعوة أو رقم التذكرة..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 bg-black/40 border border-white/15 focus:border-cyan-400 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 outline-none font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all active:scale-95 shrink-0"
                >
                  تسجيل
                </button>
              </form>

              {scanResult && (
                <div className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  scanResult.success ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {scanResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{scanResult.message}</span>
                </div>
              )}
            </div>

            {/* Card 2: البحث عن ضيف (Center 4 Cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-[#0B1528] p-5 shadow-2xl flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <span>البحث عن ضيف</span>
                </h3>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
                  <button
                    onClick={() => setGuestTab('all')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                      guestTab === 'all' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    الكل
                  </button>
                  <button
                    onClick={() => setGuestTab('vip')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                      guestTab === 'vip' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    VIP 👑
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث بالاسم أو رقم الجوال أو رقم الدعوة..."
                  value={searchGuestQuery}
                  onChange={(e) => setSearchGuestQuery(e.target.value)}
                  className="w-full bg-black/30 border border-white/15 focus:border-cyan-400 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>

              {/* Guest list scroll */}
              <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
                {filteredGuests.slice(0, 4).map((seat) => (
                  <div 
                    key={seat.id}
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 flex items-center justify-between text-xs transition-all"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{seat.guest?.name}</span>
                        {seat.isVip && <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">VIP</span>}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {formatArabicSeatCode(seat)} • {seat.guest?.phone || 'بدون جوال'}
                      </div>
                    </div>
                    <div>
                      {seat.status === 'checked_in' ? (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">حاضر ✓</span>
                      ) : (
                        <button
                          onClick={() => {
                            checkInTicket(seat.guest?.token || seat.id);
                            refreshData();
                          }}
                          className="text-[10px] bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-2.5 py-1 rounded-lg font-black transition-all"
                        >
                          دخول
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: الضيوف المهمون (Right 4 Cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-[#0B1528] p-5 shadow-2xl flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-black text-amber-300 flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>الضيوف المهمون</span>
                </h3>
                <span className="text-[10px] text-slate-400 hover:text-white cursor-pointer font-bold">عرض الكل</span>
              </div>

              <div className="space-y-2.5">
                {vipSampleList.map((vip, vIdx) => (
                  <div 
                    key={vIdx}
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-amber-500/20 hover:border-amber-400/50 flex items-center justify-between text-xs transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 flex items-center justify-center font-black text-[10px] text-slate-950 shrink-0">
                        {vip.name.charAt(0)}
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-white text-[11px] leading-tight">{vip.name}</div>
                        <div className="text-[9.5px] text-slate-400">{vip.sector} - {vip.seat}</div>
                      </div>
                    </div>
                    <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded shadow-sm">
                      VIP
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Row 3: Live Entry Log + Seat Map Preview + Gate Status (Matching Image 3) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Card 1: آخر عمليات تسجيل الدخول (Left 4 Cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-[#0B1528] p-5 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>آخر عمليات تسجيل الدخول</span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/25">مباشر</span>
              </div>

              <div className="space-y-2">
                {recentCheckedIn.length === 0 ? (
                  <div className="py-6 text-center text-slate-400 text-xs">لا توجد عمليات دخول مسجلة حالياً</div>
                ) : (
                  recentCheckedIn.map((s, idx) => (
                    <div 
                      key={s.id || idx}
                      className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <div>
                          <div className="font-bold text-white text-[11px]">{s.guest?.name}</div>
                          <div className="text-[9.5px] text-slate-400">{s.isVip ? 'كبار الشخصيات VIP' : 'ضيف عام'} • {formatArabicSeatCode(s)}</div>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {s.guest?.checkedInAt ? new Date(s.guest.checkedInAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }) : 'الآن'}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Card 2: خريطة المقاعد - المسرح الرئيسي (Center 4 Cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-[#0B1528] p-5 shadow-2xl flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Armchair className="w-4 h-4 text-cyan-400" />
                  <span>خريطة المقاعد - المسرح الرئيسي</span>
                </h3>
                <button
                  onClick={() => setShowTheaterMapModal(true)}
                  className="px-2.5 py-1 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-xs font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                  title="فتح خريطة المسرح التفاعلية بالكامل"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>تكبير الخريطة</span>
                </button>
              </div>
              <div 
                onClick={() => setShowTheaterMapModal(true)}
                className="py-1 cursor-pointer group hover:opacity-95 transition-opacity"
                title="انقر لتكبير واستعراض خريطة المقاعد الكاملة"
              >
                <MiniHallStageMap compact={true} showLegend={true} />
                <div className="mt-1 text-center">
                  <span className="text-[10px] text-cyan-400/80 group-hover:text-cyan-300 group-hover:underline transition-colors flex items-center justify-center gap-1">
                    <span>انقر لتكبير واستعراض الخريطة الكاملة</span>
                    <span>↗</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: حالة البوابات والمداخل (Right 4 Cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-[#0B1528] p-5 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <DoorClosed className="w-4 h-4 text-cyan-400" />
                  <span>حالة البوابات والمداخل</span>
                </h3>
              </div>

              <div className="space-y-2">
                {gatesState.map((gate) => (
                  <div 
                    key={gate.id}
                    onClick={() => toggleGateStatus(gate.id)}
                    className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 flex items-center justify-between text-xs cursor-pointer transition-all active:scale-98"
                    title="انقر لتغيير حالة البوابة"
                  >
                    <span className="font-bold text-slate-200 text-[11px]">{gate.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                      gate.status === 'open' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {gate.status === 'open' ? 'مفتوحة 🟢' : 'مغلقة 🔴'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Row 4: Quick Notes & Action Strip (Matching Image 3 Bottom) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            
            {/* Quick Notes (Left 5 Cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0B1528] p-3 flex items-center gap-2 shadow-xl">
              <input
                type="text"
                placeholder="أضف ملاحظة عن ضيف أو موقف تشغيلي..."
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                className="flex-1 bg-black/40 border border-white/15 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
              />
              <button
                onClick={handleSaveQuickNote}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all active:scale-95 shrink-0"
              >
                حفظ ✍️
              </button>
            </div>

            {/* Quick Actions (Right 7 Cols) */}
            <div className="lg:col-span-7 flex flex-wrap items-center justify-end gap-2">
              <button
                onClick={refreshData}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>تحديث الحالة</span>
              </button>
              <button
                onClick={() => setShowPrintLabelsModal(true)}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 transition-all flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>طباعة تقرير</span>
              </button>
              <button
                onClick={() => setShowCameraScanner(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>تسجيل حضور</span>
              </button>
            </div>

          </div>

        </main>

      </div>

      {/* Camera Scanner Modal */}
      {showCameraScanner && (
        <MobileCameraScannerModal
          isOpen={showCameraScanner}
          onClose={() => setShowCameraScanner(false)}
          onScanSuccess={(decodedText) => {
            const res = checkInTicket(decodedText);
            setScanResult(res);
            if (res.success) {
              playSuccessSound();
              confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
              refreshData();
            } else {
              playWarningSound();
            }
            setShowCameraScanner(false);
          }}
        />
      )}

      {/* Seat Labels Print Modal */}
      {showPrintLabelsModal && (
        <SeatLabelsPrintModal
          isOpen={showPrintLabelsModal}
          onClose={() => setShowPrintLabelsModal(false)}
          seats={seats}
          eventDetails={eventDetails}
        />
      )}

      {/* Interactive Full Theater Map Modal for Staff */}
      {showTheaterMapModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowTheaterMapModal(false); }}
        >
          <div className="bg-[#071124] border border-cyan-500/40 rounded-3xl w-full max-w-7xl max-h-[94vh] shadow-2xl flex flex-col overflow-hidden text-right">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-[#0B1528] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Armchair className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <span>خريطة مقاعد المسرح (بوابة المنظمين وموظف الباب)</span>
                    <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                      توجيه الضيوف والتسكين
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    استعراض حي وتفصيلي لمواقع المقاعد لتسهيل إرشاد الضيوف إلى أماكنهم
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
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>وضع إرشاد المنظمين: تفقد القطاعات، الصفوف، والمقاعد لتوجيه الضيوف بدقة</span>
              </div>
              <button
                onClick={() => setShowTheaterMapModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all"
              >
                إغلاق والعودة للبوابة ✕
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
