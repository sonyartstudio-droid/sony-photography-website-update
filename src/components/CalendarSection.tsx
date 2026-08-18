import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, XCircle, AlertCircle, Sparkles, MessageCircle, ArrowRight, ShieldCheck, Printer, FileCheck, Database } from 'lucide-react';
import { CalendarDateOverride, CalendarStatus } from '../types';
import { STUDIO_INFO } from '../data/weddingData';

interface CalendarSectionProps {
  dateOverrides: CalendarDateOverride[];
  onSelectDateForBooking: (dateStr: string) => void;
  onOpenAdmin: () => void;
  onOpenDatabase?: () => void;
  onOpenDateConfirmation?: (dateStr: string, status: CalendarStatus, notes?: string) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  dateOverrides,
  onSelectDateForBooking,
  onOpenAdmin,
  onOpenDatabase,
  onOpenDateConfirmation,
}) => {
  // Current displayed month & year
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026 as starting active season
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-09-15');

  // Month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to format date YYYY-MM-DD
  const formatDateKey = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  // Get status for a date
  const getDateStatus = (dateKey: string): { status: CalendarStatus; notes?: string } => {
    const match = dateOverrides.find((o) => o.date === dateKey);
    if (match) {
      return { status: match.status, notes: match.notes };
    }
    return { status: 'AVAILABLE' };
  };

  // Days in month calculation
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun

  const daysArray = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  // Selected date info
  const selectedInfo = getDateStatus(selectedDateStr);

  const getReadableSelectedDate = (dateKey: string) => {
    try {
      const [y, m, d] = dateKey.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateKey;
    }
  };

  const whatsappInquiryMessage1 = (dateKey: string) =>
    encodeURIComponent(
      `Hello Sony Sirhind (9888469940), I am checking date availability on your calendar for ${dateKey} (${getReadableSelectedDate(dateKey)}). Is our wedding date open for reservation?`
    );

  const whatsappInquiryMessage2 = (dateKey: string) =>
    encodeURIComponent(
      `Hello Booking Desk (9988063786), I would like to inquire about wedding cinematography availability on ${dateKey}.`
    );

  return (
    <section id="calendar" className="py-24 bg-[#FDFBF7] border-b border-[#EEDCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#8D6E63] uppercase mb-3">
            <Sparkles className="w-4 h-4 text-[#C0A080]" />
            <span>Real-Time Calendar & Date Confirmation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4B3621] mb-4">
            Wedding Booking Calendar
          </h2>
          <p className="text-base sm:text-lg text-[#5C4033] leading-relaxed">
            Check date availability in real-time before booking. We maintain single-event focus on peak Saaya dates to ensure unmatched cinematography standards for every wedding.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 p-3 bg-white rounded-2xl border border-[#EEDCC6] inline-flex shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-[#15803D]">
              <span className="w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-white shadow-sm" />
              <span>🟢 AVAILABLE</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#B91C1C]">
              <span className="w-3.5 h-3.5 rounded-full bg-[#EF4444] border-2 border-white shadow-sm" />
              <span>🔴 BOOKED</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#B45309]">
              <span className="w-3.5 h-3.5 rounded-full bg-[#F59E0B] border-2 border-white shadow-sm" />
              <span>🟡 HOLD / PENDING</span>
            </div>

            {onOpenDatabase && (
              <button
                onClick={onOpenDatabase}
                className="ml-2 px-3 py-1 rounded-xl bg-[#4B3621] text-[#C0A080] text-[11px] font-bold uppercase tracking-wider hover:bg-[#352516] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Manage all wedding dates in Cloud Firestore Backend"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Backend DB</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
              </button>
            )}
          </div>
        </div>

        {/* Calendar & Selection View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Calendar Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#EEDCC6] shadow-lg">
            {/* Month Header with Navigation */}
            <div className="flex items-center justify-between pb-6 border-b border-[#F4ECE1] mb-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4B3621]">
                  {monthNames[month]} {year}
                </h3>
                <p className="text-xs text-[#8D6E63]">Punjab Wedding Season 2026</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevMonth}
                  className="p-2.5 rounded-xl border border-[#EEDCC6] hover:bg-[#FDFBF7] text-[#4B3621] transition-colors"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2.5 rounded-xl border border-[#EEDCC6] hover:bg-[#FDFBF7] text-[#4B3621] transition-colors"
                  title="Next Month"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-2 mb-3 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {daysArray.map((dayNum, index) => {
                if (dayNum === null) {
                  return <div key={`empty-${index}`} className="h-14 sm:h-16 rounded-xl bg-transparent" />;
                }

                const dateKey = formatDateKey(year, month, dayNum);
                const { status } = getDateStatus(dateKey);
                const isSelected = selectedDateStr === dateKey;

                // Status styling
                let statusBadgeColor = 'bg-[#22C55E]';
                let cellBg = 'bg-[#FDFBF7] hover:bg-[#F4ECE1] text-[#3E2723]';

                if (status === 'BOOKED') {
                  statusBadgeColor = 'bg-[#EF4444]';
                  cellBg = 'bg-[#FEF2F2] border-red-200 text-[#991B1B]';
                } else if (status === 'HOLD') {
                  statusBadgeColor = 'bg-[#F59E0B]';
                  cellBg = 'bg-[#FFFBEB] border-amber-200 text-[#92400E]';
                }

                return (
                  <button
                    key={dateKey}
                    onClick={() => setSelectedDateStr(dateKey)}
                    className={`h-14 sm:h-16 p-2 rounded-2xl border transition-all flex flex-col justify-between items-center relative group ${cellBg} ${
                      isSelected
                        ? 'ring-2 ring-[#4B3621] ring-offset-2 scale-105 shadow-md z-10 border-[#4B3621]'
                        : 'border-[#EEDCC6]'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold">{dayNum}</span>

                    {/* Status dot indicator */}
                    <div className="flex items-center gap-1">
                      <span className={`w-2.5 h-2.5 rounded-full ${statusBadgeColor} shadow-sm`} />
                    </div>

                    {/* Hover tooltip for small screens */}
                    <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-[#352516] text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-20 pointer-events-none">
                      {status}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Admin Date Status Fast Link */}
            <div className="mt-6 pt-4 border-t border-[#F4ECE1] flex items-center justify-between text-xs text-[#8D6E63]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C0A080]" /> Click any date to view live reservation status or generate confirmation slip.
              </span>
              <button
                onClick={onOpenAdmin}
                className="text-[#8D6E63] hover:text-[#4B3621] font-bold flex items-center gap-1 underline underline-offset-2"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Manage Calendar (Admin)
              </button>
            </div>
          </div>

          {/* Date Selected Status Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#EEDCC6] shadow-lg sticky top-28">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8D6E63] mb-4">
              <CalendarIcon className="w-4 h-4 text-[#C0A080]" />
              <span>Selected Date Details</span>
            </div>

            {selectedDateStr && selectedInfo ? (
              <div className="space-y-6">
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-serif text-[#4B3621]">
                    {getReadableSelectedDate(selectedDateStr)}
                  </div>
                  <div className="text-xs text-[#8D6E63] mt-0.5">Date Code: {selectedDateStr}</div>
                </div>

                {/* Status Callout Box */}
                {selectedInfo.status === 'AVAILABLE' && (
                  <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                      <span>🟢 AVAILABLE FOR BOOKING</span>
                    </div>
                    <p className="text-xs text-[#15803D] leading-relaxed">
                      This date is currently open for full wedding photography and cinematic films crew in Sirhind & Punjab.
                    </p>
                  </div>
                )}

                {selectedInfo.status === 'BOOKED' && (
                  <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <XCircle className="w-5 h-5 text-[#EF4444]" />
                      <span>🔴 THIS DATE IS ALREADY BOOKED</span>
                    </div>
                    <p className="text-xs text-[#B91C1C] leading-relaxed">
                      {selectedInfo.notes || 'Our cinema crew is already engaged for this date. Please select an alternate date or message us on WhatsApp for emergency duplicate crew inquiries.'}
                    </p>
                  </div>
                )}

                {selectedInfo.status === 'HOLD' && (
                  <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
                      <span>🟡 HOLD / PENDING ADVANCE</span>
                    </div>
                    <p className="text-xs text-[#B45309] leading-relaxed">
                      {selectedInfo.notes || 'This date is tentatively reserved pending token confirmation. You may still submit a backup booking.'}
                    </p>
                  </div>
                )}

                {/* Date Confirmation Certificate & Slip Trigger */}
                {onOpenDateConfirmation && (
                  <button
                    onClick={() => onOpenDateConfirmation(selectedDateStr, selectedInfo.status, selectedInfo.notes)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FDFBF7] hover:bg-[#F4ECE1] text-[#4B3621] font-bold text-xs border border-[#C0A080] flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <FileCheck className="w-4 h-4 text-[#C0A080]" />
                    <span>View Date Confirmation Slip</span>
                  </button>
                )}

                {/* Direct Booking or Contact Action */}
                <div className="space-y-2.5 pt-1">
                  {selectedInfo.status === 'AVAILABLE' || selectedInfo.status === 'HOLD' ? (
                    <button
                      onClick={() => {
                        onSelectDateForBooking(selectedDateStr);
                        const bookingElem = document.getElementById('booking');
                        if (bookingElem) bookingElem.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 group"
                    >
                      <span>Continue Booking for {selectedDateStr}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <div className="text-center p-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-xs text-[#8D6E63]">
                      To prevent double booking, please pick an available date or contact the studio directly.
                    </div>
                  )}

                  {/* Dual WhatsApp buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <a
                      href={`https://wa.me/91${STUDIO_INFO.whatsapp1}?text=${whatsappInquiryMessage1(selectedDateStr)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[11px] uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>WA: 9888469940</span>
                    </a>

                    <a
                      href={`https://wa.me/91${STUDIO_INFO.whatsapp2}?text=${whatsappInquiryMessage2(selectedDateStr)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[11px] uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>WA: 9988063786</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-[#8D6E63] text-sm">
                Please select any date from the calendar to inspect real-time availability.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
