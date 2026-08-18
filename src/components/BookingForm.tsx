import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, User, Phone, Mail, MapPin, Package, Clock, FileText, IndianRupee, AlertTriangle, ShieldCheck, CheckCircle2, Plus, Trash2, Video, Camera, Sliders, Database } from 'lucide-react';
import { Booking, CalendarDateOverride, WeddingFunctionDetail } from '../types';
import { PACKAGES_DATA, STUDIO_INFO, DEFAULT_FUNCTION_TEMPLATES } from '../data/weddingData';

interface BookingFormProps {
  preselectedPackage: { name: string; price: number } | null;
  preselectedDate: string | null;
  dateOverrides: CalendarDateOverride[];
  onBookingSuccess: (newBooking: Booking) => void;
  onOpenBookingTools?: () => void;
  onOpenDatabase?: () => void;
  draftData?: Partial<Booking> | null;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  preselectedPackage,
  preselectedDate,
  dateOverrides,
  onBookingSuccess,
  onOpenBookingTools,
  onOpenDatabase,
  draftData,
}) => {
  // Form State
  const [customerName, setCustomerName] = useState('');
  const [brideName, setBrideName] = useState('');
  const [groomName, setGroomName] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [weddingDate, setWeddingDate] = useState(preselectedDate || '');
  const [eventDate, setEventDate] = useState(preselectedDate || '');
  const [eventType, setEventType] = useState('Two-Day Wedding (Paath, Jaggo & Wedding)');
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('Sirhind');
  const [selectedPackage, setSelectedPackage] = useState(
    preselectedPackage ? preselectedPackage.name : PACKAGES_DATA[1].name
  );
  const [packagePrice, setPackagePrice] = useState<number>(
    preselectedPackage ? preselectedPackage.price : PACKAGES_DATA[1].price
  );
  const [numberOfEvents, setNumberOfEvents] = useState(2);
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [advancePayment, setAdvancePayment] = useState(25000);
  const [bookingNotes, setBookingNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI (Google Pay to 9888469940)');
  const [sameWhatsappAsMobile, setSameWhatsappAsMobile] = useState(true);

  // Dynamic Functions Array initialized with 2-Day Paath, Jaggo & Wedding ceremony breakdown
  const [functions, setFunctions] = useState<WeddingFunctionDetail[]>([
    {
      id: 'fn-init-1',
      functionName: 'Shri Akhand Paath Sahib / Sukhmani Sahib & Bhog',
      date: preselectedDate || '2026-09-14',
      venue: 'Family Residence / Gurdwara Sahib',
      city: 'Sirhind',
      timeSlot: 'Morning (08:30 AM - 01:30 PM)',
      candidPhotographers: 1,
      traditionalPhotographers: 1,
      cinematographers: 1,
      dronePilots: 0,
      liveLedWall: false,
      jimmyJibCrane: false,
      cost: 20000,
      notes: 'Day 1 Morning: Sacred Guru Granth Sahib Ji Paath & Bhog ardas'
    },
    {
      id: 'fn-init-2',
      functionName: 'Jaggo & Sangeet Night',
      date: preselectedDate || '2026-09-14',
      venue: 'Family Banquet / Courtyard',
      city: 'Sirhind',
      timeSlot: 'Evening (07:00 PM - 01:00 AM)',
      candidPhotographers: 1,
      traditionalPhotographers: 1,
      cinematographers: 2,
      dronePilots: 0,
      liveLedWall: false,
      jimmyJibCrane: false,
      cost: 30000,
      notes: 'Day 1 Evening: Brass Jaggo lamps, Giddha boliyan & DJ dance party'
    },
    {
      id: 'fn-init-3',
      functionName: 'Anand Karaj & Grand Wedding Reception',
      date: preselectedDate || '2026-09-15',
      venue: 'Gurdwara Sri Fatehgarh Sahib & Majestic Resort',
      city: 'Sirhind',
      timeSlot: 'Full Day (08:30 AM - 08:30 PM)',
      candidPhotographers: 2,
      traditionalPhotographers: 1,
      cinematographers: 2,
      dronePilots: 1,
      liveLedWall: true,
      jimmyJibCrane: false,
      cost: 45000,
      notes: 'Day 2: Gurdwara Maryada Lavan + Royal Palace Reception & Doli'
    }
  ]);

  // Errors & Warnings
  const [formError, setFormError] = useState<string | null>(null);
  const [dateConflictWarning, setDateConflictWarning] = useState<string | null>(null);

  // Sync draft data if passed from booking tools
  useEffect(() => {
    if (draftData) {
      if (draftData.customerName) setCustomerName(draftData.customerName);
      if (draftData.brideName) setBrideName(draftData.brideName);
      if (draftData.groomName) setGroomName(draftData.groomName);
      if (draftData.mobile) setMobile(draftData.mobile);
      if (draftData.whatsapp) setWhatsapp(draftData.whatsapp);
      if (draftData.weddingDate) setWeddingDate(draftData.weddingDate);
      if (draftData.eventDate) setEventDate(draftData.eventDate);
      if (draftData.venue) setVenue(draftData.venue);
      if (draftData.city) setCity(draftData.city);
      if (draftData.selectedPackage) setSelectedPackage(draftData.selectedPackage);
      if (draftData.packagePrice) setPackagePrice(draftData.packagePrice);
      if (draftData.advancePayment) setAdvancePayment(draftData.advancePayment);
      if (draftData.functions && draftData.functions.length > 0) {
        setFunctions(draftData.functions);
        setNumberOfEvents(draftData.functions.length);
      }
    }
  }, [draftData]);

  // Sync preselected Package
  useEffect(() => {
    if (preselectedPackage) {
      setSelectedPackage(preselectedPackage.name);
      setPackagePrice(preselectedPackage.price);
      setAdvancePayment(Math.round((preselectedPackage.price * 0.25) / 1000) * 1000);
    }
  }, [preselectedPackage]);

  // Sync preselected Date
  useEffect(() => {
    if (preselectedDate) {
      setWeddingDate(preselectedDate);
      setEventDate(preselectedDate);
    }
  }, [preselectedDate]);

  // Sync whatsapp when mobile changes if checkbox checked
  useEffect(() => {
    if (sameWhatsappAsMobile) {
      setWhatsapp(mobile);
    }
  }, [mobile, sameWhatsappAsMobile]);

  // Check for date conflict on wedding date change
  useEffect(() => {
    if (!weddingDate) {
      setDateConflictWarning(null);
      return;
    }
    const conflict = dateOverrides.find((o) => o.date === weddingDate);
    if (conflict && conflict.status === 'BOOKED') {
      setDateConflictWarning(
        `Warning: Date ${weddingDate} is marked as BOOKED in the studio calendar. Please verify with Sony at 9888469940 or 9988063786 before final token payment.`
      );
    } else if (conflict && conflict.status === 'HOLD') {
      setDateConflictWarning(
        `Note: Date ${weddingDate} is currently on HOLD. Submitting this booking will register a priority backup.`
      );
    } else {
      setDateConflictWarning(null);
    }
  }, [weddingDate, dateOverrides]);

  // Handle Package Selection Dropdown
  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedPackage(val);
    const matched = PACKAGES_DATA.find((p) => p.name === val);
    if (matched) {
      setPackagePrice(matched.price);
      setAdvancePayment(Math.round((matched.price * 0.25) / 1000) * 1000);
    }
  };

  // Helper to apply 2-Day Wedding Preset: Paath, Jaggo & Wedding
  const applyTwoDayPaathJaggoWedding = () => {
    setEventType('Two-Day Wedding (Paath, Jaggo & Wedding)');
    setNumberOfEvents(2);

    const d2 = weddingDate || '2026-09-15';
    let d1 = eventDate || '2026-09-14';
    if (d2 && (!eventDate || eventDate === d2)) {
      try {
        const parsed = new Date(d2);
        parsed.setDate(parsed.getDate() - 1);
        d1 = parsed.toISOString().split('T')[0];
        setEventDate(d1);
      } catch {
        d1 = d2;
      }
    }

    setFunctions([
      {
        id: `fn-${Date.now()}-1`,
        functionName: 'Shri Akhand Paath Sahib / Sukhmani Sahib & Bhog',
        date: d1,
        venue: venue ? `${venue} (Residence / Gurdwara)` : 'Family Residence / Gurdwara Sahib',
        city: city || 'Sirhind',
        timeSlot: 'Morning (08:30 AM - 01:30 PM)',
        candidPhotographers: 1,
        traditionalPhotographers: 1,
        cinematographers: 1,
        dronePilots: 0,
        liveLedWall: false,
        jimmyJibCrane: false,
        cost: 20000,
        notes: 'Day 1 Morning: Sacred Guru Granth Sahib Ji Paath & Bhog ardas'
      },
      {
        id: `fn-${Date.now()}-2`,
        functionName: 'Jaggo & Sangeet Night',
        date: d1,
        venue: venue ? `${venue} (Banquet)` : 'Family Banquet / Courtyard',
        city: city || 'Sirhind',
        timeSlot: 'Evening (07:00 PM - 01:00 AM)',
        candidPhotographers: 1,
        traditionalPhotographers: 1,
        cinematographers: 2,
        dronePilots: 0,
        liveLedWall: false,
        jimmyJibCrane: false,
        cost: 30000,
        notes: 'Day 1 Evening: Brass Jaggo lamps, Giddha boliyan & DJ dance party'
      },
      {
        id: `fn-${Date.now()}-3`,
        functionName: 'Anand Karaj & Grand Wedding Reception',
        date: d2,
        venue: venue || 'Gurdwara Sri Fatehgarh Sahib & Majestic Resort',
        city: city || 'Sirhind',
        timeSlot: 'Full Day (08:30 AM - 08:30 PM)',
        candidPhotographers: 2,
        traditionalPhotographers: 1,
        cinematographers: 2,
        dronePilots: 1,
        liveLedWall: true,
        jimmyJibCrane: false,
        cost: 45000,
        notes: 'Day 2: Sacred Lavan Gurdwara ceremony + Royal Palace Reception'
      }
    ]);
  };

  // Helper to apply 2-Day Wedding Preset: Jaggo & Wedding
  const applyTwoDayJaggoWedding = () => {
    setEventType('2-Day Wedding (Jaggo & Anand Karaj)');
    setNumberOfEvents(2);

    const d2 = weddingDate || '2026-09-15';
    let d1 = eventDate || '2026-09-14';

    setFunctions([
      {
        id: `fn-${Date.now()}-1`,
        functionName: 'Jaggo & Sangeet Night',
        date: d1,
        venue: venue ? `${venue} (Banquet)` : 'Family Banquet / Courtyard',
        city: city || 'Sirhind',
        timeSlot: 'Evening (07:00 PM - 01:00 AM)',
        candidPhotographers: 1,
        traditionalPhotographers: 1,
        cinematographers: 2,
        dronePilots: 0,
        liveLedWall: false,
        jimmyJibCrane: false,
        cost: 30000,
        notes: 'Day 1 Evening: Brass Jaggo lamps, Giddha boliyan & DJ beats'
      },
      {
        id: `fn-${Date.now()}-2`,
        functionName: 'Anand Karaj & Grand Wedding Reception',
        date: d2,
        venue: venue || 'Gurdwara Sri Fatehgarh Sahib & Resort',
        city: city || 'Sirhind',
        timeSlot: 'Full Day (08:30 AM - 08:30 PM)',
        candidPhotographers: 2,
        traditionalPhotographers: 1,
        cinematographers: 2,
        dronePilots: 1,
        liveLedWall: true,
        jimmyJibCrane: false,
        cost: 45000,
        notes: 'Day 2: Sacred Lavan + Royal Palace Reception'
      }
    ]);
  };

  // Handle Event Type Change
  const handleEventTypeChange = (newVal: string) => {
    setEventType(newVal);
    if (newVal === 'Two-Day Wedding (Paath, Jaggo & Wedding)') {
      applyTwoDayPaathJaggoWedding();
    } else if (newVal === '2-Day Wedding (Jaggo & Anand Karaj)') {
      applyTwoDayJaggoWedding();
    }
  };

  // Add a function template
  const handleAddTemplate = (templateName: string) => {
    const matched = DEFAULT_FUNCTION_TEMPLATES.find((t) => t.name === templateName);
    if (!matched) return;

    const newFn: WeddingFunctionDetail = {
      id: `fn-${Date.now()}`,
      functionName: matched.name,
      date: weddingDate || new Date().toISOString().split('T')[0],
      venue: venue || 'Sirhind Venue',
      city: city || 'Sirhind',
      timeSlot: matched.defaultTimeSlot,
      candidPhotographers: matched.candid,
      traditionalPhotographers: matched.traditional,
      cinematographers: matched.cinematography,
      dronePilots: matched.drone ? 1 : 0,
      liveLedWall: matched.liveLedWall,
      jimmyJibCrane: matched.jimmyJib,
      cost: matched.defaultCost,
      notes: matched.notes
    };

    const updated = [...functions, newFn];
    setFunctions(updated);
    setNumberOfEvents(updated.length);
  };

  const handleRemoveFunction = (id: string) => {
    const updated = functions.filter((f) => f.id !== id);
    setFunctions(updated);
    setNumberOfEvents(updated.length);
  };

  const handleUpdateFunction = <K extends keyof WeddingFunctionDetail>(
    id: string,
    field: K,
    val: WeddingFunctionDetail[K]
  ) => {
    setFunctions(
      functions.map((f) => {
        if (f.id === id) {
          return { ...f, [field]: val };
        }
        return f;
      })
    );
  };

  const remainingAmount = Math.max(0, packagePrice - advancePayment);

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic Validations
    if (!customerName.trim()) {
      setFormError('Please enter Customer Name.');
      return;
    }
    if (!mobile.trim() || mobile.length < 10) {
      setFormError('Please provide a valid 10-digit Mobile Number.');
      return;
    }
    if (!weddingDate) {
      setFormError('Please select your Wedding Date.');
      return;
    }
    if (!venue.trim()) {
      setFormError('Please specify the Venue or Gurdwara Sahib / Hall name.');
      return;
    }

    // Generate Unique Booking ID, Invoice & Agreement numbers
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `SPS-2026-${randomDigits}`;
    const invoiceNumber = `INV-2026-${randomDigits}`;
    const agreementNumber = `AGR-2026-${randomDigits}`;
    const today = new Date().toISOString().split('T')[0];

    const newBooking: Booking = {
      id: bookingId,
      customerName: customerName.trim(),
      brideName: brideName.trim() || 'Bride',
      groomName: groomName.trim() || 'Groom',
      mobile: mobile.trim(),
      whatsapp: whatsapp.trim() || mobile.trim(),
      email: email.trim(),
      weddingDate,
      eventDate: eventDate || weddingDate,
      eventType,
      venue: venue.trim(),
      city: city.trim() || 'Sirhind',
      selectedPackage,
      packagePrice,
      numberOfEvents: functions.length > 0 ? functions.length : (Number(numberOfEvents) || 1),
      specialRequirements: specialRequirements.trim(),
      advancePayment: Number(advancePayment) || 0,
      remainingAmount,
      bookingNotes: bookingNotes.trim(),
      status: 'CONFIRMED',
      createdAt: today,
      invoiceNumber,
      agreementNumber,
      agreementDate: today,
      paymentMethod,
      functions: functions.length > 0 ? functions : undefined
    };

    onBookingSuccess(newBooking);
  };

  return (
    <section id="booking" className="py-24 bg-[#FDFBF7] border-b border-[#EEDCC6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#8D6E63] uppercase mb-3">
            <Sparkles className="w-4 h-4 text-[#C0A080]" />
            <span>Official Reservation Desk</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4B3621] mb-4">
            Book Your Wedding Photography
          </h2>
          <p className="text-base sm:text-lg text-[#5C4033] leading-relaxed">
            Reserve your wedding ceremonies with Sony Photography Sirhind. Get instant printable A4 Tax Invoices, Official Agreements, and instant WhatsApp booking confirmation.
          </p>

          {/* Quick Booking & Database Tools Launchers */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {onOpenBookingTools && (
              <button
                type="button"
                onClick={onOpenBookingTools}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4B3621] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider hover:bg-[#352516] transition-all shadow-md border border-[#C0A080] cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-[#C0A080]" />
                <span>Wedding Function & Crew Planner</span>
              </button>
            )}

            {onOpenDatabase && (
              <button
                type="button"
                onClick={onOpenDatabase}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FDFBF7] text-[#4B3621] text-xs font-bold uppercase tracking-wider hover:bg-[#F4EDE4] transition-all shadow-md border border-[#C0A080] cursor-pointer"
              >
                <Database className="w-4 h-4 text-[#C0A080]" />
                <span>Cloud Database Storage</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
              </button>
            )}
          </div>
        </div>

        {/* Main Booking Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EEDCC6] shadow-xl">
          {formError && (
            <div className="mb-6 p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-sm flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {dateConflictWarning && (
            <div className="mb-6 p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-sm flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{dateConflictWarning}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Client & Couple Info Section */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8D6E63] flex items-center gap-2 mb-4 pb-2 border-b border-[#F4ECE1]">
                <User className="w-4 h-4 text-[#C0A080]" />
                <span>1. Customer & Couple Details</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Customer / Primary Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sardar Gurpreet Singh"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Bride's Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jasleen Kaur"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Groom's Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Harinder Singh"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>
              </div>

              {/* Contact numbers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-[#4B3621]">
                      WhatsApp Number *
                    </label>
                    <label className="text-[11px] text-[#8D6E63] flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameWhatsappAsMobile}
                        onChange={(e) => setSameWhatsappAsMobile(e.target.checked)}
                        className="rounded accent-[#4B3621]"
                      />
                      <span>Same as Mobile</span>
                    </label>
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp number"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Date & Venue Details Section */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b border-[#F4ECE1]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8D6E63] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C0A080]" />
                  <span>2. Wedding Event Type, Dates & Venue</span>
                </h3>

                {/* Fast Event Category Quick Selectors */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-[#8D6E63]">Quick Category:</span>
                  <button
                    type="button"
                    onClick={applyTwoDayPaathJaggoWedding}
                    className={`px-3 py-1 text-xs rounded-full font-bold transition-all border shadow-xs cursor-pointer ${
                      eventType === 'Two-Day Wedding (Paath, Jaggo & Wedding)'
                        ? 'bg-[#4B3621] text-white border-[#4B3621]'
                        : 'bg-[#FFF8EE] text-[#4B3621] border-[#EEDCC6] hover:bg-[#F4ECE1]'
                    }`}
                  >
                    ⭐ 2-Day: Paath + Jaggo + Wedding
                  </button>

                  <button
                    type="button"
                    onClick={applyTwoDayJaggoWedding}
                    className={`px-3 py-1 text-xs rounded-full font-bold transition-all border shadow-xs cursor-pointer ${
                      eventType === '2-Day Wedding (Jaggo & Anand Karaj)'
                        ? 'bg-[#4B3621] text-white border-[#4B3621]'
                        : 'bg-[#FFF8EE] text-[#4B3621] border-[#EEDCC6] hover:bg-[#F4ECE1]'
                    }`}
                  >
                    🎉 2-Day: Jaggo + Wedding
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEventTypeChange('Anand Karaj & Grand Reception')}
                    className={`px-2.5 py-1 text-xs rounded-full font-medium transition-all border cursor-pointer ${
                      eventType === 'Anand Karaj & Grand Reception'
                        ? 'bg-[#4B3621] text-white border-[#4B3621]'
                        : 'bg-white text-[#5C4033] border-[#EEDCC6] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    💍 1-Day Reception
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Main Wedding Date (Anand Karaj / Reception) *
                  </label>
                  <input
                    type="date"
                    required
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Secondary / Day 1 Date (Paath / Jaggo / Sangeet)
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Primary Event Category / Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => handleEventTypeChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] font-semibold focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  >
                    <optgroup label="⭐ 2-Day Wedding Specialities">
                      <option value="Two-Day Wedding (Paath, Jaggo & Wedding)">
                        Two-Day Wedding (Paath, Jaggo & Wedding)
                      </option>
                      <option value="2-Day Wedding (Jaggo & Anand Karaj)">
                        2-Day Wedding (Jaggo & Anand Karaj)
                      </option>
                    </optgroup>
                    <optgroup label="Traditional Punjabi Events">
                      <option value="Anand Karaj & Grand Reception">
                        Anand Karaj & Grand Reception (Single Day)
                      </option>
                      <option value="Full 3-Day Wedding (Paath, Jaggo, Anand Karaj, Reception)">
                        Full 3-Day Wedding (Paath, Jaggo, Anand Karaj, Reception)
                      </option>
                      <option value="Only Anand Karaj & Gurdwara Sahib">
                        Only Anand Karaj & Gurdwara Sahib
                      </option>
                      <option value="Pre-Wedding & Wedding Film Combo">
                        Pre-Wedding & Wedding Film Combo
                      </option>
                      <option value="Mehndi & Sangeet Night">
                        Mehndi & Sangeet Night
                      </option>
                      <option value="Engagement / Roka Ceremony">
                        Engagement / Roka Ceremony
                      </option>
                      <option value="Destination Punjabi Wedding">
                        Destination Punjabi Wedding
                      </option>
                    </optgroup>
                  </select>
                </div>
              </div>

              {eventType.includes('Two-Day') && (
                <div className="mt-3 p-3 rounded-xl bg-[#FFF8EE] border border-[#F5DEB3] text-xs text-[#6D4C41] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span>
                      <strong>Two-Day Wedding Package Active:</strong> Day 1 covers Paath Sahib / Sukhmani Sahib & energetic Jaggo Night; Day 2 covers Gurdwara Sahib Anand Karaj & Royal Palace Reception.
                    </span>
                  </div>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#4B3621] text-white text-[10px] font-bold uppercase tracking-wider">
                    2 Days Covered
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Venue / Gurdwara Sahib / Banquet Hall Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurdwara Sri Fatehgarh Sahib / Heritage Resort, GT Road"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sirhind, Fatehgarh Sahib, Patiala"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Multi-Function Ceremony & Crew Details Breakdown */}
            <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#EEDCC6] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F4ECE1] pb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#C0A080]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4B3621]">
                    3. Specific Wedding Function Details ({functions.length} Ceremonies)
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-[#8D6E63]">Add Ceremony:</span>
                  {DEFAULT_FUNCTION_TEMPLATES.slice(0, 5).map((tpl) => (
                    <button
                      key={tpl.name}
                      type="button"
                      onClick={() => handleAddTemplate(tpl.name)}
                      className="px-2.5 py-1 text-[11px] rounded bg-white hover:bg-[#F4ECE1] border border-[#C0A080] text-[#4B3621] font-semibold transition-colors"
                    >
                      + {tpl.name.includes('Paath') ? 'Paath Sahib' : tpl.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Function Cards */}
              <div className="space-y-3">
                {functions.map((fn, idx) => (
                  <div key={fn.id} className="p-3.5 rounded-xl bg-white border border-[#EEDCC6] text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#4B3621] text-white text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={fn.functionName}
                          onChange={(e) => handleUpdateFunction(fn.id, 'functionName', e.target.value)}
                          className="font-bold text-[#4B3621] text-xs border-b border-transparent hover:border-[#C0A080] px-1"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#8D6E63]">Amount (₹):</span>
                        <input
                          type="number"
                          value={fn.cost}
                          onChange={(e) => handleUpdateFunction(fn.id, 'cost', Number(e.target.value))}
                          className="w-20 px-2 py-0.5 rounded border border-[#EEDCC6] font-bold text-right text-[#15803D]"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFunction(fn.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remove function"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                      <div>
                        <span className="text-[#8D6E63] block">Date:</span>
                        <input
                          type="date"
                          value={fn.date}
                          onChange={(e) => handleUpdateFunction(fn.id, 'date', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-[#EEDCC6] bg-[#FDFBF7]"
                        />
                      </div>
                      <div>
                        <span className="text-[#8D6E63] block">Time Slot:</span>
                        <input
                          type="text"
                          value={fn.timeSlot}
                          onChange={(e) => handleUpdateFunction(fn.id, 'timeSlot', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-[#EEDCC6] bg-[#FDFBF7]"
                        />
                      </div>
                      <div>
                        <span className="text-[#8D6E63] block">Venue:</span>
                        <input
                          type="text"
                          value={fn.venue}
                          onChange={(e) => handleUpdateFunction(fn.id, 'venue', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-[#EEDCC6] bg-[#FDFBF7]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#5C4033] border-t border-[#F4ECE1]">
                      <span>Crew: <strong>{fn.candidPhotographers} Candid</strong> + <strong>{fn.traditionalPhotographers} Trad</strong> + <strong>{fn.cinematographers} Cinema</strong></span>
                      {fn.dronePilots > 0 && <span className="text-[#15803D] font-bold">• 4K Drone Included</span>}
                      {fn.liveLedWall && <span className="text-[#15803D] font-bold">• Live LED Wall Included</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Package & Financial Breakdown Section */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8D6E63] flex items-center gap-2 mb-4 pb-2 border-b border-[#F4ECE1]">
                <Package className="w-4 h-4 text-[#C0A080]" />
                <span>4. Package Selection & Payment Details</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Selected Package
                  </label>
                  <select
                    value={selectedPackage}
                    onChange={handlePackageChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] font-semibold focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  >
                    {PACKAGES_DATA.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} (₹{p.price.toLocaleString('en-IN')})
                      </option>
                    ))}
                    <option value="CUSTOM MULTI-FUNCTION PACKAGE">CUSTOM MULTI-FUNCTION PACKAGE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Package Total Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={packagePrice}
                    onChange={(e) => setPackagePrice(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm font-bold text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Payment Mode
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] font-semibold focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  >
                    <option value="UPI (Google Pay to 9888469940)">UPI (Google Pay / PhonePe to 9888469940)</option>
                    <option value="UPI (Paytm to 9988063786)">UPI (Paytm to 9988063786)</option>
                    <option value="Bank Transfer (HDFC Sirhind)">Bank Transfer (HDFC Sirhind)</option>
                    <option value="Cash Advance at Studio">Cash Advance at Studio Counter</option>
                  </select>
                </div>
              </div>

              {/* Advance & Balance Breakdown Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-5 rounded-2xl bg-[#F9F5EE] border border-[#EEDCC6]">
                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Advance Token Payment (₹)
                  </label>
                  <input
                    type="number"
                    value={advancePayment}
                    onChange={(e) => setAdvancePayment(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#C0A080] text-sm font-bold text-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                  <p className="text-[11px] text-[#8D6E63] mt-1">
                    *Recommended 25% token advance to lock your date on the calendar.
                  </p>
                </div>

                <div className="flex flex-col justify-center">
                  <span className="text-xs font-semibold text-[#8D6E63] uppercase tracking-wider">
                    Remaining Balance Due (On Event Day / Album Delivery)
                  </span>
                  <span className="text-2xl font-extrabold text-[#4B3621] mt-1">
                    ₹{remainingAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* 5. Special Requirements & Notes */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8D6E63] flex items-center gap-2 mb-4 pb-2 border-b border-[#F4ECE1]">
                <FileText className="w-4 h-4 text-[#C0A080]" />
                <span>5. Special Requirements & Booking Notes</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Special Requirements (Drone, Live LED wall, Reels, Gurdwara timings)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Please capture grandparents candidly, need Instagram reels within 48 hours..."
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Booking Notes / Client Remarks
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Advance paid via UPI to 9888469940, Pre-wedding scheduled..."
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>
              </div>
            </div>

            {/* Submission CTA */}
            <div className="pt-4 border-t border-[#F4ECE1] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#8D6E63] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span>Instant printable A4 Tax Invoice, Service Agreement & Unique ID generated.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] font-bold text-sm sm:text-base tracking-wider uppercase shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 border border-[#352516]"
              >
                <CheckCircle2 className="w-5 h-5 text-[#C0A080]" />
                <span>CONFIRM WEDDING BOOKING</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
