import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Armchair, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Send, 
  Share2, 
  Phone, 
  FileText, 
  Check, 
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  Printer,
  Sliders,
  Tv,
  Mic,
  Coffee,
  Camera,
  Layers
} from 'lucide-react';
import { DEFAULT_VENUES, submitHallBooking, getHallBookings } from '../utils/storage';

export default function VenueBookingModal({ isOpen, onClose, eventDetails, initialVenueId = null }) {
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'form' | 'success' | 'my-requests'
  const [selectedVenue, setSelectedVenue] = useState(DEFAULT_VENUES[0]);
  const [lastBooking, setLastBooking] = useState(null);
  const [myBookings, setMyBookings] = useState(() => getHallBookings());

  useEffect(() => {
    if (isOpen) {
      if (initialVenueId) {
        const found = DEFAULT_VENUES.find(v => v.id === initialVenueId);
        if (found) {
          setSelectedVenue(found);
          setActiveTab('form');
          return;
        }
      }
      setActiveTab('browse');
    }
  }, [isOpen, initialVenueId]);

  // Form State
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('morning'); // 'morning', 'evening', 'full'
  const [expectedAttendees, setExpectedAttendees] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedEquipments, setSelectedEquipments] = useState([
    'نظام الصوتيات والميكروفونات',
    'شاشات العرض LED'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const equipmentOptions = [
    { id: 'sound', label: 'نظام الصوتيات والميكروفونات الاحترافية', icon: Mic },
    { id: 'screens', label: 'شاشات العرض الرقمية وLED', icon: Tv },
    { id: 'stage', label: 'منصة التكريم والخطابة الرسمية', icon: Sparkles },
    { id: 'seats', label: 'ترقيم وتنظيم كراسي المسرح والـ QR', icon: Armchair },
    { id: 'media', label: 'التغطية الإعلامية والتوثيق الفوتوغرافي', icon: Camera },
    { id: 'hospitality', label: 'تجهيزات الضيافة وبهو كبار الشخصيات', icon: Coffee }
  ];

  const handleToggleEquipment = (label) => {
    if (selectedEquipments.includes(label)) {
      setSelectedEquipments(selectedEquipments.filter(item => item !== label));
    } else {
      setSelectedEquipments([...selectedEquipments, label]);
    }
  };

  const handleSelectVenueToBook = (venue) => {
    setSelectedVenue(venue);
    setActiveTab('form');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orgName.trim() || !contactName.trim() || !phone.trim() || !eventTitle.trim() || !bookingDate) {
      alert('يرجى تعبئة كافة الحقول المطلوبة.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const slotLabel = timeSlot === 'morning' ? 'الفترة الصباحية (08:00 ص - 12:30 م)' :
                         timeSlot === 'evening' ? 'الفترة المسائية (04:00 م - 09:00 م)' : 'يوم كامل (صباحي ومسائي)';

      const requestPayload = {
        venueId: selectedVenue.id,
        venueName: selectedVenue.name,
        venueLocation: selectedVenue.location,
        orgName: orgName.trim(),
        contactName: contactName.trim(),
        phone: phone.trim(),
        eventTitle: eventTitle.trim(),
        bookingDate,
        timeSlot: slotLabel,
        expectedAttendees: expectedAttendees || selectedVenue.capacity,
        equipments: selectedEquipments,
        notes: notes.trim()
      };

      const result = submitHallBooking(requestPayload);
      setIsSubmitting(false);

      if (result.success) {
        setLastBooking(result.booking);
        setMyBookings(getHallBookings());
        setActiveTab('success');
      }
    }, 400);
  };

  const handleSendWhatsApp = (booking) => {
    const b = booking || lastBooking;
    if (!b) return;

    const message = `السلام عليكم ورحمة الله وبركاته،
إدارة المسارح والقاعات - الإدارة العامة للتعليم بمنطقة عسير

*طلب حجز مسرح / قاعة جديد* 🏛️
🔖 *رقم الطلب:* ${b.id}
📍 *المقر المطلوب:* ${b.venueName}
🏢 *الجهة الطالبة:* ${b.orgName}
👤 *المسؤول للتنسيق:* ${b.contactName}
📱 *رقم الجوال:* ${b.phone}
🎯 *عنوان الفعالية:* ${b.eventTitle}
📅 *التاريخ المطلوب:* ${b.bookingDate}
⏰ *الفترة:* ${b.timeSlot}
👥 *العدد المتوقع:* ${b.expectedAttendees}
⚙️ *التجهيزات المطلوبة:* ${b.equipments?.join('، ') || 'عام'}
${b.notes ? `📝 *ملاحظات:* ${b.notes}\n` : ''}
نأمل التكرم بالاطلاع وتأكيد جاهزية القاعة واعتماد الحجز. شاكرين لكم حسن تعاونكم.`;

    const cleanPhone = (b.phone || '').replace(/[^0-9]/g, '');
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto" dir="rtl">
      <div className="relative w-full max-w-4xl my-auto bg-gradient-to-b from-[#0e1f3d] via-[#09152b] to-[#060e1d] border border-cyan-500/30 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col max-h-[92vh] overflow-hidden animate-fade-in">
        
        {/* ================================================================= */}
        {/* HEADER BAR */}
        {/* ================================================================= */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#060D1A]/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20 shrink-0">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>بوابة حجز القاعات والمسارح الرسمية</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-400/30 font-bold hidden sm:inline-block">
                  تعليم عسير
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                تقديم ومتابعة طلبات حجز المسارح والقاعات الكبرى للفعاليات والمناسبات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* NAVIGATION TABS */}
        {/* ================================================================= */}
        <div className="bg-white/5 px-4 py-2.5 border-b border-white/10 flex items-center gap-2 overflow-x-auto shrink-0 text-xs font-bold">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'browse'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>القاعات والمسارح المتاحة ({DEFAULT_VENUES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('form')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'form'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>تقديم طلب حجز جديد</span>
          </button>

          <button
            onClick={() => setActiveTab('my-requests')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'my-requests'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>الطلبات المسجلة ({myBookings.length})</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* TAB CONTENTS */}
        {/* ================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* 1. BROWSE VENUES */}
          {activeTab === 'browse' && (
            <div className="space-y-4">
              <div className="text-right">
                <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>اختر القاعة أو المسرح المناسب لفعاليتك للبدء بالحجز:</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  جميع المسارح والقاعات مجهزة بأحدث وسائل العرض الصوتي والمرئي الذكي وكراسي مريحة لضيوف الفعالية.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DEFAULT_VENUES.map(venue => (
                  <div 
                    key={venue.id}
                    className="p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all flex flex-col justify-between space-y-4 group shadow-xl"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20 inline-block mb-1">
                            {venue.type}
                          </span>
                          <h4 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                            {venue.name}
                          </h4>
                        </div>
                        <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-400/30 whitespace-nowrap">
                          {venue.capacity}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{venue.location}</span>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-white/10">
                        <span className="text-[10px] font-bold text-slate-400 block">المميزات والتجهيزات:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {venue.features.map((feat, idx) => (
                            <span 
                              key={idx}
                              className="text-[10px] bg-white/5 text-slate-300 border border-white/10 px-2 py-0.5 rounded-lg flex items-center gap-1"
                            >
                              <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                              <span>{feat}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectVenueToBook(venue)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                    >
                      <Calendar className="w-4 h-4 text-slate-950" />
                      <span>طلب حجز {venue.name}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. BOOKING FORM */}
          {activeTab === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Selected Venue Reminder */}
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-cyan-300 shrink-0" />
                  <div>
                    <span className="text-[11px] text-cyan-300 font-bold block">القاعة / المسرح المختار:</span>
                    <strong className="text-sm sm:text-base font-black text-white">{selectedVenue.name}</strong>
                    <span className="text-xs text-slate-400 mr-2 font-medium">({selectedVenue.capacity} • {selectedVenue.location})</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('browse')}
                  className="text-xs text-cyan-400 hover:underline font-bold self-end sm:self-center"
                >
                  تغيير القاعة ↺
                </button>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Organization Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-200">
                    الجهة الطالبة (إدارة / قسم / مدرسة / جهة) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: إدارة النشاط الطلابي / مدرسة الأندلس..."
                    value={orgName}
                    onChange={e => setOrgName(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition-all"
                  />
                </div>

                {/* Responsible Person */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-200">
                    اسم المسؤول للتنسيق والمتابعة <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أ. إبراهيم عسيري..."
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition-all"
                  />
                </div>

                {/* Contact Phone */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-200">
                    رقم الجوال للتواصل وتأكيد الحجز <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="05xxxxxxxx"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition-all font-mono"
                  />
                </div>

                {/* Event Title */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-200">
                    عنوان الفعالية أو المناسبة <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: الحفل الختامي للأنشطة الطلابية 2026..."
                    value={eventTitle}
                    onChange={e => setEventTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition-all"
                  />
                </div>

                {/* Booking Date */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-200">
                    تاريخ الفعالية المطلوب <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white outline-none transition-all"
                  />
                </div>

                {/* Time Slot */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-200">
                    فترة الحجز المطلوبة <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={e => setTimeSlot(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white outline-none transition-all"
                  >
                    <option value="morning" className="bg-[#09152b]">الفترة الصباحية (08:00 ص - 12:30 م)</option>
                    <option value="evening" className="bg-[#09152b]">الفترة المسائية (04:00 م - 09:00 م)</option>
                    <option value="full" className="bg-[#09152b]">يوم كامل (صباحي ومسائي)</option>
                  </select>
                </div>

                {/* Expected Attendees */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-200">
                    العدد التقديري للحضور (الحد الأقصى المتاح للقاعة: {selectedVenue.capacity})
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: 300 شخص"
                    value={expectedAttendees}
                    onChange={e => setExpectedAttendees(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Equipment Requirements */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="block text-xs font-black text-cyan-300">
                  التجهيزات والخدمات الفنية المطلوبة:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {equipmentOptions.map(item => {
                    const isChecked = selectedEquipments.includes(item.label);
                    const IconComp = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleToggleEquipment(item.label)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-2.5 ${
                          isChecked 
                            ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md' 
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold ${isChecked ? 'bg-cyan-400 text-slate-950' : 'border border-white/30'}`}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <IconComp className={`w-4 h-4 ${isChecked ? 'text-cyan-300' : 'text-slate-400'}`} />
                        <span className="text-xs font-bold">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-200">
                  ملاحظات أو متطلبات إضافية
                </label>
                <textarea
                  rows="2"
                  placeholder="أي تفاصيل خاصة بتنظيم المسرح أو جدول الحفل..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:brightness-110 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>{isSubmitting ? 'جاري تسجيل الطلب...' : 'إرسال طلب حجز القاعة'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('browse')}
                  className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}

          {/* 3. SUCCESS VOUCHER */}
          {activeTab === 'success' && lastBooking && (
            <div className="space-y-5 animate-fade-in text-center py-2">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-300 border-2 border-emerald-400/50 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9 text-emerald-400" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                  تم تسجيل طلب الحجز بنجاح
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  طلب حجز {lastBooking.venueName}
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                  تم حفظ طلبكم برقم مرجعي رسمي في النظام. يمكنك الآن إرسال تفاصيل الطلب لإدارة المسارح عبر الواتساب للاعتماد السريع.
                </p>
              </div>

              {/* Voucher Box */}
              <div className="max-w-md mx-auto p-5 rounded-3xl bg-gradient-to-b from-[#0b1a33] to-[#081224] border border-cyan-500/30 text-right space-y-3 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-xs text-slate-400 font-bold">الرقم المرجعي للطلب:</span>
                  <span className="text-sm font-black text-cyan-300 font-mono tracking-wider">{lastBooking.id}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">الجهة الطالبة:</span>
                  <span className="font-black text-white">{lastBooking.orgName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">المسؤول:</span>
                  <span className="font-bold text-slate-200">{lastBooking.contactName} ({lastBooking.phone})</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">المقر المطلوب:</span>
                  <span className="font-black text-amber-300">{lastBooking.venueName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">تاريخ الفعالية:</span>
                  <span className="font-black text-white">{lastBooking.bookingDate}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-white/10 pt-2.5">
                  <span className="text-slate-400 font-bold">الفترة الزمنية:</span>
                  <span className="font-bold text-cyan-300">{lastBooking.timeSlot}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => handleSendWhatsApp(lastBooking)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Share2 className="w-4 h-4 text-slate-950" />
                  <span>إرسال تفاصيل الطلب عبر الواتساب لإدارة المسارح 📲</span>
                </button>

                <button
                  onClick={() => setActiveTab('my-requests')}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
                >
                  استعراض كافة طلباتي
                </button>
              </div>
            </div>
          )}

          {/* 4. MY REQUESTS */}
          {activeTab === 'my-requests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">الطلبات المسجلة على النظام</h3>
                  <p className="text-xs text-slate-400">سجل طلبات حجز القاعات والمسارح ومتابعة حالتها</p>
                </div>
                <button
                  onClick={() => setActiveTab('form')}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span>+ طلب جديد</span>
                </button>
              </div>

              {myBookings.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white/5 border border-white/10 space-y-2">
                  <Building2 className="w-10 h-10 text-slate-500 mx-auto" />
                  <p className="text-xs text-slate-400 font-bold">لا توجد طلبات حجز مسجلة حتى الآن.</p>
                  <button
                    onClick={() => setActiveTab('browse')}
                    className="text-xs text-cyan-400 font-bold hover:underline mt-2 inline-block"
                  >
                    استعراض القاعات وتقديم طلب ➔
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myBookings.map((req, idx) => (
                    <div 
                      key={req.id || idx}
                      className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-black text-white">{req.eventTitle}</strong>
                          <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-400/30">
                            {req.id}
                          </span>
                          <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                            قيد المراجعة
                          </span>
                        </div>
                        <div className="text-slate-300 flex items-center gap-2 flex-wrap">
                          <span className="text-cyan-300 font-bold">🏛️ {req.venueName}</span>
                          <span>•</span>
                          <span>🏢 {req.orgName}</span>
                          <span>•</span>
                          <span>📅 {req.bookingDate}</span>
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          المسؤول: {req.contactName} ({req.phone}) • {req.timeSlot}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 shrink-0">
                        <button
                          onClick={() => handleSendWhatsApp(req)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 font-bold text-xs transition-all flex items-center gap-1.5"
                        >
                          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>واتساب</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
