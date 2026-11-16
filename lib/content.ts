/**
 * BankFin content layer.
 *
 * Source of truth: source_materials/BankFin_SEO_Content_Master.md (Aug 2026).
 * Copy below preserves the approved wording. Anything not present in the
 * content master is marked `// VERIFY:` and listed in CLIENT_VERIFICATION.md.
 *
 * Never add interest rates, loan amounts, approval times, fees, lender names,
 * statistics, testimonials or approval guarantees here.
 */

export const site = {
  name: "BankFin",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bankfin.in",
  title: "BankFin | Loan & Financial Solutions for Individuals and Businesses",
  description:
    "Explore personal loans, home loans, business loans, MSME financing, project finance, overdraft facilities and loans against property with BankFin. Get personalized guidance for your financing needs.",
  positioning: "Smart Financing. Clear Guidance. Better Decisions.",
  proposition:
    "BankFin helps individuals, professionals, entrepreneurs, MSMEs, and businesses explore suitable financing options through personalized guidance and a streamlined loan-assistance process.",
  footerStatement:
    "BankFin helps individuals and businesses explore suitable financing solutions with personalized guidance and a clear, customer-focused process.",
  // VERIFY: contact details are published on the current site; confirm before launch.
  contact: {
    addressLines: ["NIRMALYAM KADAMPOYIL, PO, Chevayoor", "Kozhikode, Kerala 673017"],
    street: "NIRMALYAM KADAMPOYIL, PO, Chevayoor",
    locality: "Kozhikode",
    region: "Kerala",
    postalCode: "673017",
    country: "IN",
    email: "info@bankfin.com",
    phone: "+91-98765-43210",
    phoneHref: "tel:+919876543210",
  },
  disclaimer:
    "BankFin's services and financing options are subject to applicable eligibility criteria, lender policies, documentation, verification, and approval. Final loan amount, interest rate, tenure, fees, security requirements, and other terms are determined by the respective lender. Information on this website is for general informational purposes and does not constitute a guarantee of loan approval or financial advice.",
  processDisclaimer:
    "Final approval, interest rate, loan amount, tenure, fees, documentation, and other terms are determined by the respective lender and are subject to applicable eligibility and assessment criteria.",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
] as const;

export type IconKey =
  | "personal"
  | "home"
  | "business"
  | "msme"
  | "overdraft"
  | "project"
  | "property"
  | "car";

export type FaqItem = { q: string; a: string; services?: string[] };

