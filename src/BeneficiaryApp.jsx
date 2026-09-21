import React, { useState, useEffect, useRef } from 'react';
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
  ArrowLeft,
  X
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import MiniHallStageMap from './components/MiniHallStageMap';
import TheaterMap from './components/TheaterMap';
import BookingFormModal from './components/BookingFormModal';
import InvitationCard from './components/InvitationCard';
import { exportElementToPng } from './utils/exportImage';
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
  const [showTheaterMapModal, setShowTheaterMapModal] = useState(false);
  const [showGateInfoModal, setShowGateInfoModal] = useState(false);
  const [showEventInfoModal, setShowEventInfoModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showMyBookingsModal, setShowMyBookingsModal] = useState(false);
  const [showUpcomingModal, setShowUpcomingModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
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

  const ticketCardRef = useRef(null);
  const [isSavingTicket, setIsSavingTicket] = useState(false);
  const [saveTicketSuccess, setSaveTicketSuccess] = useState(false);

  const handleSaveTicket = async () => {
    if (!ticketCardRef.current) return;
    setIsSavingTicket(true);
    try {
      const code = currentTicketSeat ? formatArabicSeatCode(currentTicketSeat) : 'تذكرة';
      const name = currentTicketSeat?.guest?.name || 'مستفيد';
      const cleanName = name.replace(/[\s/\\:*?"<>|]/g, '_');
      const fileName = `تذكرة_مسرح_${code}_${cleanName}.png`;

      await exportElementToPng(ticketCardRef.current, fileName, {
        pixelRatio: 4,
        backgroundColor: '#071124'
      });
      setSaveTicketSuccess(true);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
      setTimeout(() => setSaveTicketSuccess(false), 3500);
    } catch (err) {
      console.error('Error saving ticket:', err);
      alert('حدث خطأ أثناء حفظ التذكرة. يرجى استخدام زر الطباعة للحفظ كملف PDF أو أخذ لقطة شاشة.');
    } finally {
      setIsSavingTicket(false);
    }
  };

  const handlePrintTicket = () => {
    try {
      const qrSvg = ticketCardRef.current?.querySelector('svg')?.outerHTML || '';
      const guestName = displayGuestName || 'أحمد السبيعي';
      const seatCode = displaySeatCode || 'F - 12';
      const token = displayToken || 'TKT-2026-45872';
      const title = eventDetails.title || 'المسرح الرئيسي - حفل التكريم والافتتاح';
      const category = eventDetails.category || 'حفل رسمي';
      const dateText = 'الجمعة، 25 أكتوبر 2026 • 08:00 مساءً (تفتح الأبواب 07:00 مساءً)';
      const gateText = 'البوابة 3 (المدخل الرئيسي)';

      // Remove any existing print iframe
      const oldFrame = document.getElementById('ticket-print-frame');
      if (oldFrame) {
        document.body.removeChild(oldFrame);
      }

      // Create a hidden iframe dedicated for printing
      const printFrame = document.createElement('iframe');
      printFrame.id = 'ticket-print-frame';
      printFrame.style.position = 'fixed';
      printFrame.style.right = '-9999px';
      printFrame.style.bottom = '-9999px';
      printFrame.style.width = '1000px';
      printFrame.style.height = '800px';
      printFrame.style.border = '0';
      document.body.appendChild(printFrame);

      const frameDoc = printFrame.contentWindow.document;
      frameDoc.open();
      frameDoc.write(`
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8" />
          <title>تذكرة المسرح المعتمدة - ${guestName}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
          <style>
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            @page {
              size: A4 portrait;
              margin: 14mm 10mm;
            }
            body {
              background-color: #ffffff;
              color: #0f172a;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 24px 16px;
              min-height: 100vh;
            }
            @media print {
              body {
                padding: 0;
                min-height: auto;
                background-color: transparent !important;
              }
              .no-print {
                display: none !important;
              }
            }
            .page-container {
              width: 100%;
              max-width: 760px;
              margin: 0 auto;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            /* Official Ministry Header */
            .official-header {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-bottom: 16px;
              border-bottom: 2px solid #e2e8f0;
              margin-bottom: 26px;
            }
            .official-header .title-block {
              text-align: right;
            }
            .official-header .title-block h1 {
              font-size: 17px;
              font-weight: 900;
              color: #0f172a;
            }
            .official-header .title-block p {
              font-size: 12px;
              color: #64748b;
              font-weight: 600;
              margin-top: 3px;
            }
            .moe-logo-box {
              width: 52px;
              height: 52px;
              border-radius: 16px;
              background-color: #0B1528;
              border: 1.5px solid rgba(6, 182, 212, 0.4);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 6px;
              box-shadow: 0 4px 12px rgba(11, 21, 40, 0.25);
            }
            .moe-logo-box img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }

            /* APPROVED DIGITAL TICKET CARD (MATCHING USER APPROVED DESIGN 100%) */
            .ticket-card {
              width: 100%;
              background: linear-gradient(135deg, #0c182c 0%, #091322 55%, #070e1a 100%);
              border: 1.5px solid rgba(6, 182, 212, 0.4);
              border-radius: 26px;
              padding: 24px 28px;
              position: relative;
              overflow: hidden;
              box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              gap: 24px;
            }
            .ticket-card::after {
              content: '';
              position: absolute;
              right: -50px;
              top: -50px;
              width: 140px;
              height: 140px;
              background: radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%);
              border-radius: 50%;
              pointer-events: none;
            }
            .ticket-card-stub {
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              width: 8px;
              border-right: 2px dashed rgba(6, 182, 212, 0.25);
            }

            /* Right Details Section */
            .ticket-details {
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: 12px;
              text-align: right;
            }
            .ticket-top-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .ticket-category {
              font-size: 13px;
              font-weight: 800;
              color: #22d3ee;
              letter-spacing: 0.5px;
            }
            .ticket-token-pill {
              font-family: monospace;
              font-size: 11px;
              color: #cbd5e1;
              background: #142033;
              border: 1px solid #223552;
              padding: 2px 10px;
              border-radius: 8px;
              font-weight: 700;
            }
            .ticket-title {
              font-size: 19px;
              font-weight: 900;
              color: #ffffff;
              line-height: 1.35;
            }

            /* Info Box */
            .ticket-info-box {
              background: rgba(255, 255, 255, 0.035);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 14px;
              padding: 12px 16px;
              display: flex;
              flex-direction: column;
              gap: 10px;
            }
            .info-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 13.5px;
            }
            .info-label {
              color: #94a3b8;
              font-weight: 600;
            }
            .info-value-name {
              color: #ffffff;
              font-weight: 800;
              font-size: 15px;
            }
            .info-value-seat {
              background: rgba(245, 158, 11, 0.12);
              border: 1px solid rgba(245, 158, 11, 0.45);
              color: #fbbf24;
              font-weight: 900;
              padding: 3px 14px;
              border-radius: 8px;
              font-size: 13px;
              letter-spacing: 1px;
            }
            .info-value-gate {
              color: #38bdf8;
              font-weight: 800;
              font-size: 13.5px;
            }

            /* Bottom Date/Time Row */
            .ticket-bottom-row {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 11.5px;
              color: #cbd5e1;
              font-weight: 700;
              margin-top: 2px;
            }
            .ticket-bottom-row svg {
              width: 15px;
              height: 15px;
              stroke: #22d3ee;
              flex-shrink: 0;
            }

            /* Left QR Box */
            .ticket-qr-box {
              background-color: #ffffff;
              border-radius: 20px;
              padding: 14px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
              flex-shrink: 0;
            }
            .ticket-qr-box svg {
              display: block;
              width: 120px;
              height: 120px;
            }
            .ticket-qr-token {
              font-family: monospace;
              font-size: 10px;
              font-weight: 900;
              color: #0f172a;
              margin-top: 8px;
              letter-spacing: -0.2px;
            }

            /* Footer Instructions */
            .instructions-box {
              width: 100%;
              margin-top: 28px;
              background: #f8fafc;
              border: 1.5px dashed #cbd5e1;
              border-radius: 16px;
              padding: 14px 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 11.5px;
              color: #475569;
              font-weight: 600;
            }
            .instructions-box strong {
              color: #0f172a;
              font-weight: 800;
            }
          </style>
        </head>
        <body>
          <div class="page-container">
            <!-- Official Header -->
            <div class="official-header">
              <div class="moe-logo-box">
                <img src="saudi_moe_logo.svg" alt="شعار وزارة التعليم" />
              </div>
              <div class="title-block">
                <h1>المملكة العربية السعودية • وزارة التعليم</h1>
                <p>الإدارة العامة للتعليم - تذكرة الحضور الرسمية المعتمدة للمسرح</p>
              </div>
              <div style="font-size: 10px; color: #64748b; font-family: monospace; text-align: left;">
                <div>التاريخ: ${new Date().toLocaleDateString('ar-SA')}</div>
                <div style="color: #10b981; font-weight: bold;">الحالة: فعالة ومؤكدة ✓</div>
              </div>
            </div>

            <!-- THE APPROVED TICKET CARD -->
            <div class="ticket-card">
              <div class="ticket-card-stub"></div>

              <!-- Right Details -->
              <div class="ticket-details">
                <div class="ticket-top-row">
                  <div class="ticket-category">${category}</div>
                  <div class="ticket-token-pill">${token}</div>
                </div>

                <div class="ticket-title">${title}</div>

                <div class="ticket-info-box">
                  <div class="info-row">
                    <span class="info-label">اسم الضيف:</span>
                    <span class="info-value-name">${guestName}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">المقعد المخصص:</span>
                    <span class="info-value-seat">${seatCode}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">بوابة الدخول:</span>
                    <span class="info-value-gate">${gateText}</span>
                  </div>
                </div>

                <div class="ticket-bottom-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>${dateText}</span>
                </div>
              </div>

              <!-- Left QR Code Container -->
              <div class="ticket-qr-box">
                ${qrSvg}
                <div class="ticket-qr-token">${token}</div>
              </div>
            </div>

            <!-- Verification & Instructions -->
            <div class="instructions-box">
              <div>
                <strong>تعليمات الدخول:</strong> يرجى إبراز هذه التذكرة أو رمز الاستجابة السريعة (QR) عند البوابة رقم 3 للمنظمين لتسهيل التوجيه لمقعدكم الكريم.
              </div>
              <div style="font-family: monospace; font-weight: 800; color: #0284c7; white-space: nowrap; margin-right: 14px;">
                TKT-VERIFIED-SA
              </div>
            </div>
          </div>
        </body>
        </html>
      `);
      frameDoc.close();

      setTimeout(() => {
        try {
          printFrame.contentWindow.focus();
          printFrame.contentWindow.print();
        } catch (printErr) {
          console.error('Print frame error:', printErr);
          window.print();
        }
      }, 400);

    } catch (err) {
      console.error('Print error:', err);
      window.print();
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
        
        {/* Left: User Profile & Notification & Portal Links */}
        <div className="flex items-center gap-2.5">
          <div 
            onClick={() => setShowAccountModal(true)}
            className="flex items-center gap-2 p-1.5 pl-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer"
            title="بيانات حساب المستفيد"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-xs text-slate-950">
              {displayGuestName.charAt(0)}
            </div>
            <div className="hidden sm:block text-right leading-tight">
              <div className="text-xs font-bold text-white">{displayGuestName}</div>
              <div className="text-[10px] text-cyan-400 font-medium">مستفيد</div>
            </div>
          </div>

          <div 
            onClick={() => setShowNotificationsModal(true)}
            className="relative p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] cursor-pointer transition-all"
            title="مركز الإشعارات (3 جديدة)"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center border-2 border-[#071124]">
              3
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 mr-1">
            <button
              onClick={() => window.open('manager.html', '_blank')}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-[11px] font-bold text-amber-300 transition-all flex items-center gap-1"
              title="الانتقال إلى بوابة المتابعة التنفيذية للمدير"
            >
              <Crown className="w-3 h-3 text-amber-400" />
              <span>بوابة المدير ↗</span>
            </button>
            <button
              onClick={() => window.open('staff.html', '_blank')}
              className="px-2.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-[11px] font-bold text-purple-300 transition-all flex items-center gap-1"
              title="الانتقال إلى بوابة المنظمين"
            >
              <span>بوابة المنظمين ↗</span>
            </button>
            <button
              onClick={() => window.open('index.html', '_blank')}
              className="px-2.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-[11px] font-bold text-cyan-300 transition-all flex items-center gap-1"
              title="الانتقال إلى لوحة الإدارة"
            >
              <span>لوحة الإدارة ↗</span>
            </button>
          </div>
        </div>

        {/* Center: Search input & Welcome */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={phoneQuery || tokenQuery}
              onChange={(e) => {
                setTokenQuery(e.target.value);
                setPhoneQuery(e.target.value);
              }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(e); }}
              placeholder="ابحث عن التذكرة أو الفعالية برقم الجوال أو الرمز..."
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
                    setActiveNav(item.id);
                    if (item.id === 'home') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else if (item.id === 'tickets') {
                      setShowFullCardModal(true);
                    } else if (item.id === 'bookings') {
                      setShowMyBookingsModal(true);
                    } else if (item.id === 'request-hall') {
                      setShowBookingModal(true);
                    } else if (item.id === 'upcoming') {
                      setShowUpcomingModal(true);
                    } else if (item.id === 'theaters') {
                      setShowTheaterMapModal(true);
                    } else if (item.id === 'favorites') {
                      setShowFavoritesModal(true);
                    } else if (item.id === 'support') {
                      setShowSupportModal(true);
                    } else if (item.id === 'notifications') {
                      setShowNotificationsModal(true);
                    } else if (item.id === 'account') {
                      setShowAccountModal(true);
                    } else if (item.id === 'settings') {
                      setShowSettingsModal(true);
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
              
              {/* Header with Active badge & Quick Actions */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-black text-white">تذكرتي الرقمية</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>فعالة</span>
                  </span>
                  <button
                    onClick={handleSaveTicket}
                    disabled={isSavingTicket}
                    className="p-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 transition-all text-xs font-bold flex items-center gap-1 active:scale-95"
                    title="حفظ التذكرة كصورة (PNG)"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">حفظ</span>
                  </button>
                  <button
                    onClick={handlePrintTicket}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-xs font-bold active:scale-95"
                    title="طباعة التذكرة"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Ticket Body with Event, Guest & QR (Approved Ticket Design) */}
              <div 
                ref={ticketCardRef}
                className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-br from-[#0c182c] via-[#091322] to-[#070e1a] border border-cyan-500/30 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-2xl"
              >
                {/* Visual Watermark & Decorative Glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-2 border-r-2 border-dashed border-cyan-500/25" />

                {/* Event & Guest info text */}
                <div className="flex-1 space-y-2.5 text-right w-full sm:w-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-cyan-400 font-bold tracking-wide">
                      {eventDetails.category || 'حفل رسمي'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-300 bg-[#142033] px-2.5 py-0.5 rounded-lg border border-[#223552]">
                      {displayToken}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-black text-white leading-snug">
                    {eventDetails.title || 'المسرح الرئيسي - حفل التكريم والافتتاح'}
                  </h4>

                  {/* Guest Name & Seat Highlight Badge */}
                  <div className="p-2.5 rounded-xl bg-white/[0.035] border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">اسم الضيف:</span>
                      <strong className="text-white font-bold">{displayGuestName}</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">المقعد المخصص:</span>
                      <span className="font-bold text-amber-300 bg-amber-500/10 border border-amber-500/40 px-3 py-0.5 rounded-lg text-xs">
                        {displaySeatCode}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">بوابة الدخول:</span>
                      <span className="font-bold text-cyan-300 text-xs">البوابة 3 (المدخل الرئيسي)</span>
                    </div>
                  </div>

                  <div className="text-[10.5px] text-slate-300 flex items-center gap-1.5 font-bold pt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>الجمعة، 25 أكتوبر 2026 • 08:00 مساءً (تفتح الأبواب 07:00 مساءً)</span>
                  </div>
                </div>

                {/* QR Code Container (Left side in RTL) */}
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-xl shrink-0 border border-slate-200">
                  <QRCodeSVG 
                    value={displayToken} 
                    size={110} 
                    level="M" 
                    includeMargin={false}
                  />
                  <div className="text-[9.5px] font-mono font-black text-slate-900 mt-1">
                    {displayToken}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Save Ticket + Print + Add to Wallet */}
              <div className="space-y-2">
                <button
                  onClick={handleSaveTicket}
                  disabled={isSavingTicket}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Download className={`w-4 h-4 ${isSavingTicket ? 'animate-bounce' : ''}`} />
                  <span>
                    {isSavingTicket 
                      ? 'جارٍ تصدير وحفظ التذكرة...' 
                      : saveTicketSuccess 
                        ? '✅ تم حفظ التذكرة في جهازك بنجاح!' 
                        : 'حفظ التذكرة كصورة في الجهاز (PNG) 📥'
                    }
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handlePrintTicket}
                    className="py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-cyan-400" />
                    <span>طباعة التذكرة 🖨️</span>
                  </button>

                  <button
                    onClick={handleAddToWallet}
                    className="py-2.5 rounded-2xl bg-[#121E36] hover:bg-[#182848] border border-amber-400/40 text-amber-300 hover:text-amber-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <span>💳</span>
                    <span>{isCopied ? 'تم النسخ بنجاح!' : 'إضافة للمحفظة'}</span>
                  </button>
                </div>

                <button
                  onClick={() => setShowFullCardModal(true)}
                  className="w-full py-2 rounded-xl bg-white/[0.02] hover:bg-cyan-500/10 border border-white/5 text-slate-400 hover:text-cyan-300 text-[11px] font-bold transition-all text-center"
                >
                  عرض بطاقة الدعوة الرسمية الفاخرة (3D) ↗
                </button>
              </div>

            </div>

            {/* Interactive Stage & Hall Map (Right 7 Cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0B1528] p-5 sm:p-6 shadow-2xl flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>موقعي في القاعة</span>
                </h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowTheaterMapModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 transition-all text-xs flex items-center gap-1.5 font-bold shadow-lg shadow-cyan-500/10 active:scale-95 cursor-pointer"
                    title="تكبير وفتح خريطة المسرح التفاعلية بالكامل"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>فتح خريطة المسرح</span>
                  </button>
                </div>
              </div>

              {/* Mini Curved Stage Map Visualization */}
              <div 
                onClick={() => setShowTheaterMapModal(true)}
                className="py-2 cursor-pointer group transition-all"
                title="انقر لتكبير وفتح خريطة المسرح التفاعلية"
              >
                <MiniHallStageMap 
                  selectedSeat={currentTicketSeat}
                  userSeatCode={displaySeatCode}
                  showLegend={true}
                />
                <div className="mt-2 text-center">
                  <span className="text-[11px] text-cyan-400/80 group-hover:text-cyan-300 group-hover:underline transition-colors flex items-center justify-center gap-1 font-medium">
                    <span>انقر على الخريطة لتكبير المسرح واستعراض المقاعد والقطاعات بالكامل</span>
                    <span>↗</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Row 3: 4 Horizontal Summary & Action Cards (Matching Image 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Gate of Entry */}
            <div 
              onClick={() => setShowGateInfoModal(true)}
              className="rounded-2xl border border-white/10 hover:border-cyan-400/50 bg-[#0B1528] p-4 flex items-center gap-3.5 shadow-xl hover:scale-[1.02] cursor-pointer transition-all group"
              title="انقر لعرض تفاصيل البوابة والوصول"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                <DoorClosed className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] text-slate-400 font-bold uppercase">بوابة الدخول</div>
                <div className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors">البوابة 3</div>
                <div className="text-[10px] text-cyan-300">المدخل الرئيسي • إرشادات الوصول ↗</div>
              </div>
            </div>

            {/* Card 2: Seat Details */}
            <div 
              onClick={() => setShowFullCardModal(true)}
              className="rounded-2xl border border-white/10 hover:border-amber-400/50 bg-[#0B1528] p-4 flex items-center gap-3.5 shadow-xl hover:scale-[1.02] cursor-pointer transition-all group"
              title="انقر لفتح التذكرة الرقمية بالكامل"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                <Armchair className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] text-slate-400 font-bold uppercase">تفاصيل المقعد</div>
                <div className="text-sm font-black text-amber-300 group-hover:text-amber-200 transition-colors">{displaySeatCode}</div>
                <div className="text-[10px] text-slate-400">الصف {displayRow} - مقعد {displayNumber} • عرض التذكرة ↗</div>
              </div>
            </div>

            {/* Card 3: Event Info */}
            <div 
              onClick={() => setShowEventInfoModal(true)}
              className="rounded-2xl border border-white/10 hover:border-emerald-400/50 bg-[#0B1528] p-4 flex items-center gap-3.5 shadow-xl hover:scale-[1.02] cursor-pointer transition-all group"
              title="انقر لعرض تفاصيل الفعالية"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] text-slate-400 font-bold uppercase">معلومات الفعالية</div>
                <div className="text-xs font-black text-white truncate max-w-[140px] group-hover:text-emerald-300 transition-colors">{eventDetails.title || 'حفل التكريم والافتتاح'}</div>
                <div className="text-[10px] text-slate-400">{eventDetails.date || 'الجمعة 25 أكتوبر 2026'} • تفاصيل ↗</div>
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

      {/* Gate 3 Directions Modal */}
      {showGateInfoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowGateInfoModal(false); }}
        >
          <div className="bg-[#0B1528] border border-cyan-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                  <DoorClosed className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">إرشادات الوصول - البوابة 3</h3>
                  <p className="text-[11px] text-cyan-400">المدخل الرئيسي للقاعة الكبرى</p>
                </div>
              </div>
              <button 
                onClick={() => setShowGateInfoModal(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="font-bold text-white block">📍 موقع البوابة:</span>
                <p>الواجهة الغربية لمبنى مسرح الإدارة العامة للتعليم - بجوار بهو الضيوف الرئيسي.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="font-bold text-white block">🚗 مواقف السيارات:</span>
                <p>مواقف الساحة الغربية ومواقف الضيوف مظللة ومزودة بإرشادات ومسارات مشاة آمنة.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="font-bold text-white block">⏰ أوقات الدخول:</span>
                <p>تفتح الأبواب قبل الفعالية بساعة (07:00 مساءً). يرجى إبراز رمز الـ QR عند المدخل.</p>
              </div>
            </div>

            <button
              onClick={() => {
                alert('تم فتح تطبيق الخرائط لتوجيهك إلى مسرح تعليم عسير.');
                setShowGateInfoModal(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition-all shadow-lg active:scale-95"
            >
              فتح الموقع في خرائط Google ↗
            </button>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventInfoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowEventInfoModal(false); }}
        >
          <div className="bg-[#0B1528] border border-emerald-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">تفاصيل الفعالية الكاملة</h3>
                  <p className="text-[11px] text-emerald-400">{eventDetails.category || 'حفل سنوي رسمي'}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowEventInfoModal(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 block text-[10px]">عنوان الفعالية</span>
                <span className="font-bold text-white text-sm mt-0.5 block">{eventDetails.title || 'حفل التكريم والافتتاح'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="text-slate-400 block text-[10px]">التاريخ</span>
                  <span className="font-bold text-white mt-0.5 block">{eventDetails.date || 'الجمعة 25 أكتوبر 2026'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="text-slate-400 block text-[10px]">الوقت</span>
                  <span className="font-bold text-cyan-300 mt-0.5 block">{eventDetails.time || '08:00 مساءً'}</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 block text-[10px]">المقر والمكان</span>
                <span className="font-bold text-white mt-0.5 block">{eventDetails.venue || 'المسرح الرئيسي - القاعة الكبرى (746 مقعد)'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowEventInfoModal(false);
                setShowFullCardModal(true);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs transition-all shadow-lg active:scale-95"
            >
              عرض تذكرتي الرقمية المرتبطة 🎟️
            </button>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowNotificationsModal(false); }}
        >
          <div className="bg-[#0B1528] border border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-400">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">مركز الإشعارات</h3>
                  <p className="text-[11px] text-slate-400">آخر التحديثات والتنبيهات</p>
                </div>
              </div>
              <button 
                onClick={() => setShowNotificationsModal(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-cyan-500/20 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">تأكيد حجز المقعد</span>
                  <span className="text-[10px] text-cyan-400 font-mono">منذ 10 د</span>
                </div>
                <p className="text-slate-300">تم اعتماد حجز مقعدك بنجاح في حفل التكريم والافتتاح.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">تذكير فتح الأبواب</span>
                  <span className="text-[10px] text-slate-400 font-mono">منذ ساعتين</span>
                </div>
                <p className="text-slate-300">تفتح أبواب القاعة في تمام 07:00 مساءً عبر البوابة 3.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">مرحباً بك في المنظومة</span>
                  <span className="text-[10px] text-slate-400 font-mono">أمس</span>
                </div>
                <p className="text-slate-300">بوابة المستفيد تتيح لك استعراض التذاكر وطلب حجز القاعات بسهولة.</p>
              </div>
            </div>

            <button
              onClick={() => setShowNotificationsModal(false)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Support & Help Modal */}
      {showSupportModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowSupportModal(false); }}
        >
          <div className="bg-[#0B1528] border border-cyan-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">الدعم الفني والمساعدة</h3>
                  <p className="text-[11px] text-cyan-400">فريق الدعم متواجد لخدمتكم 24/7</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSupportModal(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-400 block text-[10px]">الرقم الموحد للدعم الفني</span>
                <span className="font-black text-cyan-300 font-mono text-sm">9200-00-123</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-400 block text-[10px]">الدعم الميداني داخل المسرح</span>
                <span className="font-bold text-white">منصة الاستقبال عند البوابة 1 والبوابة 3</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-400 block text-[10px]">البريد الإلكتروني المعتمد</span>
                <span className="font-mono text-cyan-300">support@aseer-theaters.sa</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('سيتم تحويلك إلى محادثة الدعم الفني عبر واتساب.');
                setShowSupportModal(false);
              }}
              className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <span>محادثة الدعم عبر واتساب</span>
              <span>💬</span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Full Theater Map Modal */}
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
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <span>خريطة مقاعد المسرح التفاعلية</span>
                    <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                      القاعة الكبرى (746 مقعداً)
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    استكشف موقع مقعدك، المداخل، والقطاعات بالنسبة لمنصة المسرح
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {currentTicketSeat && (
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold">
                    <span>مقعدك المخصص:</span>
                    <span className="font-black underline">{displaySeatCode}</span>
                  </div>
                )}
                <button
                  onClick={() => setShowTheaterMapModal(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all text-xs font-bold flex items-center gap-1"
                >
                  <X className="w-5 h-5" />
                  <span className="hidden sm:inline">إغلاق</span>
                </button>
              </div>
            </div>

            {/* Modal Body: Full Theater Map */}
            <div className="p-3 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
              <TheaterMap
                seats={seats}
                onSelectSeat={(seat) => {
                  setCurrentTicketSeat(seat);
                }}
                highlightSeatId={currentTicketSeat?.id}
                isBeneficiaryView={true}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-white/10 bg-[#0B1528] flex items-center justify-between flex-wrap gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>المقعد المحاط بهالة صفراء هو مقعدك المحدد لحضور الحفل</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowTheaterMapModal(false);
                    setShowFullCardModal(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs hover:opacity-90 transition-all shadow-md active:scale-95"
                >
                  معاينة بطاقة التذكرة 🎟️
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 1. My Bookings Modal (حجوزاتي) */}
      {showMyBookingsModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowMyBookingsModal(false); }}
        >
          <div className="bg-[#071124] border border-cyan-500/30 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">سجل حجوزاتي وتذاكري</h3>
                  <p className="text-xs text-slate-400">متابعة الحجوزات المؤكدة وطلبات القاعات</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMyBookingsModal(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
              {/* Booking 1: Current Event */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-cyan-500/30 space-y-2 hover:border-cyan-400/60 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-cyan-300">تذكرة مقعد حضور</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                    مؤكد ومسجل 🟢
                  </span>
                </div>
                <div className="text-sm font-bold text-white">{eventDetails.title || 'حفل التكريم والافتتاح'}</div>
                <div className="text-xs text-slate-400 flex items-center gap-3">
                  <span>🪑 المقعد: <strong className="text-white">{displaySeatCode}</strong></span>
                  <span>🚪 المدخل: <strong className="text-white">البوابة 3</strong></span>
                </div>
                <div className="pt-2 flex items-center gap-2 border-t border-white/5">
                  <button
                    onClick={() => {
                      setShowMyBookingsModal(false);
                      setShowFullCardModal(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-all"
                  >
                    عرض بطاقة الدعوة 🎟️
                  </button>
                  <button
                    onClick={() => {
                      setShowMyBookingsModal(false);
                      setShowGateInfoModal(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 text-xs font-bold hover:bg-white/10 transition-all"
                  >
                    إرشادات الوصول 📍
                  </button>
                </div>
              </div>

              {/* Booking 2: Hall Request */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-300">طلب حجز قاعة اجتماعات</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                    قيد المراجعة 🟡
                  </span>
                </div>
                <div className="text-sm font-bold text-white">ورشة عمل التطوير القيادي</div>
                <div className="text-xs text-slate-400">القاعة الكبرى • التاريخ: الخميس القادم • سعة 120 مقعداً</div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowMyBookingsModal(false);
                setShowBookingModal(true);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition-all shadow-lg active:scale-95"
            >
              تقديم طلب حجز قاعة أو مسرح جديد ➕
            </button>
          </div>
        </div>
      )}

      {/* 2. Upcoming Events Modal (الفعاليات القادمة) */}
      {showUpcomingModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowUpcomingModal(false); }}
        >
          <div className="bg-[#071124] border border-cyan-500/30 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">الفعاليات والمناسبات القادمة</h3>
                  <p className="text-xs text-slate-400">أجندة فعاليات مسارح تعليم عسير المعتمدة</p>
                </div>
              </div>
              <button 
                onClick={() => setShowUpcomingModal(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">الفعالية الحالية</span>
                  <span className="text-xs text-slate-400">اليوم • 08:00 م</span>
                </div>
                <div className="text-sm font-black text-white">{eventDetails.title || 'حفل التكريم والافتتاح'}</div>
                <div className="text-xs text-slate-400">المسرح الرئيسي بالإدارة • البوابة 3 • حضور رسمي</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">تكريم وتميز</span>
                  <span className="text-xs text-slate-400">الخميس 1448/04/10</span>
                </div>
                <div className="text-sm font-black text-white">حفل سفراء التفوق والموهبة والإبداع</div>
                <div className="text-xs text-slate-400">مسرح الإدارة العامة • متاح 45 مقعداً للحضور</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">ملتقى سنوي</span>
                  <span className="text-xs text-slate-400">الثلاثاء 1448/04/22</span>
                </div>
                <div className="text-sm font-black text-white">ملتقى القيادات التعليمية والإشرافية</div>
                <div className="text-xs text-slate-400">القاعة الكبرى • ورش تدريبية وجلسات حوارية</div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowUpcomingModal(false);
                setShowEventInfoModal(true);
              }}
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all"
            >
              عرض تفاصيل الفعالية الحالية بالتفصيل ℹ️
            </button>
          </div>
        </div>
      )}

      {/* 3. Favorites Modal (المفضلة) */}
      {showFavoritesModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowFavoritesModal(false); }}
        >
          <div className="bg-[#071124] border border-rose-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-400">
                  <Heart className="w-5 h-5 fill-rose-500" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">قائمة المفضلة</h3>
                  <p className="text-xs text-slate-400">القاعات والفعاليات المحفوظة لديك</p>
                </div>
              </div>
              <button 
                onClick={() => setShowFavoritesModal(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">المسرح الرئيسي (القاعة الكبرى)</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">سعة 746 مقعداً • شاشات وأنظمة صوتية متطورة</div>
                </div>
                <span className="text-amber-400 text-sm">⭐</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{eventDetails.title || 'حفل التكريم والافتتاح'}</div>
                  <div className="text-[11px] text-cyan-300 mt-0.5">تذكرتك الحالية: {displaySeatCode}</div>
                </div>
                <span className="text-rose-400 text-sm">❤️</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('🌟 تم تحديث المفضلة بنجاح.');
                setShowFavoritesModal(false);
              }}
              className="w-full py-3 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs transition-all"
            >
              حفظ وإغلاق المفضلة ✓
            </button>
          </div>
        </div>
      )}

      {/* 4. My Account Modal (حسابي) */}
      {showAccountModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowAccountModal(false); }}
        >
          <div className="bg-[#071124] border border-cyan-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-cyan-500/20">
                  {displayGuestName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-black text-white">{displayGuestName}</h3>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                    مستفيد رسمي معتمد 🟢
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowAccountModal(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">المقعد المخصص:</span>
                <span className="font-black text-cyan-300 font-mono text-sm">{displaySeatCode}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">رمز التذكرة:</span>
                <span className="font-mono text-amber-300 font-bold">{displayToken}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">بوابة الدخول:</span>
                <span className="font-bold text-white">البوابة 3 (المدخل الرئيسي)</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">الجهة المنظمة:</span>
                <span className="font-bold text-white">تعليم عسير</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setShowAccountModal(false);
                  setShowFullCardModal(true);
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs hover:opacity-95 transition-all shadow-md active:scale-95"
              >
                عرض بطاقة التذكرة الكاملة 🎟️
              </button>
              <button
                onClick={() => {
                  setCurrentTicketSeat(null);
                  setPhoneQuery('');
                  setTokenQuery('');
                  setShowAccountModal(false);
                  alert('تم تسجيل الخروج وإعادة تعيين التذكرة بنجاح.');
                }}
                className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/10 text-xs font-bold transition-all"
              >
                تسجيل الخروج والبحث عن تذكرة أخرى 🚪
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Settings Modal (الإعدادات) */}
      {showSettingsModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowSettingsModal(false); }}
        >
          <div className="bg-[#071124] border border-white/15 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-slate-500/20 border border-slate-400/30 flex items-center justify-center text-slate-300">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">إعدادات البوابة</h3>
                  <p className="text-xs text-slate-400">تخصيص مظهر وتفضيلات الاستخدام</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">المظهر (Dark Elegance)</div>
                  <div className="text-[11px] text-slate-400">الوضع الليلي الفاخر المخصص للمسارح</div>
                </div>
                <span className="text-cyan-400 font-bold bg-cyan-500/15 px-2.5 py-0.5 rounded-full border border-cyan-400/30">مفعّل 🟢</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">التنبيهات التفاعلية</div>
                  <div className="text-[11px] text-slate-400">إشعار مواعيد الدخول وحالة المقعد</div>
                </div>
                <span className="text-emerald-400 font-bold bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-400/30">مفعّل 🟢</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">المؤثرات الصوتية</div>
                  <div className="text-[11px] text-slate-400">أصوات التفاعل والترحيب</div>
                </div>
                <span className="text-emerald-400 font-bold bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-400/30">مفعّل 🟢</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">اللغة</div>
                  <div className="text-[11px] text-slate-400">العربية (المملكة العربية السعودية)</div>
                </div>
                <span className="text-white font-bold">العربية 🇸🇦</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('💾 تم حفظ كافة الإعدادات وتحديث الجلسة بنجاح.');
                setShowSettingsModal(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs hover:opacity-95 transition-all shadow-md active:scale-95"
            >
              حفظ التفضيلات ✓
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
