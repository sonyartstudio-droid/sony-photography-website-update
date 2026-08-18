import { PackageInfo, ServiceItem, GalleryImage, Testimonial, Booking, CalendarDateOverride } from '../types';

export const STUDIO_INFO = {
  name: 'SONY PHOTOGRAPHY SIRHIND',
  tagline: 'Your Love Story, Beautifully Captured',
  subtitle: 'Professional Wedding Photography & Cinematic Films in Sirhind',
  phone1: '9888469940',
  phone2: '9988063786',
  whatsapp1: '9888469940',
  whatsapp2: '9988063786',
  whatsapp: '9888469940',
  email: 'sonyartstudio@gmail.com',
  address: 'Near Gurdwara Sri Fatehgarh Sahib / GT Road Bypass, Sirhind, Punjab 140406',
  gstNo: '03AABCS1234F1Z8',
  panNo: 'AABCS1234F',
  bankDetails: {
    bankName: 'HDFC Bank, Sirhind Branch',
    accountName: 'SONY PHOTOGRAPHY SIRHIND',
    accountNumber: '50200088994411',
    ifsc: 'HDFC0001234',
    branch: 'GT Road Bypass, Sirhind, Punjab',
    upiId1: '9888469940@okaxis',
    upiId2: '9988063786@paytm',
    qrText: 'Pay via GooglePay / PhonePe / Paytm to 9888469940 or 9988063786'
  },
  serviceAreas: 'Sirhind, Fatehgarh Sahib, Patiala, Ludhiana, Chandigarh, Mohali, Khanna, Rajpura, Ambala & Destination Weddings across India',
  experienceYears: '15+',
  weddingsCovered: '1,200+',
  filmsDelivered: '850+'
};

export const DEFAULT_FUNCTION_TEMPLATES = [
  {
    name: 'Shri Akhand Paath Sahib / Sukhmani Sahib & Bhog',
    defaultTimeSlot: 'Morning (08:30 AM - 01:30 PM)',
    defaultCost: 20000,
    candid: 1,
    traditional: 1,
    cinematography: 1,
    drone: false,
    liveLedWall: false,
    jimmyJib: false,
    notes: 'Solemn Sri Guru Granth Sahib Ji Paath, Gurbani Kirtan, Bhog & Ardas sacred coverage.'
  },
  {
    name: 'Jaggo & Sangeet Night',
    defaultTimeSlot: 'Evening (07:00 PM - 01:00 AM)',
    defaultCost: 30000,
    candid: 1,
    traditional: 1,
    cinematography: 2,
    drone: false,
    liveLedWall: false,
    jimmyJib: false,
    notes: 'High-energy nocturnal Punjabi celebrations, giddha, bhangra beats and illuminated brass jaggo.'
  },
  {
    name: 'Anand Karaj (Gurdwara Sahib)',
    defaultTimeSlot: 'Morning (09:00 AM - 02:00 PM)',
    defaultCost: 35000,
    candid: 2,
    traditional: 1,
    cinematography: 2,
    drone: true,
    liveLedWall: false,
    jimmyJib: false,
    notes: 'Sacred Lavan & Ardas ceremony coverage adhering to strict Sikh maryada.'
  },
  {
    name: 'Mehndi & Mayian / Haldi',
    defaultTimeSlot: 'Day / Afternoon (11:00 AM - 04:00 PM)',
    defaultCost: 20000,
    candid: 1,
    traditional: 1,
    cinematography: 1,
    drone: false,
    liveLedWall: false,
    jimmyJib: false,
    notes: 'Intricate bridal henna, floral decor, vatna/mayian rituals, family candid moments.'
  },
  {
    name: 'Grand Wedding Reception',
    defaultTimeSlot: 'Evening (07:00 PM - 01:00 AM)',
    defaultCost: 35000,
    candid: 2,
    traditional: 1,
    cinematography: 2,
    drone: true,
    liveLedWall: true,
    jimmyJib: true,
    notes: 'Royal stage entrance, dry-ice fog, champagne toast, live Same Day Edit (SDE) projection.'
  },
  {
    name: 'Pre-Wedding Concept Cinema',
    defaultTimeSlot: 'Full Day (Sunrise to Sunset)',
    defaultCost: 25000,
    candid: 2,
    traditional: 0,
    cinematography: 2,
    drone: true,
    liveLedWall: false,
    jimmyJib: false,
    notes: 'Artistic couple shoot at heritage haveli/outdoor scenic resort with 4K drone cinematography.'
  },
  {
    name: 'Roka / Shagun / Sagan',
    defaultTimeSlot: 'Afternoon / Evening (04:00 PM - 09:00 PM)',
    defaultCost: 18000,
    candid: 1,
    traditional: 1,
    cinematography: 1,
    drone: false,
    liveLedWall: false,
    jimmyJib: false,
    notes: 'Ring exchange ceremony, family blessings and formal stage portraits.'
  }
];

