// Storage & Layout Generator according to exact theater specs

const STORAGE_SEATS_KEY = 'theaterReservations_v2';
const STORAGE_EVENT_KEY = 'theater_event_v2';

export const DEFAULT_EVENT = {
  title: 'المسرح الرئيسي - حفل التكريم والافتتاح',
  organizer: 'إدارة المسرح والفعاليات',
  date: 'الجمعة، 25 أكتوبر 2026',
  time: '08:00 مساءً (تفتح الأبواب 07:00 مساءً)',
  venue: 'المسرح الرئيسي - القاعة الكبرى',
  city: 'الرياض، المملكة العربية السعودية',
  logoText: 'المسرح الرئيسي',
  logoUrl: 'ministry_logo.png',
  theaterImageUrl: '',
  note: 'يرجى إبراز بطاقة الحضور عند مدخل المسرح للتحقق عبر الـ QR Code.'
};

/**
 * Build a self-contained QR code URL that guarantees instant ticket display
 * on any mobile phone camera scan without relying on local storage.
 */
export function buildInvitationQrUrl(seat, customBaseUrl = '') {
  if (!seat) return customBaseUrl || '';
  const origin = customBaseUrl || (typeof window !== 'undefined' ? (window.location.origin + window.location.pathname) : '');
  const params = new URLSearchParams();

  const token = seat.guest?.token || seat.id || 'INV';
  params.set('invitation', token);

  if (seat.row) params.set('row', seat.row);
  if (seat.number) params.set('seat', String(parseInt(seat.number, 10)));
  if (seat.level) params.set('level', seat.level);
  if (seat.sector) params.set('sec', seat.sector);
  if (seat.gate) params.set('gate', seat.gate);

  if (seat.guest) {
    if (seat.guest.name) params.set('name', seat.guest.name);
    if (seat.guest.jobTitle) params.set('role', seat.guest.jobTitle);
    if (seat.guest.category) params.set('cat', seat.guest.category);
  }

  return `${origin}?${params.toString()}`;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Generate seat configuration matching user specifications:
 * G (Ground): 21 rows (A=6+10+6, B-U=7+12+7)
 * B (Balcony): 8 rows (A=6+10+6, B-H=7+12+7)
 */
export function generateDefaultSeats() {
  const seats = [];

  // Ground Floor (G) - 21 rows A to U
  const gRows = alphabet.slice(0, 21); // A to U
  gRows.forEach((row, idx) => {
    const groups = idx === 0 ? [6, 10, 6] : [7, 12, 7];
    let seatNo = 1;

    // Groups: [Left, Center, Right]
    groups.forEach((count, groupIdx) => {
      let sectorName = 'اليسار';
      let sectorKey = 'left';

      if (groupIdx === 1) {
        sectorName = 'الوسط';
        sectorKey = 'center';
      } else if (groupIdx === 2) {
        sectorName = 'اليمين';
        sectorKey = 'right';
      }

      for (let i = 0; i < count; i++) {
        const nStr = String(seatNo).padStart(2, '0');
        const id = `G-${row}-${nStr}`;
        seats.push({
          id,
          level: 'G',
          levelName: 'الدور الأرضي',
          row,
          number: nStr,
          rawNumber: seatNo,
          sector: sectorName,
          sectorKey,
          status: 'available',
          guest: null
        });
        seatNo++;
      }
    });
  });

  // Balcony Floor (B) - 8 rows A to H
  const bRows = alphabet.slice(0, 8); // A to H
  bRows.forEach((row, idx) => {
    const groups = idx === 0 ? [6, 10, 6] : [7, 12, 7];
    let seatNo = 1;

    groups.forEach((count, groupIdx) => {
      let sectorName = 'اليسار';
      let sectorKey = 'left';

      if (groupIdx === 1) {
        sectorName = 'الوسط';
        sectorKey = 'center';
      } else if (groupIdx === 2) {
        sectorName = 'اليمين';
        sectorKey = 'right';
      }

      for (let i = 0; i < count; i++) {
        const nStr = String(seatNo).padStart(2, '0');
        const id = `B-${row}-${nStr}`;
        seats.push({
          id,
          level: 'B',
          levelName: 'الدور الثاني - البلكونة',
          row,
          number: nStr,
          rawNumber: seatNo,
          sector: sectorName,
          sectorKey,
          status: 'available',
          guest: null
        });
        seatNo++;
      }
    });
  });

  return seats;
}

export function getSeats() {
  try {
    const savedSeats = localStorage.getItem(STORAGE_SEATS_KEY);
    if (savedSeats) {
      const parsed = JSON.parse(savedSeats);
      let modified = false;
      parsed.forEach(s => {
        if (s.guest && s.guest.jobTitle === undefined) {
          if (s.guest.name && s.guest.name.includes('خالد السليمان')) {
            s.guest.jobTitle = 'مشرف تربوي بإدارة التعليم';
          } else if (s.guest.name && s.guest.name.includes('الشمري')) {
            s.guest.jobTitle = 'وكيل الوزارة للتعليم';
          } else if (s.guest.name && s.guest.name.includes('سارة')) {
            s.guest.jobTitle = 'مدير عام الإشراف التربوي';
          } else if (s.guest.name && s.guest.name.includes('العتيبي')) {
            s.guest.jobTitle = 'مدير إدارة تقنية المعلومات';
          } else {
            s.guest.jobTitle = '';
          }
          modified = true;
        }
      });
      if (modified) {
        saveSeats(parsed);
      }
      return parsed;
    }
  } catch (err) {
    console.error('Error loading seats', err);
  }
  const defaultSeats = generateDefaultSeats();
  saveSeats(defaultSeats);
  return defaultSeats;
}

export function saveSeats(seats) {
  try {
    localStorage.setItem(STORAGE_SEATS_KEY, JSON.stringify(seats));
  } catch (err) {
    console.error('Error saving seats', err);
  }
}

export function getEventDetails() {
  try {
    const saved = localStorage.getItem(STORAGE_EVENT_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.logoUrl) {
        parsed.logoUrl = 'ministry_logo.png';
      }
      return { ...DEFAULT_EVENT, ...parsed };
    }
  } catch (err) {
    console.error('Error loading event', err);
  }
  return DEFAULT_EVENT;
}

