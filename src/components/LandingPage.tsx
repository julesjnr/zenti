import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  ChevronRight, 
  Coins, 
  FileText, 
  Bell, 
  Cpu, 
  ArrowRight,
  Sparkles,
  Zap,
  Mail,
  Smartphone,
  Palette,
  Moon,
  Sun,
  Contrast
} from 'lucide-react';

interface LandingPageProps {
  onJoinWaitlist: (email: string, source: string) => Promise<{ success: boolean; message: string; duplicate?: boolean }>;
  onNavigateToToolkit: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  themeMode: 'light' | 'dark' | 'black';
  setThemeMode: (mode: 'light' | 'dark' | 'black') => void;
}

const tickerTasks = [
  { id: 1, text: "M-Pesa Reconciliation", desc: "Verifying code QTX891J2D...", icon: Coins, color: "text-zenti-accent", badge: "Running" },
  { id: 2, text: "WhatsApp Auto-Reply", desc: "Answering Kilimani Salon pricing booking...", icon: MessageSquare, color: "text-blue-600", badge: "Running" },
  { id: 3, text: "Low Inventory Warning", desc: "Sending SMS: Sugar stock below 5 bags!", icon: Bell, color: "text-amber-500", badge: "Done" },
  { id: 4, text: "Rent Invoice PDF", desc: "Generating invoice #2048 for Westlands apt...", icon: FileText, color: "text-purple-600", badge: "Done" },
  { id: 5, text: "Daily Sales Report", desc: "Mailing end-of-day Excel summary to owner...", icon: TrendingUp, color: "text-emerald-600", badge: "Queued" },
  { id: 6, text: "New Customer Parsing", desc: "Saving lead details from WhatsApp to CRM...", icon: Cpu, color: "text-teal-600", badge: "Queued" }
];

