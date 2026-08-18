import React, { useState } from 'react';
import {
  ShieldCheck,
  X,
  Search,
  Plus,
  Trash2,
  Edit3,
  Printer,
  Check,
  AlertCircle,
  CheckCircle2,
  FileText,
  Download,
  RotateCcw,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Key,
  Database,
  Calendar,
  Settings,
  Sparkles,
  Phone
} from 'lucide-react';
import { Booking, BookingStatus, CalendarDateOverride } from '../types';
import { STUDIO_INFO, INITIAL_BOOKINGS, PACKAGES_DATA } from '../data/weddingData';
import { PrintableReceipt } from './PrintableReceipt';
import {
  deleteBookingFromDb,
  saveBookingToDb,
  updateBookingInDb,
} from '../services/databaseService';
import { FIREBASE_PROJECT_ID } from '../lib/firebase';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  dateOverrides: CalendarDateOverride[];
  onUpdateBookings: (updated: Booking[]) => void;
  onUpdateDateOverrides: (updated: CalendarDateOverride[]) => void;
  onResetData: () => void;
  onOpenDatabase?: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  bookings,
  dateOverrides,
  onUpdateBookings,
  onUpdateDateOverrides,
  onResetData,
  onOpenDatabase,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem('sony_admin_auth') === 'true' ||
      localStorage.getItem('sony_admin_auth') === 'true'
    );
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  // Active Admin Tab (Removed Calendar as requested)
  const [activeTab, setActiveTab] = useState<'bookings' | 'addBooking' | 'settings'>('bookings');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Change Password State
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [changePassStatus, setChangePassStatus] = useState<{ success?: string; error?: string } | null>(null);

  // In-app Delete & Reset Confirmation State (Iframe safe)
  const [confirmTarget, setConfirmTarget] = useState<{
    type: 'booking' | 'reset';
    id: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  // Selected booking for Print Receipt inside Admin
  const [viewingReceiptBooking, setViewingReceiptBooking] = useState<Booking | null>(null);

  // Edit booking modal inside admin
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  // Add offline booking form state
  const [newCustName, setNewCustName] = useState('');
  const [newBride, setNewBride] = useState('');
  const [newGroom, setNewGroom] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newEventType, setNewEventType] = useState('Two-Day Wedding (Paath, Jaggo & Wedding)');
  const [newVenue, setNewVenue] = useState('');
  const [newPackage, setNewPackage] = useState(PACKAGES_DATA[1].name);
  const [newPrice, setNewPrice] = useState(PACKAGES_DATA[1].price);
  const [newAdvance, setNewAdvance] = useState(25000);
  const [newStatus, setNewStatus] = useState<BookingStatus>('CONFIRMED');

  if (!isOpen) return null;

  // Retrieve Master Password
  const getStoredPassword = () => {
    return localStorage.getItem('sony_admin_master_password') || 'sony9888';
  };

  // Handle Login / Unlock
  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passwordInput.trim();
    const master = getStoredPassword();

    // Check entered password against custom master, default `sony9888`, studio hotline or backup
    if (
      cleanInput === master ||
      cleanInput === 'sony9888' ||
      cleanInput === '9888469940' ||
      cleanInput === 'sirhind2026'
    ) {
      setIsAuthenticated(true);
      setPasswordError(null);
      if (rememberMe) {
        localStorage.setItem('sony_admin_auth', 'true');
      } else {
        sessionStorage.setItem('sony_admin_auth', 'true');
      }
    } else {
      setPasswordError('Incorrect password. Please enter the valid admin passcode.');
    }
  };

  // Handle Lock / Logout
  const handleLockAdmin = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sony_admin_auth');
    localStorage.removeItem('sony_admin_auth');
    setPasswordInput('');
    setPasswordError(null);
  };

  // Handle Changing Master Password
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePassStatus(null);
    const master = getStoredPassword();

    if (currPass !== master && currPass !== 'sony9888' && currPass !== '9888469940') {
      setChangePassStatus({ error: 'Current password does not match.' });
      return;
    }

    if (newPass.length < 4) {
      setChangePassStatus({ error: 'New password must be at least 4 characters long.' });
      return;
    }

    if (newPass !== confirmPass) {
      setChangePassStatus({ error: 'New password and confirmation do not match.' });
      return;
    }

    localStorage.setItem('sony_admin_master_password', newPass);
    setChangePassStatus({ success: 'Admin password successfully updated!' });
    setCurrPass('');
    setNewPass('');
    setConfirmPass('');
  };

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.mobile.includes(searchQuery) ||
      b.weddingDate.includes(searchQuery) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle Delete Booking Prompt
  const promptDeleteBooking = (booking: Booking) => {
    setConfirmTarget({
      type: 'booking',
      id: booking.id,
      title: `Delete Booking #${booking.id}`,
      subtitle: `Client: ${booking.customerName} | Wedding Date: ${booking.weddingDate}`,
    });
  };

  // Handle Reset Prompt
  const promptResetData = () => {
    setConfirmTarget({
      type: 'reset',
      id: 'reset',
      title: 'Reset All Studio Records',
      subtitle: 'This will restore sample demo records in both local cache and database.',
    });
  };

  // Execute Confirmed Delete or Reset
  const handleExecuteConfirmed = async () => {
    if (!confirmTarget) return;

    if (confirmTarget.type === 'booking') {
      const id = confirmTarget.id;
      const updated = bookings.filter((b) => b.id !== id);
      onUpdateBookings(updated);
      localStorage.setItem('sony_photography_bookings', JSON.stringify(updated));
      try {
        await deleteBookingFromDb(id);
      } catch (err) {
        console.error('Error deleting from Firestore:', err);
      }
    } else if (confirmTarget.type === 'reset') {
      onResetData();
    }

    setConfirmTarget(null);
  };

  // Handle Status change quick
  const handleQuickStatusChange = async (id: string, newStat: BookingStatus) => {
    const updated = bookings.map((b) => {
      if (b.id === id) {
        return { ...b, status: newStat };
      }
      return b;
    });
    onUpdateBookings(updated);
    localStorage.setItem('sony_photography_bookings', JSON.stringify(updated));

    try {
      await updateBookingInDb(id, { status: newStat });
    } catch (err) {
      console.error(err);
    }
  };

  // Save edited booking
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;

    const updated = bookings.map((b) => (b.id === editingBooking.id ? editingBooking : b));
    onUpdateBookings(updated);
    localStorage.setItem('sony_photography_bookings', JSON.stringify(updated));

    try {
      await saveBookingToDb(editingBooking);
    } catch (err) {
      console.error(err);
    }
    setEditingBooking(null);
  };

  // Handle Add New Offline Booking
  const handleCreateNewBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newMobile || !newDate) return;

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newId = `SPS-2026-${randomDigits}`;
    const remaining = Math.max(0, newPrice - newAdvance);

    const created: Booking = {
      id: newId,
      customerName: newCustName.trim(),
      brideName: newBride.trim() || 'Bride',
      groomName: newGroom.trim() || 'Groom',
      mobile: newMobile.trim(),
      whatsapp: newMobile.trim(),
      email: '',
      weddingDate: newDate,
      eventDate: newDate,
      eventType: newEventType,
      venue: newVenue.trim() || 'Sirhind Venue',
      city: 'Sirhind',
      selectedPackage: newPackage,
      packagePrice: Number(newPrice) || 0,
      numberOfEvents: newEventType.includes('2-Day') || newEventType.includes('Two-Day') ? 2 : 1,
      specialRequirements: 'Offline manual studio booking entry.',
      advancePayment: Number(newAdvance) || 0,
      remainingAmount: remaining,
      bookingNotes: 'Created directly from Admin portal.',
      status: newStatus,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updatedBookings = [created, ...bookings];
    onUpdateBookings(updatedBookings);
    localStorage.setItem('sony_photography_bookings', JSON.stringify(updatedBookings));

    try {
      await saveBookingToDb(created);
    } catch (err) {
      console.error(err);
    }

    // Reset fields
    setNewCustName('');
    setNewBride('');
    setNewGroom('');
    setNewMobile('');
    setNewDate('');
    setNewVenue('');
    setActiveTab('bookings');
  };

  // Export Bookings to JSON
  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(bookings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `Sony_Photography_Sirhind_Bookings_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      {/* Hidden printable element container for window.print() if printing from admin */}
      {viewingReceiptBooking && (
        <div className="hidden print:block fixed inset-0 bg-white z-[9999]">
          <PrintableReceipt booking={viewingReceiptBooking} />
        </div>
      )}

      {/* Main Admin Dialog Container */}
      <div className="bg-[#FDFBF7] rounded-3xl max-w-6xl w-full border border-[#EEDCC6] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto print:hidden">
        
        {/* ========================================================================= */}
        {/* 1. PASSWORD AUTHENTICATION SCREEN (WHEN LOCKED)                           */}
        {/* ========================================================================= */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-[#352516] text-[#C0A080] flex items-center justify-center border-2 border-[#C0A080]/60 shadow-xl">
              <Lock className="w-8 h-8 text-[#C0A080]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4B3621]/10 text-[#4B3621] text-xs font-bold uppercase tracking-widest mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C0A080]" />
                <span>Protected Studio Portal</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4B3621]">
                Admin Password Required
              </h2>
              <p className="text-xs text-[#5C4033] mt-2 leading-relaxed">
                Enter your Sony Photography Sirhind studio passcode to manage client bookings, financial receipts, and offline reservations.
              </p>
            </div>

            <form onSubmit={handleUnlockAdmin} className="w-full space-y-4">
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8D6E63]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter Admin Password..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError(null);
                  }}
                  className="w-full pl-10 pr-12 py-3 rounded-2xl bg-white border border-[#EEDCC6] text-sm text-[#4B3621] font-semibold focus:outline-none focus:ring-2 focus:ring-[#4B3621] shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-[#4B3621] transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passwordError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <div className="flex items-center justify-start text-xs text-[#5C4033] px-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#EEDCC6] text-[#4B3621] focus:ring-[#4B3621]"
                  />
                  <span>Remember login on this device</span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-3 rounded-2xl bg-[#F4EDE4] hover:bg-[#EEDCC6] text-[#4B3621] text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-2xl bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg border border-[#C0A080] cursor-pointer"
                >
                  <Unlock className="w-4 h-4 text-[#C0A080]" />
                  <span>Unlock Admin</span>
                </button>
              </div>
            </form>

            <div className="text-[11px] text-[#8D6E63] border-t border-[#EEDCC6] pt-4 w-full">
              Sony Photography Sirhind • Hotline: <span className="font-bold text-[#4B3621]">{STUDIO_INFO.phone1}</span>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* 2. AUTHENTICATED ADMIN DASHBOARD (UNLOCKED)                               */
          /* ========================================================================= */
          <>
            {/* Admin Header */}
            <div className="bg-[#352516] text-[#FDFBF7] p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#4B3621]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C0A080] text-[#352516] flex items-center justify-center font-bold shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-base sm:text-xl font-bold text-[#FDFBF7]">
                      SONY PHOTOGRAPHY SIRHIND — STUDIO ADMIN
                    </h2>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-950 text-green-300 text-[10px] font-bold border border-green-700">
                      <Check className="w-3 h-3" /> Authenticated
                    </span>
                  </div>
                  <p className="text-xs text-[#EEDCC6]/80">
                    Client Bookings, Advance Records, Invoices & Offline Orders
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportJSON}
                  className="px-3 py-1.5 rounded-lg bg-[#4B3621] hover:bg-[#5C4033] text-[#FDFBF7] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#C0A080]/30 cursor-pointer"
                  title="Backup Bookings data"
                >
                  <Download className="w-3.5 h-3.5 text-[#C0A080]" />
                  <span className="hidden sm:inline">Export Backup</span>
                </button>

                <button
                  onClick={handleLockAdmin}
                  className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-red-800 cursor-pointer"
                  title="Lock Admin Portal & Logout"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock Admin</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Tab Navigation (Calendar tab removed) */}
            <div className="bg-[#4B3621] px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-[#352516]">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'bookings'
                      ? 'bg-[#C0A080] text-[#352516] shadow-sm'
                      : 'text-[#FDFBF7] hover:bg-white/10'
                  }`}
                >
                  All Bookings ({bookings.length})
                </button>

                <button
                  onClick={() => setActiveTab('addBooking')}
                  className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'addBooking'
                      ? 'bg-[#C0A080] text-[#352516] shadow-sm'
                      : 'text-[#FDFBF7] hover:bg-white/10'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Offline Booking</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-[#C0A080] text-[#352516] shadow-sm'
                      : 'text-[#FDFBF7] hover:bg-white/10'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Password & Security</span>
                </button>
              </div>

              <div className="text-[#EEDCC6]/80 text-[11px] hidden md:block">
                Studio Hotline: {STUDIO_INFO.phone1}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* TAB 1: ALL BOOKINGS & INVOICES                                            */}
            {/* ========================================================================= */}
            {activeTab === 'bookings' && (
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4B3621]/60" />
                    <input
                      type="text"
                      placeholder="Search by client name, mobile, date, ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#EEDCC6] text-xs text-[#4B3621] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs text-[#4B3621]/70 font-semibold">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white border border-[#EEDCC6] text-xs text-[#4B3621] font-semibold focus:outline-none"
                    >
                      <option value="ALL">All Bookings</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="HOLD">Hold / Pending</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-white rounded-2xl border border-[#EEDCC6] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#F4EDE4] text-[#4B3621] border-b border-[#EEDCC6] font-bold uppercase text-[10px] tracking-wider">
                          <th className="p-3">Booking ID & Date</th>
                          <th className="p-3">Customer & Couple</th>
                          <th className="p-3">Contact</th>
                          <th className="p-3">Venue & City</th>
                          <th className="p-3">Package & Advance</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EEDCC6]/50">
                        {filteredBookings.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-[#4B3621]/60">
                              No bookings found matching your search.
                            </td>
                          </tr>
                        ) : (
                          filteredBookings.map((b) => (
                            <tr key={b.id} className="hover:bg-[#FDFBF7] transition-colors">
                              {/* ID & Date */}
                              <td className="p-3 whitespace-nowrap">
                                <div className="font-mono font-bold text-[#4B3621]">{b.id}</div>
                                <div className="text-[11px] font-semibold text-[#C0A080] mt-0.5">
                                  📅 {b.weddingDate}
                                </div>
                              </td>

                              {/* Customer & Couple */}
                              <td className="p-3">
                                <div className="font-bold text-[#4B3621]">{b.customerName}</div>
                                <div className="text-[11px] text-[#4B3621]/70">
                                  {b.brideName} & {b.groomName}
                                </div>
                              </td>

                              {/* Contact */}
                              <td className="p-3 whitespace-nowrap">
                                <div>📞 {b.mobile}</div>
                                {b.email && <div className="text-[10px] text-[#4B3621]/60">✉️ {b.email}</div>}
                              </td>

                              {/* Venue */}
                              <td className="p-3">
                                <div className="font-medium text-[#4B3621] line-clamp-1">{b.venue}</div>
                                <div className="text-[10px] text-[#C0A080]">{b.city}</div>
                              </td>

                              {/* Package & Payment */}
                              <td className="p-3 whitespace-nowrap">
                                <div className="font-semibold text-[#4B3621]">{b.selectedPackage}</div>
                                <div className="text-[11px]">
                                  Paid: <span className="font-bold text-green-700">₹{b.advancePayment.toLocaleString('en-IN')}</span> / Due: <span className="font-bold text-[#C0A080]">₹{b.remainingAmount.toLocaleString('en-IN')}</span>
                                </div>
                              </td>

                              {/* Status */}
                              <td className="p-3 whitespace-nowrap">
                                <select
                                  value={b.status}
                                  onChange={(e) => handleQuickStatusChange(b.id, e.target.value as BookingStatus)}
                                  className={`px-2 py-1 rounded-md text-[11px] font-bold border cursor-pointer ${
                                    b.status === 'CONFIRMED'
                                      ? 'bg-green-50 text-green-800 border-green-300'
                                      : b.status === 'HOLD'
                                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                                      : b.status === 'COMPLETED'
                                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                                      : 'bg-red-50 text-red-800 border-red-300'
                                  }`}
                                >
                                  <option value="CONFIRMED">CONFIRMED</option>
                                  <option value="HOLD">HOLD</option>
                                  <option value="COMPLETED">COMPLETED</option>
                                  <option value="CANCELLED">CANCELLED</option>
                                </select>
                              </td>

                              {/* Actions */}
                              <td className="p-3 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* Print Receipt */}
                                  <button
                                    onClick={() => {
                                      setViewingReceiptBooking(b);
                                      setTimeout(() => window.print(), 100);
                                    }}
                                    className="p-1.5 rounded-lg bg-[#FDFBF7] hover:bg-[#4B3621] text-[#4B3621] hover:text-white border border-[#EEDCC6] transition-colors cursor-pointer"
                                    title="Print A4 Receipt"
                                  >
                                    <Printer className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Edit Booking */}
                                  <button
                                    onClick={() => setEditingBooking(b)}
                                    className="p-1.5 rounded-lg bg-[#FDFBF7] hover:bg-[#4B3621] text-[#4B3621] hover:text-white border border-[#EEDCC6] transition-colors cursor-pointer"
                                    title="Edit Booking Details"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Delete Booking */}
                                  <button
                                    onClick={() => promptDeleteBooking(b)}
                                    className="p-1.5 rounded-lg bg-[#FEF2F2] hover:bg-red-600 text-red-700 hover:text-white border border-red-200 transition-colors cursor-pointer"
                                    title="Delete Booking"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: ADD OFFLINE MANUAL BOOKING                                         */}
            {/* ========================================================================= */}
            {activeTab === 'addBooking' && (
              <div className="p-6 overflow-y-auto flex-1">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 border border-[#EEDCC6] shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#4B3621] mb-4">
                    Enter In-Studio / Offline Walk-In Booking
                  </h3>
                  <form onSubmit={handleCreateNewBooking} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-[#4B3621] mb-1">Customer Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Customer name"
                          value={newCustName}
                          onChange={(e) => setNewCustName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-[#4B3621] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#4B3621] mb-1">Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit mobile"
                          value={newMobile}
                          onChange={(e) => setNewMobile(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-[#4B3621] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-[#4B3621] mb-1">Bride Name</label>
                        <input
                          type="text"
                          placeholder="Bride name"
                          value={newBride}
                          onChange={(e) => setNewBride(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-[#4B3621] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#4B3621] mb-1">Groom Name</label>
                        <input
                          type="text"
                          placeholder="Groom name"
                          value={newGroom}
                          onChange={(e) => setNewGroom(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-[#4B3621] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-[#4B3621] mb-1">Wedding Date *</label>
                        <input
                          type="date"
                          required
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-[#4B3621] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#4B3621] mb-1">Venue Name</label>
                        <input
                          type="text"
                          placeholder="Venue / Gurdwara / Palace"
                          value={newVenue}
                          onChange={(e) => setNewVenue(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-[#4B3621] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-[#4B3621] mb-1">Package</label>
                        <select
                          value={newPackage}
                          onChange={(e) => {
                            setNewPackage(e.target.value);
                            const match = PACKAGES_DATA.find((p) => p.name === e.target.value);
                            if (match) setNewPrice(match.price);
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-[#4B3621] focus:outline-none"
                        >
                          {PACKAGES_DATA.map((p) => (
                            <option key={p.id} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-[#4B3621] mb-1">Total Price (₹)</label>
                        <input
                          type="number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-[#4B3621] focus:outline-none font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#4B3621] mb-1">Advance Received (₹)</label>
                        <input
                          type="number"
                          value={newAdvance}
                          onChange={(e) => setNewAdvance(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-[#15803D] focus:outline-none font-bold"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] font-bold text-xs uppercase tracking-wider transition-colors shadow-md mt-4 border border-[#C0A080] cursor-pointer"
                    >
                      Save Offline Booking & Generate ID
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: PASSWORD & SECURITY SETTINGS                                       */}
            {/* ========================================================================= */}
            {activeTab === 'settings' && (
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {/* Change Password Form */}
                  <div className="bg-white rounded-2xl p-6 border border-[#EEDCC6] shadow-sm space-y-4">
                    <div className="flex items-center gap-2">
                      <Key className="w-5 h-5 text-[#C0A080]" />
                      <h3 className="text-sm font-bold text-[#4B3621]">
                        Change Master Admin Password
                      </h3>
                    </div>
                    <p className="text-xs text-[#5C4033]">
                      Update the passcode used to protect your studio admin portal on this system.
                    </p>

                    <form onSubmit={handleChangePasswordSubmit} className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-[#4B3621] mb-1">Current Password *</label>
                        <input
                          type="password"
                          required
                          placeholder="Enter current password"
                          value={currPass}
                          onChange={(e) => setCurrPass(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-[#4B3621] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#4B3621] mb-1">New Password *</label>
                        <input
                          type="password"
                          required
                          placeholder="Enter new password"
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-[#4B3621] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#4B3621] mb-1">Confirm New Password *</label>
                        <input
                          type="password"
                          required
                          placeholder="Confirm new password"
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-[#4B3621] focus:outline-none"
                        />
                      </div>

                      {changePassStatus?.error && (
                        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{changePassStatus.error}</span>
                        </div>
                      )}

                      {changePassStatus?.success && (
                        <div className="p-2.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>{changePassStatus.success}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] font-bold text-xs uppercase tracking-wider transition-all border border-[#C0A080] cursor-pointer"
                      >
                        Update Master Password
                      </button>
                    </form>
                  </div>

                  {/* Cloud Database & Studio System Info */}
                  <div className="bg-white rounded-2xl p-6 border border-[#EEDCC6] shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-[#C0A080]" />
                        <h3 className="text-sm font-bold text-[#4B3621]">
                          Cloud Storage & Backup Tools
                        </h3>
                      </div>
                      <p className="text-xs text-[#5C4033]">
                        Your booking records and client invoices are safely synchronized with Cloud Firestore database.
                      </p>

                      <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#EEDCC6] space-y-1.5 text-xs text-[#4B3621]">
                        <div className="flex justify-between">
                          <span className="text-[#8D6E63]">Database Project:</span>
                          <span className="font-mono font-bold">{FIREBASE_PROJECT_ID}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8D6E63]">Total Active Bookings:</span>
                          <span className="font-bold">{bookings.length} clients</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8D6E63]">Studio Master Hotline:</span>
                          <span className="font-bold">{STUDIO_INFO.phone1}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      {onOpenDatabase && (
                        <button
                          onClick={onOpenDatabase}
                          className="w-full py-2.5 rounded-xl bg-[#352516] hover:bg-[#2A1D11] text-[#C0A080] font-bold text-xs flex items-center justify-center gap-2 border border-[#C0A080]/60 cursor-pointer"
                        >
                          <Database className="w-4 h-4" />
                          <span>Open Full DB Inspector Tool</span>
                        </button>
                      )}

                      <button
                        onClick={promptResetData}
                        className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs flex items-center justify-center gap-2 border border-gray-300 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4 text-gray-600" />
                        <span>Restore Demo Studio Records</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Booking Sub-modal */}
      {editingBooking && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full p-6 border border-[#EEDCC6] shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-[#EEDCC6] mb-4">
              <h3 className="font-bold text-sm text-[#4B3621]">Edit Booking: {editingBooking.id}</h3>
              <button onClick={() => setEditingBooking(null)} className="p-1 rounded hover:bg-[#F4EDE4] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#4B3621] mb-1">Customer Name</label>
                <input
                  type="text"
                  value={editingBooking.customerName}
                  onChange={(e) => setEditingBooking({ ...editingBooking, customerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#EEDCC6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#4B3621] mb-1">Mobile</label>
                  <input
                    type="tel"
                    value={editingBooking.mobile}
                    onChange={(e) => setEditingBooking({ ...editingBooking, mobile: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EEDCC6]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#4B3621] mb-1">Wedding Date</label>
                  <input
                    type="date"
                    value={editingBooking.weddingDate}
                    onChange={(e) => setEditingBooking({ ...editingBooking, weddingDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EEDCC6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#4B3621] mb-1">Advance Paid (₹)</label>
                  <input
                    type="number"
                    value={editingBooking.advancePayment}
                    onChange={(e) => {
                      const adv = Number(e.target.value);
                      const rem = Math.max(0, editingBooking.packagePrice - adv);
                      setEditingBooking({ ...editingBooking, advancePayment: adv, remainingAmount: rem });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EEDCC6] font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#4B3621] mb-1">Status</label>
                  <select
                    value={editingBooking.status}
                    onChange={(e) => setEditingBooking({ ...editingBooking, status: e.target.value as BookingStatus })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EEDCC6] font-bold"
                  >
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="HOLD">HOLD</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#4B3621] mb-1">Booking Notes</label>
                <textarea
                  rows={2}
                  value={editingBooking.bookingNotes}
                  onChange={(e) => setEditingBooking({ ...editingBooking, bookingNotes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#EEDCC6]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingBooking(null)}
                  className="px-4 py-2 rounded-xl bg-[#F4EDE4] text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#4B3621] text-white text-xs font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-app Confirmation Dialog for Deletions and Reset */}
      {confirmTarget && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#EEDCC6] shadow-2xl space-y-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  confirmTarget.type === 'reset'
                    ? 'bg-[#4B3621] text-[#C0A080]'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {confirmTarget.type === 'reset' ? (
                  <RotateCcw className="w-6 h-6" />
                ) : (
                  <Trash2 className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#4B3621]">
                  {confirmTarget.title}
                </h3>
                {confirmTarget.subtitle && (
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {confirmTarget.subtitle}
                  </p>
                )}
                <p className="text-[11px] text-red-600 font-semibold mt-2">
                  {confirmTarget.type === 'reset'
                    ? 'This will restore sample demo records in both local cache and database.'
                    : 'This action will permanently delete this record from Cloud Firestore and local storage.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmTarget(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteConfirmed}
                className={`px-5 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-md cursor-pointer ${
                  confirmTarget.type === 'reset'
                    ? 'bg-[#4B3621] hover:bg-[#352516]'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {confirmTarget.type === 'reset' ? 'Yes, Reset' : 'Yes, Delete Record'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