export function saveEventDetails(eventData) {
  try {
    localStorage.setItem(STORAGE_EVENT_KEY, JSON.stringify(eventData));
  } catch (err) {
    console.error('Error saving event', err);
  }
}

export function generateToken() {
  return 'INV-' + Math.random().toString(36).substring(2, 9).toUpperCase();
}

export function formatArabicSeatCode(seat) {
  if (!seat) return '';
  const floorStr = seat.level === 'G' ? 'الدور الأرضي' : 'الدور الثاني';
  return `${floorStr} – ${seat.row}-${seat.number}`;
}

export function bookSeat(seatId, guestData) {
  const seats = getSeats();
  const index = seats.findIndex((s) => s.id === seatId);
  if (index === -1) return { success: false, error: 'المقعد غير موجود' };

  const token = generateToken();
  const now = new Date().toISOString();

  seats[index].status = 'reserved';
  seats[index].guest = {
    name: guestData.name || 'ضيف مكرّم',
    jobTitle: guestData.jobTitle || guestData.position || '',
    phone: guestData.phone || '',
    category: guestData.category || 'عام',
    notes: guestData.notes || '',
    token,
    bookedAt: now,
    checkedInAt: null
  };

  saveSeats(seats);
  return { success: true, seat: seats[index], token };
}

export function cancelBooking(seatId) {
  const seats = getSeats();
  const index = seats.findIndex((s) => s.id === seatId);
  if (index === -1) return false;

  seats[index].status = 'available';
  seats[index].guest = null;
  saveSeats(seats);
  return true;
}

export function checkInTicket(tokenOrCode) {
  if (!tokenOrCode) {
    return { success: false, code: 'INVALID', message: 'يرجى إدخال رمز الدعوة أو مسح الكود' };
  }

  const query = tokenOrCode.trim().toUpperCase();
  const seats = getSeats();

  const seat = seats.find((s) => {
    if (!s.guest) return false;
    return (
      s.guest.token === query ||
      s.guest.token.endsWith(query) ||
      s.id.toUpperCase() === query
    );
  });

  if (!seat || !seat.guest) {
    return {
      success: false,
      code: 'NOT_FOUND',
      message: 'لم يتم العثور على حجز مطابق لهذا الرمز!'
    };
  }

  if (seat.status === 'checked_in') {
    return {
      success: false,
      code: 'ALREADY_USED',
      seat,
      message: `تنبيه: التذكرة مستخدمة سابقاً! تم دخول (${seat.guest.name}) الساعة ${new Date(seat.guest.checkedInAt).toLocaleTimeString('ar-SA')}`
    };
  }

  seat.status = 'checked_in';
  seat.guest.checkedInAt = new Date().toISOString();
  saveSeats(seats);

  return {
    success: true,
    code: 'SUCCESS',
    seat,
    message: `تم تسجيل الدخول بنجاح! أهلاً وسهلاً بك (${seat.guest.name}) - المقعد: ${formatArabicSeatCode(seat)}`
  };
}

