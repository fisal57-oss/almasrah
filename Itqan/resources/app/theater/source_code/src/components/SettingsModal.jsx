import React, { useState } from 'react';
import { 
  Settings, 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  Save, 
  RotateCcw, 
  Database, 
  Download, 
  Upload, 
  Check, 
  Sparkles,
  Image,
  Trash2,
  Lock,
  KeyRound,
  ShieldCheck,
  Users,
  UserPlus,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  QrCode,
  Share2,
  CheckCircle2,
  X,
  Plus,
  Printer
} from 'lucide-react';
import { 
  getEventDetails, 
  saveEventDetails, 
  exportDatabaseBackup, 
  importDatabaseBackup,
  getStaffAccounts,
  saveStaffAccounts,
  addStaffAccount,
  generateRandomStaffAccount,
  deleteStaffAccount,
  toggleStaffAccountStatus
} from '../utils/storage';
import OrganizerBadgeModal from './OrganizerBadgeModal';
import BatchOrganizerBadgesPrintModal from './BatchOrganizerBadgesPrintModal';

export default function SettingsModal({ 
  onEventUpdated, 
  onResetAllSeats, 
  onSeedDemoData,
  onImportBackup 
}) {
  const [eventData, setEventData] = useState(getEventDetails());
  const [isSaved, setIsSaved] = useState(false);
  
  // Admin Credentials settings
  const [adminUsername, setAdminUsername] = useState(localStorage.getItem('theaterAdminUsername') || 'admin');
  const [adminPassword, setAdminPassword] = useState(localStorage.getItem('theaterAdminPassword') || 'admin123');
  const [credentialsSaved, setCredentialsSaved] = useState(false);

  // Staff Accounts management state
  const [staffAccounts, setStaffAccounts] = useState(getStaffAccounts());
  const [showNewStaffForm, setShowNewStaffForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    username: '',
    password: '',
    role: 'منظم بوابة الدخول',
    gate: 'المدخل الرئيسي 1'
  });
  const [staffNotice, setStaffNotice] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copiedStaffId, setCopiedStaffId] = useState(null);
  const [copiedAllStaff, setCopiedAllStaff] = useState(false);
  const [selectedStaffForBadge, setSelectedStaffForBadge] = useState(null);
  const [showBatchOrganizerBadgesModal, setShowBatchOrganizerBadgesModal] = useState(false);

  // Logo upload from local device (converts to base64 DataURL for offline storage)
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح (PNG, JPG, SVG, WebP)');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert('حجم الصورة كبير جداً، يفضل اختيار صورة أقل من 3 ميغابايت للحفاظ على كفاءة المتصفح');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target.result;
      setEventData(prev => ({
        ...prev,
        logoUrl: base64Url
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setEventData(prev => ({
      ...prev,
      logoUrl: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEventDetails(eventData);
    onEventUpdated(eventData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    if (!adminUsername.trim()) {
      alert('يرجى إدخال اسم المستخدم');
      return;
    }
    if (!adminPassword || adminPassword.length < 3) {
      alert('يرجى إدخال كلمة مرور مكونة من 3 أحرف/أرقام على الأقل');
      return;
    }
    localStorage.setItem('theaterAdminUsername', adminUsername.trim());
    localStorage.setItem('theaterAdminPassword', adminPassword);
    setCredentialsSaved(true);
    setTimeout(() => setCredentialsSaved(false), 3000);
  };

  // Export database JSON
  const handleExportJSON = () => {
    exportDatabaseBackup();
  };

  // Staff Account Handlers
  const handleAutoGenerateStaff = () => {
    const gates = ['المدخل الرئيسي 1', 'المدخل الجنوبي 2', 'بوابة كبار الشخصيات VIP', 'مدخل المنصة والتشريفات', 'بوابة المدرج الغربي'];
    const randomGate = gates[Math.floor(Math.random() * gates.length)];
    const newAcc = generateRandomStaffAccount('منظم بوابة الدخول', randomGate);
    setStaffAccounts(getStaffAccounts());
    setStaffNotice(`✨ تم توليد حساب منظم جديد بنجاح: (${newAcc.name}) بكلمة مرور: ${newAcc.password}`);
    setTimeout(() => setStaffNotice(''), 5000);
  };

  const handleCreateStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.username.trim() || !newStaff.password.trim()) {
      alert('يرجى ملء كافة الحقول (الاسم، اسم المستخدم، كلمة المرور)');
      return;
    }
    const result = addStaffAccount(newStaff);
    if (result.success) {
      setStaffAccounts(getStaffAccounts());
      setNewStaff({
        name: '',
        username: '',
        password: '',
        role: 'منظم بوابة الدخول',
        gate: 'المدخل الرئيسي 1'
      });
      setShowNewStaffForm(false);
      setStaffNotice(`تمت إضافة المنظم (${result.account.name}) بنجاح!`);
      setTimeout(() => setStaffNotice(''), 4000);
    } else {
      alert(result.error);
    }
  };

  const handleDeleteStaffAccount = (id, name) => {
    if (confirm(`هل أنت متأكد من حذف حساب المنظم (${name})؟ لن يتمكن من تسجيل الدخول بعد الآن.`)) {
      deleteStaffAccount(id);
      setStaffAccounts(getStaffAccounts());
      setStaffNotice(`تم حذف حساب (${name})`);
      setTimeout(() => setStaffNotice(''), 3000);
    }
  };

  const handleToggleStaff = (id) => {
    toggleStaffAccountStatus(id);
    setStaffAccounts(getStaffAccounts());
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyStaffLogin = (acc) => {
    const portalUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + 'staff.html';
    const text = `🎫 *بيانات تسجيل دخول المنظم - ${eventData.name || 'حفل المسرح'}*\n` +
      `👤 الاسم: ${acc.name}\n` +
      `🚪 البوابة/الموقع: ${acc.gate}\n` +
      `🔑 اسم المستخدم: ${acc.username}\n` +
      `🔒 كلمة المرور: ${acc.password}\n` +
      `🌐 رابط بوابة المنظمين:\n${portalUrl}`;

    navigator.clipboard.writeText(text);
    setCopiedStaffId(acc.id);
    setStaffNotice(`تم نسخ بيانات حساب (${acc.name}) بنجاح للمشاركة عبر الواتساب!`);
    setTimeout(() => {
      setCopiedStaffId(null);
      setStaffNotice('');
    }, 3500);
  };

  const handleCopyAllStaffLogins = () => {
    const portalUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + 'staff.html';
    let text = `📋 *قائمة حسابات المنظمين وموظفي البوابات - ${eventData.name || 'حفل المسرح'}*\n` +
      `🌐 الرابط المباشر للبوابة: ${portalUrl}\n\n`;

    staffAccounts.forEach((acc, i) => {
      text += `${i + 1}. *${acc.name}* (${acc.gate})\n` +
        `   • اسم المستخدم: ${acc.username}\n` +
        `   • كلمة المرور: ${acc.password}\n` +
        `   • الحالة: ${acc.active ? 'مفعل ✅' : 'معطل ❌'}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedAllStaff(true);
    setStaffNotice('تم نسخ قائمة كافة الحسابات بنجاح جاهزة للإرسال والمشاركة!');
    setTimeout(() => {
      setCopiedAllStaff(false);
      setStaffNotice('');
    }, 4000);
  };

  // Import JSON backup

  // Import JSON backup
  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importDatabaseBackup(event.target.result);
      if (res.success) {
        onImportBackup?.();
        alert(`تمت استعادة النسخة الاحتياطية بنجاح (${res.count} مقعد)!`);
      } else {
        alert('حدث خطأ أثناء استيراد النسخة الاحتياطية: ' + res.error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6" dir="rtl">
      
      {/* Event Info Form */}
      <form onSubmit={handleSubmit} className="bg-[#0b162b] p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white">إعدادات وبيانات الفعالية</h2>
              <p className="text-xs text-slate-400">تعديل الترويسة والمعلومات الظاهرة على بطاقات الدعوة وصفحة الجوال</p>
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-l from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all flex items-center gap-2"
          >
            {isSaved ? <Check className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4 text-slate-950" />}
            <span>{isSaved ? 'تم الحفظ!' : 'حفظ التعديلات'}</span>
          </button>
        </div>

        <div className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">اسم الفعالية / المناسبة</label>
            <input
              type="text"
              value={eventData.title || ''}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            />
          </div>

          {/* Logo Upload & Preview Section */}
          <div className="bg-white/5 border border-cyan-500/20 rounded-2xl p-4 space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-cyan-400" />
                <label className="text-xs font-bold text-slate-200">شعار الفعالية / الجهة المنظمة</label>
                <span className="text-[10px] text-cyan-300 bg-cyan-500/10 border border-cyan-400/20 px-2 py-0.5 rounded-full">
                  يظهر في التذاكر والدعوات وبطاقات المقاعد
                </span>
              </div>
              {eventData.logoUrl && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="text-[11px] text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>إزالة الشعار (استعادة الافتراضي)</span>
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Preview Box */}
              <div className="w-full sm:w-44 h-24 rounded-xl border border-white/15 bg-slate-900/80 flex items-center justify-center p-2 relative overflow-hidden shrink-0 shadow-md">
                {eventData.logoUrl ? (
                  <img
                    src={eventData.logoUrl}
                    alt="معاينة الشعار"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-2">
                    <span className="text-[10px] text-cyan-400 font-bold block mb-0.5">الشعار الافتراضي</span>
                    <span className="text-[9px] text-slate-400">وزارة التعليم</span>
                  </div>
                )}
              </div>

              {/* Upload controls & URL input */}
              <div className="flex-1 w-full space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex-1 min-w-[160px] cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <div className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-l from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-cyan-400/40 text-cyan-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm">
                      <Upload className="w-4 h-4 text-cyan-400" />
                      <span>اختيار ورفع صورة شعار من جهازك</span>
                    </div>
                  </label>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="أو الصق رابط صورة الشعار مباشرة (https://...)..."
                    value={eventData.logoUrl || ''}
                    onChange={(e) => setEventData({ ...eventData, logoUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 rounded-xl px-3 py-2 text-[11px] text-white outline-none"
                    dir="ltr"
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  يدعم صيغ الصور (PNG شفافة، JPG، SVG، WebP). يتم حفظ الشعار تلقائياً ليظهر بدقة متناهية على جميع التذاكر.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">الجهة المنظمة / الترويسة</label>
              <input
                type="text"
                value={eventData.organizer || ''}
                onChange={(e) => setEventData({ ...eventData, organizer: e.target.value })}
                className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">المكان / القاعة</label>
              <input
                type="text"
                value={eventData.venue || ''}
                onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
                className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">التاريخ</label>
              <input
                type="text"
                value={eventData.date || ''}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">الموعد والتوقيت</label>
              <input
                type="text"
                value={eventData.time || ''}
                onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">ملاحظات / تعليمات التذكرة</label>
            <input
              type="text"
              value={eventData.notes || ''}
              onChange={(e) => setEventData({ ...eventData, notes: e.target.value })}
              className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            />
          </div>

        </div>
      </form>

      {/* Admin Security Credentials Settings */}
      <form onSubmit={handleSaveCredentials} className="bg-[#0b162b] p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">بيانات تسجيل دخول الإدارة (Username & Password)</h3>
              <p className="text-xs text-slate-400">تعديل اسم المستخدم وكلمة المرور الخاصة بقفل ودخول لوحة تحكم الإدارة</p>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5"
          >
            {credentialsSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{credentialsSaved ? 'تم الحفظ!' : 'تحديث البيانات'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">اسم المستخدم (Username)</label>
            <input
              type="text"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:bg-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">كلمة المرور (Password)</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:bg-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
              placeholder="admin123"
            />
          </div>
        </div>
      </form>

      {/* Staff & Organizers Account Management */}
      <div className="bg-[#0b162b] p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white">إدارة وتوليد حسابات المنظمين وموظفي البوابات</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  {staffAccounts.length} حساب
                </span>
              </div>
              <p className="text-xs text-slate-400">توليد حسابات للمنظمين لتسجيل الدخول وفحص تذاكر الحضور والـ QR Code</p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleAutoGenerateStaff}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
              title="توليد حساب عشوائي بنقرة واحدة"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>⚡ توليد منظم سريع</span>
            </button>

            <button
              type="button"
              onClick={() => setShowNewStaffForm(!showNewStaffForm)}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all flex items-center gap-1.5 border border-white/10"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showNewStaffForm ? 'إلغاء' : 'إضافة يدوي'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyAllStaffLogins}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-300 font-bold text-xs transition-all flex items-center gap-1.5 border border-emerald-500/20"
              title="نسخ جميع الحسابات بنص منسق للمشاركة عبر الواتساب"
            >
              {copiedAllStaff ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedAllStaff ? 'تم نسخ الكل!' : 'نسخ قائمة الحسابات'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowBatchOrganizerBadgesModal(true)}
              className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs transition-all flex items-center gap-1.5 border border-emerald-400/40 shadow-sm"
              title="طباعة بطاقات المنظمين بمقاس A4 جاهزة للقص والتعليق"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-300" />
              <span>🪪 طباعة البطاقات (A4)</span>
            </button>

            <a
              href="staff.html"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 font-bold text-xs transition-all flex items-center gap-1.5 border border-cyan-400/30"
              title="فتح بوابة الموظف في تبويب جديد"
            >
              <span>بوابة المنظم</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Notice Banner */}
        {staffNotice && (
          <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl flex items-center justify-between text-emerald-200 text-xs font-bold animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{staffNotice}</span>
            </div>
            <button onClick={() => setStaffNotice('')} className="text-emerald-400/70 hover:text-emerald-200">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Inline Form for Adding New Staff */}
        {showNewStaffForm && (
          <form onSubmit={handleCreateStaff} className="p-4 bg-white/5 border border-emerald-500/30 rounded-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 pb-2 border-b border-white/5">
              <UserPlus className="w-4 h-4" />
              <span>إنشاء حساب منظم جديد يدوياً</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">اسم المنظم / الموظف</label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="مثال: فيصل القحطاني"
                  className="w-full bg-white/5 border border-white/15 focus:border-emerald-400 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">البوابة / الموقع المخصص</label>
                <input
                  type="text"
                  value={newStaff.gate}
                  onChange={(e) => setNewStaff({ ...newStaff, gate: e.target.value })}
                  placeholder="مثال: المدخل الرئيسي 1"
                  className="w-full bg-white/5 border border-white/15 focus:border-emerald-400 rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">اسم المستخدم (بالإنجليزي)</label>
                <input
                  type="text"
                  value={newStaff.username}
                  onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                  placeholder="مثال: gate_north"
                  className="w-full bg-white/5 border border-white/15 focus:border-emerald-400 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">كلمة المرور</label>
                <input
                  type="text"
                  value={newStaff.password}
                  onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                  placeholder="مثال: pass1234"
                  className="w-full bg-white/5 border border-white/15 focus:border-emerald-400 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewStaffForm(false)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>حفظ الحساب</span>
              </button>
            </div>
          </form>
        )}

        {/* Staff Accounts List */}
        {staffAccounts.length === 0 ? (
          <div className="text-center py-8 px-4 bg-white/5 rounded-2xl border border-white/10">
            <Users className="w-10 h-10 text-slate-500 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-300">لا توجد حسابات منظمين حالياً</p>
            <p className="text-[11px] text-slate-500 mt-1 mb-3">يمكنك توليد حساب سريع تلقائياً أو إضافة حساب يدوي للمنظمين</p>
            <button
              onClick={handleAutoGenerateStaff}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>توليد حساب منظم الآن</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {staffAccounts.map((acc) => {
              const isPasswordVisible = !!visiblePasswords[acc.id];
              const isCopied = copiedStaffId === acc.id;

              return (
                <div 
                  key={acc.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    acc.active 
                      ? 'bg-white/[0.04] border-white/10 hover:border-emerald-500/30' 
                      : 'bg-rose-950/10 border-rose-500/20 opacity-60'
                  }`}
                >
                  {/* Staff Info */}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      acc.active ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-400/30' : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}>
                      {acc.name ? acc.name.charAt(0) : 'م'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white">{acc.name}</span>
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300 font-bold">
                          {acc.gate}
                        </span>
                        {!acc.active && (
                          <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[9px] font-bold">
                            معطل
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>{acc.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Credentials & Actions */}
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                    {/* Username Pill */}
                    <div className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5 font-mono text-xs text-slate-200">
                      <span className="text-slate-500 text-[10px]">User:</span>
                      <span className="font-bold">{acc.username}</span>
                    </div>

                    {/* Password Pill with Eye */}
                    <div className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5 font-mono text-xs text-slate-200">
                      <span className="text-slate-500 text-[10px]">Pass:</span>
                      <span className="font-bold">
                        {isPasswordVisible ? acc.password : '••••••••'}
                      </span>
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(acc.id)}
                        className="text-slate-400 hover:text-white p-0.5"
                        title={isPasswordVisible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                      >
                        {isPasswordVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </div>

                    {/* View / Print Organizer Badge */}
                    <button
                      type="button"
                      onClick={() => setSelectedStaffForBadge(acc)}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30"
                      title="عرض وطباعة بطاقة هذا المنظم بهوية الدعوة الرسمية"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span className="text-[11px]">البطاقة</span>
                    </button>

                    {/* Copy Credential for WhatsApp */}
                    <button
                      type="button"
                      onClick={() => handleCopyStaffLogin(acc)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                        isCopied 
                          ? 'bg-emerald-500 text-slate-950' 
                          : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30'
                      }`}
                      title="نسخ بيانات الدخول لمشاركتها مع المنظم عبر الواتساب"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[11px]">{isCopied ? 'تم النسخ' : 'نسخ'}</span>
                    </button>

                    {/* Active/Inactive Toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleStaff(acc.id)}
                      className={`px-2 py-1.5 rounded-xl text-[10px] font-bold border transition-all ${
                        acc.active 
                          ? 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10' 
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      }`}
                      title={acc.active ? 'تعطيل الحساب مؤقتاً' : 'تفعيل الحساب'}
                    >
                      {acc.active ? 'تعطيل' : 'تفعيل'}
                    </button>

                    {/* Delete Account */}
                    <button
                      type="button"
                      onClick={() => handleDeleteStaffAccount(acc.id, acc.name)}
                      className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                      title="حذف الحساب"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
          <span>💡 <strong>ملاحظة:</strong> حساب الإدارة الرئيسي (admin) يمكنه دائماً تسجيل الدخول في بوابة الموظف للإشراف والمتابعة.</span>
          <span className="font-mono text-emerald-400 font-bold">Gate Mode Active</span>
        </div>
      </div>

      {/* Data Management & Backup */}
      <div className="bg-[#0b162b] p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-white/5 text-cyan-300 border border-white/10 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">إدارة بيانات المسرح والنسخ الاحتياطي</h3>
            <p className="text-xs text-slate-400">تفريغ الحجوزات أو تصدير واستيراد نسخة احتياطية من قاعدة البيانات</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          <button
            onClick={onSeedDemoData}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10 text-xs font-bold transition-all text-right flex items-center justify-between"
          >
            <div>
              <span className="block font-bold">توليد بيانات تجريبية (Demo Data)</span>
              <span className="text-[10px] text-slate-400">حجز بعض الكراسي عشوائياً لمعاينة النظام</span>
            </div>
            <Sparkles className="w-4 h-4 shrink-0" />
          </button>

          <button
            onClick={handleExportJSON}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold transition-all text-right flex items-center justify-between"
          >
            <div>
              <span className="block font-bold">تصدير نسخة احتياطية JSON</span>
              <span className="text-[10px] text-slate-400">حفظ قاعدة البيانات لملف خارجي</span>
            </div>
            <Download className="w-4 h-4 shrink-0" />
          </button>

          <label className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold transition-all text-right flex items-center justify-between cursor-pointer">
            <div>
              <span className="block font-bold">استيراد نسخة احتياطية</span>
              <span className="text-[10px] text-slate-400">رفع ملف JSON سابق</span>
            </div>
            <Upload className="w-4 h-4 shrink-0" />
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={() => {
              if (confirm('تنبيه: هل أنت متأكد من إعادة تفريغ جميع الحجوزات وإرجاع المسرح كاملاً إلى متاح؟')) {
                onResetAllSeats();
              }
            }}
            className="p-3.5 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 border border-rose-400/30 text-xs font-bold transition-all text-right flex items-center justify-between"
          >
            <div>
              <span className="block font-bold">إعادة تهيئة الكراسي كاملاً</span>
              <span className="text-[10px] text-rose-300">مسح كافة الحجوزات وإرجاع الكراسي متاحة</span>
            </div>
            <RotateCcw className="w-4 h-4 shrink-0" />
          </button>

        </div>
      </div>

      {/* Single Organizer Badge Modal */}
      {selectedStaffForBadge && (
        <OrganizerBadgeModal
          staff={selectedStaffForBadge}
          eventDetails={eventData}
          onClose={() => setSelectedStaffForBadge(null)}
        />
      )}

      {/* Batch Organizer Badges Print Modal (A4) */}
      {showBatchOrganizerBadgesModal && (
        <BatchOrganizerBadgesPrintModal
          staffAccounts={staffAccounts}
          eventDetails={eventData}
          onClose={() => setShowBatchOrganizerBadgesModal(false)}
        />
      )}

    </div>
  );
}