export const TWO_DAY_WEDDING_TEMPLATES = {
  paathJaggoWedding: [
    {
      functionName: 'Shri Akhand Paath Sahib / Sukhmani Sahib & Bhog',
      dayLabel: 'Day 1 — Morning',
      timeSlot: 'Morning (08:30 AM - 01:30 PM)',
      cost: 20000,
      candidPhotographers: 1,
      traditionalPhotographers: 1,
      cinematographers: 1,
      dronePilots: 0,
      notes: 'Guru Granth Sahib Ji Paath & Bhog ardas'
    },
    {
      functionName: 'Jaggo & Sangeet Night',
      dayLabel: 'Day 1 — Evening',
      timeSlot: 'Evening (07:00 PM - 01:00 AM)',
      cost: 30000,
      candidPhotographers: 1,
      traditionalPhotographers: 1,
      cinematographers: 2,
      dronePilots: 0,
      notes: 'Brass Jaggo lamps, Giddha boliyan & DJ dance party'
    },
    {
      functionName: 'Anand Karaj & Grand Wedding Reception',
      dayLabel: 'Day 2 — Full Day',
      timeSlot: 'Full Day (08:30 AM - 08:30 PM)',
      cost: 45000,
      candidPhotographers: 2,
      traditionalPhotographers: 1,
      cinematographers: 2,
      dronePilots: 1,
      notes: 'Gurdwara Sahib Maryada Lavan + Palace Grand Reception & Doli'
    }
  ],
  jaggoWedding: [
    {
      functionName: 'Jaggo & Sangeet Night',
      dayLabel: 'Day 1 — Evening',
      timeSlot: 'Evening (07:00 PM - 01:00 AM)',
      cost: 30000,
      candidPhotographers: 1,
      traditionalPhotographers: 1,
      cinematographers: 2,
      dronePilots: 0,
      notes: 'Brass Jaggo lights & Punjabi Sangeet beats'
    },
    {
      functionName: 'Anand Karaj & Grand Wedding Reception',
      dayLabel: 'Day 2 — Full Day',
      timeSlot: 'Full Day (08:30 AM - 08:30 PM)',
      cost: 45000,
      candidPhotographers: 2,
      traditionalPhotographers: 1,
      cinematographers: 2,
      dronePilots: 1,
      notes: 'Sacred Lavan + Grand Royal Reception'
    }
  ]
};

