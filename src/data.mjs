/**
 * Central content for the Ecolink India site.
 *
 * Source of truth: ../Ecolink_India_Website_Copy_Deck.docx.md (v1, 27 Oct 2026)
 * plus the client's questionnaire answers (Nov 2026):
 *   - Ecoshakti is a separate brand → own page + link out to ecoshakti.in
 *   - "Pioneer" is used · 27 years · 3,000 t/month · 37,000 t/yr · 1,00,000 t target
 *   - Standard sheet 8 x 4 ft, custom sizes on request, 4 mm–50 mm
 *   - Office number only (+ one mobile, pending), factory shown as location only
 *   - Fire class B stated once, never elaborated
 *   - Testimonials (Bajaj, TVS, Atul), logos, certifications, leader photo: to be supplied
 *   - No news page
 *
 * Nothing here is invented. Items still awaiting the client are left empty
 * (and the matching section stays hidden) — see OPEN-ITEMS.md.
 */

export const siteUrl = 'https://ecolinkindia.com';

export const site = {
  name: 'Ecolink India',
  legalName: 'Deluxe Recycling (India) Pvt. Ltd.',
  tagline: 'Waste goes in. Boards come out.',
  about: 'Ecolink India is a brand of Deluxe Recycling (India) Pvt. Ltd. We’ve been turning packaging waste into useful things since 1999.',
  since: 1999,
  years: 27,
  email: 'info@ecolinkindia.com',
  phones: [
    { label: 'Office', value: '+91 22 6610 1195', href: 'tel:+912266101195' }
    // client confirmed: office line only
  ],
  office: ['A-Wing, 2nd Floor, Kakad House', 'Opp Bombay Hospital, New Marine Lines', 'Mumbai 400020'],
  officeMap: 'https://www.google.com/maps/search/?api=1&query=Kakad+House+New+Marine+Lines+Mumbai+400020',
  factory: 'Gujarat & Maharashtra',
  copyright: `© 2026 Deluxe Recycling (India) Pvt. Ltd. All rights reserved.`,
  ecoshaktiUrl: 'https://ecoshakti.in',
  social: [] // pending: client to supply LinkedIn / YouTube / Instagram URLs
};

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
      { label: 'Ecolink Boards', href: routes.ecolinkBoards, desc: 'Water resistant · packaging waste', img: 'assets/img/film/board-edges.jpg' },
      { label: 'Ecoshakti Boards', href: routes.ecoshaktiBoards, desc: '100% waterproof · multi-layer plastic', img: 'assets/img/b/board-closeup.jpg', badge: 'Sister brand' },
      { label: 'ESS Boards', href: routes.essBoards, desc: '100% waterproof · tubes & flexibles', img: 'assets/img/film/sheet-surface.jpg' },
      { label: 'Roofing Sheets', href: routes.roofingSheets, desc: 'Roofing from recycled waste' },
      { label: 'Doors', href: routes.doors, desc: 'Solid doors with no wood in them' },
      { label: 'Pallets', href: routes.pallets, desc: 'Carry the load, trip after trip' }
    ]
  },
  { label: 'Solutions', href: routes.solutions },
  { label: 'Environment', href: routes.environment },
  { label: 'FAQ', href: routes.faq },
  { label: 'Contact', href: routes.contact }
];

/* ------------------------------------------------------------------ */
/* Media                                                               */
/* ------------------------------------------------------------------ */

const CLD = 'https://res.cloudinary.com/qxjpbgh6/video/upload';
const FILM = 'v1794483928/Mutli-Layer_Plastic_Recycling_Line-_Deluxe_Recycling';

