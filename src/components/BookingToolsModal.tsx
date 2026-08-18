import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Clock, MapPin, Users, Video, Camera, Sparkles, X, FileText, Scroll, IndianRupee, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { Booking, WeddingFunctionDetail } from '../types';
import { DEFAULT_FUNCTION_TEMPLATES, STUDIO_INFO } from '../data/weddingData';

interface BookingToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadIntoBookingForm: (bookingDraft: Partial<Booking>) => void;
  onOpenInvoiceForDraft: (draft: Booking) => void;
  onOpenAgreementForDraft: (draft: Booking) => void;
}

export const BookingToolsModal: React.FC<BookingToolsModalProps> = ({
  isOpen,
  onClose,
  onLoadIntoBookingForm,
  onOpenInvoiceForDraft,
  onOpenAgreementForDraft,
}) => {
  // Client Info State
  const [clientName, setClientName] = useState('Sardar Gurpreet Singh');
  const [groomName, setGroomName] = useState('Harinder Singh');
  const [brideName, setBrideName] = useState('Jasleen Kaur');
  const [phone, setPhone] = useState('9876543210');
  const [mainDate, setMainDate] = useState('2026-09-15');
  const [primaryVenue, setPrimaryVenue] = useState('Heritage Grand Resort, GT Road');
  const [city, setCity] = useState('Sirhind');
  const [packageTier, setPackageTier] = useState('CUSTOM MULTI-FUNCTION PACKAGE');

  // Functions breakdown state
  const [functions, setFunctions] = useState<WeddingFunctionDetail[]>([
    {
      id: 'tool-fn-1',
      functionName: 'Pre-Wedding Concept Shoot',
      date: '2026-09-08',
      venue: 'Heritage Resort & Mustard Fields',
      city: 'Sirhind',
      timeSlot: 'Full Day (Sunrise to Sunset)',
      candidPhotographers: 2,
      traditionalPhotographers: 0,
      cinematographers: 2,
      dronePilots: 1,
      liveLedWall: false,
      jimmyJibCrane: false,
      cost: 25000,
      notes: '2 traditional attire sets + 1 western couture set'
    },
    {
      id: 'tool-fn-2',
      functionName: 'Jaggo & Sangeet Night',
      date: '2026-09-14',
      venue: 'Family Courtyard Banquet',
      city: 'Sirhind',
      timeSlot: 'Evening (07:00 PM - 01:00 AM)',
      candidPhotographers: 1,
      traditionalPhotographers: 1,
      cinematographers: 2,
      dronePilots: 0,
      liveLedWall: false,
      jimmyJibCrane: false,
      cost: 30000,
      notes: 'Brass jaggo lamp dances and family giddha performance'
    },
    {
      id: 'tool-fn-3',
      functionName: 'Anand Karaj & Grand Reception',
      date: '2026-09-15',
      venue: 'Gurdwara Sri Fatehgarh Sahib & Majestic Palace',
      city: 'Sirhind',
      timeSlot: 'Full Day (08:30 AM - 09:00 PM)',
      candidPhotographers: 2,
      traditionalPhotographers: 1,
      cinematographers: 2,
      dronePilots: 1,
      liveLedWall: true,
      jimmyJibCrane: false,
      cost: 45000,
      notes: 'Sacred Lavan coverage + Royal reception stage entry'
    }
  ]);

  const [advancePaid, setAdvancePaid] = useState<number>(30000);

  if (!isOpen) return null;

  // Preset: Load 2-Day Wedding with Paath, Jaggo & Wedding
  const handleLoadTwoDayPaathJaggo = () => {
    const d2 = mainDate || '2026-09-15';
    let d1 = '2026-09-14';
    try {
      const p = new Date(d2);
      p.setDate(p.getDate() - 1);
      d1 = p.toISOString().split('T')[0];
    } catch {
      d1 = d2;
    }

    setPackageTier('2-DAY ROYAL WEDDING: PAATH, JAGGO & WEDDING');
    setFunctions([
      {
        id: `fn-${Date.now()}-1`,
        functionName: 'Shri Akhand Paath Sahib / Sukhmani Sahib & Bhog',
        date: d1,
        venue: `${primaryVenue} (Residence / Gurdwara)`,
        city: city,
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
        venue: `${primaryVenue} (Banquet)`,
        city: city,
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
        venue: primaryVenue,
        city: city,
        timeSlot: 'Full Day (08:30 AM - 08:30 PM)',
        candidPhotographers: 2,
        traditionalPhotographers: 1,
        cinematographers: 2,
        dronePilots: 1,
        liveLedWall: true,
        jimmyJibCrane: false,
        cost: 45000,
        notes: 'Day 2: Sacred Lavan Gurdwara ceremony + Royal Palace Reception & Doli'
      }
    ]);
  };

  // Preset: Load 2-Day Wedding with Jaggo & Wedding
  const handleLoadTwoDayJaggoWedding = () => {
    const d2 = mainDate || '2026-09-15';
    let d1 = '2026-09-14';
    try {
      const p = new Date(d2);
      p.setDate(p.getDate() - 1);
      d1 = p.toISOString().split('T')[0];
    } catch {
      d1 = d2;
    }

    setPackageTier('2-DAY WEDDING: JAGGO & ANAND KARAJ');
    setFunctions([
      {
        id: `fn-${Date.now()}-1`,
        functionName: 'Jaggo & Sangeet Night',
        date: d1,
        venue: `${primaryVenue} (Banquet)`,
        city: city,
        timeSlot: 'Evening (07:00 PM - 01:00 AM)',
        candidPhotographers: 1,
        traditionalPhotographers: 1,
        cinematographers: 2,
        dronePilots: 0,
        liveLedWall: false,
        jimmyJibCrane: false,
        cost: 30000,
        notes: 'Day 1 Evening: Brass Jaggo lights & Punjabi Sangeet beats'
      },
      {
        id: `fn-${Date.now()}-2`,
        functionName: 'Anand Karaj & Grand Wedding Reception',
        date: d2,
        venue: primaryVenue,
        city: city,
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

  // Add a function from predefined template
  const handleAddTemplate = (templateName: string) => {
    const matched = DEFAULT_FUNCTION_TEMPLATES.find((t) => t.name === templateName);
    if (!matched) return;

    const newFn: WeddingFunctionDetail = {
      id: `fn-${Date.now()}`,
      functionName: matched.name,
      date: mainDate,
      venue: primaryVenue,
      city: city,
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

    setFunctions([...functions, newFn]);
  };

  // Add blank custom function
  const handleAddCustom = () => {
    const newFn: WeddingFunctionDetail = {
      id: `fn-${Date.now()}`,
      functionName: 'Custom Wedding Function',
      date: mainDate,
      venue: primaryVenue,
      city: city,
      timeSlot: 'Morning / Evening',
      candidPhotographers: 1,
      traditionalPhotographers: 1,
      cinematographers: 1,
      dronePilots: 0,
      liveLedWall: false,
      jimmyJibCrane: false,
      cost: 20000,
      notes: ''
    };
    setFunctions([...functions, newFn]);
  };

  // Remove function
  const handleRemove = (id: string) => {
    setFunctions(functions.filter((f) => f.id !== id));
  };

  // Update specific field
  const handleUpdate = <K extends keyof WeddingFunctionDetail>(
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

  // Calculations
  const calculatedTotal = functions.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);
  const totalCandid = functions.reduce((acc, curr) => acc + (Number(curr.candidPhotographers) || 0), 0);
  const totalCinematographers = functions.reduce((acc, curr) => acc + (Number(curr.cinematographers) || 0), 0);
  const totalTraditional = functions.reduce((acc, curr) => acc + (Number(curr.traditionalPhotographers) || 0), 0);
  const remaining = Math.max(0, calculatedTotal - advancePaid);

  // Generate draft booking object
  const createDraftBooking = (): Booking => {
    const randomId = `SPS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      id: randomId,
      customerName: clientName,
      brideName: brideName,
      groomName: groomName,
      mobile: phone,
      whatsapp: phone,
      email: 'client@example.com',
      weddingDate: mainDate,
      eventDate: mainDate,
      eventType: functions.map((f) => f.functionName).join(', ') || 'Punjabi Wedding',
      venue: primaryVenue,
      city: city,
      selectedPackage: packageTier,
      packagePrice: calculatedTotal,
      numberOfEvents: functions.length,
      specialRequirements: `Complete ${functions.length}-function ceremony itinerary. Total Crew: ${totalCandid} Candid, ${totalTraditional} Traditional, ${totalCinematographers} Cinematographers.`,
      advancePayment: advancePaid,
      remainingAmount: remaining,
      bookingNotes: 'Generated via Sony Photography Wedding Function Planner Tool',
      status: 'CONFIRMED',
      createdAt: new Date().toISOString().split('T')[0],
      functions: functions,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      agreementNumber: `AGR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      agreementDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'UPI / Bank Transfer'
    };
  };

  const handleTransferToForm = () => {
    const draft = createDraftBooking();
    onLoadIntoBookingForm(draft);
    onClose();
  };

  const handleDirectInvoice = () => {
    const draft = createDraftBooking();
    onOpenInvoiceForDraft(draft);
  };

  const handleDirectAgreement = () => {
    const draft = createDraftBooking();
    onOpenAgreementForDraft(draft);
  };

  return (
    <div className="bg-[#4B3621]/80 backdrop-blur-md fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden border border-[#EEDCC6] my-auto">
        {/* Modal Header */}
        <div className="bg-[#4B3621] text-[#FDFBF7] p-5 sm:p-6 flex items-center justify-between border-b border-[#352516]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#C0A080] text-[#352516]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold">
                Wedding Booking Tools & Function Details Planner
              </h2>
              <p className="text-xs text-[#EEDCC6]">
                Configure every Punjabi wedding ceremony, assign camera & drone crews, calculate costs, and print Invoices & Agreements.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#EEDCC6] hover:bg-[#352516] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto bg-[#FDFBF7]">
          {/* 1. Client & Wedding Overview Info */}
          <div className="bg-white p-5 rounded-2xl border border-[#EEDCC6] space-y-4">
            <div className="flex items-center justify-between border-b border-[#F4ECE1] pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">
                1. Wedding Party & Location Parameters
              </span>
              <div className="text-xs text-[#15803D] font-bold">
                Studio Lines: {STUDIO_INFO.phone1} / {STUDIO_INFO.phone2}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4B3621] mb-1">Customer / Family Head</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EEDCC6] bg-[#FDFBF7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B3621] mb-1">Groom's Name</label>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EEDCC6] bg-[#FDFBF7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B3621] mb-1">Bride's Name</label>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EEDCC6] bg-[#FDFBF7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B3621] mb-1">Mobile / WhatsApp</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EEDCC6] bg-[#FDFBF7]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4B3621] mb-1">Primary Wedding Date</label>
                <input
                  type="date"
                  value={mainDate}
                  onChange={(e) => setMainDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EEDCC6] bg-[#FDFBF7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B3621] mb-1">Main Venue / Gurdwara Sahib</label>
                <input
                  type="text"
                  value={primaryVenue}
                  onChange={(e) => setPrimaryVenue(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EEDCC6] bg-[#FDFBF7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B3621] mb-1">City / Region</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EEDCC6] bg-[#FDFBF7]"
                />
              </div>
            </div>
          </div>

          {/* 2. Function Quick-Add & Preset Toolbar */}
          <div className="p-4 rounded-xl bg-[#FFF8EE] border border-[#F5DEB3] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] flex items-center gap-1">
                <Calendar className="w-4 h-4 text-[#C0A080]" />
                <span>Quick Wedding Presets:</span>
              </span>

              <button
                type="button"
                onClick={handleLoadTwoDayPaathJaggo}
                className="px-3 py-1 text-xs rounded-lg bg-[#4B3621] text-[#FDFBF7] font-bold hover:bg-[#352516] transition-all shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>⭐ Load 2-Day Wedding (Paath, Jaggo & Wedding)</span>
              </button>

              <button
                type="button"
                onClick={handleLoadTwoDayJaggoWedding}
                className="px-3 py-1 text-xs rounded-lg bg-white border border-[#C0A080] text-[#4B3621] font-bold hover:bg-[#F4ECE1] transition-all shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>🎉 Load 2-Day (Jaggo + Wedding)</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-[#8D6E63]">Add Ceremony:</span>
              {DEFAULT_FUNCTION_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.name}
                  type="button"
                  onClick={() => handleAddTemplate(tpl.name)}
                  className="px-2 py-1 text-[11px] rounded bg-white hover:bg-[#F4ECE1] border border-[#C0A080] text-[#4B3621] font-semibold transition-colors"
                >
                  + {tpl.name.includes('Paath') ? 'Paath Sahib' : tpl.name.split(' ')[0]}
                </button>
              ))}
              <button
                type="button"
                onClick={handleAddCustom}
                className="px-2.5 py-1 text-[11px] rounded bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-[#C0A080]" />
                <span>Custom</span>
              </button>
            </div>
          </div>

          {/* 3. Detailed Function Cards */}
          <div className="space-y-4">
            {functions.map((fn, index) => (
              <div
                key={fn.id}
                className="bg-white p-5 rounded-2xl border border-[#EEDCC6] shadow-sm space-y-3 relative group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F4ECE1] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#4B3621] text-[#FDFBF7] text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={fn.functionName}
                      onChange={(e) => handleUpdate(fn.id, 'functionName', e.target.value)}
                      className="font-bold text-sm text-[#4B3621] bg-transparent border-b border-transparent hover:border-[#C0A080] focus:border-[#4B3621] px-1"
                      placeholder="Function Title"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs">
                      <span className="font-semibold text-[#8D6E63]">Event Cost (₹):</span>
                      <input
                        type="number"
                        value={fn.cost}
                        onChange={(e) => handleUpdate(fn.id, 'cost', Number(e.target.value))}
                        className="w-24 px-2 py-1 text-xs font-bold text-[#15803D] rounded border border-[#EEDCC6] bg-[#FDFBF7] text-right"
                      />
                    </div>

                    <button
                      onClick={() => handleRemove(fn.id)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      title="Remove Function"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Event Metadata (Date, Time, Venue) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#8D6E63] mb-1">Date</label>
                    <input
                      type="date"
                      value={fn.date}
                      onChange={(e) => handleUpdate(fn.id, 'date', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#EEDCC6] bg-[#FDFBF7]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#8D6E63] mb-1">Timing Slot</label>
                    <input
                      type="text"
                      value={fn.timeSlot}
                      onChange={(e) => handleUpdate(fn.id, 'timeSlot', e.target.value)}
                      placeholder="e.g. Morning 09:00 AM - 02:00 PM"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#EEDCC6] bg-[#FDFBF7]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#8D6E63] mb-1">Venue Location</label>
                    <input
                      type="text"
                      value={fn.venue}
                      onChange={(e) => handleUpdate(fn.id, 'venue', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#EEDCC6] bg-[#FDFBF7]"
                    />
                  </div>
                </div>

                {/* Crew & Add-ons Grid */}
                <div className="p-3 rounded-xl bg-[#F9F5EE] border border-[#EEDCC6] grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
                  <div>
                    <span className="block text-[10px] font-bold text-[#4B3621]">Candid Photo</span>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={fn.candidPhotographers}
                      onChange={(e) => handleUpdate(fn.id, 'candidPhotographers', Number(e.target.value))}
                      className="w-full mt-0.5 px-2 py-1 rounded border border-[#EEDCC6] bg-white text-center font-bold"
                    />
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold text-[#4B3621]">Traditional Photo</span>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={fn.traditionalPhotographers}
                      onChange={(e) => handleUpdate(fn.id, 'traditionalPhotographers', Number(e.target.value))}
                      className="w-full mt-0.5 px-2 py-1 rounded border border-[#EEDCC6] bg-white text-center font-bold"
                    />
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold text-[#4B3621]">Cinema 4K Crew</span>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={fn.cinematographers}
                      onChange={(e) => handleUpdate(fn.id, 'cinematographers', Number(e.target.value))}
                      className="w-full mt-0.5 px-2 py-1 rounded border border-[#EEDCC6] bg-white text-center font-bold"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-semibold text-[#4B3621]">
                      <input
                        type="checkbox"
                        checked={fn.dronePilots > 0}
                        onChange={(e) => handleUpdate(fn.id, 'dronePilots', e.target.checked ? 1 : 0)}
                        className="rounded accent-[#4B3621]"
                      />
                      <span>4K Drone</span>
                    </label>
                  </div>

                  <div className="flex flex-col justify-center">
                    <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-semibold text-[#4B3621]">
                      <input
                        type="checkbox"
                        checked={fn.liveLedWall}
                        onChange={(e) => handleUpdate(fn.id, 'liveLedWall', e.target.checked)}
                        className="rounded accent-[#4B3621]"
                      />
                      <span>Live LED Wall</span>
                    </label>
                  </div>

                  <div className="flex flex-col justify-center">
                    <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-semibold text-[#4B3621]">
                      <input
                        type="checkbox"
                        checked={fn.jimmyJibCrane}
                        onChange={(e) => handleUpdate(fn.id, 'jimmyJibCrane', e.target.checked)}
                        className="rounded accent-[#4B3621]"
                      />
                      <span>Jimmy Jib Crane</span>
                    </label>
                  </div>
                </div>

                {/* Function Notes */}
                <div>
                  <input
                    type="text"
                    value={fn.notes || ''}
                    onChange={(e) => handleUpdate(fn.id, 'notes', e.target.value)}
                    placeholder="Specific ceremony requirements (e.g. Anand Karaj Lavan timing, family stage shots)..."
                    className="w-full px-3 py-1.5 text-[11px] rounded-lg border border-[#EEDCC6] bg-[#FDFBF7] text-[#5C4033]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 4. Financial Calculation Summary Bar */}
          <div className="p-5 rounded-2xl bg-[#4B3621] text-[#FDFBF7] border border-[#352516] flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="text-xs uppercase font-bold text-[#C0A080] tracking-wider">
                Full Wedding Investment Summary
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-serif text-3xl font-extrabold text-white">
                  ₹{calculatedTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#EEDCC6]">
                  ({functions.length} Ceremonies • {totalCandid + totalTraditional + totalCinematographers} Total Crew Members)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="bg-[#352516] p-2.5 rounded-xl border border-[#5C4033]">
                <label className="block text-[10px] text-[#C0A080] font-bold">Advance Token (₹)</label>
                <input
                  type="number"
                  value={advancePaid}
                  onChange={(e) => setAdvancePaid(Number(e.target.value))}
                  className="w-24 mt-0.5 px-2 py-1 rounded bg-[#2A1D11] border border-[#5C4033] text-white font-bold"
                />
              </div>

              <div className="bg-[#352516] p-2.5 rounded-xl border border-[#5C4033]">
                <span className="block text-[10px] text-[#C0A080] font-bold">Remaining Balance Due</span>
                <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                  ₹{remaining.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="bg-white p-4 sm:p-6 border-t border-[#EEDCC6] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[#8D6E63] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#15803D]" />
            <span>Instantly generate A4 Tax Invoice, Official Legal Agreement, or load into main form.</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDirectInvoice}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F9F5EE] border border-[#C0A080] text-[#4B3621] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4 text-[#C0A080]" />
              <span>PRINT TAX INVOICE</span>
            </button>

            <button
              onClick={handleDirectAgreement}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F9F5EE] border border-[#C0A080] text-[#4B3621] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Scroll className="w-4 h-4 text-[#C0A080]" />
              <span>PRINT AGREEMENT</span>
            </button>

            <button
              onClick={handleTransferToForm}
              className="px-5 py-2.5 rounded-xl bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-[#C0A080]" />
              <span>APPLY TO MAIN BOOKING FORM</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
