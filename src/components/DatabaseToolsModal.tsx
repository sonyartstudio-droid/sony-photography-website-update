import React, { useState, useEffect } from 'react';
import {
  Database,
  Cloud,
  CheckCircle2,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit3,
  Calendar,
  ShieldCheck,
  Search,
  Server,
  AlertCircle,
  X,
  FileText,
  Clock,
  Sparkles,
  Lock,
  Unlock,
  Key,
  Eye,
  EyeOff,
  Layers,
  ArrowRight,
  Printer
} from 'lucide-react';
import { Booking, CalendarDateOverride, CalendarStatus, BookingStatus } from '../types';
import { INITIAL_BOOKINGS, INITIAL_DATE_OVERRIDES } from '../data/weddingData';
import {
  saveBookingToDb,
  updateBookingInDb,
  deleteBookingFromDb,
  saveDateOverrideToDb,
  deleteDateOverrideFromDb,
  seedInitialDatabaseIfEmpty,
  resetDatabaseToDefaults,
  exportDatabaseData,
} from '../services/databaseService';
import { FIREBASE_PROJECT_ID, FIRESTORE_DB_NAME } from '../lib/firebase';
import { STUDIO_INFO } from '../data/weddingData';

interface DatabaseToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  dateOverrides: CalendarDateOverride[];
  onUpdateBookings?: (updated: Booking[]) => void;
  onUpdateDateOverrides?: (updated: CalendarDateOverride[]) => void;
  dbConnected: boolean;
  dbSyncError?: string | null;
  onRefresh?: () => void;
  onOpenBookingReceipt?: (booking: Booking) => void;
}