export const media = {
  heroLoop: { large: 'assets/video/hero-1600.mp4', small: 'assets/video/hero-960.mp4', poster: 'assets/img/hero-poster.jpg' },
  film: {
    title: 'Multi-layer plastic recycling line — Deluxe Recycling',
    src: `${CLD}/q_auto,w_1600/${FILM}.mp4`,
    poster: `${CLD}/so_16,w_1600,q_auto/${FILM}.jpg`,
    duration: '2:43'
  },
  /** Off until the client confirms (they were on the old News page, which is being removed). */
  showPress: false,
  /** Third-party coverage that ran on the old site (YouTube). Click-to-load, no-cookie, local thumbnails. */
  press: [
    { id: 'XnKMu8stlb0', outlet: 'CNBC-TV18', title: 'Tetra Pak’s CSR initiative — The Changemakers' },
    { id: '8J3_lgDVrdo', outlet: 'Mumbai Live', title: 'From Tetra Pak cartons to benches' },
    { id: 'I6TSXk2-kDI', outlet: 'India TV', title: 'Tetra Pak cartons recycled into school desks and chairs' }
  ],
  docs: {
    testResults: { href: 'assets/docs/ecolink-ess-test-results.pdf', label: 'Test results — Ecolink & ESS Boards', size: 'PDF · 1.7 MB' },
    brochure: { href: 'assets/docs/deluxe-recycling-plant-brochure.pdf', label: 'Plant & machinery brochure', size: 'PDF · 3.6 MB' }
  }
};

/* ------------------------------------------------------------------ */
/* Shared facts                                                        */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: 27, label: 'years of recycling, since 1999' },
  { value: 3000, label: 'tonnes of waste recycled every month', unit: 't', grouping: true },
  { value: 37000, label: 'tonnes a year', unit: 't', grouping: true },
  { value: 100000, label: 'tonnes a year, where we’re headed', unit: 't', grouping: true, target: true }
];

export const sheet = {
  size: '8 x 4 feet',
  thickness: '4 mm to 50 mm',
  minMm: 4,
  maxMm: 50,
  custom: 'Custom sizes are made as per your requirement.'
};

export const wasteStreams = [
  { name: 'Aseptic beverage cartons', short: 'Cartons', img: 'assets/img/b/raw-carton.jpg' },
  { name: 'Multi-layer plastic waste', short: 'MLP', img: 'assets/img/b/raw-mlp.jpg' },
  { name: 'Poly Al waste', short: 'Poly Al', img: 'assets/img/b/raw-polyal.jpg' },
  { name: 'Mix plastic waste', short: 'Mix plastic', img: 'assets/img/b/raw-mix.jpg' },
  { name: 'Collapsible tubes', short: 'Tubes', img: 'assets/img/b/raw-tubes.jpg' },
  { name: 'Mill plastic waste', short: 'Mill plastic', img: 'assets/img/b/raw-mill.jpg' }
];

export const threeZeros = [
  { title: 'Water effluent', body: 'Nothing dirty goes down the drain.' },
  { title: 'Solid waste', body: 'Everything that comes in goes out as product.' },
  { title: 'Gas emissions', body: 'The process doesn’t add to the air.' }
];

