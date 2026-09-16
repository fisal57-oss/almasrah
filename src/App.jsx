import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Armchair, 
  Calendar, 
  Mail, 
  MoreHorizontal, 
  QrCode 
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import DashboardOverview from './components/DashboardOverview';
import TheaterMap from './components/TheaterMap';
import BookingModal from './components/BookingModal';
import InvitationCard from './components/InvitationCard';
import GuestTicketView from './components/GuestTicketView';
import DoorScanner from './components/DoorScanner';
import BookingsList from './components/BookingsList';
import SettingsModal from './components/SettingsModal';
import SeatLabelsPrintModal from './components/SeatLabelsPrintModal';
import SeatManagerModal from './components/SeatManagerModal';
import AllTicketsPrintModal from './components/AllTicketsPrintModal';
import BeneficiaryPortal from './components/BeneficiaryPortal';
import ElectronicInvitationModal from './components/ElectronicInvitationModal';
import SeatCardModal from './components/SeatCardModal';
import BatchSeatCardsPrintModal from './components/BatchSeatCardsPrintModal';
import InvitationsHub from './components/InvitationsHub';
import AdminLogin from './components/AdminLogin';
import CommandPalette from './components/CommandPalette';
import { exportSeatsToExcel } from './utils/excelUtils';

import {
  getSeats,
  saveSeats,
  getEventDetails,
  bookSeat,
  cancelBooking,
  checkInTicket,
  deleteSeat,
  seedSampleDataIfEmpty,
  generateDefaultSeats
} from './utils/storage';

