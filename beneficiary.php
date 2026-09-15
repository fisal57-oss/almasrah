<?php
/**
 * صفحة المستفيد والضيوف المستقلة بالكامل (PHP / SQL)
 * Beneficiary & Guest Portal - Theater Seat Invitations
 */

require_once __DIR__ . '/config.php';

$db = getDb();

// جلب بيانات الفعالية
$eventStmt = $db->query("SELECT * FROM `events` ORDER BY id ASC LIMIT 1");
$event = $eventStmt->fetch() ?: [
    'title'      => 'المسرح الرئيسي - حفل التكريم والافتتاح',
    'organizer'  => 'إدارة المسرح والفعاليات',
    'event_date' => 'الجمعة، 25 أكتوبر 2026',
    'event_time' => '08:00 مساءً (تفتح الأبواب 07:00 مساءً)',
    'venue'      => 'المسرح الرئيسي - القاعة الكبرى',
    'city'       => 'الرياض، المملكة العربية السعودية',
    'note'       => 'يرجى إبراز بطاقة الحضور عند مدخل المسرح للتحقق عبر الـ QR Code.'
];

// إحصائيات المقاعد
$statsStmt = $db->query("
    SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'available' THEN 1 ELSE 0 END) as available,
        SUM(CASE WHEN status != 'available' THEN 1 ELSE 0 END) as booked
    FROM `seats`
");
$stats = $statsStmt->fetch() ?: ['total' => 0, 'available' => 0, 'booked' => 0];