/** Order follows the client's numbering in the copy deck (1–4 first). */
export const endUses = [
  { title: 'Auto-rickshaws', body: 'Seating and backrests.', img: 'assets/img/film/rickshaw-seat.jpg' },
  { title: 'Shuttering and formwork', body: 'Builders use the boards to hold wet concrete in shape.', img: 'assets/img/b/app-shuttering.jpg' },
  { title: 'Road modules', body: 'Panels laid into road surfaces.', img: 'assets/img/b/app-road.jpg' },
  { title: 'Industrial pallets', body: 'They carry the cement bags and everything else.', img: 'assets/img/cement-pallet.jpg' },
  { title: 'Furniture', body: 'Benches, tables, chairs and cupboards.', img: 'assets/img/b/app-bench.jpg' },
  { title: 'Doors', body: 'Solid, and made of waste.', img: 'assets/img/door-display.jpg' },
  { title: 'Public spaces', body: 'Benches and garbage bins.', img: 'assets/img/recycling-bin.jpg' },
  { title: 'Stationery, gifts and exhibition stands', body: 'Smaller jobs, same board.', img: 'assets/img/fibreboard-grid.jpg' }
];

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const home = {
  seoTitle: 'Ecolink India | Boards, Doors and Pallets Made From Waste',
  seoDesc: 'India’s pioneer in recycled composite boards. We turn used packaging into waterproof boards, doors, pallets and roofing. Recycling since 1999.',
  hero: {
    headline: 'Waste goes in. Boards come out.',
    sub: 'Since 1999 we’ve been collecting the packaging India throws away and pressing it into boards, doors, pallets and roofing that last.'
  },
  whatWeDo: {
    title: 'India throws away a lot of packaging. We find a use for it.',
    paras: [
      'Juice cartons. Chips packets. Toothpaste tubes. Most of it is made of layers that don’t come apart, so most of it never gets recycled. It ends up in a landfill, a drain or a fire.',
      'We worked out another way. We shred it, press it and turn it into solid boards that builders, carpenters and factories actually want to use.',
      'We’ve been at it since 1999. We’re India’s pioneer in recycled composite boards, and we still know this material better than anyone.'
    ]
  },
  process: {
    title: 'From the bin to the building site',
    steps: [
      { title: 'Collect', body: 'Used cartons, multi-layer plastic, flexible packaging and tubes arrive at our plant by the truckload.', img: 'assets/img/film/forklift-bales.jpg' },
      { title: 'Shred', body: 'It’s sorted and cut down into small flakes.', img: 'assets/img/film/shredder.jpg' },
      { title: 'Press', body: 'Heat and pressure fuse the flakes into a solid sheet. No trees are cut. No formaldehyde is used.', img: 'assets/img/film/hot-press.jpg' },
      { title: 'Make', body: 'The boards are cut to size and become doors, pallets, roofing, furniture and more.', img: 'assets/img/film/board-stacks.jpg' }
    ]
  },
  becomes: {
    title: 'Once it’s a board, it can be almost anything.',
    text: 'Doors. Pallets. Roofing sheets. Furniture. Shuttering and formwork. Road modules. Park benches. Garbage bins. Seating and backrests for auto-rickshaws. Even stationery and gifts.'
  },
  zeros: { title: 'Our plant runs on three zeros.', text: 'What comes in as waste goes out as product. Nothing is left behind.' },
  comparison: {
    title: 'Why not just use plywood?',
    text: 'Plywood comes from trees. MDF and particle board come from wood chips and glue, and they swell once water gets in. Our boards come from waste, and two of the three don’t mind water at all.',
    head: ['', 'Our boards', 'Plywood', 'MDF and particle board'],
    rows: [
      ['Made from', 'Packaging waste', 'Trees', 'Wood chips and adhesive'],
      ['Trees cut', 'None', 'Yes', 'Yes'],
      ['Water', 'Ecolink is water resistant. Ecoshakti and ESS are 100% waterproof.', 'Layers can swell and peel', 'Swells and breaks down'],
      ['Formaldehyde', 'None', 'Often in the adhesive', 'Often in the adhesive']
    ]
  },
  solutions: {
    title: 'Want to start recycling too?',
    text: 'We build recycling plants as well. Sizes run from 1.5 to 10 tonnes a day, set up and handed over ready to run. Plants built on our technology are working in 7 countries.'
  },
  cta: { title: 'Got something to build?', text: 'Tell us what it is. We’ll tell you which board does it best.' }
};

/* ------------------------------------------------------------------ */
/* Clients                                                             */
/* ------------------------------------------------------------------ */

/** Client logos (supplied Nov 2026) — assets/img/logos/. A name without `logo` renders as type. */
export const clients = [
  { name: 'Bajaj', logo: 'assets/img/logos/bajaj.svg' },
  { name: 'TVS', logo: 'assets/img/logos/tvs.svg' },
  { name: 'Atul Auto', logo: 'assets/img/logos/atul.png' },
  { name: 'Godrej', logo: 'assets/img/logos/godrej.svg' },
  { name: 'Tetra Pak', logo: 'assets/img/logos/tetra-pak.svg' },
  { name: 'Indian Railways', logo: 'assets/img/logos/indian-railways.png' },
  { name: 'Food Corporation of India', logo: 'assets/img/logos/fci.svg', wide: true },
  { name: 'MSAMB', logo: 'assets/img/logos/msamb.png' },
  { name: 'Maharashtra State Warehousing Corporation', logo: 'assets/img/logos/mswc.png', wide: true },
  { name: 'Uno Minda', logo: 'assets/img/logos/uno-minda.svg' },
  { name: 'River Recycle', logo: 'assets/img/logos/river-recycle.svg', note: 'Finland' },
  { name: 'Kevian', logo: 'assets/img/logos/kevian.png', note: 'Kenya' },
  { name: 'Caltech', logo: 'assets/img/logos/caltech.svg' }
];