export const PACKAGES_DATA: PackageInfo[] = [
  {
    id: 'pkg-basic',
    name: 'PACKAGE 01 — BASIC',
    tagline: 'Essential traditional coverage for intimate weddings',
    price: 50000,
    features: [
      'Traditional Photography (1 Senior Candid + 1 Traditional)',
      'Traditional Full-Length HD Videography',
      'Edited High-Resolution Wedding Photos (300+)',
      'Online Private Cloud Gallery (1 Year Access)',
      'Single Day Complete Wedding Coverage (Up to 8 Hours)',
      'Master Pen Drive with all raw & edited files'
    ],
    deliverables: [
      '1 Standard Wedding Photo Album (30 Sheets / 60 Pages)',
      'Full Length Traditional HD Video on Pen Drive',
      'Selected 50 Retouched High-Resolution Portraits'
    ]
  },
  {
    id: 'pkg-premium',
    name: 'PACKAGE 02 — PREMIUM',
    tagline: 'Our most popular comprehensive Punjabi wedding package',
    price: 100000,
    popular: true,
    badge: 'MOST POPULAR',
    features: [
      '2 Candid Photographers + 1 Traditional Photographer',
      '2 Cinematic Cinematographers (4K Full Frame Sony FX3/A7IV)',
      'Cinematic Wedding Film (Teaser 3-5 mins + Full Highlights 25-35 mins)',
      'Pre-Wedding Shoot at Scenic Punjab / Chandigarh Location',
      'Premium Royal Velvet / Acrylic Wedding Album',
      'Online High-Speed Cloud Gallery with Sharing Link',
      'Dedicated Audio Master Recording for Anand Karaj & Rituals',
      '2 Days Event Coverage (Jaggo/Mehndi + Anand Karaj & Reception)'
    ],
    deliverables: [
      '1 Luxury Leatherette Photo Album (40 Sheets / 80 Pages)',
      '1 Family Mini Album (20 Sheets / 40 Pages)',
      '4K Cinematic Teaser + Instagram Reels (3 Cutdowns)',
      'Custom Wooden Keepsake Box with 64GB High-Speed USB 3.2 Drive'
    ]
  },
  {
    id: 'pkg-royal',
    name: 'PACKAGE 03 — ROYAL',
    tagline: 'The ultimate royal cinematic luxury experience for grand weddings',
    price: 150000,
    badge: 'ROYAL LUXURY',
    features: [
      'Complete Master Wedding Photography Crew (3 Candid + 2 Traditional)',
      '3 Master Cinematographers with Gimbal & Slider Rigs',
      'DJI 4K Drone Aerial Coverage (Day & Night Licensed Pilots)',
      'Full Cinematic Wedding Film + 4K Teaser + 5 Instagram Reels',
      'Full Pre-Wedding Concept Cinema Shoot (Costume & Story Planning)',
      'Same Day Edit Video for Reception Display (SDE Highlights)',
      'Live LED Wall Streaming Support Setup',
      'Complete 3-4 Days Full Event Coverage (Rokka, Mehndi, Jaggo, Anand Karaj, Reception)'
    ],
    deliverables: [
      '2 Premium Italian Canvera/Silk Royal Wedding Albums (50 Sheets each)',
      '2 Parents Commemorative Mini Albums',
      'Same Day Edit Film delivered within 6 hours for Reception screening',
      'Drone 4K Raw Aerial Footage + Full Master Film in Custom Royal Metal USB Box',
      'Framed 24x36 Canvas Couple Master Portrait with Matte Glass'
    ]
  },
  {
    id: 'pkg-both-sides',
    name: 'PACKAGE 04 — BOTH BOY & GIRL SIDE',
    tagline: 'Grand combined dual-family coverage with simultaneous parallel crews for both sides',
    price: 200000,
    badge: 'GRAND COMBINED',
    features: [
      'Dual Master Photography Crew (4 Senior Candid + 2 Traditional Photographers)',
      '4 Ultra-HD 4K Cinematographers (Simultaneous Boy & Girl House Coverage)',
      'DJI 4K Drone Aerial Cinematography for Baraat, Reception & Gurdwara Entry',
      'Complete Pre-Wedding Cinematic Couple Film with Drone & Story Concept',
      'Same Day Edit (SDE) Teaser Film screened at Grand Reception',
      'Live LED Wall Multi-Camera Video Switcher & Live Relay',
      'Complete 4-5 Days Event Coverage for Both Families (Jaggo, Mayian, Anand Karaj, Grand Reception)',
      'Dedicated Audio Master & Multi-Mic Setup for Anand Karaj & Rituals'
    ],
    deliverables: [
      '3 Royal Canvera / Italian Silk Wedding Albums (50 Sheets each for Boy Side, Girl Side & Combined)',
      '4 Parents Commemorative Heritage Mini Albums',
      'Full 4K Cinematic Master Film + 4K Teaser + 8 Instagram Reels',
      'All Raw Footage & Edited High-Res Photos in 2 Custom Wooden USB 3.2 Boxes',
      '2 Framed 24x36 Royal Canvas Couple Master Portraits'
    ]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-twoday-wedding',
    title: 'Two-Day Wedding: Paath, Jaggo & Anand Karaj',
    description: 'Complete 2-day royal coverage starting from Shri Akhand Paath Sahib / Sukhmani Sahib & Jaggo night, to sacred Anand Karaj and Grand Reception.',
    image: 'https://images.unsplash.com/photo-1545232979-fbf68fe9b10d?auto=format&fit=crop&w=1000&q=80',
    tag: '⭐ Most Popular 2-Day',
    highlights: ['Day 1: Paath Sahib & High-voltage Jaggo Night', 'Day 2: Sacred Anand Karaj & Royal Reception', 'Dedicated multi-camera photo & 4K cinema crew']
  },
  {
    id: 'srv-wedding-photo',
    title: 'Wedding Photography',
    description: 'Timeless candid & traditional frames capturing real Punjabi wedding emotions and warmth.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
    tag: 'Core Speciality',
    highlights: ['Candid emotional moments', 'Family & group portraits', 'Royal bride & groom frames']
  },
  {
    id: 'srv-cinematic-films',
    title: 'Cinematic Wedding Films',
    description: 'Bollywood-standard 4K cinematic storytelling with licensed music, custom color grading & emotional voiceovers.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80',
    tag: '4K Cinema',
    highlights: ['Sony Cinema FX series cameras', 'Master color grading', 'Custom cinematic sound design']
  },
  {
    id: 'srv-prewedding',
    title: 'Pre-Wedding Shoot',
    description: 'Romantic, artistic couple shoots across scenic locations, heritage havelis, lakes and lush mustard fields.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    tag: 'Romantic & Concept',
    highlights: ['Location scouting assistance', 'Styling & costume guidance', 'Cinematic drone & slow-motion clips']
  },
  {
    id: 'srv-anand-karaj',
    title: 'Anand Karaj Coverage',
    description: 'Respectful, solemn, and divine Gurdwara Sahib ceremony photography with complete adherence to Sikh maryada.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    tag: 'Sacred Rituals',
    highlights: ['Lavan sacred moments', 'Gurbani audio sync', 'Respectful non-intrusive lens positioning']
  },
  {
    id: 'srv-jaggo',
    title: 'Jaggo & Sangeet Coverage',
    description: 'High-energy nocturnal Punjabi celebrations, vibrant lights, giddha, bhangra beats, and energetic dhol moments.',
    image: 'https://images.unsplash.com/photo-1545232979-fbf68fe9b10d?auto=format&fit=crop&w=1000&q=80',
    tag: 'Vibrant Beats',
    highlights: ['Low-light prime optics', 'Fast action dance capture', 'Candid guest laughter & celebration']
  },
  {
    id: 'srv-mehndi',
    title: 'Mehndi Photography',
    description: 'Intricate henna details, colorful florals, laughter, yellow marigold decors, and candid bridal portraits.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
    tag: 'Colors & Joy',
    highlights: ['Macro henna detail lenses', 'Vibrant daylight decor shots', 'Bride with cousins & friends']
  },
  {
    id: 'srv-engagement',
    title: 'Engagement Photography',
    description: 'Capturing the ring exchange, royal stage entries, blessings of elders, and celebratory toasts.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    tag: 'First Milestone',
    highlights: ['Stage lighting balance', 'Ring detail closeups', 'Formal family portraits']
  },
  {
    id: 'srv-reception',
    title: 'Reception Photography',
    description: 'Grand tuxedo and gown entries, champagne showers, stage decor, and high-glamour evening dance floors.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80',
    tag: 'Evening Glamour',
    highlights: ['Stage & ambient lighting', 'Glamour portraits', 'Grand entrance fireworks']
  },
  {
    id: 'srv-drone',
    title: 'Drone Photography/Videography',
    description: 'Breathtaking 4K aerial bird-eye views of grand palaces, open-air baraat processions and scenic vistas.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80',
    tag: 'Aerial 4K',
    highlights: ['Licensed drone pilots', 'Ultra-smooth tracking shots', 'Grand scale venue showcase']
  },
  {
    id: 'srv-sameday',
    title: 'Same Day Edit (SDE)',
    description: 'Edited cinematic highlight teaser produced and projected directly onto LED screens during the wedding reception.',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80',
    tag: 'Live Sensation',
    highlights: ['On-site mobile editing bay', 'Same evening reception projection', 'High emotional impact for guests']
  },
  {
    id: 'srv-albums',
    title: 'Luxury Wedding Albums',
    description: 'Handcrafted Italian silk, velvet and acrylic flush-mount albums that preserve your family legacy for generations.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    tag: 'Heirloom Quality',
    highlights: ['UV protected non-tearable pages', 'Custom embossing & acrylic covers', 'Lifetime binding warranty']
  },
  {
    id: 'srv-sangeet',
    title: 'Sangeet Coverage',
    description: 'Electrifying family dance performances, stage choreography, musical medleys, and spontaneous cheers.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1000&q=80',
    tag: 'High Energy',
    highlights: ['Stage action continuous bursts', 'Audience reaction captures', 'Stage lighting color correction']
  }
];