export default function LandingPage({ 
  onJoinWaitlist, 
  onNavigateToToolkit, 
  accentColor, 
  setAccentColor, 
  themeMode, 
  setThemeMode 
}: LandingPageProps) {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [message1, setMessage1] = useState({ text: '', isError: false });
  const [message2, setMessage2] = useState({ text: '', isError: false });
  const [waitlistCount, setWaitlistCount] = useState(240);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [shouldAnimateInput, setShouldAnimateInput] = useState(false);

  const emailInputRef = React.useRef<HTMLInputElement>(null);

  const focusAndHighlightInput = () => {
    // Smooth scroll to waitlist section
    const section = document.getElementById('join-waitlist-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Focus the input element
    setTimeout(() => {
      if (emailInputRef.current) {
        emailInputRef.current.focus();
        setShouldAnimateInput(true);
        setTimeout(() => setShouldAnimateInput(false), 2000);
      }
    }, 300);
  };

  // Cycle the live automation ticker panel every 2.4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prevIndex) => (prevIndex + 1) % tickerTasks.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  // Sync signup count from localStorage if any
  useEffect(() => {
    const saved = localStorage.getItem('zenti_waitlist_emails');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWaitlistCount(240 + parsed.length);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent, formId: 1 | 2) => {
    e.preventDefault();
    const email = formId === 1 ? email1 : email2;
    const setLoading = formId === 1 ? setLoading1 : setLoading2;
    const setMessage = formId === 1 ? setMessage1 : setMessage2;

    if (!email) return;

    setLoading(true);
    setMessage({ text: '', isError: false });

    try {
      const response = await onJoinWaitlist(email, formId === 1 ? 'Hero Form' : 'Footer Form');
      if (response.success) {
        setMessage({ text: response.message, isError: false });
        setRegisteredEmail(email);
        setShowSuccessModal(true);
        if (formId === 1) setEmail1('');
        else setEmail2('');
        
        // Refresh local count
        const saved = localStorage.getItem('zenti_waitlist_emails');
        if (saved) {
          setWaitlistCount(240 + JSON.parse(saved).length);
        }
      } else {
        setMessage({ text: response.message, isError: !response.duplicate });
        if (response.duplicate) {
          setRegisteredEmail(email);
          setShowSuccessModal(true);
        }
      }
    } catch (err) {
      setMessage({ text: 'Unable to connect to service. Saved locally!', isError: false });
      setRegisteredEmail(email);
      setShowSuccessModal(true);
    } finally {
      setLoading(false);
    }
  };

  const currentTask = tickerTasks[tickerIndex];

  return (
    <div className="bg-zenti-bg text-zenti-text-dark font-sans min-h-screen selection:bg-zenti-tint selection:text-zenti-accent transition-colors duration-300">
      
      {/* Fixed Navigation */}
      <nav id="landing-nav" className="fixed top-0 left-0 right-0 bg-zenti-bg/95 backdrop-blur-md border-b border-zenti-border z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-lg bg-zenti-accent flex items-center justify-center text-white font-mono font-bold text-lg">Z</span>
              <span className="font-serif text-xl font-bold tracking-tight text-zenti-text-dark">Zenti <span className="text-zenti-accent">AI</span></span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium text-zenti-text-muted hover:text-zenti-text-dark transition-colors">What We Automate</a>
              <a href="#how-it-works" className="text-sm font-medium text-zenti-text-muted hover:text-zenti-text-dark transition-colors">The Process</a>
              <a href="#pricing" className="text-sm font-medium text-zenti-text-muted hover:text-zenti-text-dark transition-colors">Pricing</a>
              <button 
                onClick={onNavigateToToolkit} 
                className="text-sm font-medium text-zenti-accent hover:text-zenti-accent/80 flex items-center gap-1 transition-colors px-3 py-1 rounded bg-zenti-tint border border-zenti-accent/20"
                id="btn-nav-toolkit"
              >
                 Sales Toolkit
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle Pill */}
              <div className="flex items-center bg-zenti-surface border border-zenti-border rounded-full p-0.5 gap-0.5" id="theme-selector-pill">
                <button
                  type="button"
                  onClick={() => setThemeMode('light')}
                  className={`p-1.5 rounded-full transition-all cursor-pointer ${themeMode === 'light' ? 'bg-zenti-accent text-white shadow-sm' : 'text-zenti-text-muted hover:text-zenti-text-dark hover:bg-zenti-bg/50'}`}
                  title="Light Mode"
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setThemeMode('dark')}
                  className={`p-1.5 rounded-full transition-all cursor-pointer ${themeMode === 'dark' ? 'bg-zenti-accent text-white shadow-sm' : 'text-zenti-text-muted hover:text-zenti-text-dark hover:bg-zenti-bg/50'}`}
                  title="Dark Mode"
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setThemeMode('black')}
                  className={`p-1.5 rounded-full transition-all cursor-pointer ${themeMode === 'black' ? 'bg-zenti-accent text-white shadow-sm' : 'text-zenti-text-muted hover:text-zenti-text-dark hover:bg-zenti-bg/50'}`}
                  title="Midnight Black Mode"
                >
                  <Contrast className="w-3.5 h-3.5" />
                </button>
              </div>

              <button 
                onClick={(e) => {
                  e.preventDefault();
                  focusAndHighlightInput();
                }}
                className="bg-zenti-accent text-white hover:bg-zenti-accent/95 text-sm font-medium px-4 py-2 rounded-lg transition-colors inline-block whitespace-nowrap cursor-pointer"
                id="btn-nav-join"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="landing-hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Public Value Pitch */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 bg-zenti-tint border border-zenti-accent/20 text-zenti-accent text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Bespoke AI Workflows for Nairobi SMEs 🇰🇪
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-zenti-text-dark leading-[1.1] tracking-tight font-medium">
                Stop doing work a <br />
                <span className="italic relative inline-block">
                  machine
                  <span className="absolute left-0 right-0 bottom-1 h-[6px] bg-zenti-accent/20 rounded -skew-x-12"></span>
                </span> can do for you.
              </h1>
              
              <p className="text-zenti-text-muted text-lg sm:text-xl max-w-2xl leading-relaxed">
                We build custom background AI automations for Kenyan businesses—automatically tracking M-Pesa till notifications, answering clients 24/7 on WhatsApp, auto-generating PDF invoices, and emailing your daily reports. No new software to learn.
              </p>

              {/* Waitlist Subscription */}
              <div id="join-waitlist-section" className="max-w-md">
                <form onSubmit={(e) => handleSubmit(e, 1)} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zenti-text-muted" />
                    <input 
                      ref={emailInputRef}
                      type="email"
                      required
                      placeholder="Enter your work email"
                      value={email1}
                      onChange={(e) => setEmail1(e.target.value)}
                      className={`w-full bg-zenti-surface border border-zenti-border rounded-xl pl-10 pr-4 py-3.5 text-sm text-zenti-text-dark placeholder-zenti-text-muted focus:outline-none focus:ring-2 focus:ring-zenti-accent/20 focus:border-zenti-accent transition-all duration-300 ${shouldAnimateInput ? 'ring-4 ring-zenti-accent/40 border-zenti-accent scale-[1.03] shadow-lg shadow-zenti-accent/10' : ''}`}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading1}
                    className="bg-zenti-accent hover:opacity-95 disabled:opacity-50 text-white font-medium px-6 py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-md shrink-0"
                  >
                    {loading1 ? 'Joining...' : 'Get Early Access'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>

                <AnimatePresence mode="wait">
                  {message1.text && (
                    <motion.p 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`text-xs mt-3 font-medium ${message1.isError ? 'text-red-500' : 'text-zenti-accent'}`}
                    >
                      {message1.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Social Proof Avatars */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-zenti-bg bg-emerald-700 flex items-center justify-center text-white text-[10px] font-bold">JM</div>
                  <div className="w-8 h-8 rounded-full border-2 border-zenti-bg bg-teal-700 flex items-center justify-center text-white text-[10px] font-bold">WK</div>
                  <div className="w-8 h-8 rounded-full border-2 border-zenti-bg bg-zenti-accent flex items-center justify-center text-white text-[10px] font-bold">AO</div>
                  <div className="w-8 h-8 rounded-full border-2 border-zenti-bg bg-gray-800 flex items-center justify-center text-white text-[10px] font-bold">EN</div>
                </div>
                <div className="text-xs text-zenti-text-muted">
                  <span className="font-bold text-zenti-text-dark">{waitlistCount}+ Nairobi founders</span> on the waitlist
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Live Automation Ticker Panel */}
            <div className="lg:col-span-5">
              <div className="bg-zenti-surface border border-zenti-border rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-zenti-tint"></div>
                
                <div className="flex items-center justify-between border-b border-zenti-border pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zenti-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-zenti-accent"></span>
                    </span>
                    <span className="text-xs font-mono font-bold tracking-wider text-zenti-text-muted uppercase">Zenti Automated Ticker</span>
                  </div>
                  <span className="text-[10px] font-mono text-zenti-accent bg-zenti-tint px-2 py-0.5 rounded font-medium">Auto-pilot (Active)</span>
                </div>

                {/* Automation Cycling Output */}
                <div className="h-64 flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentTask.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 flex-grow flex flex-col justify-center"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-zenti-tint">
                          <currentTask.icon className="w-6 h-6 text-zenti-accent" />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg font-bold text-zenti-text-dark">{currentTask.text}</h4>
                          <p className="text-sm text-zenti-text-muted font-mono mt-1">{currentTask.desc}</p>
                        </div>
                      </div>

                      {/* Fake Terminal Log Output */}
                      <div className="bg-gray-950 rounded-lg p-3 text-emerald-400 font-mono text-xs space-y-1 overflow-hidden h-24">
                        <p className="text-gray-500 text-[10px]">&gt; Initializing background webhook listener...</p>
                        <p className="text-gray-400 text-[10px]">&gt; Webhook hit received from Safaricom/WhatsApp API</p>
                        <p className="text-emerald-500">&gt; SUCCESS: {currentTask.text} processed.</p>
                        <p className="text-gray-600 text-[9px]">&gt; Latency: 42ms | Execution thread: #Z-{currentTask.id}048</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Ticker Selector Indicators */}
                  <div className="border-t border-zenti-border pt-4 flex justify-between items-center text-xs text-zenti-text-muted">
                    <span className="font-mono">Task {currentTask.id} of {tickerTasks.length}</span>
                    <div className="flex gap-1.5">
                      {tickerTasks.map((task, idx) => (
                        <button 
                          key={task.id}
                          onClick={() => setTickerIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${idx === tickerIndex ? 'bg-zenti-accent w-5' : 'bg-zenti-border'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between text-xs font-mono font-bold text-zenti-text-muted tracking-widest uppercase">
        <div className="flex-grow h-px bg-zenti-border"></div>
        <span className="mx-6 px-4 py-1.5 border border-zenti-border rounded-full bg-zenti-surface">What we automate</span>
        <div className="flex-grow h-px bg-zenti-border"></div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
              Bespoke automations built for your actual operational pain.
            </h2>
            <p className="text-zenti-text-muted text-lg">
              We don&apos;t expect you to log into another dashboard. We write script rules that run silently behind the systems you already use every single hour.
            </p>
          </div>

          {/* Bordered Grid (Not floating cards) */}
          <div className="border-t border-l border-zenti-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Service 01 */}
            <div className="border-r border-b border-zenti-border p-8 bg-zenti-surface hover:bg-zenti-tint/30 transition-colors group">
              <span className="font-mono text-zenti-accent font-bold text-sm tracking-widest">01</span>
              <h3 className="font-serif text-xl font-bold mt-4 mb-3 text-zenti-text-dark">M-Pesa Reconciliation</h3>
              <p className="text-zenti-text-muted text-sm leading-relaxed">
                Connect your Safaricom Till or Paybill directly to Google Sheets or your custom CRM. The moment a transaction SMS arrives, the database is updated, receipts are mapped, and orders are marked paid instantly. No manual code-copying.
              </p>
            </div>

            {/* Service 02 */}
            <div className="border-r border-b border-zenti-border p-8 bg-zenti-surface hover:bg-zenti-tint/30 transition-colors group">
              <span className="font-mono text-zenti-accent font-bold text-sm tracking-widest">02</span>
              <h3 className="font-serif text-xl font-bold mt-4 mb-3 text-zenti-text-dark">WhatsApp Chatbots</h3>
              <p className="text-zenti-text-muted text-sm leading-relaxed">
                24/7 intelligent automated assistants on WhatsApp. Let your customers query pricing, request catalogue PDFs, check bookings, or log orders on the fly without having a support agent awake. It speaks English & Sheng perfectly.
              </p>
            </div>

            {/* Service 03 */}
            <div className="border-r border-b border-zenti-border p-8 bg-zenti-surface hover:bg-zenti-tint/30 transition-colors group">
              <span className="font-mono text-zenti-accent font-bold text-sm tracking-widest">03</span>
              <h3 className="font-serif text-xl font-bold mt-4 mb-3 text-zenti-text-dark">Daily Automated Reports</h3>
              <p className="text-zenti-text-muted text-sm leading-relaxed">
                Wake up to your exact sales summaries. We build scripts that scrape data from your point-of-sale or database, compile them into clean Excel formats, and push them directly to the owner&apos;s WhatsApp or email every day at 8:00 PM.
              </p>
            </div>

            {/* Service 04 */}
            <div className="border-r border-b border-zenti-border p-8 bg-zenti-surface hover:bg-zenti-tint/30 transition-colors group">
              <span className="font-mono text-zenti-accent font-bold text-sm tracking-widest">04</span>
              <h3 className="font-serif text-xl font-bold mt-4 mb-3 text-zenti-text-dark">Inventory & Stock Alerts</h3>
              <p className="text-zenti-text-muted text-sm leading-relaxed">
                Eliminate stockouts. Custom rules monitor your physical warehouse spreadsheet or sales database, sending instant WhatsApp/SMS notifications to your manager and purchase suppliers the minute stock of key items falls below safety limits.
              </p>
            </div>

            {/* Service 05 */}
            <div className="border-r border-b border-zenti-border p-8 bg-zenti-surface hover:bg-zenti-tint/30 transition-colors group">
              <span className="font-mono text-zenti-accent font-bold text-sm tracking-widest">05</span>
              <h3 className="font-serif text-xl font-bold mt-4 mb-3 text-zenti-text-dark">Document Generation</h3>
              <p className="text-zenti-text-muted text-sm leading-relaxed">
                Instantly turn spreadsheet records into beautifully formatted PDFs. Generate rental invoices, logistics waybills, quotes, or delivery logs and fire them off to customers in a single automatic click.
              </p>
            </div>

            {/* Service 06 */}
            <div className="border-r border-b border-zenti-border p-8 bg-zenti-surface hover:bg-zenti-tint/30 transition-colors group">
              <span className="font-mono text-zenti-accent font-bold text-sm tracking-widest">06</span>
              <h3 className="font-serif text-xl font-bold mt-4 mb-3 text-zenti-text-dark">Custom System Connectors</h3>
              <p className="text-zenti-text-muted text-sm leading-relaxed">
                We stitch your local Kenyan business stack together. Whether it&apos;s connecting your clinic schedule, your real estate catalog, your logistics tracker, or your bank accounts, we write the customized glue code so they talk seamlessly.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between text-xs font-mono font-bold text-zenti-text-muted tracking-widest uppercase">
        <div className="flex-grow h-px bg-zenti-border"></div>
        <span className="mx-6 px-4 py-1.5 border border-zenti-border rounded-full bg-zenti-surface">The process</span>
        <div className="flex-grow h-px bg-zenti-border"></div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-zenti-tint/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: 4 Steps */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-zenti-accent uppercase bg-zenti-tint border border-zenti-accent/20 px-3 py-1 rounded-full">Our 14-Day Blueprint</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zenti-text-dark">How we put your SME on auto-pilot</h2>
                <p className="text-zenti-text-muted text-base">We handle everything: system design, coding, integration, and host maintenance. Here&apos;s the straightforward process:</p>
              </div>

              <div className="space-y-8 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-zenti-border">
                
                {/* Step 1 */}
                <div className="relative pl-14">
                  <div className="absolute left-0 top-1 w-12 h-12 rounded-xl bg-zenti-surface border border-zenti-border flex items-center justify-center font-serif text-base font-bold text-zenti-accent shadow-sm">1</div>
                  <h4 className="text-lg font-serif font-bold text-zenti-text-dark">Discovery Call & Audit</h4>
                  <p className="text-sm text-zenti-text-muted mt-2 leading-relaxed">
                    We hop on a 20-minute call to dissect your operations. You show us your spreadsheets, your WhatsApp chats, and your manual bottlenecks. We map out which 3 repetitive tasks are costing you the most hours.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative pl-14">
                  <div className="absolute left-0 top-1 w-12 h-12 rounded-xl bg-zenti-surface border border-zenti-border flex items-center justify-center font-serif text-base font-bold text-zenti-accent shadow-sm">2</div>
                  <h4 className="text-lg font-serif font-bold text-zenti-text-dark">Automation Blueprint Plan</h4>
                  <p className="text-sm text-zenti-text-muted mt-2 leading-relaxed">
                    We return a 1-page design plan. It maps exactly where scripts will sit, what triggers them (e.g. M-Pesa SMS), what actions they take (e.g. write to Sheet), and how we secure data in Africa/Nairobi servers.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative pl-14">
                  <div className="absolute left-0 top-1 w-12 h-12 rounded-xl bg-zenti-surface border border-zenti-border flex items-center justify-center font-serif text-base font-bold text-zenti-accent shadow-sm">3</div>
                  <h4 className="text-lg font-serif font-bold text-zenti-text-dark">Build, Test & Launch</h4>
                  <p className="text-sm text-zenti-text-muted mt-2 leading-relaxed">
                    Our developers write the glue scripts and WhatsApp flows. We perform live testing (mock payments, sandbox messages) in under 7 days. Your staff gets a quick 1-hour session showing how it runs silently in the background.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="relative pl-14">
                  <div className="absolute left-0 top-1 w-12 h-12 rounded-xl bg-zenti-surface border border-zenti-border flex items-center justify-center font-serif text-base font-bold text-zenti-accent shadow-sm">4</div>
                  <h4 className="text-lg font-serif font-bold text-zenti-text-dark">24/7 Managed Maintenance</h4>
                  <p className="text-sm text-zenti-text-muted mt-2 leading-relaxed">
                    APIs change, sheets get edited, and systems break. We host and monitor your automations daily. If a webhook goes down, our Nairobi support desk is notified and we patch it before you even notice. You have a direct phone number to call.
                  </p>
                </div>

              </div>
            </div>

            {/* Right Column: Metrics Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="bg-zenti-surface border border-zenti-border rounded-2xl p-8 space-y-6 shadow-xl">
                <h4 className="font-serif text-xl font-bold text-zenti-text-dark border-b border-zenti-border pb-4">The Zenti SME ROI Matrix</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-zenti-tint p-4 rounded-xl border border-zenti-accent/15">
                    <span className="text-xs font-mono font-semibold text-zenti-accent block">WEEKLY TIME BUYBACK</span>
                    <span className="text-2xl font-serif font-bold text-zenti-text-dark mt-1 block">10–15 hrs</span>
                    <span className="text-xs text-zenti-text-muted mt-1 block">Saved per manager</span>
                  </div>
                  
                  <div className="bg-zenti-tint p-4 rounded-xl border border-zenti-accent/15">
                    <span className="text-xs font-mono font-semibold text-zenti-accent block">SPEED TO ROI</span>
                    <span className="text-2xl font-serif font-bold text-zenti-text-dark mt-1 block">~4 weeks</span>
                    <span className="text-xs text-zenti-text-muted mt-1 block">Breakeven on cost</span>
                  </div>

                  <div className="bg-zenti-tint p-4 rounded-xl border border-zenti-accent/15">
                    <span className="text-xs font-mono font-semibold text-zenti-accent block">SPEED TO GO-LIVE</span>
                    <span className="text-2xl font-serif font-bold text-zenti-text-dark mt-1 block">5–14 days</span>
                    <span className="text-xs text-zenti-text-muted mt-1 block">From audit to live run</span>
                  </div>

                  <div className="bg-zenti-tint p-4 rounded-xl border border-zenti-accent/15">
                    <span className="text-xs font-mono font-semibold text-zenti-accent block">HUMAN ERROR RATE</span>
                    <span className="text-2xl font-serif font-bold text-zenti-text-dark mt-1 block">0.00%</span>
                    <span className="text-xs text-zenti-text-muted mt-1 block">On payment matches</span>
                  </div>
                </div>

                <div className="text-xs text-zenti-text-muted font-mono leading-relaxed bg-zenti-bg p-3.5 rounded-lg border border-zenti-border">
                  💡 <strong>Founder Fact:</strong> The average retail shop in Nairobi wastes 50+ hours a month manually verifying payment codes. By replacing this with our background webhook, you effectively hire a digital operations manager for KES 500 a day.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between text-xs font-mono font-bold text-zenti-text-muted tracking-widest uppercase">
        <div className="flex-grow h-px bg-zenti-border"></div>
        <span className="mx-6 px-4 py-1.5 border border-zenti-border rounded-full bg-zenti-surface">Pricing</span>
        <div className="flex-grow h-px bg-zenti-border"></div>
      </div>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zenti-text-dark">Simple, predictable Kenyan pricing.</h2>
            <p className="text-zenti-text-muted text-base">No surprise hosting invoices or server bills. A single flat subscription that covers the build, API hosting, security, and continuous Nairobi support.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Tier 1: Starter */}
            <div className="bg-zenti-surface border border-zenti-border rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl transition-all relative">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-mono font-bold tracking-widest text-zenti-text-muted uppercase">Starter Plan</h4>
                  <span className="text-3xl font-serif font-bold text-zenti-text-dark mt-2 block">KES 10,000<span className="text-sm font-sans font-medium text-zenti-text-muted">/mo</span></span>
                  <p className="text-xs text-zenti-text-muted mt-2 leading-relaxed">Perfect for single-location clinics, restaurants, salons, or retail shops looking to streamline cash reconciliation and basic inquiries.</p>
                </div>
                
                <div className="h-px bg-zenti-border"></div>

                <ul className="space-y-3.5 text-sm text-zenti-text-dark">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Up to 2 custom automations (e.g. M-Pesa + Sheet)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>WhatsApp Booking or FAQ Bot</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Daily automated Excel reports</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Standard Safaricom/Daraja API sync</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Nairobi WhatsApp & Email support</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    focusAndHighlightInput();
                  }}
                  className="w-full bg-zenti-text-dark text-zenti-bg hover:opacity-90 text-center text-sm font-medium py-3 rounded-xl transition-all block cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Tier 2: Growth (Featured) */}
            <div className="bg-zenti-surface border-2 border-zenti-accent rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl transition-all relative shadow-sm">
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-zenti-accent text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-mono font-bold tracking-widest text-zenti-accent uppercase">Growth Plan</h4>
                  <span className="text-3xl font-serif font-bold text-zenti-text-dark mt-2 block">KES 25,000<span className="text-sm font-sans font-medium text-zenti-text-muted">/mo</span></span>
                  <p className="text-xs text-zenti-text-muted mt-2 leading-relaxed">Ideal for logistics hubs, multi-branch retailers, property management firms, and growing companies with complex multi-tool workflows.</p>
                </div>
                
                <div className="h-px bg-zenti-border"></div>

                <ul className="space-y-3.5 text-sm text-zenti-text-dark">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Up to 5 custom background automations</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Intelligent WhatsApp transactional checkout assistant</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Real-time stock monitoring & auto-ordering</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Auto-generation of PDF rent slips/waybills</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Priority 4-hour SLA tech patches & fixes</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>1-hour staff on-boarding training session</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    focusAndHighlightInput();
                  }}
                  className="w-full bg-zenti-accent text-white hover:bg-zenti-accent/90 text-center text-sm font-medium py-3 rounded-xl transition-all block cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Tier 3: Enterprise */}
            <div className="bg-zenti-surface border border-zenti-border rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl transition-all relative">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-mono font-bold tracking-widest text-zenti-text-muted uppercase">Enterprise</h4>
                  <span className="text-3xl font-serif font-bold text-zenti-text-dark mt-2 block">Custom Pricing</span>
                  <p className="text-xs text-zenti-text-muted mt-2 leading-relaxed">For large SACCOs, microfinance organizations, school systems, or manufacturing plants requiring dedicated instances, VPN setups, or custom ERP syncs.</p>
                </div>
                
                <div className="h-px bg-zenti-border"></div>

                <ul className="space-y-3.5 text-sm text-zenti-text-dark">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Unlimited automated scripts & modules</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Custom database design & secure hosting instances</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Legacy system integrations (Sage, QuickBooks, SAP)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Dedicated technical account lead (Nairobi)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zenti-accent mt-0.5 shrink-0" />
                    <span>Custom Service Level Agreement (99.9% uptime)</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <a href="mailto:hello@zentiai.co?subject=Zenti AI Enterprise Inquiry" className="w-full bg-zenti-text-dark text-zenti-bg hover:opacity-90 text-center text-sm font-medium py-3 rounded-xl transition-all block">Contact Us</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="bg-zenti-surface text-zenti-text-dark py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-zenti-border">
        {/* Subtle glow circle decoration */}
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-zenti-accent opacity-10 blur-3xl"></div>
        <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-zenti-accent opacity-5 blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-zenti-text-dark">Your team deserves better than copy-paste.</h2>
          <p className="text-zenti-text-muted text-lg sm:text-xl max-w-2xl mx-auto">
            Stop losing hours of family time matching transactional SMS text codes or generating receipt PDFs manually. Put Zenti&apos;s custom background bots to work today.
          </p>

          <div className="max-w-md mx-auto pt-4">
            <form onSubmit={(e) => handleSubmit(e, 2)} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email"
                required
                placeholder="Enter your email"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                className="flex-grow bg-zenti-bg border border-zenti-border rounded-xl px-4 py-3.5 text-sm text-zenti-text-dark placeholder-zenti-text-muted/60 focus:outline-none focus:ring-2 focus:ring-zenti-accent/50 focus:border-zenti-accent transition-all"
              />
              <button 
                type="submit" 
                disabled={loading2}
                className="bg-zenti-accent hover:bg-zenti-accent/90 disabled:bg-zenti-accent/70 text-white font-medium px-6 py-3.5 rounded-xl transition-all text-sm shrink-0 flex items-center justify-center gap-2"
              >
                {loading2 ? 'Joining...' : 'Secure Early Slot'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            <AnimatePresence mode="wait">
              {message2.text && (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-xs mt-3 font-medium ${message2.isError ? 'text-red-400' : 'text-emerald-400'}`}
                >
                  {message2.text}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zenti-surface border-t border-zenti-border py-12 px-4 sm:px-6 lg:px-8 text-xs text-zenti-text-muted">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded bg-zenti-accent flex items-center justify-center text-white font-mono font-bold text-sm">Z</span>
            <span className="font-serif text-base font-bold text-zenti-text-dark">Zenti AI</span>
          </div>
          
          <div className="flex items-center gap-1">
            Built in Nairobi, Kenya 🇰🇪 | <a href="mailto:hello@zentiai.co" className="hover:text-zenti-text-dark hover:underline font-medium ml-1">hello@zentiai.co</a>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onNavigateToToolkit} 
              className="hover:text-zenti-accent hover:underline font-semibold"
            >
              zenti toolkit Panel
            </button>
            <span>•</span>
            <a href="#services" className="hover:text-zenti-text-dark hover:underline">Services</a>
            <span>•</span>
            <a href="#pricing" className="hover:text-zenti-text-dark hover:underline">Pricing</a>
          </div>
        </div>
      </footer>

      {/* Celebration Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-zenti-surface border border-zenti-border rounded-2xl p-8 max-w-lg w-full text-center space-y-6 relative shadow-2xl"
            >
              <div className="mx-auto w-16 h-16 bg-zenti-tint text-zenti-accent rounded-full flex items-center justify-center animate-bounce mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-zenti-text-dark">You are on the Zenti Waitlist! 🎉</h3>
                <p className="text-zenti-text-muted text-sm">
                  We have added <span className="font-mono text-zenti-accent font-bold">{registeredEmail}</span> to the private early-access queue.
                </p>
              </div>

              <div className="bg-zenti-bg/50 border border-zenti-border p-4 rounded-xl space-y-3">
                <div className="flex justify-between text-xs border-b border-zenti-border pb-2">
                  <span className="text-zenti-text-muted">Your Position:</span>
                  <span className="font-bold text-zenti-text-dark">#{waitlistCount}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-zenti-border pb-2">
                  <span className="text-zenti-text-muted">Priority Tier:</span>
                  <span className="font-bold text-zenti-accent">Early SME Innovator 🇰🇪</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zenti-text-muted">Status:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Successfully Logged</span>
                </div>
              </div>

              <p className="text-xs text-zenti-text-muted leading-relaxed">
                As a waitlisted founder, you instantly unlock our private <strong>Sales & Pitch Toolkit</strong> to draft high-converting scripts and follow-ups.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccessModal(false);
                    onNavigateToToolkit();
                  }}
                  className="flex-1 bg-zenti-accent hover:opacity-90 text-white text-sm font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  🚀 Go to Sales Toolkit
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="bg-zenti-bg hover:bg-zenti-border border border-zenti-border text-zenti-text-dark text-sm font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer"
                >
                  Keep Browsing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
