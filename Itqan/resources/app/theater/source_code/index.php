<?php
/**
 * لوحة التحكم الإدارية لنظام حجز مقاعد المسرح (PHP / SQL)
 * Theater Seats Management & Admin Dashboard
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
        SUM(CASE WHEN status = 'reserved' THEN 1 ELSE 0 END) as reserved,
        SUM(CASE WHEN status = 'checked_in' THEN 1 ELSE 0 END) as checked_in
    FROM `seats`
");
$stats = $statsStmt->fetch() ?: ['total' => 0, 'available' => 0, 'reserved' => 0, 'checked_in' => 0];
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>لوحة التحكم الإدارية - <?= htmlspecialchars($event['title']) ?></title>
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- QRCode.js & Canvas Confetti -->
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.min.js"></script>

  <style>
    body { font-family: 'Cairo', sans-serif; }
    .glass-panel {
      background: rgba(12, 22, 43, 0.75);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(0, 210, 255, 0.18);
    }
    .seat-btn {
      transition: all 0.15s ease;
    }
    .seat-btn:hover {
      transform: scale(1.15) translateY(-2px);
      z-index: 20;
    }
  </style>
</head>
<body class="bg-[#080E1A] text-slate-100 min-h-screen flex flex-col justify-between selection:bg-cyan-400 selection:text-slate-950">

  <!-- Top Admin Header -->
  <header class="bg-[#060B14]/95 border-b border-cyan-500/20 sticky top-0 z-40 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00d2ff] to-[#7952b3] flex items-center justify-center shadow-lg shadow-cyan-500/30 text-white font-black text-lg">
        🏛️
      </div>
      <div>
        <h1 class="text-base sm:text-lg font-black tracking-wide text-white">
          لوحة إدارة مقاعد المسرح (PHP / MySQL)
        </h1>
        <p class="text-[10px] text-cyan-300 font-bold tracking-wider">
          <?= htmlspecialchars($event['organizer']) ?>
        </p>
      </div>
    </div>

    <!-- Right Controls -->
    <div class="flex items-center gap-2.5">
      <a href="beneficiary.php" target="_blank" class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:brightness-110 text-slate-950 text-xs font-black shadow-md transition-all">
        <span>🎟️ فتح بوابة المستفيد المستقلة</span>
        <span class="text-[10px]">↗</span>
      </a>
    </div>
  </header>

  <!-- Main Container -->
  <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

    <!-- KPI Stats Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 text-center">
        <span class="text-xs text-slate-400 font-bold block mb-1">إجمالي المقاعد</span>
        <strong id="statTotal" class="text-2xl sm:text-3xl font-black text-white"><?= $stats['total'] ?></strong>
      </div>
      <div class="glass-panel p-4 sm:p-5 rounded-2xl border border-emerald-500/30 text-center bg-emerald-500/5">
        <span class="text-xs text-emerald-400 font-bold block mb-1">المقاعد المتاحة</span>
        <strong id="statAvailable" class="text-2xl sm:text-3xl font-black text-emerald-400"><?= $stats['available'] ?></strong>
      </div>
      <div class="glass-panel p-4 sm:p-5 rounded-2xl border border-cyan-500/30 text-center bg-cyan-500/5">
        <span class="text-xs text-cyan-300 font-bold block mb-1">المقاعد المحجوزة</span>
        <strong id="statReserved" class="text-2xl sm:text-3xl font-black text-cyan-300"><?= $stats['reserved'] ?></strong>
      </div>
      <div class="glass-panel p-4 sm:p-5 rounded-2xl border border-purple-500/30 text-center bg-purple-500/5">
        <span class="text-xs text-purple-300 font-bold block mb-1">تسجيل الدخول بالباب</span>
        <strong id="statCheckedIn" class="text-2xl sm:text-3xl font-black text-purple-300"><?= $stats['checked_in'] ?></strong>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto text-xs sm:text-sm font-bold">
      <button onclick="switchAdminTab('map')" id="tabBtnMap" class="px-4 py-2.5 rounded-xl transition-all bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
        💺 خريطة المسرح وإدارة الحجز
      </button>
      <button onclick="switchAdminTab('bookings')" id="tabBtnBookings" class="px-4 py-2.5 rounded-xl transition-all text-slate-300 hover:text-white">
        📋 سجل وقائمة الحجوزات
      </button>
      <button onclick="switchAdminTab('scanner')" id="tabBtnScanner" class="px-4 py-2.5 rounded-xl transition-all text-slate-300 hover:text-white">
        📱 مسح التذاكر بالبوابة (QR Code)
      </button>
      <button onclick="switchAdminTab('settings')" id="tabBtnSettings" class="px-4 py-2.5 rounded-xl transition-all text-slate-300 hover:text-white">
        ⚙️ إعدادات الفعالية
      </button>
    </div>

    <!-- TAB 1: Theater Map & Seat Manager -->
    <section id="adminTabMap" class="space-y-4">
      <div class="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2">
          <button onclick="changeAdminFloor('G')" id="adminFloorGBtn" class="px-4 py-2 rounded-xl font-black bg-cyan-400 text-slate-950 shadow">
            الدور الأرضي (G)
          </button>
          <button onclick="changeAdminFloor('B')" id="adminFloorBBtn" class="px-4 py-2 rounded-xl font-black bg-white/10 text-slate-300 hover:text-white">
            الدور الثاني - البلكونة (B)
          </button>
        </div>

        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-md bg-gradient-to-b from-cyan-500 to-blue-600"></span> متاح</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-md bg-amber-500"></span> محجوز</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-md bg-purple-600"></span> تم الدخول</span>
        </div>
      </div>

      <!-- Arena Map Container -->
      <div class="glass-panel p-4 sm:p-6 rounded-3xl overflow-x-auto">
        <div id="adminMapContainer" class="min-w-[920px]"></div>
      </div>
    </section>

    <!-- TAB 2: Bookings List -->
    <section id="adminTabBookings" class="hidden space-y-4">
      <div class="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <input 
          type="text" 
          id="bookingSearchInput" 
          oninput="filterBookingsTable(this.value)"
          placeholder="ابحث في الحجوزات باسم الضيف، رقم الجوال، أو كود التذكرة..." 
          class="w-full sm:w-80 bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-2 text-xs text-white outline-none"
        >
        <div class="text-xs text-slate-400">
          إجمالي الحجوزات: <strong id="bookingsCount" class="text-cyan-300">0</strong>
        </div>
      </div>

      <div class="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div class="overflow-x-auto">
          <table class="w-full text-right text-xs">
            <thead class="bg-slate-950/80 text-slate-400 border-b border-white/10">
              <tr>
                <th class="p-3">اسم الضيف</th>
                <th class="p-3">رقم الجوال</th>
                <th class="p-3">الفئة</th>
                <th class="p-3">المقعد</th>
                <th class="p-3">كود التذكرة</th>
                <th class="p-3">الحالة</th>
                <th class="p-3">إجراءات</th>
              </tr>
            </thead>
            <tbody id="bookingsTableBody" class="divide-y divide-white/5"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- TAB 3: Door Scanner -->
    <section id="adminTabScanner" class="hidden space-y-6">
      <div class="max-w-xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 text-center space-y-4">
        <div class="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mx-auto text-2xl border border-cyan-500/40">
          📱
        </div>
        <h3 class="text-lg font-black text-white">مسح وتأكيد تذاكر الدخول بالبوابة</h3>
        <p class="text-xs text-slate-300">
          اكتب أو الصق رمز التذكرة (أو امسح الـ QR Code عبر جهاز الباركود):
        </p>

        <div class="flex items-center gap-2">
          <input 
            type="text" 
            id="scannerCodeInput" 
            placeholder="مثال: TK-A1B2C3D4 أو كود المقعد G-A-05" 
            class="flex-1 bg-slate-950 border-2 border-cyan-500/40 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none font-mono text-center tracking-wider"
            onkeydown="if(event.key==='Enter') executeDoorCheckin()"
          >
          <button onclick="executeDoorCheckin()" class="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg">
            تسجيل دخول ✓
          </button>
        </div>

        <div id="scannerResultBox" class="hidden p-4 rounded-2xl text-xs sm:text-sm font-bold text-center"></div>
      </div>
    </section>

    <!-- TAB 4: Settings -->
    <section id="adminTabSettings" class="hidden space-y-6">
      <div class="max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl space-y-5">
        <h3 class="text-base font-black text-white border-b border-white/10 pb-3">إعدادات وبيانات الفعالية</h3>

        <form onsubmit="saveEventSettings(event)" class="space-y-4 text-xs">
          <div class="space-y-1">
            <label class="font-bold text-slate-300 block">عنوان الفعالية / الحفل:</label>
            <input type="text" id="settingTitle" value="<?= htmlspecialchars($event['title']) ?>" class="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white outline-none">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="font-bold text-slate-300 block">الجهة المنظمة:</label>
              <input type="text" id="settingOrganizer" value="<?= htmlspecialchars($event['organizer']) ?>" class="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white outline-none">
            </div>
            <div class="space-y-1">
              <label class="font-bold text-slate-300 block">التاريخ:</label>
              <input type="text" id="settingDate" value="<?= htmlspecialchars($event['event_date']) ?>" class="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white outline-none">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="font-bold text-slate-300 block">الوقت وموعد فتح الأبواب:</label>
              <input type="text" id="settingTime" value="<?= htmlspecialchars($event['event_time']) ?>" class="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white outline-none">
            </div>
            <div class="space-y-1">
              <label class="font-bold text-slate-300 block">القاعة / المسرح:</label>
              <input type="text" id="settingVenue" value="<?= htmlspecialchars($event['venue']) ?>" class="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white outline-none">
            </div>
          </div>

          <div class="space-y-1">
            <label class="font-bold text-slate-300 block">المدينة / الدولة:</label>
            <input type="text" id="settingCity" value="<?= htmlspecialchars($event['city']) ?>" class="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white outline-none">
          </div>

          <div class="space-y-1">
            <label class="font-bold text-slate-300 block">ملاحظات وتعليمات الحضور:</label>
            <textarea id="settingNote" rows="3" class="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white outline-none"><?= htmlspecialchars($event['note']) ?></textarea>
          </div>

          <div class="pt-2">
            <button type="submit" class="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg">
              حفظ الإعدادات والتحديثات ✓
            </button>
          </div>
        </form>

        <div class="pt-6 border-t border-white/10 space-y-3">
          <h4 class="text-xs font-bold text-rose-400">إجراءات إعادة الضبط للمصنع:</h4>
          <p class="text-[11px] text-slate-400">
            سيؤدي الضغط على الزر أدناه إلى إفراغ جميع الحجوزات الحالية وإعادة تهيئة كافة المقاعد الـ 746 لتصبح متاحة.
          </p>
          <button onclick="resetAllSeats()" class="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold">
            ⚠️ إعادة ضبط كافة المقاعد وحذف الحجوزات
          </button>
        </div>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="py-4 px-8 border-t border-slate-800/60 text-center text-xs text-slate-500 bg-[#060B14]">
    <p>نظام حجز مقاعد مسارح وقاعات إدارة التعليم بمنطقة عسير (PHP / MySQL) © 2026</p>
  </footer>

  <!-- Modal: Admin Seat Action Modal (Book or Details) -->
  <div id="adminSeatModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
    <div class="glass-panel max-w-md w-full p-6 rounded-3xl border-2 border-cyan-500/40 shadow-2xl bg-[#0b1426] space-y-5">
      <div class="flex items-center justify-between border-b border-white/10 pb-3">
        <h4 id="adminModalTitle" class="text-base font-black text-white">إدارة المقعد</h4>
        <button onclick="closeAdminSeatModal()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300">✕</button>
      </div>

      <div class="bg-slate-900/90 p-4 rounded-2xl border border-cyan-500/30 space-y-1">
        <div id="adminModalSeatCode" class="text-sm font-black text-white"></div>
        <div id="adminModalSeatSector" class="text-xs text-slate-400"></div>
      </div>

      <!-- State 1: Book Seat Form -->
      <div id="adminBookFormContainer" class="space-y-4">
        <form onsubmit="submitAdminBooking(event)" class="space-y-3 text-xs">
          <input type="hidden" id="adminBookSeatId">
          <div class="space-y-1">
            <label class="font-bold text-slate-300 block">اسم الضيف (مطلوب):</label>
            <input type="text" id="adminGuestName" required placeholder="اكتب اسم الضيف الكامل..." class="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-3 py-2 text-white outline-none">
          </div>
          <div class="space-y-1">
            <label class="font-bold text-slate-300 block">رقم الجوال:</label>
            <input type="tel" id="adminGuestPhone" placeholder="05xxxxxxxx" class="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-3 py-2 text-white outline-none">
          </div>
          <div class="space-y-1">
            <label class="font-bold text-slate-300 block">فئة الضيف:</label>
            <select id="adminGuestCategory" class="w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-3 py-2 text-white outline-none">
              <option value="كبار الشخصيات VIP">كبار الشخصيات VIP</option>
              <option value="ضيف شرف">ضيف شرف</option>
              <option value="ضيوف مميزون">ضيوف مميزون</option>
              <option value="عام">عام</option>
            </select>
          </div>

          <div class="pt-2 flex items-center gap-2">
            <button type="submit" class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:brightness-110 text-slate-950 font-black shadow-md">
              تأكيد الحجز والإصدار ✓
            </button>
            <button type="button" onclick="closeAdminSeatModal()" class="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300">
              إلغاء
            </button>
          </div>
        </form>
      </div>

      <!-- State 2: Reserved Seat Details & Actions -->
      <div id="adminReservedDetailsContainer" class="hidden space-y-4 text-xs">
        <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
          <div class="font-black text-sm text-cyan-200" id="adminDetailsGuestName"></div>
          <div class="text-slate-300" id="adminDetailsPhone"></div>
          <div class="text-slate-300" id="adminDetailsCat"></div>
          <div class="text-slate-400 font-mono text-[11px]" id="adminDetailsToken"></div>
        </div>

        <div class="flex items-center gap-2 pt-2">
          <button onclick="cancelCurrentSeatBooking()" class="flex-1 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold">
            إلغاء الحجز ✕
          </button>
          <button onclick="closeAdminSeatModal()" class="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300">
            إغلاق
          </button>
        </div>
      </div>

    </div>
  </div>

  <!-- Admin Scripts -->
  <script>
    let allSeats = [];
    let currentAdminFloor = 'G';
    let currentModalSeat = null;

    async function loadAdminData() {
      try {
        const res = await fetch('api/seats.php');
        if (res.ok) {
          allSeats = await res.json();
          renderAdminMap(currentAdminFloor);
          renderBookingsTable();
          updateStatCounters();
        }
      } catch (e) {
        console.error('Error loading seats:', e);
      }
    }

    function updateStatCounters() {
      const total = allSeats.length;
      const available = allSeats.filter(s => s.status === 'available').length;
      const reserved = allSeats.filter(s => s.status === 'reserved').length;
      const checkedIn = allSeats.filter(s => s.status === 'checked_in').length;

      document.getElementById('statTotal').innerText = total;
      document.getElementById('statAvailable').innerText = available;
      document.getElementById('statReserved').innerText = reserved;
      document.getElementById('statCheckedIn').innerText = checkedIn;
      document.getElementById('bookingsCount').innerText = reserved + checkedIn;
    }

    function switchAdminTab(tab) {
      document.getElementById('adminTabMap').classList.toggle('hidden', tab !== 'map');
      document.getElementById('adminTabBookings').classList.toggle('hidden', tab !== 'bookings');
      document.getElementById('adminTabScanner').classList.toggle('hidden', tab !== 'scanner');
      document.getElementById('adminTabSettings').classList.toggle('hidden', tab !== 'settings');

      const active = 'px-4 py-2.5 rounded-xl transition-all bg-cyan-500/20 text-cyan-300 border border-cyan-400/40';
      const normal = 'px-4 py-2.5 rounded-xl transition-all text-slate-300 hover:text-white';

      document.getElementById('tabBtnMap').className = (tab === 'map') ? active : normal;
      document.getElementById('tabBtnBookings').className = (tab === 'bookings') ? active : normal;
      document.getElementById('tabBtnScanner').className = (tab === 'scanner') ? active : normal;
      document.getElementById('tabBtnSettings').className = (tab === 'settings') ? active : normal;
    }

    function changeAdminFloor(floor) {
      currentAdminFloor = floor;
      document.getElementById('adminFloorGBtn').className = `px-4 py-2 rounded-xl font-black ${floor === 'G' ? 'bg-cyan-400 text-slate-950 shadow' : 'bg-white/10 text-slate-300 hover:text-white'}`;
      document.getElementById('adminFloorBBtn').className = `px-4 py-2 rounded-xl font-black ${floor === 'B' ? 'bg-cyan-400 text-slate-950 shadow' : 'bg-white/10 text-slate-300 hover:text-white'}`;
      renderAdminMap(floor);
    }

    function renderAdminMap(level) {
      const container = document.getElementById('adminMapContainer');
      const levelSeats = allSeats.filter(s => s.level === level);
      const rows = Array.from(new Set(levelSeats.map(s => s.row))).sort();

      let html = `
        <div class="mb-6 text-center">
          <div class="inline-block bg-gradient-to-r from-cyan-500/20 via-blue-500/30 to-cyan-500/20 px-8 py-2 rounded-b-3xl border border-cyan-400/40 text-cyan-200 font-black text-sm uppercase">
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
            
            <div class="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              ${left.map(s => renderAdminSeatBtn(s)).join('')}
            </div>

            <div class="w-4 h-full flex items-center justify-center"><div class="w-0.5 h-4 bg-cyan-400/30 rounded-full"></div></div>

            <div class="flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-cyan-400/20">
              ${center.map(s => renderAdminSeatBtn(s)).join('')}
            </div>

            <div class="w-4 h-full flex items-center justify-center"><div class="w-0.5 h-4 bg-cyan-400/30 rounded-full"></div></div>

            <div class="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              ${right.map(s => renderAdminSeatBtn(s)).join('')}
            </div>

            <div class="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center text-white font-bold text-[10px] shrink-0">${r}</div>
          </div>
        `;
      });

      html += `</div>`;
      container.innerHTML = html;
    }

    function renderAdminSeatBtn(seat) {
      let bg = 'bg-gradient-to-b from-cyan-600 to-blue-700 text-white border border-cyan-400/40';
      if (seat.status === 'reserved') {
        bg = 'bg-amber-500 text-slate-950 font-black border border-amber-300 shadow';
      } else if (seat.status === 'checked_in') {
        bg = 'bg-purple-600 text-white font-black border border-purple-400 shadow';
      }

      const num = parseInt(seat.number, 10);
      const title = `${seat.levelName} - الصف ${seat.row} المقعد ${num} (${seat.status === 'available' ? 'متاح' : seat.guest?.name})`;

      return `
        <button 
          onclick="openAdminSeatModal('${seat.id}')"
          title="${title}"
          class="seat-btn w-6 h-6 rounded-md text-[10px] flex items-center justify-center font-mono cursor-pointer ${bg}"
        >
          ${num}
        </button>
      `;
    }

    function openAdminSeatModal(seatId) {
      const seat = allSeats.find(s => s.id === seatId);
      if (!seat) return;

      currentModalSeat = seat;
      document.getElementById('adminModalSeatCode').innerText = `${seat.levelName} – الصف (${seat.row}) - المقعد ${seat.number}`;
      document.getElementById('adminModalSeatSector').innerText = `قطاع ${seat.sector}`;

      if (seat.status === 'available') {
        document.getElementById('adminBookFormContainer').classList.remove('hidden');
        document.getElementById('adminReservedDetailsContainer').classList.add('hidden');
        document.getElementById('adminBookSeatId').value = seat.id;
        document.getElementById('adminGuestName').value = '';
        document.getElementById('adminGuestPhone').value = '';
      } else {
        document.getElementById('adminBookFormContainer').classList.add('hidden');
        document.getElementById('adminReservedDetailsContainer').classList.remove('hidden');
        document.getElementById('adminDetailsGuestName').innerText = seat.guest?.name || 'غير محدد';
        document.getElementById('adminDetailsPhone').innerText = `الجوال: ${seat.guest?.phone || 'غير مسجل'}`;
        document.getElementById('adminDetailsCat').innerText = `الفئة: ${seat.guest?.category || 'عام'}`;
        document.getElementById('adminDetailsToken').innerText = `كود التذكرة: ${seat.guest?.token || ''}`;
      }

      document.getElementById('adminSeatModal').classList.remove('hidden');
    }

    function closeAdminSeatModal() {
      document.getElementById('adminSeatModal').classList.add('hidden');
    }

    async function submitAdminBooking(e) {
      e.preventDefault();
      const seatId = document.getElementById('adminBookSeatId').value;
      const name = document.getElementById('adminGuestName').value.trim();
      const phone = document.getElementById('adminGuestPhone').value.trim();
      const category = document.getElementById('adminGuestCategory').value;

      try {
        const res = await fetch('api/book.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seatId, guest: { name, phone, category } })
        });
        const data = await res.json();
        if (data.success) {
          closeAdminSeatModal();
          await loadAdminData();
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert('حدث خطأ بالاتصال');
      }
    }

    async function cancelCurrentSeatBooking() {
      if (!currentModalSeat) return;
      if (!confirm(`هل أنت متأكد من إلغاء حجز المقعد (${currentModalSeat.id})؟`)) return;

      try {
        const res = await fetch('api/cancel.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seatId: currentModalSeat.id })
        });
        const data = await res.json();
        if (data.success) {
          closeAdminSeatModal();
          await loadAdminData();
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert('حدث خطأ');
      }
    }

    function renderBookingsTable(filterQuery = '') {
      const tbody = document.getElementById('bookingsTableBody');
      const booked = allSeats.filter(s => s.status !== 'available' && s.guest);
      const q = filterQuery.trim().toLowerCase();

      const filtered = booked.filter(s => {
        if (!q) return true;
        const name = (s.guest.name || '').toLowerCase();
        const phone = (s.guest.phone || '').toLowerCase();
        const token = (s.guest.token || '').toLowerCase();
        const id = s.id.toLowerCase();
        return name.includes(q) || phone.includes(q) || token.includes(q) || id.includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-slate-400">لا توجد حجوزات مطابقة.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map(s => {
        const statusBadge = (s.status === 'checked_in')
          ? '<span class="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold">تم الدخول</span>'
          : '<span class="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold">مؤكد</span>';

        return `
          <tr class="hover:bg-white/5 transition-all">
            <td class="p-3 font-bold text-white">${s.guest.name}</td>
            <td class="p-3 text-slate-300 font-mono">${s.guest.phone || '-'}</td>
            <td class="p-3"><span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">${s.guest.category || 'عام'}</span></td>
            <td class="p-3 font-mono text-cyan-200">${s.levelName} - ${s.row}${s.number}</td>
            <td class="p-3 font-mono text-[11px] text-slate-400">${s.guest.token}</td>
            <td class="p-3">${statusBadge}</td>
            <td class="p-3">
              <button onclick="directCancelBooking('${s.id}')" class="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-[11px]">
                إلغاء الحجز ✕
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }

    function filterBookingsTable(val) {
      renderBookingsTable(val);
    }

    async function directCancelBooking(seatId) {
      if (!confirm(`هل أنت متأكد من إلغاء حجز المقعد ${seatId}؟`)) return;
      try {
        const res = await fetch('api/cancel.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seatId })
        });
        const data = await res.json();
        if (data.success) {
          await loadAdminData();
        } else {
          alert(data.message);
        }
      } catch (e) {
        alert('حدث خطأ');
      }
    }

    async function executeDoorCheckin() {
      const input = document.getElementById('scannerCodeInput');
      const val = input.value.trim();
      const resultBox = document.getElementById('scannerResultBox');

      if (!val) return;

      try {
        const res = await fetch('api/checkin.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: val })
        });
        const data = await res.json();
        resultBox.classList.remove('hidden');

        if (data.success) {
          resultBox.className = 'p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-sm font-bold text-center animate-fade-in';
          resultBox.innerHTML = `✅ ${data.message}<br><span class="text-xs text-slate-300 mt-1 block">المقعد: ${data.seat.levelName} - الصف ${data.seat.row} المقعد ${data.seat.number}</span>`;
          input.value = '';
          await loadAdminData();
        } else {
          resultBox.className = 'p-4 rounded-2xl bg-rose-500/20 border border-rose-400/50 text-rose-200 text-sm font-bold text-center animate-fade-in';
          resultBox.innerText = `⚠️ ${data.message}`;
        }
      } catch (e) {
        alert('حدث خطأ في الاتصال');
      }
    }

    async function saveEventSettings(e) {
      e.preventDefault();
      const payload = {
        title: document.getElementById('settingTitle').value.trim(),
        organizer: document.getElementById('settingOrganizer').value.trim(),
        date: document.getElementById('settingDate').value.trim(),
        time: document.getElementById('settingTime').value.trim(),
        venue: document.getElementById('settingVenue').value.trim(),
        city: document.getElementById('settingCity').value.trim(),
        note: document.getElementById('settingNote').value.trim()
      };

      try {
        const res = await fetch('api/event.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          alert('✅ تم حفظ بيانات الفعالية بنجاح');
        } else {
          alert(data.message || 'خطأ أثناء الحفظ');
        }
      } catch (err) {
        alert('خطأ في الاتصال');
      }
    }

    async function resetAllSeats() {
      if (!confirm('⚠️ تحذير: هل أنت متأكد تماماً من رغبتك في حذف جميع الحجوزات وإعادة ضبط المقاعد؟ لا يمكن التراجع عن هذا الإجراء.')) return;
      try {
        const res = await fetch('api/reset.php', { method: 'POST' });
        const data = await res.json();
        if (data.success) {
          alert('✅ تمت إعادة ضبط جميع المقاعد بنجاح.');
          await loadAdminData();
        } else {
          alert(data.message);
        }
      } catch (e) {
        alert('خطأ أثناء إعادة الضبط');
      }
    }

    // Startup
    loadAdminData();
  </script>

</body>
</html>