/** Rendered only once real quotes arrive: { quote, name, role, company }. */
export const testimonials = [
  // Bajaj · TVS · Atul — quote, name and designation to be supplied by the client
];

/** Rendered only once supplied: { name, img }. */
export const certifications = [];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  seoTitle: 'About Ecolink India | Recycling Packaging Waste Since 1999',
  seoDesc: 'Deluxe Recycling (India) Pvt. Ltd. has been turning packaging waste into boards since 1999. Meet the pioneers behind Ecolink.',
  hero: { headline: 'We’ve been at this since 1999.', sub: 'Turning used packaging into boards wasn’t an obvious idea back then. We tried it anyway.' },
  story: {
    question: 'What happens to a used juice carton?',
    paras: [
      'Deluxe Recycling (India) Pvt. Ltd. started with a plain question. What happens to a used juice carton?',
      'The honest answer was nothing good. So we went looking for a better one.',
      'It took years of trials, a lot of failed batches and plenty of patience. Then we had a board. Solid, strong and made entirely from packaging people had thrown out. We called it Ecolink, and we’ve been improving it ever since.',
      'Today our plants in Gujarat and Maharashtra recycle about 3,000 tonnes of waste every month. The boards go into doors, pallets, roofing, furniture, building sites and even roads. The know-how has travelled too. Recycling plants built on our technology are working in seven countries.'
    ]
  },
  believe: { title: 'Reduce. Reuse. Recycle.', text: 'Three words everyone knows. We just do all three, every day, one truck at a time.' },
  values: [
    { title: 'Balance', body: 'Good business and a cleaner planet should both win. If only one does, we’ve got it wrong.' },
    { title: 'Quality', body: 'A recycled board has to beat the alternative, not just feel better about itself.' },
    { title: 'Communication', body: 'We’ll tell you plainly what a board can do. And what it can’t.' },
    { title: 'Professionalism', body: 'Delivered when we said. Built the way we said.' }
  ],
  headed: {
    title: '37,000 tonnes today. 1,00,000 next.',
    text: 'We recycle 37,000 tonnes of waste a year. Our target is 1,00,000. That means more plants, more boards and a lot more cartons kept off the street.'
  },
  leader: {
    name: 'Jignesh Shah',
    role: '', // pending: designation
    bio: '', // pending: 80–100 words
    img: 'assets/img/jignesh-shah.jpg'
  },
  cta: { title: 'Want to know more?', text: 'Ask us anything about the boards, the plant or the process.' }
};

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export const productsPage = {
  seoTitle: 'Products | Recycled Boards, Roofing, Doors and Pallets | Ecolink India',
  seoDesc: 'Boards, roofing sheets, doors and pallets made from recycled packaging waste. Standard 8 x 4 ft sheets, 4 mm to 50 mm thick. Custom sizes on request.',
  hero: { headline: 'Made from waste. Built to be used.', sub: 'Boards, roofing, doors and pallets. All from packaging that would otherwise be thrown away.' },
  boards: { title: 'Three boards. One difference.', text: 'Every board we make starts as packaging waste. What changes is the kind of waste, and how the board handles water.' },
  endUses: { title: 'You’ve probably already walked past one.' },
  cta: { title: 'Not sure which board you need?', text: 'Tell us what you’re building. We’ll point you to the right one.' }
};

const fireB = { label: 'Fire class', value: 'B' };
const sheetSpecs = [
  { label: 'Standard sheet', value: sheet.size },
  { label: 'Custom sizes', value: 'Made on request' },
  { label: 'Thickness', value: sheet.thickness }
];