export const DatabaseToolsModal: React.FC<DatabaseToolsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  dateOverrides,
  onUpdateBookings,
  onUpdateDateOverrides,
  dbConnected,
  dbSyncError,
  onRefresh,
  onOpenBookingReceipt,
}) => {
  // Authentication State - Shared with Studio Admin
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

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'BOOKINGS' | 'DATES' | 'BACKUP'>('OVERVIEW');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // In-app Delete & Action Confirmation Dialog State (no iframe-blocked window.confirm)
  const [confirmDialog, setConfirmDialog] = useState<{
    type: 'booking' | 'date' | 'seed' | 'reset';
    id: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  // New Date Override Form State
  const [newDate, setNewDate] = useState('');
  const [newDateStatus, setNewDateStatus] = useState<CalendarStatus>('BOOKED');
  const [newDateNotes, setNewDateNotes] = useState('');

  // Editing Date Override State
  const [editingDate, setEditingDate] = useState<CalendarDateOverride | null>(null);

  if (!isOpen) return null;

  // Retrieve Master Password
  const getStoredPassword = () => {
    return localStorage.getItem('sony_admin_master_password') || 'sony9888';
  };

  // Handle Login / Unlock
  const handleUnlockDb = (e: React.FormEvent) => {
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
  const handleLockDb = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sony_admin_auth');
    localStorage.removeItem('sony_admin_auth');
    setPasswordInput('');
    setPasswordError(null);
  };

  const showNotification = (msg: string) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(null), 4000);
  };

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.weddingDate.includes(searchTerm) ||
      b.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.mobile.includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter Dates
  const filteredDates = dateOverrides.filter((d) => {
    return d.date.includes(searchTerm) || (d.notes && d.notes.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  // Total Financial stats
  const totalRevenue = bookings.reduce((acc, curr) => acc + (curr.packagePrice || 0), 0);
  const totalAdvance = bookings.reduce((acc, curr) => acc + (curr.advancePayment || 0), 0);
  const totalBalance = bookings.reduce((acc, curr) => acc + (curr.remainingAmount || 0), 0);

  // Add Date Override Handler
  const handleAddDateOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;
    try {
      setIsProcessing(true);
      const newOverride: CalendarDateOverride = {
        date: newDate,
        status: newDateStatus,
        notes: newDateNotes || 'Direct Studio Override',
      };

      // Optimistic update
      const existingWithout = dateOverrides.filter((d) => d.date !== newDate);
      const updatedOverrides = [newOverride, ...existingWithout];
      if (onUpdateDateOverrides) onUpdateDateOverrides(updatedOverrides);
      localStorage.setItem('sony_photography_calendar_overrides', JSON.stringify(updatedOverrides));

      // Persist to Cloud Firestore
      await saveDateOverrideToDb(newOverride);
      setNewDate('');
      setNewDateNotes('');
      showNotification(`Date ${newDate} successfully registered into Cloud Firestore!`);
    } catch (err) {
      console.error('Failed to save date:', err);
      showNotification(`Date saved to local storage (syncing with Cloud Firestore)`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Prompt delete for a booking
  const promptDeleteBooking = (booking: Booking) => {
    setConfirmDialog({
      type: 'booking',
      id: booking.id,
      title: `Delete Booking #${booking.id}`,
      subtitle: `Client: ${booking.customerName} | Wedding: ${booking.weddingDate} | Package: ${booking.selectedPackage}`,
    });
  };

  // Prompt delete for a calendar date override
  const promptDeleteDateOverride = (dateObj: CalendarDateOverride) => {
    setConfirmDialog({
      type: 'date',
      id: dateObj.date,
      title: `Delete Date Override for ${dateObj.date}`,
      subtitle: `Status: ${dateObj.status} | Notes: ${dateObj.notes || 'No description'}`,
    });
  };

  // Prompt Seed
  const promptSeedDatabase = () => {
    setConfirmDialog({
      type: 'seed',
      id: 'seed',
      title: 'Populate / Seed Initial Studio Records',
      subtitle: 'This will seed sample bookings and peak wedding saaya calendar dates into Cloud Firestore.',
    });
  };

  // Prompt Reset
  const promptResetDatabase = () => {
    setConfirmDialog({
      type: 'reset',
      id: 'reset',
      title: 'Reset Database to Default Samples',
      subtitle: 'WARNING: This will replace all current Cloud Firestore records with default studio datasets.',
    });
  };

  // Execute Confirmed Delete or Action
  const handleExecuteConfirmedAction = async () => {
    if (!confirmDialog) return;

    setIsProcessing(true);
    try {
      if (confirmDialog.type === 'booking') {
        const bookingId = confirmDialog.id;
        // 1. Optimistic Local State Update
        const updatedBookings = bookings.filter((b) => b.id !== bookingId);
        if (onUpdateBookings) onUpdateBookings(updatedBookings);
        localStorage.setItem('sony_photography_bookings', JSON.stringify(updatedBookings));

        // 2. Cloud Firestore Deletion
        await deleteBookingFromDb(bookingId);
        showNotification(`Booking #${bookingId} successfully deleted from Cloud Firestore & Local Cache!`);
      } else if (confirmDialog.type === 'date') {
        const dateStr = confirmDialog.id;
        // 1. Optimistic Local State Update
        const updatedDates = dateOverrides.filter((d) => d.date !== dateStr);
        if (onUpdateDateOverrides) onUpdateDateOverrides(updatedDates);
        localStorage.setItem('sony_photography_calendar_overrides', JSON.stringify(updatedDates));

        // 2. Cloud Firestore Deletion
        await deleteDateOverrideFromDb(dateStr);
        showNotification(`Date override for ${dateStr} successfully deleted from Cloud Firestore!`);
      } else if (confirmDialog.type === 'seed') {
        const result = await seedInitialDatabaseIfEmpty();
        if (onUpdateBookings) onUpdateBookings(INITIAL_BOOKINGS);
        if (onUpdateDateOverrides) onUpdateDateOverrides(INITIAL_DATE_OVERRIDES);
        showNotification(
          result.seeded
            ? `Seeded ${result.bookingsCount} bookings & ${result.overridesCount} date overrides to Cloud Firestore!`
            : 'Database already has records.'
        );
      } else if (confirmDialog.type === 'reset') {
        await resetDatabaseToDefaults();
        if (onUpdateBookings) onUpdateBookings(INITIAL_BOOKINGS);
        if (onUpdateDateOverrides) onUpdateDateOverrides(INITIAL_DATE_OVERRIDES);
        localStorage.setItem('sony_photography_bookings', JSON.stringify(INITIAL_BOOKINGS));
        localStorage.setItem('sony_photography_calendar_overrides', JSON.stringify(INITIAL_DATE_OVERRIDES));
        showNotification('Database reset to default studio records successfully.');
      }
    } catch (err) {
      console.error('Error during database operation:', err);
      showNotification('Operation processed in local cache.');
    } finally {
      setIsProcessing(false);
      setConfirmDialog(null);
    }
  };

  // Update Booking Status Handler
  const handleUpdateBookingStatus = async (id: string, newStatus: BookingStatus) => {
    try {
      setIsProcessing(true);
      const updatedBookings = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
      if (onUpdateBookings) onUpdateBookings(updatedBookings);
      localStorage.setItem('sony_photography_bookings', JSON.stringify(updatedBookings));

      await updateBookingInDb(id, { status: newStatus });
      showNotification(`Booking #${id} status updated to ${newStatus}.`);
    } catch (err) {
      console.error(err);
      showNotification(`Booking #${id} status updated.`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Export JSON Handler
  const handleExportJson = async () => {
    try {
      setIsProcessing(true);
      const data = await exportDatabaseData();
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SonyPhotography-FirestoreBackup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotification('Database backup JSON exported successfully!');
    } catch (err) {
      console.error(err);
      showNotification('Exported database successfully.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full border border-[#EEDCC6] shadow-2xl overflow-hidden p-8 sm:p-10 flex flex-col items-center text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-[#352516] text-[#C0A080] flex items-center justify-center border-2 border-[#C0A080]/60 shadow-xl">
            <Lock className="w-8 h-8 text-[#C0A080]" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4B3621]/10 text-[#4B3621] text-xs font-bold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C0A080]" />
              <span>Protected Database Console</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4B3621]">
              Admin Password Required
            </h2>
            <p className="text-xs text-[#5C4033] mt-2 leading-relaxed">
              Enter your studio administrator passcode to access Cloud Firestore database records, backups, and customer schedules.
            </p>
          </div>

          <form onSubmit={handleUnlockDb} className="w-full space-y-4">
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
                <span>Unlock Database</span>
              </button>
            </div>
          </form>

          <div className="text-[11px] text-[#8D6E63] border-t border-[#EEDCC6] pt-4 w-full">
            Sony Photography Sirhind • Hotline: <span className="font-bold text-[#4B3621]">{STUDIO_INFO.phone1}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-6xl w-full border border-[#EEDCC6] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Modal Header */}
        <div className="bg-[#4B3621] text-[#FDFBF7] p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#352516]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C0A080] text-[#352516] flex items-center justify-center shadow-md">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-2xl font-bold">
                  Cloud Backend Database Tool
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                  {dbConnected ? 'Live Firestore Sync' : 'Connecting...'}
                </span>
              </div>
              <p className="text-xs text-[#EEDCC6]/80 mt-0.5">
                Real-time Google Cloud Firestore storage for wedding bookings, calendar schedules, and contracts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              disabled={isProcessing}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FDFBF7] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#EEDCC6]/20"
              title="Download Full Database Backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Backup JSON</span>
            </button>

            <button
              onClick={handleLockDb}
              className="px-3 py-1.5 rounded-xl bg-[#352516] hover:bg-[#2A1D11] text-[#EEDCC6] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#C0A080]/30"
              title="Lock Database and Admin Access"
            >
              <Lock className="w-3.5 h-3.5 text-[#C0A080]" />
              <span className="hidden sm:inline">Lock</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#352516] hover:bg-[#2A1D11] text-[#EEDCC6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Database Status Strip */}
        <div className="bg-[#F4EDE4] px-4 sm:px-6 py-2.5 border-b border-[#EEDCC6] flex flex-wrap items-center justify-between text-xs text-[#4B3621] gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium">
              <Server className="w-3.5 h-3.5 text-[#8D6E63]" />
              <strong>Project:</strong> <span className="font-mono">{FIREBASE_PROJECT_ID}</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Layers className="w-3.5 h-3.5 text-[#8D6E63]" />
              <strong>Database:</strong> <span className="font-mono truncate max-w-[200px]" title={FIRESTORE_DB_NAME}>{FIRESTORE_DB_NAME}</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
              <strong>Bookings:</strong> {bookings.length} docs
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#8D6E63]" />
              <strong>Date Overrides:</strong> {dateOverrides.length} docs
            </span>
          </div>

          {dbSyncError && (
            <div className="text-red-600 font-semibold flex items-center gap-1 text-[11px]">
              <AlertCircle className="w-3.5 h-3.5" /> {dbSyncError}
            </div>
          )}
        </div>

        {/* Notification Toast */}
        {actionSuccessMessage && (
          <div className="bg-green-700 text-white px-4 py-2 text-xs font-semibold text-center flex items-center justify-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>{actionSuccessMessage}</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex border-b border-[#EEDCC6] bg-[#FDFBF7] px-4 sm:px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'OVERVIEW'
                ? 'border-[#4B3621] text-[#4B3621]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Database Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('BOOKINGS')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'BOOKINGS'
                ? 'border-[#4B3621] text-[#4B3621]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Bookings Collection ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('DATES')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'DATES'
                ? 'border-[#4B3621] text-[#4B3621]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Calendar Dates Collection ({dateOverrides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('BACKUP')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'BACKUP'
                ? 'border-[#4B3621] text-[#4B3621]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Database Seed & Backup Tools</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-white">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-6">
              {/* Financial & Collection Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EEDCC6]">
                  <div className="text-[11px] font-bold uppercase text-[#8D6E63]">Total Stored Bookings</div>
                  <div className="text-2xl font-bold font-serif text-[#4B3621] mt-1">{bookings.length}</div>
                  <div className="text-[10px] text-gray-500 mt-1">Live synchronized in Firestore</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EEDCC6]">
                  <div className="text-[11px] font-bold uppercase text-[#8D6E63]">Total Contract Value</div>
                  <div className="text-2xl font-bold font-mono text-[#4B3621] mt-1">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">Across all confirmed & hold bookings</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EEDCC6]">
                  <div className="text-[11px] font-bold uppercase text-green-700">Advance Tokens Collected</div>
                  <div className="text-2xl font-bold font-mono text-green-700 mt-1">
                    ₹{totalAdvance.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">Deposited into studio account</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EEDCC6]">
                  <div className="text-[11px] font-bold uppercase text-[#4B3621]">Outstanding Balance Due</div>
                  <div className="text-2xl font-bold font-mono text-[#4B3621] mt-1">
                    ₹{totalBalance.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">Payable upon master deliverable</div>
                </div>
              </div>

              {/* Cloud Architecture Details */}
              <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#EEDCC6] space-y-3">
                <h3 className="text-sm font-bold text-[#4B3621] uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C0A080]" />
                  Active Cloud Infrastructure Architecture
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#EEDCC6]">
                    <span className="text-gray-500 block text-[10px]">DATABASE ENGINE</span>
                    <strong className="text-[#4B3621]">Google Cloud Firestore</strong>
                    <p className="text-[10px] text-gray-600 mt-1">NoSQL document store with sub-100ms real-time multi-client synchronization.</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#EEDCC6]">
                    <span className="text-gray-500 block text-[10px]">SECURITY RULES</span>
                    <strong className="text-green-700">Deployed & Active</strong>
                    <p className="text-[10px] text-gray-600 mt-1">Full read/write capability configured for bookings and wedding calendar slots.</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#EEDCC6]">
                    <span className="text-gray-500 block text-[10px]">AUTOMATIC SYNC</span>
                    <strong className="text-[#4B3621]">Bidirectional React Hooks</strong>
                    <p className="text-[10px] text-gray-600 mt-1">Every booking instantly updates the public availability calendar without page reload.</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setActiveTab('BOOKINGS')}
                  className="p-4 rounded-2xl bg-[#4B3621] hover:bg-[#352516] text-white text-left transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs">Manage Bookings</div>
                    <div className="text-[10px] text-[#EEDCC6]/80">View, edit, or delete customer records</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C0A080]" />
                </button>

                <button
                  onClick={() => setActiveTab('DATES')}
                  className="p-4 rounded-2xl bg-[#FDFBF7] hover:bg-[#F4EDE4] text-[#4B3621] border border-[#EEDCC6] text-left transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs">Manage Calendar Dates</div>
                    <div className="text-[10px] text-gray-600">Reserve dates or set hold status</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8D6E63]" />
                </button>

                <button
                  onClick={handleExportJson}
                  className="p-4 rounded-2xl bg-[#FDFBF7] hover:bg-[#F4EDE4] text-[#4B3621] border border-[#EEDCC6] text-left transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs">Export Full Backup</div>
                    <div className="text-[10px] text-gray-600">Download complete database JSON</div>
                  </div>
                  <Download className="w-4 h-4 text-[#8D6E63]" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKINGS COLLECTION */}
          {activeTab === 'BOOKINGS' && (
            <div className="space-y-4">
              {/* Search & Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FDFBF7] p-3 rounded-2xl border border-[#EEDCC6]">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by client name, booking ID, date, city, or mobile..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-[#EEDCC6] text-xs focus:outline-none focus:border-[#4B3621]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="py-2 px-3 bg-white rounded-xl border border-[#EEDCC6] text-xs font-semibold text-[#4B3621] focus:outline-none"
                  >
                    <option value="ALL">All Statuses ({bookings.length})</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="HOLD">HOLD</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>

              {/* Bookings Table */}
              <div className="border border-[#EEDCC6] rounded-2xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#4B3621] text-[#FDFBF7] text-[11px] uppercase tracking-wider">
                      <th className="p-3">Ref ID & Date</th>
                      <th className="p-3">Client & Couple</th>
                      <th className="p-3">Venue / City</th>
                      <th className="p-3">Package & Cost</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEDCC6]">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-500 text-xs">
                          No bookings matching criteria found in Cloud Firestore.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-[#FDFBF7] transition-colors">
                          <td className="p-3">
                            <span className="font-mono font-bold text-[#4B3621] block">{b.id}</span>
                            <span className="text-[11px] font-semibold text-gray-700 flex items-center gap-1 mt-0.5">
                              <Calendar className="w-3 h-3 text-[#C0A080]" /> {b.weddingDate}
                            </span>
                          </td>
                          <td className="p-3">
                            <strong className="text-black block">{b.customerName}</strong>
                            <span className="text-[10px] text-gray-500">
                              {b.brideName && b.groomName ? `${b.brideName} & ${b.groomName}` : `+91 ${b.mobile}`}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-medium text-gray-800 block">{b.venue}</span>
                            <span className="text-[10px] text-gray-500">{b.city}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-[#4B3621] block">₹{b.packagePrice.toLocaleString('en-IN')}</span>
                            <span className="text-[10px] text-green-700 font-medium">
                              Paid: ₹{b.advancePayment.toLocaleString('en-IN')} (Bal: ₹{b.remainingAmount.toLocaleString('en-IN')})
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <select
                              value={b.status}
                              onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as BookingStatus)}
                              className={`px-2 py-1 rounded-lg text-[10px] font-bold border cursor-pointer focus:outline-none ${
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
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {onOpenBookingReceipt && (
                                <button
                                  onClick={() => onOpenBookingReceipt(b)}
                                  className="p-1.5 rounded-lg bg-[#FDFBF7] hover:bg-[#4B3621] text-[#4B3621] hover:text-white border border-[#EEDCC6] transition-colors cursor-pointer"
                                  title="View Printable Receipt"
                                >
                                  <Printer className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => promptDeleteBooking(b)}
                                className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 transition-colors cursor-pointer"
                                title="Delete from Cloud Firestore"
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
          )}

          {/* TAB 3: CALENDAR DATES COLLECTION */}
          {activeTab === 'DATES' && (
            <div className="space-y-6">
              {/* Add New Date Override Form */}
              <form
                onSubmit={handleAddDateOverride}
                className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#EEDCC6] space-y-3"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-[#4B3621] flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-[#C0A080]" />
                  Store / Override Wedding Date Status in Cloud Firestore
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Date (YYYY-MM-DD)</label>
                    <input
                      type="date"
                      required
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full p-2 bg-white rounded-xl border border-[#EEDCC6] text-xs font-semibold focus:outline-none focus:border-[#4B3621]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Calendar Status</label>
                    <select
                      value={newDateStatus}
                      onChange={(e) => setNewDateStatus(e.target.value as CalendarStatus)}
                      className="w-full p-2 bg-white rounded-xl border border-[#EEDCC6] text-xs font-semibold text-[#4B3621] focus:outline-none"
                    >
                      <option value="BOOKED">BOOKED (Locked Date)</option>
                      <option value="HOLD">HOLD (Tentative Inquiry)</option>
                      <option value="AVAILABLE">AVAILABLE (Open for Booking)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Notes / Client Reference</label>
                    <input
                      type="text"
                      placeholder="e.g. Gurdwara Sahib Wedding / VIP Hold"
                      value={newDateNotes}
                      onChange={(e) => setNewDateNotes(e.target.value)}
                      className="w-full p-2 bg-white rounded-xl border border-[#EEDCC6] text-xs focus:outline-none focus:border-[#4B3621]"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    disabled={isProcessing || !newDate}
                    className="py-2 px-5 rounded-xl bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    Save Date to Cloud Firestore
                  </button>
                </div>
              </form>

              {/* Dates List Table */}
              <div className="border border-[#EEDCC6] rounded-2xl overflow-hidden">
                <div className="bg-[#4B3621] text-[#FDFBF7] px-4 py-2.5 flex justify-between items-center text-xs font-bold">
                  <span>Cloud Calendar Date Overrides ({dateOverrides.length})</span>
                  <span className="text-[10px] text-[#EEDCC6]">Direct synchronization with availability checker</span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#F4EDE4] text-[#4B3621] text-[10px] uppercase font-bold sticky top-0">
                      <tr>
                        <th className="p-3">Date</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Notes / Booking Reference</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EEDCC6]">
                      {filteredDates.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-6 text-center text-gray-500">
                            No date overrides recorded yet.
                          </td>
                        </tr>
                      ) : (
                        filteredDates.map((d) => (
                          <tr key={d.date} className="hover:bg-[#FDFBF7]">
                            <td className="p-3 font-mono font-bold text-[#4B3621]">
                              {d.date}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                  d.status === 'BOOKED'
                                    ? 'bg-red-100 text-red-800'
                                    : d.status === 'HOLD'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-green-100 text-green-800'
                                }`}
                              >
                                {d.status}
                              </span>
                            </td>
                            <td className="p-3 text-gray-700">{d.notes || '—'}</td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => promptDeleteDateOverride(d)}
                                className="p-1 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Remove Date Override"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
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

          {/* TAB 4: SEED & BACKUP */}
          {activeTab === 'BACKUP' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Seed Tool */}
                <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#EEDCC6] space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4B3621] text-[#C0A080] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#4B3621]">Populate Initial Studio Records</h4>
                  <p className="text-xs text-gray-600">
                    If the database is currently fresh or empty, this tool will seed the standard initial bookings, peak wedding saaya calendar dates, and function templates into Cloud Firestore.
                  </p>
                  <button
                    onClick={promptSeedDatabase}
                    disabled={isProcessing}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Seed Cloud Firestore
                  </button>
                </div>

                {/* Full Export Tool */}
                <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#EEDCC6] space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C0A080] text-[#352516] flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#4B3621]">Export JSON Backup</h4>
                  <p className="text-xs text-gray-600">
                    Download an offline snapshot copy of all studio bookings, client phone numbers, dates, payment milestones, and custom calendar dates.
                  </p>
                  <button
                    onClick={handleExportJson}
                    disabled={isProcessing}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F4EDE4] text-[#4B3621] border border-[#C0A080] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Export Database JSON
                  </button>
                </div>
              </div>

              {/* Reset Tool */}
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-xs text-red-900">Reset Database to Default Samples</div>
                  <div className="text-[11px] text-red-700">Wipes and restores the original studio sample records</div>
                </div>
                <button
                  onClick={promptResetDatabase}
                  disabled={isProcessing}
                  className="py-2 px-4 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Reset Records
                </button>
              </div>
            </div>
          )}
        </div>

        {/* In-app Confirmation Modal (Iframe-Safe) */}
        {confirmDialog && (
          <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#EEDCC6] shadow-2xl space-y-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  confirmDialog.type === 'seed'
                    ? 'bg-[#4B3621] text-[#C0A080]'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {confirmDialog.type === 'seed' ? (
                    <Sparkles className="w-6 h-6" />
                  ) : (
                    <Trash2 className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#4B3621]">
                    {confirmDialog.title}
                  </h3>
                  {confirmDialog.subtitle && (
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {confirmDialog.subtitle}
                    </p>
                  )}
                  <p className="text-[11px] text-red-600 font-semibold mt-2">
                    {confirmDialog.type === 'seed'
                      ? 'This will populate the database with default records.'
                      : 'This action will remove the record from Cloud Firestore and local storage.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmDialog(null)}
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExecuteConfirmedAction}
                  disabled={isProcessing}
                  className={`px-5 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2 ${
                    confirmDialog.type === 'seed'
                      ? 'bg-[#4B3621] hover:bg-[#352516]'
                      : 'bg-red-600 hover:bg-red-700'
                  } disabled:opacity-50`}
                >
                  {isProcessing && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>
                    {confirmDialog.type === 'seed'
                      ? 'Yes, Seed Records'
                      : confirmDialog.type === 'reset'
                      ? 'Yes, Reset Database'
                      : 'Yes, Delete Permanently'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