export default function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const invitationParam = searchParams.get('invitation');
  const rowParam    = searchParams.get('row');
  const seatParam   = searchParams.get('seat');
  const levelParam  = searchParams.get('level');
  const sectorParam = searchParams.get('sector');
  const isBeneficiaryMode = searchParams.get('mode') === 'beneficiary' || 
                            searchParams.get('portal') === '1' || 
                            searchParams.get('guest') === '1' ||
                            window.location.pathname.includes('/portal') ||
                            window.location.pathname.includes('/beneficiary') ||
                            window.location.pathname.includes('/guest');

  const [seats, setSeats] = useState([]);
  const [eventDetails, setEventDetails] = useState(getEventDetails());
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [appMode, setAppMode] = useState(isBeneficiaryMode ? 'beneficiary' : 'admin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('theaterAdminAuth') === 'true' || 
           sessionStorage.getItem('theaterAdminAuth') === 'true';
  });

  // Modals
  const [selectedSeatForBooking, setSelectedSeatForBooking] = useState(null);
  const [selectedSeatForCard, setSelectedSeatForCard] = useState(null);
  const [selectedSeatForInvitation, setSelectedSeatForInvitation] = useState(null);
  const [selectedSeatForSeatCard, setSelectedSeatForSeatCard] = useState(null);
  const [guestViewToken, setGuestViewToken] = useState(invitationParam);
  const [showPrintLabelsModal, setShowPrintLabelsModal] = useState(false);
  const [showSeatManagerModal, setShowSeatManagerModal] = useState(false);
  const [showAllTicketsPrintModal, setShowAllTicketsPrintModal] = useState(false);
  const [showBatchSeatCardsModal, setShowBatchSeatCardsModal] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  useEffect(() => {
    seedSampleDataIfEmpty();
    setSeats(getSeats());
  }, []);

  const refreshSeats = () => {
    setSeats(getSeats());
  };

  const stats = {
    total: seats.length,
    available: seats.filter((s) => s.status === 'available').length,
    reserved: seats.filter((s) => s.status === 'reserved').length,
    checkedIn: seats.filter((s) => s.status === 'checked_in').length
  };

  const handleSelectSeat = (seat) => {
    setSelectedSeatForBooking(seat);
  };

  const handleConfirmBooking = (seatId, guestData) => {
    const result = bookSeat(seatId, guestData);
    if (result.success) {
      refreshSeats();
      setSelectedSeatForBooking(null);
      setSelectedSeatForInvitation(result.seat);
    }
  };

  const handleCancelBooking = (seatId) => {
    cancelBooking(seatId);
    refreshSeats();
    setSelectedSeatForBooking(null);
    setSelectedSeatForCard(null);
  };

  const handleDeleteSeat = (seatId) => {
    const res = deleteSeat(seatId);
    if (res.success) {
      setSeats(res.seats);
      setSelectedSeatForBooking(null);
    } else {
      alert(res.message);
    }
  };

  const handleDoorCheckIn = (tokenOrCode) => {
    const result = checkInTicket(tokenOrCode);
    if (result.success) {
      refreshSeats();
    }
    return result;
  };

  const handleResetAllSeats = () => {
    const fresh = generateDefaultSeats();
    saveSeats(fresh);
    setSeats(fresh);
  };

  const handleSeedDemoData = () => {
    localStorage.removeItem('theaterReservations_v2');
    seedSampleDataIfEmpty();
    setSeats(getSeats());
  };

  const handleImportBackup = (newSeats, newEvent) => {
    if (newSeats) {
      saveSeats(newSeats);
      setSeats(newSeats);
    }
    if (newEvent) {
      setEventDetails(newEvent);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('theaterAdminAuth');
    sessionStorage.removeItem('theaterAdminAuth');
    setIsAdminAuthenticated(false);
  };

  // 1. Guest Ticket View (if invitation token or seat params are present in URL)
  if (guestViewToken || (rowParam && seatParam)) {
    return (
      <GuestTicketView
        token={guestViewToken}
        seats={seats}
        eventDetails={eventDetails}
        rowParam={rowParam}
        seatParam={seatParam}
        levelParam={levelParam}
        sectorParam={sectorParam}
        onBackToDashboard={() => {
          setGuestViewToken(null);
          window.history.pushState({}, document.title, window.location.pathname);
        }}
      />
    );
  }

  // 2. Beneficiary / Guest Portal mode
  if (appMode === 'beneficiary') {
    return (
      <BeneficiaryPortal
        seats={seats}
        eventDetails={eventDetails}
        onSwitchToAdmin={() => setAppMode('admin')}
      />
    );
  }

  // 3. Admin Authentication screen if not logged in
  if (!isAdminAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setIsAdminAuthenticated(true)}
        onGuestMode={() => setAppMode('beneficiary')}
      />
    );
  }

  // 4. Full Luxury Admin Dashboard
  return (
    <div className="min-h-screen bg-[#060D1A] text-white flex font-sans selection:bg-cyan-400 selection:text-slate-950" dir="rtl">
      
      {/* Right Sidebar (Desktop pinned + Mobile slide-over drawer) */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        stats={stats}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onOpenPrintLabels={() => setShowPrintLabelsModal(true)}
        onOpenSeatManager={() => setShowSeatManagerModal(true)}
        onOpenPrintAllTickets={() => setShowAllTicketsPrintModal(true)}
        onOpenSettings={() => setCurrentTab('settings')}
        onOpenBeneficiaryPortal={() => {
          window.open('beneficiary.html', '_blank');
        }}
        onLogout={handleAdminLogout}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Header */}
        <HeaderBar
          eventDetails={eventDetails}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onSearchQuery={(q) => {
            setSearchQuery(q);
            if (q.trim() && currentTab === 'dashboard') {
              setCurrentTab('list');
            }
          }}
          onLogout={handleAdminLogout}
          onOpenBeneficiary={() => window.open('beneficiary.html', '_blank')}
          onOpenCommandPalette={() => setShowCommandPalette(true)}
        />

        {/* Main Content Body - with bottom padding on mobile for the bottom nav */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto pb-24 lg:pb-8">
          
          {/* Tab 0: Luxury Dashboard Overview */}
          {currentTab === 'dashboard' && (
            <DashboardOverview
              stats={stats}
              seats={seats}
              eventDetails={eventDetails}
              onNavigateToMap={() => setCurrentTab('map')}
              onNavigateToList={() => setCurrentTab('list')}
              onNavigateToScanner={() => setCurrentTab('scanner')}
              onNavigateToInvitations={() => setCurrentTab('invitations')}
              onOpenPrintLabels={() => setShowPrintLabelsModal(true)}
              onOpenSeatManager={() => setShowSeatManagerModal(true)}
              onOpenPrintAllTickets={() => setShowAllTicketsPrintModal(true)}
            />
          )}

          {/* Tab 1: Theater Map */}
          {currentTab === 'map' && (
            <TheaterMap
              seats={seats}
              onSelectSeat={handleSelectSeat}
              onSeatsUpdated={(updated) => setSeats(updated)}
            />
          )}

          {/* Tab: Invitations and Seat Cards Hub */}
          {currentTab === 'invitations' && (
            <InvitationsHub
              seats={seats}
              eventDetails={eventDetails}
              onOpenInvitation={(seat) => setSelectedSeatForInvitation(seat)}
              onOpenSeatCard={(seat) => setSelectedSeatForSeatCard(seat)}
              onOpenTicket={(seat) => setSelectedSeatForCard(seat)}
              onOpenBatchSeatCards={() => setShowBatchSeatCardsModal(true)}
              onOpenBatchTickets={() => setShowAllTicketsPrintModal(true)}
              onPreviewGuestView={(token) => setGuestViewToken(token)}
            />
          )}

          {/* Tab 2: Bookings List with Excel Import/Export */}
          {currentTab === 'list' && (
            <BookingsList
              seats={seats}
              eventDetails={eventDetails}
              onOpenCard={(seat) => setSelectedSeatForCard(seat)}
              onOpenInvitation={(seat) => setSelectedSeatForInvitation(seat)}
              onOpenSeatCard={(seat) => setSelectedSeatForSeatCard(seat)}
              onCancelBooking={handleCancelBooking}
              onCheckIn={(token) => {
                handleDoorCheckIn(token);
              }}
              onOpenPrintAllTickets={() => setShowAllTicketsPrintModal(true)}
              onOpenBatchSeatCards={() => setShowBatchSeatCardsModal(true)}
              onSeatsUpdated={(updated) => setSeats(updated)}
            />
          )}

          {/* Tab 3: Door Check-in Scanner */}
          {currentTab === 'scanner' && (
            <DoorScanner
              seats={seats}
              onUpdateSeats={refreshSeats}
            />
          )}

          {/* Tab 4: Event Settings & Admin PIN */}
          {currentTab === 'settings' && (
            <SettingsModal
              onEventUpdated={(updated) => setEventDetails(updated)}
              onResetAllSeats={handleResetAllSeats}
              onSeedDemoData={handleSeedDemoData}
              onImportBackup={handleImportBackup}
            />
          )}

        </main>

        {/* Footer (Desktop & Tablet) */}
        <footer className="py-4 px-8 border-t border-white/10 text-center text-xs text-slate-400 bg-[#060D1A] hidden sm:block">
          <p>نظام حجز وإدارة مقاعد مسارح وقاعات الإدارة العامة للتعليم بمنطقة عسير © 2026</p>
        </footer>

        {/* Sleek Native-Feel Mobile Bottom Navigation Bar */}
        <nav 
          className="lg:hidden no-print fixed bottom-0 left-0 right-0 z-40 bg-[#060D1A]/95 backdrop-blur-2xl border-t border-white/15 px-3 py-1 flex items-center justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.7)]"
          dir="rtl"
          style={{ paddingBottom: 'max(0.6rem, env(safe-area-inset-bottom))' }}
        >
          {/* 1. Dashboard */}
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              currentTab === 'dashboard' 
                ? 'text-cyan-400 font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className={`p-1 rounded-lg ${currentTab === 'dashboard' ? 'bg-cyan-500/20 text-cyan-300 shadow-sm shadow-cyan-500/30' : ''}`}>
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className="text-[10px] leading-none">الرئيسية</span>
          </button>

          {/* 2. Map */}
          <button
            onClick={() => setCurrentTab('map')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              currentTab === 'map' 
                ? 'text-cyan-400 font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className={`p-1 rounded-lg ${currentTab === 'map' ? 'bg-cyan-500/20 text-cyan-300 shadow-sm shadow-cyan-500/30' : ''}`}>
              <Armchair className="w-5 h-5" />
            </div>
            <span className="text-[10px] leading-none">الخريطة</span>
          </button>

          {/* 3. Bookings List */}
          <button
            onClick={() => setCurrentTab('list')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              currentTab === 'list' 
                ? 'text-cyan-400 font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className={`p-1 rounded-lg ${currentTab === 'list' ? 'bg-cyan-500/20 text-cyan-300 shadow-sm shadow-cyan-500/30' : ''}`}>
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[10px] leading-none">الحجوزات</span>
          </button>

          {/* 4. Invitations */}
          <button
            onClick={() => setCurrentTab('invitations')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              currentTab === 'invitations' 
                ? 'text-cyan-400 font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className={`p-1 rounded-lg ${currentTab === 'invitations' ? 'bg-cyan-500/20 text-cyan-300 shadow-sm shadow-cyan-500/30' : ''}`}>
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[10px] leading-none">الدعوات</span>
          </button>

          {/* 5. More (Opens Drawer) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-white transition-all active:scale-95"
          >
            <div className="p-1 rounded-lg bg-white/5">
              <MoreHorizontal className="w-5 h-5" />
            </div>
            <span className="text-[10px] leading-none">المزيد</span>
          </button>
        </nav>

      </div>

      {/* Booking Form Modal */}
      {selectedSeatForBooking && (
        <BookingModal
          seat={selectedSeatForBooking}
          onClose={() => setSelectedSeatForBooking(null)}
          onConfirmBooking={handleConfirmBooking}
          onCancelBooking={handleCancelBooking}
          onDeleteSeat={handleDeleteSeat}
          onOpenCard={(seat) => {
            setSelectedSeatForBooking(null);
            setSelectedSeatForCard(seat);
          }}
          onOpenInvitation={(seat) => {
            setSelectedSeatForBooking(null);
            setSelectedSeatForInvitation(seat);
          }}
          onOpenSeatCard={(seat) => {
            setSelectedSeatForBooking(null);
            setSelectedSeatForSeatCard(seat);
          }}
        />
      )}

      {/* Luxury Electronic Invitation Modal */}
      {selectedSeatForInvitation && (
        <ElectronicInvitationModal
          seat={selectedSeatForInvitation}
          eventDetails={eventDetails}
          onClose={() => setSelectedSeatForInvitation(null)}
          onOpenSeatCard={(seat) => {
            setSelectedSeatForInvitation(null);
            setSelectedSeatForSeatCard(seat);
          }}
          onOpenTicketCard={(seat) => {
            setSelectedSeatForInvitation(null);
            setSelectedSeatForCard(seat);
          }}
          onPreviewGuestView={(token) => {
            setSelectedSeatForInvitation(null);
            setGuestViewToken(token);
          }}
        />
      )}

      {/* Individual Seat Card Modal */}
      {selectedSeatForSeatCard && (
        <SeatCardModal
          seat={selectedSeatForSeatCard}
          eventDetails={eventDetails}
          onClose={() => setSelectedSeatForSeatCard(null)}
          onOpenInvitation={(seat) => {
            setSelectedSeatForSeatCard(null);
            setSelectedSeatForInvitation(seat);
          }}
          onOpenBatchPrint={() => {
            setSelectedSeatForSeatCard(null);
            setShowBatchSeatCardsModal(true);
          }}
        />
      )}

      {/* Batch Seat Cards Print Modal (A4) */}
      {showBatchSeatCardsModal && (
        <BatchSeatCardsPrintModal
          seats={seats}
          eventDetails={eventDetails}
          onClose={() => setShowBatchSeatCardsModal(false)}
        />
      )}

      {/* Invitation Card / Attendance Ticket Modal */}
      {selectedSeatForCard && (
        <InvitationCard
          seat={selectedSeatForCard}
          eventDetails={eventDetails}
          onClose={() => setSelectedSeatForCard(null)}
          onPreviewGuestView={(token) => {
            setSelectedSeatForCard(null);
            setGuestViewToken(token);
          }}
        />
      )}

      {/* Seat Labels Print Modal */}
      {showPrintLabelsModal && (
        <SeatLabelsPrintModal
          seats={seats}
          eventDetails={eventDetails}
          onClose={() => setShowPrintLabelsModal(false)}
        />
      )}

      {/* Seat Manager Modal */}
      {showSeatManagerModal && (
        <SeatManagerModal
          seats={seats}
          onClose={() => setShowSeatManagerModal(false)}
          onSeatsUpdated={(updated) => setSeats(updated)}
        />
      )}

      {/* All Tickets Batch Print Modal */}
      {showAllTicketsPrintModal && (
        <AllTicketsPrintModal
          seats={seats}
          eventDetails={eventDetails}
          onClose={() => setShowAllTicketsPrintModal(false)}
        />
      )}

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        seats={seats}
        onSelectSeat={(seat) => {
          if (seat.status === 'available') {
            setSelectedSeatForBooking(seat);
          } else {
            setSelectedSeatForCard(seat);
          }
        }}
        onOpenBookingModal={() => {
          const firstAvailable = seats.find(s => s.status === 'available');
          if (firstAvailable) setSelectedSeatForBooking(firstAvailable);
          else setCurrentTab('map');
        }}
        onOpenAllTicketsPrint={() => setShowAllTicketsPrintModal(true)}
        onOpenBatchSeatCards={() => setShowBatchSeatCardsModal(true)}
        onOpenPrintLabels={() => setShowPrintLabelsModal(true)}
        onOpenSettings={() => setCurrentTab('settings')}
        onOpenScanner={() => setCurrentTab('scanner')}
        onExportExcel={() => exportSeatsToExcel(seats, eventDetails)}
      />

    </div>
  );
}