export const boards = [
  {
    slug: 'ecolink-boards',
    name: 'Ecolink Boards',
    href: routes.ecolinkBoards,
    water: 'Water resistant',
    waterLevel: 1,
    waste: 'Used packaging, including beverage cartons',
    wasteShort: 'Beverage cartons & packaging',
    rawImg: 'assets/img/b/raw-carton.jpg',
    img: 'assets/img/film/board-edges.jpg',
    hero: 'assets/img/film/board-stacks.jpg',
    seoTitle: 'Ecolink Boards | Water Resistant Boards From Packaging Waste',
    seoDesc: 'Water resistant Ecolink boards made from recycled packaging. 8 x 4 ft sheets, 4 mm to 50 mm thick, custom sizes on request. Get a quote.',
    sub: 'Water resistant boards, made from packaging waste.',
    what: [
      'Every Ecolink board starts as something someone used once. A juice carton. A milk pack. A wrapper. We shred it, press it and end up with a flat, solid sheet that works the way a board should.',
      'No tree is cut to make it.'
    ],
    specs: [{ label: 'Made from', value: 'Packaging waste, including beverage cartons' }, ...sheetSpecs, { label: 'Water', value: 'Resistant' }, fireB],
    uses: ['Furniture and partitions', 'Shuttering and formwork on building sites', 'Benches and garbage bins', 'Stationery, gifts and exhibition stands'],
    usesImg: ['assets/img/b/app-bench.jpg', 'assets/img/b/app-shuttering.jpg', 'assets/img/terrazzo-bench.jpg', 'assets/img/fibreboard-grid.jpg'],
    note: 'Ecolink is water resistant, not waterproof. It handles damp and splashes well. If your board will sit in standing water, look at Ecoshakti or ESS instead.',
    downloads: ['testResults'],
    cta: 'Need Ecolink boards for a project?',
    quote: 'Get a quote for Ecolink Boards'
  },
  {
    slug: 'ecoshakti-boards',
    name: 'Ecoshakti Boards',
    href: routes.ecoshaktiBoards,
    sister: true,
    water: '100% waterproof',
    waterLevel: 2,
    waste: 'Multi-layer plastic waste',
    wasteShort: 'Multi-layer plastic',
    rawImg: 'assets/img/b/raw-mlp.jpg',
    img: 'assets/img/b/board-closeup.jpg',
    hero: 'assets/img/film/press-line.jpg',
    seoTitle: 'Ecoshakti Boards | 100% Waterproof Boards From Plastic Waste',
    seoDesc: '100% waterproof Ecoshakti boards made from multi-layer plastic waste. 8 x 4 ft sheets, 4 mm to 50 mm thick. Custom sizes available.',
    sub: '100% waterproof. Made from multi-layer plastic waste.',
    what: [
      'Look at a chips packet. Plastic outside, foil inside, bonded so tightly that most recyclers won’t go near it. We do. We turn it into Ecoshakti, a board water can’t get into.'
    ],
    specs: [{ label: 'Made from', value: 'Multi-layer plastic waste' }, ...sheetSpecs, { label: 'Water', value: '100% waterproof' }, fireB],
    uses: ['Wet areas and outdoor use', 'Shuttering and formwork that gets rained on', 'Benches and garbage bins', 'Road modules'],
    usesImg: ['assets/img/terrazzo-bench.jpg', 'assets/img/b/app-board-wall.jpg', 'assets/img/recycling-bin.jpg', 'assets/img/b/app-road.jpg'],
    downloads: [],
    cta: 'Need a board that ignores water?',
    quote: 'Get a quote for Ecoshakti Boards'
  },
  {
    slug: 'ess-boards',
    name: 'ESS Boards',
    href: routes.essBoards,
    water: '100% waterproof',
    waterLevel: 2,
    waste: 'Flexible packaging and collapsible tubes',
    wasteShort: 'Tubes & flexible packaging',
    rawImg: 'assets/img/b/raw-tubes.jpg',
    img: 'assets/img/film/sheet-surface.jpg',
    hero: 'assets/img/film/quality-check.jpg',
    seoTitle: 'ESS Boards | 100% Waterproof Composite Boards | Ecolink India',
    seoDesc: '100% waterproof ESS composite boards made from flexible packaging and collapsible tubes. 8 x 4 ft sheets, 4 mm to 50 mm thick.',
    sub: '100% waterproof composite board, made from flexible packaging and old tubes.',
    what: [
      'Toothpaste tubes. Cosmetic tubes. Soft, squeezable packaging. Hardly anyone wants this stuff, so we took it. Pressed together, it becomes a tough composite board that shrugs off water.'
    ],
    specs: [{ label: 'Made from', value: 'Flexible packaging and collapsible tubes' }, ...sheetSpecs, { label: 'Water', value: '100% waterproof' }, fireB],
    uses: ['Wet areas and outdoor use', 'Furniture that lives outside', 'Benches and garbage bins', 'Pallets and shuttering'],
    usesImg: ['assets/img/film/sheet-surface.jpg', 'assets/img/b/app-bench.jpg', 'assets/img/recycling-bin.jpg', 'assets/img/recycled-pallet.jpg'],
    downloads: ['testResults'],
    cta: 'Want to see it in your project?',
    quote: 'Get a quote for ESS Boards'
  }
];

