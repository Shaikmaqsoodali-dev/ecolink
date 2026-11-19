/**
 * Central data for the Ecolink India site.
 *
 * Every string here comes from the client's Website Copy Deck (copydeck.txt).
 * Anything the deck marks as "to be confirmed by client" is either omitted or
 * flagged with `pending: true` so it never ships as an invented claim.
 */

export const siteUrl = 'https://ecolinkindia.com';

export const site = {
  name: 'Ecolink India',
  legalName: 'Deluxe Recycling (India) Pvt. Ltd.',
  tagline: 'Waste goes in. Boards come out.',
  taglineFull: 'Waste goes in. Boards come out. Products and technology for recycling waste into value.',
  since: 'SINCE — 2005',
  phone: '+91 98100 00000', // pending: client to supply live contact numbers
  email: 'info@ecolinkindia.com', // pending: client to confirm mailbox
  address: 'Industrial Area, India', // pending: client to supply factory address
  copyright: 'Copyright © 2026 Deluxe Recycling (India) Pvt. Ltd.',
  linkedin: '#', // pending: client to supply URL
  youtube: '#', // pending: client to supply URL
  instagram: '#' // pending: client to supply URL
};

/** Route → filename (flat HTML output). */
export const routes = {
  home: '/',
  about: '/about',
  products: '/products',
  ecolinkBoards: '/products/ecolink-boards',
  ecoshaktiBoards: '/products/ecoshakti-boards',
  essBoards: '/products/ess-boards',
  roofingSheets: '/products/roofing-sheets',
  doors: '/products/doors',
  pallets: '/products/pallets',
  solutions: '/solutions',
  environment: '/environment',
  faq: '/faq',
  contact: '/contact',
  privacy: '/privacy-policy',
  notFound: '/404'
};

export const nav = [
  { label: 'Home', href: routes.home },
  { label: 'About', href: routes.about },
  {
    label: 'Products',
    href: routes.products,
    children: [
      { label: 'Ecolink Boards', href: routes.ecolinkBoards, desc: 'Waste composite board — water resistant' },
      { label: 'Ecoshakti Boards', href: routes.ecoshaktiBoards, desc: '100% waterproof board' },
      { label: 'ESS Boards', href: routes.essBoards, desc: '100% waterproof sheet board' },
      { label: 'Roofing Sheets', href: routes.roofingSheets, desc: 'Sheets for permanent roofs' },
      { label: 'Doors', href: routes.doors, desc: 'Flush and moulded doors' },
      { label: 'Pallets', href: routes.pallets, desc: 'Durable recycled pallets' }
    ]
  },
  { label: 'Solutions', href: routes.solutions },
  { label: 'Environment', href: routes.environment },
  { label: 'FAQ', href: routes.faq },
  { label: 'Contact', href: routes.contact }
];

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  headline: 'Turning waste into value, since 2005.',
  sub: 'Waste goes in. Boards come out. Ecolink India manufactures recycled composite boards, roofing sheets, doors and pallets — and offers complete recycling plants for buyers worldwide.'
};

export const stats = [
  { value: 27, suffix: '+', label: 'Years in recycling' },
  { value: 3000, suffix: '', label: 'MT of waste diverted per year', grouping: true },
  { value: 37000, suffix: '', label: 'MT of boards produced per year', grouping: true },
  { value: 100000, suffix: '', label: 'MT of recycled material in use', grouping: true }
];

export const whatWeDo = {
  eyebrow: 'What we do',
  title: 'Two businesses, one loop.',
  text: 'We buy waste others discard, convert it into durable products, and build the plants that make it possible — for our own factory and for customers around the world.',
  items: [
    {
      no: '01',
      title: 'Manufacture',
      body: 'Recycled composite boards, sheets, roofing, doors and pallets sold under the Ecolink, Ecoshakti and ESS brands.'
    },
    {
      no: '02',
      title: 'Recycle',
      body: 'We buy hard-to-recycle waste — plastic, wood, paper, tyres, cotton — and give it a second life as a product.'
    },
    {
      no: '03',
      title: 'Export',
      body: 'Complete recycling plants with in-house technology, shipped and commissioned for buyers in Asia, Africa and beyond.'
    }
  ]
};