$initialQuery = htmlspecialchars($_GET['q'] ?? $_GET['token'] ?? '');
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>بوابة المستفيد والضيوف - <?= htmlspecialchars($event['title']) ?></title>
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Fonts: Cairo & Readex Pro -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Readex+Pro:wght@400;600;700&display=swap" rel="stylesheet">
  
  <!-- QRCode.js & html2canvas & canvas-confetti -->
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.min.js"></script>

  <style>
    body { font-family: 'Cairo', sans-serif; }
    .font-readex { font-family: 'Readex Pro', sans-serif; }
    
    .glass-panel {
      background: rgba(12, 22, 43, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(0, 210, 255, 0.18);
    }
    
    .seat-btn {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .seat-btn:hover {
      transform: scale(1.15) translateY(-2px);
      z-index: 20;
    }
    
    @keyframes pulse-glow {
      0%, 100% {
        box-shadow: 0 0 15px rgba(239, 68, 68, 0.9), 0 0 30px rgba(239, 68, 68, 0.6);
        transform: scale(1.1);
      }
      50% {
        box-shadow: 0 0 35px rgba(239, 68, 68, 1), 0 0 60px rgba(239, 68, 68, 0.9);
        transform: scale(1.25);
      }
    }
    .seat-highlighted {
      animation: pulse-glow 1.5s infinite;
      border: 2px solid #ffffff !important;
      background: linear-gradient(135deg, #ef4444, #b91c1c) !important;
      color: #ffffff !important;
      z-index: 30 !important;
    }

    @media print {
      body * { visibility: hidden; }
      #printableTicket, #printableTicket * { visibility: visible; }
      #printableTicket {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        background: #ffffff !important;
        color: #000000 !important;
      }
    }
  </style>
</head>
<body class="bg-[#080E1A] text-slate-100 min-h-screen flex flex-col justify-between selection:bg-cyan-400 selection:text-slate-950">

  <!-- Top Luxury Header -->
  <header class="bg-[#060B14]/95 border-b border-cyan-500/20 sticky top-0 z-40 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00d2ff] to-[#7952b3] flex items-center justify-center shadow-lg shadow-cyan-500/30 text-white font-black text-lg">
        🎟️
      </div>
      <div>
        <h1 class="text-base sm:text-lg font-black tracking-wide text-white">
          بوابة المستفيد والضيوف
        </h1>
        <p class="text-[10px] text-cyan-300 font-bold tracking-wider">
          <?= htmlspecialchars($event['organizer']) ?>
        </p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <nav class="flex items-center gap-1.5 sm:gap-2 bg-slate-900/90 p-1 rounded-2xl border border-white/10 text-xs font-bold">
      <button onclick="switchTab('find')" id="tabFindBtn" class="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md">
        <span>🔍 استعراض تذكرتي</span>
      </button>
      <button onclick="switchTab('map')" id="tabMapBtn" class="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all text-slate-300 hover:text-white hover:bg-white/5">
        <span>🗺️ خريطة المسرح</span>
      </button>
      <button onclick="switchTab('info')" id="tabInfoBtn" class="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all text-slate-300 hover:text-white hover:bg-white/5">
        <span>ℹ️ تفاصيل الفعالية</span>
      </button>
    </nav>
  </header>

  <!-- Main Content Body -->
  <main class="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

    <!-- Welcome & Event Banner -->
    <div class="glass-panel p-6 sm:p-8 rounded-3xl text-center space-y-3 relative overflow-hidden shadow-2xl bg-gradient-to-b from-[#0c1833] to-[#080E1A]">
      <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-black border border-cyan-500/30">
        <span>✨ منصة الاستعلام وحجز مقاعد المسرح الرسمية</span>
      </div>

      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
        <?= htmlspecialchars($event['title']) ?>
      </h2>

      <p class="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
        أهلاً وسهلاً بضيوفنا الكرام. يمكنك البحث باسمك أو رقم جوالك لاستعراض تذكرتك الرسمية ومعرفة موقع مقعدك، أو اختيار مقعد شاغر وحجزه مباشرة.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-bold text-slate-300 pt-3 border-t border-white/10">
        <div class="flex items-center gap-1.5 bg-slate-900/70 px-3 py-1.5 rounded-xl border border-white/5">
          <span>📅 <?= htmlspecialchars($event['event_date']) ?></span>
        </div>
        <div class="flex items-center gap-1.5 bg-slate-900/70 px-3 py-1.5 rounded-xl border border-white/5">
          <span>⏰ <?= htmlspecialchars($event['event_time']) ?></span>
        </div>
        <div class="flex items-center gap-1.5 bg-slate-900/70 px-3 py-1.5 rounded-xl border border-white/5">
          <span>📍 <?= htmlspecialchars($event['venue']) ?></span>
        </div>
      </div>
    </div>

    <!-- Alert / Toast Container -->
    <div id="alertNotice" class="hidden p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 shadow-lg"></div>

    <!-- TAB 1: Search & View Ticket -->
    <section id="tabFind" class="space-y-6">
      
      <!-- Search Input Card -->
      <div class="glass-panel p-5 sm:p-6 rounded-3xl space-y-4">
        <label class="text-xs sm:text-sm font-black text-white flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span>🔍 ابحث عن تذكرتك باسمك، رقم جوالك، أو رقم المقعد:</span>
          </span>
          <span class="text-[11px] text-slate-400 font-normal">
            (إجمالي الحجوزات: <strong class="text-cyan-300"><?= $stats['booked'] ?></strong>)
          </span>
        </label>

        <div class="relative">
          <input 
            type="text" 
            id="guestSearchInput"
            value="<?= $initialQuery ?>"
            oninput="handleSearch(this.value)"
            placeholder="اكتب اسمك الكامل أو رقم الجوال هنا (مثال: خالد السليمان)..." 
            class="w-full bg-slate-950/90 border-2 border-cyan-500/30 focus:border-cyan-400 rounded-2xl px-5 py-3.5 text-sm sm:text-base text-white placeholder-slate-400 outline-none transition-all shadow-inner"
          >
          <button 
            onclick="clearSearch()"
            id="clearSearchBtn"
            class="hidden absolute left-4 top-3.5 text-slate-400 hover:text-white text-xs font-bold bg-white/10 px-2 py-1 rounded-lg"
          >
            مسح ✕
          </button>
        </div>

        <!-- Search Results List -->
        <div id="searchResultsList" class="hidden pt-2 space-y-2 max-h-72 overflow-y-auto pr-1"></div>
      </div>

      <!-- Selected Ticket Details Card -->
      <div id="selectedTicketSection" class="hidden space-y-6">
        
        <!-- Official Card Box -->
        <div class="glass-panel p-5 sm:p-8 rounded-3xl border border-cyan-400/40 relative overflow-hidden shadow-2xl bg-gradient-to-br from-[#0c1833] via-[#080E1A] to-[#0c1833]">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/30 mb-2">
                <span>✓ تذكرة حضور مؤكدة</span>
              </div>
              <h3 id="ticketGuestName" class="text-xl sm:text-2xl font-black text-white"></h3>
              <p id="ticketCategoryPhone" class="text-xs text-cyan-300 font-bold mt-0.5"></p>
            </div>

            <div class="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <button onclick="openFullTicketModal()" class="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-1.5">
                <span>📄 فتح البطاقة الرسمية للطباعة</span>
              </button>
              <button onclick="copyTicketDetails()" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold border border-white/15 transition-all flex items-center gap-1.5">
                <span id="copyBtnText">📋 نسخ البيانات</span>
              </button>
            </div>
          </div>

          <!-- Specs Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-center">
            <div class="bg-slate-900/90 p-3.5 rounded-2xl border border-white/10">
              <span class="text-[11px] text-slate-400 block font-bold mb-0.5">الدور</span>
              <strong id="ticketLevel" class="text-sm sm:text-base font-black text-cyan-300"></strong>
            </div>
            <div class="bg-slate-900/90 p-3.5 rounded-2xl border border-white/10">
              <span class="text-[11px] text-slate-400 block font-bold mb-0.5">القطاع</span>
              <strong id="ticketSector" class="text-sm sm:text-base font-black text-cyan-300"></strong>
            </div>
            <div class="bg-slate-900/90 p-3.5 rounded-2xl border border-white/10">
              <span class="text-[11px] text-slate-400 block font-bold mb-0.5">الصف</span>
              <strong id="ticketRow" class="text-sm sm:text-base font-black text-cyan-300"></strong>
            </div>
            <div class="bg-slate-900/90 p-3.5 rounded-2xl border border-white/10">
              <span class="text-[11px] text-slate-400 block font-bold mb-0.5">رقم المقعد</span>
              <strong id="ticketSeatNo" class="text-base sm:text-lg font-black text-rose-400 font-mono"></strong>
            </div>
          </div>
        </div>

        <!-- Embedded Seat Locator on Map -->
        <div class="glass-panel p-4 sm:p-6 rounded-3xl space-y-4">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 class="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <span>🧭 موقع مقعدك المحدد على خريطة المسرح</span>
            </h3>
            <span class="text-[11px] text-rose-300 font-black flex items-center gap-1.5 bg-rose-500/15 px-3 py-1 rounded-full border border-rose-500/30">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span>مقعدك مُميز باللون الأحمر المتوهج 🔴</span>
            </span>
          </div>

          <div class="bg-slate-950/90 p-3 rounded-2xl border border-white/10 overflow-x-auto">
            <div id="locatorMapContainer"></div>
          </div>
        </div>

      </div>

    </section>

    <!-- TAB 2: Interactive Theater Map & Self-Booking -->
    <section id="tabMap" class="hidden space-y-6">
      <div class="glass-panel p-5 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 class="text-base font-black text-white flex items-center gap-2">
            <span>💺 مخطط مقاعد المسرح التفاعلي</span>
          </h3>
          <p class="text-xs text-slate-300 mt-1">
            انقر على أي مقعد شاغر لحجزه باسمك فوراً واستلام تذكرتك الرقمية.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-black text-emerald-300 flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>المقاعد المتاحة: <span id="availableCounter"><?= $stats['available'] ?></span> مقعد</span>
          </div>
        </div>
      </div>

      <!-- Floor Switcher -->
      <div class="flex items-center justify-center gap-2">
        <button onclick="renderTheaterMap('G')" id="btnFloorG" class="px-5 py-2.5 rounded-2xl font-black text-xs transition-all bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg">
          الدور الأرضي (G)
        </button>
        <button onclick="renderTheaterMap('B')" id="btnFloorB" class="px-5 py-2.5 rounded-2xl font-black text-xs transition-all bg-white/10 text-slate-300 hover:text-white">
          الدور الثاني - البلكونة (B)
        </button>
      </div>

      <!-- Interactive Map Arena -->
      <div class="glass-panel p-4 sm:p-6 rounded-3xl overflow-x-auto">
        <div id="fullTheaterMapContainer" class="min-w-[900px]"></div>
      </div>
    </section>

    <!-- TAB 3: Event Info -->
    <section id="tabInfo" class="hidden space-y-6">
      <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
        <div class="border-b border-white/10 pb-4">
          <h3 class="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <span>ℹ️ تعليمات وإرشادات الحضور</span>
          </h3>
          <p class="text-xs text-slate-300 mt-1">
            يرجى اتباع الإرشادات التالية لضمان راحة وسلاسة دخولكم للمسرح.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
            <div class="text-cyan-300 font-bold text-sm">⏰ مواعيد الدخول</div>
            <p class="text-slate-300 leading-relaxed">
              تفتح أبواب المسرح قبل بدء الحفل بساعة. نوصي بالتواجد المبكر لتجنب الازدحام.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
            <div class="text-cyan-300 font-bold text-sm">🎟️ تذكرة الدخول ورمز QR</div>
            <p class="text-slate-300 leading-relaxed">
              يجب إبراز رمز الـ QR Code عند البوابات الإلكترونية للتحقق وتسجيل الحضور.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
            <div class="text-cyan-300 font-bold text-sm">💺 الالتزام بالمقعد</div>
            <p class="text-slate-300 leading-relaxed">
              الرجاء الالتزام التام بالدور والقطاع ورقم المقعد المخصص في تذكرتك.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
            <div class="text-cyan-300 font-bold text-sm">📍 الموقع والقاعة</div>
            <p class="text-slate-300 leading-relaxed">
              <?= htmlspecialchars($event['venue']) ?> • <?= htmlspecialchars($event['city']) ?>
            </p>
          </div>
        </div>

        <?php if (!empty($event['note'])): ?>
          <div class="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 font-medium">
            <strong>ملاحظة المنظم: </strong> <?= htmlspecialchars($event['note']) ?>
          </div>
        <?php endif; ?>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="py-4 px-8 border-t border-slate-800/60 text-center text-xs text-slate-500 bg-[#060B14]">
    <p>نظام حجز مقاعد مسارح وقاعات إدارة التعليم بمنطقة عسير (PHP / MySQL) © 2026</p>
  </footer>

  <!-- Modal: Self-Booking Modal -->
  <div id="bookingModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
    <div class="glass-panel max-w-md w-full p-6 rounded-3xl border-2 border-cyan-500/40 shadow-2xl bg-[#0b1426] space-y-5">
      <div class="flex items-center justify-between border-b border-white/10 pb-3">
        <h4 class="text-base font-black text-white flex items-center gap-2">
          <span>🎟️ تأكيد حجز مقعد جديد</span>
        </h4>
        <button onclick="closeBookingModal()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300">✕</button>
      </div>

      <div class="bg-slate-900/90 p-4 rounded-2xl border border-cyan-500/30 space-y-1">
        <span class="text-[11px] text-cyan-400 font-bold block">المقعد المختار:</span>
        <div id="modalSeatTitle" class="text-sm font-black text-white"></div>
        <div id="modalSeatSub" class="text-xs text-slate-400"></div>
      </div>

      <form onsubmit="submitSelfBooking(event)" class="space-y-4">
        <input type="hidden" id="modalSeatId">
        <div class="space-y-1.5">
          <label class="text-xs font-bold text-slate-300 block">الاسم الكامل (مطلوب):</label>
          <input type="text" id="modalGuestName" required placeholder="اكتب اسمك الثلاثي..." class="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none">
        </div>
        <div class="space-y-1.5">
          <label class="text-xs font-bold text-slate-300 block">رقم الجوال (اختياري):</label>
          <input type="tel" id="modalGuestPhone" placeholder="05xxxxxxxx" class="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none">
        </div>

        <div class="pt-2 flex items-center gap-3">
          <button type="submit" id="modalSubmitBtn" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:brightness-110 text-slate-950 font-black text-sm shadow-lg transition-all">
            تأكيد الحجز واستلام التذكرة 🎟️
          </button>
          <button type="button" onclick="closeBookingModal()" class="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold">
            إلغاء
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal: Official Full Ticket Modal with QR & Download -->
  <div id="fullTicketModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
    <div class="max-w-md w-full bg-[#080e1a] rounded-3xl border border-cyan-500/40 p-6 shadow-2xl space-y-5">
      <div class="flex items-center justify-between border-b border-white/10 pb-3">
        <h4 class="text-sm font-black text-cyan-300">التذكرة الإلكترونية الرسمية</h4>
        <button onclick="closeFullTicketModal()" class="text-slate-400 hover:text-white text-xs font-bold">✕ إغلاق</button>
      </div>

      <!-- Printable Ticket Area -->
      <div id="printableTicket" class="bg-gradient-to-b from-[#0c1833] to-[#080e1a] p-6 rounded-2xl border-2 border-cyan-500/30 text-center space-y-4 text-white shadow-2xl">
        <div class="text-[11px] text-cyan-400 font-bold"><?= htmlspecialchars($event['organizer']) ?></div>
        <h3 class="text-base font-black text-white"><?= htmlspecialchars($event['title']) ?></h3>
        
        <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
          <div id="printGuestName" class="text-lg font-black text-cyan-200"></div>
          <div id="printGuestCat" class="text-xs text-slate-300 font-bold"></div>
        </div>

        <div class="grid grid-cols-3 gap-2 text-center text-xs py-2 border-y border-white/10">
          <div>
            <span class="text-[10px] text-slate-400 block">الدور</span>
            <strong id="printLevel" class="font-bold text-white"></strong>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block">الصف</span>
            <strong id="printRow" class="font-bold text-cyan-300"></strong>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block">المقعد</span>
            <strong id="printSeatNo" class="font-bold text-rose-400"></strong>
          </div>
        </div>

        <!-- QR Code Canvas Container -->
        <div class="flex justify-center p-3 bg-white rounded-2xl max-w-[180px] mx-auto shadow-inner">
          <canvas id="qrCodeCanvas"></canvas>
        </div>

        <div id="printTokenCode" class="text-xs font-mono font-bold text-cyan-300 tracking-wider"></div>

        <div class="text-[10px] text-slate-400 pt-1">
          <?= htmlspecialchars($event['event_date']) ?> • <?= htmlspecialchars($event['event_time']) ?>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2 pt-2">
        <button onclick="downloadTicketImage()" class="flex-1 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md">
          <span>📥 حفظ كصورة (PNG)</span>
        </button>
        <button onclick="window.print()" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5">
          <span>🖨️ طباعة</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Client-side Logic (Vanilla JS) -->
  <script>
    let allSeats = [];
    let currentSelectedSeat = null;
    let currentFloor = 'G';

    // Load seats via API on startup
    async function loadSeats() {
      try {
        const res = await fetch('api/seats.php');
        if (res.ok) {
          allSeats = await res.json();
          renderTheaterMap(currentFloor);

          // Check if initial query exists
          const initQ = document.getElementById('guestSearchInput').value.trim();
          if (initQ) {
            handleSearch(initQ);
          }
        }
      } catch (e) {
        console.error('Error loading seats:', e);
      }
    }

    function switchTab(tab) {
      document.getElementById('tabFind').classList.toggle('hidden', tab !== 'find');
      document.getElementById('tabMap').classList.toggle('hidden', tab !== 'map');
      document.getElementById('tabInfo').classList.toggle('hidden', tab !== 'info');

      const activeClass = 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md';
      const normalClass = 'text-slate-300 hover:text-white hover:bg-white/5';

      document.getElementById('tabFindBtn').className = `flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all ${tab === 'find' ? activeClass : normalClass}`;
      document.getElementById('tabMapBtn').className = `flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all ${tab === 'map' ? activeClass : normalClass}`;
      document.getElementById('tabInfoBtn').className = `flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all ${tab === 'info' ? activeClass : normalClass}`;

      if (tab === 'map') {
        renderTheaterMap(currentFloor);
      }
    }

    function handleSearch(val) {
      const q = val.trim().toLowerCase();
      const clearBtn = document.getElementById('clearSearchBtn');
      const resultsDiv = document.getElementById('searchResultsList');

      clearBtn.classList.toggle('hidden', !q);

      if (!q) {
        resultsDiv.classList.add('hidden');
        resultsDiv.innerHTML = '';
        return;
      }

      const matches = allSeats.filter(s => {
        if (!s.guest) return false;
        const name = (s.guest.name || '').toLowerCase();
        const phone = (s.guest.phone || '').toLowerCase();
        const token = (s.guest.token || '').toLowerCase();
        const id = (s.id || '').toLowerCase();
        const seatCode = `${s.row}${parseInt(s.number, 10)}`.toLowerCase();
        return name.includes(q) || phone.includes(q) || token.includes(q) || id.includes(q) || seatCode === q;
      });

      resultsDiv.classList.remove('hidden');

      if (matches.length === 0) {
        resultsDiv.innerHTML = `
          <div class="p-4 text-center text-slate-400 text-xs font-bold bg-slate-900/50 rounded-2xl border border-white/10">
            لم يتم العثور على أي حجز مطابق لـ "${val}". يرجى التأكد من كتابة الاسم بدقة.
          </div>
        `;
        return;
      }

      resultsDiv.innerHTML = matches.map(s => `
        <button onclick="selectSeat('${s.id}')" class="w-full p-3.5 rounded-2xl border border-white/10 bg-slate-900/80 hover:bg-slate-800 text-right transition-all flex items-center justify-between">
          <div>
            <div class="font-black text-sm text-white flex items-center gap-2">
              <span>${s.guest.name}</span>
              <span class="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                ${s.guest.category || 'عام'}
              </span>
            </div>
            <div class="text-xs text-slate-400 font-mono mt-0.5">
              المقعد: ${s.levelName} – الصف (${s.row}) المقعد ${s.number}
            </div>
          </div>
          <div class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black text-xs shadow-md">
            عرض التذكرة 🎟️
          </div>
        </button>
      `).join('');
    }

    function clearSearch() {
      document.getElementById('guestSearchInput').value = '';
      document.getElementById('clearSearchBtn').classList.add('hidden');
      document.getElementById('searchResultsList').classList.add('hidden');
      document.getElementById('selectedTicketSection').classList.add('hidden');
      currentSelectedSeat = null;
    }

    function selectSeat(seatId) {
      const seat = allSeats.find(s => s.id === seatId);
      if (!seat || !seat.guest) return;

      currentSelectedSeat = seat;

      // Populate Ticket View
      document.getElementById('ticketGuestName').innerText = seat.guest.name;
      document.getElementById('ticketCategoryPhone').innerText = `الفئة: ${seat.guest.category || 'عام'} ${seat.guest.phone ? '• الجوال: ' + seat.guest.phone : ''}`;
      document.getElementById('ticketLevel').innerText = seat.levelName;
      document.getElementById('ticketSector').innerText = 'قطاع ' + seat.sector;
      document.getElementById('ticketRow').innerText = 'الصف (' + seat.row + ')';
      document.getElementById('ticketSeatNo').innerText = seat.row + parseInt(seat.number, 10);

      document.getElementById('selectedTicketSection').classList.remove('hidden');

      // Render Locator Map
      renderLocatorMap(seat);

      // Scroll to ticket
      document.getElementById('selectedTicketSection').scrollIntoView({ behavior: 'smooth' });
    }

    function renderLocatorMap(highlightSeat) {
      const container = document.getElementById('locatorMapContainer');
      container.innerHTML = generateMapHtml(highlightSeat.level, highlightSeat.id);
    }

    function renderTheaterMap(level) {
      currentFloor = level;
      document.getElementById('btnFloorG').className = `px-5 py-2.5 rounded-2xl font-black text-xs transition-all ${level === 'G' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg' : 'bg-white/10 text-slate-300 hover:text-white'}`;
      document.getElementById('btnFloorB').className = `px-5 py-2.5 rounded-2xl font-black text-xs transition-all ${level === 'B' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg' : 'bg-white/10 text-slate-300 hover:text-white'}`;

      const container = document.getElementById('fullTheaterMapContainer');
      container.innerHTML = generateMapHtml(level, currentSelectedSeat?.id);
    }

    function generateMapHtml(level, highlightedId = null) {
      const levelSeats = allSeats.filter(s => s.level === level);
      const rows = Array.from(new Set(levelSeats.map(s => s.row))).sort();

      let html = `
        <div class="mb-6 text-center">
          <div class="inline-block bg-gradient-to-r from-cyan-500/20 via-blue-500/30 to-cyan-500/20 px-8 py-2.5 rounded-b-3xl border border-cyan-400/40 text-cyan-200 font-black text-sm tracking-widest uppercase">
            المسرح الرئيسي • STAGE
          </div>
        </div>
        <div class="flex flex-col gap-2 items-center">
      `;

      rows.forEach(r => {
        const rowSeats = levelSeats.filter(s => s.row === r);
        const left = rowSeats.filter(s => s.sectorKey === 'left');
        const center = rowSeats.filter(s => s.sectorKey === 'center');
        const right = rowSeats.filter(s => s.sectorKey === 'right');

        html += `
          <div class="flex items-center justify-center gap-3 py-0.5">
            <div class="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center text-white font-bold text-[10px] shrink-0">${r}</div>
            
            <!-- Left Sector -->
            <div class="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              ${left.map(s => renderSeatButtonHtml(s, highlightedId)).join('')}
            </div>

            <!-- Aisle -->
            <div class="w-4 h-full flex items-center justify-center"><div class="w-0.5 h-4 bg-cyan-400/30 rounded-full"></div></div>

            <!-- Center Sector -->
            <div class="flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-cyan-400/20">
              ${center.map(s => renderSeatButtonHtml(s, highlightedId)).join('')}
            </div>

            <!-- Aisle -->
            <div class="w-4 h-full flex items-center justify-center"><div class="w-0.5 h-4 bg-cyan-400/30 rounded-full"></div></div>

            <!-- Right Sector -->
            <div class="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              ${right.map(s => renderSeatButtonHtml(s, highlightedId)).join('')}
            </div>

            <div class="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center text-white font-bold text-[10px] shrink-0">${r}</div>
          </div>
        `;
      });

      html += `</div>`;
      return html;
    }

    function renderSeatButtonHtml(seat, highlightedId) {
      const isHighlighted = (seat.id === highlightedId);
      const isAvailable = (seat.status === 'available');

      let colorClass = 'bg-slate-700/80 text-slate-400 cursor-not-allowed border border-white/10';
      if (isAvailable) {
        colorClass = 'bg-gradient-to-b from-cyan-600 to-blue-700 hover:from-cyan-400 hover:to-blue-500 text-white font-bold cursor-pointer border border-cyan-400/40 shadow-sm';
      }
      if (isHighlighted) {
        colorClass = 'seat-highlighted';
      }

      const num = parseInt(seat.number, 10);
      return `
        <button 
          onclick="handleSeatClick('${seat.id}')"
          title="مقعد: ${seat.row}${num} (${seat.levelName} - قطاع ${seat.sector}) - ${isAvailable ? 'متاح للحجز' : (seat.guest?.name || 'محجوز')}"
          class="seat-btn w-6 h-6 rounded-md text-[10px] flex items-center justify-center font-mono ${colorClass}"
        >
          ${num}
        </button>
      `;
    }

    function handleSeatClick(seatId) {
      const seat = allSeats.find(s => s.id === seatId);
      if (!seat) return;

      if (seat.status === 'available') {
        // Open Self-Booking Modal
        document.getElementById('modalSeatId').value = seat.id;
        document.getElementById('modalSeatTitle').innerText = `${seat.levelName} – الصف (${seat.row}) - المقعد ${seat.number}`;
        document.getElementById('modalSeatSub').innerText = `قطاع ${seat.sector}`;
        document.getElementById('modalGuestName').value = '';
        document.getElementById('modalGuestPhone').value = '';
        document.getElementById('bookingModal').classList.remove('hidden');
      } else if (seat.guest) {
        // Select seat and show ticket
        selectSeat(seat.id);
        switchTab('find');
      }
    }

    function closeBookingModal() {
      document.getElementById('bookingModal').classList.add('hidden');
    }

    async function submitSelfBooking(e) {
      e.preventDefault();
      const seatId = document.getElementById('modalSeatId').value;
      const name = document.getElementById('modalGuestName').value.trim();
      const phone = document.getElementById('modalGuestPhone').value.trim();
      const submitBtn = document.getElementById('modalSubmitBtn');

      if (!seatId || !name) return;

      submitBtn.disabled = true;
      submitBtn.innerText = 'جاري التأكيد...';

      try {
        const res = await fetch('api/book.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            seatId,
            guest: { name, phone, category: 'عام', notes: 'حجز ذاتي عبر بوابة المستفيد PHP' }
          })
        });

        const data = await res.json();
        submitBtn.disabled = false;
        submitBtn.innerText = 'تأكيد الحجز واستلام التذكرة 🎟️';

        if (data.success) {
          closeBookingModal();
          
          // Confetti!
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });

          // Reload seats and select new seat
          await loadSeats();
          selectSeat(seatId);
          switchTab('find');

          showAlert(`تهانينا ${name}! تم حجز المقعد بنجاح وحفظه في قاعدة البيانات.`, 'success');
        } else {
          alert(data.message || 'حدث خطأ أثناء الحجز');
        }
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.innerText = 'تأكيد الحجز واستلام التذكرة 🎟️';
        alert('حدث خطأ في الاتصال بالخادم');
      }
    }

    function openFullTicketModal() {
      if (!currentSelectedSeat || !currentSelectedSeat.guest) return;
      const seat = currentSelectedSeat;

      document.getElementById('printGuestName').innerText = seat.guest.name;
      document.getElementById('printGuestCat').innerText = `الفئة: ${seat.guest.category || 'عام'}`;
      document.getElementById('printLevel').innerText = seat.levelName;
      document.getElementById('printRow').innerText = seat.row;
      document.getElementById('printSeatNo').innerText = seat.number;
      document.getElementById('printTokenCode').innerText = seat.guest.token;

      // Render QR Code
      const canvas = document.getElementById('qrCodeCanvas');
      QRCode.toCanvas(canvas, seat.guest.token, {
        width: 160,
        margin: 1,
        color: { dark: '#000000', light: '#ffffff' }
      });

      document.getElementById('fullTicketModal').classList.remove('hidden');
    }

    function closeFullTicketModal() {
      document.getElementById('fullTicketModal').classList.add('hidden');
    }

    function downloadTicketImage() {
      const ticketEl = document.getElementById('printableTicket');
      html2canvas(ticketEl, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `تذكرة_${currentSelectedSeat.guest.name}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }

    function copyTicketDetails() {
      if (!currentSelectedSeat) return;
      const s = currentSelectedSeat;
      const text = `🎟️ تذكرة مسرح التعليم\nالاسم: ${s.guest.name}\nالمقعد: ${s.levelName} - الصف ${s.row} المقعد ${s.number}\nالرمز: ${s.guest.token}`;
      navigator.clipboard.writeText(text);
      
      const btnText = document.getElementById('copyBtnText');
      btnText.innerText = 'تم النسخ! ✓';
      setTimeout(() => btnText.innerText = '📋 نسخ البيانات', 2000);
    }

    function showAlert(msg, type = 'info') {
      const alertEl = document.getElementById('alertNotice');
      alertEl.innerText = msg;
      alertEl.className = `p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 shadow-lg ${type === 'success' ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-200' : 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-200'}`;
      alertEl.classList.remove('hidden');
      setTimeout(() => alertEl.classList.add('hidden'), 5000);
    }

    // Startup
    loadSeats();
  </script>

</body>
</html>
