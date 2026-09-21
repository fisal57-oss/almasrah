import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Ticket, 
  Download, 
  Printer, 
  Share2, 
  Check, 
  Armchair, 
  Calendar, 
  Clock, 
  MapPin, 
  DoorClosed, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  User, 
  Phone, 
  ArrowRight,
  Info,
  Layers,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  ChevronLeft,
  Building2,
  Bell,
  Heart,
  HelpCircle,
  Settings,
  Crown,
  ChevronRight,
  Maximize2,
  Flame,
  ArrowLeft
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import MiniHallStageMap from './components/MiniHallStageMap';
import BookingFormModal from './components/BookingFormModal';
import InvitationCard from './components/InvitationCard';
import { 
  getSeats, 
  getEventDetails, 
  formatArabicSeatCode, 
  fetchSeatsAsync, 
  fetchEventDetailsAsync 
} from './utils/storage';

export default function BeneficiaryApp() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialQuery = searchParams.get('q') || searchParams.get('token') || searchParams.get('invitation') || '';
  const initialSeatId = searchParams.get('seat') || '';

  const [seats, setSeats] = useState(getSeats());
  const [eventDetails, setEventDetails] = useState(getEventDetails());
  const [activeNav, setActiveNav] = useState('home'); // 'home', 'tickets', 'bookings', 'halls', 'favorites', 'settings'
  const [searchMode, setSearchMode] = useState('phone'); // 'phone', 'token'
  const [phoneQuery, setPhoneQuery] = useState('');
  const [tokenQuery, setTokenQuery] = useState(initialQuery);
  const [currentTicketSeat, setCurrentTicketSeat] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showFullCardModal, setShowFullCardModal] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Initial data loading
  useEffect(() => {
    async function loadData() {
      const [latestSeats, latestEvent] = await Promise.all([
        fetchSeatsAsync(),
        fetchEventDetailsAsync()
      ]);
      const currentSeats = latestSeats || getSeats();
      setSeats(currentSeats);
      if (latestEvent) setEventDetails(latestEvent);

      // Auto-select initial ticket if provided in URL
      if (initialSeatId) {
        const found = currentSeats.find(s => s.id.toLowerCase() === initialSeatId.toLowerCase());
        if (found) setCurrentTicketSeat(found);
      } else if (initialQuery) {
        const q = initialQuery.toLowerCase();
        const found = currentSeats.find(s => 
          s.guest && (
            (s.guest.token && s.guest.token.toLowerCase() === q) ||
            (s.guest.phone && s.guest.phone.includes(q)) ||
            (s.guest.name && s.guest.name.toLowerCase().includes(q))
          )
        );
        if (found) setCurrentTicketSeat(found);
      } else {
        // Default to first reserved seat as preview demo
        const firstReserved = currentSeats.find(s => s.status === 'reserved' && s.guest);
        if (firstReserved) setCurrentTicketSeat(firstReserved);
      }
    }
    loadData();
  }, [initialQuery, initialSeatId]);

  // Handle Search for ticket
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setSearchError('');
    const query = (searchMode === 'phone' ? phoneQuery : tokenQuery).trim().toLowerCase();
    if (!query) {
      setSearchError('يرجى إدخال قيمة للبحث');
      return;
    }

    const found = seats.find(s => {
      if (!s.guest) return false;
      const phone = (s.guest.phone || '').toLowerCase();
      const token = (s.guest.token || '').toLowerCase();
      const name = (s.guest.name || '').toLowerCase();
      const seatCode = formatArabicSeatCode(s).toLowerCase();
      const id = s.id.toLowerCase();

      if (searchMode === 'phone') {
        return phone.includes(query) || name.includes(query);
      } else {
        return token.includes(query) || id.includes(query) || seatCode.includes(query);
      }
    });

    if (found) {
      setCurrentTicketSeat(found);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (err) {}
    } else {
      setSearchError('لم يتم العثور على تذكرة مطابقة، يرجى التحقق من الرقم والبحث مجدداً.');
    }
  };

  const handleAddToWallet = () => {
    setIsCopied(true);
    if (navigator.clipboard && currentTicketSeat) {
      const info = `🎟️ تذكرة حضور: ${eventDetails.title || 'حفل التكريم والافتتاح'}\n` +
                   `👤 الاسم: ${currentTicketSeat.guest?.name || 'ضيف مكرّم'}\n` +
                   `🪑 المقعد: ${formatArabicSeatCode(currentTicketSeat)}\n` +
                   `🚪 المدخل: البوابة 3 (المدخل الرئيسي)\n` +
                   `🔑 رمز التذكرة: ${currentTicketSeat.guest?.token || 'TKT-2026-45872'}`;
      navigator.clipboard.writeText(info);
    }
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Nav Items definition matching Image 1
  const navItems = [
    { id: 'home', label: 'الصفحة الرئيسية', icon: Compass },
    { id: 'tickets', label: 'تذاكري', icon: Ticket },
    { id: 'bookings', label: 'حجوزاتي', icon: Calendar },
    { id: 'request-hall', label: 'طلب حجز قاعة أو مسرح', icon: Building2, isAction: true },
    { id: 'upcoming', label: 'الفعاليات القادمة', icon: Calendar },
    { id: 'theaters', label: 'المسرح والقاعات', icon: DoorClosed },
    { id: 'favorites', label: 'المفضلة', icon: Heart },
    { id: 'support', label: 'دعم ومساعدة', icon: HelpCircle },
    { id: 'notifications', label: 'مركز الإشعارات', icon: Bell, badge: '3' },
    { id: 'account', label: 'حسابي', icon: User },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  const displayGuestName = currentTicketSeat?.guest?.name || 'أحمد السبيعي';
  const displaySeatCode = currentTicketSeat ? formatArabicSeatCode(currentTicketSeat) : 'F - 12';
  const displayRow = currentTicketSeat ? currentTicketSeat.row : 'F';
  const displayNumber = currentTicketSeat ? currentTicketSeat.number : '12';
  const displayToken = currentTicketSeat?.guest?.token || 'TKT-2026-45872';

  return (
    <div className="min-h-screen bg-[#060D1A] text-white flex flex-col font-sans selection:bg-cyan-400 selection:text-slate-950" dir="rtl">
      
      {/* Top Header Bar */}
      <header className="bg-[#071124]/95 border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-2xl">
        
        {/* Left: User Profile & Notification */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 p-1.5 pl-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-xs text-slate-950">
              {displayGuestName.charAt(0)}
            </div>
            <div className="hidden sm:block text-right leading-tight">
              <div className="text-xs font-bold text-white">{displayGuestName}</div>
              <div className="text-[10px] text-cyan-400 font-medium">مستفيد</div>
            </div>
          </div>

          <div className="relative p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] cursor-pointer transition-all">
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center border-2 border-[#071124]">
              3
            </span>
          </div>
        </div>

        {/* Center: Search input & Welcome */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث عن الفعاليات أو المسرح أو القاعات..."
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
            <div className="text-sm font-black text-white tracking-wide flex items-center gap-1.5 justify-end">
              <span>بوابة المسرح والقاعات</span>
            </div>
            <div className="text-[10px] text-cyan-400 font-bold tracking-wider">
              اكتشف .. احجز .. استمتع
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-white/15">
            <div className="flex items-end gap-0.5">
              <span className="w-1 h-3.5 bg-white rounded-full"></span>
              <span className="w-1 h-5 bg-cyan-200 rounded-full"></span>
              <span className="w-1 h-2.5 bg-white rounded-full"></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto">
        
        {/* Right Sidebar (Matching Image 1) */}
        <aside className="w-64 bg-[#060D1A]/90 border-l border-white/10 hidden lg:flex flex-col justify-between p-4 sticky top-[61px] h-[calc(100vh-61px)] shrink-0 overflow-y-auto select-none">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.isAction) {
                      setShowBookingModal(true);
                    } else {
                      setActiveNav(item.id);
                    }
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

                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Card: "عالم من الفنون بانتظارك" */}
          <div 
            onClick={() => setShowBookingModal(true)}
            className="mt-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#12192c] to-[#0a1122] p-3.5 relative overflow-hidden group cursor-pointer hover:border-amber-400/60 transition-all shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
            <img 
              src="theater_stage.jpg" 
              alt="المسرح" 
              className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="relative z-20 flex flex-col justify-end min-h-[90px]">
              <div className="w-7 h-7 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-2">
                <Crown className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs font-black text-white leading-tight">عالم من الفنون بانتظارك</div>
              <div className="text-[10px] text-amber-300 font-bold mt-0.5 flex items-center justify-between">
                <span>اكتشف الفعاليات القادمة</span>
                <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          
          {/* Row 1: Hero Banner + Ticket Search Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Hero Card: "الفن يجمعنا في كل لحظة" (Left Side 5 Cols) */}
            <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#0B1528] relative overflow-hidden p-6 flex flex-col justify-end min-h-[190px] shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A] via-[#060D1A]/70 to-transparent z-10" />
              <img 
                src="theater_stage.jpg" 
                alt="المسرح الفني" 
                className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="relative z-20 space-y-2">
                <div className="w-10 h-1 bg-amber-400 rounded-full" />
                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-wide">
                  الفن يجمعنا<br />في كل لحظة
                </h2>
                <p className="text-xs text-slate-300 font-medium">
                  احجز تذكرتك .. وكن جزءاً من التجربة الثقافية الفريدة
                </p>
              </div>
            </div>

            {/* Ticket Search Box (Right Side 7 Cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0B1528] p-5 sm:p-6 shadow-2xl flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <span>البحث عن التذكرة</span>
                </h3>

                {/* Tabs: By Phone / By Invitation Code */}
                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
                  <button
                    onClick={() => setSearchMode('phone')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                      searchMode === 'phone'
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Phone className="w-3 h-3" />
                    <span>برقم الجوال</span>
                  </button>
                  <button
                    onClick={() => setSearchMode('token')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                      searchMode === 'token'
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Ticket className="w-3 h-3" />
                    <span>برمز الدعوة</span>
                  </button>
                </div>
              </div>

              {/* Form Input + Search Button */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  {searchMode === 'phone' ? (
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  ) : (
                    <Ticket className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  )}
                  <input
                    type="text"
                    value={searchMode === 'phone' ? phoneQuery : tokenQuery}
                    onChange={(e) => {
                      if (searchMode === 'phone') setPhoneQuery(e.target.value);
                      else setTokenQuery(e.target.value);
                    }}
                    placeholder={searchMode === 'phone' ? 'أدخل رقم الجوال (05XXXXXXXX)' : 'أدخل رمز الدعوة أو رقم المقعد'}
                    className="w-full bg-black/30 border border-white/15 focus:border-cyan-400 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>عرض التذكرة</span>
                </button>
              </form>

              {searchError && (
                <div className="text-[11px] text-rose-400 font-bold flex items-center gap-1.5 animate-fade-in">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{searchError}</span>
                </div>
              )}
            </div>

          </div>

          {/* Row 2: Digital Ticket Showcase (Left) + Interactive Hall Stage Map (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Digital Ticket Card (Left 5 Cols) */}
            <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#0B1528] p-5 sm:p-6 shadow-2xl flex flex-col justify-between space-y-4">
              
              {/* Header with Active badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-black text-white">تذكرتي الرقمية</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>فعالة</span>
                </span>
              </div>

              {/* Ticket Body with Event & QR */}
              <div className="flex flex-col sm:flex-row items-center gap-5 bg-gradient-to-br from-white/[0.03] to-cyan-500/[0.04] border border-white/10 rounded-2xl p-4 relative overflow-hidden">
                {/* Left tear strip effect */}
                <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-2 border-r-2 border-dashed border-white/20" />

                {/* Event text */}
                <div className="flex-1 space-y-2 text-right">
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                    {eventDetails.category || 'حفل رسمي'}
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-white leading-snug">
                    {eventDetails.title || 'حفل التكريم والافتتاح'}
                  </h4>
                  <div className="text-[11px] text-slate-300 font-medium">
                    {eventDetails.venue || 'المسرح الرئيسي - القاعة الكبرى'}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-bold pt-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{eventDetails.date || 'الجمعة 25 أكتوبر 2026'}</span>
                    <span>•</span>
                    <span>{eventDetails.time || '08:00 مساءً'}</span>
                  </div>
                </div>

                {/* QR Code Container */}
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-lg shrink-0">
                  <QRCodeSVG 
                    value={displayToken} 
                    size={110} 
                    level="M" 
                    includeMargin={false}
                  />
                  <div className="text-[9px] font-mono font-bold text-slate-900 mt-1">
                    {displayToken}
                  </div>
                </div>
              </div>

              {/* Action: Add to Wallet */}
              <button
                onClick={handleAddToWallet}
                className="w-full py-3 rounded-2xl bg-[#121E36] hover:bg-[#182848] border border-amber-400/40 text-amber-300 hover:text-amber-200 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <span>💳</span>
                <span>{isCopied ? 'تم نسخ التذكرة للحافظة بنجاح!' : 'إضافة إلى المحفظة (Apple/Google)'}</span>
              </button>

            </div>

            {/* Interactive Stage & Hall Map (Right 7 Cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0B1528] p-5 sm:p-6 shadow-2xl flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>موقعي في القاعة</span>
                </h3>
                <button 
                  onClick={() => setShowFullCardModal(true)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1 font-bold"
                  title="تكبير المخطط"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>تكبير</span>
                </button>
              </div>

              {/* Mini Curved Stage Map Visualization */}
              <div className="py-2">
                <MiniHallStageMap 
                  selectedSeat={currentTicketSeat}
                  userSeatCode={displaySeatCode}
                  showLegend={true}
                />
              </div>
            </div>

          </div>

          {/* Row 3: 4 Horizontal Summary & Action Cards (Matching Image 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Gate of Entry */}
            <div className="rounded-2xl border border-white/10 bg-[#0B1528] p-4 flex items-center gap-3.5 shadow-xl hover:border-cyan-500/40 transition-all">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                <DoorClosed className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] text-slate-400 font-bold uppercase">بوابة الدخول</div>
                <div className="text-sm font-black text-white">البوابة 3</div>
                <div className="text-[10px] text-cyan-300">المدخل الرئيسي</div>
              </div>
            </div>

            {/* Card 2: Seat Details */}
            <div className="rounded-2xl border border-white/10 bg-[#0B1528] p-4 flex items-center gap-3.5 shadow-xl hover:border-cyan-500/40 transition-all">
              <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                <Armchair className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] text-slate-400 font-bold uppercase">تفاصيل المقعد</div>
                <div className="text-sm font-black text-amber-300">{displaySeatCode}</div>
                <div className="text-[10px] text-slate-400">الصف {displayRow} - مقعد {displayNumber}</div>
              </div>
            </div>

            {/* Card 3: Event Info */}
            <div className="rounded-2xl border border-white/10 bg-[#0B1528] p-4 flex items-center gap-3.5 shadow-xl hover:border-cyan-500/40 transition-all">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] text-slate-400 font-bold uppercase">معلومات الفعالية</div>
                <div className="text-xs font-black text-white truncate max-w-[140px]">{eventDetails.title || 'حفل التكريم والافتتاح'}</div>
                <div className="text-[10px] text-slate-400">{eventDetails.date || 'الجمعة 25 أكتوبر 2026'}</div>
              </div>
            </div>

            {/* Card 4: Hall & Theater Booking Request Action (Purple glow button) */}
            <div 
              onClick={() => setShowBookingModal(true)}
              className="rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-900/30 via-[#181132] to-[#0d0920] p-4 flex items-center justify-between shadow-xl cursor-pointer hover:border-purple-400/70 hover:scale-[1.02] transition-all group"
            >
              <div className="space-y-0.5">
                <div className="text-xs font-black text-purple-200 group-hover:text-purple-100">طلب حجز قاعة أو مسرح</div>
                <div className="text-[10px] text-purple-300/80">لتنظيم فعاليتك القادمة</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
            </div>

          </div>

          {/* Row 4: Bottom Banner: Explore Theaters and Halls */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#0d1f3d]/90 via-[#0a1830] to-[#071124] p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-right">
              <h3 className="text-base sm:text-lg font-black text-white">مسارح وقاعات استثنائية</h3>
              <p className="text-xs text-slate-300">لأفكار أكبر وتجارب لا تُنسى في الإدارة العامة للتعليم بمنطقة عسير</p>
            </div>
            <button
              onClick={() => setShowBookingModal(true)}
              className="px-6 py-3 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 font-bold text-xs flex items-center gap-2 transition-all active:scale-95 shadow-md shrink-0"
            >
              <span>تصفح القاعات المتاحة</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

        </main>

      </div>

      {/* Booking Form Modal */}
      <BookingFormModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />

      {/* Full Ticket Modal */}
      {showFullCardModal && currentTicketSeat && (
        <InvitationCard
          seat={currentTicketSeat}
          eventDetails={eventDetails}
          onClose={() => setShowFullCardModal(false)}
        />
      )}

    </div>
  );
}
