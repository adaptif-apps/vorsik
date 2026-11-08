import { useState, useEffect } from 'react';
import { 
  Server, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Activity, 
  FileSpreadsheet, 
  HardDrive, 
  RefreshCw, 
  Download, 
  Code2, 
  Building2, 
  Clock3, 
  Cpu, 
  HelpCircle,
  Truck,
  Wrench,
  ShieldCheck,
  ChevronDown,
  Check,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Calculator,
  GripVertical,
  Layers
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'client-app' | 'admin-hub'>('client-app');
  
  // Interactive client app state
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([
    { id: 'ORD-8942', client: 'Northern Distribution Logistics Inc.', total: '$14,250 USD', status: 'Pending', items: 120, date: 'Today, 10:14 AM' },
    { id: 'ORD-8941', client: 'St. Mary Surgical Center', total: '$6,800 USD', status: 'Approved', items: 45, date: 'Today, 09:42 AM' },
    { id: 'ORD-8940', client: 'Pacific Heavy Contracting LLC', total: '$28,400 USD', status: 'In Transit', items: 310, date: 'Yesterday, 06:20 PM' },
    { id: 'ORD-8939', client: 'Global Freight Systems Corp.', total: '$4,120 USD', status: 'Approved', items: 18, date: 'Yesterday, 04:05 PM' },
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive backups state (Vorsik Core Hub)
  const [backups, setBackups] = useState([
    { id: 'SNAP-20261107-0300', date: 'Today, 03:00 AM', size: '48.2 MB', type: 'Automated', status: 'AES-256 Encrypted' },
    { id: 'SNAP-20261106-0300', date: 'Nov 06, 03:00 AM', size: '47.9 MB', type: 'Automated', status: 'AES-256 Encrypted' },
    { id: 'SNAP-20261105-0300', date: 'Nov 05, 03:00 AM', size: '47.1 MB', type: 'Automated', status: 'AES-256 Encrypted' },
  ]);
  const [isBackingUp, setIsBackingUp] = useState(false);

  // ROI Calculator state
  const [employees, setEmployees] = useState(25);
  const [costPerUser, setCostPerUser] = useState(65);

  // Solutions / Industry archetypes state
  const [selectedSolution, setSelectedSolution] = useState<number>(0);

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

  // Trigger optimistic action (0ms latency UI)
  const handleApproveOrder = (orderId: string) => {
    setOrders(prev => prev.map(ord => ord.id === orderId ? { ...ord, status: 'Approved' } : ord));
    setToastMessage(`Instant state update (0ms). Local persistence verified (12ms).`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Trigger manual backup
  const handleTriggerBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      setBackups(prev => [
        { id: `SNAP-${now.getTime().toString().slice(-8)}`, date: timeStr, size: '48.8 MB', type: 'Manual', status: 'AES-256 Encrypted' },
        ...prev
      ]);
      setIsBackingUp(false);
      setToastMessage('Database snapshot generated and verified in local storage.');
      setTimeout(() => setToastMessage(null), 3500);
    }, 500);
  };

  // Calculations for ROI
  const saasYearly = employees * costPerUser * 12;
  const saasThreeYears = saasYearly * 3;
  const vorsikInitial = 6500;
  const vorsikMaintenanceThreeYears = 400 * 36;
  const vorsikTotalThreeYears = vorsikInitial + vorsikMaintenanceThreeYears;
  const totalSavings = saasThreeYears - vorsikTotalThreeYears;
  const paybackMonths = Math.max(1, Math.ceil((vorsikInitial / (employees * costPerUser))));

  const filteredOrders = orders.filter(o => 
    o.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const solutions = [
    {
      title: 'Wholesale, Warehousing & Fleet Dispatch',
      icon: Truck,
      problem: 'Enterprise ERPs like SAP and NetSuite charge $120+/user/month and require 8-month implementation cycles. Team defaults to chaotic shared Excel sheets that cause order duplication.',
      solution: 'A hardened, local-first inventory and dispatch portal. 0ms barcode scanning, real-time pick/pack validation, driver routing, and automated PDF delivery manifests.',
      impact: '100% elimination of double-entry errors. Saves $38,000/year in seat licenses for a 30-person logistics team.'
    },
    {
      title: 'Contracting, Construction & Field Job Costing',
      icon: Wrench,
      problem: 'Field supervisors struggle with rigid software on mobile. Subcontractor time logs, equipment rentals, and change orders get lost in WhatsApp chats and email threads.',
      solution: 'Custom operational field portal. Offline-first daily logs, photo milestone verification, subcontractor work orders, and automatic material budget reconciliation.',
      impact: 'Immediate cash-flow acceleration with same-day client billing instead of 3-week manual reconciliations.'
    },
    {
      title: 'Clinical Operations & Secure Patient Portals',
      icon: ShieldCheck,
      problem: 'Commercial healthcare management tools lock records in proprietary clouds, restrict custom intake workflows, and charge aggressive per-practitioner fees.',
      solution: 'Self-hosted clinical records, appointment dispatch, and HIPAA-compliant on-premise document vault. Zero patient data ever touches commercial third-party clouds.',
      impact: 'Total data sovereignty, sub-second chart retrieval, and zero recurring practitioner subscription bills.'
    }
  ];

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
            <a href="#demo" className="hover:text-white transition-colors">Vorsik Core Hub</a>
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
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
                href="#demo" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-[#161922] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Vorsik Core Hub</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </a>
              <a 
                href="#solutions" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-[#161922] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Solutions</span>
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

      {/* The Live Interactive System (Showcase) */}
      <section id="demo" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#F84B11] mb-1">Delivery Standard</div>
            <h2 className="text-2xl font-bold text-white tracking-tight">The Vorsik System in Production</h2>
          </div>
          <div className="text-xs text-[#94979E]">
            Interactive sandbox: test actions below to inspect sub-millisecond local response.
          </div>
        </div>

        <div className="rounded-xl border border-[#20232B] bg-[#0E1015] shadow-2xl overflow-hidden">
          
          {/* System Frame Header */}
          <div className="border-b border-[#1F232B] bg-[#0A0C10] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#20232B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#20232B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#20232B]" />
              <span className="ml-2 tabular-nums text-xs text-[#585B64]">vorsik-engine://node-01.local</span>
            </div>

            {/* Layer Switcher */}
            <div className="inline-flex w-full sm:w-auto p-0.5 rounded-lg bg-[#14161D] border border-[#20232B] text-xs font-medium">
              <button
                onClick={() => setActiveTab('client-app')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'client-app' 
                    ? 'bg-[#1E2129] text-white shadow-sm' 
                    : 'text-[#94979E] hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#F84B11]" />
                <span className="sm:inline hidden">1. Application Layer (Operations)</span>
                <span className="sm:hidden inline">1. App View</span>
              </button>
              <button
                onClick={() => setActiveTab('admin-hub')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'admin-hub' 
                    ? 'bg-[#1E2129] text-white shadow-sm' 
                    : 'text-[#94979E] hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span className="sm:inline hidden">2. Infrastructure Layer (Vorsik Core)</span>
                <span className="sm:hidden inline">2. Core Hub</span>
              </button>
            </div>
          </div>

          {/* Screen Content */}
          <div className="p-5 sm:p-7 min-h-[440px]">
            {activeTab === 'client-app' ? (
              <div key="client-app" className="animate-fade-in">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                      <span>Order Fulfillment & Dispatch Module</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">In Sync</span>
                    </h3>
                    <p className="text-xs text-[#94979E] mt-0.5">Designed with proper data density for administrative, operations, and logistics teams.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="text"
                      placeholder="Filter by account or order ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-[#14161D] border border-[#232731] rounded-md px-3 py-1.5 text-xs text-white placeholder:text-[#585B64] focus:outline-none focus:border-[#F84B11] transition-colors"
                    />
                    <button 
                      onClick={() => {
                        setToastMessage("Consolidated report exported to XLSX.");
                        setTimeout(() => setToastMessage(null), 2500);
                      }}
                      className="px-3 py-1.5 rounded-md bg-[#161922] hover:bg-[#1E222D] active:scale-[0.97] border border-[#232731] hover:border-[#F84B11]/40 text-xs font-medium text-[#EDEDED] flex items-center gap-1.5 transition-all duration-150 cursor-pointer"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Export XLSX</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-[#1F232B] rounded-lg bg-[#0A0C10]">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#1F232B] text-[#585B64] bg-[#0E1015] uppercase tracking-wider font-semibold text-[11px]">
                      <tr>
                        <th className="py-2.5 px-4 font-medium">Order ID</th>
                        <th className="py-2.5 px-4 font-medium">Account / Client</th>
                        <th className="py-2.5 px-4 font-medium">Amount</th>
                        <th className="py-2.5 px-4 font-medium">Units</th>
                        <th className="py-2.5 px-4 font-medium">Status</th>
                        <th className="py-2.5 px-4 text-right font-medium">Operational Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#171920]">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-[#141620] transition-colors duration-150 cursor-pointer">
                          <td className="py-3 px-4 tabular-nums font-semibold text-[#F84B11]">{order.id}</td>
                          <td className="py-3 px-4 font-medium text-white">{order.client}</td>
                          <td className="py-3 px-4 tabular-nums font-semibold text-[#EDEDED]">{order.total}</td>
                          <td className="py-3 px-4 text-[#94979E]">{order.items} units</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                              order.status === 'Approved' 
                                ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40' 
                                : order.status === 'In Transit'
                                ? 'bg-blue-950/40 text-blue-400 border border-blue-800/40'
                                : 'bg-[#251A15] text-[#F84B11] border border-[#F84B11]/30'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {order.status === 'Pending' ? (
                              <button
                                onClick={() => handleApproveOrder(order.id)}
                                className="px-2.5 py-1 rounded bg-[#F84B11] hover:bg-[#ff5d26] active:scale-[0.95] text-white font-medium text-[11px] transition-all duration-150 cursor-pointer shadow-sm hover:shadow-[#F84B11]/30 hover:-translate-y-0.5"
                              >
                                Approve (Instant)
                              </button>
                            ) : (
                              <span className="text-[#585B64] text-[11px] font-medium">Audited</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between text-[11px] text-[#585B64]">
                  <span>Cryptographic audit log: 4 immutable events committed</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Local database transactions synchronized
                  </span>
                </div>
              </div>
            ) : (
              <div key="admin-hub" className="animate-fade-in">
                {/* Admin Hub Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-emerald-400" />
                      <span>Server Health & Infrastructure Control (Vorsik Core Hub)</span>
                    </h3>
                    <p className="text-xs text-[#94979E] mt-0.5">Real-time visibility into local host vitals and database backups without terminal commands.</p>
                  </div>

                  <button 
                    onClick={handleTriggerBackup}
                    disabled={isBackingUp}
                    className="px-3.5 py-1.5 rounded-md bg-[#161922] hover:bg-[#1E222D] active:scale-[0.97] border border-[#2C303B] hover:border-[#F84B11]/50 text-white font-medium text-xs flex items-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isBackingUp ? 'animate-spin text-[#F84B11]' : 'text-emerald-400'}`} />
                    <span>{isBackingUp ? 'Generating Snapshot...' : 'Create Snapshot Now'}</span>
                  </button>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="p-4 rounded-lg border border-[#1F232B] bg-[#0A0C10] interactive-card cursor-pointer">
                    <div className="flex items-center justify-between text-xs text-[#94979E] mb-2 ">
                      <span>Local PostgreSQL</span>
                      <span className="text-emerald-400">1.2ms latency</span>
                    </div>
                    <div className="text-lg font-bold text-white tracking-tight">100% OPERATIONAL</div>
                    <p className="text-[11px] text-[#585B64] mt-1">Declarative migrations fully in sync</p>
                  </div>

                  <div className="p-4 rounded-lg border border-[#1F232B] bg-[#0A0C10] interactive-card cursor-pointer">
                    <div className="flex items-center justify-between text-xs text-[#94979E] mb-2 ">
                      <span>Physical Storage</span>
                      <span className="text-[#EDEDED]">18% utilized</span>
                    </div>
                    <div className="text-lg font-bold text-white tracking-tight">142 GB Available</div>
                    <p className="text-[11px] text-[#585B64] mt-1">Encrypted NVMe volume on client server</p>
                  </div>

                  <div className="p-4 rounded-lg border border-[#1F232B] bg-[#0A0C10] interactive-card cursor-pointer">
                    <div className="flex items-center justify-between text-xs text-[#94979E] mb-2 ">
                      <span>Technical Architecture</span>
                      <span className="text-[#F84B11]">OpenAPI v3</span>
                    </div>
                    <div className="text-lg font-bold text-white tracking-tight">OPEN BLUEPRINT</div>
                    <p className="text-[11px] text-[#585B64] mt-1">Transferable and auditable by third parties</p>
                  </div>
                </div>

                {/* Backups List */}
                <div className="border border-[#1F232B] rounded-lg bg-[#0A0C10] p-4">
                  <div className="flex items-center justify-between mb-3 text-xs tabular-nums font-medium text-[#585B64]">
                    <span>SCHEDULED ENCRYPTED BACKUPS (AES-256)</span>
                    <span className="text-emerald-400">Retention: 30 Days</span>
                  </div>
                  <div className="space-y-2">
                    {backups.map(b => (
                      <div key={b.id} className="flex items-center justify-between p-2.5 rounded border border-[#181A22] hover:border-[#2C303B] bg-[#0E1015] text-xs transition-colors duration-150">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="tabular-nums font-semibold text-[#EDEDED]">{b.id}</span>
                          <span className="text-[#94979E]">{b.date}</span>
                          <span className="px-1.5 py-0.2 rounded bg-[#181A22] text-[10px] text-[#94979E] font-medium">{b.type}</span>
                        </div>
                        <div className="flex items-center gap-4 tabular-nums text-xs">
                          <span className="text-[#585B64]">{b.size}</span>
                          <button 
                            onClick={() => {
                              setToastMessage(`Downloading compressed archive ${b.id}...`);
                              setTimeout(() => setToastMessage(null), 2500);
                            }}
                            className="text-[#EDEDED] hover:text-[#F84B11] active:scale-[0.95] flex items-center gap-1 transition-all duration-150 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Solutions / Real-World Archetypes Section */}
      <section id="solutions" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#1F232B]">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#F84B11] mb-2">Application Archetypes</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Engineered for High-Stakes Operational Workflows
          </h2>
          <p className="text-[#94979E] text-sm mt-3">
            We replace fragile spreadsheets and restrictive SaaS portals with tailor-made corporate operating systems.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {solutions.map((sol, idx) => {
            const Icon = sol.icon;
            const isSelected = selectedSolution === idx;
            return (
              <button
                key={sol.title}
                onClick={() => setSelectedSolution(idx)}
                className={`p-4 rounded-lg border text-left transition-all duration-200 cursor-pointer active:scale-[0.99] ${
                  isSelected 
                    ? 'border-[#F84B11] bg-[#12141A] text-white shadow-lg shadow-[#F84B11]/10' 
                    : 'border-[#1F232B] bg-[#0A0C10] text-[#94979E] hover:border-[#2C303B] hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 transition-colors duration-200 ${isSelected ? 'text-[#F84B11]' : 'text-[#585B64]'}`} />
                  <span className="text-xs font-semibold tracking-wider uppercase">USE CASE 0{idx + 1}</span>
                </div>
                <h3 className="text-sm font-semibold text-white leading-snug">{sol.title}</h3>
              </button>
            );
          })}
        </div>

        {/* Selected Solution Detail Card */}
        <div key={selectedSolution} className="p-6 sm:p-8 rounded-xl border border-[#1F232B] bg-[#0E1015] animate-fade-in shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">The SaaS & Spreadsheet Bottleneck</div>
              <p className="text-xs text-[#94979E] leading-relaxed">
                {solutions[selectedSolution].problem}
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold text-[#F84B11] uppercase tracking-wider mb-2">The Custom Vorsik System</div>
              <p className="text-xs text-[#EDEDED] leading-relaxed">
                {solutions[selectedSolution].solution}
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Demonstrated Economic Impact</div>
              <p className="text-xs text-[#94979E] leading-relaxed">
                {solutions[selectedSolution].impact}
              </p>
            </div>
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
