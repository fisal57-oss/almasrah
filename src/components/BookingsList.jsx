import React, { useState, useRef } from 'react';
import { 
  Search, 
  Download, 
  Upload,
  QrCode, 
  Trash2, 
  CheckCircle2, 
  Share2, 
  Armchair, 
  User, 
  Phone, 
  Calendar,
  Printer,
  Mail,
  Ticket,
  Crown,
  Filter,
  FileSpreadsheet,
  Layers,
  Sparkles,
  AlertCircle,
  Check,
  Eye,
  FileText
} from 'lucide-react';
import { formatArabicSeatCode, saveSeats } from '../utils/storage';
import { exportSeatsToExcel, exportSeatsToCSV, parseGuestFile, autoAssignGuestsToSeats } from '../utils/excelUtils';

export default function BookingsList({ 
  seats, 
  onOpenCard, 
  onOpenInvitation,
  onOpenSeatCard,
  onCancelBooking, 
  onCheckIn, 
  eventDetails,
  onOpenPrintAllTickets,
  onOpenBatchSeatCards,
  onSeatsUpdated
}) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, reserved, checked_in, vip
  const [filterLevel, setFilterLevel] = useState('all');   // all, G, B
  const [filterSector, setFilterSector] = useState('all'); // all, or sector name

  // Excel Import state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importedGuests, setImportedGuests] = useState([]);
  const [importFileName, setImportFileName] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const fileInputRef = useRef(null);

  const bookedSeats = seats.filter((s) => s.status !== 'available' && s.guest);

  const filtered = bookedSeats.filter((seat) => {
    // Status Filter
    if (filterStatus === 'reserved' && seat.status !== 'reserved') return false;
    if (filterStatus === 'checked_in' && seat.status !== 'checked_in') return false;
    if (filterStatus === 'vip' && !seat.isVip) return false;

    // Level Filter
    if (filterLevel === 'G' && seat.level === 'B') return false;
    if (filterLevel === 'B' && seat.level !== 'B') return false;

    // Sector Filter
    if (filterSector !== 'all' && seat.sector !== filterSector) return false;

    // Search Query
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const guestName = (seat.guest?.name || '').toLowerCase();
      const guestJob = (seat.guest?.jobTitle || '').toLowerCase();
      const guestCat = (seat.guest?.category || '').toLowerCase();
      const seatCode = (seat.id || '').toLowerCase();
      const arabicCode = formatArabicSeatCode(seat).toLowerCase();
      const token = (seat.guest?.token || '').toLowerCase();
      return (
        guestName.includes(q) || 
        guestJob.includes(q) || 
        guestCat.includes(q) || 
        seatCode.includes(q) || 
        arabicCode.includes(q) || 
        token.includes(q)
      );
    }
    return true;
  });

  // Unique sectors for filter dropdown
  const uniqueSectors = Array.from(new Set(seats.map(s => s.sector).filter(Boolean)));

  // Export to Excel
  const handleExportExcel = () => {
    if (seats.length === 0) {
      alert('لا توجد بيانات لتصديرها');
      return;
    }
    exportSeatsToExcel(seats, eventDetails);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (seats.length === 0) {
      alert('لا توجد بيانات لتصديرها');
      return;
    }
    exportSeatsToCSV(seats, eventDetails);
  };

  // Handle File Selection for Import
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportFileName(file.name);
    setIsImporting(true);
    try {
      const parsed = await parseGuestFile(file);
      setImportedGuests(parsed);
      setImportResult(null);
    } catch (err) {
      alert('حدث خطأ أثناء قراءة الملف: ' + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  // Execute Auto Assignment
  const handleConfirmImport = () => {
    if (importedGuests.length === 0) return;

    const res = autoAssignGuestsToSeats(importedGuests, seats);
    saveSeats(res.updatedSeats);
    if (onSeatsUpdated) {
      onSeatsUpdated(res.updatedSeats);
    }
    setImportResult(res);
  };

  const handlePrintTable = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6" dir="rtl">
      
      {/* Top Controls Header Bar */}
      <div className="bg-[#0b162b] border border-white/10 p-5 rounded-3xl shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="ابحث بالاسم، الصف، المقعد، المنصب، أو التذكرة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-400 outline-none transition-all pr-10"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute left-3.5 top-3 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="all" className="bg-[#0b162b]">جميع الحالات ({bookedSeats.length})</option>
            <option value="reserved" className="bg-[#0b162b]">محجوز فقط ({seats.filter(s => s.status === 'reserved').length})</option>
            <option value="checked_in" className="bg-[#0b162b]">تم الدخول ({seats.filter(s => s.status === 'checked_in').length})</option>
            <option value="vip" className="bg-[#0b162b]">كبار الشخصيات VIP ({seats.filter(s => s.isVip && s.status !== 'available').length})</option>
          </select>

          {/* Level Filter */}
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="all" className="bg-[#0b162b]">جميع الأدوار</option>
            <option value="G" className="bg-[#0b162b]">الدور الأرضي</option>
            <option value="B" className="bg-[#0b162b]">الدور الثاني (البلكونة)</option>
          </select>

          {/* Import Excel Button */}
          <button
            onClick={() => {
              setImportedGuests([]);
              setImportResult(null);
              setImportFileName('');
              setIsImportModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-200 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <Upload className="w-4 h-4 text-purple-300" />
            <span>استيراد من Excel</span>
          </button>

          {/* Export Excel Button */}
          <button
            onClick={handleExportExcel}
            className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>تصدير Excel</span>
          </button>

          {/* Print Table Button */}
          <button
            onClick={handlePrintTable}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <Printer className="w-4 h-4 text-cyan-300" />
            <span>طباعة الكشف</span>
          </button>

        </div>

      </div>

      {/* Stats Mini Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2 flex-wrap gap-2">
        <div>
          يتم عرض <span className="text-cyan-300 font-bold">{filtered.length}</span> من إجمالي <span className="text-white font-bold">{bookedSeats.length}</span> حجز مسجل
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>حاضر: {seats.filter(s => s.status === 'checked_in').length}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>محجوز: {seats.filter(s => s.status === 'reserved').length}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>شاغر: {seats.filter(s => s.status === 'available').length}</span>
          </span>
        </div>
      </div>

      {/* Bookings List Table */}
      {filtered.length === 0 ? (
        <div className="bg-[#0b162b] border border-white/10 rounded-3xl p-12 text-center text-slate-400 space-y-3">
          <User className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-slate-300">لا توجد حجوزات مطابقة للبحث أو التصفية الحالية</p>
          <p className="text-xs text-slate-400">يمكنك حجز مقعد جديد من الخريطة أو استيراد أسماء الضيوف من ملف Excel</p>
        </div>
      ) : (
        <div className="bg-[#0b162b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#070f1f] text-slate-400 border-b border-white/10 uppercase tracking-wider text-[11px] font-bold">
                <tr>
                  <th className="py-4 px-4">#</th>
                  <th className="py-4 px-4">اسم الضيف والصفة</th>
                  <th className="py-4 px-4">المقعد والموقع</th>
                  <th className="py-4 px-4">الفئة</th>
                  <th className="py-4 px-4">الحالة</th>
                  <th className="py-4 px-4">رقم الجوال</th>
                  <th className="py-4 px-4 text-center">الإجراءات والبطاقات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((seat, index) => {
                  const guest = seat.guest || {};
                  const isCheckedIn = seat.status === 'checked_in';

                  return (
                    <tr key={seat.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-mono text-slate-400">{index + 1}</td>
                      
                      {/* Guest info */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                            <span>{guest.name}</span>
                            {seat.isVip && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
                                VIP
                              </span>
                            )}
                          </div>
                          {guest.jobTitle && (
                            <div className="text-[11px] text-slate-400">
                              {guest.jobTitle}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Seat location */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <div className="font-bold text-cyan-300 flex items-center gap-1">
                            <Armchair className="w-3.5 h-3.5 text-cyan-400" />
                            <span>الصف ({seat.row}) • مقعد ({String(seat.number).padStart(2, '0')})</span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {seat.level === 'B' ? 'الدور الثاني (البلكونة)' : 'الدور الأرضي'} • {seat.sector || 'الوسط'}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="bg-white/10 text-slate-300 px-2.5 py-1 rounded-lg text-[11px] font-medium border border-white/10">
                          {guest.category || 'عام'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        {isCheckedIn ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            <Check className="w-3 h-3 text-emerald-300" />
                            <span>تم الدخول</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            <span>مؤكد</span>
                          </span>
                        )}
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-4 font-mono text-slate-300 text-[11px]">
                        {guest.phone || '—'}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          
                          {/* Open Ticket */}
                          <button
                            onClick={() => onOpenCard(seat)}
                            title="عرض التذكرة"
                            className="p-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 transition-all active:scale-95"
                          >
                            <Ticket className="w-3.5 h-3.5" />
                          </button>

                          {/* Open Seat Card */}
                          <button
                            onClick={() => onOpenSeatCard(seat)}
                            title="بطاقة المقعد"
                            className="p-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30 transition-all active:scale-95"
                          >
                            <Armchair className="w-3.5 h-3.5" />
                          </button>

                          {/* Check-in Toggle */}
                          {!isCheckedIn ? (
                            <button
                              onClick={() => onCheckIn(guest.token || seat.id)}
                              title="تسجيل الحضور الآن"
                              className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 transition-all active:scale-95"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          ) : null}

                          {/* Cancel Booking */}
                          <button
                            onClick={() => {
                              if (confirm(`هل أنت متأكد من إلغاء حجز المقعد (${seat.row}${seat.number}) للضيف ${guest.name}؟`)) {
                                onCancelBooking(seat.id);
                              }
                            }}
                            title="إلغاء الحجز"
                            className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 border border-rose-400/30 transition-all active:scale-95"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EXCEL IMPORT MODAL */}
      {/* ========================================================================= */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" dir="rtl">
          <div className="bg-[#0b162b] border-2 border-purple-500/30 rounded-3xl w-full max-w-2xl p-6 shadow-2xl relative space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">استيراد كشف الضيوف وتوزيع المقاعد</h3>
                  <p className="text-xs text-slate-400">يدعم ملفات Excel (.xlsx, .xls) و CSV مع التوزيع الذكي</p>
                </div>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* Step 1: Upload Box */}
            {!importResult && (
              <div className="space-y-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-purple-400/40 hover:border-purple-400 bg-purple-500/5 hover:bg-purple-500/10 rounded-2xl p-8 text-center cursor-pointer transition-all space-y-2"
                >
                  <Upload className="w-10 h-10 text-purple-400 mx-auto animate-bounce" />
                  <p className="text-sm font-bold text-white">
                    {importFileName || 'اضغط هنا لاختيار ملف Excel أو سحبه إلى هنا'}
                  </p>
                  <p className="text-xs text-slate-400">
                    الأعمدة المطلوبة: اسم الضيف، المنصب، الفئة، رقم الجوال (اختياري)
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".xlsx, .xls, .csv"
                    className="hidden"
                  />
                </div>

                {/* Preview Parsed Guests */}
                {importedGuests.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span>تمت قراءة ({importedGuests.length}) ضيف من الملف:</span>
                      <span className="text-emerald-400">جاهز للتوزيع على المقاعد الشاغرة</span>
                    </div>

                    <div className="max-h-48 overflow-y-auto rounded-xl border border-white/10 divide-y divide-white/5 bg-black/20 text-xs">
                      {importedGuests.slice(0, 10).map((g, idx) => (
                        <div key={idx} className="p-2.5 flex items-center justify-between">
                          <span className="font-bold text-white">{g.name}</span>
                          <span className="text-slate-400">{g.jobTitle || g.category}</span>
                          {g.isVip && <span className="text-amber-400 font-bold text-[10px]">VIP</span>}
                        </div>
                      ))}
                      {importedGuests.length > 10 && (
                        <div className="p-2 text-center text-slate-400 text-[11px]">
                          + {importedGuests.length - 10} ضيوف آخرين...
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleConfirmImport}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-xs transition-all shadow-lg shadow-purple-500/20 active:scale-98 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>تأكيد الحجز وتوزيع المقاعد تلقائياً</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Import Results */}
            {importResult && (
              <div className="space-y-4 py-3 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-white">
                  تم استيراد وحجز {importResult.assignedCount} مقعد بنجاح!
                </h4>
                {importResult.unassignedCount > 0 && (
                  <p className="text-xs text-amber-300">
                    تنبيه: {importResult.unassignedCount} ضيف لم يتم حجز مقاعد لهم لعدم توفر مقاعد كافية.
                  </p>
                )}
                <button
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs transition-all hover:bg-cyan-400"
                >
                  إغلاق وعرض الكشف
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