export const madeProducts = [
  {
    slug: 'doors',
    name: 'Doors',
    href: routes.doors,
    line: 'Solid doors with no wood in them.',
    img: 'assets/img/door-display.jpg',
    hero: 'assets/img/b/app-door.jpg',
    seoTitle: 'Recycled Composite Doors | Solid Doors Without Wood | Ecolink India',
    seoDesc: 'Solid composite doors made from recycled packaging waste. No wood, no trees cut. Get a quote from Ecolink India.',
    what: ['A door gets slammed, kicked, painted and left out in the rain. It had better be tough. Ours are solid composite doors pressed from recycled packaging, so no tree is cut for them.'],
    specs: [
      { label: 'Made from', value: 'Recycled packaging waste' },
      { label: 'Build', value: 'Solid composite' },
      { label: 'Sizes, thickness and finishes', value: 'On request' }
    ],
    uses: ['Homes and apartments', 'Offices and schools', 'Site cabins and farmhouses'],
    usesImg: [],
    cta: 'Want a door that didn’t cost a tree?',
    quote: 'Get a quote for Doors'
  },
  {
    slug: 'pallets',
    name: 'Pallets',
    href: routes.pallets,
    line: 'Pallets that carry the load, trip after trip.',
    img: 'assets/img/recycled-pallet.jpg',
    hero: 'assets/img/pallet-render.jpg',
    seoTitle: 'Recycled Composite Pallets | Industrial Pallets | Ecolink India',
    seoDesc: 'Strong industrial pallets made from recycled packaging waste. Built for static and dynamic loads. Get a quote from Ecolink India.',
    what: ['Pallets get dropped, dragged, stacked and left out in the weather. Ours are made from recycled packaging and pressed to take it. They work in warehouses, on factory floors and on the back of trucks.'],
    specs: [
      { label: 'Made from', value: 'Recycled packaging waste' },
      { label: 'Load', value: 'Static and dynamic' },
      { label: 'Sizes', value: 'On request' }
    ],
    uses: ['Warehouses and distribution', 'Cement, chemical and FMCG plants', 'Factory floors and loading docks'],
    usesImg: ['assets/img/warehouse-sacks.jpg', 'assets/img/cement-pallet.jpg', 'assets/img/b/app-pallets.jpg'],
    cta: 'Moving something heavy?',
    quote: 'Get a quote for Pallets'
  },
  {
    slug: 'roofing-sheets',
    name: 'Roofing Sheets',
    href: routes.roofingSheets,
    line: 'Roofing sheets made from recycled packaging waste.',
    img: 'assets/img/film/press-line.jpg',
    hero: 'assets/img/film/press-line.jpg',
    seoTitle: 'Roofing Sheets From Recycled Waste | Ecolink India',
    seoDesc: 'Roofing sheets made from recycled packaging waste by Ecolink India. Sizes and profiles on request. Get a quote.',
    what: ['Roofing sheets made from the same recycled packaging waste as our boards. Sizes and profiles are made to order, so tell us what you’re covering.'],
    specs: [
      { label: 'Made from', value: 'Recycled packaging waste' },
      { label: 'Sizes and profiles', value: 'On request' }
    ],
    uses: [],
    usesImg: [],
    cta: 'Need a roof over something?',
    quote: 'Get a quote for Roofing Sheets'
  }
];

export const allProducts = [...boards, ...madeProducts];