export const GALLERY_DATA: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'The Sacred Lavan - Anand Karaj',
    category: 'Anand Karaj',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    description: 'Bride and Groom walking the sacred circumambulation at Gurdwara Sahib Sirhind.'
  },
  {
    id: 'gal-2',
    title: 'Royal Punjabi Bride in Crimson Red',
    category: 'Bride',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    description: 'Handcrafted zardozi lehenga, traditional chooda, and intricate royal kalire details.'
  },
  {
    id: 'gal-3',
    title: 'Royal Groom Sherwani & Turban',
    category: 'Groom',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    description: 'Sikh groom in royal ivory sherwani, silk dastar (turban) with royal kalgi brooch and talwar.'
  },
  {
    id: 'gal-4',
    title: 'Golden Sunset Pre-Wedding in Punjab Fields',
    category: 'Pre-Weddings',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    description: 'Cinematic sunset silhouette of the couple in traditional Punjabi attire amidst open fields.'
  },
  {
    id: 'gal-5',
    title: 'Nocturnal Jaggo Celebration',
    category: 'Jaggo',
    imageUrl: 'https://images.unsplash.com/photo-1545232979-fbf68fe9b10d?auto=format&fit=crop&w=1200&q=85',
    description: 'Illuminated brass jaggo vessel on head, vibrant colors, giddha clapping, and joyous night energy.'
  },
  {
    id: 'gal-6',
    title: 'Intricate Bridal Mehndi Artwork',
    category: 'Mehndi',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85',
    description: 'Detailed henna motifs illustrating the groom name, peacocks, and wedding doli.'
  },
  {
    id: 'gal-7',
    title: 'Cinematic Palace Couple Portrait',
    category: 'Cinematic',
    imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
    description: 'Grand royal architecture with warm ambient flare capturing the intimacy of the newlyweds.'
  },
  {
    id: 'gal-8',
    title: 'Candid Love & Timeless Gaze',
    category: 'Couple Portraits',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    description: 'Tender laughter shared right after the Anand Karaj blessings.'
  },
  {
    id: 'gal-9',
    title: 'The Grand Baraat Procession',
    category: 'Weddings',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85',
    description: 'Energetic dhol beats, dancing cousins, and festive flower showers welcoming the groom.'
  },
  {
    id: 'gal-10',
    title: 'Traditional Bridal Kalire Ceremony',
    category: 'Bride',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
    description: 'Sisters and friends tying golden umbrella kalire with auspicious prayers.'
  },
  {
    id: 'gal-11',
    title: 'Palace Corridor Pre-Wedding Film',
    category: 'Pre-Weddings',
    imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=85',
    description: 'Dramatic lighting through historical arches highlighting elegant couture.'
  },
  {
    id: 'gal-12',
    title: 'Reception Evening First Dance',
    category: 'Cinematic',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
    description: 'Sparkler fountains and romantic dry-ice fog on the reception ballroom floor.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Gurpreet Singh & Harleen Kaur',
    weddingType: 'Anand Karaj & Grand Reception',
    location: 'Sirhind / Fatehgarh Sahib',
    rating: 5,
    review: 'Sony Photography captured our Anand Karaj with such reverence and artistic beauty! The cinematic teaser had our entire family in tears of joy. Their punctuality and respect for Sikh maryada was exceptional.',
    date: 'February 2026',
    coupleImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't-2',
    clientName: 'Amritpal Gill & Simran Dhillon',
    weddingType: '3-Day Royal Wedding & Pre-Wedding',
    location: 'Patiala & Sirhind',
    rating: 5,
    review: 'From the Jaggo night in Sirhind to our Pre-Wedding shoot and grand reception, Sony and his team worked tirelessly. The drone shots of the baraat and the luxury velvet albums are masterpieces.',
    date: 'January 2026',
    coupleImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't-3',
    clientName: 'Navjot Sandhu & Manpreet Bains',
    weddingType: 'Destination Pre-Wedding & Wedding',
    location: 'Ludhiana / Sirhind',
    rating: 5,
    review: 'The Same Day Edit was the highlight of our reception night! Seeing our morning Anand Karaj on the big LED screen that very evening was unbelievable. Highly recommended across Punjab!',
    date: 'December 2025',
    coupleImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80'
  }
];