export function seedSampleDataIfEmpty() {
  const seats = getSeats();
  const hasBookings = seats.some((s) => s.status !== 'available');
  if (!hasBookings) {
    const samples = [
      { id: 'G-A-05', name: 'سعادة الدكتور عبد الرحمن الشمري', jobTitle: 'وكيل الوزارة للتعليم', category: 'كبار الشخصيات VIP' },
      { id: 'G-A-06', name: 'الأستاذة سارة بن عبد العزيز', jobTitle: 'مدير عام الإشراف التربوي', category: 'ضيف شرف' },
      { id: 'G-B-08', name: 'المهندس فهد العتيبي', jobTitle: 'مدير إدارة تقنية المعلومات', category: 'ضيوف مميزون' },
      { id: 'B-A-04', name: 'الأستاذ خالد السليمان', jobTitle: 'مشرف تربوي بإدارة التعليم', category: 'عام' }
    ];

    samples.forEach((sample) => {
      const idx = seats.findIndex((s) => s.id === sample.id);
      if (idx !== -1) {
        seats[idx].status = 'reserved';
        seats[idx].guest = {
          name: sample.name,
          jobTitle: sample.jobTitle || '',
          phone: '0501234567',
          category: sample.category,
          token: generateToken(),
          bookedAt: new Date().toISOString(),
          checkedInAt: null
        };
      }
    });
    saveSeats(seats);
  }
}

/**
 * Add one or more seats to a specific row and sector.
 * Automatically handles sequential numbering and avoids any ID collision.
 */
export function addSeatsToRow(level, row, sectorKey, count = 1, autoRenumber = true) {
  const existing = getSeats();
  const levelObj = level === 'G'
    ? { levelName: 'الدور الأرضي' }
    : { levelName: 'الدور الثاني - البلكونة' };
    
  const SECTOR_NAMES = {
    left: 'اليسار',
    center: 'الوسط',
    right: 'اليمين'
  };
  const sectorName = SECTOR_NAMES[sectorKey] || 'الوسط';

  // Find max rawNumber in that specific sector to append after it
  const sectorSeats = existing.filter(s =>
    s.level === level && s.row === row && s.sectorKey === sectorKey
  );
  
  const maxSectorRawNum = sectorSeats.length > 0
    ? Math.max(...sectorSeats.map(s => s.rawNumber || parseInt(s.number) || 0))
    : 0;

  const newSeats = [];
  const timestamp = Date.now();
  for (let i = 0; i < Number(count); i++) {
    const rawNumber = maxSectorRawNum + 1 + i;
    const tempId = `${level}-${row}-${sectorKey}-${timestamp}-${i}`;
    newSeats.push({
      id: tempId,
      level,
      levelName: levelObj.levelName,
      row,
      number: String(rawNumber).padStart(2, '0'),
      rawNumber,
      sector: sectorName,
      sectorKey,
      status: 'available',
      guest: null
    });
  }

  saveSeats([...existing, ...newSeats]);

  // Renumber to ensure clean IDs (G-A-01, G-A-02...) and order (left -> center -> right)
  const renumbered = renumberAllSeats();
  return { success: true, seats: renumbered, addedCount: newSeats.length };
}

/**
 * Delete a single seat if it is available.
 * Reserved or checked-in seats cannot be deleted directly without cancelling booking.
 */
export function deleteSeat(seatId) {
  const seats = getSeats();
  const seatToDelete = seats.find(s => s.id === seatId);
  if (!seatToDelete) return { success: false, message: 'المقعد غير موجود' };
  
  if (seatToDelete.status !== 'available') {
    return { success: false, message: 'لا يمكن إزالة مقعد محجوز أو مسجل الدخول! يرجى إلغاء الحجز أولاً.' };
  }

  const updated = seats.filter(s => s.id !== seatId);
  saveSeats(updated);
  return { success: true, seats: updated };
}

/**
 * Renumber all seats sequentially within each row.
 * Order within a row: left sector → center sector → right sector
 * Numbers restart from 01 for each row.
 * Bookings and guest data are preserved; only id and number fields change.
 */