/* ------------------------------------------------------------------ */
/* Solutions                                                           */
/* ------------------------------------------------------------------ */

export const solutionsPage = {
  seoTitle: 'Turnkey Recycling Plants for Mixed and Multi-Layer Plastic | Ecolink India',
  seoDesc: 'Turnkey recycling plants for mix plastic and multi-layer plastic waste, from 1.5 to 10 tonnes a day. No washing required. Built by Ecolink India.',
  hero: {
    headline: 'Start your own recycling plant.',
    sub: 'Turnkey plants for mix plastic waste and multi-layer plastic waste. Eco-friendly technology. No washing required.'
  },
  idea: [
    'You bring the waste and the land. We bring 27 years of knowing how to turn it into boards.',
    'We didn’t learn this from a textbook. We learned it by running our own plant since 1999. So when we build one for you, we’re handing over something that already works.'
  ],
  noWash: { title: 'No washing. Really.', text: 'Most plastic recycling starts with a wash. That means water, drains and dirty effluent to deal with. Our process skips it. Less water, less cost, less mess.' },
  out: ['Water resistant boards', '100% waterproof boards', '100% waterproof composite boards'],
  outUses: ['doors', 'pallets', 'benches', 'garbage bins', 'shuttering', 'road modules'],
  sizes: [
    { tpd: 1.5, area: 700, heating: 'Electrical', power: 170 },
    { tpd: 3.0, area: 1100, heating: 'Electrical', power: 250 },
    { tpd: 5.0, area: 2500, heating: 'Multi-fuel fired', power: 201 },
    { tpd: 10.0, area: 3000, heating: 'Multi-fuel fired', power: 370 }
  ],
  steps: [
    { title: 'Plan', body: 'We design the plant layout and process for your waste and your space.' },
    { title: 'Build', body: 'The machinery is made and supplied.' },
    { title: 'Install', body: 'We set it up on site.' },
    { title: 'Calibrate', body: 'Trial runs until the boards come out right.' },
    { title: 'Train', body: 'Your team learns to run it.' },
    { title: 'Support', body: 'We stay on the line when you need us, including help with EPR planning.' }
  ],
  epr: 'Brands and producers are now responsible for the packaging they put into the market. Recycling is how they meet that responsibility. A plant like this helps you do it.',
  cta: { title: 'Thinking about a plant?', text: 'Tell us what waste you have and how much space. We’ll suggest a size.' }
};

/** Projection bounds for the dot map (tools/dotmap.mjs) and the pins. */
export const mapView = { lon0: 5, lon1: 140, lat0: -22, lat1: 50, step: 1.35 };

export const plants = [
  { country: 'Turkey', lat: 39, lon: 34, tpd: ['10'] },
  { country: 'Kenya', lat: 0.2, lon: 37.5, tpd: ['3', '10', '10'] },
  { country: 'Malaysia', lat: 3.5, lon: 102, tpd: ['4'] },
  { country: 'India', lat: 20, lon: 76, tpd: ['20', '40', '50'], detail: ['Karnataka 20', 'Gujarat 40', 'Maharashtra 50'], home: true },
  { country: 'Philippines', lat: 13, lon: 122, tpd: ['1.5', '5'] },
  { country: 'East Timor', lat: -8.8, lon: 125.7, tpd: ['1.5'] },
  { country: 'Sri Lanka', lat: 7.6, lon: 80.7, tpd: ['3'] }
];
export const mumbai = { lat: 19.07, lon: 72.88 };

/* ------------------------------------------------------------------ */
/* Environment                                                         */
/* ------------------------------------------------------------------ */