// Initial realistic bookings for Sirhind studio
export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'SPS-2026-8104',
    customerName: 'Harinder Singh',
    brideName: 'Jasleen Kaur',
    groomName: 'Harinder Singh',
    mobile: '9876543210',
    whatsapp: '9876543210',
    email: 'harinder.singh@gmail.com',
    weddingDate: '2026-09-15',
    eventDate: '2026-09-14',
    eventType: 'Two-Day Wedding (Paath, Jaggo & Wedding)',
    venue: 'Gurdwara Sri Fatehgarh Sahib & Heritage Grand Resort',
    city: 'Sirhind',
    selectedPackage: 'PACKAGE 02 — PREMIUM',
    packagePrice: 100000,
    numberOfEvents: 3,
    specialRequirements: 'Candid focus on grandparents, 4K teaser reel for Instagram within 48 hours.',
    advancePayment: 25000,
    remainingAmount: 75000,
    bookingNotes: 'Two-day Punjabi wedding: Paath Sahib & Jaggo night on 14th Sep, Anand Karaj on 15th Sep.',
    status: 'CONFIRMED',
    createdAt: '2026-08-01',
    invoiceNumber: 'INV-2026-8104',
    agreementNumber: 'AGR-2026-8104',
    agreementDate: '2026-08-01',
    paymentMethod: 'UPI (Google Pay to 9888469940)',
    functions: [
      {
        id: 'fn-101',
        functionName: 'Shri Akhand Paath Sahib / Sukhmani Sahib & Bhog',
        date: '2026-09-14',
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
        id: 'fn-102',
        functionName: 'Jaggo & Sangeet Night',
        date: '2026-09-14',
        venue: 'Family Courtyard & Banquet',
        city: 'Sirhind',
        timeSlot: 'Evening (07:00 PM - 01:00 AM)',
        candidPhotographers: 1,
        traditionalPhotographers: 1,
        cinematographers: 2,
        dronePilots: 0,
        liveLedWall: false,
        jimmyJibCrane: false,
        cost: 30000,
        notes: 'Day 1 Evening: Special capture of Giddha and illuminated Jaggo brass lamps'
      },
      {
        id: 'fn-103',
        functionName: 'Anand Karaj & Grand Reception',
        date: '2026-09-15',
        venue: 'Gurdwara Sri Fatehgarh Sahib & Heritage Resort',
        city: 'Sirhind',
        timeSlot: 'Full Day (08:30 AM - 08:00 PM)',
        candidPhotographers: 2,
        traditionalPhotographers: 1,
        cinematographers: 2,
        dronePilots: 1,
        liveLedWall: true,
        jimmyJibCrane: false,
        cost: 45000,
        notes: 'Day 2: Gurdwara Maryada compliance + Royal stage entry'
      }
    ]
  },
  {
    id: 'SPS-2026-8109',
    customerName: 'Manmohan Verma',
    brideName: 'Pooja Verma',
    groomName: 'Rohan Sharma',
    mobile: '9812345678',
    whatsapp: '9812345678',
    email: 'rohan.sharma@yahoo.com',
    weddingDate: '2026-09-22',
    eventDate: '2026-09-22',
    eventType: 'Full Wedding & Sangeet',
    venue: 'Royal Palm Resort, Bypass Road',
    city: 'Fatehgarh Sahib',
    selectedPackage: 'PACKAGE 03 — ROYAL',
    packagePrice: 150000,
    numberOfEvents: 3,
    specialRequirements: 'Drone coverage for baraat entry with red smoke pyros.',
    advancePayment: 40000,
    remainingAmount: 110000,
    bookingNotes: 'Same Day Edit requested for the evening reception.',
    status: 'CONFIRMED',
    createdAt: '2026-08-05',
    invoiceNumber: 'INV-2026-8109',
    agreementNumber: 'AGR-2026-8109',
    agreementDate: '2026-08-05',
    paymentMethod: 'Bank Transfer (NEFT/RTGS)',
    functions: [
      {
        id: 'fn-201',
        functionName: 'Mehndi & Mayian',
        date: '2026-09-20',
        venue: 'Verma Farmhouse',
        city: 'Fatehgarh Sahib',
        timeSlot: 'Afternoon (12:00 PM - 05:00 PM)',
        candidPhotographers: 1,
        traditionalPhotographers: 1,
        cinematographers: 1,
        dronePilots: 0,
        liveLedWall: false,
        jimmyJibCrane: false,
        cost: 25000,
        notes: 'Bridal mehndi detail shots and yellow floral decor'
      },
      {
        id: 'fn-202',
        functionName: 'Sangeet & Cocktail Night',
        date: '2026-09-21',
        venue: 'Grand Crystal Hall',
        city: 'Sirhind',
        timeSlot: 'Evening (07:30 PM - 02:00 AM)',
        candidPhotographers: 2,
        traditionalPhotographers: 1,
        cinematographers: 2,
        dronePilots: 0,
        liveLedWall: true,
        jimmyJibCrane: false,
        cost: 45000,
        notes: 'Family dance performances and DJ stage setup'
      },
      {
        id: 'fn-203',
        functionName: 'Royal Wedding & Reception',
        date: '2026-09-22',
        venue: 'Royal Palm Resort, Bypass Road',
        city: 'Fatehgarh Sahib',
        timeSlot: 'Full Day (09:00 AM - 11:30 PM)',
        candidPhotographers: 3,
        traditionalPhotographers: 2,
        cinematographers: 3,
        dronePilots: 1,
        liveLedWall: true,
        jimmyJibCrane: false,
        cost: 80000,
        notes: 'Baraat drone pyros + Same Day Edit reception screening'
      }
    ]
  },
  {
    id: 'SPS-2026-8115',
    customerName: 'Kulwinder Kaur',
    brideName: 'Navneet Kaur',
    groomName: 'Davinder Pal Singh',
    mobile: '9888123456',
    whatsapp: '9888123456',
    email: 'kulwinder.k@gmail.com',
    weddingDate: '2026-09-28',
    eventDate: '2026-09-28',
    eventType: 'Anand Karaj',
    venue: 'Gurdwara Sahib Fatehgarh Sahib & Majestic Hall',
    city: 'Sirhind',
    selectedPackage: 'PACKAGE 01 — BASIC',
    packagePrice: 50000,
    numberOfEvents: 2,
    specialRequirements: 'High quality traditional album with silk finish.',
    advancePayment: 15000,
    remainingAmount: 35000,
    bookingNotes: 'Date placed on priority hold.',
    status: 'HOLD',
    createdAt: '2026-08-10',
    invoiceNumber: 'INV-2026-8115',
    agreementNumber: 'AGR-2026-8115',
    agreementDate: '2026-08-10',
    paymentMethod: 'Cash Advance Token',
    functions: [
      {
        id: 'fn-301',
        functionName: 'Anand Karaj (Gurdwara Sahib)',
        date: '2026-09-28',
        venue: 'Gurdwara Sahib Fatehgarh Sahib',
        city: 'Sirhind',
        timeSlot: 'Morning (09:00 AM - 02:00 PM)',
        candidPhotographers: 1,
        traditionalPhotographers: 1,
        cinematographers: 1,
        dronePilots: 0,
        liveLedWall: false,
        jimmyJibCrane: false,
        cost: 25000,
        notes: 'Sacred Lavan & traditional family photography'
      },
      {
        id: 'fn-302',
        functionName: 'Family Reception Lunch',
        date: '2026-09-28',
        venue: 'Majestic Hall, Sirhind',
        city: 'Sirhind',
        timeSlot: 'Afternoon (02:30 PM - 06:00 PM)',
        candidPhotographers: 1,
        traditionalPhotographers: 1,
        cinematographers: 1,
        dronePilots: 0,
        liveLedWall: false,
        jimmyJibCrane: false,
        cost: 25000,
        notes: 'Group stage photographs and couple portrait session'
      }
    ]
  },
  {
    id: 'SPS-2026-8120',
    customerName: 'Sardar Baldev Singh Dhillon',
    brideName: 'Simranjit Kaur Dhillon',
    groomName: 'Gurwinder Singh Sandhu',
    mobile: '9872134567',
    whatsapp: '9872134567',
    email: 'dhillon.sandhu.wedding@gmail.com',
    weddingDate: '2026-11-25',
    eventDate: '2026-11-25',
    eventType: 'Grand Combined Punjabi Wedding (Both Sides)',
    venue: 'Royal Palace Resort & Heritage Haveli, Patiala Road',
    city: 'Sirhind',
    selectedPackage: 'PACKAGE 04 — BOTH BOY & GIRL SIDE',
    packagePrice: 200000,
    numberOfEvents: 4,
    specialRequirements: 'Dual separate photography & cinema teams for Boy House (Sandhu Farm) and Girl House (Dhillon Villa). 4K Drone live streaming.',
    advancePayment: 50000,
    remainingAmount: 150000,
    bookingNotes: 'VIP Combined wedding booking confirmed with full 4-day dual crews.',
    status: 'CONFIRMED',
    createdAt: '2026-08-12',
    invoiceNumber: 'INV-2026-8120',
    agreementNumber: 'AGR-2026-8120',
    agreementDate: '2026-08-12',
    paymentMethod: 'Bank Transfer (HDFC Sirhind)',
    functions: [
      {
        id: 'fn-401',
        functionName: 'Pre-Wedding Grand Story Shoot',
        date: '2026-11-10',
        venue: 'Heritage Fort & Mustard Orchards',
        city: 'Sirhind',
        timeSlot: 'Full Day (Sunrise to Sunset)',
        candidPhotographers: 2,
        traditionalPhotographers: 0,
        cinematographers: 2,
        dronePilots: 1,
        liveLedWall: false,
        jimmyJibCrane: false,
        cost: 30000,
        notes: 'Cinematic couple love story with 4K drone cinematography'
      },
      {
        id: 'fn-402',
        functionName: 'Dual Jaggo & Sangeet Night (Both Houses)',
        date: '2026-11-23',
        venue: 'Boy Villa & Girl Villa (Parallel Crews)',
        city: 'Sirhind',
        timeSlot: 'Evening (07:00 PM - 02:00 AM)',
        candidPhotographers: 2,
        traditionalPhotographers: 2,
        cinematographers: 4,
        dronePilots: 1,
        liveLedWall: true,
        jimmyJibCrane: false,
        cost: 60000,
        notes: 'Simultaneous dual coverage of brass jaggo processions'
      },
      {
        id: 'fn-403',
        functionName: 'Anand Karaj & Baraat Procession',
        date: '2026-11-24',
        venue: 'Gurdwara Sahib Sri Fatehgarh Sahib',
        city: 'Fatehgarh Sahib',
        timeSlot: 'Morning (08:00 AM - 02:30 PM)',
        candidPhotographers: 3,
        traditionalPhotographers: 2,
        cinematographers: 3,
        dronePilots: 1,
        liveLedWall: true,
        jimmyJibCrane: false,
        cost: 55000,
        notes: 'Sacred Maryada & Grand Royal Baraat arrival'
      },
      {
        id: 'fn-404',
        functionName: 'Grand Combined Royal Reception',
        date: '2026-11-25',
        venue: 'Royal Palace Resort & Heritage Haveli',
        city: 'Sirhind',
        timeSlot: 'Evening (06:00 PM - 01:00 AM)',
        candidPhotographers: 4,
        traditionalPhotographers: 2,
        cinematographers: 4,
        dronePilots: 1,
        liveLedWall: true,
        jimmyJibCrane: true,
        cost: 55000,
        notes: 'Live LED Wall screen relay + Same Day Edit (SDE) screening'
      }
    ]
  }
];