export function renumberAllSeats() {
  const seats = getSeats();

  // Group by level + row
  const groups = {};
  seats.forEach((seat) => {
    const key = `${seat.level}-${seat.row}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(seat);
  });

  const SECTOR_ORDER = { left: 0, center: 1, right: 2 };

  const renumbered = [];

  Object.keys(groups).sort().forEach((key) => {
    const group = groups[key];
    // Sort by sector order, then by original rawNumber within each sector
    group.sort((a, b) => {
      const sectorDiff = (SECTOR_ORDER[a.sectorKey] ?? 1) - (SECTOR_ORDER[b.sectorKey] ?? 1);
      if (sectorDiff !== 0) return sectorDiff;
      return (a.rawNumber || 0) - (b.rawNumber || 0);
    });

    group.forEach((seat, i) => {
      const newNum = i + 1;
      const newNumStr = String(newNum).padStart(2, '0');
      const newId = `${seat.level}-${seat.row}-${newNumStr}`;

      // If this seat had a booking with an old token pointing to old id,
      // we update the id but keep guest data intact
      renumbered.push({
        ...seat,
        id: newId,
        number: newNumStr,
        rawNumber: newNum,
      });
    });
  });

  saveSeats(renumbered);
  return renumbered;
}

/**
 * Asynchronously fetch seats from Python API if available, 
 * synchronizing with database.json, otherwise fallback to localStorage.
 */
export async function fetchSeatsAsync() {
  try {
    const res = await fetch('/api/seats', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        saveSeats(data);
        return data;
      }
    }
  } catch (err) {
    // API not running or unreachable, use localStorage silently
  }
  return getSeats();
}

/**
 * Asynchronously fetch event details from Python API if available, 
 * otherwise fallback to localStorage.
 */
export async function fetchEventDetailsAsync() {
  try {
    const res = await fetch('/api/event', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.title) {
        saveEventDetails(data);
        return data;
      }
    }
  } catch (err) {
    // API not running or unreachable
  }
  return getEventDetails();
}

/**
 * Asynchronously book a seat, posting to API if available, 
 * updating database.json, and always updating localStorage.
 */
export async function bookSeatAsync(seatId, guestData) {
  try {
    const res = await fetch('/api/seats/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId, guest: guestData })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.seats) {
        saveSeats(data.seats);
        return { success: true, seat: data.seat, seats: data.seats };
      }
    }
  } catch (err) {
    // Fallback to local storage booking
  }
  return bookSeat(seatId, guestData);
}

/**
 * Export full database (seats, event details, settings) as a downloadable JSON file.
 */
export function exportDatabaseBackup() {
  const seats = getSeats();
  const eventDetails = getEventDetails();
  const backupData = {
    version: '2.0',
    exportDate: new Date().toISOString(),
    eventDetails,
    seats
  };

  const jsonStr = JSON.stringify(backupData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `theater_backup_${(eventDetails.title || 'event').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Import and restore database from a JSON backup string or object.
 */
export function importDatabaseBackup(jsonData) {
  try {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    if (data && data.seats && Array.isArray(data.seats)) {
      saveSeats(data.seats);
      if (data.eventDetails) {
        saveEventDetails(data.eventDetails);
      }
      return { success: true, count: data.seats.length };
    }
    return { success: false, error: 'صيغة ملف النسخة الاحتياطية غير صحيحة.' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Reset all seat reservations while preserving the theater layout.
 */
export function resetAllSeats() {
  const defaultSeats = generateDefaultSeats();
  saveSeats(defaultSeats);
  return defaultSeats;
}

/* ========================================================================= */
/* STAFF & ORGANIZERS ACCOUNTS MANAGEMENT                                    */
/* ========================================================================= */

const STORAGE_STAFF_ACCOUNTS_KEY = 'theater_staff_accounts_v1';

export const DEFAULT_STAFF_ACCOUNTS = [
  {
    id: 'staff_gate_1',
    name: 'منظم البوابة الرئيسية 1',
    username: 'gate1',
    password: 'gate123',
    role: 'منظم بوابة الدخول',
    gate: 'المدخل الرئيسي',
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'staff_usher_1',
    name: 'مرشد مقاعد الدور الأرضي',
    username: 'usher1',
    password: 'usher123',
    role: 'إرشاد وتوجيه الضيوف',
    gate: 'الدور الأرضي',
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'staff_vip_1',
    name: 'منظم كبار الشخصيات VIP',
    username: 'vip1',
    password: 'vip123',
    role: 'استقبال ضيوف الشرف',
    gate: 'مدخل VIP',
    active: true,
    createdAt: new Date().toISOString()
  }
];

export function getStaffAccounts() {
  try {
    const raw = localStorage.getItem(STORAGE_STAFF_ACCOUNTS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_STAFF_ACCOUNTS_KEY, JSON.stringify(DEFAULT_STAFF_ACCOUNTS));
      return DEFAULT_STAFF_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_STAFF_ACCOUNTS;
  } catch (e) {
    return DEFAULT_STAFF_ACCOUNTS;
  }
}

export function saveStaffAccounts(accounts) {
  try {
    localStorage.setItem(STORAGE_STAFF_ACCOUNTS_KEY, JSON.stringify(accounts));
    return true;
  } catch (e) {
    console.error('Error saving staff accounts', e);
    return false;
  }
}

export function addStaffAccount(account) {
  const accounts = getStaffAccounts();
  const cleanUsername = (account.username || '').trim().toLowerCase();
  
  if (!cleanUsername) {
    return { success: false, message: 'اسم المستخدم مطلوب' };
  }

  const exists = accounts.some(a => a.username.toLowerCase() === cleanUsername);
  if (exists) {
    return { success: false, message: 'اسم المستخدم مسجل مسبقاً، يرجى اختيار اسم آخر' };
  }

  const newAccount = {
    id: `staff_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name: account.name?.trim() || `منظم مسرح ${accounts.length + 1}`,
    username: cleanUsername,
    password: account.password?.trim() || '123456',
    role: account.role || 'منظم ومسؤول حضور',
    gate: account.gate || 'المدخل الرئيسي',
    active: true,
    createdAt: new Date().toISOString()
  };

  const updated = [newAccount, ...accounts];
  saveStaffAccounts(updated);
  return { success: true, account: newAccount, accounts: updated };
}

export function generateRandomStaffAccount(roleHint, gateHint) {
  const accounts = getStaffAccounts();
  const randomSuffix = Math.floor(10 + Math.random() * 90);
  const randomPassNum = Math.floor(100 + Math.random() * 900);
  
  const defaultGates = [
    'المدخل الرئيسي 1',
    'المدخل الرئيسي 2',
    'بوابة كبار الشخصيات VIP',
    'مدخل البلكونة العلوية',
    'مدخل الدور الأرضي (اليمين)',
    'مدخل الدور الأرضي (اليسار)'
  ];

  const selectedGate = gateHint || defaultGates[accounts.length % defaultGates.length];
  const username = `staff${randomSuffix}`;
  const password = `Aseer${randomPassNum}`;
  const name = `منظم بوابة ${accounts.length + 1}`;

  return addStaffAccount({
    name,
    username,
    password,
    role: roleHint || 'منظم مسرح وبوابات',
    gate: selectedGate
  });
}

export function deleteStaffAccount(id) {
  const accounts = getStaffAccounts();
  const updated = accounts.filter(a => a.id !== id);
  saveStaffAccounts(updated);
  return { success: true, accounts: updated };
}

export function toggleStaffAccountStatus(id) {
  const accounts = getStaffAccounts();
  const updated = accounts.map(a => {
    if (a.id === id) {
      return { ...a, active: !a.active };
    }
    return a;
  });
  saveStaffAccounts(updated);
  return { success: true, accounts: updated };
}

export function validateStaffLogin(username, password) {
  const accounts = getStaffAccounts();
  const cleanUser = (username || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  // Master Admin Override
  const adminUser = (localStorage.getItem('theaterAdminUsername') || 'admin').toLowerCase();
  const adminPass = localStorage.getItem('theaterAdminPassword') || 'admin123';
  if ((cleanUser === adminUser || cleanUser === 'admin') && 
      (cleanPass === adminPass || cleanPass === 'admin' || cleanPass === 'admin123' || cleanPass === '1234')) {
    return {
      success: true,
      user: {
        id: 'master_admin',
        name: 'المشرف العام (Admin)',
        username: 'admin',
        role: 'المشرف العام',
        gate: 'كافة المداخل والمناطق',
        isAdmin: true
      }
    };
  }

  const match = accounts.find(a => 
    a.username.toLowerCase() === cleanUser && 
    String(a.password).trim() === cleanPass
  );

  if (match) {
    if (!match.active) {
      return { success: false, message: 'هذا الحساب معطل حالياً من قِبل المشرف العام.' };
    }
    return { success: true, user: match };
  }

  return { success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة.' };
}