export const environmentPage = {
  seoTitle: 'Environment | How Ecolink Turns Packaging Waste Into Boards',
  seoDesc: 'Zero water effluent, zero solid waste, zero gas emissions. See how Ecolink keeps packaging waste out of landfills and turns it into boards.',
  hero: { headline: 'A juice carton is used for ten minutes. Then what?', sub: 'We’ve spent 27 years answering that.' },
  problem: 'Packaging is made to be used once and thrown away. And a lot of it is hard to recycle, because it’s layers of paper, plastic and foil stuck together. The usual recyclers can’t pull them apart. So it gets dumped, burnt or left to pile up.',
  doing: 'We take it. All of it. We shred it and press it into boards, and the boards become things people use every day.',
  intake: ['Aseptic beverage cartons', 'Multi-layer plastic', 'Poly Al waste', 'Mix plastic waste', 'Flexible packaging', 'Collapsible tubes', 'Mill plastic waste'],
  safe: 'Our boards are made without formaldehyde.',
  rrr: 'We’re not the ones who made the waste. But we’re happy to be the ones who deal with it.',
  cta: { title: 'Have waste that needs a home?', text: 'If you make packaging waste or collect it, we’d like to hear from you.' }
};

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqPage = {
  seoTitle: 'FAQ | Ecolink Boards, Sizes, Water Resistance and Orders',
  seoDesc: 'Answers to common questions about Ecolink boards: sizes, thickness, water resistance, fire class, custom orders and recycling plants.',
  hero: { headline: 'Questions people ask us', sub: 'If yours isn’t here, just ask.' }
};

export const faqs = [
  { group: 'The boards', q: 'What are the boards made of?', a: 'Recycled packaging waste. Ecolink uses packaging including beverage cartons. Ecoshakti uses multi-layer plastic. ESS uses flexible packaging and tubes. No trees are cut.' },
  { group: 'The boards', q: 'What sizes do you make?', a: 'The standard sheet is 8 x 4 feet. Need something different? We make custom sizes as per your requirement.' },
  { group: 'The boards', q: 'How thick are the boards?', a: 'From 4 mm to 50 mm as standard.' },
  { group: 'The boards', q: 'Are the boards waterproof?', a: 'It depends on the board. Ecolink is water resistant. Ecoshakti and ESS are 100% waterproof.' },
  { group: 'The boards', q: 'What is the fire class?', a: 'Class B.' },
  { group: 'The boards', q: 'Is Ecoshakti different from Ecolink?', a: 'Both are made from waste. Ecoshakti is made from multi-layer plastic and is 100% waterproof. It also has its own website at ecoshakti.in.' },
  { group: 'Ordering', q: 'How do I order?', a: 'Send us an enquiry through the Contact page, or email info@ecolinkindia.com.' },
  { group: 'Ordering', q: 'Do you make anything besides boards?', a: 'Yes. Roofing sheets, doors, pallets, furniture and more. See the Products page.' },
  { group: 'Ordering', q: 'Where are your factories?', a: 'We have factories in Gujarat and Maharashtra. Our head office is in Mumbai.' },
  { group: 'Recycling plants', q: 'Do you build recycling plants?', a: 'Yes. Turnkey plants for mix plastic and multi-layer plastic waste, from 1.5 to 10 tonnes a day. See the Solutions page.' },
  { group: 'Recycling plants', q: 'What waste can your plants take?', a: 'Aseptic beverage cartons, multi-layer plastic waste, Poly Al waste, mix plastic waste, collapsible tubes and mill plastic waste.' }
  // pending: "Can I cut, drill, paint or glue the boards?" — answer from client
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contactPage = {
  seoTitle: 'Contact Ecolink India | Get a Quote or Talk to Our Team',
  seoDesc: 'Reach Ecolink India for boards, doors, pallets or recycling plants. Head office in Mumbai, factories in Gujarat and Maharashtra. Email info@ecolinkindia.com.',
  hero: { headline: 'Tell us what you’re building.', sub: 'A few boards, a truckload of pallets or a whole recycling plant. We’d like to hear about it.' },
  sent: 'Thanks. We’ve got your enquiry and someone will be in touch soon.',
  failed: 'Something went wrong. Please try again, or email us at info@ecolinkindia.com.'
};

export const enquiryTypes = ['Sales', 'Purchase', 'Technology & Turnkey Solutions', 'General'];
export const TOPIC_TECH = 'Technology & Turnkey Solutions';

/**
 * Set FORM_ENDPOINT at build time to enable real form submission:
 *   FORM_ENDPOINT=https://example.com/api/enquiry node build.mjs
 * When empty, the form shows an honest "not yet connected" state.
 */
export const formEndpoint = process.env.FORM_ENDPOINT || '';
