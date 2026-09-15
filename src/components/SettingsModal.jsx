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
  ShieldCheck
} from 'lucide-react';
import { getEventDetails, saveEventDetails, exportDatabaseBackup, importDatabaseBackup } from '../utils/storage';

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

    </div>
  );
}