export const processSteps = [
  { no: '01', title: 'Buy waste', body: 'Plastic, wood, paper, tyres, cotton and other hard-to-recycle waste is collected from suppliers across India.' },
  { no: '02', title: 'Shred & sort', body: 'Feedstock is shredded, screened and graded so every input stream is consistent and clean.' },
  { no: '03', title: 'Composite', body: 'Materials are combined and pressed under heat into dense, uniform boards and sheets.' },
  { no: '04', title: 'Finish & dispatch', body: 'Boards are trimmed, surfaced, quality-checked and shipped to customers in India and abroad.' }
];

export const homeBoards = [
  {
    name: 'Ecolink Boards',
    href: routes.ecolinkBoards,
    tag: 'Water resistant',
    body: 'Our core recycled composite board — dense, screw-holding and suitable for interiors and general applications where water resistance is required.',
    img: 'assets/img/board-ecolink.jpg',
    alt: 'Ecolink recycled composite board'
  },
  {
    name: 'Ecoshakti Boards',
    href: routes.ecoshaktiBoards,
    tag: '100% waterproof',
    body: 'A fully waterproof recycled board for wet areas, exteriors and applications where plywood is traditionally used.',
    img: 'assets/img/board-ecoshakti.jpg',
    alt: 'Ecoshakti waterproof recycled board'
  },
  {
    name: 'ESS Boards',
    href: routes.essBoards,
    tag: '100% waterproof',
    body: 'Sheet-format waterproof board for signage, panelling, furniture and long-life exterior use.',
    img: 'assets/img/board-ess.jpg',
    alt: 'ESS waterproof recycled sheet board'
  }
];

export const applications = [
  { icon: 'sofa', title: 'Furniture', body: 'Cupboards, wardrobes, cabinets and office furniture.',
    img: 'assets/img/app-furniture.jpg', alt: 'Built-in wardrobe and cupboard made from recycled composite board' },
  { icon: 'car', title: 'Automotive', body: 'Interior panels, trim and component backing.',
    img: 'assets/img/app-automotive.jpg', alt: 'Car interior door panel made from composite fibre board' },
  { icon: 'plane', title: 'Aviation', body: 'Lightweight panel applications.',
    img: 'assets/img/app-aviation.jpg', alt: 'Aircraft cabin interior with lightweight composite wall panels' },
  { icon: 'boat', title: 'Marine', body: 'Panels for high-humidity environments.',
    img: 'assets/img/app-marine.jpg', alt: 'Boat cabin lined with moisture-resistant composite panels' },
  { icon: 'box', title: 'Packaging', body: 'Crate liners, inserts and protective packaging.',
    img: 'assets/img/app-packaging.jpg', alt: 'Composite board crate liners stacked with boxes in a warehouse' },
  { icon: 'case', title: 'Luggage', body: 'Hard-shell cases and travel goods.',
    img: 'assets/img/app-luggage.jpg', alt: 'Hard-shell trolley suitcases built from composite panel shells' },
  { icon: 'bed', title: 'Mattress support', body: 'Base boards and support panels.',
    img: 'assets/img/app-mattress-support.jpg', alt: 'Mattress resting on a flat composite bed base support board' },
  { icon: 'rail', title: 'Railways', body: 'Interior panelling for coaches and rolling stock.',
    img: 'assets/img/app-railways.jpg', alt: 'Train coach interior with composite wall panelling' },
  { icon: 'bed', title: 'Headboards', body: 'Hotel and home headboard panels.',
    img: 'assets/img/app-headboards.jpg', alt: 'Hotel bed with a composite headboard panel' },
  { icon: 'sofa', title: 'Cupboards', body: 'Kitchen and storage carcasses.',
    img: 'assets/img/app-cupboards.jpg', alt: 'Open kitchen cupboard carcasses made from recycled composite board' },
  { icon: 'box', title: 'Packaging inserts', body: 'Die-cut inserts for electronics and exports.',
    img: 'assets/img/app-packaging-inserts.jpg', alt: 'Die-cut board inserts holding an electronic device in a carton' }
];

