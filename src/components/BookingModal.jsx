import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Phone, 
  Tag, 
  FileText, 
  Sparkles, 
  Ticket, 
  Trash2, 
  Armchair,
  CheckCircle,
  QrCode,
  Mail,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatArabicSeatCode } from '../utils/storage';

export default function BookingModal({ 
  seat, 
  onClose, 
  onConfirmBooking, 
  onCancelBooking,
  onDeleteSeat,
  onOpenCard,
  onOpenInvitation,
  onOpenSeatCard
}) {
  const isBooked = seat.status !== 'available';

  const [guestName, setGuestName] = useState(seat.guest?.name || '');
  const [jobTitle, setJobTitle] = useState(seat.guest?.jobTitle || '');
  const [guestPhone, setGuestPhone] = useState(seat.guest?.phone || '');
  const [category, setCategory] = useState(seat.guest?.category || 'كبار الشخصيات VIP');
  const [notes, setNotes] = useState(seat.guest?.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert('يرجى إدخال اسم المدعو');
      return;
    }

    setIsSubmitting(true);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti error', err);
    }

    setTimeout(() => {
      onConfirmBooking(seat.id, {
        name: guestName.trim(),
        jobTitle: jobTitle.trim(),
        phone: guestPhone.trim(),
        category,
        notes: notes.trim()
      });
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-indigo-950/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      
      {/* Modal Card Container */}
      <div className="relative w-full max-w-lg glass-panel-luxury rounded-3xl p-6 sm:p-8 shadow-2xl border border-cyan-500/30 overflow-hidden">
        
        {/* Decorative Cyan Header Bar */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-[#00d2ff] via-[#334b85] to-[#7952b3]"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-white/80 hover:text-white bg-white/10 p-2 rounded-full border border-white/20 transition-all hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Seat Info Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00d2ff] to-[#7952b3] p-0.5 shadow-lg shadow-cyan-500/20 shrink-0">
            <div className="w-full h-full bg-white/20 backdrop-blur-md rounded-[14px] flex items-center justify-center">
              <Armchair className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">
                {formatArabicSeatCode(seat)}
              </h2>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                seat.status === 'available' 
                  ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40' 
                  : seat.status === 'reserved'
                  ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40'
                  : 'bg-purple-500/20 text-purple-200 border-purple-400/40'
              }`}>
                {seat.status === 'available' ? 'متاح للحجز' : seat.status === 'reserved' ? 'محجوز' : 'تم الدخول'}
              </span>
            </div>
            <p className="text-xs text-white/70 mt-1">
              القطاع: <strong className="text-cyan-300">{seat.sector}</strong> • الكود الداخلي: <code className="text-white/90 font-mono">{seat.id}</code>
            </p>
          </div>
        </div>

        {/* If Already Booked -> Options view */}
        {isBooked ? (
          <div className="space-y-5">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-white/15">
                <span className="text-white/70">اسم المدعو:</span>
                <span className="font-bold text-cyan-300 text-sm">{seat.guest.name}</span>
              </div>
              {seat.guest.jobTitle && (
                <div className="flex justify-between items-center py-1 border-b border-white/15">
                  <span className="text-white/70">المنصب / الصفة:</span>
                  <span className="text-amber-300 font-bold">{seat.guest.jobTitle}</span>
                </div>
              )}
              {seat.guest.phone && (
                <div className="flex justify-between items-center py-1 border-b border-white/15">
                  <span className="text-white/70">رقم الجوال:</span>
                  <span className="font-mono text-white">{seat.guest.phone}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-1 border-b border-white/15">
                <span className="text-white/70">الفئة:</span>
                <span className="text-cyan-300 font-semibold">{seat.guest.category}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-white/70">كود التذكرة:</span>
                <span className="font-mono text-xs text-cyan-300">{seat.guest.token}</span>
              </div>
            </div>

            {/* Action buttons for booked seat */}
            <div className="flex flex-col gap-2.5">
              {onOpenInvitation && (
                <button
                  onClick={() => onOpenInvitation(seat)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-slate-950" />
                  <span>عرض وتصدير الدعوة الإلكترونية الفاخرة</span>
                </button>
              )}

              {onOpenSeatCard && (
                <button
                  onClick={() => onOpenSeatCard(seat)}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Armchair className="w-4 h-4 text-cyan-300" />
                  <span>عرض وطباعة بطاقة المقعد للمسرح</span>
                </button>
              )}

              <button
                onClick={() => onOpenCard(seat)}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4 text-cyan-300" />
                <span>عرض تذكرة الحضور والباركود</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`هل أنت تأكد من إلغاء حجز الكرسي (${formatArabicSeatCode(seat)})؟`)) {
                    onCancelBooking(seat.id);
                  }
                }}
                className="w-full py-2 px-4 rounded-xl bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 mt-1"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>إلغاء هذا الحجز وإتاحة الكرسي</span>
              </button>
            </div>
          </div>
        ) : (
          /* Form for new booking */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Guest Name */}
            <div>
              <label className="block text-xs font-bold text-white/90 mb-1.5 flex items-center gap-1.5">
                <UserPlus className="w-4 h-4 text-cyan-300" />
                <span>اسم المدعو / الضيف <span className="text-rose-400">*</span></span>
              </label>
              <input
                type="text"
                required
                placeholder="أدخل اسم الشخص المدعو (مثال: د. عبد العزيز بن فهد)"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 outline-none transition-all"
              />
            </div>

            {/* Job Title / Position */}
            <div>
              <label className="block text-xs font-bold text-white/90 mb-1.5 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-cyan-300" />
                <span>المنصب / المسمى الوظيفي (اختياري)</span>
              </label>
              <input
                type="text"
                placeholder="مثال: مدير عام التعليم / مستشار / وكيل الوزارة"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/50 outline-none transition-all"
              />
            </div>

            {/* Mobile Phone */}
            <div>
              <label className="block text-xs font-bold text-white/90 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-cyan-300" />
                <span>رقم الجوال (اختياري - لإرسال الدعوة)</span>
              </label>
              <input
                type="tel"
                placeholder="05xxxxxxxx"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-white/50 outline-none transition-all"
              />
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold text-white/90 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-cyan-300" />
                <span>تصنيف الضيف</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-all"
              >
                <option value="كبار الشخصيات VIP" className="bg-indigo-950 text-white">كبار الشخصيات VIP</option>
                <option value="ضيف شرف" className="bg-indigo-950 text-white">ضيف شرف</option>
                <option value="إعلام وصحافة" className="bg-indigo-950 text-white">إعلام وصحافة</option>
                <option value="ضيوف مميزون" className="bg-indigo-950 text-white">ضيوف مميزون</option>
                <option value="عام" className="bg-indigo-950 text-white">حضور عام</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-l from-[#00d2ff] via-[#334b85] to-[#7952b3] text-white font-extrabold text-sm shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-white" />
                <span>{isSubmitting ? 'جاري الحجز...' : 'تأكيد الحجز وإنشاء البطاقة مباشرة'}</span>
              </button>
            </div>

            {/* Delete Seat Button if seat is available */}
            {onDeleteSeat && (
              <div className="pt-3 border-t border-white/10 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`هل أنت متأكد من رغبتك في إزالة وحذف المقعد (${formatArabicSeatCode(seat)}) نهائياً من المسرح؟`)) {
                      onDeleteSeat(seat.id);
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4 text-rose-400" />
                  <span>إزالة هذا المقعد نهائياً من المخطط</span>
                </button>
              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
}