export type Service = {
  slug: string;
  index: string;
  /** Full name used in headings and carousel. */
  name: string;
  /** Short name used in navigation menus. */
  navName: string;
  icon: IconKey;
  tagline: string;
  summary: string;
  short: string;
  cta: string;
  seo: { title: string; description: string };
  h1: string;
  intro: string[];
  useCases: { title: string; items: string[] };
  considerations?: { title: string; lead?: string; items: string[] };
  help: { title: string; body: string };
  important?: string;
  enquiryValue: string;
  related: string[];
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "personal-loans",
    index: "01",
    name: "Personal Loans",
    navName: "Personal Loans",
    icon: "personal",
    tagline: "Flexible finance for important personal goals.",
    summary:
      "Whether you are planning a major personal expense, managing an unexpected requirement, funding education, or consolidating eligible obligations, explore personal loan options aligned with your financial profile.",
    short: "Flexible financing for eligible personal requirements.",
    cta: "Explore Personal Loans",
    seo: {
      title: "Personal Loans | Flexible Financing Solutions | BankFin",
      description:
        "Explore personal loan options for eligible personal requirements with BankFin. Get personalized assistance with documentation, application and financing options.",
    },
    h1: "Personal Loans for Your Changing Needs",
    intro: [
      "Life does not always follow a financial plan. A personal loan may help eligible borrowers manage planned or unexpected expenses without using a specific asset as collateral, subject to lender criteria.",
      "BankFin helps you explore personal loan options and understand the application process before you proceed.",
    ],
    useCases: {
      title: "Suitable for",
      items: [
        "Planned personal expenses",
        "Education-related expenses",
        "Medical or emergency requirements",
        "Weddings and family occasions",
        "Debt consolidation where permitted",
        "Other eligible personal requirements",
      ],
    },
    considerations: {
      title: "Key considerations",
      items: [
        "Loan amount",
        "Interest rate",
        "Repayment tenure",
        "Credit profile",
        "Income and employment/business profile",
        "Existing financial obligations",
        "Applicable lender policies",
      ],
    },
    help: {
      title: "How BankFin Can Help",
      body: "We help you understand the available personal financing routes, documentation requirements, and next steps based on your profile.",
    },
    enquiryValue: "Personal Loan",
    related: ["home-loans", "loans-against-property", "car-loans"],
    imageAlt: "BankFin advisor discussing personal loan options",
  },
  {
    slug: "home-loans",
    index: "02",
    name: "Home Loans",
    navName: "Home Loans",
    icon: "home",
    tagline: "Move closer to owning the home you want.",
    summary:
      "Explore financing options for purchasing, constructing, or renovating a residential property, with guidance through the application and documentation process.",
    short: "Financing options for eligible home purchase, construction and renovation needs.",
    cta: "Explore Home Loans",
    seo: {
      title: "Home Loans | Home Purchase & Construction Finance | BankFin",
      description:
        "Explore home loan solutions for eligible property purchase, construction or renovation requirements with personalized assistance from BankFin.",
    },
    h1: "Turn Your Home Plans Into a Clear Financial Roadmap",
    intro: [
      "Buying or building a home is one of the biggest financial decisions many people make. BankFin helps you explore home loan options and navigate the financing process with greater clarity.",
    ],
    useCases: {
      title: "Financing may be relevant for",
      items: [
        "Purchase of a residential property",
        "Construction of a home",
        "Eligible home renovation",
        "Other lender-approved housing requirements",
      ],
    },
    considerations: {
      title: "What We Help You Understand",
      items: [
        "Eligibility considerations",
        "Loan amount and repayment capacity",
        "Tenure options",
        "Documentation",
        "Property-related requirements",
        "Application process",
      ],
    },
    help: {
      title: "How BankFin Can Help",
      body: "We help you explore home loan options and navigate the financing process with greater clarity, with guidance through the application and documentation process.",
    },
    enquiryValue: "Home Loan",
    related: ["loans-against-property", "personal-loans", "project-finance"],
    imageAlt: "Home loan consultation with BankFin",
  },
  {
    slug: "business-loans",
    index: "03",
    name: "Unsecured Business Loans",
    navName: "Business Loans",
    icon: "business",
    tagline: "Capital to help your business move forward.",
    summary:
      "Access financing options for eligible business needs without relying on traditional property collateral, subject to lender eligibility and assessment.",
    short: "Funding solutions for eligible business growth and working-capital requirements.",
    cta: "Explore Business Loans",
    seo: {
      title: "Unsecured Business Loans | Business Financing | BankFin",
      description:
        "Explore unsecured business loan options for eligible business needs such as expansion, working capital and growth, subject to lender criteria.",
    },
    h1: "Business Financing Without Traditional Property Collateral",
    intro: [
      "Growing businesses often need access to capital at the right time. Unsecured business financing may help eligible businesses address working-capital, expansion, operational, or growth requirements without offering traditional property collateral, subject to lender assessment.",
    ],
    useCases: {
      title: "Potential uses",
      items: [
        "Business expansion",
        "Working capital",
        "Equipment and operational requirements",
        "Business development",
        "Inventory and cash-flow needs",
        "Other eligible business purposes",
      ],
    },
    considerations: {
      title: "Built Around Your Business Requirement",
      lead: "The right financing structure depends on factors such as:",
      items: [
        "Business vintage",
        "Turnover",
        "Profitability",
        "Banking history",
        "Credit profile",
        "Existing liabilities",
        "Lender policy",
      ],
    },
    help: {
      title: "How BankFin Can Help",
      body: "We help you understand which business financing routes may be relevant, what information lenders generally look at, and how to prepare for the next stage.",
    },
    enquiryValue: "Business Loan",
    related: ["msme-loans", "overdraft", "project-finance"],
    imageAlt: "Business owner discussing financing options",
  },
  {
    slug: "msme-loans",
    index: "04",
    name: "MSME Loans",
    navName: "MSME Loans",
    icon: "msme",
    tagline: "Financing support for growing businesses.",
    summary:
      "Explore funding options designed around the needs of micro, small, and medium enterprises, including expansion, working capital, equipment, and other eligible business requirements.",
    short: "Financing options designed around the needs of growing businesses.",
    cta: "Explore MSME Financing",
    seo: {
      title: "MSME Loans | Business Funding Solutions | BankFin",
      description:
        "Explore MSME loan and business financing solutions for eligible working capital, expansion, equipment and growth requirements with BankFin.",
    },
    h1: "Financing Solutions for MSME Growth",
    intro: [
      "Small and medium-sized businesses need financing solutions that reflect how they actually operate. BankFin helps MSME owners explore suitable funding options for eligible business requirements.",
    ],
    useCases: {
      title: "Potential financing needs",
      items: [
        "Working capital",
        "Business expansion",
        "Equipment and machinery",
        "Inventory",
        "Business infrastructure",
        "Cash-flow requirements",
        "Other eligible business purposes",
      ],
    },
    help: {
      title: "Understand Your Funding Options",
      body: "We help you evaluate the type of financing that may be relevant to your business and guide you through the documentation and application journey.",
    },
    enquiryValue: "MSME Loan",
    related: ["business-loans", "overdraft", "loans-against-property"],
    imageAlt: "MSME financing consultation",
  },
  {
    slug: "overdraft",
    index: "05",
    name: "Overdraft Facilities",
    navName: "Overdraft Facilities",
    icon: "overdraft",
    tagline: "Flexible access to working capital.",
    summary:
      "An overdraft facility can help eligible businesses manage short-term cash-flow requirements and maintain operational flexibility.",
    short: "Flexible working-capital access for eligible businesses.",
    cta: "Discuss an Overdraft Facility",
    seo: {
      title: "Business Overdraft Facilities | Working Capital Solutions | BankFin",
      description:
        "Explore overdraft facilities for eligible businesses seeking flexible working-capital access and improved short-term cash-flow management.",
    },
    h1: "Flexible Working Capital When Your Business Needs It",
    intro: [
      "Cash flow can change from one week to the next. An overdraft facility can provide eligible businesses with flexible access to funds within an approved limit, helping manage short-term working-capital requirements.",
    ],
    useCases: {
      title: "Potential benefits",
      items: [
        "Flexible access within an approved limit",
        "Support for short-term cash-flow needs",
        "Interest generally linked to the amount utilized, subject to facility terms",
        "Greater operational flexibility",
      ],
    },
    help: {
      title: "How BankFin Can Help",
      body: "We help you understand how an overdraft facility works, what lenders generally consider, and the information needed to discuss a facility.",
    },
    important:
      "Availability, limit, pricing, security requirements, interest calculation, fees, and other terms depend on the lender and approved facility.",
    enquiryValue: "Overdraft",
    related: ["business-loans", "msme-loans", "project-finance"],
    imageAlt: "Business owner reviewing working-capital options",
  },
  {
    slug: "project-finance",
    index: "06",
    name: "Project Finance",
    navName: "Project Finance",
    icon: "project",
    tagline: "Plan and fund larger business initiatives.",
    summary:
      "Explore structured financing solutions for eligible projects, including expansion, infrastructure, development, and other capital-intensive requirements.",
    short: "Structured financing options for eligible large-scale projects.",
    cta: "Discuss Your Project",
    seo: {
      title: "Project Finance | Business & Project Funding Solutions | BankFin",
      description:
        "Explore project financing solutions for eligible business, infrastructure, development and expansion projects with BankFin's financing assistance.",
    },
    h1: "Funding the Projects That Move Your Business Forward",
    intro: [
      "Large projects require careful planning, capital structuring, documentation, and financial assessment. BankFin helps eligible businesses explore project financing options aligned with their project requirements.",
    ],
    useCases: {
      title: "Potential project requirements",
      items: [
        "Business expansion",
        "Infrastructure",
        "Real estate and development projects",
        "Capital-intensive projects",
        "New facilities",
        "Other eligible projects",
      ],
    },
    help: {
      title: "A Structured Approach to Project Financing",
      body: "We help you understand the financing requirement, information needed, potential financing routes, and application process.",
    },
    enquiryValue: "Project Finance",
    related: ["business-loans", "msme-loans", "loans-against-property"],
    imageAlt: "Project finance discussion",
  },
  {
    slug: "loans-against-property",
    index: "07",
    name: "Loans Against Property",
    navName: "Loans Against Property",
    icon: "property",
    tagline: "Unlock the financial value of eligible property.",
    summary:
      "A loan against property can provide secured financing by leveraging eligible residential or commercial property, subject to lender assessment, valuation, and eligibility criteria.",
    short: "Secured financing using eligible residential or commercial property.",
    cta: "Explore Property-Backed Financing",
    seo: {
      title: "Loan Against Property | Secured Business & Personal Finance | BankFin",
      description:
        "Explore loan against property solutions using eligible residential or commercial property as security, subject to valuation and lender eligibility.",
    },
    h1: "Unlock the Financial Potential of Your Property",
    intro: [
      "A loan against property is a secured financing option where eligible residential or commercial property may be offered as security for the facility.",
      "BankFin helps eligible customers explore property-backed financing for approved personal or business requirements.",
    ],
    useCases: {
      title: "Potential uses",
      items: [
        "Business expansion",
        "Working capital",
        "Business investment",
        "Education",
        "Major personal expenses",
        "Other lender-approved purposes",
      ],
    },
    considerations: {
      title: "Key factors",
      items: [
        "Property type and ownership",
        "Property valuation",
        "Applicant profile",
        "Income and repayment capacity",
        "Credit history",
        "Existing liabilities",
        "Lender policy",
      ],
    },
    help: {
      title: "How BankFin Can Help",
      body: "We help you understand how property-backed financing works, the factors lenders generally assess, and the documentation involved before you proceed.",
    },
    important:
      "The property may be subject to lender security and legal/technical verification. Approval and terms are determined by the respective lender.",
    enquiryValue: "Loan Against Property",
    related: ["home-loans", "business-loans", "personal-loans"],
    imageAlt: "Loan against property consultation",
  },
  {
    // VERIFY: Car Loans is an approved addition but has no product detail in the
    // content master. Copy is deliberately conservative and general.
    slug: "car-loans",
    index: "08",
    name: "Car Loans",
    navName: "Car Loans",
    icon: "car",
    tagline: "Drive your next purchase forward.",
    summary:
      "Explore financing options for purchasing a new or pre-owned vehicle, with guidance through the application process.",
    short: "Financing options for purchasing a new or pre-owned vehicle.",
    cta: "Explore Car Loans",
    seo: {
      title: "Car Loans | New & Pre-Owned Vehicle Financing | BankFin",
      description:
        "Explore car loan options for purchasing a new or pre-owned vehicle with BankFin. Get guidance on the application process and next steps.",
    },
    h1: "Financing Options for Your Next Vehicle",
    intro: [
      "Explore financing options for purchasing a new or pre-owned vehicle, with guidance through the application process.",
      "BankFin helps you understand the options that may be relevant to your requirement and what to prepare before you proceed. Availability and terms are determined by the respective lender.",
    ],
    useCases: {
      title: "Financing may be relevant for",
      items: [
        "Purchase of a new vehicle",
        "Purchase of a pre-owned vehicle",
        "Other lender-approved vehicle requirements",
      ],
    },
    considerations: {
      title: "What We Help You Understand",
      items: [
        "Eligibility considerations",
        "Loan amount and repayment capacity",
        "Tenure options",
        "Documentation",
        "Vehicle-related requirements",
        "Application process",
      ],
    },
    help: {
      title: "How BankFin Can Help",
      body: "We help you understand the available vehicle financing routes, the documentation generally involved, and the next steps based on your profile.",
    },
    important:
      "Eligibility, loan amount, interest rate, tenure, fees, and other terms are determined by the respective lender and are subject to its assessment criteria.",
    enquiryValue: "Car Loan",
    related: ["personal-loans", "home-loans", "loans-against-property"],
    imageAlt: "Vehicle financing consultation with BankFin",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const steps = [
  {
    n: "01",
    title: "Tell Us What You Need",
    short: "Share your requirement.",
    body: "Share your requirement, whether it is personal, home, business, MSME, project, overdraft, property-backed, or vehicle financing.",
  },
  {
    n: "02",
    title: "Understand Your Requirement",
    short: "We review it and discuss possibilities.",
    body: "Our team reviews the information you provide and discusses relevant financing possibilities.",
  },
  {
    n: "03",
    title: "Explore Suitable Options",
    short: "Based on your profile and lender criteria.",
    body: "We help you understand available options based on your profile, requirement, and applicable lender criteria.",
  },
  {
    n: "04",
    title: "Prepare Your Application",
    short: "Guidance on documentation.",
    body: "Get guidance on documentation and the information generally required for the next stage.",
  },
  {
    n: "05",
    title: "Move Forward",
    short: "The lender verifies and decides.",
    body: "Proceed with the selected financing application and complete the lender's verification and approval process.",
  },
] as const;

export const audiences = [
  {
    key: "individuals",
    name: "Individuals",
    body: "For personal financial requirements and planned expenses.",
    services: ["personal-loans", "loans-against-property"],
  },
  {
    key: "home-buyers",
    name: "Home Buyers",
    body: "For purchasing, constructing, or renovating a home.",
    services: ["home-loans"],
  },
  {
    key: "entrepreneurs",
    name: "Entrepreneurs",
    body: "For launching, expanding, or strengthening a business.",
    services: ["business-loans", "msme-loans"],
  },
  {
    key: "msmes",
    name: "MSMEs",
    body: "For working capital, expansion, equipment, and eligible business requirements.",
    services: ["msme-loans", "overdraft"],
  },
  {
    key: "established",
    name: "Established Businesses",
    body: "For larger financing requirements, cash-flow management, and project-related funding.",
    services: ["project-finance", "overdraft", "business-loans"],
  },
  {
    key: "property-owners",
    name: "Property Owners",
    body: "For eligible secured financing against residential or commercial property.",
    services: ["loans-against-property"],
  },
  {
    key: "vehicle-buyers",
    name: "Vehicle Buyers",
    body: "For financing the purchase of a new or pre-owned vehicle.",
    services: ["car-loans"],
  },
] as const;

export const values = [
  {
    key: "guidance",
    title: "Personalized Guidance",
    tagline: "Your requirement comes first.",
    body: "We take the time to understand your financial objective and help you explore financing options that fit your circumstances.",
  },
  {
    key: "solutions",
    title: "Multiple Financing Solutions",
    tagline: "Explore different financing routes from one place.",
    body: "From personal finance to business and property-backed funding, BankFin brings a broad range of financing solutions together.",
  },
  {
    key: "communication",
    title: "Clear Communication",
    tagline: "Understand the process before proceeding.",
    body: "We aim to make the financing journey easier to understand, including documentation, eligibility considerations, and the next steps.",
  },
  {
    key: "assistance",
    title: "End-to-End Assistance",
    tagline: "Support throughout the enquiry journey.",
    body: "Our team can guide you through the key stages of the financing process and help you stay informed along the way.",
  },
] as const;

export const customerFocus = {
  title: "Customer-Focused Service",
  tagline: "Financial decisions deserve personal attention.",
  body: "We focus on responsive communication and practical guidance rather than a one-size-fits-all approach.",
};

export const approach = [
  "Understanding the requirement",
  "Evaluating the relevant financing route",
  "Explaining available options clearly",
  "Helping organize the application process",
  "Maintaining transparent communication",
] as const;

export const about = {
  h1: "Making Financing Easier to Understand",
  opening: [
    "Financial decisions can be complex. Different lenders have different eligibility criteria, documentation requirements, pricing structures, and approval processes.",
    "BankFin is built around a simple idea: make the financing journey clearer, more accessible, and more personalized.",
    "We help customers understand their requirements, explore relevant financing solutions, and navigate the application journey with practical guidance.",
  ],
  approachLead:
    "We believe good financial assistance starts with understanding the customer—not simply selling a loan product.",
  // VERIFY: replace if the client has official mission/vision statements.
  mission:
    "To simplify access to suitable financing through responsible, transparent, and customer-focused guidance.",
  vision:
    "To become a trusted financial solutions partner for individuals and businesses seeking clarity and access to financing.",
};

/**
 * FAQs — approved answers only.
 * Omitted pending client confirmation: "Does BankFin provide the loan directly?"
 * (the content master asks for BankFin's business model to be clarified first).
 */
export const faqs: FaqItem[] = [
  {
    q: "What types of loans and financing does BankFin help with?",
    a: "BankFin presents personal loans, home loans, unsecured business loans, MSME loans, overdraft facilities, project finance, loans against property, and car loans.",
    services: ["personal-loans", "home-loans", "business-loans", "msme-loans"],
  },
  {
    q: "Can BankFin guarantee loan approval?",
    a: "No. Final approval is determined by the respective lender based on its eligibility, credit, income, documentation, verification, and risk-assessment criteria.",
  },
  {
    q: "What documents are required?",
    a: "Documentation varies by product, applicant profile, lender, and purpose. Common requirements may include identity/address proof, income or business documents, bank statements, tax records, and property documents where applicable.",
  },
  {
    q: "How much loan can I get?",
    a: "The eligible amount depends on factors such as income, repayment capacity, credit profile, business financials, property value where applicable, existing liabilities, and lender policy.",
  },
  {
    q: "How long does loan approval take?",
    a: "Processing time varies by product, lender, documentation, verification, and applicant profile.",
  },
  {
    q: "What is an unsecured business loan?",
    a: "It is a business financing facility that generally does not require traditional property collateral, although lenders may impose other eligibility, security, guarantee, or documentation requirements.",
    services: ["business-loans"],
  },
  {
    q: "What is a loan against property?",
    a: "It is a secured financing facility where an eligible residential or commercial property is offered as security to the lender, subject to valuation, legal verification, and lender criteria.",
    services: ["loans-against-property"],
  },
  {
    q: "Can I apply if I am self-employed?",
    a: "Eligibility depends on the lender and product. Self-employed applicants may be assessed using business vintage, income, banking history, financial statements, tax records, credit profile, and other criteria.",
    services: ["business-loans", "msme-loans"],
  },
  {
    q: "Will applying affect my credit score?",
    a: "The impact depends on how the lender performs credit checks and the application process. Customers should understand whether a formal credit enquiry will be made before proceeding.",
  },
  {
    q: "What interest rate will I receive?",
    a: "Interest rates vary by lender, product, applicant profile, creditworthiness, tenure, loan amount, and other factors. The applicable lender determines the final rate.",
  },
  {
    q: "Are there processing fees?",
    a: "Fees vary by lender and product. Customers should review the applicable fee schedule and terms before accepting an offer.",
  },
];

/** FAQs shown on individual service pages (general, approved answers). */
export const faqsForService = (slug: string): FaqItem[] => {
  const specific = faqs.filter((f) => f.services?.includes(slug) && f.services.length === 1);
  const general = [faqs[1], faqs[2], faqs[3], faqs[9]];
  return [...specific, ...general].slice(0, 5);
};

export const enquiryOptions = [
  "Personal Loan",
  "Home Loan",
  "Business Loan",
  "MSME Loan",
  "Overdraft",
  "Project Finance",
  "Loan Against Property",
  "Car Loan",
  "Not Sure / Need Guidance",
] as const;

export const employmentOptions = [
  "Salaried",
  "Self-employed professional",
  "Business owner / Proprietor",
  "Partnership / Company",
  "MSME",
  "Other",
] as const;