export const threeZeros = [
  { title: 'Zero landfill', body: 'Waste that would be buried or burned becomes feedstock for a board.' },
  { title: 'Zero formaldehyde', body: 'Boards are manufactured without added formaldehyde binders.' },
  { title: 'Zero waste', body: 'Process offcuts and rejects are re-shredded and re-pressed into new boards.' }
];

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export const products = [
  {
    slug: 'ecolink-boards',
    name: 'Ecolink Boards',
    href: routes.ecolinkBoards,
    tag: 'Water resistant',
    blurb: 'The original Ecolink recycled composite board — dense, screw-holding and water resistant.',
    long: 'Ecolink Boards are manufactured from recycled plastic, wood flour and paper waste. The result is a dense, uniform board that cuts, drills and screws like plywood, without the timber.',
    img: 'assets/img/board-ecolink.jpg',
    alt: 'Ecolink recycled composite board',
    specs: [
      { label: 'Water resistance', value: 'Water resistant' },
      { label: 'Manufactured from', value: 'Recycled plastic, wood flour, paper waste' },
      { label: 'Sizes', value: '8 ft × 4 ft and custom sizes', pending: true },
      { label: 'Thicknesses', value: '6 mm to 25 mm', pending: true }
    ],
    features: [
      'Cuts, drills and screws like plywood',
      'Resists moisture, rot and termite damage',
      'Made from waste that would otherwise be landfilled'
    ],
    gallery: [
      { src: 'assets/img/industry-furniture.jpg', alt: 'Interior furnished with panel boards for cupboards and wardrobes' },
      { src: 'assets/img/industry-fmcg.jpg', alt: 'Packaging line where board inserts protect FMCG products' },
      { src: 'assets/img/industry-logistics.jpg', alt: 'Warehouse where board packaging moves goods in logistics' }
    ]
  },
  {
    slug: 'ecoshakti-boards',
    name: 'Ecoshakti Boards',
    href: routes.ecoshaktiBoards,
    tag: '100% waterproof',
    blurb: 'A fully waterproof recycled board for wet areas and exterior use.',
    long: 'Ecoshakti Boards are pressed from recycled plastic and fibre waste to a fully waterproof specification. They are specified where plywood and MDF fail — bathrooms, kitchens, exteriors and humid environments.',
    img: 'assets/img/board-ecoshakti.jpg',
    alt: 'Ecoshakti waterproof recycled board',
    specs: [
      { label: 'Water resistance', value: '100% waterproof' },
      { label: 'Manufactured from', value: 'Recycled plastic and fibre waste' },
      { label: 'Sizes', value: '8 ft × 4 ft and custom sizes', pending: true },
      { label: 'Thicknesses', value: '6 mm to 25 mm', pending: true }
    ],
    features: [
      'Fully waterproof — no swelling, no delamination',
      'Replaces plywood in wet and exterior applications',
      'Termite and rot resistant'
    ],
    gallery: [
      { src: 'assets/img/prefab-bathroom.jpg', alt: 'Bathroom lined with waterproof board panels' },
      { src: 'assets/img/terrazzo-bench.jpg', alt: 'Composite bench standing outdoors in a garden terrace' },
      { src: 'assets/img/prefab-cabin.jpg', alt: 'Exterior prefab structure clad in waterproof board' }
    ]
  },
  {
    slug: 'ess-boards',
    name: 'ESS Boards',
    href: routes.essBoards,
    tag: '100% waterproof',
    blurb: 'Sheet-format waterproof recycled board for signage, panelling and furniture.',
    long: 'ESS Boards are supplied in sheet format for signage, wall panelling, furniture and long-life exterior use. Like Ecoshakti, they are 100% waterproof.',
    img: 'assets/img/board-ess.jpg',
    alt: 'ESS waterproof recycled sheet board',
    specs: [
      { label: 'Water resistance', value: '100% waterproof' },
      { label: 'Format', value: 'Sheet board' },
      { label: 'Sizes', value: '8 ft × 4 ft and custom sizes', pending: true },
      { label: 'Thicknesses', value: '4 mm to 18 mm', pending: true }
    ],
    features: [
      'Flat, stable sheets for printing and panelling',
      '100% waterproof for exterior signage',
      'Smooth surface ready for finishing'
    ],
    gallery: [
      { src: 'assets/img/fibreboard-grid.jpg', alt: 'Grid of flat fibreboard sheets ready for finishing' },
      { src: 'assets/img/school-chair.jpg', alt: 'School chair built from composite board panels' }
    ]
  },
  {
    slug: 'roofing-sheets',
    name: 'Roofing Sheets',
    href: routes.roofingSheets,
    tag: 'From waste',
    blurb: 'Durable roofing sheets made from recycled waste material.',
    long: 'Ecolink roofing sheets are manufactured from recycled plastic and fibre waste. They are lightweight, do not rust and are suited to industrial, agricultural and residential roofing.',
    img: 'assets/img/roofing.jpg',
    alt: 'Recycled roofing sheet',
    specs: [
      { label: 'Material', value: 'Recycled plastic and fibre composite' },
      { label: 'Profile', value: 'Corrugated', pending: true },
      { label: 'Sizes', value: 'Custom lengths', pending: true },
      { label: 'Colour range', value: 'To be confirmed by client', pending: true }
    ],
    features: [
      'Will not rust or corrode',
      'Lightweight and easy to install',
      'Made from recycled waste'
    ],
    gallery: [
      { src: 'assets/img/industry-construction.jpg', alt: 'Industrial shed under construction with roofing structure' },
      { src: 'assets/img/prefab-cabin.jpg', alt: 'Rural prefab cabin roofed with recycled sheets' }
    ]
  },
  {
    slug: 'doors',
    name: 'Doors',
    href: routes.doors,
    tag: 'From waste',
    blurb: 'Flush and moulded doors made with recycled composite board.',
    long: 'Ecolink doors are built on recycled composite cores, giving them moisture resistance and dimensional stability that conventional doors do not offer.',
    img: 'assets/img/doors.jpg',
    alt: 'Recycled composite door',
    specs: [
      { label: 'Type', value: 'Flush and moulded doors', pending: true },
      { label: 'Core', value: 'Recycled composite board' },
      { label: 'Sizes', value: 'Standard and custom', pending: true },
      { label: 'Finish range', value: 'To be confirmed by client', pending: true }
    ],
    features: [
      'Moisture-resistant core that will not swell',
      'Stable in humid and coastal conditions',
      'Made from recycled waste'
    ],
    gallery: [
      { src: 'assets/img/door-hallway.jpg', alt: 'White flush door fitted in a bright hallway' },
      { src: 'assets/img/door-rustic.jpg', alt: 'Rustic wooden-finish door in a character interior' },
      { src: 'assets/img/door-display.jpg', alt: 'Composite door on exhibition display' }
    ]
  },
  {
    slug: 'pallets',
    name: 'Pallets',
    href: routes.pallets,
    tag: 'From waste',
    blurb: 'Heavy-duty pallets manufactured from recycled composite material.',
    long: 'Ecolink pallets are pressed from recycled composite material. They do not rot, do not absorb moisture and are exempt from ISPM-15 heat treatment requirements.',
    img: 'assets/img/pallets.jpg',
    alt: 'Recycled composite pallet',
    specs: [
      { label: 'Material', value: 'Recycled composite board' },
      { label: 'Load capacity', value: 'To be confirmed by client', pending: true },
      { label: 'Sizes', value: 'Standard export sizes and custom', pending: true },
      { label: 'Compliance', value: 'ISPM-15 exempt (plastic composite)', pending: true }
    ],
    features: [
      'Will not rot, swell or absorb water',
      'Lighter than hardwood pallets of the same strength',
      'Reusable for many shipping cycles'
    ],
    gallery: [
      { src: 'assets/img/recycled-pallet.jpg', alt: 'Recycled composite pallet in a warehouse' },
      { src: 'assets/img/pallet-jack.jpg', alt: 'Worker moving loaded pallets with a pallet jack' },
      { src: 'assets/img/warehouse-sacks.jpg', alt: 'Goods stacked on pallets in warehouse storage' }
    ]
  }
];

