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
  LogOut
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
import { MinistryOfEducationLogo } from './ModernAttendanceCard';
import TheaterMap from './TheaterMap';
import BookingModal from './BookingModal';
import InvitationCard from './InvitationCard';
import AllTicketsPrintModal from './AllTicketsPrintModal';
import BatchSeatCardsPrintModal from './BatchSeatCardsPrintModal';
import SeatLabelsPrintModal from './SeatLabelsPrintModal';
import ElectronicInvitationModal from './ElectronicInvitationModal';
import SeatCardModal from './SeatCardModal';
import MobileCameraScannerModal from './MobileCameraScannerModal';
import StaffLogin from './StaffLogin';

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
    return null;
  });

  const [seats, setSeats] = useState([]);
  const [eventDetails, setEventDetails] = useState(getEventDetails());
  const [activeTab, setActiveTab] = useState('checkin'); // 'checkin', 'bookings', 'print', 'share', 'map'
  const [showCameraScanner, setShowCameraScanner] = useState(false);
  
  // Scanner state
  const [inputCode, setInputCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [recentCheckIns, setRecentCheckIns] = useState([]);
  const scannerInputRef = useRef(null);

  // Bookings list state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'reserved', 'checked_in', 'vip'
  const [levelFilter, setLevelFilter] = useState('all');   // 'all', 'G', 'B'

  // Modals
  const [selectedSeatForBooking, setSelectedSeatForBooking] = useState(null);
  const [selectedSeatForCard, setSelectedSeatForCard] = useState(null);
  const [selectedSeatForInvitation, setSelectedSeatForInvitation] = useState(null);
  const [selectedSeatForSeatCard, setSelectedSeatForSeatCard] = useState(null);
  const [showAllTicketsPrintModal, setShowAllTicketsPrintModal] = useState(false);
  const [showBatchSeatCardsModal, setShowBatchSeatCardsModal] = useState(false);
  const [showPrintLabelsModal, setShowPrintLabelsModal] = useState(false);
  const [guidedSeat, setGuidedSeat] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setSeats(getSeats());
    setEventDetails(getEventDetails());
  };

  // Focus scanner on checkin tab
  useEffect(() => {
    if (activeTab === 'checkin') {
      setTimeout(() => scannerInputRef.current?.focus(), 100);
    }
  }, [activeTab]);

  // Handle Scan Process
  const handleProcessScan = (codeToScan) => {
    if (!codeToScan || !codeToScan.trim()) return;

    let cleanedCode = codeToScan.trim();
    if (cleanedCode.includes('http://') || cleanedCode.includes('https://') || cleanedCode.includes('?')) {
      try {
        const urlObj = new URL(cleanedCode);
        const inv = urlObj.searchParams.get('invitation');
        const row = urlObj.searchParams.get('row');
        const seat = urlObj.searchParams.get('seat');
        if (inv) {
          cleanedCode = inv;
        } else if (row && seat) {
          cleanedCode = `${row}-${seat}`;
        }
      } catch (e) {}
    }

    const result = checkInTicket(cleanedCode);
    setScanResult(result);

    if (result.success) {
      playSuccessSound();
      refreshData();
      
      const newEntry = {
        id: result.seat.id,
        name: result.seat.guest?.name || 'ضيف المسرح',
        seatCode: formatArabicSeatCode(result.seat),
        row: result.seat.row,
        number: result.seat.number,
        level: result.seat.level === 'B' ? 'البلكونة' : 'الدور الأرضي',
        sector: result.seat.sector || 'الوسط',
        isVip: result.seat.isVip,
        jobTitle: result.seat.guest?.jobTitle,
        category: result.seat.guest?.category,
        time: new Date().toLocaleTimeString('ar-SA')
      };

      setRecentCheckIns(prev => [newEntry, ...prev.filter(item => item.id !== newEntry.id)].slice(0, 15));
      setGuidedSeat(result.seat);
    } else {
      playWarningSound();
    }
  };

  const handleScannerSubmit = (e) => {
    e.preventDefault();
    handleProcessScan(inputCode);
    setInputCode('');
    scannerInputRef.current?.focus();
  };

  // Handle New Booking Confirmation
  const handleConfirmBooking = (seatId, guestData) => {
    const result = bookSeat(seatId, guestData);
    if (result.success) {
      refreshData();
      setSelectedSeatForBooking(null);
      setSelectedSeatForCard(result.seat);
      playSuccessSound();
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  // Handle Cancel Booking
  const handleCancelBooking = (seatId) => {
    cancelBooking(seatId);
    refreshData();
    setSelectedSeatForBooking(null);
    setSelectedSeatForCard(null);
  };

  // WhatsApp Message Generator
  const getWhatsAppMessageText = (seat) => {
    if (!seat.guest) return '';
    const baseUrl = window.location.origin + window.location.pathname.replace('staff.html', '').replace('beneficiary.html', '');
    const invitationUrl = `${baseUrl}?invitation=${seat.guest.token}`;
    const seatDisplay = `${seat.row}${String(seat.number).padStart(2, '0')}`;

    if (whatsappTemplate === 'reminder') {
      return `⏰ *تـذكـيـر بـمـوعـد الـفـعـالـيـة* ⏰\n\n` +
        `سعادة: *${seat.guest.name}* حفظكم الله\n` +
        `نتشرف بتذكيركم بموعد حضور فعاليتنا:\n` +
        `✨ *${eventDetails.title || 'مسرح الإدارة العامة للتعليم بمنطقة عسير'}* ✨\n\n` +
        `💺 *مقعدكم المحجوز:* الصف (${seat.row}) - رقم (${seatDisplay}) [${seat.level === 'B' ? 'البلكونة' : 'الدور الأرضي'}]\n` +
        `📍 *المكان:* ${eventDetails.venue || 'المسرح الرئيسي'}\n` +
        `⏰ *الموعد:* اليوم في تمام الساعة ${eventDetails.time || '07:00 م'}\n\n` +
        `📲 *تذكرتكم وموقع مقعدكم:*\n${invitationUrl}\n\n` +
        `نتطلع لحضوركم المشرّف 🌟`;
    }

    if (whatsappTemplate === 'welcome') {
      return `🎉 *أهـلاً وسـهـلاً بـكـم فـي مـسـرح الـتـعـلـيـم* 🎉\n\n` +
        `سعادة: *${seat.guest.name}*\n` +
        `نرحب بحضوركم الكريم في:\n` +
        `✨ *${eventDetails.title || 'مسرح تعليم عسير'}* ✨\n\n` +
        `💺 *توجيه المقعد:* الصف (${seat.row}) - مقعد (${seatDisplay}) - قطاع ${seat.sector || 'الوسط'}\n` +
        `🚪 *المدخل:* ${seat.level === 'B' ? 'بوابة البلكونة العلوية' : 'بوابة الدور الأرضي الرئيسية'}\n\n` +
        `📲 *رابط التذكرة:* ${invitationUrl}\n\n` +
        `نتمنى لكم وقتاً ممتعاً ومليئاً بالإلهام ✨`;
    }

    // Default VIP Formal Invitation
    return `🎫 *دعـوة حـضـور ومـوقـع مـقـعـد الـمـسـرح* 🎫\n\n` +
      `يسر الإدارة العامة للتعليم بمنطقة عسير دعوتكم لحضور:\n` +
      `✨ *${eventDetails.title || 'مسرح الإدارة العامة للتعليم بمنطقة عسير'}* ✨\n\n` +
      `👤 *اسم الضيف:* ${seat.guest.name}\n` +
      (seat.guest.jobTitle ? `💼 *المنصب:* ${seat.guest.jobTitle}\n` : '') +
      `🏷️ *الفئة:* ${seat.guest.category || 'عام'}\n` +
      `💺 *المقعد المخصص:* الصف (${seat.row}) - مقعد (${seatDisplay})\n` +
      `📍 *المكان:* ${eventDetails.venue || 'المسرح الرئيسي'}\n` +
      `⏰ *الوقت:* ${eventDetails.time || '07:00 م'}\n` +
      `📅 *التاريخ:* ${eventDetails.date || '2026/10/07'}\n\n` +
      `📲 *رابط بطاقة الحضور والباركود الذكي وموقع المقعد:*\n` +
      `${invitationUrl}\n\n` +
      `أهلاً وسهلاً بحضوركم الكريم ✨`;
  };

  // WhatsApp Sender
  const handleSendWhatsApp = (seat) => {
    if (!seat.guest) return;
    const text = getWhatsAppMessageText(seat);
    const phone = (seat.guest.phone || '').replace(/[^0-9]/g, '');
    const cleanPhone = phone.startsWith('05') ? '966' + phone.substring(1) : phone;
    const whatsappUrl = cleanPhone 
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // Copy invitation link & message
  const handleCopyInvitation = (seat) => {
    if (!seat.guest) return;
    const text = getWhatsAppMessageText(seat);
    navigator.clipboard.writeText(text);
    setCopiedId(seat.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Stats calculation
  const totalAvailable = seats.filter(s => s.status === 'available').length;
  const bookedSeats = seats.filter(s => s.status !== 'available' && s.guest);
  const checkedInSeats = seats.filter(s => s.status === 'checked_in');
  const waitingSeats = seats.filter(s => s.status === 'reserved');
  const attendanceRate = bookedSeats.length > 0 ? Math.round((checkedInSeats.length / bookedSeats.length) * 100) : 0;

  // Filtered Bookings list
  const filteredBookings = bookedSeats.filter(seat => {
    if (statusFilter === 'reserved' && seat.status !== 'reserved') return false;
    if (statusFilter === 'checked_in' && seat.status !== 'checked_in') return false;
    if (statusFilter === 'vip' && !seat.isVip) return false;

    if (levelFilter === 'G' && seat.level === 'B') return false;
    if (levelFilter === 'B' && seat.level !== 'B') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const name = (seat.guest?.name || '').toLowerCase();
      const phone = (seat.guest?.phone || '').toLowerCase();
      const job = (seat.guest?.jobTitle || '').toLowerCase();
      const row = (seat.row || '').toLowerCase();
      const num = String(seat.number || '');
      const code = `${row}${num}`.toLowerCase();
      return name.includes(q) || phone.includes(q) || job.includes(q) || code.includes(q);
    }
    return true;
  });

  const handleStaffLogout = () => {
    localStorage.removeItem('theaterStaffAuth');
    localStorage.removeItem('theaterStaffAuthUser');
    sessionStorage.removeItem('theaterStaffAuth');
    sessionStorage.removeItem('theaterStaffAuthUser');
    setStaffUser(null);
  };

  // If not authenticated as staff, show Staff Login screen
  if (!staffUser) {
    return (
      <StaffLogin
        onLoginSuccess={(user) => setStaffUser(user)}
        onGuestMode={() => window.open('beneficiary.html', '_blank')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#060D1A] text-white flex flex-col items-center justify-start pb-12 select-none" dir="rtl">
      
      {/* Top Header Bar */}
      <header className="w-full bg-[#09152b] border-b border-cyan-500/20 px-4 py-3 sticky top-0 z-30 shadow-xl backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                <span>بوابة الموظف والمنظمين</span>
                <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
                  Staff Control
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 truncate max-w-[200px] sm:max-w-none">
                {eventDetails.title || 'مسرح الإدارة العامة للتعليم بمنطقة عسير'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {staffUser && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-right">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-cyan-300 block">{staffUser.name}</span>
                  <span className="text-[9px] text-slate-400 font-medium">{staffUser.gate || staffUser.role}</span>
                </div>
              </div>
            )}

            <button
              onClick={refreshData}
              title="تحديث البيانات"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all active:scale-95 text-xs flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تحديث</span>
            </button>

            <button
              onClick={handleStaffLogout}
              title="تسجيل الخروج من بوابة المنظمين"
              className="px-2.5 sm:px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">خروج</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-5xl px-3 sm:px-6 py-4 space-y-4">
        
        {/* Live Counters Banner */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 bg-gradient-to-r from-[#0d1f3d] via-[#0a1830] to-[#071124] border border-cyan-500/30 p-3 sm:p-4 rounded-2xl shadow-xl text-center">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-bold">حاضر بالقاعة</span>
            <span className="text-base sm:text-xl font-black text-emerald-300">{checkedInSeats.length}</span>
            <span className="text-[8px] sm:text-[9px] text-emerald-400/80 block">تم التحضير</span>
          </div>
          <div className="border-x border-white/10 space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-bold">بانتظار الدخول</span>
            <span className="text-base sm:text-xl font-black text-amber-300">{waitingSeats.length}</span>
            <span className="text-[8px] sm:text-[9px] text-amber-400/80 block">متبقي</span>
          </div>
          <div className="border-l border-white/10 space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-bold">مقاعد شاغرة</span>
            <span className="text-base sm:text-xl font-black text-blue-300">{totalAvailable}</span>
            <span className="text-[8px] sm:text-[9px] text-blue-400/80 block">متاح للحجز</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-bold">نسبة الحضور</span>
            <span className="text-base sm:text-xl font-black text-cyan-300">{attendanceRate}%</span>
            <span className="text-[8px] sm:text-[9px] text-cyan-400/80 block">من {bookedSeats.length}</span>
          </div>
        </div>

        {/* 5 Main Navigation Tabs */}
        <div className="grid grid-cols-5 gap-1.5 bg-white/5 p-1.5 rounded-2xl border border-white/10">
          
          {/* Tab 1: Check-in / Gate Scanner */}
          <button
            onClick={() => setActiveTab('checkin')}
            className={`py-2.5 rounded-xl font-bold text-[11px] sm:text-xs flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all ${
              activeTab === 'checkin'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>التحضير والماسح</span>
          </button>

          {/* Tab 2: Bookings & Guest Roster */}
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-2.5 rounded-xl font-bold text-[11px] sm:text-xs flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all ${
              activeTab === 'bookings'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>الحجوزات والضيوف</span>
          </button>

          {/* Tab 3: Print Center */}
          <button
            onClick={() => setActiveTab('print')}
            className={`py-2.5 rounded-xl font-bold text-[11px] sm:text-xs flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all ${
              activeTab === 'print'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Printer className="w-4 h-4 text-cyan-300" />
            <span>مركز الطباعة</span>
          </button>

          {/* Tab 4: Send & WhatsApp Hub */}
          <button
            onClick={() => setActiveTab('share')}
            className={`py-2.5 rounded-xl font-bold text-[11px] sm:text-xs flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all ${
              activeTab === 'share'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Send className="w-4 h-4 text-emerald-300" />
            <span>الإرسال والواتساب</span>
          </button>

          {/* Tab 5: Theater Map */}
          <button
            onClick={() => setActiveTab('map')}
            className={`py-2.5 rounded-xl font-bold text-[11px] sm:text-xs flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all ${
              activeTab === 'map'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Armchair className="w-4 h-4 text-purple-300" />
            <span>الخريطة</span>
          </button>

        </div>

        {/* ========================================================================= */}
        {/* TAB 1: CHECK-IN & SCANNER */}
        {/* ========================================================================= */}
        {activeTab === 'checkin' && (
          <div className="space-y-4 animate-fade-in">
            
            {/* Mobile Camera Quick Launcher Button */}
            <div className="bg-gradient-to-r from-cyan-950/60 via-[#0b1b36] to-blue-950/60 border border-cyan-400/40 p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                  <Camera className="w-6 h-6 animate-pulse text-cyan-300" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">كاميرا مسح التذاكر بالجوال</h4>
                  <p className="text-[11px] text-cyan-300 font-medium">امسح باركود وتذاكر الـ QR فوراً بكاميرا هاتفك الذكي</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCameraScanner(true)}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-2xl transition-all shadow-lg shadow-cyan-500/30 active:scale-95 flex items-center justify-center gap-2 shrink-0"
              >
                <Camera className="w-4 h-4" />
                <span>فتح كاميرا الجوال للمسح</span>
              </button>
            </div>

            {/* Barcode Scanner Box */}
            <div className="bg-[#0b162b] border border-cyan-500/30 p-5 sm:p-6 rounded-3xl shadow-xl space-y-4">
              <form onSubmit={handleScannerSubmit} className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 block">
                    مسح باركود التذكرة أو كتابة رقم المقعد:
                  </label>
                  <span className="text-[10px] text-cyan-300 font-bold bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                    القارئ اللاسلكي / USB مدعوم
                  </span>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      ref={scannerInputRef}
                      type="text"
                      placeholder="امسح الـ QR أو اكتب كود المقعد مثل A04 أو التوكن..."
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full bg-white/5 border-2 border-cyan-500/40 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-slate-400 outline-none transition-all pr-11 font-mono tracking-wider shadow-inner"
                    />
                    <QrCode className="w-5 h-5 text-cyan-400 absolute right-3.5 top-3.5" />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Check className="w-4 h-4" />
                    <span>تحضير</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Scan Result Feedback Card */}
            {scanResult && (
              <div className={`p-5 sm:p-6 rounded-3xl border-2 shadow-2xl animate-fade-in transition-all ${
                scanResult.success 
                  ? 'bg-emerald-950/40 border-emerald-500/60 shadow-emerald-500/10' 
                  : 'bg-rose-950/40 border-rose-500/60 shadow-rose-500/10'
              }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      scanResult.success 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' 
                        : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                    }`}>
                      {scanResult.success ? (
                        <ShieldCheck className="w-7 h-7 text-emerald-400" />
                      ) : (
                        <XCircle className="w-7 h-7 text-rose-400" />
                      )}
                    </div>

                    <div>
                      <h3 className={`text-sm sm:text-base font-black ${
                        scanResult.success ? 'text-emerald-300' : 'text-rose-300'
                      }`}>
                        {scanResult.message || (scanResult.success ? 'تم تسجيل الدخول بنجاح!' : 'رمز غير صالح')}
                      </h3>
                      {scanResult.seat?.guest && (
                        <p className="text-sm font-bold text-white mt-0.5">
                          {scanResult.seat.guest.name}
                          {scanResult.seat.isVip && (
                            <span className="mr-2 text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-bold">
                              VIP
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-2.5 py-1 rounded-full">
                    {new Date().toLocaleTimeString('ar-SA')}
                  </span>
                </div>

                {/* Seat Details & Guide to Seat */}
                {scanResult.seat && (
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-black/30 p-2 rounded-xl border border-white/10">
                        <span className="text-[9px] text-slate-400 block font-bold">المقعد</span>
                        <strong className="text-cyan-300 font-black">
                          {scanResult.seat.row}-{String(scanResult.seat.number).padStart(2,'0')}
                        </strong>
                      </div>
                      <div className="bg-black/30 p-2 rounded-xl border border-white/10">
                        <span className="text-[9px] text-slate-400 block font-bold">الدور</span>
                        <strong className="text-white font-black">
                          {scanResult.seat.level === 'B' ? 'البلكونة' : 'الأرضي'}
                        </strong>
                      </div>
                      <div className="bg-black/30 p-2 rounded-xl border border-white/10">
                        <span className="text-[9px] text-slate-400 block font-bold">القطاع والمدخل</span>
                        <strong className="text-amber-300 font-black">
                          {scanResult.seat.sector || 'الوسط'}
                        </strong>
                      </div>
                    </div>

                    <button
                      onClick={() => setGuidedSeat(scanResult.seat)}
                      className="w-full py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Compass className="w-3.5 h-3.5 text-cyan-300" />
                      <span>عرض موقع المقعد على الخريطة لإرشاد الضيف</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Quick 1-Tap Check-in List for waiting attendees */}
            {waitingSeats.length > 0 && (
              <div className="bg-[#0b162b] border border-white/10 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>ضيوف بانتظار التحضير والدخول ({waitingSeats.length}):</span>
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                  {waitingSeats.slice(0, 10).map(s => (
                    <div 
                      key={s.id}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:border-cyan-400/30 transition-all text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-white block">{s.guest?.name}</span>
                        <span className="text-[10px] text-cyan-300">
                          الصف ({s.row}) • مقعد ({s.number}) • {s.level === 'B' ? 'البلكونة' : 'الأرضي'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleProcessScan(s.guest?.token || s.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-bold text-[11px] transition-all active:scale-95 flex items-center gap-1 shrink-0"
                      >
                        <Check className="w-3 h-3" />
                        <span>تحضير</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: BOOKINGS & GUEST ROSTER */}
        {/* ========================================================================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-4 animate-fade-in">
            
            {/* Top Toolbar: Search + Filters + New Booking */}
            <div className="bg-[#0b162b] border border-white/10 p-4 sm:p-5 rounded-3xl shadow-xl space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="ابحث باسم الضيف، رقم الجوال، المنصب، أو رقم المقعد..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-400 outline-none transition-all pr-10"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>

                <button
                  onClick={() => {
                    const firstAvail = seats.find(s => s.status === 'available');
                    if (firstAvail) setSelectedSeatForBooking(firstAvail);
                    else alert('لا توجد مقاعد شاغرة متاحة');
                  }}
                  className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ حجز مقعد جديد</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-white/10">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white/5 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-cyan-400"
                >
                  <option value="all" className="bg-[#0b162b]">جميع الحالات ({bookedSeats.length})</option>
                  <option value="reserved" className="bg-[#0b162b]">بانتظار الحضور ({waitingSeats.length})</option>
                  <option value="checked_in" className="bg-[#0b162b]">تم التحضير ({checkedInSeats.length})</option>
                  <option value="vip" className="bg-[#0b162b]">VIP ({bookedSeats.filter(s => s.isVip).length})</option>
                </select>

                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="bg-white/5 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-cyan-400"
                >
                  <option value="all" className="bg-[#0b162b]">جميع الأدوار</option>
                  <option value="G" className="bg-[#0b162b]">الدور الأرضي</option>
                  <option value="B" className="bg-[#0b162b]">البلكونة</option>
                </select>

                <span className="text-[11px] text-slate-400 mr-auto">
                  معروض: <strong className="text-cyan-300 font-bold">{filteredBookings.length}</strong> ضيف
                </span>
              </div>
            </div>

            {/* Bookings List Cards */}
            <div className="space-y-2.5">
              {filteredBookings.length === 0 ? (
                <div className="bg-[#0b162b] border border-white/10 p-12 rounded-3xl text-center text-slate-400 text-xs">
                  لا توجد حجوزات مطابقة للبحث
                </div>
              ) : (
                filteredBookings.map(seat => {
                  const isCheckedIn = seat.status === 'checked_in';
                  return (
                    <div 
                      key={seat.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isCheckedIn 
                          ? 'bg-emerald-950/20 border-emerald-500/30' 
                          : 'bg-[#0b162b] border-white/10 hover:border-cyan-400/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-white text-sm">
                            {seat.guest?.name}
                          </span>
                          {seat.isVip && (
                            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
                              VIP
                            </span>
                          )}
                          {isCheckedIn ? (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                              تم الدخول
                            </span>
                          ) : (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                              مؤكد الحجز
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-cyan-300 flex items-center gap-2 flex-wrap font-mono">
                          <span>الصف ({seat.row}) • مقعد ({seat.number})</span>
                          <span>•</span>
                          <span>{seat.level === 'B' ? 'البلكونة' : 'الدور الأرضي'}</span>
                          <span>•</span>
                          <span>قطاع {seat.sector || 'الوسط'}</span>
                        </div>

                        {seat.guest?.jobTitle && (
                          <div className="text-[11px] text-slate-400">
                            💼 {seat.guest.jobTitle} {seat.guest.category ? `• ${seat.guest.category}` : ''}
                          </div>
                        )}
                      </div>

                      {/* Action buttons for each booking */}
                      <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 shrink-0">
                        {/* Send WhatsApp */}
                        <button
                          onClick={() => handleSendWhatsApp(seat)}
                          title="إرسال التذكرة عبر الواتساب"
                          className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-400/30 transition-all text-xs flex items-center gap-1"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold">واتساب</span>
                        </button>

                        {/* View Ticket */}
                        <button
                          onClick={() => setSelectedSeatForCard(seat)}
                          title="عرض وطباعة التذكرة"
                          className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/30 transition-all text-xs flex items-center gap-1"
                        >
                          <Ticket className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold">التذكرة</span>
                        </button>

                        {/* Check in Toggle */}
                        {!isCheckedIn ? (
                          <button
                            onClick={() => handleProcessScan(seat.guest?.token || seat.id)}
                            className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95 flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>تحضير</span>
                          </button>
                        ) : null}

                        {/* Cancel Booking */}
                        <button
                          onClick={() => {
                            if (confirm(`إلغاء حجز الضيف ${seat.guest?.name}؟`)) {
                              handleCancelBooking(seat.id);
                            }
                          }}
                          title="إلغاء الحجز"
                          className="p-2 rounded-xl bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-400/30 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PRINT CENTER */}
        {/* ========================================================================= */}
        {activeTab === 'print' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-[#0b162b] border border-white/10 p-5 sm:p-6 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center">
                  <Printer className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">مركز طباعة التذاكر والبطاقات والملصقات</h3>
                  <p className="text-xs text-slate-400">طباعة نماذج الحضور المعتمدة بجودة عالية جاهزة لورق A4 والملصقات</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                
                {/* Print Option 1: All Official Tickets */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                      <Ticket className="w-5 h-5 text-cyan-400" />
                      <span>طباعة تذاكر الحضور الرسمية (A4)</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      توليد وطباعة تذاكر الضيوف بالنموذج الرسمي مع شعار الوزارة والباركود وموقع المقعد.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAllTicketsPrintModal(true)}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Printer className="w-4 h-4" />
                    <span>فتح نافذة طباعة التذاكر ({bookedSeats.length})</span>
                  </button>
                </div>

                {/* Print Option 2: Batch Seat Cards */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/50 transition-all flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                      <Armchair className="w-5 h-5 text-purple-400" />
                      <span>طباعة بطاقات المقاعد المجمعة</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      بطاقات توضع على كراسي المسرح بأسماء الضيوف وأرقام الصفوف والمقاعد.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBatchSeatCardsModal(true)}
                    className="w-full py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Printer className="w-4 h-4" />
                    <span>طباعة بطاقات الكراسي</span>
                  </button>
                </div>

                {/* Print Option 3: Seat Stickers QR */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                      <QrCode className="w-5 h-5 text-amber-400" />
                      <span>طباعة ملصقات المقاعد (QR Stickers)</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      لاصقات صغيرة تحتوي على رقم المقعد ورمز QR تلصق على ظهر الكرسي.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPrintLabelsModal(true)}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Printer className="w-4 h-4" />
                    <span>طباعة ملصقات QR</span>
                  </button>
                </div>

                {/* Print Option 4: Excel Roster Export */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/50 transition-all flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                      <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                      <span>تصدير كشف Excel كامل</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      تصدير كشف شامل بجميع الضيوف والمقاعد وأوقات التحضير لملف Excel.
                    </p>
                  </div>
                  <button
                    onClick={() => exportSeatsToExcel(seats, eventDetails)}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>تنزيل ملف Excel (.xlsx)</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SEND & WHATSAPP HUB */}
        {/* ========================================================================= */}
        {activeTab === 'share' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-[#0b162b] border border-white/10 p-5 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">إرسال الدعوات والتذاكر عبر الواتساب</h3>
                    <p className="text-xs text-slate-400">إرسال التذاكر مباشرة لجوالات الضيوف بنص رسمي منسق ورابط الباركود</p>
                  </div>
                </div>
                <span className="text-xs text-emerald-300 font-bold bg-emerald-500/10 px-3 py-1 rounded-full">
                  {bookedSeats.length} مدعو
                </span>
              </div>

              {/* Template Selector */}
              <div className="flex items-center gap-2 flex-wrap bg-white/5 p-2 rounded-2xl border border-white/10">
                <span className="text-xs font-bold text-slate-300 px-2">اختر نموذج الرسالة:</span>
                <button
                  type="button"
                  onClick={() => setWhatsappTemplate('vip')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    whatsappTemplate === 'vip' 
                      ? 'bg-amber-400 text-slate-950 shadow-md font-black' 
                      : 'bg-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  👑 دعوة رسمية VIP
                </button>
                <button
                  type="button"
                  onClick={() => setWhatsappTemplate('reminder')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    whatsappTemplate === 'reminder' 
                      ? 'bg-cyan-400 text-slate-950 shadow-md font-black' 
                      : 'bg-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  ⏰ تذكير بموعد الحفل
                </button>
                <button
                  type="button"
                  onClick={() => setWhatsappTemplate('welcome')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    whatsappTemplate === 'welcome' 
                      ? 'bg-emerald-400 text-slate-950 shadow-md font-black' 
                      : 'bg-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  🎉 ترحيب وتوجيه بالباب
                </button>
              </div>

              {/* Guest Roster for WhatsApp sending */}
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {bookedSeats.map(seat => (
                  <div 
                    key={seat.id}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs sm:text-sm">{seat.guest?.name}</span>
                        {seat.isVip && (
                          <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">VIP</span>
                        )}
                      </div>
                      <div className="text-[11px] text-cyan-300 font-mono">
                        الصف ({seat.row}) • مقعد ({seat.number}) {seat.guest?.phone ? `• 📱 ${seat.guest.phone}` : ''}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Copy message */}
                      <button
                        onClick={() => handleCopyInvitation(seat)}
                        className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition-all flex items-center gap-1"
                      >
                        {copiedId === seat.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">تم النسخ!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>نسخ الدعوة</span>
                          </>
                        )}
                      </button>

                      {/* WhatsApp Direct Send */}
                      <button
                        onClick={() => handleSendWhatsApp(seat)}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>إرسال واتساب</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: THEATER MAP */}
        {/* ========================================================================= */}
        {activeTab === 'map' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-[#0b162b] border border-white/10 p-4 sm:p-5 rounded-3xl shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                  <Armchair className="w-4 h-4 text-cyan-400" />
                  <span>خريطة مقاعد المسرح التفاعلية</span>
                </h3>
                <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  اضغط على أي مقعد متاح لحجزه أو محجوز لعرض بياناته
                </span>
              </div>

              <div className="w-full bg-[#050b18] rounded-2xl border border-white/10 p-2 overflow-hidden">
                <TheaterMap
                  seats={seats}
                  onSelectSeat={(seat) => {
                    if (seat.status === 'available') {
                      setSelectedSeatForBooking(seat);
                    } else {
                      setGuidedSeat(seat);
                    }
                  }}
                  onSeatsUpdated={(updated) => setSeats(updated)}
                  selectedSeatId={guidedSeat?.id || selectedSeatForBooking?.id}
                />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Booking Form Modal for Staff */}
      {selectedSeatForBooking && (
        <BookingModal
          seat={selectedSeatForBooking}
          onClose={() => setSelectedSeatForBooking(null)}
          onConfirmBooking={handleConfirmBooking}
          onCancelBooking={(seatId) => {
            handleCancelBooking(seatId);
          }}
          onDeleteSeat={() => {}}
          onOpenCard={(seat) => {
            setSelectedSeatForBooking(null);
            setSelectedSeatForCard(seat);
          }}
          onOpenInvitation={(seat) => {
            setSelectedSeatForBooking(null);
            setSelectedSeatForInvitation(seat);
          }}
          onOpenSeatCard={(seat) => {
            setSelectedSeatForBooking(null);
            setSelectedSeatForSeatCard(seat);
          }}
        />
      )}

      {/* Ticket Modal */}
      {selectedSeatForCard && (
        <InvitationCard
          seat={selectedSeatForCard}
          eventDetails={eventDetails}
          onClose={() => setSelectedSeatForCard(null)}
          onPreviewGuestView={() => {}}
        />
      )}

      {/* Luxury Electronic Invitation Modal */}
      {selectedSeatForInvitation && (
        <ElectronicInvitationModal
          seat={selectedSeatForInvitation}
          eventDetails={eventDetails}
          onClose={() => setSelectedSeatForInvitation(null)}
          onOpenSeatCard={(seat) => {
            setSelectedSeatForInvitation(null);
            setSelectedSeatForSeatCard(seat);
          }}
          onOpenTicketCard={(seat) => {
            setSelectedSeatForInvitation(null);
            setSelectedSeatForCard(seat);
          }}
          onPreviewGuestView={() => {}}
        />
      )}

      {/* Individual Seat Card Modal */}
      {selectedSeatForSeatCard && (
        <SeatCardModal
          seat={selectedSeatForSeatCard}
          eventDetails={eventDetails}
          onClose={() => setSelectedSeatForSeatCard(null)}
          onOpenInvitation={() => {}}
          onOpenBatchPrint={() => setShowBatchSeatCardsModal(true)}
        />
      )}

      {/* Print All Official Tickets Modal */}
      {showAllTicketsPrintModal && (
        <AllTicketsPrintModal
          seats={seats}
          eventDetails={eventDetails}
          onClose={() => setShowAllTicketsPrintModal(false)}
        />
      )}

      {/* Batch Seat Cards Print Modal */}
      {showBatchSeatCardsModal && (
        <BatchSeatCardsPrintModal
          seats={seats}
          eventDetails={eventDetails}
          onClose={() => setShowBatchSeatCardsModal(false)}
        />
      )}

      {/* Seat Labels Print Modal */}
      {showPrintLabelsModal && (
        <SeatLabelsPrintModal
          seats={seats}
          eventDetails={eventDetails}
          onClose={() => setShowPrintLabelsModal(false)}
        />
      )}

      {/* Guided Seat Location Modal */}
      {guidedSeat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" dir="rtl">
          <div className="bg-[#0b162b] border-2 border-cyan-500/40 rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">إرشاد الضيف وموقع المقعد</h3>
                  <p className="text-[11px] text-slate-400">تفاصيل الموقع والمدخل المحدد للضيف</p>
                </div>
              </div>
              <button
                onClick={() => setGuidedSeat(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* Guest Info */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{guidedSeat.guest?.name || 'مقعد غير محجوز'}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  guidedSeat.status === 'checked_in' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {guidedSeat.status === 'checked_in' ? 'حاضر بالقاعة' : 'محجوز'}
                </span>
              </div>
              {guidedSeat.guest?.jobTitle && (
                <div className="text-[11px] text-slate-400">{guidedSeat.guest.jobTitle}</div>
              )}
            </div>

            {/* Location Indicators */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-cyan-500/10 border border-cyan-400/30 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-bold">الصف والمقعد</span>
                <strong className="text-sm font-black text-cyan-300">
                  {guidedSeat.row}-{String(guidedSeat.number).padStart(2,'0')}
                </strong>
              </div>
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-bold">الدور</span>
                <strong className="text-sm font-black text-white">
                  {guidedSeat.level === 'B' ? 'الدور الثاني (البلكونة)' : 'الدور الأرضي'}
                </strong>
              </div>
              <div className="bg-amber-500/10 border border-amber-400/30 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-bold">القطاع والمدخل</span>
                <strong className="text-sm font-black text-amber-300">
                  قطاع {guidedSeat.sector || 'الوسط'}
                </strong>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              {guidedSeat.status !== 'checked_in' && (
                <button
                  onClick={() => {
                    handleProcessScan(guidedSeat.guest?.token || guidedSeat.id);
                    setGuidedSeat(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>تأكيد الحضور الآن</span>
                </button>
              )}
              <button
                onClick={() => setGuidedSeat(null)}
                className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Mobile Camera Scanner Modal */}
      <MobileCameraScannerModal
        isOpen={showCameraScanner}
        onClose={() => setShowCameraScanner(false)}
        onScanSuccess={(code) => {
          handleProcessScan(code);
        }}
      />

      {/* Fixed Bottom Navigation Bar for Mobile Web App */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060D1A]/95 backdrop-blur-xl border-t border-cyan-500/25 px-2 py-1.5 flex items-center justify-around shadow-[0_-5px_25px_rgba(0,0,0,0.6)]">
        <button
          onClick={() => setActiveTab('checkin')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'checkin' ? 'text-cyan-300 font-bold scale-105' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${activeTab === 'checkin' ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300' : ''}`}>
            <QrCode className="w-4 h-4" />
          </div>
          <span className="text-[10px]">التحضير</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'bookings' ? 'text-cyan-300 font-bold scale-105' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${activeTab === 'bookings' ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300' : ''}`}>
            <Users className="w-4 h-4" />
          </div>
          <span className="text-[10px]">الحجوزات</span>
        </button>

        {/* Center Prominent Camera Button */}
        <button
          onClick={() => setShowCameraScanner(true)}
          className="flex flex-col items-center -mt-5 group"
          title="كاميرا المسح المباشر"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 via-cyan-500 to-blue-600 border-2 border-[#060D1A] flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/40 active:scale-95 group-hover:scale-105 transition-all">
            <Camera className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[9px] font-black text-cyan-300 mt-0.5">كاميرا QR</span>
        </button>

        <button
          onClick={() => setActiveTab('share')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'share' ? 'text-cyan-300 font-bold scale-105' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${activeTab === 'share' ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300' : ''}`}>
            <Send className="w-4 h-4" />
          </div>
          <span className="text-[10px]">الإرسال</span>
        </button>

        <button
          onClick={() => setActiveTab('print')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'print' ? 'text-cyan-300 font-bold scale-105' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${activeTab === 'print' ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300' : ''}`}>
            <Printer className="w-4 h-4" />
          </div>
          <span className="text-[10px]">الطباعة</span>
        </button>
      </nav>

    </div>
  );
}
