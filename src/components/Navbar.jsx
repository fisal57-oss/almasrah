import React from 'react';
import { 
  Armchair, 
  Ticket, 
  QrCode, 
  Settings, 
  Layers, 
  Crown, 
  Sparkles,
  Search,
  Printer,
  Mail,
  Building2
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  stats, 
  eventDetails, 
  onResetDemo,
  onOpenPrintLabels
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-3.5 gap-4">
          
          {/* Logo & Event Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 p-0.5 shadow-lg shadow-amber-500/30 shrink-0 overflow-hidden" style={{ width: '56px', height: '56px' }}>
              <div className="w-full h-full bg-white/20 backdrop-blur-md rounded-[14px] flex items-center justify-center overflow-hidden">
                {eventDetails.logoUrl ? (
                  <img 
                    src={eventDetails.logoUrl} 
                    alt="Logo" 
                    className="w-full h-full max-w-full max-h-full object-contain p-1 rounded-[12px]"
                    style={{ maxWidth: '52px', maxHeight: '52px', objectFit: 'contain' }}
                  />
                ) : (
                  <Crown className="w-7 h-7 text-yellow-300" />
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide drop-shadow-md">
                  {eventDetails.title}
                </h1>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/20 text-yellow-200 border border-white/30 font-bold backdrop-blur-md">
                  لوحة المسرح
                </span>
              </div>
              <p className="text-xs text-slate-200 mt-0.5">
                {eventDetails.venue} • {eventDetails.date}
              </p>
            </div>
          </div>

          {/* Real-time Counters */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 font-bold backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>متاح:</span>
              <strong className="text-sm text-white">{stats.available}</strong>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-400/40 font-bold backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>محجوز:</span>
              <strong className="text-sm text-white">{stats.reserved}</strong>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/20 text-purple-200 border border-purple-400/40 font-bold backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <span>تم الدخول:</span>
              <strong className="text-sm text-white">{stats.checkedIn}</strong>
            </div>

            <div className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 text-white border border-white/20 font-bold backdrop-blur-md">
              <span>الإجمالي:</span>
              <strong className="text-sm text-yellow-300">{stats.total}</strong>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xl p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={() => setCurrentTab('map')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                currentTab === 'map'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 shadow-lg font-black scale-[1.02]'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>مخطط المسرح</span>
            </button>

            <button
              onClick={() => setCurrentTab('list')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                currentTab === 'list'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 shadow-lg font-black scale-[1.02]'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>الحجوزات ({stats.reserved + stats.checkedIn})</span>
            </button>

            <button
              onClick={() => setCurrentTab('invitations')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                currentTab === 'invitations'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 shadow-lg font-black scale-[1.02]'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>الدعوات ({stats.reserved + stats.checkedIn})</span>
            </button>

            <button
              onClick={() => setCurrentTab('scanner')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                currentTab === 'scanner'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg font-black scale-[1.02]'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>ماسح الباب</span>
            </button>

            <button
              onClick={() => setCurrentTab('settings')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                currentTab === 'settings'
                  ? 'bg-white/25 text-yellow-200 border border-white/40 shadow-lg font-black scale-[1.02]'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>الإعدادات</span>
            </button>

            <button
              onClick={onOpenPrintLabels}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-yellow-400/20 hover:bg-yellow-400 hover:text-indigo-950 text-yellow-200 border border-yellow-300/40 transition-all shadow-md backdrop-blur-md"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة ترقيم المسرح</span>
            </button>

            <a
              href="itqan.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black bg-purple-500/20 hover:bg-purple-500 hover:text-white text-purple-200 border border-purple-400/30 transition-all shadow-md backdrop-blur-md"
              title="فتح بوابة نظام إتقان المستقلة"
            >
              <Building2 className="w-4 h-4 text-purple-300" />
              <span>بوابة إتقان ↗</span>
            </a>
          </nav>

        </div>
      </div>
    </header>
  );
}