export const productApplications = {
  'ecolink-boards': [
    'Furniture and cabinetry',
    'Interior panelling',
    'Packaging and inserts',
    'Mattress and headboard supports',
    'Luggage and hard-shell cases'
  ],
  'ecoshakti-boards': [
    'Bathroom and kitchen furniture',
    'Exterior panelling',
    'Coastal and humid environments',
    'Wet-area signage',
    'Replacement for plywood in wet areas'
  ],
  'ess-boards': [
    'Outdoor signage',
    'Wall and ceiling panelling',
    'Furniture panels',
    'Exhibition and retail displays',
    'Exterior cladding'
  ],
  'roofing-sheets': [
    'Industrial sheds',
    'Agricultural buildings',
    'Residential roofing',
    'Shelters and outbuildings'
  ],
  doors: [
    'Residential doors',
    'Commercial interiors',
    'Humid and coastal properties',
    'Bathroom and kitchen doors'
  ],
  pallets: [
    'Export shipping',
    'Warehouse handling',
    'Cold storage',
    'Chemical and food-grade storage'
  ]
};

export const otherProducts = products.slice(3);

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const aboutStory = {
  eyebrow: 'Our story',
  title: 'Built on waste, since 2005.',
  paras: [
    'Ecolink India is the manufacturing brand of Deluxe Recycling (India) Pvt. Ltd., a recycling company operating since 2005. What began as a waste collection business grew into something bigger: a factory that turns other people\'s waste into products people buy.',
    'Today the company does three things — it manufactures recycled composite boards, sheets, roofing, doors and pallets; it buys and processes hard-to-recycle waste; and it exports complete recycling plants with technology developed in-house.',
    'The loop closes at our own factory. The waste we buy becomes the boards we sell, and the offcuts come back as feedstock for the next batch.'
  ]
};

