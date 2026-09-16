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
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import TheaterMap from './components/TheaterMap';
import InvitationCard from './components/InvitationCard';
import VenueBookingModal from './components/VenueBookingModal';
import BeneficiaryServicesGrid from './components/BeneficiaryServicesGrid';
import { 
  getSeats, 
  getEventDetails, 
  formatArabicSeatCode, 
  fetchSeatsAsync, 
  fetchEventDetailsAsync,
  bookSeatAsync 
} from './utils/storage';

export default function BeneficiaryApp() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialQuery = searchParams.get('q') || searchParams.get('token') || searchParams.get('invitation') || '';
  const initialSeatId = searchParams.get('seat') || '';

  const [seats, setSeats] = useState(getSeats());
  const [eventDetails, setEventDetails] = useState(getEventDetails());
  const [activeTab, setActiveTab] = useState('find'); // 'find', 'map', 'info'
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showFullCardModal, setShowFullCardModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [selectedVenueIdForModal, setSelectedVenueIdForModal] = useState(null);

  // Self-booking modal state
  const [bookingSeat, setBookingSeat] = useState(null);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccessNotice, setBookingSuccessNotice] = useState('');

  // Initial load and sync with API if available
  useEffect(() => {
    async function loadData() {
      const [latestSeats, latestEvent] = await Promise.all([
        fetchSeatsAsync(),
        fetchEventDetailsAsync()
      ]);
      if (latestSeats) setSeats(latestSeats);
      if (latestEvent) setEventDetails(latestEvent);

      // If initial query or seat param was given, auto-select
      if (initialSeatId) {
        const target = latestSeats.find(s => s.id.toLowerCase() === initialSeatId.toLowerCase());
        if (target) setSelectedSeat(target);
      } else if (initialQuery) {
        const q = initialQuery.toLowerCase();
        const found = latestSeats.find(s => 
          s.guest && (
            (s.guest.token && s.guest.token.toLowerCase() === q) ||
            s.guest.name.toLowerCase().includes(q) ||
            s.id.toLowerCase() === q
          )
        );
        if (found) setSelectedSeat(found);
      }
    }
    loadData();
  }, [initialQuery, initialSeatId]);

  // Filter booked seats matching the search query
  const bookedSeats = seats.filter(s => s.guest && s.status !== 'available');
  const filteredSeats = bookedSeats.filter(seat => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.trim().toLowerCase();
    const guestNameStr = (seat.guest?.name || '').toLowerCase();
    const phone = (seat.guest?.phone || '').toLowerCase();
    const token = (seat.guest?.token || '').toLowerCase();
    const seatId = seat.id.toLowerCase();
    const arabicCode = formatArabicSeatCode(seat).toLowerCase();
    const rowCode = `${seat.row}${parseInt(seat.number, 10)}`.toLowerCase();

    return guestNameStr.includes(q) || 
           phone.includes(q) || 
           token.includes(q) || 
           seatId.includes(q) || 
           arabicCode.includes(q) ||
           rowCode === q;
  });

  // Calculate available seats
  const availableCount = seats.filter(s => s.status === 'available').length;

  const handleCopyTicket = (seat) => {
    if (!seat || !seat.guest) return;
    const text = `🎟️ تذكرة حضور مسرح التعليم\n` +
      `👤 الاسم: ${seat.guest.name}\n` +
      `📍 المقعد: ${formatArabicSeatCode(seat)} (${seat.levelName} - قطاع ${seat.sector})\n` +
      `📅 الفعالية: ${eventDetails.title}\n` +
      `⏰ الموعد: ${eventDetails.date} - ${eventDetails.time}\n` +
      `🔑 رمز التذكرة: ${seat.guest.token}`;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleSeatClickFromMap = (seat) => {
    if (seat.status === 'available') {
      setBookingSeat(seat);
      setGuestName('');
      setGuestPhone('');
    } else {
      setSelectedSeat(seat);
      setActiveTab('find');
    }
  };

  const handleConfirmSelfBooking = async (e) => {
    e.preventDefault();
    if (!bookingSeat || !guestName.trim()) return;

    setBookingLoading(true);
    const guestData = {
      name: guestName.trim(),
      phone: guestPhone.trim(),
      category: 'عام',
      notes: 'حجز ذاتي عبر بوابة المستفيد'
    };

    const res = await bookSeatAsync(bookingSeat.id, guestData);
    setBookingLoading(false);

    if (res.success) {
      // Trigger festive confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      // Update seats list
      const freshSeats = getSeats();
      setSeats(freshSeats);

      const updatedTargetSeat = freshSeats.find(s => s.id === bookingSeat.id);
      setSelectedSeat(updatedTargetSeat || res.seat);
      setBookingSeat(null);
      setActiveTab('find');
      setBookingSuccessNotice(`تهانينا ${guestName}! تم حجز المقعد (${formatArabicSeatCode(updatedTargetSeat || res.seat)}) بنجاح.`);
      setTimeout(() => setBookingSuccessNotice(''), 6000);
    } else {
      alert('حدث خطأ أثناء إتمام الحجز، يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div className="min-h-screen bg-[#080E1A] text-white flex flex-col justify-between font-sans selection:bg-cyan-400 selection:text-slate-950">
      
      {/* Top Header Bar */}
      <header className="bg-[#060B14]/95 border-b border-cyan-500/20 sticky top-0 z-40 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          {eventDetails?.logoUrl ? (
            <img 
              src={eventDetails.logoUrl} 
              alt="شعار الفعالية" 
              className="h-10 max-h-10 max-w-[120px] object-contain rounded-xl p-1 bg-white/10 border border-white/20 shadow-md shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00d2ff] to-[#7952b3] flex items-center justify-center shadow-lg shadow-cyan-500/30 text-white font-black">
              <Ticket className="w-5 h-5" />
            </div>
          )}
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-wide text-white">
              بوابة المستفيد والضيوف
            </h1>
            <p className="text-[10px] text-cyan-300 font-bold tracking-wider">
              {eventDetails.organizer || 'إدارة المسرح والفعاليات'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2 bg-slate-900/90 p-1 rounded-2xl border border-white/10 text-xs font-bold flex-wrap justify-end">
          <button
            onClick={() => setActiveTab('find')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all ${
              activeTab === 'find'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>استعراض تذكرتي</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all ${
              activeTab === 'map'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">خريطة المسرح</span>
            <span className="sm:hidden">الخريطة</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all ${
              activeTab === 'info'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">تفاصيل الفعالية</span>
            <span className="sm:hidden">الفعالية</span>
          </button>

          {/* Venue & Hall Booking Action Button */}
          <button
            onClick={() => setShowVenueModal(true)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-500/20 hover:from-amber-500/30 hover:to-yellow-400/30 text-amber-300 border border-amber-400/40 transition-all shadow-sm active:scale-95"
            title="طلب حجز مسرح أو قاعة رسمية للفعاليات"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>حجز القاعات والمسارح</span>
            <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full hidden sm:inline-block">جديد</span>
          </button>
        </nav>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

        {/* Interactive Services & Halls Icon Grid */}
        <BeneficiaryServicesGrid
          onOpenVenueModal={(venueId) => {
            setSelectedVenueIdForModal(venueId || null);
            setShowVenueModal(true);
          }}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onFocusSearch={() => {
            const el = document.getElementById('ticketSearchInput');
            if (el) {
              el.focus();
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
        />

        {/* Success Alert Notice */}
        {bookingSuccessNotice && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-3 shadow-lg animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{bookingSuccessNotice}</span>
          </div>
        )}

        {/* TAB 1: Search & View Ticket */}
        {activeTab === 'find' && (
          <div className="space-y-6">
            
            {/* Search Box Card */}
            <div className="glass-panel-luxury p-5 sm:p-6 rounded-3xl border border-white/15 space-y-4">
              <label className="text-xs sm:text-sm font-black text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <span>ابحث عن تذكرتك باسمك، برقم الجوال، أو برقم المقعد:</span>
                </span>
                <span className="text-[11px] text-slate-400 font-normal">
                  (إجمالي الحجوزات: {bookedSeats.length})
                </span>
              </label>

              <div className="relative">
                <input
                  id="ticketSearchInput"
                  type="text"
                  placeholder="اكتب اسمك الكامل أو رقم الجوال أو رقم المقعد هنا..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/90 border-2 border-cyan-500/30 focus:border-cyan-400 rounded-2xl px-5 py-3.5 text-sm sm:text-base text-white placeholder-slate-400 outline-none transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSeat(null);
                    }}
                    className="absolute left-4 top-3.5 text-slate-400 hover:text-white text-xs font-bold bg-white/10 px-2 py-1 rounded-lg"
                  >
                    مسح ✕
                  </button>
                )}
              </div>

              {/* Search Results Dropdown / List */}
              {searchQuery.trim() && (
                <div className="pt-2">
                  {filteredSeats.length === 0 ? (
                    <div className="p-4 text-center text-slate-400 text-xs font-bold bg-slate-900/50 rounded-2xl border border-white/10">
                      لم يتم العثور على أي حجز مرتبط بـ "{searchQuery}". يرجى التأكد من كتابة الاسم بدقة كما سُجّل عند الحجز.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      <div className="text-[11px] text-cyan-300 font-bold px-1">
                        نتائج البحث ({filteredSeats.length} حجز):
                      </div>
                      {filteredSeats.map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => setSelectedSeat(seat)}
                          className={`w-full p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between ${
                            selectedSeat?.id === seat.id
                              ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg'
                              : 'bg-slate-900/80 border-white/10 hover:bg-slate-800 text-slate-200'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="font-black text-sm text-white flex items-center gap-2">
                              <span>{seat.guest.name}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                                {seat.guest.category}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 font-mono">
                              المقعد: {formatArabicSeatCode(seat)} • {seat.levelName} ({seat.sector})
                            </div>
                          </div>

                          <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black text-xs shadow-md shrink-0">
                            عرض التذكرة 🎟️
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected Seat Details Card */}
            {selectedSeat && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Official Ticket Card Box */}
                <div className="glass-panel-luxury p-5 sm:p-8 rounded-3xl border border-cyan-400/40 relative overflow-hidden shadow-2xl bg-gradient-to-br from-[#0c162b] via-[#080E1A] to-[#0c162b]">
                  
                  {/* Decorative Corner Glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/30 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>تذكرة مؤكدة ومعتمدة</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {selectedSeat.guest.name}
                      </h3>
                      <p className="text-xs text-cyan-300 font-bold mt-0.5">
                        الفئة: {selectedSeat.guest.category} {selectedSeat.guest.phone ? `• الجوال: ${selectedSeat.guest.phone}` : ''}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                      <button
                        onClick={() => setShowFullCardModal(true)}
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] via-[#334b85] to-[#7952b3] hover:brightness-110 text-white font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>بطاقة الحضور والباركود 📄</span>
                      </button>

                      <button
                        onClick={() => handleCopyTicket(selectedSeat)}
                        className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold border border-white/15 transition-all flex items-center gap-1.5"
                        title="نسخ تفاصيل الحجز"
                      >
                        {copySuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{copySuccess ? 'تم النسخ!' : 'نسخ'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Seat Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-center">
                    <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-white/10 shadow-inner">
                      <span className="text-[11px] text-slate-400 block font-bold mb-0.5">الدور</span>
                      <strong className="text-sm sm:text-base font-black text-cyan-300">{selectedSeat.levelName}</strong>
                    </div>
                    <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-white/10 shadow-inner">
                      <span className="text-[11px] text-slate-400 block font-bold mb-0.5">القطاع</span>
                      <strong className="text-sm sm:text-base font-black text-cyan-300">قطاع {selectedSeat.sector}</strong>
                    </div>
                    <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-white/10 shadow-inner">
                      <span className="text-[11px] text-slate-400 block font-bold mb-0.5">الصف</span>
                      <strong className="text-sm sm:text-base font-black text-cyan-300">الصف ({selectedSeat.row})</strong>
                    </div>
                    <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-white/10 shadow-inner">
                      <span className="text-[11px] text-slate-400 block font-bold mb-0.5">رقم المقعد</span>
                      <strong className="text-base sm:text-lg font-black text-rose-400 font-mono">
                        {selectedSeat.row}{parseInt(selectedSeat.number, 10)}
                      </strong>
                    </div>
                  </div>

                </div>

                {/* Seat Map Locator Box */}
                <div className="glass-panel-luxury p-4 sm:p-6 rounded-3xl border border-white/20 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-3 gap-2">
                    <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                      <Compass className="w-5 h-5 text-cyan-400 shrink-0" />
                      <span>موقع مقعدك على مخطط المسرح</span>
                    </h3>
                    <span className="text-[11px] text-rose-300 font-black flex items-center gap-1.5 bg-rose-500/15 px-3 py-1 rounded-full border border-rose-500/30">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                      <span>مقعدك مُميز باللون الأحمر المتوهج 🔴</span>
                    </span>
                  </div>

                  {/* Mobile swipe notice */}
                  <div className="bg-slate-900/80 border border-cyan-500/20 p-2.5 rounded-xl text-xs text-slate-300 flex items-center justify-between">
                    <span>💡 يمكنك سحب وتكبير وتصغير الخريطة لاستكشاف موقع المقعد بدقة.</span>
                    <span className="text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-md border border-cyan-500/30">
                      اسحب أفقياً 📱
                    </span>
                  </div>

                  {/* Interactive Map */}
                  <div className="bg-slate-950/90 p-2 sm:p-4 rounded-2xl border border-white/10 overflow-x-auto touch-pan-x">
                    <TheaterMap
                      seats={seats}
                      onSelectSeat={() => {}}
                      highlightSeatId={selectedSeat.id}
                      isBeneficiaryView={true}
                    />
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 2: Interactive Theater Map & Self-Booking */}
        {activeTab === 'map' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Map Header and Legend */}
            <div className="glass-panel-luxury p-5 rounded-3xl border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Armchair className="w-5 h-5 text-cyan-400" />
                  <span>مخطط مقاعد المسرح التفاعلي</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  يمكنك استعراض المقاعد الشاغرة والنقر على أي مقعد متاح لحجزه واستلام تذكرتك فوراً.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-black text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span>المقاعد المتاحة: {availableCount} مقعد</span>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="glass-panel-luxury p-3 sm:p-6 rounded-3xl border border-white/20 overflow-x-auto">
              <TheaterMap
                seats={seats}
                onSelectSeat={handleSeatClickFromMap}
                highlightSeatId={selectedSeat?.id}
                isBeneficiaryView={true}
              />
            </div>

          </div>
        )}

        {/* TAB 3: Event Info */}
        {activeTab === 'info' && (
          <div className="space-y-6 animate-fade-in">
            
            <div className="glass-panel-luxury p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
              
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <Info className="w-5 h-5 text-cyan-400" />
                  <span>تعليمات وإرشادات الحضور</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  يرجى قراءة التعليمات التالية لضمان تجربة دخول سلسة وممتعة لك ولجميع الضيوف.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                    <Clock className="w-4 h-4" />
                    <span>مواعيد الدخول والأبواب</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    تفتح أبواب المسرح قبل بدء الفعالية بساعة كاملة. يُرجى التواجد المبكر لتفادي الازدحام عند المداخل.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                    <Ticket className="w-4 h-4" />
                    <span>رمز الدخول الإلكتروني (QR Code)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    يجب إبراز رمز الـ QR Code الموجود في تذكرتك الإلكترونية عند البوابات الإلكترونية لتسجيل الدخول.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                    <Armchair className="w-4 h-4" />
                    <span>الالتزام بالمقعد المخصص</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    لكل ضيف مقعد مخصص برقم الصف ورقم المقعد، نرجو الالتزام التام بالمقعد الموضح بتذكرتك.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>الموقع والقاعة</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {eventDetails.venue} • {eventDetails.city || 'المملكة العربية السعودية'}
                  </p>
                </div>

              </div>

              {eventDetails.note && (
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 font-medium leading-relaxed">
                  <strong>ملاحظة من المنظم: </strong>
                  {eventDetails.note}
                </div>
              )}

            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="py-4 px-8 border-t border-slate-800/60 text-center text-xs text-slate-500 bg-[#060B14]">
        <p>نظام حجز مقاعد مسارح وقاعات إدارة التعليم بمنطقة عسير © 2026</p>
      </footer>

      {/* Self-Booking Modal */}
      {bookingSeat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel-luxury max-w-md w-full p-6 rounded-3xl border-2 border-cyan-500/40 shadow-2xl bg-[#0b1426] space-y-5">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-base font-black text-white flex items-center gap-2">
                <Ticket className="w-5 h-5 text-cyan-400" />
                <span>حجز مقعد جديد</span>
              </h4>
              <button
                onClick={() => setBookingSeat(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Selected Seat Overview */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-cyan-500/30 space-y-1">
              <span className="text-[11px] text-cyan-400 font-bold block">المقعد المختار:</span>
              <div className="text-sm font-black text-white">
                {formatArabicSeatCode(bookingSeat)}
              </div>
              <div className="text-xs text-slate-400">
                {bookingSeat.levelName} • قطاع {bookingSeat.sector}
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleConfirmSelfBooking} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  الاسم الكامل (مطلوب):
                </label>
                <input
                  type="text"
                  required
                  placeholder="اكتب اسمك الثلاثي أو اللقب..."
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  رقم الجوال (اختياري):
                </label>
                <input
                  type="tel"
                  placeholder="05xxxxxxxx"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={bookingLoading || !guestName.trim()}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:brightness-110 disabled:opacity-50 text-slate-950 font-black text-sm shadow-lg transition-all"
                >
                  {bookingLoading ? 'جاري التأكيد...' : 'تأكيد الحجز واستلام التذكرة 🎟️'}
                </button>
                <button
                  type="button"
                  onClick={() => setBookingSeat(null)}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold"
                >
                  إلغاء
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Official Full Invitation / Ticket Modal */}
      {showFullCardModal && selectedSeat && (
        <InvitationCard
          seat={selectedSeat}
          eventDetails={eventDetails}
          onClose={() => setShowFullCardModal(false)}
        />
      )}

      {/* Hall & Theater Reservation Modal */}
      <VenueBookingModal
        isOpen={showVenueModal}
        onClose={() => setShowVenueModal(false)}
        eventDetails={eventDetails}
        initialVenueId={selectedVenueIdForModal}
      />

    </div>
  );
}
