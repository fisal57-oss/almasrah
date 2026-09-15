import React, { useState, useEffect, useRef } from 'react';
import { 
  QrCode, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  UserCheck, 
  Armchair, 
  Phone, 
  Clock, 
  Compass, 
  DoorClosed, 
  Sparkles, 
  ArrowRight, 
  Crown, 
  Users, 
  Filter, 
  Layers, 
  Check, 
  AlertCircle, 
  ExternalLink,
  Volume2,
  RefreshCw,
  MapPin,
  Calendar
} from 'lucide-react';
import { getSeats, getEventDetails, checkInTicket, formatArabicSeatCode, saveSeats, bookSeat } from '../utils/storage';
import { playSuccessSound, playWarningSound } from '../utils/audio';
import { MinistryOfEducationLogo } from './ModernAttendanceCard';
import TheaterMap from './TheaterMap';

export default function StaffPortal() {
  const [seats, setSeats] = useState([]);
  const [eventDetails, setEventDetails] = useState(getEventDetails());
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner', 'lookup', 'map', 'log'
  
  // Scanner state
  const [inputCode, setInputCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [recentCheckIns, setRecentCheckIns] = useState([]);
  const scannerInputRef = useRef(null);

  // Lookup state
  const [searchQuery, setSearchQuery] = useState('');
  const [lookupFilter, setLookupFilter] = useState('all'); // 'all', 'waiting', 'checked_in', 'vip'

  // Selected seat for guide modal
  const [guidedSeat, setGuidedSeat] = useState(null);

  useEffect(() => {
    const loadedSeats = getSeats();
    setSeats(loadedSeats);
    setEventDetails(getEventDetails());
  }, []);

  const refreshData = () => {
    setSeats(getSeats());
    setEventDetails(getEventDetails());
  };

  // Focus scanner input on tab change
  useEffect(() => {
    if (activeTab === 'scanner') {
      setTimeout(() => scannerInputRef.current?.focus(), 100);
    }
  }, [activeTab]);

  // Handle Scan Process
  const handleProcessScan = (codeToScan) => {
    if (!codeToScan || !codeToScan.trim()) return;

    let cleanedCode = codeToScan.trim();
    if (cleanedCode.includes('http://') || cleanedCode.includes('https://') || cleanedCode.includes('?')) {
      try {
        const urlObj = new URL(cleanedCode);
        const inv = urlObj.searchParams.get('invitation');
        const row = urlObj.searchParams.get('row');
        const seat = urlObj.searchParams.get('seat');
        if (inv) {
          cleanedCode = inv;
        } else if (row && seat) {
          cleanedCode = `${row}-${seat}`;
        }
      } catch (e) {}
    }

    const result = checkInTicket(cleanedCode);
    setScanResult(result);

    if (result.success) {
      playSuccessSound();
      refreshData();
      
      const newEntry = {
        id: result.seat.id,
        name: result.seat.guest?.name || 'ضيف المسرح',
        seatCode: formatArabicSeatCode(result.seat),
        row: result.seat.row,
        number: result.seat.number,
        level: result.seat.level === 'B' ? 'البلكونة' : 'الدور الأرضي',
        sector: result.seat.sector || 'الوسط',
        isVip: result.seat.isVip,
        jobTitle: result.seat.guest?.jobTitle,
        category: result.seat.guest?.category,
        time: new Date().toLocaleTimeString('ar-SA')
      };

      setRecentCheckIns(prev => [newEntry, ...prev.filter(item => item.id !== newEntry.id)].slice(0, 15));
      setGuidedSeat(result.seat);
    } else {
      playWarningSound();
    }
  };

  const handleScannerSubmit = (e) => {
    e.preventDefault();
    handleProcessScan(inputCode);
    setInputCode('');
    scannerInputRef.current?.focus();
  };

  // Manual Check-in from Lookup
  const handleManualCheckIn = (seat) => {
    const code = seat.guest?.token || seat.id;
    handleProcessScan(code);
  };

  // Stats calculation
  const bookedSeats = seats.filter(s => s.status !== 'available' && s.guest);
  const checkedInSeats = seats.filter(s => s.status === 'checked_in');
  const waitingSeats = seats.filter(s => s.status === 'reserved');
  const attendanceRate = bookedSeats.length > 0 ? Math.round((checkedInSeats.length / bookedSeats.length) * 100) : 0;

  // Filtered lookup guests
  const filteredLookup = bookedSeats.filter(seat => {
    if (lookupFilter === 'waiting' && seat.status !== 'reserved') return false;
    if (lookupFilter === 'checked_in' && seat.status !== 'checked_in') return false;
    if (lookupFilter === 'vip' && !seat.isVip) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const name = (seat.guest?.name || '').toLowerCase();
      const phone = (seat.guest?.phone || '').toLowerCase();
      const job = (seat.guest?.jobTitle || '').toLowerCase();
      const row = (seat.row || '').toLowerCase();
      const num = String(seat.number || '');
      const code = `${row}${num}`.toLowerCase();
      return name.includes(q) || phone.includes(q) || job.includes(q) || code.includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#060D1A] text-white flex flex-col items-center justify-start pb-12 select-none" dir="rtl">
      
      {/* Top Header Bar */}
      <header className="w-full bg-[#09152b] border-b border-cyan-500/20 px-4 py-3 sticky top-0 z-30 shadow-xl backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                <span>بوابة المنظم وموظف الباب</span>
                <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
                  Staff Gate
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 truncate max-w-[200px] sm:max-w-none">
                {eventDetails.title || 'مسرح الإدارة العامة للتعليم بمنطقة عسير'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshData}
              title="تحديث البيانات"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all active:scale-95 text-xs flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تحديث</span>
            </button>
            <a
              href="index.html"
              title="لوحة الإدارة"
              className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition-all border border-white/15"
            >
              لوحة الإدارة
            </a>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-4xl px-3 sm:px-6 py-4 space-y-4">
        
        {/* Live Counters Banner */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-gradient-to-r from-[#0d1f3d] via-[#0a1830] to-[#071124] border border-cyan-500/30 p-3 sm:p-4 rounded-2xl shadow-xl text-center">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-bold">حاضر بالقاعة</span>
            <span className="text-lg sm:text-2xl font-black text-emerald-300">{checkedInSeats.length}</span>
            <span className="text-[9px] text-emerald-400/80 block">تم الدخول</span>
          </div>
          <div className="border-x border-white/10 space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-bold">بانتظار الدخول</span>
            <span className="text-lg sm:text-2xl font-black text-amber-300">{waitingSeats.length}</span>
            <span className="text-[9px] text-amber-400/80 block">متبقي</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-bold">نسبة الحضور</span>
            <span className="text-lg sm:text-2xl font-black text-cyan-300">{attendanceRate}%</span>
            <span className="text-[9px] text-cyan-400/80 block">من {bookedSeats.length}</span>
          </div>
        </div>

        {/* 4 Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1.5 bg-white/5 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`py-2.5 rounded-xl font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
              activeTab === 'scanner'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>ماسح الباب</span>
          </button>

          <button
            onClick={() => setActiveTab('lookup')}
            className={`py-2.5 rounded-xl font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
              activeTab === 'lookup'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>بحث وتحضير</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`py-2.5 rounded-xl font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
              activeTab === 'map'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Armchair className="w-4 h-4" />
            <span>خريطة المسرح</span>
          </button>

          <button
            onClick={() => setActiveTab('log')}
            className={`py-2.5 rounded-xl font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
              activeTab === 'log'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>سجل الدخول</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: SCANNER */}
        {/* ========================================================================= */}
        {activeTab === 'scanner' && (
          <div className="space-y-4 animate-fade-in">
            
            {/* Scan Input Box */}
            <div className="bg-[#0b162b] border border-cyan-500/30 p-5 sm:p-6 rounded-3xl shadow-xl space-y-4">
              <form onSubmit={handleScannerSubmit} className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 block">
                    مسح باركود التذكرة أو إدخال رقم المقعد:
                  </label>
                  <span className="text-[10px] text-cyan-300 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                    القارئ اللاسلكي / USB مدعوم
                  </span>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      ref={scannerInputRef}
                      type="text"
                      placeholder="امسح الـ QR أو اكتب رمز المقعد مثل A04 أو التوكن..."
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full bg-white/5 border-2 border-cyan-500/40 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-slate-400 outline-none transition-all pr-11 font-mono tracking-wider shadow-inner"
                    />
                    <QrCode className="w-5 h-5 text-cyan-400 absolute right-3.5 top-3.5" />
                  </div>

                  <button
                    type="submit"
                    className="px-5 sm:px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Check className="w-4 h-4" />
                    <span>تحضير</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Scan Result Feedback Card */}
            {scanResult && (
              <div className={`p-5 sm:p-6 rounded-3xl border-2 shadow-2xl animate-fade-in transition-all ${
                scanResult.success 
                  ? 'bg-emerald-950/40 border-emerald-500/60 shadow-emerald-500/10' 
                  : 'bg-rose-950/40 border-rose-500/60 shadow-rose-500/10'
              }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      scanResult.success 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' 
                        : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                    }`}>
                      {scanResult.success ? (
                        <ShieldCheck className="w-7 h-7 text-emerald-400" />
                      ) : (
                        <XCircle className="w-7 h-7 text-rose-400" />
                      )}
                    </div>

                    <div>
                      <h3 className={`text-sm sm:text-base font-black ${
                        scanResult.success ? 'text-emerald-300' : 'text-rose-300'
                      }`}>
                        {scanResult.message || (scanResult.success ? 'تم تسجيل الدخول بنجاح!' : 'رمز غير صالح')}
                      </h3>
                      {scanResult.seat?.guest && (
                        <p className="text-sm font-bold text-white mt-0.5">
                          {scanResult.seat.guest.name}
                          {scanResult.seat.isVip && (
                            <span className="mr-2 text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-bold">
                              VIP
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-2.5 py-1 rounded-full">
                    {new Date().toLocaleTimeString('ar-SA')}
                  </span>
                </div>

                {/* Seat Details & Guide to Seat */}
                {scanResult.seat && (
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-black/30 p-2 rounded-xl border border-white/10">
                        <span className="text-[9px] text-slate-400 block font-bold">المقعد</span>
                        <strong className="text-cyan-300 font-black">
                          {scanResult.seat.row}-{String(scanResult.seat.number).padStart(2,'0')}
                        </strong>
                      </div>
                      <div className="bg-black/30 p-2 rounded-xl border border-white/10">
                        <span className="text-[9px] text-slate-400 block font-bold">الدور</span>
                        <strong className="text-white font-black">
                          {scanResult.seat.level === 'B' ? 'البلكونة' : 'الأرضي'}
                        </strong>
                      </div>
                      <div className="bg-black/30 p-2 rounded-xl border border-white/10">
                        <span className="text-[9px] text-slate-400 block font-bold">القطاع والمدخل</span>
                        <strong className="text-amber-300 font-black">
                          {scanResult.seat.sector || 'الوسط'}
                        </strong>
                      </div>
                    </div>

                    {/* Guide guest button */}
                    <button
                      onClick={() => setGuidedSeat(scanResult.seat)}
                      className="w-full py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Compass className="w-3.5 h-3.5 text-cyan-300" />
                      <span>عرض موقع المقعد على الخريطة لإرشاد الضيف</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Quick Demo Scan list for staff */}
            {waitingSeats.length > 0 && (
              <div className="bg-[#0b162b] border border-white/10 p-4 rounded-3xl space-y-2.5">
                <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>ضيوف بانتظار الدخول (تحضير سريع بنقرة واحدة):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {waitingSeats.slice(0, 8).map(s => (
                    <div 
                      key={s.id}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:border-cyan-400/30 transition-all text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-white block">{s.guest?.name}</span>
                        <span className="text-[10px] text-cyan-300">
                          الصف ({s.row}) • مقعد ({s.number}) • {s.level === 'B' ? 'البلكونة' : 'الأرضي'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleProcessScan(s.guest?.token || s.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-bold text-[11px] transition-all active:scale-95 flex items-center gap-1 shrink-0"
                      >
                        <Check className="w-3 h-3" />
                        <span>تحضير</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: GUEST LOOKUP & MANUAL CHECK-IN */}
        {/* ========================================================================= */}
        {activeTab === 'lookup' && (
          <div className="space-y-4 animate-fade-in">
            
            {/* Search Input & Filter Tabs */}
            <div className="bg-[#0b162b] border border-white/10 p-4 rounded-3xl shadow-xl space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث باسم الضيف، رقم الجوال، أو رقم المقعد..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-400 outline-none transition-all pr-10"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setLookupFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    lookupFilter === 'all' ? 'bg-cyan-500 text-slate-950' : 'bg-white/5 text-slate-300'
                  }`}
                >
                  الكل ({bookedSeats.length})
                </button>
                <button
                  onClick={() => setLookupFilter('waiting')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    lookupFilter === 'waiting' ? 'bg-amber-500 text-slate-950' : 'bg-white/5 text-slate-300'
                  }`}
                >
                  لم يحضر ({waitingSeats.length})
                </button>
                <button
                  onClick={() => setLookupFilter('checked_in')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    lookupFilter === 'checked_in' ? 'bg-emerald-500 text-slate-950' : 'bg-white/5 text-slate-300'
                  }`}
                >
                  حاضر ({checkedInSeats.length})
                </button>
                <button
                  onClick={() => setLookupFilter('vip')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    lookupFilter === 'vip' ? 'bg-purple-500 text-white' : 'bg-white/5 text-slate-300'
                  }`}
                >
                  VIP ({bookedSeats.filter(s => s.isVip).length})
                </button>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-2">
              {filteredLookup.length === 0 ? (
                <div className="bg-[#0b162b] border border-white/10 p-8 rounded-3xl text-center text-slate-400 text-xs">
                  لا توجد نتائج مطابقة للبحث
                </div>
              ) : (
                filteredLookup.map(seat => {
                  const isCheckedIn = seat.status === 'checked_in';
                  return (
                    <div 
                      key={seat.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isCheckedIn 
                          ? 'bg-emerald-950/20 border-emerald-500/30' 
                          : 'bg-[#0b162b] border-white/10 hover:border-cyan-400/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs sm:text-sm">
                            {seat.guest?.name}
                          </span>
                          {seat.isVip && (
                            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">
                              VIP
                            </span>
                          )}
                          {isCheckedIn ? (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                              تم الدخول
                            </span>
                          ) : (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                              بانتظار الحضور
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-cyan-300 flex items-center gap-2 flex-wrap">
                          <span>الصف ({seat.row}) • مقعد ({seat.number})</span>
                          <span>•</span>
                          <span>{seat.level === 'B' ? 'البلكونة' : 'الدور الأرضي'}</span>
                          <span>•</span>
                          <span>قطاع {seat.sector || 'الوسط'}</span>
                        </div>

                        {seat.guest?.phone && (
                          <div className="text-[10px] text-slate-400 font-mono">
                            📱 {seat.guest.phone} {seat.guest.jobTitle ? `• ${seat.guest.jobTitle}` : ''}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Guide button */}
                        <button
                          onClick={() => setGuidedSeat(seat)}
                          title="عرض موقع المقعد"
                          className="p-2 rounded-xl bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 border border-cyan-400/30 transition-all text-xs"
                        >
                          <Compass className="w-4 h-4" />
                        </button>

                        {/* Check in button */}
                        {!isCheckedIn ? (
                          <button
                            onClick={() => handleManualCheckIn(seat)}
                            className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95 flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>تحضير</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2.5 py-1.5 rounded-xl">
                            {seat.guest?.checkedInAt ? new Date(seat.guest.checkedInAt).toLocaleTimeString('ar-SA', {hour: '2-digit', minute:'2-digit'}) : 'حاضر'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: THEATER MAP & SEAT GUIDE */}
        {/* ========================================================================= */}
        {activeTab === 'map' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-[#0b162b] border border-white/10 p-4 sm:p-5 rounded-3xl shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                  <Armchair className="w-4 h-4 text-cyan-400" />
                  <span>خريطة مقاعد المسرح وإرشاد الضيوف</span>
                </h3>
                <span className="text-[10px] text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  اضغط على أي مقعد لعرض بيانات الضيف
                </span>
              </div>

              <div className="w-full bg-[#050b18] rounded-2xl border border-white/10 p-2 overflow-hidden">
                <TheaterMap
                  seats={seats}
                  onSelectSeat={(seat) => setGuidedSeat(seat)}
                  onSeatsUpdated={(updated) => setSeats(updated)}
                  selectedSeatId={guidedSeat?.id}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: LIVE CHECK-IN LOG */}
        {/* ========================================================================= */}
        {activeTab === 'log' && (
          <div className="bg-[#0b162b] border border-white/10 p-5 rounded-3xl shadow-xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>سجل عمليات الدخول عند الباب (Live Gate Log)</span>
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                {recentCheckIns.length} عمليات
              </span>
            </div>

            {recentCheckIns.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs space-y-2">
                <UserCheck className="w-10 h-10 text-slate-600 mx-auto" />
                <p>لم يتم تسجيل حضور ضيوف في هذه الجلسة بعد</p>
                <p className="text-[10px] text-slate-400">ستظهر هنا تفاصيل كل ضيف يدخل القاعة فوراً</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {recentCheckIns.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white/5 border border-emerald-500/20 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {item.isVip && (
                          <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">VIP</span>
                        )}
                      </div>
                      <div className="text-[10px] text-cyan-300">
                        الصف ({item.row}) • مقعد ({item.number}) • {item.level} • قطاع {item.sector}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-xl">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Guided Seat Location Modal */}
      {guidedSeat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" dir="rtl">
          <div className="bg-[#0b162b] border-2 border-cyan-500/40 rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">إرشاد الضيف وموقع المقعد</h3>
                  <p className="text-[11px] text-slate-400">تفاصيل الموقع والمدخل المحدد للضيف</p>
                </div>
              </div>
              <button
                onClick={() => setGuidedSeat(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* Guest Info */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{guidedSeat.guest?.name || 'مقعد غير محجوز'}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  guidedSeat.status === 'checked_in' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {guidedSeat.status === 'checked_in' ? 'حاضر بالقاعة' : 'محجوز'}
                </span>
              </div>
              {guidedSeat.guest?.jobTitle && (
                <div className="text-[11px] text-slate-400">{guidedSeat.guest.jobTitle}</div>
              )}
            </div>

            {/* Location Indicators */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-cyan-500/10 border border-cyan-400/30 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-bold">الصف والمقعد</span>
                <strong className="text-sm font-black text-cyan-300">
                  {guidedSeat.row}-{String(guidedSeat.number).padStart(2,'0')}
                </strong>
              </div>
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-bold">الدور</span>
                <strong className="text-sm font-black text-white">
                  {guidedSeat.level === 'B' ? 'الدور الثاني (البلكونة)' : 'الدور الأرضي'}
                </strong>
              </div>
              <div className="bg-amber-500/10 border border-amber-400/30 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-bold">القطاع والمدخل</span>
                <strong className="text-sm font-black text-amber-300">
                  قطاع {guidedSeat.sector || 'الوسط'}
                </strong>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              {guidedSeat.status !== 'checked_in' && (
                <button
                  onClick={() => {
                    handleManualCheckIn(guidedSeat);
                    setGuidedSeat(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>تأكيد الحضور الآن</span>
                </button>
              )}
              <button
                onClick={() => setGuidedSeat(null)}
                className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