export const aboutValues = [
  { no: '01', title: 'Waste is feedstock', body: 'We buy what others discard — plastic, wood, paper, tyres, cotton — because it is raw material, not rubbish.' },
  { no: '02', title: 'Products must perform', body: 'A recycled product only matters if it competes on price and performance with the virgin alternative.' },
  { no: '03', title: 'Technology in-house', body: 'Our recycling plant technology is developed and built by our own engineering team.' },
  { no: '04', title: 'Say what is true', body: 'We publish verified specifications only. Where a number is not yet confirmed, we say so.' }
];

export const aboutStats = [
  { value: 27, suffix: '+', label: 'Years in recycling' },
  { value: 3000, suffix: '', label: 'MT waste diverted / year', grouping: true },
  { value: 37000, suffix: '', label: 'MT boards produced / year', grouping: true }
];

/* ------------------------------------------------------------------ */
/* Solutions                                                           */
/* ------------------------------------------------------------------ */

export const solutionsIntro = {
  eyebrow: 'Technology & turnkey solutions',
  title: 'Complete recycling plants, delivered worldwide.',
  text: 'Ecolink designs, builds and commissions complete recycling plants. Our technology is developed in-house, proven in our own factory, and now running for buyers across Asia, Africa and the Middle East.'
};

export const plantCountries = [
  { name: 'Turkey', lat: 39, lon: 35 },
  { name: 'Kenya', lat: 0, lon: 37 },
  { name: 'Malaysia', lat: 4, lon: 102 },
  { name: 'India', lat: 22, lon: 79 },
  { name: 'Philippines', lat: 13, lon: 122 },
  { name: 'East Timor', lat: -9, lon: 125 },
  { name: 'Sri Lanka', lat: 7, lon: 81 }
];

export const plantSteps = [
  { no: '01', title: 'Feedstock assessment', body: 'We analyse your available waste streams and recommend the right plant configuration.' },
  { no: '02', title: 'Plant design', body: 'Layout, throughput and product specification are engineered to your market.' },
  { no: '03', title: 'Manufacturing', body: 'Machinery is built at our own facility in India and factory-tested before dispatch.' },
  { no: '04', title: 'Shipping & installation', body: 'Equipment is shipped, installed and assembled on your site.' },
  { no: '05', title: 'Training', body: 'Your operators are trained on running and maintaining the plant.' },
  { no: '06', title: 'Ongoing support', body: 'We remain available for spares, optimisation and capacity expansion.' }
];

export const wasteTaken = ['Plastic', 'Wood', 'Paper', 'Tyres', 'Cotton', 'Other hard-to-recycle waste'];
export const comesOut = ['Boards', 'Sheets', 'Roofing', 'Doors', 'Pallets'];

export const plantSizes = [
  { name: 'Small', body: 'Entry-level plant for local markets and first-time recyclers.' },
  { name: 'Medium', body: 'Balanced throughput for regional supply and multi-product output.' },
  { name: 'Large', body: 'Industrial-scale capacity for export-oriented operations.' }
];

export const epr = {
  title: 'Extended Producer Responsibility (EPR)',
  body: 'Governments across Asia and Africa are introducing EPR rules that make brands responsible for the waste their products create. A recycling plant turns that obligation into a local supply chain — and a revenue stream.'
};

/* ------------------------------------------------------------------ */
/* Environment                                                         */
/* ------------------------------------------------------------------ */

