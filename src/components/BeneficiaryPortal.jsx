import React, { useState } from 'react';
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
  Globe,
  Rocket
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import TheaterMap from './TheaterMap';
import InvitationCard from './InvitationCard';
import ElectronicInvitationModal from './ElectronicInvitationModal';
import SeatCardModal from './SeatCardModal';
import { formatArabicSeatCode } from '../utils/storage';

export default function BeneficiaryPortal({ 
  seats, 
  eventDetails, 
  onSwitchToAdmin 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showFullCardModal, setShowFullCardModal] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [showSeatCardModal, setShowSeatCardModal] = useState(false);

  // Filter booked seats only for guest lookup
  const bookedSeats = seats.filter(s => s.guest && s.status !== 'available');

  const filteredSeats = bookedSeats.filter(seat => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.trim().toLowerCase();
    const guestName = seat.guest.name.toLowerCase();
    const phone = (seat.guest.phone || '').toLowerCase();
    const token = (seat.guest.token || '').toLowerCase();
    const seatId = seat.id.toLowerCase();
    const arabicCode = formatArabicSeatCode(seat).toLowerCase();

    return guestName.includes(q) || phone.includes(q) || token.includes(q) || seatId.includes(q) || arabicCode.includes(q);
  });

  return (
    <div className="min-h-screen bg-[#080E1A] text-white flex flex-col justify-between font-sans selection:bg-cyan-400 selection:text-slate-950">
      
      {/* Top Header Bar for Beneficiary Portal */}
      <header className="bg-[#060B14] border-b border-slate-800/60 sticky top-0 z-40 backdrop-blur-md bg-opacity-90 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00d2ff] to-[#7952b3] flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black">
            <Rocket className="w-6 h-6 transform -rotate-45" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wide text-white">
              بوابة المستفيدين والضيوف
            </h1>
            <p className="text-[10px] text-cyan-400 font-bold tracking-wider">
              مسرح الإدارة العامة للتعليم بمنطقة عسير
            </p>
          </div>
        </div>

        {/* Switch to Admin Mode if requested */}
        {onSwitchToAdmin && (
          <button
            onClick={onSwitchToAdmin}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-300 text-xs font-bold border border-cyan-400/30 transition-all shadow-md"
          >
            <span>اللوحة الإدارية</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </header>

      {/* Main Beneficiary Body Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Welcome & Event Title Banner */}
        <div className="glass-panel-luxury p-6 sm:p-8 rounded-3xl border border-cyan-500/30 text-center space-y-3 relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/30">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>بوابة استعراض وتنزيل تذاكر الحضور الرسمية</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
            {eventDetails.title}
          </h2>

          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            أهلاً وسهلاً بكم في مسرح الإدارة العامة للتعليم بمنطقة عسير. يمكنك البحث باسمك أو رقم جوالك لاستعراض تذكرتك الرسمية ومعرفة موقع مقعدك بالمسرح.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-300 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{eventDetails.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{eventDetails.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{eventDetails.venue}</span>
            </div>
          </div>
        </div>

        {/* Live Search Input Card */}
        <div className="glass-panel-luxury p-5 rounded-3xl border border-white/15 space-y-3">
          <label className="text-xs font-black text-white flex items-center gap-2">
            <Search className="w-4 h-4 text-cyan-400" />
            <span>ابحث عن تذكرتك باسم المدعو، رقم الجوال، أو كود التذكرة:</span>
          </label>

          <div className="relative">
            <input
              type="text"
              placeholder="اكتب اسمك الكامل أو رقم الجوال هنا (مثال: خالد السليمان)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border-2 border-cyan-500/30 focus:border-cyan-400 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-slate-400 outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSeat(null);
                }}
                className="absolute left-4 top-3.5 text-slate-400 hover:text-white text-xs font-bold"
              >
                مسح ✕
              </button>
            )}
          </div>

          {/* Quick Filter Candidates */}
          {searchQuery.trim() && (
            <div className="pt-2">
              {filteredSeats.length === 0 ? (
                <div className="p-4 text-center text-slate-400 text-xs font-bold bg-slate-900/50 rounded-2xl border border-white/10">
                  لم نتمكن من العثور على حجز مرتبط بـ "{searchQuery}". يرجى التأكد من كتابة الاسم كما أُدخل عند الحجز.
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  <div className="text-[11px] text-cyan-300 font-bold px-1">
                    نتائج البحث ({filteredSeats.length} حجز):
                  </div>
                  {filteredSeats.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => setSelectedSeat(seat)}
                      className={`w-full p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between ${
                        selectedSeat?.id === seat.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg'
                          : 'bg-slate-900/70 border-white/10 hover:bg-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-extrabold text-sm text-white flex items-center gap-2">
                          <span>{seat.guest.name}</span>
                          <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                            {seat.guest.category}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          المقعد: {formatArabicSeatCode(seat)} • {seat.levelName} ({seat.sector})
                        </div>
                      </div>

                      <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black text-xs shadow-md">
                        عرض التذكرة 🎟️
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Seat Ticket & Guide View */}
        {selectedSeat && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Action Bar for the selected ticket */}
            <div className="glass-panel-luxury p-4 rounded-2xl border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-center sm:text-right">
                <Ticket className="w-5 h-5 text-cyan-300 shrink-0" />
                <span className="text-xs sm:text-sm font-black text-white">
                  تذكرة: {selectedSeat.guest.name} ({formatArabicSeatCode(selectedSeat)})
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowInvitationModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>الدعوة الإلكترونية الفاخرة ✨</span>
                </button>

                <button
                  onClick={() => setShowSeatCardModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Armchair className="w-4 h-4 text-cyan-300" />
                  <span>بطاقة المقعد</span>
                </button>

                <button
                  onClick={() => setShowFullCardModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Ticket className="w-4 h-4 text-white" />
                  <span>تذكرة الحضور</span>
                </button>
              </div>
            </div>

            {/* Interactive Seat Locator Card */}
            <div className="glass-panel-luxury p-4 sm:p-6 rounded-3xl border border-white/20 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-3 gap-2">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Compass className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
                  <span>موقع مقعدك المخصص على خريطة المسرح</span>
                </h3>
                <span className="text-[11px] text-rose-400 font-black animate-pulse flex items-center gap-1 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/30">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                  <span>مقعدك مُميز باللون الأحمر المتوهج 🔴</span>
                </span>
              </div>

              {/* Grid specification cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-center">
                <div className="bg-slate-900/80 p-2.5 sm:p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-slate-400 block font-bold">الدور</span>
                  <strong className="text-xs sm:text-sm font-extrabold text-cyan-300">{selectedSeat.levelName}</strong>
                </div>
                <div className="bg-slate-900/80 p-2.5 sm:p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-slate-400 block font-bold">القطاع</span>
                  <strong className="text-xs sm:text-sm font-extrabold text-cyan-300">قطاع {selectedSeat.sector}</strong>
                </div>
                <div className="bg-slate-900/80 p-2.5 sm:p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-slate-400 block font-bold">الصف</span>
                  <strong className="text-xs sm:text-sm font-extrabold text-cyan-300">الصف ({selectedSeat.row})</strong>
                </div>
                <div className="bg-slate-900/80 p-2.5 sm:p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-slate-400 block font-bold">المقعد</span>
                  <strong className="text-sm sm:text-base font-black text-rose-400 font-mono">{selectedSeat.row}{parseInt(selectedSeat.number, 10)}</strong>
                </div>
              </div>

              {/* Mobile Swipe Hint Notice */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-2xl text-xs text-rose-200 font-bold flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2">
                  <span className="text-base">🔴</span>
                  <span>المقعد الخاص بك مُميز باللون الأحمر المتوهج أدناه.</span>
                </div>
                <span className="text-[10px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-lg border border-cyan-500/30 whitespace-nowrap">
                  اسحب الخريطة أفقياً 📱
                </span>
              </div>

              {/* Theater Map Component with smooth horizontal touch scrolling */}
              <div className="bg-slate-950/80 p-2 sm:p-4 rounded-2xl border border-white/10 overflow-x-auto touch-pan-x">
                <TheaterMap
                  seats={seats}
                  onSelectSeat={() => {}}
                  highlightSeatId={selectedSeat.id}
                />
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="py-4 px-8 border-t border-slate-800/60 text-center text-xs text-slate-400 bg-[#060B14]">
        <p>نظام حجز مقاعد مسارح وقاعات إدارة التعليم بمنطقة عسير © 2026</p>
      </footer>

      {/* Full Official Card Modal */}
      {showFullCardModal && selectedSeat && (
        <InvitationCard
          seat={selectedSeat}
          eventDetails={eventDetails}
          onClose={() => setShowFullCardModal(false)}
        />
      )}

      {/* Luxury Electronic Invitation Modal */}
      {showInvitationModal && selectedSeat && (
        <ElectronicInvitationModal
          seat={selectedSeat}
          eventDetails={eventDetails}
          onClose={() => setShowInvitationModal(false)}
          onOpenSeatCard={() => {
            setShowInvitationModal(false);
            setShowSeatCardModal(true);
          }}
        />
      )}

      {/* Seat Card Modal */}
      {showSeatCardModal && selectedSeat && (
        <SeatCardModal
          seat={selectedSeat}
          eventDetails={eventDetails}
          onClose={() => setShowSeatCardModal(false)}
          onOpenInvitation={() => {
            setShowSeatCardModal(false);
            setShowInvitationModal(true);
          }}
        />
      )}

    </div>
  );
}
