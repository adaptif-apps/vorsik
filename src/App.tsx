import { useState, useEffect } from 'react';
import { 
  Server, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  FileSpreadsheet, 
  RefreshCw, 
  Code2, 
  Building2, 
  Clock3, 
  Cpu, 
  HelpCircle,
  Truck,
  ChevronDown,
  Check,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Calculator,
  GripVertical,
  Layers,
  Zap,
  RotateCcw,
  AlertTriangle,
  FileText,
  Database,
  Search,
  Plus
} from 'lucide-react';

export default function App() {
  // Unified Interactive Transformation Showroom State
  type TransformationMode = 'spreadsheet' | 'vorsik';
  const [transformationMode, setTransformationMode] = useState<TransformationMode>('spreadsheet');

  // B2B Orders and Invoicing State
  interface B2BOrder {
    id: string;
    client: string;
    items: string;
    units: number;
    total: string;
    amount: number;
    status: 'Pending Approval' | 'Approved & Queued' | 'In Transit' | 'Invoiced & Completed';
    sla: string;
    rep: string;
    invoiced: boolean;
    notes: string;
  }

  const initialB2BOrders: B2BOrder[] = [
    {
      id: 'ORD-8942',
      client: 'Northern Distribution Logistics Inc.',
      items: '120x High-Pressure Hydraulic Valve Seals',
      units: 120,
      total: '$14,250.00',
      amount: 14250,
      status: 'Pending Approval',
      sla: 'Today, 04:00 PM',
      rep: 'M. Chen',
      invoiced: false,
      notes: 'Credit verified via local accounting bridge'
    },
    {
      id: 'ORD-8941',
      client: 'St. Mary Surgical Center',
      items: '45x HEPA Medical Grade Filter Kits',
      units: 45,
      total: '$6,800.00',
      amount: 6800,
      status: 'Approved & Queued',
      sla: 'Tomorrow, 10:00 AM',
      rep: 'A. Vance',
      invoiced: true,
      notes: 'Priority clinical delivery with tamper seal'
    },
    {
      id: 'ORD-8940',
      client: 'Pacific Heavy Contracting LLC',
      items: '310x Heavy Industrial Drive Bearings',
      units: 310,
      total: '$28,400.00',
      amount: 28400,
      status: 'In Transit',
      sla: 'Today, 06:30 PM (Truck #04)',
      rep: 'E. Morales',
      invoiced: true,
      notes: 'Driver dispatch confirmed with GPS waypoint'
    },
    {
      id: 'ORD-8939',
      client: 'Apex Commercial Systems Corp.',
      items: '18x Digital Manifold Regulators',
      units: 18,
      total: '$4,120.00',
      amount: 4120,
      status: 'Invoiced & Completed',
      sla: 'Delivered (Signature #8891)',
      rep: 'M. Chen',
      invoiced: true,
      notes: 'Cryptographic receipt archived locally'
    },
    {
      id: 'ORD-8938',
      client: 'Vanguard Manufacturing Supply',
      items: '90x Reinforced Hose Quick-Couplings',
      units: 90,
      total: '$8,950.00',
      amount: 8950,
      status: 'Pending Approval',
      sla: 'Tomorrow, 02:00 PM',
      rep: 'D. Ross',
      invoiced: false,
      notes: 'Warehouse pallet allocation confirmed'
    },
    {
      id: 'ORD-8937',
      client: 'Cascade Industrial Works LLC',
      items: '240x Precision Machined Steel Flanges',
      units: 240,
      total: '$25,740.00',
      amount: 25740,
      status: 'Invoiced & Completed',
      sla: 'Delivered (Dock #2)',
      rep: 'E. Morales',
      invoiced: true,
      notes: 'Recurring monthly purchase agreement'
    }
  ];

  const [b2bOrders, setB2BOrders] = useState<B2BOrder[]>(initialB2BOrders);
  const [b2bSearch, setB2BSearch] = useState('');
  const [b2bFilter, setB2BFilter] = useState<'all' | 'pending' | 'transit' | 'completed'>('all');
  const [auditEventsCount, setAuditEventsCount] = useState(14);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Vorsik Subview: 'cards' (default) vs 'table' (alternative)
  const [vorsikSubView, setVorsikSubView] = useState<'cards' | 'table'>('cards');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ORD-8942');

  // ROI Calculator state
  const [employees, setEmployees] = useState(25);
  const [costPerUser, setCostPerUser] = useState(65);

  // FAQ Accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Modal / Scope Estimator State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('Distribution / Logistics / Warehousing');
  const [selectedDeployment, setSelectedDeployment] = useState('Local On-Premise Physical Server');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Inventory Control & Fulfillment',
    'Audit Logging & Role-Based Permissions'
  ]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hero interactive microapps slider state
  const [activeMicroApp, setActiveMicroApp] = useState<number>(0);

  // MicroApp 1: Live Kanban Drag & Drop State
  interface KanbanCard {
    id: string;
    code: string;
    title: string;
    client: string;
    val: number;
    amount: string;
    status: 'queue' | 'transit' | 'done';
  }

  const [kanbanCards, setKanbanCards] = useState<KanbanCard[]>([
    { id: '1', code: 'ORD-892', title: 'Hydraulic Valves', client: 'Apex Heavy', val: 14200, amount: '$14.2k', status: 'queue' },
    { id: '2', code: 'ORD-894', title: 'Intake Assemblies', client: 'St. Mary Hosp.', val: 6800, amount: '$6.8k', status: 'transit' },
    { id: '3', code: 'ORD-891', title: 'Drive Bearings', client: 'Cascade Works', val: 28400, amount: '$28.4k', status: 'done' },
  ]);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  const handleDropKanban = (targetStatus: 'queue' | 'transit' | 'done') => {
    if (!draggedCardId) return;
    setKanbanCards(prev => prev.map(c => c.id === draggedCardId ? { ...c, status: targetStatus } : c));
    setDraggedCardId(null);
    setToastMessage(`State updated to '${targetStatus}' (0.2ms local commit).`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const advanceKanbanCard = (cardId: string) => {
    setKanbanCards(prev => prev.map(c => {
      if (c.id !== cardId) return c;
      const nextStatus: 'queue' | 'transit' | 'done' = 
        c.status === 'queue' ? 'transit' : c.status === 'transit' ? 'done' : 'queue';
      return { ...c, status: nextStatus };
    }));
    setToastMessage(`Order advanced (0.1ms). Local WAL updated.`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // MicroApp 2: Live Architecture & ROI Calculator State
  const [heroCalcUsers, setHeroCalcUsers] = useState<number>(30);
  const [heroCalcSeatPrice, setHeroCalcSeatPrice] = useState<number>(75);
  const [heroModules, setHeroModules] = useState<{ [key: string]: boolean }>({
    scanner: true,
    sync: true,
    vault: true,
    webhooks: false,
  });

  const toggleHeroModule = (key: string) => {
    setHeroModules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const heroSaasThreeYears = heroCalcUsers * heroCalcSeatPrice * 36;
  const heroVorsikCost = 6500;
  const heroNetSavings = heroSaasThreeYears - heroVorsikCost;
  const heroPaybackMonths = Math.max(1, Math.ceil(heroVorsikCost / (heroCalcUsers * heroCalcSeatPrice)));

  // MicroApp 3: Live Fleet & Route Scrubber State
  const [scrubHour, setScrubHour] = useState<number>(13); // 13 = 1:00 PM
  const formattedScrubHour = scrubHour < 12 
    ? `${scrubHour}:00 AM` 
    : scrubHour === 12 
    ? '12:00 PM' 
    : `${scrubHour - 12}:00 PM`;
  const routeAlphaProgress = Math.min(100, Math.max(10, Math.round(((scrubHour - 8) / 10) * 100)));
  const routeBetaProgress = Math.min(100, Math.max(15, Math.round(((scrubHour - 7) / 10) * 100)));
  const activeTechs = Math.round(8 + (scrubHour >= 12 && scrubHour <= 15 ? 6 : scrubHour > 15 ? 2 : 4));

  const industries = [
    'Distribution / Logistics / Warehousing',
    'Medical Clinics / Healthcare Facilities',
    'Legal / Accounting / Financial Advisory',
    'Construction / Contracting / Job Sites',
    'Industrial Manufacturing / Assembly',
    'B2B Wholesale / Commercial Supply',
    'Other Specialized Industry'
  ];

  const handleOpenModal = () => {
    setIsDropdownOpen(false);
    setIsModalClosing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDropdownOpen(false);
    setIsModalClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsModalClosing(false);
    }, 200);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Initialize Build Crew for Header & Hero
  useEffect(() => {
    const timer = setTimeout(() => {
      const bc = (window as unknown as { BuildCrew?: { replay: () => void; start: (f?: boolean) => void } }).BuildCrew;
      if (bc?.replay) {
        bc.replay();
      } else if (bc?.start) {
        bc.start(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleReplayBuild = () => {
    const bc = (window as unknown as { BuildCrew?: { replay: () => void } }).BuildCrew;
    if (bc?.replay) {
      bc.replay();
    }
  };

  // B2B Transformation & Operations Handlers
  const triggerBuildCrewOnShowroom = () => {
    setTimeout(() => {
      const bc = (window as unknown as { BuildCrew?: { buildTargets?: (elements: HTMLElement[], speed?: number) => Promise<void> } }).BuildCrew;
      const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-build-showroom]'));
      if (bc?.buildTargets && targets.length > 0) {
        bc.buildTargets(targets, 1.4);
      }
    }, 50);
  };

  const handleStartTransformation = () => {
    setTransformationMode('vorsik');
    setVorsikSubView('cards');
    setToastMessage("✨ Building custom operating app with live engineering cursors...");
    setTimeout(() => setToastMessage(null), 3000);
    triggerBuildCrewOnShowroom();
  };

  const handleReplayTransformation = () => {
    setTransformationMode('vorsik');
    triggerBuildCrewOnShowroom();
  };

  const handleApproveB2BOrder = (orderId: string) => {
    setB2BOrders(prev => prev.map(ord => 
      ord.id === orderId ? { ...ord, status: 'Approved & Queued' } : ord
    ));
    setAuditEventsCount(c => c + 1);
    setToastMessage(`Order ${orderId} approved (0.1ms). Dispatched to warehouse local queue.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleGenerateB2BInvoice = (orderId: string) => {
    setB2BOrders(prev => prev.map(ord => 
      ord.id === orderId ? { ...ord, status: 'Invoiced & Completed', invoiced: true } : ord
    ));
    setAuditEventsCount(c => c + 1);
    setToastMessage(`Invoice #${orderId}-INV generated & encrypted (AES-256). Sent to accounting.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleQuickAddB2BOrder = () => {
    const nextNum = b2bOrders.length + 43;
    const nextId = `ORD-89${nextNum}`;
    const newOrder: B2BOrder = {
      id: nextId,
      client: 'Apex Industrial Parts Ltd.',
      items: '50x Sensor Assemblies',
      units: 50,
      total: '$5,400.00',
      amount: 5400,
      status: 'Pending Approval',
      sla: 'Tomorrow, 09:00 AM',
      rep: 'M. Chen',
      invoiced: false,
      notes: 'Direct client portal submission'
    };
    setB2BOrders(prev => [newOrder, ...prev]);
    setAuditEventsCount(c => c + 1);
    setToastMessage(`New order ${nextId} created in 0.1ms. Local WAL updated.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered B2B orders for the Vorsik view
  const filteredB2BOrders = b2bOrders.filter(o => {
    const matchesSearch = 
      o.client.toLowerCase().includes(b2bSearch.toLowerCase()) || 
      o.id.toLowerCase().includes(b2bSearch.toLowerCase()) ||
      o.items.toLowerCase().includes(b2bSearch.toLowerCase());
    
    if (!matchesSearch) return false;
    if (b2bFilter === 'pending') return o.status === 'Pending Approval';
    if (b2bFilter === 'transit') return o.status === 'In Transit';
    if (b2bFilter === 'completed') return o.status === 'Invoiced & Completed' || o.status === 'Approved & Queued';
    return true;
  });

  const selectedOrder = b2bOrders.find(o => o.id === selectedOrderId) || b2bOrders[0];

  // Calculations for ROI
  const saasYearly = employees * costPerUser * 12;
  const saasThreeYears = saasYearly * 3;
  const vorsikInitial = 6500;
  const vorsikMaintenanceThreeYears = 400 * 36;
  const vorsikTotalThreeYears = vorsikInitial + vorsikMaintenanceThreeYears;
  const totalSavings = saasThreeYears - vorsikTotalThreeYears;
  const paybackMonths = Math.max(1, Math.ceil((vorsikInitial / (employees * costPerUser))));

  const faqs = [
    {
      question: 'Who maintains the server if our company does not have an in-house IT team?',
      answer: 'Every Vorsik deployment runs inside self-healing, isolated Docker containers equipped with automated healthchecks and scheduled local backups. If you do not have internal sysadmins, our optional monthly SLA ($350 - $600 USD/mo) handles 24/7 remote monitoring, zero-downtime security patches, and offsite snapshot replication.'
    },
    {
      question: 'What happens when our business processes change in 18 months and we need new features?',
      answer: 'Because Vorsik provides an Open Architecture Blueprint with clean TypeScript, normalized relational PostgreSQL schemas, and comprehensive OpenAPI specs, you have two frictionless options: you can engage Vorsik for a targeted flat-fee module addition (typically $1,200 - $3,000 USD), or you can hand the codebase to any internal engineer or third-party contractor without friction.'
    },
    {
      question: 'Can Vorsik software integrate with our existing accounting and payment tools (QuickBooks, Xero, Stripe)?',
      answer: 'Yes. Every application includes a dedicated outbound synchronization engine with REST and Webhook support. We routinely engineer automated two-way pipelines with QuickBooks, Xero, Stripe, ERP APIs, and legacy internal databases.'
    },
    {
      question: 'Why is an on-premise or dedicated private cloud deployment better than public SaaS?',
      answer: 'Three reasons: Speed, Security, and Cost. On-premise local deployments communicate over your high-speed office LAN at 1ms latency—impervious to public internet outages. Your intellectual property and customer records remain strictly within your physical boundaries, fully protected from third-party data breaches or vendor policy changes.'
    },
    {
      question: 'Do we receive full intellectual property ownership and legal rights to the source code?',
      answer: 'Yes, 100%. Upon final delivery and project completion, all intellectual property rights for the custom application, database schemas, and configuration scripts are irrevocably transferred to your corporate entity. We build software to be owned, never leased.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#08090C] text-[#EDEDED] antialiased selection:bg-[#F84B11]/25 selection:text-[#F84B11]">
      
      {/* Toast Notification (Engineering Feedback) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#12141A] border border-[#F84B11]/40 text-[#EDEDED] px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 text-xs font-medium">
          <div className="w-2 h-2 rounded-full bg-[#F84B11] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#1F232B] bg-[#08090C]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" data-build="fade" className="flex items-center gap-2">
              <img src="/logo.svg" alt="VORSIK" className="h-5 sm:h-5 w-auto" />
            </a>
            <div data-build="fade" className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-[#12141A] border border-[#1F232B] text-[11px] font-medium tracking-wide text-[#94979E]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>OWNED INFRASTRUCTURE / ON-PREMISE</span>
            </div>
          </div>

          <nav data-build="fade" className="hidden md:flex items-center gap-6 text-xs font-medium text-[#94979E]">
            <a href="#financial-model" className="hover:text-white transition-colors">Financial Model</a>
            <a href="#transformation" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Showroom</span>
              <span className="px-1.5 py-0.2 rounded bg-[#F84B11]/20 text-[#F84B11] text-[10px] font-semibold border border-[#F84B11]/30">Live</span>
            </a>
            <a href="#engineering" className="hover:text-white transition-colors">Engineering</a>
            <a href="#calculator" className="hover:text-white transition-colors">ROI Calculator</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              data-build="pop"
              onClick={handleOpenModal}
              className="px-3 sm:px-4 py-2 rounded-md bg-[#EDEDED] hover:bg-white text-[#08090C] font-semibold text-xs tracking-tight transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap cursor-pointer active:scale-[0.97]"
            >
              <span>Book Audit</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md border border-[#1F232B] bg-[#12141A] text-[#EDEDED] hover:bg-[#1A1E27] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 text-[#F84B11]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#1F232B] bg-[#0E1015]/98 px-4 py-4 space-y-2 backdrop-blur-xl animate-fadeIn">
            <div className="flex flex-col space-y-1 text-xs font-medium text-[#94979E]">
              <a 
                href="#financial-model" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-[#161922] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Financial Model</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </a>
              <a 
                href="#transformation" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-[#161922] hover:text-white transition-colors flex items-center justify-between text-[#EDEDED]"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#F84B11] fill-current" />
                  <span>Showroom (Transformation)</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </a>
              <a 
                href="#engineering" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-[#161922] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Engineering Protocol</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </a>
              <a 
                href="#calculator" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-[#161922] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>ROI Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </a>
              <a 
                href="#faq" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-[#161922] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>FAQ</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </a>
            </div>
            <div className="pt-2 border-t border-[#1F232B] flex items-center justify-between text-[11px] text-[#585B64] px-3">
              <span>OWNED INFRASTRUCTURE</span>
              <span className="text-[#F84B11] font-semibold">0ms LOCAL LATENCY</span>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-28 pb-16 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-[#F84B11]/5 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

        <div className="max-w-6xl relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Core Value Proposition & CTAs */}
            <div className="lg:col-span-7">
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded border border-[#2A2E39] bg-[#12141A] text-[#94979E] text-xs font-medium tracking-wide mb-8 hover:border-[#F84B11]/40 transition-colors duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F84B11] shrink-0 animate-pulse" />
                <span className="text-[#EDEDED] font-semibold">OWNED INFRASTRUCTURE</span>
                <span className="text-[#585B64] hidden sm:inline">|</span>
                <span className="hidden sm:inline">ZERO PER-SEAT SUBSCRIPTIONS</span>
                <button 
                  onClick={handleReplayBuild}
                  className="ml-1 sm:ml-2 pl-2 border-l border-[#2A2E39] text-[#F84B11] hover:text-[#ff7444] text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  title="Replay Build Crew interactive animation"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Replay Build</span>
                </button>
              </div>

              <h1 data-build="" className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6">
                Your company's software <br />
                should belong to you. <br />
                <span className="text-[#94979E]">Not be rented.</span>
              </h1>

              <p data-build="fade" className="max-w-xl text-base sm:text-lg text-[#94979E] leading-relaxed mb-8 font-normal">
                We build custom operational software adapted to your exact internal workflows. Deployed on your local physical servers or private cloud for a flat one-time development investment. Sub-millisecond latency, transparent code, and complete data sovereignty.
              </p>

              <div data-build="pop" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-4">
                <button 
                  onClick={handleOpenModal}
                  className="px-6 py-3.5 rounded-md bg-[#F84B11] hover:bg-[#ff5d26] active:scale-[0.98] text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#F84B11]/25 hover:shadow-[#F84B11]/40 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Scope Your Custom Software</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a 
                  href="#calculator"
                  className="px-5 py-3.5 rounded-md border border-[#232731] bg-[#101217] hover:bg-[#161922] active:scale-[0.98] text-[#EDEDED] font-medium text-xs tracking-tight transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Calculate Savings vs. SaaS</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive 3-MicroApp Slider Device */}
            <div className="lg:col-span-5 w-full" data-build="pop">
              <div className="rounded-xl border border-[#262B35] bg-[#0E1015] shadow-2xl shadow-black/80 overflow-hidden relative lg:h-[465px] flex flex-col justify-between">
                
                {/* Top OS Frame Bar */}
                <div className="bg-[#12141A] px-3.5 py-2.5 border-b border-[#1F232B] flex items-center justify-between gap-2 select-none shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#262B35]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#262B35]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#262B35]" />
                    </div>
                    <span className="text-[11px] font-medium text-[#7A7E89] ml-1.5 flex items-center gap-1.5">
                      <span>vorsik-node://runtime.lan</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#161922] border border-[#232731] text-[10px] text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>0.4ms LAN</span>
                  </div>
                </div>

                {/* MicroApp Slider Tabs & Controls */}
                <div className="border-b border-[#1F232B] bg-[#0A0C10] px-2.5 sm:px-3 py-2 flex items-center justify-between gap-1 overflow-x-auto shrink-0">
                  <div className="flex items-center gap-1 shrink-0">
                    {[
                      { id: 0, label: '01. Live Kanban', shortLabel: '01. Kanban', icon: Layers },
                      { id: 1, label: '02. Live Calc', shortLabel: '02. Calc', icon: Calculator },
                      { id: 2, label: '03. Time Scrubber', shortLabel: '03. Scrubber', icon: Clock3 },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeMicroApp === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveMicroApp(tab.id)}
                          className={`px-2 sm:px-2.5 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap ${
                            isActive
                              ? 'bg-[#161922] border border-[#F84B11]/50 text-white shadow-sm'
                              : 'text-[#7A7E89] hover:text-[#EDEDED] hover:bg-[#12141A] border border-transparent'
                          }`}
                        >
                          <Icon className={`w-3 h-3 shrink-0 ${isActive ? 'text-[#F84B11]' : 'opacity-60'}`} />
                          <span className="hidden sm:inline">{tab.label}</span>
                          <span className="sm:hidden">{tab.shortLabel}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Slider Prev / Next arrows */}
                  <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                    <button
                      onClick={() => setActiveMicroApp(prev => (prev === 0 ? 2 : prev - 1))}
                      className="p-1 rounded hover:bg-[#161922] text-[#7A7E89] hover:text-white transition-colors cursor-pointer"
                      title="Previous microapp"
                      aria-label="Previous microapp"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-semibold text-[#585B64] tabular-nums px-0.5">
                      0{activeMicroApp + 1}/03
                    </span>
                    <button
                      onClick={() => setActiveMicroApp(prev => (prev === 2 ? 0 : prev + 1))}
                      className="p-1 rounded hover:bg-[#161922] text-[#7A7E89] hover:text-white transition-colors cursor-pointer"
                      title="Next microapp"
                      aria-label="Next microapp"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* MicroApp Body (Dynamic based on activeMicroApp) */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between overflow-hidden">
                  
                  {/* MicroApp 1: Live Kanban Drag & Drop */}
                  {activeMicroApp === 0 && (
                    <div className="h-full flex flex-col justify-between space-y-2.5 animate-fadeIn">
                      <div className="flex items-center justify-between shrink-0">
                        <div>
                          <div className="text-[10px] uppercase font-semibold tracking-wider text-[#F84B11]">Operations Pipeline</div>
                          <div className="text-xs sm:text-sm font-bold text-white tracking-tight">Interactive Dispatch Kanban</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Drag & Drop or Tap ➔
                        </span>
                      </div>

                      {/* 3 Kanban Columns */}
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 flex-1 items-stretch">
                        {(['queue', 'transit', 'done'] as const).map((colStatus) => {
                          const colCards = kanbanCards.filter(c => c.status === colStatus);
                          const colTitles = {
                            queue: 'Ready',
                            transit: 'In Route',
                            done: 'Delivered'
                          };
                          const colSum = colCards.reduce((acc, curr) => acc + curr.val, 0);

                          return (
                            <div
                              key={colStatus}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={() => handleDropKanban(colStatus)}
                              className="rounded-lg border border-[#1F232B] bg-[#0A0C10] p-1.5 sm:p-2 flex flex-col justify-between transition-colors hover:border-[#2C323E]"
                            >
                              <div className="flex items-center justify-between border-b border-[#1A1E27] pb-1 mb-1.5 text-[10px]">
                                <span className="font-semibold text-[#EDEDED]">{colTitles[colStatus]}</span>
                                <span className="text-[#7A7E89] tabular-nums font-medium">${(colSum / 1000).toFixed(1)}k</span>
                              </div>

                              {/* Cards container */}
                              <div className="flex-1 space-y-1.5 overflow-y-auto">
                                {colCards.map((card) => (
                                  <div
                                    key={card.id}
                                    draggable
                                    onDragStart={() => setDraggedCardId(card.id)}
                                    onDragEnd={() => setDraggedCardId(null)}
                                    className="p-1.5 sm:p-2 rounded bg-[#12141A] border border-[#232731] hover:border-[#F84B11]/60 shadow-sm cursor-grab active:cursor-grabbing select-none group transition-all"
                                  >
                                    <div className="flex items-center justify-between text-[10px]">
                                      <div className="flex items-center gap-1 font-semibold text-[#F84B11]">
                                        <GripVertical className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 text-[#94979E]" />
                                        <span>{card.code}</span>
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          advanceKanbanCard(card.id);
                                        }}
                                        className="text-[#7A7E89] hover:text-white p-0.5 rounded hover:bg-[#1F232B] transition-colors"
                                        title="Advance status"
                                      >
                                        ➔
                                      </button>
                                    </div>
                                    <div className="text-[11px] font-medium text-white truncate mt-0.5">{card.title}</div>
                                    <div className="flex items-center justify-between text-[9px] text-[#7A7E89] mt-1">
                                      <span className="truncate max-w-[55px]">{card.client}</span>
                                      <span className="font-semibold text-[#EDEDED] tabular-nums">{card.amount}</span>
                                    </div>
                                  </div>
                                ))}

                                {colCards.length === 0 && (
                                  <div className="h-16 border border-dashed border-[#1C2028] rounded flex items-center justify-center text-[9px] text-[#585B64] italic">
                                    Drop here
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[#7A7E89] shrink-0 pt-0.5">
                        <span>Drag card to move column</span>
                        <span className="text-emerald-400 font-medium">0.2ms SQLite Partition Write</span>
                      </div>
                    </div>
                  )}

                  {/* MicroApp 2: Live Architecture & ROI Calculator */}
                  {activeMicroApp === 1 && (
                    <div className="h-full flex flex-col justify-between space-y-2.5 animate-fadeIn">
                      <div className="flex items-center justify-between shrink-0">
                        <div>
                          <div className="text-[10px] uppercase font-semibold tracking-wider text-[#F84B11]">Capital Asset Simulator</div>
                          <div className="text-xs sm:text-sm font-bold text-white tracking-tight">Live Architecture & ROI Calculator</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          60fps Reactive Math
                        </span>
                      </div>

                      {/* Sliders */}
                      <div className="space-y-2 bg-[#0A0C10] p-2.5 rounded-lg border border-[#1F232B]">
                        <div>
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="text-[#94979E]">Active Users:</span>
                            <span className="font-bold text-white tabular-nums">{heroCalcUsers} team members</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="100"
                            step="1"
                            value={heroCalcUsers}
                            onChange={(e) => setHeroCalcUsers(Number(e.target.value))}
                            className="w-full accent-[#F84B11] bg-[#1F232B] h-1.5 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="text-[#94979E]">SaaS Seat Cost:</span>
                            <span className="font-bold text-white tabular-nums">${heroCalcSeatPrice} USD / user / mo</span>
                          </div>
                          <input
                            type="range"
                            min="25"
                            max="150"
                            step="5"
                            value={heroCalcSeatPrice}
                            onChange={(e) => setHeroCalcSeatPrice(Number(e.target.value))}
                            className="w-full accent-[#F84B11] bg-[#1F232B] h-1.5 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* 4 Module Toggles */}
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { key: 'scanner', label: 'SQLite / WAL Sync' },
                          { key: 'sync', label: 'Offline Field Engine' },
                          { key: 'vault', label: 'AES-256 Vault' },
                          { key: 'webhooks', label: 'ERP REST Webhooks' },
                        ].map((m) => {
                          const isChecked = heroModules[m.key];
                          return (
                            <button
                              key={m.key}
                              onClick={() => toggleHeroModule(m.key)}
                              className={`px-2 py-1.5 rounded border text-[10px] font-medium flex items-center justify-between transition-all cursor-pointer ${
                                isChecked
                                  ? 'bg-[#161922] border-[#F84B11]/50 text-white'
                                  : 'bg-[#0A0C10] border-[#1C2028] text-[#585B64] hover:text-[#94979E]'
                              }`}
                            >
                              <span>{m.label}</span>
                              <span className={`w-3 h-3 rounded flex items-center justify-center text-[9px] ${
                                isChecked ? 'bg-[#F84B11] text-white' : 'bg-[#1C2028] text-transparent'
                              }`}>✓</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Real-time Math Output Card */}
                      <div className="p-2.5 rounded-lg bg-[#12141A] border border-[#232731] flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-[#7A7E89] uppercase tracking-wider">3-Year Net Savings</div>
                          <div className="text-base sm:text-lg font-bold text-emerald-400 tabular-nums">
                            +${heroNetSavings.toLocaleString()} USD
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-[#7A7E89] uppercase tracking-wider">Payback Period</div>
                          <div className="text-sm font-bold text-white tabular-nums">
                            {heroPaybackMonths} {heroPaybackMonths === 1 ? 'month' : 'months'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MicroApp 3: Live Fleet & Route Scrubber */}
                  {activeMicroApp === 2 && (
                    <div className="h-full flex flex-col justify-between space-y-2.5 animate-fadeIn">
                      <div className="flex items-center justify-between shrink-0">
                        <div>
                          <div className="text-[10px] uppercase font-semibold tracking-wider text-[#F84B11]">Field Operations Telemetry</div>
                          <div className="text-xs sm:text-sm font-bold text-white tracking-tight">Timeline & Fleet Route Scrubber</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#161922] text-[#F84B11] border border-[#F84B11]/30 tabular-nums">
                          {formattedScrubHour}
                        </span>
                      </div>

                      {/* Time Slider */}
                      <div className="bg-[#0A0C10] p-2.5 rounded-lg border border-[#1F232B] space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#94979E]">Scrub Daily Schedule:</span>
                          <span className="font-semibold text-white">{scrubHour}:00h</span>
                        </div>
                        <input
                          type="range"
                          min="8"
                          max="18"
                          step="1"
                          value={scrubHour}
                          onChange={(e) => setScrubHour(Number(e.target.value))}
                          className="w-full accent-[#F84B11] bg-[#1F232B] h-1.5 rounded-lg cursor-pointer"
                        />
                        <div className="flex items-center justify-between text-[9px] text-[#585B64] pt-0.5 tabular-nums">
                          <span>08:00 AM</span>
                          <span>11:00 AM</span>
                          <span>02:00 PM</span>
                          <span>06:00 PM</span>
                        </div>
                      </div>

                      {/* Dynamic Fleet Routes */}
                      <div className="space-y-2">
                        {/* Route Alpha */}
                        <div className="p-2 rounded bg-[#12141A] border border-[#1F232B] space-y-1">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-semibold text-white">Route Alpha (North Metro Logistics)</span>
                            <span className="text-emerald-400 tabular-nums">{routeAlphaProgress}% Staged</span>
                          </div>
                          <div className="w-full bg-[#1C2028] h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#F84B11] h-full transition-all duration-150 rounded-full" 
                              style={{ width: `${routeAlphaProgress}%` }} 
                            />
                          </div>
                          <div className="text-[9px] text-[#7A7E89] truncate">
                            Waypoint: {scrubHour <= 9 ? 'Depot Manifest Verification' : scrubHour <= 13 ? 'Warehouse Hub C-14 Loading' : scrubHour <= 16 ? 'Client Final Receiving Dock' : 'Depot Staging & Shift Review'}
                          </div>
                        </div>

                        {/* Route Beta */}
                        <div className="p-2 rounded bg-[#12141A] border border-[#1F232B] space-y-1">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-semibold text-white">Route Beta (Regional Hospital Link)</span>
                            <span className="text-blue-400 tabular-nums">{routeBetaProgress}% In Transit</span>
                          </div>
                          <div className="w-full bg-[#1C2028] h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-blue-500 h-full transition-all duration-150 rounded-full" 
                              style={{ width: `${routeBetaProgress}%` }} 
                            />
                          </div>
                          <div className="text-[9px] text-[#7A7E89] truncate">
                            Waypoint: {scrubHour <= 10 ? 'Sterile Container Inspection' : scrubHour <= 14 ? 'Highway Logistics Link 4' : 'Post-Op Receiving Verified'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[#7A7E89] shrink-0 pt-0.5">
                        <span>{activeTechs} Technicians on duty</span>
                        <span className="text-emerald-400 font-medium">GPS Synced (0.1ms)</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* MicroApp Footer Security Notice */}
                <div className="px-3.5 py-2 border-t border-[#1F232B] bg-[#0A0C10] flex items-center justify-between text-[10px] text-[#585B64] select-none shrink-0">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Dedicated On-Premise Instance</span>
                  </span>
                  <span>Zero per-seat licensing</span>
                </div>

              </div>
            </div>

          </div>

          {/* 4 Architectural Fact Blocks */}
          <div data-build="fade" className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border-t border-[#1F232B] mt-12 pt-8">
            <div className="p-3.5 rounded-lg border border-transparent hover:border-[#1F232B] hover:bg-[#0E1015] transition-all duration-200 cursor-default">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#585B64] mb-1">Deployment</div>
              <div className="text-sm font-semibold text-white">100% On-Premise</div>
              <p className="text-xs text-[#94979E] mt-0.5">On your hardware or private cloud</p>
            </div>

            <div className="p-3.5 rounded-lg border border-transparent hover:border-[#1F232B] hover:bg-[#0E1015] transition-all duration-200 cursor-default">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#585B64] mb-1">Pricing Model</div>
              <div className="text-sm font-semibold text-white">Flat Capital Asset</div>
              <p className="text-xs text-[#94979E] mt-0.5">No recurring per-user license fees</p>
            </div>

            <div className="p-3.5 rounded-lg border border-transparent hover:border-[#1F232B] hover:bg-[#0E1015] transition-all duration-200 cursor-default">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#585B64] mb-1">Intellectual Property</div>
              <div className="text-sm font-semibold text-white">100% Owned Code</div>
              <p className="text-xs text-[#94979E] mt-0.5">Fully documented, zero lock-in</p>
            </div>

            <div className="p-3.5 rounded-lg border border-transparent hover:border-[#1F232B] hover:bg-[#0E1015] transition-all duration-200 cursor-default">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#585B64] mb-1">UI Response</div>
              <div className="text-sm font-semibold text-white">&lt; 1ms Perceived</div>
              <p className="text-xs text-[#94979E] mt-0.5">Reactive, zero-spinner architecture</p>
            </div>
          </div>

        </div>
      </section>

      {/* Scroll anchors for navigation compatibility */}
      <div id="demo" className="scroll-mt-24"></div>
      <div id="solutions" className="scroll-mt-24"></div>

      {/* Unified Interactive Transformation Showroom */}
      <section id="transformation" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#1F232B]">
        
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181B22] border border-[#272B36] text-[11px] font-semibold text-[#F84B11] tracking-wider uppercase mb-3">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Interactive Workflow Transformation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            From Spreadsheet Chaos to Custom Operating System
          </h2>
          <p className="text-[#94979E] text-sm mt-3 leading-relaxed">
            Most mid-sized businesses run on fragile, color-coded spreadsheets full of formula errors and untracked WhatsApp notes. Watch how Vorsik transforms manual B2B order dispatch into an owned, sub-millisecond custom operational application.
          </p>
        </div>

        {/* Showroom Interactive Shell */}
        <div className="rounded-xl border border-[#20232B] bg-[#0E1015] shadow-2xl overflow-hidden transition-all duration-300">
          
          {/* Workstation Frame Header */}
          <div className="border-b border-[#1F232B] bg-[#0A0C10] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            
            {/* Window Controls & State Protocol */}
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2A2E39]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#2A2E39]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#2A2E39]" />
              <span className="ml-2 font-mono text-xs text-[#717684]">
                {transformationMode === 'spreadsheet' 
                  ? 'xlsx://local/B2B_Orders_Master_2025_FINAL_v4_copy.xlsx (Sync conflict in Row 2)' 
                  : 'vorsik-core://orders.lan (On-Premise NVMe • 0.2ms latency)'}
              </span>
            </div>

            {/* View Switcher / Interactive Trigger Pill */}
            <div className="flex items-center gap-2">
              <div className="inline-flex p-0.5 rounded-lg bg-[#14161D] border border-[#20232B] text-xs font-medium">
                <button
                  onClick={() => setTransformationMode('spreadsheet')}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                    transformationMode === 'spreadsheet'
                      ? 'bg-[#1E2129] text-white shadow-sm'
                      : 'text-[#94979E] hover:text-white'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">1. Messy Spreadsheet (Before)</span>
                  <span className="sm:hidden inline">1. Spreadsheet</span>
                </button>

                <button
                  onClick={() => {
                    setTransformationMode('vorsik');
                    triggerBuildCrewOnShowroom();
                  }}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                    transformationMode === 'vorsik'
                      ? 'bg-[#1E2129] text-white shadow-sm'
                      : 'text-[#94979E] hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-[#F84B11] fill-current" />
                  <span className="hidden sm:inline">2. Vorsik Custom OS (After)</span>
                  <span className="sm:hidden inline">2. Vorsik OS</span>
                </button>
              </div>

              {transformationMode === 'vorsik' && (
                <button
                  onClick={handleReplayTransformation}
                  className="px-2.5 py-1.5 rounded-lg border border-[#262B36] bg-[#14161D] hover:bg-[#1E222D] hover:border-[#F84B11]/50 text-xs text-[#EDEDED] flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  title="Replay multiplayer build animation"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#F84B11]" />
                  <span className="hidden md:inline">Replay Build</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Screen Content Canvas */}
          <div className="relative min-h-[520px] p-4 sm:p-6 bg-[#0B0D12]">

            {/* VIEW 1: THE MESSY SPREADSHEET (BEFORE) */}
            {transformationMode === 'spreadsheet' && (
              <div className="space-y-4 animate-fade-in">
                
                {/* Spreadsheet Alert Ribbon & Action Banner */}
                <div className="p-3.5 sm:p-4 rounded-lg bg-[#18130B] border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-300">Sync Conflicts & Formula Breakage Detected</span>
                        <span className="px-1.5 py-0.2 rounded bg-red-950 text-red-400 font-mono text-[10px] border border-red-800/40">2 Cells Corrupted</span>
                      </div>
                      <p className="text-xs text-amber-200/80 mt-0.5">
                        Formula dependencies broke when Column D was deleted. Multiple users editing via shared folder without role permissions.
                      </p>
                    </div>
                  </div>

                  {/* Primary Trigger Button */}
                  <button
                    onClick={handleStartTransformation}
                    className="px-4 py-2.5 rounded-lg bg-[#F84B11] hover:bg-[#ff5d26] active:scale-[0.98] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-lg shadow-[#F84B11]/20 hover:shadow-[#F84B11]/40 shrink-0 animate-pulse-glow"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Transform to Vorsik Custom App</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Formula Bar Simulation */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-[#1F232B] bg-[#0E1015] text-xs font-mono text-[#94979E]">
                  <span className="text-[#585B64] font-semibold">fx</span>
                  <div className="w-px h-3.5 bg-[#20232B]" />
                  <span className="text-amber-300 truncate">
                    =IFERROR(VLOOKUP(C14, 'Precios_2024'!$A$2:$F$500, 4, FALSE) * G14, "#REF!")
                  </span>
                </div>

                {/* Spreadsheet Raw Grid Table */}
                <div className="overflow-x-auto border border-[#1F232B] rounded-lg bg-[#08090C]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="border-b border-[#1F232B] bg-[#0E1015] text-[#585B64] font-mono text-[11px]">
                      <tr>
                        <th className="py-2 px-3 border-r border-[#1F232B] w-8 text-center bg-[#0A0C10]">#</th>
                        <th className="py-2 px-3 border-r border-[#1F232B] font-semibold">A: Order ID</th>
                        <th className="py-2 px-3 border-r border-[#1F232B] font-semibold">B: Account / Client</th>
                        <th className="py-2 px-3 border-r border-[#1F232B] font-semibold">C: SKU Breakdown</th>
                        <th className="py-2 px-3 border-r border-[#1F232B] font-semibold">D: Net Total</th>
                        <th className="py-2 px-3 border-r border-[#1F232B] font-semibold">E: Payment Status</th>
                        <th className="py-2 px-3 border-r border-[#1F232B] font-semibold">F: Delivery SLA</th>
                        <th className="py-2 px-3 font-semibold text-amber-400/90">G: Internal Notes (WhatsApp / Post-its)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#171920] font-sans">
                      <tr className="hover:bg-[#101218] transition-colors">
                        <td className="py-2.5 px-3 border-r border-[#1F232B] font-mono text-[11px] text-[#585B64] text-center bg-[#0A0C10]">2</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] font-mono font-medium text-white">ORD-8942</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-white">Northern Distribution Logistics Inc.</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-[#94979E]">120x Hyd-Valve Seals</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] tabular-nums font-semibold text-[#EDEDED]">$14,250.00</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B]">
                          <span className="px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-600/40 text-amber-300 font-mono text-[10px]">
                            PENDING ⚠️
                          </span>
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-[#94979E]">Today 04:00 PM</td>
                        <td className="py-2.5 px-3 text-amber-300/90 text-[11px] bg-amber-950/20">
                          ⚠️ Cheque rebotó en banco - avisar a finanzas urgente
                        </td>
                      </tr>

                      <tr className="hover:bg-[#101218] transition-colors">
                        <td className="py-2.5 px-3 border-r border-[#1F232B] font-mono text-[11px] text-[#585B64] text-center bg-[#0A0C10]">3</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] font-mono font-medium text-white">ORD-8941</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-white">St. Mary Surgical Center</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-[#94979E]">45x HEPA Filters</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] bg-red-950/40">
                          <span className="px-2 py-0.5 rounded bg-red-900/60 text-red-300 font-mono font-bold text-[11px] border border-red-700/50">
                            #VALUE!
                          </span>
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B]">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 font-mono text-[10px]">
                            PAID
                          </span>
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-[#94979E]">Tomorrow 10:00 AM</td>
                        <td className="py-2.5 px-3 text-[#7E8390] text-[11px]">
                          Factura hecha a mano en PDF viejo (sin numeración fiscal)
                        </td>
                      </tr>

                      <tr className="hover:bg-[#101218] transition-colors">
                        <td className="py-2.5 px-3 border-r border-[#1F232B] font-mono text-[11px] text-[#585B64] text-center bg-[#0A0C10]">4</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] font-mono font-medium text-white">ORD-8940</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-white">Pacific Heavy Contracting LLC</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-[#94979E]">310x Heavy Bearings</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] tabular-nums font-semibold text-[#EDEDED]">$28,400.00</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B]">
                          <span className="px-1.5 py-0.5 rounded bg-blue-950/40 border border-blue-800/40 text-blue-400 font-mono text-[10px]">
                            IN TRANSIT
                          </span>
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] bg-red-950/40">
                          <span className="px-2 py-0.5 rounded bg-red-900/60 text-red-300 font-mono font-bold text-[11px] border border-red-700/50">
                            #REF!
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-[#7E8390] text-[11px]">
                          Chofer mandó foto de remito arrugado por chat de WhatsApp
                        </td>
                      </tr>

                      <tr className="hover:bg-[#101218] transition-colors">
                        <td className="py-2.5 px-3 border-r border-[#1F232B] font-mono text-[11px] text-[#585B64] text-center bg-[#0A0C10]">5</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] font-mono font-medium text-white">ORD-8939</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-white">Apex Commercial Systems Corp.</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-[#94979E]">18x Regulators</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] tabular-nums font-semibold text-[#EDEDED]">$4,120.00</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B]">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 font-mono text-[10px]">
                            PAID
                          </span>
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-[#94979E]">Delivered</td>
                        <td className="py-2.5 px-3 text-amber-300/90 text-[11px] bg-amber-950/20">
                          ¿Quién autorizó este 15% de descuento sin firmar?
                        </td>
                      </tr>

                      <tr className="hover:bg-[#101218] transition-colors">
                        <td className="py-2.5 px-3 border-r border-[#1F232B] font-mono text-[11px] text-[#585B64] text-center bg-[#0A0C10]">6</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] font-mono font-medium text-white">ORD-8938</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-white">Vanguard Manufacturing Supply</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-[#94979E]">90x Quick Couplings</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] tabular-nums font-semibold text-[#EDEDED]">$8,950.00</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B]">
                          <span className="px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-600/40 text-amber-300 font-mono text-[10px]">
                            PENDING ⚠️
                          </span>
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-[#94979E]">Tomorrow 02:00 PM</td>
                        <td className="py-2.5 px-3 text-red-300 text-[11px] bg-red-950/20">
                          Bodega dice que faltan 12 unidades físicas en estante B
                        </td>
                      </tr>

                      <tr className="hover:bg-[#101218] transition-colors">
                        <td className="py-2.5 px-3 border-r border-[#1F232B] font-mono text-[11px] text-[#585B64] text-center bg-[#0A0C10]">7</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] font-mono font-medium text-white">ORD-8937</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-white">Cascade Industrial Works LLC</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-[#94979E]">240x Steel Flanges</td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] bg-red-950/40">
                          <span className="px-2 py-0.5 rounded bg-red-900/60 text-red-300 font-mono font-bold text-[11px] border border-red-700/50">
                            #REF!
                          </span>
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B]">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 font-mono text-[10px]">
                            PAID
                          </span>
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#1F232B] text-[#94979E]">Delivered</td>
                        <td className="py-2.5 px-3 text-[#7E8390] text-[11px]">
                          No tocar esta celda - rompe la fórmula de totalización general
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Spreadsheet Summary Warnings Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#717684] pt-1">
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-red-400 font-bold">SUM(D2:D7) = #REF!</span>
                    <span>(Corrupted calculation: team cannot verify weekly billing volume)</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-amber-400">● 0 Role-based permissions</span>
                    <span className="text-red-400">● Zero immutable audit trail</span>
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 2: VORSIK CUSTOM OPERATING SYSTEM (AFTER) */}
            {transformationMode === 'vorsik' && (
              <div className="space-y-5 animate-fade-in">
                
                {/* Mode Sub-Navigation: Cards (Default) vs Table */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1A1D24]">
                  <div className="inline-flex p-0.5 rounded-lg bg-[#14161D] border border-[#20232B] text-xs font-medium">
                    <button
                      onClick={() => setVorsikSubView('cards')}
                      className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                        vorsikSubView === 'cards'
                          ? 'bg-[#1E2129] text-white shadow-sm font-semibold'
                          : 'text-[#717684] hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 text-[#F84B11]" />
                      <span>1. Visual Cards & Pipeline (Default)</span>
                    </button>
                    <button
                      onClick={() => setVorsikSubView('table')}
                      className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                        vorsikSubView === 'table'
                          ? 'bg-[#1E2129] text-white shadow-sm font-semibold'
                          : 'text-[#717684] hover:text-white'
                      }`}
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                      <span>2. High-Density Table View</span>
                    </button>
                  </div>

                  <div className="text-xs text-[#717684] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>0.2ms Perceived • ACID Local SQLite / PostgreSQL</span>
                  </div>
                </div>

                {/* Real-Time KPIs Top Bar (Targeted by BuildCrew) */}
                <div data-build-showroom className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-lg border border-[#1F232B] bg-[#0E1015]">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#717684] mb-0.5">Pending Approval</div>
                    <div className="text-base font-bold text-white tabular-nums">2 Orders</div>
                    <p className="text-[11px] text-amber-400 mt-0.5">$23,200 USD in queue</p>
                  </div>

                  <div className="p-3.5 rounded-lg border border-[#1F232B] bg-[#0E1015]">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#717684] mb-0.5">Active In Transit</div>
                    <div className="text-base font-bold text-white tabular-nums">1 Shipment</div>
                    <p className="text-[11px] text-blue-400 mt-0.5">Truck #04 ETA 35 mins</p>
                  </div>

                  <div className="p-3.5 rounded-lg border border-[#1F232B] bg-[#0E1015]">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#717684] mb-0.5">Collected Volume</div>
                    <div className="text-base font-bold text-white tabular-nums">$65,060 USD</div>
                    <p className="text-[11px] text-emerald-400 mt-0.5">100% Reconciled</p>
                  </div>

                  <div className="p-3.5 rounded-lg border border-[#1F232B] bg-[#0E1015]">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#717684] mb-0.5">System Latency</div>
                    <div className="text-base font-bold text-white tabular-nums">0.2ms Perceived</div>
                    <p className="text-[11px] text-emerald-400 mt-0.5">Local NVMe on LAN</p>
                  </div>
                </div>

                {/* SUBVIEW A: VISUAL CARDS & PIPELINE (DEFAULT) */}
                {vorsikSubView === 'cards' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    
                    {/* Pipeline Columns Container (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      
                      {/* Stage 1: Needs Approval */}
                      <div data-build-showroom className="p-4 rounded-xl border border-[#232731] bg-[#0E1015] space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#1A1D24]">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-white">Stage 1: Needs Approval</span>
                            <span className="px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-300 font-mono text-[10px] border border-amber-800/40">
                              {b2bOrders.filter(o => o.status === 'Pending Approval').length} Orders
                            </span>
                          </div>
                          <span className="text-[11px] text-amber-400 font-semibold">$23,200 USD</span>
                        </div>

                        <div className="space-y-2.5">
                          {b2bOrders.filter(o => o.status === 'Pending Approval').map(order => (
                            <div
                              key={order.id}
                              onClick={() => setSelectedOrderId(order.id)}
                              className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                                selectedOrderId === order.id
                                  ? 'border-[#F84B11] bg-[#141620] shadow-md shadow-[#F84B11]/10'
                                  : 'border-[#1E222A] bg-[#0A0C10] hover:border-[#2C303B]'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <div>
                                  <span className="font-mono text-xs font-semibold text-[#F84B11] mr-2">{order.id}</span>
                                  <span className="font-semibold text-white text-xs">{order.client}</span>
                                </div>
                                <span className="tabular-nums font-bold text-white text-xs">{order.total}</span>
                              </div>

                              <p className="text-[11px] text-[#94979E] mb-3">{order.items}</p>

                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#717684] flex items-center gap-1">
                                  <Clock3 className="w-3 h-3 text-amber-400" />
                                  <span>SLA: {order.sla}</span>
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleApproveB2BOrder(order.id);
                                  }}
                                  className="px-2.5 py-1 rounded bg-[#F84B11] hover:bg-[#ff5d26] active:scale-[0.95] text-white font-medium text-[11px] transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                                >
                                  <Zap className="w-3 h-3 fill-current" />
                                  <span>Authorize & Queue</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stage 2: Active Dispatch & In Transit */}
                      <div data-build-showroom className="p-4 rounded-xl border border-[#232731] bg-[#0E1015] space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#1A1D24]">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-white">Stage 2: In Transit / Fulfillment</span>
                            <span className="px-1.5 py-0.2 rounded bg-blue-950/80 text-blue-300 font-mono text-[10px] border border-blue-800/40">
                              {b2bOrders.filter(o => o.status === 'In Transit').length} En Route
                            </span>
                          </div>
                          <span className="text-[11px] text-blue-400 font-semibold">$28,400 USD</span>
                        </div>

                        <div className="space-y-2.5">
                          {b2bOrders.filter(o => o.status === 'In Transit').map(order => (
                            <div
                              key={order.id}
                              onClick={() => setSelectedOrderId(order.id)}
                              className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                                selectedOrderId === order.id
                                  ? 'border-[#F84B11] bg-[#141620] shadow-md shadow-[#F84B11]/10'
                                  : 'border-[#1E222A] bg-[#0A0C10] hover:border-[#2C303B]'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <div>
                                  <span className="font-mono text-xs font-semibold text-[#F84B11] mr-2">{order.id}</span>
                                  <span className="font-semibold text-white text-xs">{order.client}</span>
                                </div>
                                <span className="tabular-nums font-bold text-white text-xs">{order.total}</span>
                              </div>

                              <p className="text-[11px] text-[#94979E] mb-2">{order.items}</p>

                              {/* Visual Route Progress */}
                              <div className="p-2.5 rounded bg-[#12141C] border border-[#1C2028] mb-2.5">
                                <div className="flex items-center justify-between text-[10px] text-[#94979E] mb-1">
                                  <span className="text-white font-medium">Truck #04 • Regional Corridor</span>
                                  <span className="text-blue-400 font-semibold">68% Dispatched</span>
                                </div>
                                <div className="w-full bg-[#1C2028] h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-blue-500 h-full w-[68%] rounded-full" />
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-[#717684] mt-1.5">
                                  <span>Waypoint: Highway Interlink 4</span>
                                  <span className="text-emerald-400 font-medium">ETA 35 mins</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#717684] text-[10px]">{order.notes}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setToastMessage(`Truck #04 GPS ping: 1.4 miles to delivery dock. Telemetry synced (0.1ms).`);
                                    setTimeout(() => setToastMessage(null), 3000);
                                  }}
                                  className="px-2.5 py-1 rounded bg-blue-950/70 hover:bg-blue-900/80 active:scale-[0.95] text-blue-300 border border-blue-700/50 font-medium text-[11px] transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  <Truck className="w-3 h-3" />
                                  <span>Track Driver</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right: Live Order Inspector & One-Click Billing Console (5 cols) */}
                    <div data-build-showroom className="lg:col-span-5 p-4 sm:p-5 rounded-xl border border-[#232731] bg-[#0E1015] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-[#1A1D24] mb-4">
                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F84B11]">Live Order Inspector</span>
                            <h4 className="text-base font-bold text-white flex items-center gap-2 mt-0.5">
                              <span>{selectedOrder.id}</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                                selectedOrder.status === 'Pending Approval'
                                  ? 'bg-amber-950/70 text-amber-300 border-amber-800/40'
                                  : selectedOrder.status === 'In Transit'
                                  ? 'bg-blue-950/70 text-blue-300 border-blue-800/40'
                                  : 'bg-emerald-950/70 text-emerald-300 border-emerald-800/40'
                              }`}>
                                {selectedOrder.status}
                              </span>
                            </h4>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] text-[#717684]">Total Order Net</div>
                            <div className="text-base font-bold text-white tabular-nums">{selectedOrder.total}</div>
                          </div>
                        </div>

                        {/* Account Profile Card */}
                        <div className="p-3 rounded-lg bg-[#0A0C10] border border-[#1A1D24] mb-4 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[#717684]">Client Account:</span>
                            <span className="font-semibold text-white truncate max-w-[200px]">{selectedOrder.client}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#717684]">Account Executive:</span>
                            <span className="text-[#EDEDED]">{selectedOrder.rep}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#717684]">Payment Terms:</span>
                            <span className="text-emerald-400 font-medium">Net-30 (Approved Credit)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#717684]">Delivery SLA:</span>
                            <span className="text-[#EDEDED]">{selectedOrder.sla}</span>
                          </div>
                        </div>

                        {/* SKU Breakdown Visual List */}
                        <div className="space-y-2 mb-4">
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#717684]">Verified Line Items</div>
                          <div className="p-3 rounded-lg bg-[#0A0C10] border border-[#1A1D24]">
                            <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
                              <span>{selectedOrder.items}</span>
                              <span className="tabular-nums">{selectedOrder.total}</span>
                            </div>
                            <div className="text-[10px] text-[#717684] flex items-center justify-between">
                              <span>Quantity: {selectedOrder.units} units</span>
                              <span className="text-emerald-400 font-medium">Barcode Verified (0ms)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* One-Click Tactical Actions */}
                      <div className="space-y-2 pt-3 border-t border-[#1A1D24]">
                        {selectedOrder.status === 'Pending Approval' ? (
                          <button
                            onClick={() => handleApproveB2BOrder(selectedOrder.id)}
                            className="w-full py-2.5 rounded-lg bg-[#F84B11] hover:bg-[#ff5d26] active:scale-[0.98] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#F84B11]/20 cursor-pointer"
                          >
                            <Zap className="w-4 h-4 fill-current" />
                            <span>Authorize Order & Queue Dispatch</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleGenerateB2BInvoice(selectedOrder.id)}
                            className="w-full py-2.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 active:scale-[0.98] text-emerald-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                          >
                            <FileText className="w-4 h-4" />
                            <span>{selectedOrder.invoiced ? 'Re-Issue Encrypted Invoice' : 'Generate & Send PDF Invoice'}</span>
                          </button>
                        )}

                        <div className="text-[10px] text-[#585B64] text-center pt-1">
                          Cryptographic local WAL hash: 0x8f2a...99c4 • Synchronized
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* SUBVIEW B: HIGH-DENSITY TABLE VIEW (ALTERNATIVE) */
                  <div className="space-y-4 animate-fade-in">
                    
                    {/* Operational Toolbar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      {/* Status Filters */}
                      <div className="inline-flex p-0.5 rounded-lg bg-[#14161D] border border-[#20232B] text-xs font-medium">
                        <button
                          onClick={() => setB2BFilter('all')}
                          className={`px-2.5 py-1 rounded transition-colors ${
                            b2bFilter === 'all' ? 'bg-[#1E2129] text-white shadow-sm' : 'text-[#717684] hover:text-white'
                          }`}
                        >
                          All ({b2bOrders.length})
                        </button>
                        <button
                          onClick={() => setB2BFilter('pending')}
                          className={`px-2.5 py-1 rounded transition-colors ${
                            b2bFilter === 'pending' ? 'bg-[#1E2129] text-amber-300 shadow-sm' : 'text-[#717684] hover:text-white'
                          }`}
                        >
                          Pending ({b2bOrders.filter(o => o.status === 'Pending Approval').length})
                        </button>
                        <button
                          onClick={() => setB2BFilter('transit')}
                          className={`px-2.5 py-1 rounded transition-colors ${
                            b2bFilter === 'transit' ? 'bg-[#1E2129] text-blue-300 shadow-sm' : 'text-[#717684] hover:text-white'
                          }`}
                        >
                          In Transit ({b2bOrders.filter(o => o.status === 'In Transit').length})
                        </button>
                        <button
                          onClick={() => setB2BFilter('completed')}
                          className={`px-2.5 py-1 rounded transition-colors ${
                            b2bFilter === 'completed' ? 'bg-[#1E2129] text-emerald-300 shadow-sm' : 'text-[#717684] hover:text-white'
                          }`}
                        >
                          Invoiced ({b2bOrders.filter(o => o.status === 'Invoiced & Completed' || o.status === 'Approved & Queued').length})
                        </button>
                      </div>

                      {/* Search Bar & Quick Order Button */}
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-[#585B64] absolute left-2.5 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text"
                            placeholder="Search client, SKU, or order ID..."
                            value={b2bSearch}
                            onChange={(e) => setB2BSearch(e.target.value)}
                            className="bg-[#14161D] border border-[#232731] rounded-md pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-[#585B64] focus:outline-none focus:border-[#F84B11] transition-colors w-52 sm:w-60"
                          />
                        </div>
                        <button 
                          onClick={handleQuickAddB2BOrder}
                          className="px-3 py-1.5 rounded-md bg-[#161922] hover:bg-[#1E222D] active:scale-[0.97] border border-[#232731] hover:border-[#F84B11]/50 text-xs font-medium text-white flex items-center gap-1.5 transition-all duration-150 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#F84B11]" />
                          <span>New Order</span>
                        </button>
                      </div>

                    </div>

                    {/* Vorsik Production Table */}
                    <div className="overflow-x-auto border border-[#1F232B] rounded-lg bg-[#0A0C10]">
                      <table className="w-full text-left text-xs">
                        <thead className="border-b border-[#1F232B] text-[#585B64] bg-[#0E1015] uppercase tracking-wider font-semibold text-[11px]">
                          <tr>
                            <th className="py-2.5 px-4 font-medium">Order ID</th>
                            <th className="py-2.5 px-4 font-medium">Account / Client</th>
                            <th className="py-2.5 px-4 font-medium">SKU Breakdown</th>
                            <th className="py-2.5 px-4 font-medium">Total Amount</th>
                            <th className="py-2.5 px-4 font-medium">Fulfillment SLA</th>
                            <th className="py-2.5 px-4 font-medium">Status</th>
                            <th className="py-2.5 px-4 text-right font-medium">Operational Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#171920]">
                          {filteredB2BOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-[#141620] transition-colors duration-150">
                              <td className="py-3 px-4 font-mono font-semibold text-[#F84B11]">{order.id}</td>
                              <td className="py-3 px-4 font-semibold text-white">
                                <div>{order.client}</div>
                                <div className="text-[10px] text-[#717684] font-normal">{order.notes}</div>
                              </td>
                              <td className="py-3 px-4 text-[#EDEDED]">
                                <span>{order.items}</span>
                                <span className="text-[#717684] ml-1.5">({order.units} units)</span>
                              </td>
                              <td className="py-3 px-4 tabular-nums font-semibold text-white">{order.total}</td>
                              <td className="py-3 px-4 text-[#94979E] text-[11px]">{order.sla}</td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                                  order.status === 'Approved & Queued' 
                                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' 
                                    : order.status === 'In Transit'
                                    ? 'bg-blue-950/60 text-blue-400 border border-blue-800/40'
                                    : order.status === 'Invoiced & Completed'
                                    ? 'bg-zinc-800/60 text-zinc-300 border border-zinc-700/40'
                                    : 'bg-[#251A15] text-[#F84B11] border border-[#F84B11]/30'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                {order.status === 'Pending Approval' ? (
                                  <button
                                    onClick={() => handleApproveB2BOrder(order.id)}
                                    className="px-2.5 py-1 rounded bg-[#F84B11] hover:bg-[#ff5d26] active:scale-[0.95] text-white font-medium text-[11px] transition-all duration-150 cursor-pointer shadow-sm hover:shadow-[#F84B11]/30 hover:-translate-y-0.5 inline-flex items-center gap-1"
                                  >
                                    <Zap className="w-3 h-3 fill-current" />
                                    <span>Approve & Dispatch</span>
                                  </button>
                                ) : order.status === 'Approved & Queued' ? (
                                  <button
                                    onClick={() => handleGenerateB2BInvoice(order.id)}
                                    className="px-2.5 py-1 rounded bg-emerald-950/70 hover:bg-emerald-900/80 active:scale-[0.95] text-emerald-300 border border-emerald-700/50 font-medium text-[11px] transition-all duration-150 cursor-pointer inline-flex items-center gap-1"
                                  >
                                    <FileText className="w-3 h-3" />
                                    <span>Issue Invoice</span>
                                  </button>
                                ) : order.status === 'In Transit' ? (
                                  <button
                                    onClick={() => {
                                      setToastMessage(`Truck #04 en route to ${order.client}. GPS ping: 0.1ms.`);
                                      setTimeout(() => setToastMessage(null), 3000);
                                    }}
                                    className="px-2.5 py-1 rounded bg-blue-950/70 hover:bg-blue-900/80 active:scale-[0.95] text-blue-300 border border-blue-700/50 font-medium text-[11px] transition-all duration-150 cursor-pointer inline-flex items-center gap-1"
                                  >
                                    <Truck className="w-3 h-3" />
                                    <span>Track Truck</span>
                                  </button>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>Invoiced & Audited</span>
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Vorsik System Audit & Integrity Footer */}
                <div className="flex flex-wrap items-center justify-between text-[11px] text-[#717684] pt-1">
                  <span>Cryptographic audit log: {auditEventsCount} immutable events committed to local storage</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Local database transactions synchronized (0.1ms WAL commit)
                  </span>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* 3 Architectural & Economic Value Fact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-5 rounded-xl border border-[#1F232B] bg-[#0E1015] interactive-card cursor-default">
            <div className="flex items-center gap-2 mb-2 text-[#F84B11]">
              <Database className="w-4 h-4" />
              <div className="text-[11px] font-semibold uppercase tracking-wider">Relational Integrity</div>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Zero Formula Breakage</h3>
            <p className="text-xs text-[#94979E] leading-relaxed">
              Spreadsheets fail when someone accidentally deletes a column or overwrites a formula. Vorsik enforces strict PostgreSQL types and constraints that make data corruption impossible.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#1F232B] bg-[#0E1015] interactive-card cursor-default">
            <div className="flex items-center gap-2 mb-2 text-emerald-400">
              <Zap className="w-4 h-4 fill-current" />
              <div className="text-[11px] font-semibold uppercase tracking-wider">Sub-Millisecond Execution</div>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">&lt; 1ms Tactical Speed</h3>
            <p className="text-xs text-[#94979E] leading-relaxed">
              No spinning web loaders or commercial cloud lag. Instant pick, pack, dispatch approval, and billing reconciliation running on your local office network hardware.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#1F232B] bg-[#0E1015] interactive-card cursor-default">
            <div className="flex items-center gap-2 mb-2 text-blue-400">
              <Building2 className="w-4 h-4" />
              <div className="text-[11px] font-semibold uppercase tracking-wider">Owned Capital Asset</div>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Zero Per-User Seat Rent</h3>
            <p className="text-xs text-[#94979E] leading-relaxed">
              Commercial ERPs bill $120+ USD per user each month. Vorsik is delivered as a capitalized corporate software asset—you own the source code, hardware deployment, and client data forever.
            </p>
          </div>
        </div>

      </section>

      {/* Financial Arbitrage Section */}
      <section id="financial-model" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#1F232B]">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#F84B11] mb-2">Financial Analysis</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            The Financial Reality: Capital Asset vs. Perpetual Rent
          </h2>
          <p className="text-[#94979E] text-sm mt-3">
            Traditional SaaS penalizes company growth: every new hire increases your recurring monthly software overhead. With Vorsik, custom software becomes an owned, balance-sheet asset.
          </p>
        </div>

        {/* Comparison Matrix */}
        <div className="border border-[#1F232B] rounded-xl overflow-hidden bg-[#0A0C10]">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1F232B]">
            
            {/* SaaS */}
            <div className="p-6 flex flex-col justify-between interactive-card cursor-default">
              <div>
                <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Traditional SaaS (Rental)</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Per-Seat Subscriptions</h3>
                <p className="text-xs text-[#94979E] mb-6 leading-relaxed">
                  Salesforce, HubSpot, enterprise cloud ERPs. Compounding fees, annual rate hikes, and generic workflows you are forced to adapt to.
                </p>
                <div className="space-y-3 text-xs text-[#94979E]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#181A22]">
                    <span>Monthly fee (25 users):</span>
                    <span className="tabular-nums font-semibold text-white">$1,500 USD / mo</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#181A22]">
                    <span>3-Year cumulative spend:</span>
                    <span className="tabular-nums font-semibold text-red-400 font-bold">$54,000 USD</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#181A22]">
                    <span>Code ownership:</span>
                    <span className="tabular-nums font-medium text-[#585B64]">0% (Perpetual Lease)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data storage:</span>
                    <span className="text-[#585B64]">Shared third-party cloud</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Traditional Agency */}
            <div className="p-6 flex flex-col justify-between interactive-card cursor-default">
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Legacy Dev Agency</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Slow & Opaque Consulting</h3>
                <p className="text-xs text-[#94979E] mb-6 leading-relaxed">
                  Inflated billing hours, 6- to 12-month delivery timelines, bureaucratic project management, and proprietary vendor lock-in.
                </p>
                <div className="space-y-3 text-xs text-[#94979E]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#181A22]">
                    <span>Upfront capital:</span>
                    <span className="tabular-nums font-semibold text-white">$35,000 - $80,000 USD</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#181A22]">
                    <span>Delivery timeframe:</span>
                    <span className=" text-amber-400">6 to 12 months</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#181A22]">
                    <span>Architecture documentation:</span>
                    <span className="tabular-nums font-medium text-[#585B64]">Minimal / Black Box</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Vendor dependency:</span>
                    <span className="text-amber-400">High (Locked In)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VORSIK */}
            <div className="p-6 bg-[#0E1016] flex flex-col justify-between relative border-l-2 border-l-[#F84B11] interactive-card cursor-default shadow-lg shadow-[#F84B11]/5">
              <div>
                <div className="text-xs font-semibold text-[#F84B11] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>The Vorsik Model</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Owned Corporate Asset</h3>
                <p className="text-xs text-[#94979E] mb-6 leading-relaxed">
                  Custom software built in 14 days. Hosted on your hardware or private VPS with documented, modular code and zero seat restrictions.
                </p>
                <div className="space-y-3 text-xs text-[#94979E]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1F232B]">
                    <span>Initial investment:</span>
                    <span className="tabular-nums font-semibold text-white font-semibold">$5,000 - $12,000 USD</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#1F232B]">
                    <span>3-Year TCO (with support):</span>
                    <span className="tabular-nums font-semibold text-emerald-400 font-bold">~$20,900 USD</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#1F232B]">
                    <span>Code ownership:</span>
                    <span className="tabular-nums font-semibold text-white font-semibold">100% Client-Owned</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data storage:</span>
                    <span className="text-white font-medium">Your own servers</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Engineering Principles (Anti-Slop Technical Foundations) */}
      <section id="engineering" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#1F232B]">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#F84B11] mb-2">Technical Foundations</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Zero-Latency Architecture & Local Data Sovereignty
          </h2>
          <p className="text-[#94979E] text-sm mt-3">
            Enterprise software should never freeze your staff behind loading spinners. We implement high-performance engineering patterns so daily workflows operate with zero friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-[#1F232B] bg-[#0A0C10] interactive-card cursor-default">
            <div className="flex items-center gap-2 text-xs tabular-nums font-semibold text-[#F84B11] mb-2">
              <Cpu className="w-4 h-4" />
              <span>01. Optimistic State Synchronization</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Elimination of Loading Spinners</h3>
            <p className="text-xs text-[#94979E] leading-relaxed">
              Operator mutations are applied to the UI instantly at 0 milliseconds. Relational database persistence, data validation, and foreign key constraints resolve asynchronously in the background without blocking the interface.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-[#1F232B] bg-[#0A0C10] interactive-card cursor-default">
            <div className="flex items-center gap-2 text-xs tabular-nums font-semibold text-[#F84B11] mb-2">
              <Clock3 className="w-4 h-4" />
              <span>02. Predictive Intent Prefetching</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Pre-Rendered Context Before User Clicks</h3>
            <p className="text-xs text-[#94979E] leading-relaxed">
              The client monitors cursor trajectory and viewport intersections, pulling resource bundles into memory during the 200ms human cognitive delay. Page transitions occur instantaneously.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-[#1F232B] bg-[#0A0C10] interactive-card cursor-default">
            <div className="flex items-center gap-2 text-xs tabular-nums font-semibold text-[#F84B11] mb-2">
              <Server className="w-4 h-4" />
              <span>03. Isolated Docker Packaging</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-2">True Infrastructure Portability</h3>
            <p className="text-xs text-[#94979E] leading-relaxed">
              Every deliverable is packaged in declarative, reproducible containers. Migrating from an on-premise physical server to a dedicated cloud cluster (or vice versa) takes a single terminal command.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-[#1F232B] bg-[#0A0C10] interactive-card cursor-default">
            <div className="flex items-center gap-2 text-xs tabular-nums font-semibold text-[#F84B11] mb-2">
              <Code2 className="w-4 h-4" />
              <span>04. Open Architecture Blueprint</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Strictly Typed, Fully Documented Code</h3>
            <p className="text-xs text-[#94979E] leading-relaxed">
              We never engineer artificial dependencies. We supply complete OpenAPI specifications, normalized relational schemas, and operational runbooks so any qualified engineering team can audit or extend the code.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <section id="calculator" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-[#1F232B]">
        <div className="rounded-xl border border-[#20232B] bg-[#0A0C10] p-7 sm:p-10">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#F84B11] mb-2">ROI Financial Model</div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Quantify Your Company's True Savings</h2>
            <p className="text-xs text-[#94979E] mt-1">Adjust headcount and average monthly seat cost to calculate the 3-year financial differential of owning vs. renting software.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-[#EDEDED]">Team members using the system:</span>
                  <span className="text-[#F84B11] font-bold text-sm">{employees} users</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="120" 
                  step="5"
                  value={employees} 
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full accent-[#F84B11] bg-[#181A22] h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-[#EDEDED]">Average monthly license cost per seat:</span>
                  <span className="text-white font-bold text-sm">${costPerUser} USD / mo</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="150" 
                  step="5"
                  value={costPerUser} 
                  onChange={(e) => setCostPerUser(Number(e.target.value))}
                  className="w-full accent-[#F84B11] bg-[#181A22] h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-lg border border-[#1F232B] bg-[#0E1015] text-[11px] text-[#94979E] space-y-1 ">
                <p>• Vorsik estimate: $6,500 USD initial build + $400 USD/month optional SLA maintenance.</p>
                <p>• Software asset amortization continues indefinitely after year 3.</p>
              </div>
            </div>

            {/* Results Panel */}
            <div className="p-6 rounded-lg border border-[#2A2E3A] bg-[#0E1016] flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#585B64] mb-1">Projected 3-Year SaaS Spend (36 mos):</div>
                <div className="text-2xl font-bold tabular-nums font-semibold text-red-400 mb-4 line-through">
                  ${saasThreeYears.toLocaleString()} USD
                </div>

                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#585B64] mb-1">Total Vorsik Investment (Build + Support):</div>
                <div className="text-xl font-bold tabular-nums font-semibold text-white mb-6">
                  ${vorsikTotalThreeYears.toLocaleString()} USD
                </div>

                <div className="p-4 rounded-lg bg-[#141B18] border border-emerald-800/40 mb-6">
                  <div className="text-[11px]  uppercase text-emerald-400 font-semibold mb-1">Estimated 3-Year Net Savings:</div>
                  <div className="text-3xl font-bold tabular-nums font-semibold text-emerald-400">
                    +${totalSavings.toLocaleString()} USD
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#94979E] flex items-center justify-between">
                <span>Capital Payback Period:</span>
                <span className="text-white font-bold">{paybackMonths} months</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14-Day Delivery Timeline */}
      <section id="protocol" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#1F232B]">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#F84B11] mb-2">Engineering Protocol</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            From Spreadsheets to Production in 14 Days
          </h2>
          <p className="text-[#94979E] text-sm mt-3">
            We bypass consulting bureaucracy. We audit your existing data sheets and communication flows, then immediately engineer a hardened operational deliverable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-lg border border-[#1F232B] bg-[#0A0C10]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#F84B11] mb-2">DAYS 01 – 03</div>
            <h4 className="text-sm font-semibold text-white mb-2">Operational Audit</h4>
            <p className="text-xs text-[#94979E] leading-relaxed">
              We deconstruct your active spreadsheets, manual paper records, and messaging pipelines to define strict MVP requirements.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-[#1F232B] bg-[#0A0C10]">
            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-2">DAYS 04 – 09</div>
            <h4 className="text-sm font-semibold text-white mb-2">AI-Accelerated Engineering</h4>
            <p className="text-xs text-[#94979E] leading-relaxed">
              Rapid development of business rules, normalized relational PostgreSQL schemas, role-based access control, and sanitization.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-[#1F232B] bg-[#0A0C10]">
            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-2">DAYS 10 – 12</div>
            <h4 className="text-sm font-semibold text-white mb-2">Vorsik Core & Hardening</h4>
            <p className="text-xs text-[#94979E] leading-relaxed">
              Integration of the infrastructure health dashboard, automated encrypted local snapshots, and reproducible Docker builds.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-[#F84B11]/40 bg-[#12141A]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#F84B11] mb-2">DAYS 13 – 14</div>
            <h4 className="text-sm font-semibold text-white mb-2">Deployment & Key Handover</h4>
            <p className="text-xs text-[#EDEDED] leading-relaxed">
              Installation onto your physical on-premise hardware or private cloud, user training, and formal transfer of credentials and code.
            </p>
          </div>
        </div>
      </section>

      {/* Executive FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1F232B]">
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#F84B11] mb-2">Technical & Business Governance</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Frequently Addressed Objections
          </h2>
          <p className="text-[#94979E] text-sm mt-3">
            Direct, transparent answers regarding code ownership, long-term maintenance, security governance, and integrations.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div 
                key={faq.question}
                className="border border-[#1F232B] rounded-lg bg-[#0A0C10] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#0E1015] active:scale-[0.99] transition-all duration-150 cursor-pointer"
                >
                  <span className="text-sm font-semibold text-white flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#F84B11] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#585B64] shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#F84B11]' : ''}`} />
                </button>
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-2 text-xs text-[#94979E] leading-relaxed border-t border-[#181A22] bg-[#0C0E14]">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-[#1F232B]">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          Own your corporate software infrastructure.
        </h2>
        <p className="text-[#94979E] max-w-xl mx-auto text-sm mb-8">
          Schedule a 20-minute operational discovery session with our founding engineers. We will evaluate technical feasibility and model your exact ROI.
        </p>
        <button 
          onClick={handleOpenModal}
          className="px-7 py-3.5 rounded-md bg-[#EDEDED] hover:bg-white active:scale-[0.98] text-[#08090C] font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl cursor-pointer hover:-translate-y-0.5"
        >
          Request Workflow Discovery
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1F232B] py-10 px-4 sm:px-6 text-xs text-[#585B64] bg-[#07080A]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="VORSIK" className="h-4 w-auto opacity-70" />
            <span>— Enterprise software built to be owned.</span>
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Stack: PostgreSQL & Docker</span>
            <span>© {new Date().getFullYear()} Vorsik Technologies</span>
          </div>
        </div>
      </footer>

      {/* Scope Estimator Modal */}
      {isModalOpen && (
        <div 
          onClick={handleCloseModal}
          className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-200 cursor-pointer ${
            isModalClosing ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`bg-[#0E1015] border border-[#232731] rounded-xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto cursor-default ${
              isModalClosing ? 'modal-exit' : 'modal-enter'
            }`}
          >
            <button 
              onClick={handleCloseModal}
              className="absolute top-5 right-5 text-[#585B64] hover:text-white text-sm transition-colors cursor-pointer p-1"
            >
              ✕
            </button>

            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#F84B11] mb-1">Discovery Intake</div>
            <h3 className="text-lg font-bold text-white mb-1">Preliminary Software Scope</h3>
            <p className="text-xs text-[#94979E] mb-5">Select your primary operational requirements to receive an architectural plan and flat-rate investment estimate.</p>

            {/* Custom Branded Dropdown */}
            <div className="mb-4 relative">
              <label className="block text-xs font-medium text-[#94979E] mb-1.5">1. Company Industry / Vertical:</label>
              
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full bg-[#14161D] border rounded-md px-3 py-2.5 text-xs text-left text-white flex items-center justify-between transition-all duration-150 cursor-pointer ${
                  isDropdownOpen 
                    ? 'border-[#F84B11] ring-1 ring-[#F84B11]/30 bg-[#171922]' 
                    : 'border-[#232731] hover:border-[#2F3442]'
                }`}
              >
                <span className="truncate">{selectedIndustry}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#585B64] transition-transform duration-200 shrink-0 ml-2 ${isDropdownOpen ? 'rotate-180 text-[#F84B11]' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#101218] border border-[#232731] rounded-lg shadow-2xl py-1 max-h-56 overflow-y-auto animate-fade-in">
                  {industries.map((ind) => {
                    const isSelected = selectedIndustry === ind;
                    return (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => {
                          setSelectedIndustry(ind);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected 
                            ? 'bg-[#1E1714] text-[#F84B11] font-semibold' 
                            : 'text-[#EDEDED] hover:bg-[#161822] hover:text-white'
                        }`}
                      >
                        <span>{ind}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#F84B11] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Deployment */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-[#94979E] mb-1.5">2. Preferred Deployment Target:</label>
              <div className="grid grid-cols-2 gap-2">
                {['Local On-Premise Physical Server', "Client's Private Dedicated Cloud"].map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDeployment(d)}
                    className={`p-2.5 rounded-md border text-xs text-left transition-all duration-150 cursor-pointer ${
                      selectedDeployment === d 
                        ? 'border-[#F84B11] bg-[#1E1714] text-[#EDEDED]' 
                        : 'border-[#1F232B] bg-[#12141A] text-[#94979E] hover:border-[#2C303B]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Modules */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-[#94979E] mb-1.5">3. Core Required Modules:</label>
              <div className="space-y-1.5">
                {[
                  'Inventory Control & Fulfillment',
                  'CRM & Quotation Pipeline',
                  'Client Portal & Document Ingestion',
                  'Audit Logging & Role-Based Permissions',
                  'Two-Way Excel/CSV Automated Sync',
                  'Billing & Financial Reconciliation'
                ].map(mod => {
                  const isChecked = selectedFeatures.includes(mod);
                  return (
                    <div 
                      key={mod}
                      onClick={() => {
                        if (isChecked) {
                          setSelectedFeatures(selectedFeatures.filter(f => f !== mod));
                        } else {
                          setSelectedFeatures([...selectedFeatures, mod]);
                        }
                      }}
                      className={`p-2 rounded-md border text-xs flex items-center justify-between cursor-pointer transition-all duration-150 hover:-translate-y-0.5 ${
                        isChecked 
                          ? 'border-[#F84B11]/50 bg-[#1A1513] text-white shadow-sm' 
                          : 'border-[#1A1C24] bg-[#101217] text-[#94979E] hover:border-[#232731]'
                      }`}
                    >
                      <span>{mod}</span>
                      <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] font-bold ${isChecked ? 'bg-[#F84B11] text-white' : 'border border-[#2C303B]'}`}>
                        {isChecked ? '✓' : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submission */}
            <div className="pt-4 border-t border-[#1F232B] flex flex-col gap-2.5">
              <button 
                onClick={() => {
                  const text = encodeURIComponent(`Hi Vorsik. I am inquiring about custom enterprise software for the ${selectedIndustry} vertical.\nRequired modules: ${selectedFeatures.join(', ')}.\nDeployment target: ${selectedDeployment}.`);
                  window.open(`https://wa.me/?text=${text}`, '_blank');
                  handleCloseModal();
                }}
                className="w-full py-3 rounded-md bg-[#F84B11] hover:bg-[#ff5d26] active:scale-[0.98] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg shadow-[#F84B11]/20 hover:shadow-[#F84B11]/35"
              >
                Submit Request to Engineering
              </button>
              <button 
                onClick={handleCloseModal}
                className="w-full py-1.5 text-xs text-[#585B64] hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