export const environment = {
  eyebrow: 'Environment',
  title: 'The maths of waste.',
  lead: 'Every tonne we process is a tonne that is not buried, burned or flushed into a river. These are the flows through our factory, stated plainly.',
  wasteTaken,
  comesOut,
  zeros: threeZeros,
  stats: [
    { value: 3000, suffix: '', label: 'MT of waste diverted per year', grouping: true },
    { value: 37000, suffix: '', label: 'MT of boards produced per year', grouping: true },
    { value: 27, suffix: '+', label: 'Years of continuous operation' }
  ]
};

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqs = [
  { q: 'What are Ecolink boards made from?', a: 'Recycled plastic, wood flour and paper waste — all hard-to-recycle streams that would otherwise be landfilled.' },
  { q: 'Are Ecolink boards waterproof?', a: 'Ecolink Boards are water resistant. For fully waterproof applications, specify Ecoshakti Boards or ESS Boards, which are 100% waterproof.' },
  { q: 'What sizes and thicknesses do you supply?', a: 'Standard sheet size is 8 ft × 4 ft, with thicknesses from 6 mm to 25 mm. Custom sizes are available on request. [Confirm with client]', pending: true },
  { q: 'Can I cut, drill, paint or glue the boards?', a: 'Yes — the boards work with standard woodworking tools, fasteners and adhesives. [Confirm with client]', pending: true },
  { q: 'Do the boards contain formaldehyde?', a: 'No formaldehyde binders are added during manufacturing.' },
  { q: 'Are the boards termite resistant?', a: 'Yes. The composite material does not provide a food source for termites.' },
  { q: 'How much waste does one board divert?', a: 'Each board is manufactured from recycled waste material. Exact per-unit figures are being compiled for publication. [Confirm with client]', pending: true },
  { q: 'What is the difference between Ecolink, Ecoshakti and ESS?', a: 'Ecolink Boards are water resistant. Ecoshakti Boards and ESS Boards are 100% waterproof. Ecoshakti is supplied in board form, ESS in sheet form.' },
  { q: 'Do you deliver across India?', a: 'Yes, we dispatch across India and export internationally. [Confirm with client]', pending: true },
  { q: 'Do you export recycling plants?', a: 'Yes. Complete plants are designed, built and commissioned in-house and shipped to buyers worldwide.' },
  { q: 'How do I get a price or a quote?', a: 'Use the enquiry form on the Contact page or call us. We respond to qualified enquiries within one working day.' },
  { q: 'What certifications do the products carry?', a: 'Certification details are being finalised and will be published here once confirmed. [Confirm with client]', pending: true }
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  eyebrow: 'Contact',
  title: 'Talk to us.',
  lead: 'Product enquiries, plant enquiries, waste supply or anything else — send a message and we will get back to you.'
};

export const contactDetails = [
  { label: 'Phone', value: site.phone, href: 'tel:' + site.phone.replace(/\s/g, ''), pending: true },
  { label: 'Email', value: site.email, href: 'mailto:' + site.email, pending: true },
  { label: 'Factory', value: site.address, pending: true },
  { label: 'Hours', value: 'Mon – Sat, 9:00 – 18:00 IST', pending: true }
];

export const enquiryTypes = [
  'Product enquiry',
  'Price / quotation',
  'Waste supply',
  'Technology & Turnkey Solutions',
  'Partnership',
  'Other'
];

/* ------------------------------------------------------------------ */
/* Comparison table (home)                                             */
/* ------------------------------------------------------------------ */

export const comparison = {
  note: 'Indicative comparison based on typical application requirements. Confirm with your Ecolink India representative before specifying.',
  head: ['Property', 'Ecolink', 'Plywood', 'MDF'],
  rows: [
    ['Water resistance', 'Water resistant', 'Swells when wet', 'Swells when wet'],
    ['Termite & rot', 'Resistant', 'Susceptible', 'Susceptible'],
    ['Made from waste', 'Yes', 'Timber', 'Timber fibre'],
    ['Screw holding', 'Good', 'Good', 'Fair'],
    ['Cut, drill, paint', 'Yes', 'Yes', 'Yes']
  ]
};

/* ------------------------------------------------------------------ */
/* Trusted by / testimonials                                           */
/* ------------------------------------------------------------------ */

export const trustedBy = [
  { name: 'Deluxe Recycling', img: 'assets/img/logo-deluxe.png', alt: 'Deluxe Recycling logo' }
  // pending: client to supply customer / partner logos
];

/** Only rendered when the client supplies real quotes. */
export const testimonials = [
  // pending: client to supply verified customer quotes
];

export const downloads = [
  // pending: client to supply brochures and spec sheets
];

/* ------------------------------------------------------------------ */
/* Forms                                                               */
/* ------------------------------------------------------------------ */

/**
 * Set FORM_ENDPOINT at build time to enable real form submission:
 *   FORM_ENDPOINT=https://example.com/api/enquiry node build.mjs
 * When empty, the form shows an honest "not yet connected" state.
 */
export const formEndpoint = process.env.FORM_ENDPOINT || '';
