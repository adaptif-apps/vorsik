import { useState, useEffect, useRef } from 'react';
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
  GripVertical,
  Layers,
  Zap,
  AlertTriangle,
  FileText,
  Database,
  Search,
  Plus,
  Sun,
  Moon,
  MapPin,
  Radio,
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Barcode
} from 'lucide-react';

export default function App() {
  // Sandbox Light / Dark Theme State (Light Mode by default)
  const [sandboxTheme, setSandboxTheme] = useState<'light' | 'dark'>('light');
  const isLight = sandboxTheme === 'light';

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
  const [trackingDriverOrderId, setTrackingDriverOrderId] = useState<string | null>(null);

  // Multi-Device Responsive Kanban Simulator State
  type KanbanDevice = 'desktop' | 'laptop' | 'tablet' | 'mobile';
  const [kanbanDevice, setKanbanDevice] = useState<KanbanDevice>('desktop');
  const [activeLayoutDevice, setActiveLayoutDevice] = useState<KanbanDevice>('desktop');
  const [isDeviceTransitioning, setIsDeviceTransitioning] = useState(false);
  const deviceTransitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [kanbanTheme, setKanbanTheme] = useState<'light' | 'dark'>('light');
  const isKanbanLight = kanbanTheme === 'light';
  const [kanbanFilter, setKanbanFilter] = useState<'all' | 'critical' | 'standard'>('all');
  const [mobileActiveStage, setMobileActiveStage] = useState<'intake' | 'assembly' | 'qa' | 'dispatch'>('intake');
  const [tabletStagePair, setTabletStagePair] = useState<'production' | 'fulfillment'>('production');

  const deviceWidthMap: Record<KanbanDevice, string> = {
    desktop: '1152px',
    laptop: '1024px',
    tablet: '768px',
    mobile: '390px'
  };

  const handleSelectDevice = (device: KanbanDevice) => {
    if (device === kanbanDevice) return;

    if (deviceTransitionTimeoutRef.current) {
      clearTimeout(deviceTransitionTimeoutRef.current);
    }

    setKanbanDevice(device);

    const isLayoutStructureChange =
      (device === 'mobile' || activeLayoutDevice === 'mobile') ||
      (device === 'tablet' || activeLayoutDevice === 'tablet');

    if (isLayoutStructureChange) {
      setIsDeviceTransitioning(true);
      deviceTransitionTimeoutRef.current = setTimeout(() => {
        setActiveLayoutDevice(device);
        requestAnimationFrame(() => {
          setIsDeviceTransitioning(false);
        });
      }, 200);
    } else {
      setActiveLayoutDevice(device);
      setIsDeviceTransitioning(false);
    }
  };

  interface KanbanTask {
    id: string;
    title: string;
    stage: 'intake' | 'assembly' | 'qa' | 'dispatch';
    priority: 'Critical' | 'High' | 'Standard';
    assignee: string;
    sla: string;
    sku: string;
    progress?: { current: number; total: number };
    tag: string;
  }

  const initialKanbanTasks: KanbanTask[] = [
    {
      id: 'WO-410',
      title: 'CNC Precision Milling: 120x Hydraulic Valve Seals',
      stage: 'intake',
      priority: 'High',
      assignee: 'M. Chen',
      sla: 'Today 04:00 PM',
      sku: 'SKU-VALVE-88',
      progress: { current: 4, total: 4 },
      tag: 'Tolerances: 0.02mm'
    },
    {
      id: 'WO-414',
      title: 'Clinical Sterilization: 45x HEPA Filtration Kits',
      stage: 'intake',
      priority: 'Critical',
      assignee: 'J. Taylor',
      sla: 'Tomorrow 10:00 AM',
      sku: 'SKU-MED-HEPA',
      progress: { current: 1, total: 3 },
      tag: 'Batch Lot #994A'
    },
    {
      id: 'WO-408',
      title: 'Flange Hydro-Press: 310x Heavy Industrial Bearings',
      stage: 'assembly',
      priority: 'Standard',
      assignee: 'E. Morales',
      sla: 'Today 06:30 PM',
      sku: 'SKU-BEAR-310',
      progress: { current: 2, total: 3 },
      tag: 'Pressing Stage 2/3'
    },
    {
      id: 'WO-409',
      title: 'Digital Manifold Regulators: O-Ring Sub-Assembly',
      stage: 'assembly',
      priority: 'High',
      assignee: 'D. Ross',
      sla: 'Tomorrow 02:00 PM',
      sku: 'SKU-REG-18',
      progress: { current: 3, total: 3 },
      tag: 'Torque: 42 Nm'
    },
    {
      id: 'WO-405',
      title: 'Pressure Chamber Test: 650 PSI Rupture Hold',
      stage: 'qa',
      priority: 'Critical',
      assignee: 'R. Patel',
      sla: 'Passed (0.1ms Log)',
      sku: 'SKU-TEST-650',
      progress: { current: 5, total: 5 },
      tag: '100% Hermetic Seal'
    },
    {
      id: 'WO-406',
      title: 'Barcode Tamper Seal QA & Digital Manifest Match',
      stage: 'qa',
      priority: 'Standard',
      assignee: 'A. Vance',
      sla: 'Audit Queue',
      sku: 'SKU-TAMPER-04',
      progress: { current: 2, total: 2 },
      tag: 'Crypto-Signed'
    },
    {
      id: 'WO-402',
      title: 'Pallet Staging Dock #02: Truck #04 Regional Corridor',
      stage: 'dispatch',
      priority: 'High',
      assignee: 'Carlos R.',
      sla: 'ETA 35 mins',
      sku: 'SKU-PALLET-04',
      progress: { current: 3, total: 3 },
      tag: 'Driver Dispatched'
    },
    {
      id: 'WO-401',
      title: 'Medical Express Pack: St. Mary Surgical Clinic',
      stage: 'dispatch',
      priority: 'Critical',
      assignee: 'Courier Ex-1',
      sla: 'Delivered (Signature #8891)',
      sku: 'SKU-MED-BOX',
      progress: { current: 4, total: 4 },
      tag: 'Remito Signed'
    }
  ];

  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>(initialKanbanTasks);
  const [draggedKanbanTaskId, setDraggedKanbanTaskId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<'intake' | 'assembly' | 'qa' | 'dispatch' | null>(null);

  const handleDropKanbanTask = (targetStage: 'intake' | 'assembly' | 'qa' | 'dispatch', taskId?: string) => {
    const idToMove = taskId || draggedKanbanTaskId;
    if (!idToMove) return;

    const currentTask = kanbanTasks.find(t => t.id === idToMove);
    if (currentTask && currentTask.stage !== targetStage) {
      setKanbanTasks(prev => prev.map(t => t.id === idToMove ? { ...t, stage: targetStage } : t));
      const stageTitles: Record<'intake' | 'assembly' | 'qa' | 'dispatch', string> = {
        intake: '1. Intake & Specs',
        assembly: '2. Assembly & Pack',
        qa: '3. QA & Testing',
        dispatch: '4. Ready for Dispatch'
      };
      setToastMessage(`Task ${idToMove} moved to ${stageTitles[targetStage]} (0.1ms LAN WAL commit).`);
      setTimeout(() => setToastMessage(null), 3000);
    }

    setDraggedKanbanTaskId(null);
    setDragOverStage(null);
  };

  const handleAdvanceKanbanTask = (taskId: string) => {
    setKanbanTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      if (t.stage === 'intake') return { ...t, stage: 'assembly' };
      if (t.stage === 'assembly') return { ...t, stage: 'qa' };
      if (t.stage === 'qa') return { ...t, stage: 'dispatch' };
      return t;
    }));
    setToastMessage(`Task ${taskId} advanced to next stage (0.1ms WAL commit).`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRegressKanbanTask = (taskId: string) => {
    setKanbanTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      if (t.stage === 'dispatch') return { ...t, stage: 'qa' };
      if (t.stage === 'qa') return { ...t, stage: 'assembly' };
      if (t.stage === 'assembly') return { ...t, stage: 'intake' };
      return t;
    }));
    setToastMessage(`Task ${taskId} returned to previous stage.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleScanBarcodeSim = () => {
    setToastMessage(`Barcode Scanner Laser: Scanned SKU-BEAR-310 (Dock 2 pallet). Synced (0.1ms).`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredKanbanTasks = kanbanTasks.filter((t: KanbanTask) => {
    if (kanbanFilter === 'critical') return t.priority === 'Critical' || t.priority === 'High';
    if (kanbanFilter === 'standard') return t.priority === 'Standard';
    return true;
  });

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

  // Cleanup simulator device transition timers
  useEffect(() => {
    return () => {
      if (deviceTransitionTimeoutRef.current) {
        clearTimeout(deviceTransitionTimeoutRef.current);
      }
    };
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
            <a href="#responsive-kanban" className="hover:text-white transition-colors">Multi-Device</a>
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
                href="#responsive-kanban" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-[#161922] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Multi-Device Kanban</span>
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
      <section className="relative min-h-[calc(100svh-4rem)] flex flex-col justify-between py-6 sm:py-8 lg:py-10 xl:py-12 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden hero-viewport-section">
        {/* Ambient background glow & industrial grid accents */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[#F84B11]/8 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center justify-center flex-1 my-auto w-full">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2A2E39] bg-[#12141A]/90 text-[#94979E] text-xs font-medium tracking-wide mb-5 sm:mb-6 lg:mb-8 hero-badge-margin hover:border-[#F84B11]/40 transition-colors duration-300 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#F84B11] shrink-0 animate-pulse" />
            <span className="text-[#EDEDED] font-semibold">SOVEREIGN INDUSTRIAL SOFTWARE</span>
            <span className="text-[#585B64]">•</span>
            <span className="font-mono text-emerald-400 font-semibold">100% CAPITAL ASSET</span>
            <button 
              onClick={handleReplayBuild}
              className="ml-1 pl-2 border-l border-[#2A2E39] text-[#F84B11] hover:text-[#ff7444] text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
              title="Replay Build Crew interactive animation"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Replay Build</span>
            </button>
          </div>

          {/* Main Headline */}
          <h1 data-build="" className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-4 sm:mb-5 lg:mb-6 hero-headline">
            Your company's software <br className="hidden sm:inline" />
            should belong to you. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F84B11] via-[#ff7444] to-[#ffab91]">
              Not be rented.
            </span>
          </h1>

          {/* Subtitle */}
          <p data-build="fade" className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-[#94979E] leading-relaxed mb-6 sm:mb-7 lg:mb-8 font-normal hero-subtitle">
            We architect bespoke operational operating systems for factories, distributors, and logistics operations. Deployed on your local physical servers or private cloud as a capitalized corporate software asset—with zero per-user SaaS subscriptions, sub-millisecond local speed, and complete data sovereignty.
          </p>

          {/* Call to Actions */}
          <div data-build="pop" className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 w-full sm:w-auto">
            <button 
              onClick={handleOpenModal}
              className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-md bg-[#F84B11] hover:bg-[#ff5d26] active:scale-[0.98] text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-[#F84B11]/25 hover:shadow-[#F84B11]/40 hover:-translate-y-0.5 cursor-pointer hero-cta-btn"
            >
              <span>Scope Your Custom Software</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a 
              href="#transformation"
              className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-md border border-[#232731] bg-[#101217] hover:bg-[#161922] active:scale-[0.98] text-[#EDEDED] font-medium text-xs tracking-tight transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer hero-cta-btn"
            >
              <Zap className="w-3.5 h-3.5 text-[#F84B11]" />
              <span>See Interactive Transformation</span>
            </a>
          </div>

          {/* Trust Value Signals */}
          <div data-build="fade" className="flex flex-wrap items-center justify-center gap-y-1.5 gap-x-5 sm:gap-x-6 text-xs text-[#94979E] mb-6 sm:mb-8 lg:mb-10 hero-trust-margin">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>One-time capital software asset</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>100% full source ownership</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Zero cloud latency or lock-in</span>
            </div>
          </div>

        </div>

        {/* 4 Architectural Fact Blocks */}
        <div data-build="fade" className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4 border-t border-[#1F232B] pt-4 sm:pt-6 lg:pt-8 w-full max-w-6xl mx-auto hero-fact-grid">
          <div className="p-3 sm:p-4 rounded-xl border border-[#1E222A] bg-[#0E1015] hover:border-[#F84B11]/40 transition-all duration-200 cursor-default group hero-fact-card">
            <div className="flex items-center gap-2 text-[#F84B11] mb-1.5">
              <Server className="w-4 h-4 shrink-0" />
              <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#7A7E89]">Deployment</div>
            </div>
            <div className="text-xs sm:text-sm lg:text-base font-bold text-white group-hover:text-[#F84B11] transition-colors">100% On-Premise</div>
            <p className="text-[11px] sm:text-xs text-[#94979E] mt-1 leading-relaxed hero-fact-desc">Installed on your physical hardware or private corporate cloud</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl border border-[#1E222A] bg-[#0E1015] hover:border-emerald-500/40 transition-all duration-200 cursor-default group hero-fact-card">
            <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
              <Building2 className="w-4 h-4 shrink-0" />
              <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#7A7E89]">Financial Model</div>
            </div>
            <div className="text-xs sm:text-sm lg:text-base font-bold text-white group-hover:text-emerald-400 transition-colors">Capitalized Asset</div>
            <p className="text-[11px] sm:text-xs text-[#94979E] mt-1 leading-relaxed hero-fact-desc">Zero recurring per-user monthly seat tax. Owned forever</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl border border-[#1E222A] bg-[#0E1015] hover:border-blue-500/40 transition-all duration-200 cursor-default group hero-fact-card">
            <div className="flex items-center gap-2 text-blue-400 mb-1.5">
              <Code2 className="w-4 h-4 shrink-0" />
              <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#7A7E89]">Intellectual Property</div>
            </div>
            <div className="text-xs sm:text-sm lg:text-base font-bold text-white group-hover:text-blue-400 transition-colors">100% Owned Code</div>
            <p className="text-[11px] sm:text-xs text-[#94979E] mt-1 leading-relaxed hero-fact-desc">Full source code delivered, documented, zero vendor lock-in</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl border border-[#1E222A] bg-[#0E1015] hover:border-amber-500/40 transition-all duration-200 cursor-default group hero-fact-card">
            <div className="flex items-center gap-2 text-amber-400 mb-1.5">
              <Zap className="w-4 h-4 shrink-0" />
              <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#7A7E89]">Response Time</div>
            </div>
            <div className="text-xs sm:text-sm lg:text-base font-bold text-white group-hover:text-amber-400 transition-colors">&lt; 0.2ms Perceived</div>
            <p className="text-[11px] sm:text-xs text-[#94979E] mt-1 leading-relaxed hero-fact-desc">Instantaneous local reactive memory, zero loading spinners</p>
          </div>
        </div>

      </section>

      {/* Scroll anchors for navigation compatibility */}
      <div id="demo" className="scroll-mt-24"></div>
      <div id="solutions" className="scroll-mt-24"></div>

      {/* Unified Interactive Transformation Showroom */}
      <section id="transformation" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#1F232B]">
        
        {/* Section Header */}
        <div className="mb-8 max-w-3xl">
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

          {/* Workflow Transformation Toggle (Before / After) */}
          <div className="mt-6 inline-flex p-1 rounded-lg border border-[#262A36] bg-[#12141A] text-xs font-semibold shadow-md">
            <button
              onClick={() => setTransformationMode('spreadsheet')}
              className={`px-3.5 py-2 rounded-md border transition-colors duration-150 flex items-center gap-2 cursor-pointer whitespace-nowrap focus:outline-none ${
                transformationMode === 'spreadsheet'
                  ? 'border-[#303644] bg-[#1E222B] text-white shadow-sm'
                  : 'border-transparent text-[#94979E] hover:text-white hover:bg-[#181A22]'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 shrink-0 text-amber-400" />
              <span className="hidden sm:inline">1. Messy Spreadsheet (Before)</span>
              <span className="sm:hidden inline">1. Spreadsheet</span>
            </button>

            <button
              onClick={handleStartTransformation}
              className={`px-3.5 py-2 rounded-md border transition-colors duration-150 flex items-center gap-2 cursor-pointer whitespace-nowrap focus:outline-none ${
                transformationMode === 'vorsik'
                  ? 'border-[#F84B11] bg-[#F84B11] text-white shadow-md shadow-[#F84B11]/25'
                  : 'border-transparent text-[#F84B11] hover:text-[#ff7444] hover:bg-[#F84B11]/10'
              }`}
            >
              <Zap className="w-4 h-4 fill-current shrink-0" />
              <span className="hidden sm:inline">2. Vorsik Custom OS (After)</span>
              <span className="sm:hidden inline">2. Vorsik OS</span>
            </button>
          </div>
        </div>

        {/* Showroom Interactive Shell */}
        <div className={`rounded-xl border shadow-2xl overflow-hidden transition-all duration-300 flex flex-col ${
          transformationMode === 'vorsik' ? 'lg:h-[700px] lg:max-h-[700px]' : ''
        } ${
          isLight 
            ? 'border-slate-300/90 bg-white shadow-2xl shadow-black/30 ring-1 ring-slate-900/5' 
            : 'border-[#20232B] bg-[#0E1015] shadow-2xl'
        }`}>
          
          {/* Workstation Frame Header */}
          <div className={`border-b px-3 sm:px-4 min-h-[48px] sm:min-h-[52px] py-2 sm:py-0 flex items-center justify-between gap-3 transition-colors shrink-0 ${
            isLight 
              ? 'border-slate-200 bg-slate-100/95' 
              : 'border-[#1F232B] bg-[#0A0C10]'
          }`}>
            
            {/* Window Controls & State Protocol */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center gap-1.5 shrink-0">
                <div className={`w-2.5 h-2.5 rounded-full transition-colors ${isLight ? 'bg-[#FF5F56]' : 'bg-[#2A2E39]'}`} />
                <div className={`w-2.5 h-2.5 rounded-full transition-colors ${isLight ? 'bg-[#FFBD2E]' : 'bg-[#2A2E39]'}`} />
                <div className={`w-2.5 h-2.5 rounded-full transition-colors ${isLight ? 'bg-[#27C93F]' : 'bg-[#2A2E39]'}`} />
              </div>
              <span className={`ml-1.5 sm:ml-2 font-mono text-xs truncate transition-colors ${
                isLight ? 'text-slate-600 font-medium' : 'text-[#717684]'
              }`}>
                {transformationMode === 'spreadsheet' 
                  ? 'orders_master.xlsx (Manual)' 
                  : 'vorsik-os://orders (Automated)'}
              </span>
            </div>

            {/* Sandbox Theme Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <div className={`inline-flex p-0.5 rounded-lg border text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                isLight ? 'bg-slate-200/90 border-slate-300' : 'bg-[#14161D] border-[#20232B]'
              }`}>
                <button
                  type="button"
                  onClick={() => setSandboxTheme('light')}
                  className={`px-2 py-1 rounded-md border transition-colors duration-150 flex items-center gap-1.5 cursor-pointer focus:outline-none ${
                    isLight
                      ? 'border-transparent bg-white text-slate-900 shadow-xs font-semibold'
                      : 'border-transparent text-[#717684] hover:text-white font-medium'
                  }`}
                  title="Light mode (Default)"
                  aria-label="Light mode"
                >
                  <Sun className={`w-3.5 h-3.5 ${isLight ? 'text-amber-500 fill-amber-500/20' : 'text-slate-400'}`} />
                  <span className="hidden sm:inline text-[11px]">Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSandboxTheme('dark')}
                  className={`px-2 py-1 rounded-md border transition-colors duration-150 flex items-center gap-1.5 cursor-pointer focus:outline-none ${
                    !isLight
                      ? 'border-transparent bg-[#1E2129] text-white shadow-xs font-semibold'
                      : 'border-transparent text-slate-500 hover:text-slate-900 font-medium'
                  }`}
                  title="Dark mode"
                  aria-label="Dark mode"
                >
                  <Moon className={`w-3.5 h-3.5 ${!isLight ? 'text-blue-400 fill-blue-400/20' : 'text-slate-500'}`} />
                  <span className="hidden sm:inline text-[11px]">Dark</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Screen Content Canvas */}
          <div className={`relative flex-1 min-h-0 transition-colors duration-200 ${
            transformationMode === 'vorsik' 
              ? 'overflow-y-auto lg:overflow-hidden flex flex-col p-3 sm:p-3.5 lg:p-3.5' 
              : 'min-h-[520px] p-4 sm:p-6'
          } ${
            isLight ? 'bg-[#F8FAFC]' : 'bg-[#0B0D12]'
          }`}>

            {/* VIEW 1: THE MESSY SPREADSHEET (BEFORE) */}
            {transformationMode === 'spreadsheet' && (
              <div className="space-y-4 animate-fade-in">
                
                {/* Spreadsheet Alert Ribbon */}
                <div className={`p-3.5 sm:p-4 rounded-lg border flex items-start gap-3 transition-colors ${
                  isLight
                    ? 'bg-amber-50/90 border-amber-300/80 shadow-xs'
                    : 'bg-[#18130B] border-amber-500/30'
                }`}>
                  <div className={`p-2 rounded border shrink-0 ${
                    isLight
                      ? 'bg-amber-100 border-amber-300 text-amber-700'
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-bold ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
                        Sync Conflicts & Formula Breakage Detected
                      </span>
                      <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] border ${
                        isLight
                          ? 'bg-red-100 text-red-700 border-red-300 font-semibold'
                          : 'bg-red-950 text-red-400 border-red-800/40'
                      }`}>
                        2 Cells Corrupted
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 ${isLight ? 'text-amber-800' : 'text-amber-200/80'}`}>
                      Formula dependencies broke when Column D was deleted. Multiple users editing via shared folder without role permissions.
                    </p>
                  </div>
                </div>

                {/* Formula Bar Simulation */}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono transition-colors ${
                  isLight
                    ? 'border-slate-300 bg-white text-slate-700 shadow-xs'
                    : 'border-[#1F232B] bg-[#0E1015] text-[#94979E]'
                }`}>
                  <span className={`font-semibold ${isLight ? 'text-slate-400' : 'text-[#585B64]'}`}>fx</span>
                  <div className={`w-px h-3.5 ${isLight ? 'bg-slate-200' : 'bg-[#20232B]'}`} />
                  <span className={`truncate ${isLight ? 'text-amber-700 font-semibold' : 'text-amber-300'}`}>
                    =IFERROR(VLOOKUP(C14, 'Precios_2024'!$A$2:$F$500, 4, FALSE) * G14, "#REF!")
                  </span>
                </div>

                {/* Spreadsheet Raw Grid Table */}
                <div className={`overflow-x-auto border rounded-lg transition-colors ${
                  isLight
                    ? 'border-slate-300 bg-white shadow-xs sandbox-light-scroll'
                    : 'border-[#1F232B] bg-[#08090C]'
                }`}>
                  <table className="w-full text-left text-xs border-collapse min-w-[880px]">
                    <thead className={`border-b font-mono text-[11px] whitespace-nowrap transition-colors ${
                      isLight
                        ? 'border-slate-300 bg-slate-100 text-slate-600'
                        : 'border-[#1F232B] bg-[#0E1015] text-[#585B64]'
                    }`}>
                      <tr>
                        <th className={`py-2 px-3 border-r w-8 text-center whitespace-nowrap ${
                          isLight ? 'border-slate-300 bg-slate-200/70 text-slate-600 font-semibold' : 'border-[#1F232B] bg-[#0A0C10]'
                        }`}>#</th>
                        <th className={`py-2 px-3 border-r font-semibold whitespace-nowrap ${isLight ? 'border-slate-300' : 'border-[#1F232B]'}`}>A: Order ID</th>
                        <th className={`py-2 px-3 border-r font-semibold whitespace-nowrap ${isLight ? 'border-slate-300' : 'border-[#1F232B]'}`}>B: Account / Client</th>
                        <th className={`py-2 px-3 border-r font-semibold whitespace-nowrap ${isLight ? 'border-slate-300' : 'border-[#1F232B]'}`}>C: SKU Breakdown</th>
                        <th className={`py-2 px-3 border-r font-semibold whitespace-nowrap ${isLight ? 'border-slate-300' : 'border-[#1F232B]'}`}>D: Net Total</th>
                        <th className={`py-2 px-3 border-r font-semibold whitespace-nowrap ${isLight ? 'border-slate-300' : 'border-[#1F232B]'}`}>E: Payment Status</th>
                        <th className={`py-2 px-3 border-r font-semibold whitespace-nowrap ${isLight ? 'border-slate-300' : 'border-[#1F232B]'}`}>F: Delivery SLA</th>
                        <th className={`py-2 px-3 font-semibold whitespace-nowrap ${isLight ? 'text-amber-800' : 'text-amber-400/90'}`}>G: Internal Notes (WhatsApp / Post-its)</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y font-sans whitespace-nowrap transition-colors ${
                      isLight ? 'divide-slate-200 text-slate-700' : 'divide-[#171920]'
                    }`}>
                      <tr className={`transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-[#101218]'}`}>
                        <td className={`py-2.5 px-3 border-r font-mono text-[11px] text-center ${
                          isLight ? 'border-slate-300 text-slate-500 bg-slate-50 font-medium' : 'border-[#1F232B] text-[#585B64] bg-[#0A0C10]'
                        }`}>2</td>
                        <td className={`py-2.5 px-3 border-r font-mono font-medium ${isLight ? 'border-slate-300 text-slate-900' : 'border-[#1F232B] text-white'}`}>ORD-8942</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-800 font-medium' : 'border-[#1F232B] text-white'}`}>Northern Distribution Logistics Inc.</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-600' : 'border-[#1F232B] text-[#94979E]'}`}>120x Hyd-Valve Seals</td>
                        <td className={`py-2.5 px-3 border-r tabular-nums font-semibold ${isLight ? 'border-slate-300 text-slate-900' : 'border-[#1F232B] text-[#EDEDED]'}`}>$14,250.00</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300' : 'border-[#1F232B]'}`}>
                          <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] border ${
                            isLight
                              ? 'bg-amber-100 border-amber-300 text-amber-800 font-semibold'
                              : 'bg-amber-950/70 border-amber-600/40 text-amber-300'
                          }`}>
                            PENDING ⚠️
                          </span>
                        </td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-600' : 'border-[#1F232B] text-[#94979E]'}`}>Today 04:00 PM</td>
                        <td className={`py-2.5 px-3 text-[11px] ${
                          isLight ? 'text-amber-900 bg-amber-50 font-medium' : 'text-amber-300/90 bg-amber-950/20'
                        }`}>
                          ⚠️ Cheque rebotó en banco - avisar a finanzas urgente
                        </td>
                      </tr>

                      <tr className={`transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-[#101218]'}`}>
                        <td className={`py-2.5 px-3 border-r font-mono text-[11px] text-center ${
                          isLight ? 'border-slate-300 text-slate-500 bg-slate-50 font-medium' : 'border-[#1F232B] text-[#585B64] bg-[#0A0C10]'
                        }`}>3</td>
                        <td className={`py-2.5 px-3 border-r font-mono font-medium ${isLight ? 'border-slate-300 text-slate-900' : 'border-[#1F232B] text-white'}`}>ORD-8941</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-800 font-medium' : 'border-[#1F232B] text-white'}`}>St. Mary Surgical Center</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-600' : 'border-[#1F232B] text-[#94979E]'}`}>45x HEPA Filters</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 bg-red-50/80' : 'border-[#1F232B] bg-red-950/40'}`}>
                          <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] border ${
                            isLight ? 'bg-red-100 text-red-700 border-red-300' : 'bg-red-900/60 text-red-300 border-red-700/50'
                          }`}>
                            #VALUE!
                          </span>
                        </td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300' : 'border-[#1F232B]'}`}>
                          <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] border ${
                            isLight
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-semibold'
                              : 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400'
                          }`}>
                            PAID
                          </span>
                        </td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-600' : 'border-[#1F232B] text-[#94979E]'}`}>Tomorrow 10:00 AM</td>
                        <td className={`py-2.5 px-3 text-[11px] ${isLight ? 'text-slate-500' : 'text-[#7E8390]'}`}>
                          Factura hecha a mano en PDF viejo (sin numeración fiscal)
                        </td>
                      </tr>

                      <tr className={`transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-[#101218]'}`}>
                        <td className={`py-2.5 px-3 border-r font-mono text-[11px] text-center ${
                          isLight ? 'border-slate-300 text-slate-500 bg-slate-50 font-medium' : 'border-[#1F232B] text-[#585B64] bg-[#0A0C10]'
                        }`}>4</td>
                        <td className={`py-2.5 px-3 border-r font-mono font-medium ${isLight ? 'border-slate-300 text-slate-900' : 'border-[#1F232B] text-white'}`}>ORD-8940</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-800 font-medium' : 'border-[#1F232B] text-white'}`}>Pacific Heavy Contracting LLC</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-600' : 'border-[#1F232B] text-[#94979E]'}`}>310x Heavy Bearings</td>
                        <td className={`py-2.5 px-3 border-r tabular-nums font-semibold ${isLight ? 'border-slate-300 text-slate-900' : 'border-[#1F232B] text-[#EDEDED]'}`}>$28,400.00</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300' : 'border-[#1F232B]'}`}>
                          <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] border ${
                            isLight
                              ? 'bg-blue-100 border-blue-300 text-blue-800 font-semibold'
                              : 'bg-blue-950/40 border-blue-800/40 text-blue-400'
                          }`}>
                            IN TRANSIT
                          </span>
                        </td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 bg-red-50/80' : 'border-[#1F232B] bg-red-950/40'}`}>
                          <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] border ${
                            isLight ? 'bg-red-100 text-red-700 border-red-300' : 'bg-red-900/60 text-red-300 border-red-700/50'
                          }`}>
                            #REF!
                          </span>
                        </td>
                        <td className={`py-2.5 px-3 text-[11px] ${isLight ? 'text-slate-500' : 'text-[#7E8390]'}`}>
                          Chofer mandó foto de remito arrugado por chat de WhatsApp
                        </td>
                      </tr>

                      <tr className={`transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-[#101218]'}`}>
                        <td className={`py-2.5 px-3 border-r font-mono text-[11px] text-center ${
                          isLight ? 'border-slate-300 text-slate-500 bg-slate-50 font-medium' : 'border-[#1F232B] text-[#585B64] bg-[#0A0C10]'
                        }`}>5</td>
                        <td className={`py-2.5 px-3 border-r font-mono font-medium ${isLight ? 'border-slate-300 text-slate-900' : 'border-[#1F232B] text-white'}`}>ORD-8939</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-800 font-medium' : 'border-[#1F232B] text-white'}`}>Apex Commercial Systems Corp.</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-600' : 'border-[#1F232B] text-[#94979E]'}`}>18x Regulators</td>
                        <td className={`py-2.5 px-3 border-r tabular-nums font-semibold ${isLight ? 'border-slate-300 text-slate-900' : 'border-[#1F232B] text-[#EDEDED]'}`}>$4,120.00</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300' : 'border-[#1F232B]'}`}>
                          <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] border ${
                            isLight
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-semibold'
                              : 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400'
                          }`}>
                            PAID
                          </span>
                        </td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-600' : 'border-[#1F232B] text-[#94979E]'}`}>Delivered</td>
                        <td className={`py-2.5 px-3 text-[11px] ${
                          isLight ? 'text-amber-900 bg-amber-50 font-medium' : 'text-amber-300/90 bg-amber-950/20'
                        }`}>
                          ¿Quién autorizó este 15% de descuento sin firmar?
                        </td>
                      </tr>

                      <tr className={`transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-[#101218]'}`}>
                        <td className={`py-2.5 px-3 border-r font-mono text-[11px] text-center ${
                          isLight ? 'border-slate-300 text-slate-500 bg-slate-50 font-medium' : 'border-[#1F232B] text-[#585B64] bg-[#0A0C10]'
                        }`}>6</td>
                        <td className={`py-2.5 px-3 border-r font-mono font-medium ${isLight ? 'border-slate-300 text-slate-900' : 'border-[#1F232B] text-white'}`}>ORD-8938</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-800 font-medium' : 'border-[#1F232B] text-white'}`}>Vanguard Manufacturing Supply</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-600' : 'border-[#1F232B] text-[#94979E]'}`}>90x Quick Couplings</td>
                        <td className={`py-2.5 px-3 border-r tabular-nums font-semibold ${isLight ? 'border-slate-300 text-slate-900' : 'border-[#1F232B] text-[#EDEDED]'}`}>$8,950.00</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300' : 'border-[#1F232B]'}`}>
                          <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] border ${
                            isLight
                              ? 'bg-amber-100 border-amber-300 text-amber-800 font-semibold'
                              : 'bg-amber-950/70 border-amber-600/40 text-amber-300'
                          }`}>
                            PENDING ⚠️
                          </span>
                        </td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-600' : 'border-[#1F232B] text-[#94979E]'}`}>Tomorrow 02:00 PM</td>
                        <td className={`py-2.5 px-3 text-[11px] ${
                          isLight ? 'text-red-800 bg-red-50 font-medium' : 'text-red-300 bg-red-950/20'
                        }`}>
                          Bodega dice que faltan 12 unidades físicas en estante B
                        </td>
                      </tr>

                      <tr className={`transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-[#101218]'}`}>
                        <td className={`py-2.5 px-3 border-r font-mono text-[11px] text-center ${
                          isLight ? 'border-slate-300 text-slate-500 bg-slate-50 font-medium' : 'border-[#1F232B] text-[#585B64] bg-[#0A0C10]'
                        }`}>7</td>
                        <td className={`py-2.5 px-3 border-r font-mono font-medium ${isLight ? 'border-slate-300 text-slate-900' : 'border-[#1F232B] text-white'}`}>ORD-8937</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-800 font-medium' : 'border-[#1F232B] text-white'}`}>Cascade Industrial Works LLC</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-600' : 'border-[#1F232B] text-[#94979E]'}`}>240x Steel Flanges</td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 bg-red-50/80' : 'border-[#1F232B] bg-red-950/40'}`}>
                          <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] border ${
                            isLight ? 'bg-red-100 text-red-700 border-red-300' : 'bg-red-900/60 text-red-300 border-red-700/50'
                          }`}>
                            #REF!
                          </span>
                        </td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300' : 'border-[#1F232B]'}`}>
                          <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] border ${
                            isLight
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-semibold'
                              : 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400'
                          }`}>
                            PAID
                          </span>
                        </td>
                        <td className={`py-2.5 px-3 border-r ${isLight ? 'border-slate-300 text-slate-600' : 'border-[#1F232B] text-[#94979E]'}`}>Delivered</td>
                        <td className={`py-2.5 px-3 text-[11px] ${isLight ? 'text-slate-500' : 'text-[#7E8390]'}`}>
                          No tocar esta celda - rompe la fórmula de totalización general
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Spreadsheet Summary Warnings Bar */}
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1 ${
                  isLight ? 'text-slate-600' : 'text-[#717684]'
                }`}>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className={`font-bold ${isLight ? 'text-red-600' : 'text-red-400'}`}>SUM(D2:D7) = #REF!</span>
                    <span>(Corrupted calculation: team cannot verify weekly billing volume)</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className={isLight ? 'text-amber-700 font-medium' : 'text-amber-400'}>● 0 Role-based permissions</span>
                    <span className={isLight ? 'text-red-600 font-medium' : 'text-red-400'}>● Zero immutable audit trail</span>
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 2: VORSIK CUSTOM OPERATING SYSTEM (AFTER) */}
            {transformationMode === 'vorsik' && (
              <div className="flex-1 min-h-0 flex flex-col space-y-2 sm:space-y-2.5 animate-fade-in">
                
                {/* Mode Sub-Navigation: Cards (Default) vs Table */}
                <div className={`shrink-0 flex items-center justify-between gap-3 pb-2 border-b flex-nowrap overflow-x-auto ${
                  isLight ? 'border-slate-200' : 'border-[#1A1D24]'
                }`}>
                  <div className={`inline-flex p-0.5 rounded-lg border text-xs font-medium whitespace-nowrap shrink-0 ${
                    isLight ? 'bg-slate-200/80 border-slate-300' : 'bg-[#14161D] border-[#20232B]'
                  }`}>
                    <button
                      onClick={() => setVorsikSubView('cards')}
                      className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        vorsikSubView === 'cards'
                          ? isLight
                            ? 'bg-white text-slate-900 shadow-sm font-semibold'
                            : 'bg-[#1E2129] text-white shadow-sm font-semibold'
                          : isLight
                            ? 'text-slate-600 hover:text-slate-900'
                            : 'text-[#717684] hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 text-[#F84B11] shrink-0" />
                      <span className="hidden sm:inline">1. Visual Cards & Pipeline (Default)</span>
                      <span className="sm:hidden inline">1. Cards (Default)</span>
                    </button>
                    <button
                      onClick={() => setVorsikSubView('table')}
                      className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        vorsikSubView === 'table'
                          ? isLight
                            ? 'bg-white text-slate-900 shadow-sm font-semibold'
                            : 'bg-[#1E2129] text-white shadow-sm font-semibold'
                          : isLight
                            ? 'text-slate-600 hover:text-slate-900'
                            : 'text-[#717684] hover:text-white'
                      }`}
                    >
                      <FileSpreadsheet className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                      <span className="hidden sm:inline">2. High-Density Table View</span>
                      <span className="sm:hidden inline">2. Table View</span>
                    </button>
                  </div>

                  <div className={`text-xs flex items-center gap-2 whitespace-nowrap shrink-0 ${
                    isLight ? 'text-slate-600 font-medium' : 'text-[#717684]'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="hidden md:inline">0.2ms Perceived • ACID Local SQLite / PostgreSQL</span>
                    <span className="md:hidden inline">0.2ms Perceived</span>
                  </div>
                </div>

                {/* Real-Time KPIs Top Bar (Targeted by BuildCrew) */}
                <div data-build-showroom className="shrink-0 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
                  <div className={`p-2 sm:p-2.5 rounded-lg border transition-colors ${
                    isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-[#1F232B] bg-[#0E1015]'
                  }`}>
                    <div className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-0.5 ${
                      isLight ? 'text-slate-500 font-medium' : 'text-[#717684]'
                    }`}>Pending Approval</div>
                    <div className={`text-xs sm:text-sm font-bold tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>2 Orders</div>
                    <p className={`text-[10px] sm:text-[11px] mt-0.5 ${isLight ? 'text-amber-700 font-medium' : 'text-amber-400'}`}>$23,200 USD in queue</p>
                  </div>

                  <div className={`p-2 sm:p-2.5 rounded-lg border transition-colors ${
                    isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-[#1F232B] bg-[#0E1015]'
                  }`}>
                    <div className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-0.5 ${
                      isLight ? 'text-slate-500 font-medium' : 'text-[#717684]'
                    }`}>Active In Transit</div>
                    <div className={`text-xs sm:text-sm font-bold tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>1 Shipment</div>
                    <p className={`text-[10px] sm:text-[11px] mt-0.5 ${isLight ? 'text-blue-700 font-medium' : 'text-blue-400'}`}>Truck #04 ETA 35 mins</p>
                  </div>

                  <div className={`p-2 sm:p-2.5 rounded-lg border transition-colors ${
                    isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-[#1F232B] bg-[#0E1015]'
                  }`}>
                    <div className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-0.5 ${
                      isLight ? 'text-slate-500 font-medium' : 'text-[#717684]'
                    }`}>Collected Volume</div>
                    <div className={`text-xs sm:text-sm font-bold tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>$65,060 USD</div>
                    <p className={`text-[10px] sm:text-[11px] mt-0.5 ${isLight ? 'text-emerald-700 font-medium' : 'text-emerald-400'}`}>100% Reconciled</p>
                  </div>

                  <div className={`p-2 sm:p-2.5 rounded-lg border transition-colors ${
                    isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-[#1F232B] bg-[#0E1015]'
                  }`}>
                    <div className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-0.5 ${
                      isLight ? 'text-slate-500 font-medium' : 'text-[#717684]'
                    }`}>System Latency</div>
                    <div className={`text-xs sm:text-sm font-bold tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>0.2ms Perceived</div>
                    <p className={`text-[10px] sm:text-[11px] mt-0.5 ${isLight ? 'text-emerald-700 font-medium' : 'text-emerald-400'}`}>Local NVMe on LAN</p>
                  </div>
                </div>

                {/* SUBVIEW A: VISUAL CARDS & PIPELINE (DEFAULT) */}
                {vorsikSubView === 'cards' ? (
                  <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2.5 lg:gap-3">
                    
                    {/* Pipeline Columns Container (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col min-h-0 gap-2.5">
                      
                      {/* Stage 1: Needs Approval */}
                      <div data-build-showroom className={`flex-1 min-h-0 flex flex-col p-2.5 sm:p-3 rounded-xl border transition-colors ${
                        isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-[#232731] bg-[#0E1015]'
                      }`}>
                        <div className={`flex items-center justify-between pb-1.5 border-b shrink-0 ${
                          isLight ? 'border-slate-100' : 'border-[#1A1D24]'
                        }`}>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className={`w-2 h-2 rounded-full ${isLight ? 'bg-amber-500' : 'bg-amber-400'}`} />
                            <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                              Stage 1: Needs Approval
                            </span>
                            <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] border ${
                              isLight
                                ? 'bg-amber-100 text-amber-800 border-amber-300 font-semibold'
                                : 'bg-amber-950/80 text-amber-300 border-amber-800/40'
                            }`}>
                              {b2bOrders.filter(o => o.status === 'Pending Approval').length} Orders
                            </span>
                          </div>
                          <span className={`text-[11px] font-semibold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>$23,200 USD</span>
                        </div>

                        {/* Cards container: scrolls locally ONLY if new orders exceed the container */}
                        <div className={`flex-1 min-h-0 overflow-y-auto pr-1 space-y-2 mt-2 ${isLight ? 'sandbox-light-scroll' : ''}`}>
                          {b2bOrders.filter(o => o.status === 'Pending Approval').map(order => (
                            <div
                              key={order.id}
                              onClick={() => {
                                setSelectedOrderId(order.id);
                                setTrackingDriverOrderId(null);
                              }}
                              className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                                selectedOrderId === order.id
                                  ? isLight
                                    ? 'border-[#F84B11] bg-orange-50/60 shadow-sm ring-1 ring-[#F84B11]/30'
                                    : 'border-[#F84B11] bg-[#141620] shadow-sm shadow-[#F84B11]/10'
                                  : isLight
                                    ? 'border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-100/70'
                                    : 'border-[#1E222A] bg-[#0A0C10] hover:border-[#2C303B]'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div>
                                  <span className="font-mono text-xs font-semibold text-[#F84B11] mr-1.5">{order.id}</span>
                                  <span className={`font-semibold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>{order.client}</span>
                                </div>
                                <span className={`tabular-nums font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>{order.total}</span>
                              </div>

                              <p className={`text-[11px] mb-2 truncate ${isLight ? 'text-slate-600' : 'text-[#94979E]'}`}>{order.items}</p>

                              <div className="flex items-center justify-between text-[11px]">
                                <span className={`flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-[#717684]'}`}>
                                  <Clock3 className={`w-3 h-3 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
                                  <span>SLA: {order.sla}</span>
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleApproveB2BOrder(order.id);
                                  }}
                                  className="px-2 py-0.5 rounded bg-[#F84B11] hover:bg-[#ff5d26] active:scale-[0.95] text-white font-medium text-[11px] transition-all flex items-center gap-1 shadow-xs cursor-pointer"
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
                      <div data-build-showroom className={`flex-1 min-h-0 flex flex-col p-2.5 sm:p-3 rounded-xl border transition-colors ${
                        isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-[#232731] bg-[#0E1015]'
                      }`}>
                        <div className={`flex items-center justify-between pb-1.5 border-b shrink-0 ${
                          isLight ? 'border-slate-100' : 'border-[#1A1D24]'
                        }`}>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className={`w-2 h-2 rounded-full ${isLight ? 'bg-blue-500' : 'bg-blue-400'}`} />
                            <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                              Stage 2: In Transit / Fulfillment
                            </span>
                            <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] border ${
                              isLight
                                ? 'bg-blue-100 text-blue-800 border-blue-300 font-semibold'
                                : 'bg-blue-950/80 text-blue-300 border-blue-800/40'
                            }`}>
                              {b2bOrders.filter(o => o.status === 'In Transit').length} En Route
                            </span>
                          </div>
                          <span className={`text-[11px] font-semibold ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>$28,400 USD</span>
                        </div>

                        {/* Cards container: scrolls locally ONLY if new orders exceed the container */}
                        <div className={`flex-1 min-h-0 overflow-y-auto pr-1 space-y-2 mt-2 ${isLight ? 'sandbox-light-scroll' : ''}`}>
                          {b2bOrders.filter(o => o.status === 'In Transit').map(order => (
                            <div
                              key={order.id}
                              onClick={() => setSelectedOrderId(order.id)}
                              className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                                selectedOrderId === order.id
                                  ? isLight
                                    ? 'border-[#F84B11] bg-orange-50/60 shadow-sm ring-1 ring-[#F84B11]/30'
                                    : 'border-[#F84B11] bg-[#141620] shadow-sm shadow-[#F84B11]/10'
                                  : isLight
                                    ? 'border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-100/70'
                                    : 'border-[#1E222A] bg-[#0A0C10] hover:border-[#2C303B]'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div>
                                  <span className="font-mono text-xs font-semibold text-[#F84B11] mr-1.5">{order.id}</span>
                                  <span className={`font-semibold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>{order.client}</span>
                                </div>
                                <span className={`tabular-nums font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>{order.total}</span>
                              </div>

                              <p className={`text-[11px] mb-1.5 truncate ${isLight ? 'text-slate-600' : 'text-[#94979E]'}`}>{order.items}</p>

                              {/* Visual Route Progress */}
                              <div className={`p-2 rounded border mb-2 transition-colors ${
                                isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#12141C] border-[#1C2028]'
                              }`}>
                                <div className="flex items-center justify-between text-[10px] mb-1">
                                  <span className={`font-medium ${isLight ? 'text-slate-900' : 'text-white'}`}>Truck #04 • Regional Corridor</span>
                                  <span className={`font-semibold ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>68% Dispatched</span>
                                </div>
                                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-[#1C2028]'}`}>
                                  <div className="bg-blue-500 h-full w-[68%] rounded-full" />
                                </div>
                                <div className={`flex items-center justify-between text-[10px] mt-1 ${isLight ? 'text-slate-500' : 'text-[#717684]'}`}>
                                  <span>Waypoint: Highway Interlink 4</span>
                                  <span className={`font-medium ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>ETA 35 mins</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-[11px]">
                                <span className={`text-[10px] truncate max-w-[170px] ${isLight ? 'text-slate-500' : 'text-[#717684]'}`}>{order.notes}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedOrderId(order.id);
                                    setTrackingDriverOrderId(order.id);
                                    setToastMessage(`Tracking Truck #04 • Regional Corridor GPS telemetry online (0.1ms).`);
                                    setTimeout(() => setToastMessage(null), 3000);
                                  }}
                                  className={`px-2 py-0.5 rounded border font-medium text-[11px] transition-all flex items-center gap-1 cursor-pointer ${
                                    isLight
                                      ? 'bg-blue-50 hover:bg-blue-100 active:scale-[0.95] text-blue-700 border-blue-200 shadow-xs'
                                      : 'bg-blue-950/70 hover:bg-blue-900/80 active:scale-[0.95] text-blue-300 border-blue-700/50'
                                  }`}
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

                    {/* Right: Live Order Inspector & One-Click Billing Console OR Live Driver Telemetry GPS Map (5 cols) */}
                    <div data-build-showroom className={`lg:col-span-5 p-3 sm:p-3.5 lg:p-4 rounded-xl border flex flex-col justify-between transition-colors overflow-hidden ${
                      isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-[#232731] bg-[#0E1015]'
                    }`}>
                      {trackingDriverOrderId === selectedOrder.id ? (
                        /* LIVE GPS DRIVER TRACKING MAP VIEW */
                        <div className="h-full flex flex-col justify-between overflow-hidden animate-fade-in">
                          {/* Map Top Header */}
                          <div className={`flex items-center justify-between pb-2 border-b shrink-0 ${
                            isLight ? 'border-slate-100' : 'border-[#1A1D24]'
                          }`}>
                            <div className="flex items-center gap-2">
                              <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-blue-500">
                                    Live Fleet Telemetry
                                  </span>
                                  <span className={`text-[9px] font-mono px-1 py-0.2 rounded border ${
                                    isLight ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-blue-950/60 text-blue-300 border-blue-800/40'
                                  }`}>
                                    0.1ms Link
                                  </span>
                                </div>
                                <h4 className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                  <span>Truck #04 • Regional Dispatch</span>
                                </h4>
                              </div>
                            </div>

                            {/* Close Button to return to Full Order Details */}
                            <button
                              onClick={() => setTrackingDriverOrderId(null)}
                              className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                                isLight
                                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                                  : 'bg-[#181B23] hover:bg-[#222631] text-zinc-300 border border-[#262B37]'
                              }`}
                              title="Close map and view full order details"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline text-[11px]">Close Map</span>
                            </button>
                          </div>

                          {/* Interactive Map Visual Area with Minimalist Order Overlay */}
                          <div className={`relative flex-1 min-h-[200px] rounded-lg border my-2 overflow-hidden flex items-center justify-center ${
                            isLight ? 'bg-[#EEF2F6] border-slate-200' : 'bg-[#080A0E] border-[#1C2028]'
                          }`}>
                            {/* SVG Tactical Vector Map */}
                            <svg className="w-full h-full absolute inset-0 select-none" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <pattern id="telemetryGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke={isLight ? '#CBD5E1' : '#161922'} strokeWidth="0.75" />
                                </pattern>
                              </defs>

                              {/* Grid Background */}
                              <rect width="100%" height="100%" fill="url(#telemetryGrid)" />

                              {/* Secondary Arterial Roads (Background Network) */}
                              <path d="M 0 70 Q 150 90 280 40 T 400 30" stroke={isLight ? '#E2E8F0' : '#12151D'} strokeWidth="2.5" fill="none" />
                              <path d="M 30 0 Q 80 120 70 240" stroke={isLight ? '#E2E8F0' : '#12151D'} strokeWidth="2" fill="none" />
                              <path d="M 190 0 L 210 240" stroke={isLight ? '#E2E8F0' : '#12151D'} strokeWidth="1.5" fill="none" />
                              <path d="M 0 160 Q 160 140 320 200 T 400 210" stroke={isLight ? '#E2E8F0' : '#12151D'} strokeWidth="2" fill="none" />
                              <path d="M 310 0 C 330 80 340 160 380 240" stroke={isLight ? '#E2E8F0' : '#12151D'} strokeWidth="1.5" fill="none" />

                              {/* Main Regional Highway Corridor (Thick road bed) */}
                              <path 
                                d="M 40 185 C 100 180, 130 140, 200 130 C 260 120, 280 80, 345 65" 
                                stroke={isLight ? '#CBD5E1' : '#1A202C'} 
                                strokeWidth="7" 
                                strokeLinecap="round" 
                                fill="none" 
                              />

                              {/* Planned / Future Route (Dashed) */}
                              <path 
                                d="M 235 125 C 270 120, 285 80, 345 65" 
                                stroke={isLight ? '#94A3B8' : '#3B82F6'} 
                                strokeWidth="3" 
                                strokeDasharray="4 4" 
                                strokeLinecap="round" 
                                strokeOpacity={isLight ? '0.6' : '0.4'}
                                fill="none" 
                              />

                              {/* Traveled Route Line (Solid glowing blue) */}
                              <path 
                                d="M 40 185 C 100 180, 130 140, 235 125" 
                                stroke="#2563EB" 
                                strokeWidth="3" 
                                strokeLinecap="round" 
                                fill="none" 
                              />

                              {/* Origin Point: Central Warehouse */}
                              <circle cx="40" cy="185" r="5" fill="#3B82F6" stroke={isLight ? '#FFFFFF' : '#0E1015'} strokeWidth="2" />
                              <circle cx="40" cy="185" r="9" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.4" fill="none" />
                              <text x="40" y="204" textAnchor="middle" fontSize="8" fontWeight="600" fill={isLight ? '#475569' : '#94A3B8'} fontFamily="ui-sans-serif, system-ui">
                                Origin Depot
                              </text>

                              {/* Intermediate Waypoint: Highway Interlink 4 */}
                              <circle cx="160" cy="145" r="3.5" fill="#10B981" stroke={isLight ? '#FFFFFF' : '#0E1015'} strokeWidth="1.5" />
                              <text x="160" y="163" textAnchor="middle" fontSize="8" fontWeight="500" fill={isLight ? '#64748B' : '#717684'} fontFamily="ui-sans-serif, system-ui">
                                Interlink 4 ✓
                              </text>

                              {/* Destination Point: Client Delivery Dock */}
                              <circle cx="345" cy="65" r="5" fill="#F84B11" stroke={isLight ? '#FFFFFF' : '#0E1015'} strokeWidth="2" />
                              <circle cx="345" cy="65" r="10" stroke="#F84B11" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" fill="none" />
                              <text x="345" y="52" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={isLight ? '#0F172A' : '#FFFFFF'} fontFamily="ui-sans-serif, system-ui">
                                Delivery Dock
                              </text>

                              {/* Current Vehicle Position Marker (Truck #04 at ~68% of the route) */}
                              <g transform="translate(235, 125)">
                                {/* Animated Pulsing Radar Rings */}
                                <circle cx="0" cy="0" r="14" fill="#3B82F6" fillOpacity="0.2">
                                  <animate attributeName="r" values="7;18;7" dur="2.4s" repeatCount="indefinite" />
                                  <animate attributeName="fill-opacity" values="0.35;0.05;0.35" dur="2.4s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="0" cy="0" r="6" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                                
                                {/* Speed & Heading Callout */}
                                <rect x="10" y="-18" width="66" height="15" rx="3.5" fill={isLight ? 'rgba(255,255,255,0.92)' : 'rgba(15,23,42,0.92)'} stroke={isLight ? '#CBD5E1' : '#334155'} strokeWidth="0.75" />
                                <text x="43" y="-7.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={isLight ? '#1E293B' : '#38BDF8'} fontFamily="ui-monospace, monospace">
                                  54 MPH • 68%
                                </text>
                              </g>
                            </svg>

                            {/* Minimalist Order Overlay Badge (Top-Left of map, semi-transparent frosted card) */}
                            <div className={`absolute top-2 left-2 max-w-[210px] p-2 rounded-lg backdrop-blur-md border text-xs shadow-md transition-all ${
                              isLight 
                                ? 'bg-white/90 border-slate-200/90 text-slate-800 shadow-slate-900/5' 
                                : 'bg-[#0E1015]/90 border-[#232731]/90 text-white shadow-black/40'
                            }`}>
                              <div className="flex items-center justify-between gap-1.5 mb-0.5">
                                <span className="font-mono text-[10px] font-bold text-[#F84B11]">{selectedOrder.id}</span>
                                <span className={`text-[10px] font-semibold tabular-nums ${isLight ? 'text-slate-900' : 'text-emerald-400'}`}>
                                  {selectedOrder.total}
                                </span>
                              </div>
                              <p className="text-[10.5px] font-semibold truncate leading-tight">{selectedOrder.client}</p>
                              <div className={`flex items-center justify-between text-[9.5px] mt-1 pt-1 border-t ${
                                isLight ? 'border-slate-200/80 text-slate-500' : 'border-[#1E222A] text-slate-400'
                              }`}>
                                <span className="truncate pr-1">{selectedOrder.items}</span>
                                <span className="font-medium text-blue-500 shrink-0 font-mono">ETA 35m</span>
                              </div>
                            </div>

                            {/* Floating Compass / Status HUD (Top-Right of map) */}
                            <div className={`absolute top-2 right-2 px-1.5 py-0.5 rounded-md backdrop-blur-md border text-[9.5px] font-mono shadow-xs flex items-center gap-1 ${
                              isLight ? 'bg-white/85 border-slate-200 text-slate-700' : 'bg-[#0E1015]/85 border-[#232731] text-zinc-300'
                            }`}>
                              <Radio className="w-2.5 h-2.5 text-emerald-500 animate-pulse" />
                              <span>GPS RTK (99.8%)</span>
                            </div>

                            {/* Route Progress Floating Pill (Bottom of map) */}
                            <div className={`absolute bottom-2 left-2 right-2 px-2 py-1 rounded-md backdrop-blur-md border flex items-center justify-between text-[9.5px] shadow-xs ${
                              isLight ? 'bg-white/90 border-slate-200 text-slate-700' : 'bg-[#0E1015]/90 border-[#232731] text-zinc-300'
                            }`}>
                              <div className="flex items-center gap-1.5 truncate">
                                <MapPin className="w-3 h-3 text-[#F84B11] shrink-0" />
                                <span className="truncate">Corridor I-80 East • Interlink 4</span>
                              </div>
                              <span className={`font-semibold shrink-0 ml-1.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                                On Schedule
                              </span>
                            </div>
                          </div>

                          {/* Driver Telemetry Details & Instant Tactical Action */}
                          <div className={`space-y-1.5 pt-1.5 border-t shrink-0 ${isLight ? 'border-slate-100' : 'border-[#1A1D24]'}`}>
                            <div className="grid grid-cols-3 gap-1.5 text-center">
                              <div className={`p-1.5 rounded border text-[10px] ${
                                isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#0A0C10] border-[#1A1D24] text-zinc-300'
                              }`}>
                                <div className={`text-[8.5px] uppercase tracking-wider ${isLight ? 'text-slate-400' : 'text-[#717684]'}`}>Driver</div>
                                <div className="font-semibold truncate">Carlos R.</div>
                              </div>
                              <div className={`p-1.5 rounded border text-[10px] ${
                                isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#0A0C10] border-[#1A1D24] text-zinc-300'
                              }`}>
                                <div className={`text-[8.5px] uppercase tracking-wider ${isLight ? 'text-slate-400' : 'text-[#717684]'}`}>Telemetry</div>
                                <div className="font-semibold truncate text-blue-500">54 mph / NVMe</div>
                              </div>
                              <div className={`p-1.5 rounded border text-[10px] ${
                                isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#0A0C10] border-[#1A1D24] text-zinc-300'
                              }`}>
                                <div className={`text-[8.5px] uppercase tracking-wider ${isLight ? 'text-slate-400' : 'text-[#717684]'}`}>Cargo Security</div>
                                <div className="font-semibold truncate text-emerald-500">Tamper-Proof ✓</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 pt-0.5">
                              <button
                                onClick={() => {
                                  setToastMessage(`Driver Carlos R. pinged. Response: "Approaching delivery bay, 1.2 miles away."`);
                                  setTimeout(() => setToastMessage(null), 3000);
                                }}
                                className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                  isLight
                                    ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 shadow-xs active:scale-[0.98]'
                                    : 'bg-blue-950/70 hover:bg-blue-900/80 text-blue-300 border-blue-700/50 active:scale-[0.98]'
                                }`}
                              >
                                <Radio className="w-3.5 h-3.5 text-blue-500" />
                                <span>Ping Telemetry (0.1ms)</span>
                              </button>
                              
                              <button
                                onClick={() => setTrackingDriverOrderId(null)}
                                className={`py-1.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                  isLight
                                    ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs'
                                    : 'bg-[#161922] hover:bg-[#1E222D] text-white border-[#232731]'
                                }`}
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>Show Full Order</span>
                              </button>
                            </div>
                          </div>

                        </div>
                      ) : (
                        /* LIVE ORDER INSPECTOR (DEFAULT VIEW) */
                        <>
                          <div className="overflow-hidden">
                            <div className={`flex items-center justify-between pb-2 border-b mb-2.5 ${
                              isLight ? 'border-slate-100' : 'border-[#1A1D24]'
                            }`}>
                              <div>
                                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#F84B11]">Live Order Inspector</span>
                                <h4 className={`text-sm sm:text-base font-bold flex items-center gap-1.5 mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                  <span>{selectedOrder.id}</span>
                                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${
                                    selectedOrder.status === 'Pending Approval'
                                      ? isLight ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-amber-950/70 text-amber-300 border-amber-800/40'
                                      : selectedOrder.status === 'In Transit'
                                      ? isLight ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-blue-950/70 text-blue-300 border-blue-800/40'
                                      : isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950/70 text-emerald-300 border-emerald-800/40'
                                  }`}>
                                    {selectedOrder.status}
                                  </span>
                                </h4>
                              </div>
                              <div className="text-right">
                                <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-[#717684]'}`}>Total Order Net</div>
                                <div className={`text-sm sm:text-base font-bold tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedOrder.total}</div>
                              </div>
                            </div>

                            {/* Account Profile Card */}
                            <div className={`p-2.5 rounded-lg border mb-2.5 space-y-1.5 text-xs transition-colors ${
                              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0A0C10] border-[#1A1D24]'
                            }`}>
                              <div className="flex items-center justify-between">
                                <span className={isLight ? 'text-slate-500' : 'text-[#717684]'}>Client Account:</span>
                                <span className={`font-semibold truncate max-w-[190px] ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedOrder.client}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className={isLight ? 'text-slate-500' : 'text-[#717684]'}>Account Executive:</span>
                                <span className={isLight ? 'text-slate-800 font-medium' : 'text-[#EDEDED]'}>{selectedOrder.rep}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className={isLight ? 'text-slate-500' : 'text-[#717684]'}>Payment Terms:</span>
                                <span className={`font-medium ${isLight ? 'text-emerald-700 font-semibold' : 'text-emerald-400'}`}>Net-30 (Approved Credit)</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className={isLight ? 'text-slate-500' : 'text-[#717684]'}>Delivery SLA:</span>
                                <span className={isLight ? 'text-slate-800 font-medium' : 'text-[#EDEDED]'}>{selectedOrder.sla}</span>
                              </div>
                            </div>

                            {/* SKU Breakdown Visual List */}
                            <div className="space-y-1.5 mb-2.5">
                              <div className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-[#717684]'}`}>
                                Verified Line Items
                              </div>
                              <div className={`p-2.5 rounded-lg border transition-colors ${
                                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0A0C10] border-[#1A1D24]'
                              }`}>
                                <div className={`flex items-center justify-between text-xs font-semibold mb-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                  <span className="truncate pr-2">{selectedOrder.items}</span>
                                  <span className="tabular-nums shrink-0">{selectedOrder.total}</span>
                                </div>
                                <div className={`text-[10px] flex items-center justify-between ${isLight ? 'text-slate-500' : 'text-[#717684]'}`}>
                                  <span>Quantity: {selectedOrder.units} units</span>
                                  <span className={`font-medium ${isLight ? 'text-emerald-700 font-semibold' : 'text-emerald-400'}`}>Barcode Verified (0ms)</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* One-Click Tactical Actions */}
                          <div className={`space-y-1.5 pt-2 border-t shrink-0 ${isLight ? 'border-slate-100' : 'border-[#1A1D24]'}`}>
                            {selectedOrder.status === 'Pending Approval' ? (
                              <button
                                onClick={() => handleApproveB2BOrder(selectedOrder.id)}
                                className="w-full py-2 rounded-lg bg-[#F84B11] hover:bg-[#ff5d26] active:scale-[0.98] text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#F84B11]/20 cursor-pointer"
                              >
                                <Zap className="w-3.5 h-3.5 fill-current" />
                                <span>Authorize Order & Queue Dispatch</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleGenerateB2BInvoice(selectedOrder.id)}
                                className={`w-full py-2 rounded-lg active:scale-[0.98] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                                  isLight
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                                    : 'bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300'
                                }`}
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>{selectedOrder.invoiced ? 'Re-Issue Encrypted Invoice' : 'Generate & Send PDF Invoice'}</span>
                              </button>
                            )}

                            <div className={`text-[10px] text-center pt-0.5 ${isLight ? 'text-slate-400' : 'text-[#585B64]'}`}>
                              Cryptographic local WAL hash: 0x8f2a...99c4 • Synchronized
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                  </div>
                ) : (
                  /* SUBVIEW B: HIGH-DENSITY TABLE VIEW (ALTERNATIVE) */
                  <div className="flex-1 min-h-0 flex flex-col space-y-2.5 animate-fade-in">
                    
                    {/* Operational Toolbar */}
                    <div className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                      
                      {/* Status Filters */}
                      <div className={`inline-flex p-0.5 rounded-lg border text-xs font-medium whitespace-nowrap shrink-0 overflow-x-auto ${
                        isLight ? 'bg-slate-200/80 border-slate-300' : 'bg-[#14161D] border-[#20232B]'
                      }`}>
                        <button
                          onClick={() => setB2BFilter('all')}
                          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                            b2bFilter === 'all'
                              ? isLight ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'bg-[#1E2129] text-white shadow-sm font-semibold'
                              : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-[#717684] hover:text-white'
                          }`}
                        >
                          All ({b2bOrders.length})
                        </button>
                        <button
                          onClick={() => setB2BFilter('pending')}
                          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                            b2bFilter === 'pending'
                              ? isLight ? 'bg-white text-amber-800 shadow-sm font-semibold' : 'bg-[#1E2129] text-amber-300 shadow-sm font-semibold'
                              : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-[#717684] hover:text-white'
                          }`}
                        >
                          Pending ({b2bOrders.filter(o => o.status === 'Pending Approval').length})
                        </button>
                        <button
                          onClick={() => setB2BFilter('transit')}
                          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                            b2bFilter === 'transit'
                              ? isLight ? 'bg-white text-blue-800 shadow-sm font-semibold' : 'bg-[#1E2129] text-blue-300 shadow-sm font-semibold'
                              : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-[#717684] hover:text-white'
                          }`}
                        >
                          In Transit ({b2bOrders.filter(o => o.status === 'In Transit').length})
                        </button>
                        <button
                          onClick={() => setB2BFilter('completed')}
                          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                            b2bFilter === 'completed'
                              ? isLight ? 'bg-white text-emerald-800 shadow-sm font-semibold' : 'bg-[#1E2129] text-emerald-300 shadow-sm font-semibold'
                              : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-[#717684] hover:text-white'
                          }`}
                        >
                          Invoiced ({b2bOrders.filter(o => o.status === 'Invoiced & Completed' || o.status === 'Approved & Queued').length})
                        </button>
                      </div>

                      {/* Search Bar & Quick Order Button */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="relative">
                          <Search className={`w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 ${
                            isLight ? 'text-slate-400' : 'text-[#585B64]'
                          }`} />
                          <input 
                            type="text"
                            placeholder="Search client, SKU, or order ID..."
                            value={b2bSearch}
                            onChange={(e) => setB2BSearch(e.target.value)}
                            className={`border rounded-md pl-8 pr-3 py-1.5 text-xs transition-colors w-52 sm:w-64 focus:outline-none focus:border-[#F84B11] ${
                              isLight
                                ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-xs'
                                : 'bg-[#14161D] border-[#232731] text-white placeholder:text-[#585B64]'
                            }`}
                          />
                        </div>
                        <button 
                          onClick={handleQuickAddB2BOrder}
                          className={`px-3 py-1.5 rounded-md border active:scale-[0.97] text-xs font-medium flex items-center gap-1.5 transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                            isLight
                              ? 'bg-white hover:bg-slate-50 border-slate-300 hover:border-[#F84B11]/50 text-slate-800 shadow-xs'
                              : 'bg-[#161922] hover:bg-[#1E222D] border-[#232731] hover:border-[#F84B11]/50 text-white'
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5 text-[#F84B11] shrink-0" />
                          <span>New Order</span>
                        </button>
                      </div>

                    </div>

                    {/* Vorsik Production Table */}
                    <div className={`flex-1 min-h-0 overflow-auto border rounded-lg transition-colors ${
                      isLight ? 'border-slate-300 bg-white shadow-xs sandbox-light-scroll' : 'border-[#1F232B] bg-[#0A0C10]'
                    }`}>
                      <table className="w-full text-left text-xs min-w-[960px]">
                        <thead className={`border-b uppercase tracking-wider font-semibold text-[11px] whitespace-nowrap ${
                          isLight ? 'border-slate-300 text-slate-600 bg-slate-100' : 'border-[#1F232B] text-[#585B64] bg-[#0E1015]'
                        }`}>
                          <tr>
                            <th className="py-2.5 px-4 font-medium whitespace-nowrap">Order ID</th>
                            <th className="py-2.5 px-4 font-medium whitespace-nowrap">Account / Client</th>
                            <th className="py-2.5 px-4 font-medium whitespace-nowrap">SKU Breakdown</th>
                            <th className="py-2.5 px-4 font-medium whitespace-nowrap">Total Amount</th>
                            <th className="py-2.5 px-4 font-medium whitespace-nowrap">Fulfillment SLA</th>
                            <th className="py-2.5 px-4 font-medium whitespace-nowrap">Status</th>
                            <th className="py-2.5 px-4 text-right font-medium whitespace-nowrap">Operational Action</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y whitespace-nowrap ${
                          isLight ? 'divide-slate-200' : 'divide-[#171920]'
                        }`}>
                          {filteredB2BOrders.map((order) => (
                            <tr key={order.id} className={`transition-colors duration-150 whitespace-nowrap ${
                              isLight ? 'hover:bg-slate-50' : 'hover:bg-[#141620]'
                            }`}>
                              <td className="py-3 px-4 font-mono font-semibold text-[#F84B11] whitespace-nowrap">{order.id}</td>
                              <td className={`py-3 px-4 font-semibold whitespace-nowrap ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                <span>{order.client}</span>
                              </td>
                              <td className={`py-3 px-4 whitespace-nowrap ${isLight ? 'text-slate-700' : 'text-[#EDEDED]'}`}>
                                <span>{order.items}</span>
                                <span className={`ml-1.5 font-mono text-[11px] ${isLight ? 'text-slate-500' : 'text-[#717684]'}`}>({order.units} units)</span>
                              </td>
                              <td className={`py-3 px-4 tabular-nums font-semibold whitespace-nowrap ${isLight ? 'text-slate-900' : 'text-white'}`}>{order.total}</td>
                              <td className={`py-3 px-4 text-[11px] whitespace-nowrap ${isLight ? 'text-slate-600' : 'text-[#94979E]'}`}>{order.sla}</td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                                  order.status === 'Approved & Queued' 
                                    ? isLight ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' 
                                    : order.status === 'In Transit'
                                    ? isLight ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-blue-950/60 text-blue-400 border border-blue-800/40'
                                    : order.status === 'Invoiced & Completed'
                                    ? isLight ? 'bg-slate-100 text-slate-700 border border-slate-300' : 'bg-zinc-800/60 text-zinc-300 border border-zinc-700/40'
                                    : isLight ? 'bg-orange-50 text-[#F84B11] border border-[#F84B11]/40' : 'bg-[#251A15] text-[#F84B11] border border-[#F84B11]/30'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right whitespace-nowrap">
                                {order.status === 'Pending Approval' ? (
                                  <button
                                    onClick={() => handleApproveB2BOrder(order.id)}
                                    className="px-2.5 py-1 rounded bg-[#F84B11] hover:bg-[#ff5d26] active:scale-[0.95] text-white font-medium text-[11px] transition-all duration-150 cursor-pointer shadow-sm hover:shadow-[#F84B11]/30 inline-flex items-center gap-1 whitespace-nowrap"
                                  >
                                    <Zap className="w-3 h-3 fill-current shrink-0" />
                                    <span>Approve & Dispatch</span>
                                  </button>
                                ) : order.status === 'Approved & Queued' ? (
                                  <button
                                    onClick={() => handleGenerateB2BInvoice(order.id)}
                                    className={`px-2.5 py-1 rounded active:scale-[0.95] font-medium text-[11px] transition-all duration-150 cursor-pointer inline-flex items-center gap-1 whitespace-nowrap ${
                                      isLight
                                        ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 shadow-xs'
                                        : 'bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/50'
                                    }`}
                                  >
                                    <FileText className="w-3 h-3 shrink-0" />
                                    <span>Issue Invoice</span>
                                  </button>
                                ) : order.status === 'In Transit' ? (
                                  <button
                                    onClick={() => {
                                      setSelectedOrderId(order.id);
                                      setTrackingDriverOrderId(order.id);
                                      setVorsikSubView('cards');
                                      setToastMessage(`Tracking Truck #04 • Regional Corridor GPS telemetry online (0.1ms).`);
                                      setTimeout(() => setToastMessage(null), 3000);
                                    }}
                                    className={`px-2.5 py-1 rounded active:scale-[0.95] font-medium text-[11px] transition-all duration-150 cursor-pointer inline-flex items-center gap-1 whitespace-nowrap ${
                                      isLight
                                        ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 shadow-xs'
                                        : 'bg-blue-950/70 hover:bg-blue-900/80 text-blue-300 border border-blue-700/50'
                                    }`}
                                  >
                                    <Truck className="w-3 h-3 shrink-0" />
                                    <span>Track Truck</span>
                                  </button>
                                ) : (
                                  <span className={`inline-flex items-center gap-1 text-[11px] font-medium whitespace-nowrap ${
                                    isLight ? 'text-emerald-700 font-semibold' : 'text-emerald-400'
                                  }`}>
                                    <CheckCircle2 className="w-3 h-3 shrink-0" />
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
                <div className={`shrink-0 flex flex-wrap items-center justify-between text-[11px] pt-1 ${
                  isLight ? 'text-slate-600' : 'text-[#717684]'
                }`}>
                  <span>Cryptographic audit log: {auditEventsCount} immutable events committed to local storage</span>
                  <span className={`flex items-center gap-1.5 ${isLight ? 'text-emerald-700 font-semibold' : 'text-emerald-400'}`}>
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

      {/* Responsive Multi-Device Kanban Section */}
      <section id="responsive-kanban" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#1F232B]">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F84B11]/10 text-[#F84B11] border border-[#F84B11]/20 font-mono text-xs mb-3 font-semibold">
            <Layers className="w-3.5 h-3.5 fill-current" />
            <span>100% Adaptive Multi-Device Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Industrial Workflows Engineered for Every Screen Resolution
          </h2>
          <p className="text-[#94979E] text-sm mt-3 leading-relaxed">
            Off-the-shelf software breaks on warehouse tablets or forces endless sideways scrolling on mobile. Vorsik custom applications are architected to adapt ergonomically to every physical station—from 4K dispatch command desks to rugged warehouse barcode tablets and field mobile devices.
          </p>
        </div>

        {/* Viewport Simulator Control Bar */}
        <div className="p-3 sm:p-4 rounded-xl border border-[#1F232B] bg-[#0E1015] mb-6 flex flex-col xl:flex-row xl:items-center justify-between gap-3 shadow-xl">
          {/* Device Switcher Segmented Control */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#717684] mr-1 hidden sm:inline">
              Simulate Viewport:
            </span>
            <div className="inline-flex p-1 rounded-lg border border-[#20232B] bg-[#14161D] text-xs font-medium">
              <button
                onClick={() => handleSelectDevice('desktop')}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  kanbanDevice === 'desktop'
                    ? 'bg-[#1E2129] text-white shadow-sm font-semibold'
                    : 'text-[#94979E] hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5 text-[#F84B11]" />
                <span>Desktop (1440px)</span>
              </button>

              <button
                onClick={() => handleSelectDevice('laptop')}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  kanbanDevice === 'laptop'
                    ? 'bg-[#1E2129] text-white shadow-sm font-semibold'
                    : 'text-[#94979E] hover:text-white'
                }`}
              >
                <Laptop className="w-3.5 h-3.5 text-blue-400" />
                <span>Laptop (1024px)</span>
              </button>

              <button
                onClick={() => handleSelectDevice('tablet')}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  kanbanDevice === 'tablet'
                    ? 'bg-[#1E2129] text-white shadow-sm font-semibold'
                    : 'text-[#94979E] hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Rugged Tablet (768px)</span>
              </button>

              <button
                onClick={() => handleSelectDevice('mobile')}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  kanbanDevice === 'mobile'
                    ? 'bg-[#1E2129] text-white shadow-sm font-semibold'
                    : 'text-[#94979E] hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Mobile (390px)</span>
              </button>
            </div>
          </div>

          {/* Quick Controls: Theme Switcher (Light default) + Priority Filter + Reset */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Theme Toggle: Light by default / Dark mode option */}
            <div className="inline-flex p-0.5 rounded-lg border border-[#20232B] bg-[#14161D] text-xs font-medium shrink-0">
              <button
                type="button"
                onClick={() => setKanbanTheme('light')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  isKanbanLight
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-[#717684] hover:text-white'
                }`}
                title="Light mode (Default - High Contrast Demo)"
                aria-label="Light mode"
              >
                <Sun className={`w-3.5 h-3.5 ${isKanbanLight ? 'text-amber-500 fill-amber-500/20' : 'text-slate-400'}`} />
                <span className="text-[11px]">Light</span>
              </button>
              <button
                type="button"
                onClick={() => setKanbanTheme('dark')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  !isKanbanLight
                    ? 'bg-[#1E2129] text-white shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-white'
                }`}
                title="Dark mode"
                aria-label="Dark mode"
              >
                <Moon className={`w-3.5 h-3.5 ${!isKanbanLight ? 'text-blue-400 fill-blue-400/20' : 'text-slate-500'}`} />
                <span className="text-[11px]">Dark</span>
              </button>
            </div>

            {/* Priority Filters */}
            <div className="inline-flex p-0.5 rounded-lg border border-[#20232B] bg-[#14161D] text-xs shrink-0">
              <button
                onClick={() => setKanbanFilter('all')}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  kanbanFilter === 'all' ? 'bg-[#1E2129] text-white font-semibold' : 'text-[#717684] hover:text-white'
                }`}
              >
                All ({kanbanTasks.length})
              </button>
              <button
                onClick={() => setKanbanFilter('critical')}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  kanbanFilter === 'critical' ? 'bg-[#1E2129] text-red-400 font-semibold' : 'text-[#717684] hover:text-white'
                }`}
              >
                Critical ({kanbanTasks.filter(t => t.priority === 'Critical' || t.priority === 'High').length})
              </button>
              <button
                onClick={() => setKanbanFilter('standard')}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  kanbanFilter === 'standard' ? 'bg-[#1E2129] text-slate-300 font-semibold' : 'text-[#717684] hover:text-white'
                }`}
              >
                Standard ({kanbanTasks.filter(t => t.priority === 'Standard').length})
              </button>
            </div>

            {/* Reset Tasks */}
            <button
              onClick={() => setKanbanTasks(initialKanbanTasks)}
              className="p-1.5 rounded-lg border border-[#20232B] bg-[#14161D] text-[#717684] hover:text-white hover:bg-[#1A1D27] cursor-pointer transition-all shrink-0"
              title="Reset Tasks"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Viewport Ergonomics Live Indicator Banner */}
        <div className="flex flex-wrap items-center justify-between text-xs px-3 py-2 rounded-lg bg-[#12141A] border border-[#1E222A] text-[#94979E] mb-6 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-white">
              {kanbanDevice === 'desktop' && 'Desktop Command Mode • 1440 × 720px'}
              {kanbanDevice === 'laptop' && 'Compact Laptop Mode • 1024 × 700px'}
              {kanbanDevice === 'tablet' && 'Rugged Warehouse Tablet • 768 × 760px'}
              {kanbanDevice === 'mobile' && 'Field Handheld Mobile • 390 × 760px'}
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider font-semibold ${
              isKanbanLight ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {isKanbanLight ? 'Light UI (Contrast Example)' : 'Dark UI'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-flex items-center gap-1">
              <GripVertical className="w-2.5 h-2.5" />
              <span>Drag & Drop Ready</span>
            </span>
          </div>

          <div className="text-[11px] font-mono text-[#717684]">
            {kanbanDevice === 'desktop' && '4-Column Simultaneous View • Mouse & Keyboard Precision'}
            {kanbanDevice === 'laptop' && '4-Column Balanced View • Field Engineering Density'}
            {kanbanDevice === 'tablet' && '+30% Touch Hitboxes • Direct Barcode Laser Scanner Trigger'}
            {kanbanDevice === 'mobile' && 'Single-Thumb Ergonomics • Segmented Stage Switcher'}
          </div>
        </div>

        {/* Scalable Interactive Device Hardware Viewport Container */}
        <div 
          className="w-full mx-auto transition-[max-width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{ maxWidth: deviceWidthMap[kanbanDevice] }}
        >
          {/* Hardware Frame Shell */}
          <div className={`shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col overflow-hidden ${
            kanbanDevice === 'mobile'
              ? isKanbanLight
                ? 'rounded-[38px] border-[5px] border-slate-300 bg-slate-200/90 shadow-slate-900/40 p-2.5 ring-1 ring-slate-400/30'
                : 'rounded-[38px] border-[5px] border-[#2A2E39] bg-[#0E1015] p-2.5 ring-1 ring-white/5'
              : kanbanDevice === 'tablet'
              ? isKanbanLight
                ? 'rounded-2xl border-[3px] border-slate-300 bg-slate-200/80 shadow-slate-900/30 p-2 ring-1 ring-slate-400/30'
                : 'rounded-2xl border-[3px] border-[#333846] bg-[#0E1015] p-2 ring-1 ring-white/5'
              : isKanbanLight
              ? 'rounded-xl border border-slate-300/90 bg-slate-100 shadow-slate-900/20'
              : 'rounded-xl border border-[#20232B] bg-[#0E1015]'
          }`}>

            {/* Mobile Top Notch Simulation */}
            {activeLayoutDevice === 'mobile' && (
              <div className="flex items-center justify-between px-4 pt-1 pb-2 shrink-0">
                <span className={`text-[10px] font-semibold font-mono ${
                  isKanbanLight ? 'text-slate-800' : 'text-white'
                }`}>
                  09:41
                </span>
                <div className="w-20 h-4 rounded-full bg-black border border-slate-700/50 flex items-center justify-center shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-[#1F232B] mr-2" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                </div>
                <div className={`flex items-center gap-1.5 text-[10px] ${
                  isKanbanLight ? 'text-slate-800' : 'text-white'
                }`}>
                  <button
                    onClick={() => setKanbanTheme(isKanbanLight ? 'dark' : 'light')}
                    className={`p-0.5 rounded cursor-pointer ${
                      isKanbanLight ? 'text-slate-600 hover:text-slate-900' : 'text-[#717684] hover:text-white'
                    }`}
                    title={isKanbanLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
                  >
                    {isKanbanLight ? <Moon className="w-2.5 h-2.5" /> : <Sun className="w-2.5 h-2.5" />}
                  </button>
                  <span className="font-medium">5G</span>
                  <span className="font-mono">100%</span>
                </div>
              </div>
            )}

            {/* Workstation / Tablet Window Titlebar */}
            {activeLayoutDevice !== 'mobile' && (
              <div className={`border-b px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 shrink-0 rounded-t-xl transition-colors duration-200 ${
                isKanbanLight 
                  ? 'border-slate-300/80 bg-slate-100 text-slate-700' 
                  : 'border-[#1F232B] bg-[#0A0C10] text-[#717684]'
              }`}>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className={`ml-1.5 font-mono text-xs truncate ${
                    isKanbanLight ? 'text-slate-600' : 'text-[#717684]'
                  }`}>
                    vorsik-os://warehouse-alpha/kanban • LAN 10Gbps
                  </span>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {/* Tablet-Specific Barcode Action */}
                  {activeLayoutDevice === 'tablet' && (
                    <button
                      onClick={handleScanBarcodeSim}
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 active:scale-[0.96] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <Barcode className="w-3.5 h-3.5" />
                      <span>Scan Barcode</span>
                    </button>
                  )}

                  {/* Engine latency badge */}
                  <div className={`text-xs flex items-center gap-1.5 font-mono ${
                    isKanbanLight ? 'text-emerald-700 font-medium' : 'text-emerald-400'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="hidden sm:inline">0.1ms Engine</span>
                  </div>
                </div>
              </div>
            )}

            {/* Kanban Inner Workstation Content Canvas */}
            <div className={`p-3 sm:p-4 transition-colors duration-200 flex flex-col ${
              activeLayoutDevice === 'tablet' ? 'h-[620px]' : 'h-[570px]'
            } overflow-hidden ${
              isKanbanLight ? 'bg-[#F8FAFC]' : 'bg-[#08090C]'
            } ${
              activeLayoutDevice === 'mobile' ? 'rounded-[26px]' : activeLayoutDevice === 'tablet' ? 'rounded-b-lg' : 'rounded-b-xl'
            }`}>

              {/* Sub-Header / Operational Controls */}
              <div className={`flex items-center justify-between pb-3 border-b mb-3 shrink-0 ${
                isKanbanLight ? 'border-slate-200' : 'border-[#1A1D24]'
              }`}>
                <div>
                  <h3 className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${
                    isKanbanLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    <span>Manufacturing & Fulfillment Pipeline</span>
                    <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] border whitespace-nowrap shrink-0 ${
                      isKanbanLight
                        ? 'bg-white text-slate-700 border-slate-300 shadow-2xs font-semibold'
                        : 'bg-[#1E222A] text-zinc-300 border-[#2A2F3D]'
                    }`}>
                      {filteredKanbanTasks.length} {activeLayoutDevice === 'mobile' ? 'Orders' : 'Work Orders'}
                    </span>
                  </h3>
                  <p className={`text-[10px] mt-0.5 ${
                    isKanbanLight ? 'text-slate-500' : 'text-[#717684]'
                  }`}>
                    Local PostgreSQL event log • Zero-loss offline buffer
                  </p>
                </div>

                {/* Mobile Quick Scan button */}
                {activeLayoutDevice === 'mobile' && (
                  <button
                    onClick={handleScanBarcodeSim}
                    className="p-1.5 rounded bg-emerald-600 hover:bg-emerald-500 active:scale-[0.96] text-white text-xs flex items-center gap-1 cursor-pointer shadow-xs"
                    title="Scan SKU Barcode"
                  >
                    <Barcode className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Mobile Mode: Segmented 4-Stage Pill Switcher */}
              {activeLayoutDevice === 'mobile' && (
                <div className={`grid grid-cols-4 gap-1 p-1 rounded-lg border text-[10px] font-medium mb-3 shrink-0 ${
                  isKanbanLight ? 'border-slate-200 bg-slate-200/70' : 'border-[#20232B] bg-[#12141C]'
                }`}>
                  <button
                    onClick={() => setMobileActiveStage('intake')}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      if (dragOverStage !== 'intake') setDragOverStage('intake');
                    }}
                    onDragLeave={() => {
                      if (dragOverStage === 'intake') setDragOverStage(null);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const taskId = e.dataTransfer.getData('text/plain') || draggedKanbanTaskId;
                      if (taskId) {
                        handleDropKanbanTask('intake', taskId);
                        setMobileActiveStage('intake');
                      }
                    }}
                    className={`py-1.5 rounded text-center transition-all cursor-pointer truncate ${
                      dragOverStage === 'intake' && draggedKanbanTaskId
                        ? 'ring-2 ring-[#F84B11] scale-[1.03] shadow-md '
                        : ''
                    }${
                      mobileActiveStage === 'intake'
                        ? isKanbanLight
                          ? 'bg-white text-amber-700 font-bold shadow-xs border border-slate-200/60'
                          : 'bg-[#1E2129] text-amber-300 font-bold shadow-xs'
                        : isKanbanLight
                          ? 'text-slate-600 hover:text-slate-900'
                          : 'text-[#717684] hover:text-white'
                    }`}
                  >
                    Intake ({filteredKanbanTasks.filter(t => t.stage === 'intake').length})
                  </button>
                  <button
                    onClick={() => setMobileActiveStage('assembly')}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      if (dragOverStage !== 'assembly') setDragOverStage('assembly');
                    }}
                    onDragLeave={() => {
                      if (dragOverStage === 'assembly') setDragOverStage(null);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const taskId = e.dataTransfer.getData('text/plain') || draggedKanbanTaskId;
                      if (taskId) {
                        handleDropKanbanTask('assembly', taskId);
                        setMobileActiveStage('assembly');
                      }
                    }}
                    className={`py-1.5 rounded text-center transition-all cursor-pointer truncate ${
                      dragOverStage === 'assembly' && draggedKanbanTaskId
                        ? 'ring-2 ring-[#F84B11] scale-[1.03] shadow-md '
                        : ''
                    }${
                      mobileActiveStage === 'assembly'
                        ? isKanbanLight
                          ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200/60'
                          : 'bg-[#1E2129] text-blue-300 font-bold shadow-xs'
                        : isKanbanLight
                          ? 'text-slate-600 hover:text-slate-900'
                          : 'text-[#717684] hover:text-white'
                    }`}
                  >
                    Assembly ({filteredKanbanTasks.filter(t => t.stage === 'assembly').length})
                  </button>
                  <button
                    onClick={() => setMobileActiveStage('qa')}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      if (dragOverStage !== 'qa') setDragOverStage('qa');
                    }}
                    onDragLeave={() => {
                      if (dragOverStage === 'qa') setDragOverStage(null);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const taskId = e.dataTransfer.getData('text/plain') || draggedKanbanTaskId;
                      if (taskId) {
                        handleDropKanbanTask('qa', taskId);
                        setMobileActiveStage('qa');
                      }
                    }}
                    className={`py-1.5 rounded text-center transition-all cursor-pointer truncate ${
                      dragOverStage === 'qa' && draggedKanbanTaskId
                        ? 'ring-2 ring-[#F84B11] scale-[1.03] shadow-md '
                        : ''
                    }${
                      mobileActiveStage === 'qa'
                        ? isKanbanLight
                          ? 'bg-white text-purple-700 font-bold shadow-xs border border-slate-200/60'
                          : 'bg-[#1E2129] text-purple-300 font-bold shadow-xs'
                        : isKanbanLight
                          ? 'text-slate-600 hover:text-slate-900'
                          : 'text-[#717684] hover:text-white'
                    }`}
                  >
                    QA ({filteredKanbanTasks.filter(t => t.stage === 'qa').length})
                  </button>
                  <button
                    onClick={() => setMobileActiveStage('dispatch')}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      if (dragOverStage !== 'dispatch') setDragOverStage('dispatch');
                    }}
                    onDragLeave={() => {
                      if (dragOverStage === 'dispatch') setDragOverStage(null);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const taskId = e.dataTransfer.getData('text/plain') || draggedKanbanTaskId;
                      if (taskId) {
                        handleDropKanbanTask('dispatch', taskId);
                        setMobileActiveStage('dispatch');
                      }
                    }}
                    className={`py-1.5 rounded text-center transition-all cursor-pointer truncate ${
                      dragOverStage === 'dispatch' && draggedKanbanTaskId
                        ? 'ring-2 ring-[#F84B11] scale-[1.03] shadow-md '
                        : ''
                    }${
                      mobileActiveStage === 'dispatch'
                        ? isKanbanLight
                          ? 'bg-white text-emerald-700 font-bold shadow-xs border border-slate-200/60'
                          : 'bg-[#1E2129] text-emerald-300 font-bold shadow-xs'
                        : isKanbanLight
                          ? 'text-slate-600 hover:text-slate-900'
                          : 'text-[#717684] hover:text-white'
                    }`}
                  >
                    Dispatch ({filteredKanbanTasks.filter(t => t.stage === 'dispatch').length})
                  </button>
                </div>
              )}

              {/* Tablet Mode: Track Pair Selector Switcher */}
              {activeLayoutDevice === 'tablet' && (
                <div className={`flex items-center justify-between gap-2 pb-2.5 mb-3 border-b shrink-0 ${
                  isKanbanLight ? 'border-slate-200' : 'border-[#1A1D24]'
                }`}>
                  <div className={`inline-flex p-0.5 rounded-lg border text-xs font-semibold ${
                    isKanbanLight ? 'border-slate-200 bg-slate-200/70' : 'border-[#20232B] bg-[#12141C]'
                  }`}>
                    <button
                      onClick={() => setTabletStagePair('production')}
                      onDragOver={(e) => {
                        e.preventDefault();
                        if (tabletStagePair !== 'production') {
                          setTabletStagePair('production');
                        }
                      }}
                      className={`px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
                        tabletStagePair === 'production'
                          ? isKanbanLight
                            ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/60'
                            : 'bg-[#1E2129] text-white font-semibold'
                          : isKanbanLight
                            ? 'text-slate-600 hover:text-slate-900'
                            : 'text-[#717684] hover:text-white'
                      }`}
                    >
                      Track A: Intake & Assembly
                    </button>
                    <button
                      onClick={() => setTabletStagePair('fulfillment')}
                      onDragOver={(e) => {
                        e.preventDefault();
                        if (tabletStagePair !== 'fulfillment') {
                          setTabletStagePair('fulfillment');
                        }
                      }}
                      className={`px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
                        tabletStagePair === 'fulfillment'
                          ? isKanbanLight
                            ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/60'
                            : 'bg-[#1E2129] text-white font-semibold'
                          : isKanbanLight
                            ? 'text-slate-600 hover:text-slate-900'
                            : 'text-[#717684] hover:text-white'
                      }`}
                    >
                      Track B: QA & Dispatch
                    </button>
                  </div>

                  <span className={`text-[11px] font-mono whitespace-nowrap shrink-0 ${
                    isKanbanLight ? 'text-slate-500' : 'text-[#717684]'
                  }`}>
                    +30% Glove Hitboxes
                  </span>
                </div>
              )}

              {/* KANBAN CARDS CONTAINER WITH SMOOTH RESOLUTION MORPHING */}
              <div className={`flex-1 min-h-0 flex flex-col transition-all duration-200 ease-out ${
                isDeviceTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
              }`}>
                
                {/* 1. DESKTOP & LAPTOP: 4 COLUMNS FULL SPREAD */}
                {(activeLayoutDevice === 'desktop' || activeLayoutDevice === 'laptop') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 h-full min-h-0">
                    {(['intake', 'assembly', 'qa', 'dispatch'] as const).map(stageKey => {
                      const tasksInStage = filteredKanbanTasks.filter(t => t.stage === stageKey);
                      const meta = {
                        intake: { title: '1. Intake & Specs', color: 'amber', count: tasksInStage.length },
                        assembly: { title: '2. Assembly & Pack', color: 'blue', count: tasksInStage.length },
                        qa: { title: '3. QA & Testing', color: 'purple', count: tasksInStage.length },
                        dispatch: { title: '4. Ready for Dispatch', color: 'emerald', count: tasksInStage.length }
                      }[stageKey];

                      const isColumnDragOver = dragOverStage === stageKey && draggedKanbanTaskId !== null;

                      return (
                        <div 
                          key={stageKey} 
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'move';
                            if (dragOverStage !== stageKey) {
                              setDragOverStage(stageKey);
                            }
                          }}
                          onDragEnter={(e) => {
                            e.preventDefault();
                            if (dragOverStage !== stageKey) {
                              setDragOverStage(stageKey);
                            }
                          }}
                          onDragLeave={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                              if (dragOverStage === stageKey) {
                                setDragOverStage(null);
                              }
                            }
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            const taskId = e.dataTransfer.getData('text/plain') || draggedKanbanTaskId;
                            if (taskId) {
                              handleDropKanbanTask(stageKey, taskId);
                            }
                          }}
                          className={`p-3 rounded-xl border flex flex-col min-h-0 min-w-0 transition-all duration-200 ${
                            isColumnDragOver
                              ? isKanbanLight 
                                ? 'border-[#F84B11] bg-orange-50/70 ring-2 ring-[#F84B11]/30 shadow-md' 
                                : 'border-[#F84B11] bg-[#F84B11]/10 ring-2 ring-[#F84B11]/30 shadow-md'
                              : isKanbanLight 
                              ? 'border-slate-200 bg-white/90 shadow-xs' 
                              : 'border-[#1E222A] bg-[#0E1015]'
                          }`}
                        >
                          {/* Column Header */}
                          <div className={`flex items-center justify-between pb-2 border-b mb-2.5 shrink-0 ${
                            isKanbanLight ? 'border-slate-200' : 'border-[#1A1D24]'
                          }`}>
                            <div className="flex items-center gap-1.5 min-w-0">
                              <div className={`w-2 h-2 rounded-full shrink-0 ${
                                meta.color === 'amber' ? 'bg-amber-400' :
                                meta.color === 'blue' ? 'bg-blue-400' :
                                meta.color === 'purple' ? 'bg-purple-400' : 'bg-emerald-400'
                              }`} />
                              <span className={`text-xs font-bold uppercase tracking-wider truncate ${
                                isKanbanLight ? 'text-slate-800' : 'text-white'
                              }`}>
                                {meta.title}
                              </span>
                            </div>
                            <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] border shrink-0 ${
                              isKanbanLight 
                                ? 'border-slate-200 bg-slate-50 text-slate-600 font-semibold' 
                                : 'border-[#232731] bg-[#14161D] text-[#94979E]'
                            }`}>
                              {meta.count}
                            </span>
                          </div>

                          {/* Column Card List */}
                          <div className={`space-y-2 overflow-y-auto flex-1 pr-1 min-h-0 ${
                            isKanbanLight ? 'sandbox-light-scroll' : ''
                          }`}>
                            {tasksInStage.map(task => {
                              const isTaskBeingDragged = draggedKanbanTaskId === task.id;
                              return (
                                <div
                                  key={task.id}
                                  draggable
                                  onDragStart={(e) => {
                                    e.dataTransfer.setData('text/plain', task.id);
                                    e.dataTransfer.effectAllowed = 'move';
                                    setDraggedKanbanTaskId(task.id);
                                  }}
                                  onDragEnd={() => {
                                    setDraggedKanbanTaskId(null);
                                    setDragOverStage(null);
                                  }}
                                  className={`p-2.5 rounded-lg border transition-all space-y-2 group min-w-0 cursor-grab active:cursor-grabbing select-none ${
                                    isTaskBeingDragged
                                      ? 'opacity-40 border-dashed border-[#F84B11] scale-[0.98]'
                                      : isKanbanLight
                                      ? 'border-slate-200/90 bg-slate-50/70 hover:bg-white hover:border-slate-300 hover:shadow-xs'
                                      : 'border-[#1E222A] bg-[#08090C] hover:border-[#2C303B]'
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-1.5">
                                    <div className="flex items-center gap-1 min-w-0 truncate">
                                      <GripVertical className="w-3 h-3 text-[#717684] opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
                                      <span className="font-mono text-[10px] font-bold text-[#F84B11] mr-1">{task.id}</span>
                                      <span className={`text-[10px] font-mono truncate ${isKanbanLight ? 'text-slate-500' : 'text-[#717684]'}`}>
                                        {task.sku}
                                      </span>
                                    </div>
                                    <span className={`px-1.5 py-0.2 rounded text-[9.5px] font-semibold border shrink-0 ${
                                      task.priority === 'Critical'
                                        ? isKanbanLight
                                          ? 'bg-red-50 text-red-700 border-red-200 font-bold'
                                          : 'bg-red-950/80 text-red-400 border-red-800/40'
                                        : task.priority === 'High'
                                        ? isKanbanLight
                                          ? 'bg-amber-50 text-amber-800 border-amber-200 font-semibold'
                                          : 'bg-amber-950/80 text-amber-300 border-amber-800/40'
                                        : isKanbanLight
                                          ? 'bg-slate-100 text-slate-700 border-slate-200 font-medium'
                                          : 'bg-zinc-800/60 text-zinc-300 border-zinc-700/40'
                                    }`}>
                                      {task.priority}
                                    </span>
                                  </div>

                                  <p className={`text-xs font-semibold leading-snug line-clamp-2 ${
                                    isKanbanLight ? 'text-slate-900' : 'text-white'
                                  }`}>
                                    {task.title}
                                  </p>

                                  <div className={`flex items-center justify-between text-[10px] ${
                                    isKanbanLight ? 'text-slate-500' : 'text-[#717684]'
                                  }`}>
                                    <span className="flex items-center gap-1">
                                      <Clock3 className={`w-3 h-3 ${isKanbanLight ? 'text-slate-400' : 'text-[#717684]'}`} />
                                      <span>{task.sla}</span>
                                    </span>
                                    <span className={`whitespace-nowrap shrink-0 ml-1 ${isKanbanLight ? 'text-slate-700 font-medium font-mono' : 'text-zinc-400 font-mono'}`}>
                                      {task.assignee}
                                    </span>
                                  </div>

                                  {task.progress && (
                                    <div>
                                      <div className={`flex items-center justify-between text-[9px] mb-0.5 ${
                                        isKanbanLight ? 'text-slate-500' : 'text-[#717684]'
                                      }`}>
                                        <span>Milestones</span>
                                        <span className="font-mono">{task.progress.current}/{task.progress.total}</span>
                                      </div>
                                      <div className={`w-full h-1 rounded-full overflow-hidden ${
                                        isKanbanLight ? 'bg-slate-200' : 'bg-[#1A1D24]'
                                      }`}>
                                        <div
                                          className="h-full bg-blue-600 rounded-full"
                                          style={{ width: `${(task.progress.current / task.progress.total) * 100}%` }}
                                        />
                                      </div>
                                    </div>
                                  )}

                                  <div className={`pt-1 border-t flex items-center justify-between ${
                                    isKanbanLight ? 'border-slate-200' : 'border-[#161922]'
                                  }`}>
                                    <span className={`text-[9.5px] truncate max-w-[120px] ${
                                      isKanbanLight ? 'text-slate-500' : 'text-[#717684]'
                                    }`}>
                                      {task.tag}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      {stageKey !== 'intake' && (
                                        <button
                                          onMouseDown={(e) => e.stopPropagation()}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleRegressKanbanTask(task.id);
                                          }}
                                          className={`px-1.5 py-0.5 rounded text-[10px] border cursor-pointer transition-colors ${
                                            isKanbanLight
                                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                                              : 'bg-[#161922] hover:bg-[#1E222D] text-[#94979E] hover:text-white border-[#232731]'
                                          }`}
                                          title="Return to previous stage"
                                        >
                                          ←
                                        </button>
                                      )}
                                      {stageKey !== 'dispatch' ? (
                                        <button
                                          onMouseDown={(e) => e.stopPropagation()}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleAdvanceKanbanTask(task.id);
                                          }}
                                          className="px-2 py-0.5 rounded text-[10px] bg-[#F84B11] hover:bg-[#ff5d26] text-white font-medium flex items-center gap-1 cursor-pointer transition-all active:scale-[0.95] shadow-2xs"
                                        >
                                          <span>Advance</span>
                                          <span>→</span>
                                        </button>
                                      ) : (
                                        <span className={`text-[9.5px] font-semibold flex items-center gap-0.5 ${
                                          isKanbanLight ? 'text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200' : 'text-emerald-400'
                                        }`}>
                                          <CheckCircle2 className="w-3 h-3" />
                                          <span>Dispatched</span>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}

                            {tasksInStage.length === 0 && (
                              <div className={`h-24 rounded-lg border border-dashed flex flex-col items-center justify-center p-3 text-center transition-colors ${
                                isColumnDragOver
                                  ? 'border-[#F84B11] bg-[#F84B11]/10 text-[#F84B11]'
                                  : isKanbanLight
                                  ? 'border-slate-200 text-slate-400 bg-slate-50/50'
                                  : 'border-[#1E222A] text-[#717684] bg-white/[0.01]'
                              }`}>
                                <span className="text-[10px] font-mono font-medium">
                                  {isColumnDragOver ? 'Drop task to assign here' : 'No work orders in stage'}
                                </span>
                                <span className="text-[9px] text-[#717684] mt-0.5">Drag any card here</span>
                              </div>
                            )}

                            {isColumnDragOver && tasksInStage.length > 0 && kanbanTasks.find(t => t.id === draggedKanbanTaskId)?.stage !== stageKey && (
                              <div className={`p-2 rounded-lg border-2 border-dashed flex items-center justify-center gap-1.5 text-[11px] font-mono font-medium transition-all animate-pulse ${
                                isKanbanLight 
                                  ? 'border-[#F84B11] bg-orange-100/60 text-[#F84B11]' 
                                  : 'border-[#F84B11]/60 bg-[#F84B11]/10 text-orange-400'
                              }`}>
                                <span>Drop to move here</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 2. TABLET: DUAL 2-COLUMN VIEW (GLOVE-FRIENDLY TACTILE MODE) */}
                {activeLayoutDevice === 'tablet' && (
                  <div className="grid grid-cols-2 gap-3.5 h-full min-h-0">
                    {(tabletStagePair === 'production' 
                      ? (['intake', 'assembly'] as const) 
                      : (['qa', 'dispatch'] as const)
                    ).map(stageKey => {
                      const tasksInStage = filteredKanbanTasks.filter(t => t.stage === stageKey);
                      const meta = {
                        intake: { title: 'Stage 1: Intake & Specs', count: tasksInStage.length, color: 'amber' },
                        assembly: { title: 'Stage 2: Assembly & Pack', count: tasksInStage.length, color: 'blue' },
                        qa: { title: 'Stage 3: QA & Testing', count: tasksInStage.length, color: 'purple' },
                        dispatch: { title: 'Stage 4: Ready for Dispatch', count: tasksInStage.length, color: 'emerald' }
                      }[stageKey];

                      const isColumnDragOver = dragOverStage === stageKey && draggedKanbanTaskId !== null;

                      return (
                        <div 
                          key={stageKey} 
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'move';
                            if (dragOverStage !== stageKey) {
                              setDragOverStage(stageKey);
                            }
                          }}
                          onDragEnter={(e) => {
                            e.preventDefault();
                            if (dragOverStage !== stageKey) {
                              setDragOverStage(stageKey);
                            }
                          }}
                          onDragLeave={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                              if (dragOverStage === stageKey) {
                                setDragOverStage(null);
                              }
                            }
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            const taskId = e.dataTransfer.getData('text/plain') || draggedKanbanTaskId;
                            if (taskId) {
                              handleDropKanbanTask(stageKey, taskId);
                            }
                          }}
                          className={`p-3.5 rounded-xl border flex flex-col min-h-0 min-w-0 transition-all duration-200 ${
                            isColumnDragOver
                              ? isKanbanLight 
                                ? 'border-[#F84B11] bg-orange-50/70 ring-2 ring-[#F84B11]/30 shadow-md' 
                                : 'border-[#F84B11] bg-[#F84B11]/10 ring-2 ring-[#F84B11]/30 shadow-md'
                              : isKanbanLight 
                              ? 'border-slate-200 bg-white/90 shadow-xs' 
                              : 'border-[#262C38] bg-[#0E1015]'
                          }`}
                        >
                          <div className={`flex items-center justify-between pb-2.5 border-b mb-3 shrink-0 ${
                            isKanbanLight ? 'border-slate-200' : 'border-[#1A1D24]'
                          }`}>
                            <div className="flex items-center gap-2 min-w-0">
                              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                meta.color === 'amber' ? 'bg-amber-400' :
                                meta.color === 'blue' ? 'bg-blue-400' :
                                meta.color === 'purple' ? 'bg-purple-400' : 'bg-emerald-400'
                              }`} />
                              <span className={`text-xs font-bold uppercase tracking-wider truncate ${
                                isKanbanLight ? 'text-slate-800' : 'text-white'
                              }`}>
                                {meta.title}
                              </span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border shrink-0 ${
                              isKanbanLight 
                                ? 'border-slate-200 bg-slate-50 text-slate-600' 
                                : 'border-[#232731] bg-[#14161D] text-[#94979E]'
                            }`}>
                              {meta.count} Orders
                            </span>
                          </div>

                          <div className={`space-y-3 overflow-y-auto flex-1 pr-1 min-h-0 ${
                            isKanbanLight ? 'sandbox-light-scroll' : ''
                          }`}>
                            {tasksInStage.map(task => {
                              const isTaskBeingDragged = draggedKanbanTaskId === task.id;
                              return (
                                <div
                                  key={task.id}
                                  draggable
                                  onDragStart={(e) => {
                                    e.dataTransfer.setData('text/plain', task.id);
                                    e.dataTransfer.effectAllowed = 'move';
                                    setDraggedKanbanTaskId(task.id);
                                  }}
                                  onDragEnd={() => {
                                    setDraggedKanbanTaskId(null);
                                    setDragOverStage(null);
                                  }}
                                  className={`p-3.5 rounded-xl border transition-all space-y-2.5 shadow-xs min-w-0 cursor-grab active:cursor-grabbing select-none ${
                                    isTaskBeingDragged
                                      ? 'opacity-40 border-dashed border-[#F84B11] scale-[0.98]'
                                      : isKanbanLight
                                      ? 'border-slate-200/90 bg-slate-50/70 hover:bg-white hover:border-slate-300'
                                      : 'border-[#232834] bg-[#090B0F] hover:border-[#384052]'
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                      <GripVertical className="w-3.5 h-3.5 text-[#717684] opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
                                      <span className="font-mono text-xs font-bold text-[#F84B11]">{task.id}</span>
                                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                                        isKanbanLight 
                                          ? 'bg-slate-100 text-slate-600 border-slate-200' 
                                          : 'bg-[#161922] text-[#94979E] border-[#232731]'
                                      }`}>
                                        {task.sku}
                                      </span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 ${
                                      task.priority === 'Critical'
                                        ? isKanbanLight
                                          ? 'bg-red-50 text-red-700 border-red-200'
                                          : 'bg-red-950 text-red-400 border-red-800/40'
                                        : task.priority === 'High'
                                        ? isKanbanLight
                                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                                          : 'bg-amber-950 text-amber-300 border-amber-800/40'
                                        : isKanbanLight
                                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                                          : 'bg-zinc-800 text-zinc-300 border-zinc-700/40'
                                    }`}>
                                      {task.priority}
                                    </span>
                                  </div>

                                  <h4 className={`text-sm font-semibold leading-snug ${
                                    isKanbanLight ? 'text-slate-900' : 'text-white'
                                  }`}>
                                    {task.title}
                                  </h4>

                                  <div className={`flex items-center justify-between text-xs ${
                                    isKanbanLight ? 'text-slate-500' : 'text-[#94979E]'
                                  }`}>
                                    <span className="flex items-center gap-1.5">
                                      <Clock3 className="w-3.5 h-3.5 text-amber-500" />
                                      <span>{task.sla}</span>
                                    </span>
                                    <span className={`font-medium ${isKanbanLight ? 'text-slate-800' : 'text-white'}`}>
                                      {task.assignee}
                                    </span>
                                  </div>

                                  {/* Tactile Glove-Friendly Action Buttons */}
                                  <div className={`pt-2 border-t flex items-center gap-2 ${
                                    isKanbanLight ? 'border-slate-200' : 'border-[#1A1D24]'
                                  }`}>
                                    {stageKey !== 'intake' && (
                                      <button
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRegressKanbanTask(task.id);
                                        }}
                                        className={`py-2 px-3 rounded-lg text-xs font-semibold cursor-pointer border transition-colors ${
                                          isKanbanLight
                                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                                            : 'bg-[#161922] hover:bg-[#202533] text-zinc-300 border-[#262B37]'
                                        }`}
                                      >
                                        ← Back
                                      </button>
                                    )}
                                    {stageKey !== 'dispatch' ? (
                                      <button
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleAdvanceKanbanTask(task.id);
                                        }}
                                        className="flex-1 py-2 px-3 rounded-lg text-xs font-bold bg-[#F84B11] hover:bg-[#ff5d26] text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-[0.97]"
                                      >
                                        <span>Advance Stage</span>
                                        <span>→</span>
                                      </button>
                                    ) : (
                                      <div className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border ${
                                        isKanbanLight 
                                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                                          : 'bg-emerald-950/60 border-emerald-800/40 text-emerald-400'
                                      }`}>
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>Fulfillment Reconciled</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}

                            {tasksInStage.length === 0 && (
                              <div className={`h-24 rounded-lg border border-dashed flex flex-col items-center justify-center p-3 text-center transition-colors ${
                                isColumnDragOver
                                  ? 'border-[#F84B11] bg-[#F84B11]/10 text-[#F84B11]'
                                  : isKanbanLight
                                  ? 'border-slate-200 text-slate-400 bg-slate-50/50'
                                  : 'border-[#262C38] text-[#717684] bg-white/[0.01]'
                              }`}>
                                <span className="text-[10px] font-mono font-medium">
                                  {isColumnDragOver ? 'Drop task to assign here' : 'No work orders in stage'}
                                </span>
                                <span className="text-[9px] text-[#717684] mt-0.5">Drag any card here</span>
                              </div>
                            )}

                            {isColumnDragOver && tasksInStage.length > 0 && kanbanTasks.find(t => t.id === draggedKanbanTaskId)?.stage !== stageKey && (
                              <div className={`p-2 rounded-lg border-2 border-dashed flex items-center justify-center gap-1.5 text-[11px] font-mono font-medium transition-all animate-pulse ${
                                isKanbanLight 
                                  ? 'border-[#F84B11] bg-orange-100/60 text-[#F84B11]' 
                                  : 'border-[#F84B11]/60 bg-[#F84B11]/10 text-orange-400'
                              }`}>
                                <span>Drop to move here</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 3. MOBILE: SINGLE COLUMN THUMB FEED */}
                {activeLayoutDevice === 'mobile' && (
                  <div 
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      if (dragOverStage !== mobileActiveStage) {
                        setDragOverStage(mobileActiveStage);
                      }
                    }}
                    onDragLeave={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        if (dragOverStage === mobileActiveStage) {
                          setDragOverStage(null);
                        }
                      }
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const taskId = e.dataTransfer.getData('text/plain') || draggedKanbanTaskId;
                      if (taskId) {
                        handleDropKanbanTask(mobileActiveStage, taskId);
                      }
                    }}
                    className={`space-y-2.5 overflow-y-auto flex-1 min-h-0 pr-1 p-1 rounded-xl transition-all ${
                      dragOverStage === mobileActiveStage && draggedKanbanTaskId
                        ? 'ring-2 ring-[#F84B11]/50 bg-[#F84B11]/5'
                        : ''
                    } ${
                      isKanbanLight ? 'sandbox-light-scroll' : ''
                    }`}
                  >
                    {filteredKanbanTasks.filter(t => t.stage === mobileActiveStage).map(task => {
                      const isTaskBeingDragged = draggedKanbanTaskId === task.id;
                      return (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', task.id);
                            e.dataTransfer.effectAllowed = 'move';
                            setDraggedKanbanTaskId(task.id);
                          }}
                          onDragEnd={() => {
                            setDraggedKanbanTaskId(null);
                            setDragOverStage(null);
                          }}
                          className={`p-3 rounded-xl border space-y-2 shadow-xs transition-all min-w-0 cursor-grab active:cursor-grabbing select-none ${
                            isTaskBeingDragged
                              ? 'opacity-40 border-dashed border-[#F84B11] scale-[0.98]'
                              : isKanbanLight
                              ? 'border-slate-200/90 bg-white hover:border-slate-300'
                              : 'border-[#20242E] bg-[#0E1015] hover:border-[#2C303B]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <GripVertical className="w-3.5 h-3.5 text-[#717684] opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
                              <span className="font-mono text-xs font-bold text-[#F84B11]">{task.id}</span>
                              <span className={`text-[10px] font-mono ${isKanbanLight ? 'text-slate-500' : 'text-[#717684]'}`}>
                                {task.sku}
                              </span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border shrink-0 ${
                              task.priority === 'Critical'
                                ? isKanbanLight
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : 'bg-red-950 text-red-400 border-red-800/40'
                                : task.priority === 'High'
                                ? isKanbanLight
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-amber-950 text-amber-300 border-amber-800/40'
                                : isKanbanLight
                                  ? 'bg-slate-100 text-slate-700 border-slate-200'
                                  : 'bg-zinc-800 text-zinc-300 border-zinc-700/40'
                            }`}>
                              {task.priority}
                            </span>
                          </div>

                          <h4 className={`text-xs font-semibold leading-snug ${
                            isKanbanLight ? 'text-slate-900' : 'text-white'
                          }`}>
                            {task.title}
                          </h4>

                          <div className={`flex items-center justify-between text-[10.5px] ${
                            isKanbanLight ? 'text-slate-500' : 'text-[#717684]'
                          }`}>
                            <span className="flex items-center gap-1">
                              <Clock3 className="w-3 h-3 text-amber-500" />
                              <span>{task.sla}</span>
                            </span>
                            <span className={isKanbanLight ? 'text-slate-700 font-medium' : 'text-zinc-300'}>
                              {task.assignee}
                            </span>
                          </div>

                          <div className={`pt-1.5 border-t flex items-center gap-2 ${
                            isKanbanLight ? 'border-slate-200' : 'border-[#1A1D24]'
                          }`}>
                            {task.stage !== 'intake' && (
                              <button
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRegressKanbanTask(task.id);
                                }}
                                className={`py-1.5 px-3 rounded-lg text-xs font-medium cursor-pointer border transition-colors ${
                                  isKanbanLight
                                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                                    : 'bg-[#161922] text-zinc-300 border-[#262B37]'
                                }`}
                              >
                                ←
                              </button>
                            )}
                            {task.stage !== 'dispatch' ? (
                              <button
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAdvanceKanbanTask(task.id);
                                }}
                                className="flex-1 py-2 rounded-lg text-xs font-bold bg-[#F84B11] hover:bg-[#ff5d26] text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.97]"
                              >
                                <span>Advance to Next Stage</span>
                                <span>→</span>
                              </button>
                            ) : (
                              <div className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 border ${
                                isKanbanLight
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                  : 'bg-emerald-950/60 border-emerald-800/40 text-emerald-400'
                              }`}>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Dispatched & Verified</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {filteredKanbanTasks.filter(t => t.stage === mobileActiveStage).length === 0 && (
                      <div className={`h-28 rounded-xl border border-dashed flex flex-col items-center justify-center p-3 text-center transition-colors ${
                        dragOverStage === mobileActiveStage && draggedKanbanTaskId
                          ? 'border-[#F84B11] bg-[#F84B11]/10 text-[#F84B11]'
                          : isKanbanLight
                          ? 'border-slate-200 text-slate-400 bg-slate-50/50'
                          : 'border-[#20242E] text-[#717684] bg-white/[0.01]'
                      }`}>
                        <span className="text-xs font-mono font-medium">
                          {dragOverStage === mobileActiveStage && draggedKanbanTaskId ? 'Drop task to assign here' : 'No work orders in this stage'}
                        </span>
                        <span className="text-[10px] text-[#717684] mt-0.5">Drag any task or switch stages above</span>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Mobile Home Indicator Simulation */}
              {activeLayoutDevice === 'mobile' && (
                <div className="pt-2 flex justify-center shrink-0">
                  <div className={`w-28 h-1 rounded-full transition-colors ${
                    isKanbanLight ? 'bg-slate-300' : 'bg-[#333846]'
                  }`} />
                </div>
              )}

            </div>

          </div>

        </div>

        {/* 3 Value Callout Cards for Multi-Device Responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <div className="p-5 rounded-xl border border-[#1F232B] bg-[#0E1015] interactive-card cursor-default">
            <div className="flex items-center gap-2 mb-2 text-[#F84B11]">
              <Monitor className="w-4 h-4" />
              <div className="text-[11px] font-semibold uppercase tracking-wider">Ergonomic Specialization</div>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Tailored Per Form Factor</h3>
            <p className="text-xs text-[#94979E] leading-relaxed">
              We never cram desktop spreadsheets into a mobile browser. Every screen resolution gets specialized interaction patterns: dense multi-column command hubs on 4K monitors and thumb-friendly vertical feeds on mobile.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#1F232B] bg-[#0E1015] interactive-card cursor-default">
            <div className="flex items-center gap-2 mb-2 text-emerald-400">
              <Barcode className="w-4 h-4" />
              <div className="text-[11px] font-semibold uppercase tracking-wider">Warehouse Floor Ready</div>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Glove-Friendly Touch Targets</h3>
            <p className="text-xs text-[#94979E] leading-relaxed">
              Tablet interfaces feature +30% larger hitboxes designed for industrial operators wearing protective gloves, paired with direct hardware/camera barcode laser integration.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#1F232B] bg-[#0E1015] interactive-card cursor-default">
            <div className="flex items-center gap-2 mb-2 text-blue-400">
              <Zap className="w-4 h-4 fill-current" />
              <div className="text-[11px] font-semibold uppercase tracking-wider">Sub-Millisecond Edge Sync</div>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">&lt; 0.2ms LAN Replication</h3>
            <p className="text-xs text-[#94979E] leading-relaxed">
              When a forklift driver advances a pallet on their rugged tablet, the dispatcher's 4K desktop board updates immediately over your local office LAN with zero cloud latency.
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