export const INITIAL_DATE_OVERRIDES: CalendarDateOverride[] = [
  { date: '2026-08-20', status: 'BOOKED', notes: 'Pre-wedding Shoot' },
  { date: '2026-08-25', status: 'HOLD', notes: 'Inquiry Pending' },
  { date: '2026-09-05', status: 'BOOKED', notes: 'Engagement Shoot' },
  { date: '2026-09-15', status: 'BOOKED', notes: 'Harinder & Jasleen Wedding' },
  { date: '2026-09-22', status: 'BOOKED', notes: 'Rohan & Pooja Royal Wedding' },
  { date: '2026-09-28', status: 'HOLD', notes: 'Davinder & Navneet Hold' },
  { date: '2026-10-10', status: 'BOOKED', notes: 'Aman & Simran Anand Karaj' },
  { date: '2026-10-18', status: 'BOOKED', notes: 'Navjot Wedding Ludhiana' },
  { date: '2026-11-04', status: 'BOOKED', notes: 'Peak Saaya Date - Booked' },
  { date: '2026-11-12', status: 'BOOKED', notes: 'Peak Saaya Date - Booked' },
  { date: '2026-11-20', status: 'HOLD', notes: 'Tentative Gurdwara Booking' },
  { date: '2026-11-25', status: 'BOOKED', notes: 'Royal Palace Patiala Wedding' },
  { date: '2026-12-05', status: 'BOOKED', notes: 'Grand Winter Wedding' },
  { date: '2026-12-11', status: 'BOOKED', notes: 'Winter Saaya Date - Booked' }
];
