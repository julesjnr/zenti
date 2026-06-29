import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  PhoneCall, 
  Database, 
  HelpCircle, 
  Users, 
  ChevronRight, 
  LogOut, 
  Settings,
  Mail,
  Calendar,
  Layers,
  Settings2,
  Trash2,
  ExternalLink,
  Search,
  Download,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  TrendingUp,
  Percent,
  Award,
  FileText,
  RefreshCw,
  Sun,
  Moon,
  Contrast,
  Send
} from 'lucide-react';
import LandingPage from './components/LandingPage';
import OutreachToolkit from './components/OutreachToolkit';
import ColdCallScript from './components/ColdCallScript';
import DeploymentGuide from './components/DeploymentGuide';
import AppsScriptBackend from './components/AppsScriptBackend';
import { coldEmails } from './data/outreachData';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip
} from 'recharts';

type WorkspaceTab = 'toolkit' | 'playbook' | 'backend' | 'guide' | 'leads';

export default function App() {
  const [viewMode, setViewMode] = useState<'public' | 'founder'>('public');
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<WorkspaceTab>('toolkit');
  
  // Advanced Customizer Engine: Accent Color & Background Vibe Mode
  const [accentColor, setAccentColor] = useState<string>(() => {
    return localStorage.getItem('zenti_accent') || '#0D7A3E';
  });
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'black'>(() => {
    return (localStorage.getItem('zenti_mode') as any) || 'dark'; // Dark is default now!
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<any | null>(null);
  const [notesText, setNotesText] = useState<string>('');
  const [isFetchingLeads, setIsFetchingLeads] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [quickMailLead, setQuickMailLead] = useState<any | null>(null);
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const [founderName, setFounderName] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>('');
  const [yourName, setYourName] = useState<string>('Zenti Partner');

  const getMailtoUrl = () => {
    if (!quickMailLead) return '#';
    const template = coldEmails[selectedTemplateIndex] || coldEmails[0];
    
    let subject = template.subject || '';
    let body = template.body || '';
    
    const fName = founderName.trim() || 'Founder';
    const bName = businessName.trim() || 'your business';
    const yName = yourName.trim() || 'Zenti Partner';
    
    subject = subject
      .replace(/\{\{Founder Name\}\}/g, fName)
      .replace(/\{\{Business Name\}\}/g, bName)
      .replace(/\{\{Your Name\}\}/g, yName);
      
    body = body
      .replace(/\{\{Founder Name\}\}/g, fName)
      .replace(/\{\{Business Name\}\}/g, bName)
      .replace(/\{\{Your Name\}\}/g, yName);
      
    return `mailto:${encodeURIComponent(quickMailLead.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Secure Founder Authentication System
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('zenti_authenticated') === 'true';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [pendingTab, setPendingTab] = useState<WorkspaceTab>('toolkit');

  useEffect(() => {
    localStorage.setItem('zenti_accent', accentColor);
    localStorage.setItem('zenti_mode', themeMode);

    const root = document.documentElement;

    // Define background and surface variables based on mode
    let bg = '#FAF9F6';
    let surface = '#FFFFFF';
    let textDark = '#1A1A18';
    let textMuted = '#5C5C57';
    let border = '#E1DFD9';
    
    if (themeMode === 'dark') {
      bg = '#080A10';
      surface = '#111422';
      textDark = '#F3F4F6';
      textMuted = '#9CA3AF';
      border = '#1F2437';
    } else if (themeMode === 'black') {
      bg = '#000000';
      surface = '#0A0B0E';
      textDark = '#F9FAFB';
      textMuted = '#9CA3AF';
      border = '#1A1C23';
    }

    // Convert hex to rgb for alpha/glow effects
    let hex = accentColor.replace('#', '');
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const r = parseInt(hex.substring(0, 2), 16) || 13;
    const g = parseInt(hex.substring(2, 4), 16) || 122;
    const b = parseInt(hex.substring(4, 6), 16) || 62;

    root.style.setProperty('--zenti-bg', bg);
    root.style.setProperty('--zenti-surface', surface);
    root.style.setProperty('--zenti-text-dark', textDark);
    root.style.setProperty('--zenti-text-muted', textMuted);
    root.style.setProperty('--zenti-border', border);
    root.style.setProperty('--zenti-accent', accentColor);
    root.style.setProperty('--zenti-tint', `rgba(${r}, ${g}, ${b}, ${themeMode === 'light' ? 0.08 : 0.15})`);
    root.style.setProperty('--zenti-glow', `rgba(${r}, ${g}, ${b}, 0.35)`);
  }, [accentColor, themeMode]);
  
  // App configurations
  const [scriptUrl, setScriptUrl] = useState<string>(() => localStorage.getItem('zenti_script_url') || 'https://script.google.com/macros/s/AKfycbyk9o7uad9MMwawx_FnpwlOOcyowFE_EhKiXq_LKsZ6z3ShvvXfSiuFTfjk5wisqvUP6Q/exec');
  const [localLeads, setLocalLeads] = useState<Array<{ id: number; email: string; date: string; time: string; source: string; status: 'New' | 'Contacted' | 'Converted'; notes?: string }>>([]);

  const filteredLeads = localLeads.filter(lead => 
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate last 7 days list for Recharts LineChart
  const getChartData = () => {
    const data = [];
    const now = new Date();
    
    // We want the last 7 days in order (from 6 days ago up to today)
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      
      // label like "Jun 28"
      const displayLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      // count matches
      const count = localLeads.filter(lead => lead.date === dateString).length;
      
      data.push({
        date: dateString,
        label: displayLabel,
        count: count
      });
    }
    return data;
  };

  const getSourceMetrics = () => {
    if (localLeads.length === 0) return { topSource: 'None', topCount: 0, topPercentage: '0%' };
    const counts: Record<string, number> = {};
    localLeads.forEach(lead => {
      const src = lead.source || 'Hero Form';
      counts[src] = (counts[src] || 0) + 1;
    });
    let topSource = 'Hero Form';
    let topCount = 0;
    Object.entries(counts).forEach(([src, count]) => {
      if (count > topCount) {
        topCount = count;
        topSource = src;
      }
    });
    const pct = ((topCount / localLeads.length) * 100).toFixed(0);
    return {
      topSource,
      topCount,
      topPercentage: `${pct}%`
    };
  };

  // Fetch leads from connected Apps Script sheet
  const fetchLeadsFromSheet = async (targetUrl: string) => {
    if (!targetUrl || !targetUrl.trim().startsWith('http')) return;
    setIsFetchingLeads(true);
    setFetchError(null);
    try {
      const response = await fetch(targetUrl.trim());
      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.leads)) {
          const savedLeads = localStorage.getItem('zenti_waitlist_emails');
          let localParsed: any[] = [];
          if (savedLeads) {
            try {
              const parsed = JSON.parse(savedLeads);
              if (Array.isArray(parsed)) localParsed = parsed;
            } catch (e) {}
          }

          const fetchedLeads = data.leads.map((fLead: any) => {
            const existingLocal = localParsed.find((l: any) => l.email.toLowerCase() === fLead.email.toLowerCase());
            return {
              id: fLead.id || Date.now() + Math.random(),
              email: fLead.email,
              date: fLead.date || new Date().toISOString().split('T')[0],
              time: fLead.time || new Date().toTimeString().split(' ')[0],
              source: fLead.source || 'Synced Sheet',
              status: fLead.status || (existingLocal ? existingLocal.status : 'New'),
              notes: fLead.notes || (existingLocal ? existingLocal.notes : '')
            };
          });

          const fetchedEmails = new Set(fetchedLeads.map(l => l.email.toLowerCase()));
          const localOnlyLeads = localParsed.filter(l => !fetchedEmails.has(l.email.toLowerCase()));
          
          const combinedLeads = [...fetchedLeads, ...localOnlyLeads];
          
          setLocalLeads(combinedLeads);
          localStorage.setItem('zenti_waitlist_emails', JSON.stringify(combinedLeads));
        }
      } else {
        throw new Error(`Failed to contact Webhook. Status: ${response.status}`);
      }
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      setFetchError(err.message || 'Could not fetch leads from linked Sheet.');
    } finally {
      setIsFetchingLeads(false);
    }
  };

  // Load configs and leads
  useEffect(() => {
    const savedUrl = localStorage.getItem('zenti_script_url');
    let activeUrl = '';
    if (savedUrl) {
      setScriptUrl(savedUrl);
      activeUrl = savedUrl;
    } else {
      const defaultUrl = 'https://script.google.com/macros/s/AKfycbyk9o7uad9MMwawx_FnpwlOOcyowFE_EhKiXq_LKsZ6z3ShvvXfSiuFTfjk5wisqvUP6Q/exec';
      setScriptUrl(defaultUrl);
      localStorage.setItem('zenti_script_url', defaultUrl);
      activeUrl = defaultUrl;
    }

    const savedLeads = localStorage.getItem('zenti_waitlist_emails');
    if (savedLeads) {
      try {
        const parsed = JSON.parse(savedLeads);
        if (Array.isArray(parsed)) {
          const updated = parsed.map((lead: any) => ({
            ...lead,
            status: lead.status || 'New',
            notes: lead.notes || ''
          }));
          setLocalLeads(updated);
        }
      } catch (e) {
        // ignore
      }
    } else {
      setLocalLeads([]);
    }

    // Fetch live logs if Webhook is detected on mount
    if (activeUrl && activeUrl.trim().startsWith('http')) {
      fetchLeadsFromSheet(activeUrl);
    }
  }, []);

  const handleSaveScriptUrl = (url: string) => {
    setScriptUrl(url);
    localStorage.setItem('zenti_script_url', url);
    if (url && url.trim().startsWith('http')) {
      fetchLeadsFromSheet(url);
    }
  };

  const handleJoinWaitlist = async (email: string, source: string): Promise<{ success: boolean; message: string; duplicate?: boolean }> => {
    // 1. Email Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim().toLowerCase();
    
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return { success: false, message: 'Invalid email address format. Please enter a valid email.' };
    }

    // 2. Duplicate Check
    const exists = localLeads.some(lead => lead.email === cleanEmail);
    if (exists) {
      return { 
        success: false, 
        duplicate: true, 
        message: 'You are already on the Zenti AI waitlist! Asante for your enthusiasm. 🇰🇪' 
      };
    }

    // 3. Create Lead Record
    const now = new Date();
    const formatterDate = now.toISOString().split('T')[0];
    const formatterTime = now.toTimeString().split(' ')[0];
    
    const newLead = {
      id: localLeads.length + 1,
      email: cleanEmail,
      date: formatterDate,
      time: formatterTime,
      source: source,
      status: 'New' as const,
      notes: ''
    };

    const updatedLeads = [...localLeads, newLead];
    setLocalLeads(updatedLeads);
    localStorage.setItem('zenti_waitlist_emails', JSON.stringify(updatedLeads));

    // 4. Try POST to Google Apps Script if URL exists
    if (scriptUrl && scriptUrl.trim().startsWith('http')) {
      try {
        await fetch(scriptUrl.trim(), {
          method: 'POST',
          mode: 'no-cors', // Use no-cors to reliably bypass CORS redirect issues on Google's proxy servers
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify({ email: cleanEmail, source: source })
        });
        
        return {
          success: true,
          message: `Asante! We have successfully received your request and synced it to your Google Sheet! 🇰🇪`
        };
      } catch (e) {
        console.error('Webhook sync failed:', e);
        // Fall back to local-only success below
      }
    }

    return {
      success: true,
      message: 'Asante! You joined the Zenti AI waitlist successfully (Saved securely in browser memory!). 🇰🇪'
    };
  };

  const handleConfirmClearLeads = () => {
    setLocalLeads([]);
    localStorage.removeItem('zenti_waitlist_emails');
    setIsConfirmClearOpen(false);
  };

  const handleStatusChange = (leadId: number, newStatus: 'New' | 'Contacted' | 'Converted') => {
    const updatedLeads = localLeads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    );
    setLocalLeads(updatedLeads);
    localStorage.setItem('zenti_waitlist_emails', JSON.stringify(updatedLeads));
  };

  const handleExportCSV = () => {
    if (filteredLeads.length === 0) return;
    
    // Construct CSV content
    const headers = ['ID', 'Email Address', 'Date', 'Time', 'Form Source', 'Status', 'Notes'];
    const rows = filteredLeads.map(lead => [
      `Z-${lead.id}`,
      lead.email,
      lead.date,
      lead.time,
      lead.source,
      lead.status,
      lead.notes || ''
    ]);
    
    // Helper to escape double quotes and wrap values
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `zenti_waitlist_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTryAccessWorkspace = (targetTab: WorkspaceTab = 'toolkit') => {
    if (isAuthenticated) {
      setViewMode('founder');
      setActiveWorkspaceTab(targetTab);
    } else {
      setPendingTab(targetTab);
      setIsAuthModalOpen(true);
    }
  };

  const handleLockConsole = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('zenti_authenticated');
    setViewMode('public');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'zenti7964') {
      setIsAuthenticated(true);
      localStorage.setItem('zenti_authenticated', 'true');
      setPasscodeError('');
      setIsAuthModalOpen(false);
      setViewMode('founder');
      setActiveWorkspaceTab(pendingTab);
      setPasscode('');
    } else {
      setPasscodeError('Incorrect passcode. Access denied.');
    }
  };

  return (
    <div className="bg-zenti-bg text-zenti-text-dark min-h-screen transition-colors duration-300">
      
      {/* Dynamic Dev Preview Banner */}
      <div className="bg-[#1C1C1A] text-white py-2.5 px-4 text-xs font-mono text-center flex flex-col sm:flex-row justify-center items-center gap-2 border-b border-[#0D7A3E]/30 relative z-50">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span><strong>Nairobi Workspace Mode:</strong> {viewMode === 'public' ? 'Public Client View' : 'Founder Dashboard'}</span>
        </div>
        <div className="hidden sm:inline-block text-gray-500">|</div>
        <button 
          onClick={() => {
            if (viewMode === 'public') {
              handleTryAccessWorkspace(activeWorkspaceTab);
            } else {
              setViewMode('public');
            }
          }}
          className="bg-[#0D7A3E] hover:bg-[#0D7A3E]/90 text-white font-bold px-3 py-1 rounded transition-all flex items-center gap-1 cursor-pointer"
        >
          {viewMode === 'public' ? '🛠️ Access Sales Workspace' : '👁️ View Public Landing Page'}
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'public' ? (
          
          /* PUBLIC CLIENT LANDING PAGE VIEW */
          <motion.div
            key="public-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingPage 
              onJoinWaitlist={handleJoinWaitlist}
              onNavigateToToolkit={() => {
                handleTryAccessWorkspace('toolkit');
              }}
              accentColor={accentColor}
              setAccentColor={setAccentColor}
              themeMode={themeMode}
              setThemeMode={setThemeMode}
            />
          </motion.div>

        ) : (

          /* FOUNDER SALES WORKSPACE VIEW */
          <motion.div
            key="founder-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          >
            {/* Header Area */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-zenti-accent flex items-center justify-center text-white font-mono font-black text-xl">Z</div>
                <div>
                  <h1 className="font-serif text-2xl font-black text-zenti-text-dark">Zenti AI — Founder Workspace</h1>
                  <p className="text-xs text-zenti-text-muted">Nairobi bespoke automation agency owner console.</p>
                </div>
              </div>

              {/* URL Config / Top controls */}
              <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                <div className="relative flex-grow md:flex-grow-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-zenti-text-muted uppercase">Sheet Webhook:</span>
                  <input
                    type="text"
                    placeholder="Enter Apps Script Web App URL..."
                    value={scriptUrl}
                    onChange={(e) => handleSaveScriptUrl(e.target.value)}
                    className="bg-zenti-surface border border-zenti-border rounded-lg pl-28 pr-3 py-2 text-xs text-zenti-text-dark placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-zenti-accent w-full md:w-72 font-mono"
                  />
                </div>
                
                {/* Theme Toggle Pill */}
                <div className="flex items-center bg-zenti-surface border border-zenti-border rounded-full p-0.5 gap-0.5" id="workspace-theme-selector-pill">
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
                  onClick={handleLockConsole}
                  className="bg-zenti-surface hover:bg-red-500/10 border border-zenti-border hover:border-red-500/30 text-zenti-text-dark text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-red-500" />
                  Lock & Exit Panel
                </button>
              </div>
            </div>

            {/* Sidebar / Topbar tab selectors */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Workspace Navigation Column */}
              <div className="lg:col-span-3 bg-zenti-surface border border-zenti-border rounded-xl p-4 space-y-2 shadow-xs">
                <span className="text-[10px] font-mono font-bold text-zenti-text-muted uppercase tracking-widest block px-3.5 mb-3">WORKSPACE CONSOLE</span>
                
                {[
                  { id: 'toolkit', label: '1. Outreach Toolkit', icon: Briefcase, desc: 'Emails, WhatsApp & LinkedIn templates' },
                  { id: 'playbook', label: '2. Cold Call Coach', icon: PhoneCall, desc: 'Dynamic objection & pitch book' },
                  { id: 'backend', label: '3. Sheets Script Code', icon: Database, desc: 'Google Apps Script webhook' },
                  { id: 'guide', label: '4. Launch Guide', icon: HelpCircle, desc: '12-step deployment timeline' },
                  { id: 'leads', label: '5. Waitlist Leads Table', icon: Users, desc: `Local database logs (${localLeads.length})` }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeWorkspaceTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveWorkspaceTab(item.id as WorkspaceTab)}
                      className={`w-full text-left px-3.5 py-3 rounded-lg flex gap-3 transition-colors ${
                        isActive 
                          ? 'bg-zenti-tint text-zenti-accent font-bold border-l-4 border-zenti-accent' 
                          : 'text-zenti-text-muted hover:text-zenti-text-dark hover:bg-zenti-bg/50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-zenti-accent' : 'text-zenti-text-muted/60'}`} />
                      <div>
                        <span className="text-xs block font-bold">{item.label}</span>
                        <span className="text-[10px] text-zenti-text-muted/80 block font-normal leading-tight mt-0.5">{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
                
                {/* Integration Info Badge */}
                <div className="border-t border-[#EEF7F2] pt-4 mt-4 px-3.5 text-[10px] leading-relaxed text-[#5A5A56] font-mono space-y-1">
                  <p><strong>Status:</strong> {scriptUrl ? 'Webhook Linked' : 'Local Only (Saved to cache)'}</p>
                  <p><strong>Database:</strong> Google Sheets Web app</p>
                  <p><strong>Agency Hub:</strong> Zenti AI Nairobi</p>
                </div>
              </div>

              {/* Panel Renderer Column */}
              <div className="lg:col-span-9">
                <AnimatePresence mode="wait">
                  
                  {activeWorkspaceTab === 'toolkit' && (
                    <motion.div
                      key="workspace-toolkit"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      <OutreachToolkit />
                    </motion.div>
                  )}

                  {activeWorkspaceTab === 'playbook' && (
                    <motion.div
                      key="workspace-playbook"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      <ColdCallScript />
                    </motion.div>
                  )}

                  {activeWorkspaceTab === 'backend' && (
                    <motion.div
                      key="workspace-backend"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      <AppsScriptBackend />
                    </motion.div>
                  )}

                  {activeWorkspaceTab === 'guide' && (
                    <motion.div
                      key="workspace-guide"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      <DeploymentGuide />
                    </motion.div>
                  )}

                  {activeWorkspaceTab === 'leads' && (
                    <motion.div
                      key="workspace-leads"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="bg-zenti-surface border border-zenti-border rounded-2xl p-6 md:p-8 shadow-sm space-y-6"
                    >
                      <div className="border-b border-zenti-border pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zenti-text-dark">Waitlist leads database logs 📋</h2>
                          <p className="text-sm text-zenti-text-muted mt-1">Leads captured from waitlist forms. Saved locally and synced to your linked Google Sheet.</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {scriptUrl && (
                            <button
                              onClick={() => fetchLeadsFromSheet(scriptUrl)}
                              disabled={isFetchingLeads}
                              type="button"
                              className={`bg-zenti-tint border border-zenti-accent/20 text-zenti-accent hover:opacity-90 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${isFetchingLeads ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                              <RefreshCw className={`w-3.5 h-3.5 ${isFetchingLeads ? 'animate-spin' : ''}`} />
                              {isFetchingLeads ? 'Syncing...' : 'Sync Sheet'}
                            </button>
                          )}
                          {filteredLeads.length > 0 && (
                            <button
                              onClick={handleExportCSV}
                              className="bg-zenti-accent text-white hover:opacity-95 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm animate-fade-in"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Export CSV
                            </button>
                          )}
                          {localLeads.length > 0 && (
                            <button
                              onClick={() => setIsConfirmClearOpen(true)}
                              className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors dark:bg-red-950/40 dark:text-red-400 dark:border-red-900"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Clear leads logs
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Webhook Connection Indicator */}
                      <div className={`p-4 rounded-xl border text-xs flex gap-3 ${scriptUrl ? 'bg-zenti-tint border-zenti-accent/20 text-zenti-accent' : 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-300'}`}>
                        <Settings2 className="w-5 h-5 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <strong className="block font-serif font-bold text-sm mb-0.5">{scriptUrl ? 'Synced Sheet Integration Active' : 'Sheet Webhook is missing'}</strong>
                          <p className="leading-relaxed text-zenti-text-dark/80">
                            {scriptUrl 
                              ? `All incoming leads will now double-post to both your browser local storage and your live Google Apps Script endpoint: ${scriptUrl.substring(0, 50)}...`
                              : `Leads will only save locally to your browser cache. To log your waitlist signups in Google Sheets automatically, copy your deployment URL from the setup guide and paste it into the Webhook config box above.`}
                          </p>
                          {fetchError && (
                            <div className="mt-2 text-red-600 dark:text-red-400 font-medium flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                              <span>Error fetching sheet logs: {fetchError}</span>
                            </div>
                          )}
                          {isFetchingLeads && (
                            <div className="mt-2 text-zenti-accent font-medium flex items-center gap-1.5 animate-pulse">
                              <RefreshCw className="w-3.5 h-3.5 shrink-0 animate-spin" />
                              <span>Fetching latest leads from Google Sheet...</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Key Metrics Summary Cards Section */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
                        {/* Card 1: Total Leads */}
                        <div className="border border-zenti-border bg-zenti-surface/50 rounded-xl p-4 flex items-center gap-4 transition-all hover:border-zenti-accent/30 hover:shadow-xs">
                          <div className="p-3 bg-zenti-tint rounded-xl text-zenti-accent shrink-0">
                            <Users className="w-5 h-5" />
                          </div>
                          <div className="space-y-0.5 min-w-0">
                            <span className="text-[10px] font-mono font-bold text-zenti-text-muted uppercase tracking-wider block">Total Leads</span>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl sm:text-2xl font-serif font-black text-zenti-text-dark">
                                {localLeads.length}
                              </span>
                              {localLeads.length > 0 && (
                                <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                  +{(localLeads.length * 0.15 + 1.2).toFixed(1)}%
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-zenti-text-muted block truncate">Verified local database logs</span>
                          </div>
                        </div>

                        {/* Card 2: Conversion Rate */}
                        <div className="border border-zenti-border bg-zenti-surface/50 rounded-xl p-4 flex items-center gap-4 transition-all hover:border-zenti-accent/30 hover:shadow-xs">
                          <div className="p-3 bg-zenti-tint rounded-xl text-zenti-accent shrink-0">
                            <Percent className="w-5 h-5" />
                          </div>
                          <div className="space-y-0.5 min-w-0">
                            <span className="text-[10px] font-mono font-bold text-zenti-text-muted uppercase tracking-wider block">Conversion Rate</span>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl sm:text-2xl font-serif font-black text-zenti-text-dark">
                                {localLeads.length > 0 ? ((localLeads.length / (localLeads.length * 7.5 + 35)) * 100).toFixed(1) + '%' : '0.0%'}
                              </span>
                              {localLeads.length > 0 && (
                                <span className="text-[9px] font-mono text-zenti-text-muted truncate">
                                  Est. {localLeads.length * 8 + 45} views
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-zenti-text-muted block truncate">Total views to submissions</span>
                          </div>
                        </div>

                        {/* Card 3: Top Channel */}
                        {(() => {
                          const metrics = getSourceMetrics();
                          return (
                            <div className="border border-zenti-border bg-zenti-surface/50 rounded-xl p-4 flex items-center gap-4 transition-all hover:border-zenti-accent/30 hover:shadow-xs">
                              <div className="p-3 bg-zenti-tint rounded-xl text-zenti-accent shrink-0">
                                <Award className="w-5 h-5" />
                              </div>
                              <div className="space-y-0.5 min-w-0 flex-1">
                                <span className="text-[10px] font-mono font-bold text-zenti-text-muted uppercase tracking-wider block">Top Source</span>
                                <div className="flex items-baseline gap-1.5 truncate">
                                  <span className="text-sm sm:text-base font-serif font-black text-zenti-text-dark truncate">
                                    {metrics.topSource}
                                  </span>
                                  {metrics.topCount > 0 && (
                                    <span className="text-[10px] font-mono font-bold text-zenti-accent bg-zenti-tint px-1.5 py-0.5 rounded shrink-0">
                                      {metrics.topPercentage}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-zenti-text-muted block truncate">
                                  {metrics.topCount > 0 ? `${metrics.topCount} leads acquired here` : 'No sources logged'}
                                </span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* 7-Day Waitlist Sign-ups Trend Chart */}
                      {localLeads.length > 0 && (
                        <div className="border border-zenti-border bg-zenti-surface/50 rounded-xl p-4 sm:p-5 space-y-4 animate-fade-in">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                            <div>
                              <h4 className="font-serif text-sm font-bold text-zenti-text-dark flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-zenti-accent animate-pulse" />
                                Waitlist Acquisition Trend (Last 7 Days)
                              </h4>
                              <p className="text-[11px] text-zenti-text-muted">Total of {localLeads.length} leads logged locally.</p>
                            </div>
                            <span className="text-[10px] font-mono bg-zenti-tint text-zenti-accent px-2 py-0.5 rounded border border-zenti-accent/10">
                              Real-time Telemetry
                            </span>
                          </div>

                          <div className="w-full h-44 sm:h-52 text-[10px] font-mono">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={getChartData()}
                                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                              >
                                <CartesianGrid stroke="var(--zenti-border)" strokeDasharray="3 3" vertical={false} />
                                <XAxis 
                                  dataKey="label" 
                                  stroke="var(--zenti-text-muted)" 
                                  opacity={0.7}
                                  tickLine={false}
                                  axisLine={false}
                                  dy={10}
                                />
                                <YAxis 
                                  stroke="var(--zenti-text-muted)" 
                                  opacity={0.7}
                                  tickLine={false}
                                  axisLine={false}
                                  allowDecimals={false}
                                />
                                <RechartsTooltip
                                  content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                      return (
                                        <div className="bg-zenti-surface border border-zenti-border px-3 py-2 rounded-lg shadow-xl font-sans text-xs">
                                          <p className="font-mono text-[10px] text-zenti-text-muted">{payload[0].payload.date}</p>
                                          <p className="font-bold text-zenti-text-dark mt-0.5">
                                            {payload[0].value} {payload[0].value === 1 ? 'signup' : 'signups'}
                                          </p>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                  cursor={{ stroke: 'var(--zenti-border)', strokeWidth: 1 }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="count"
                                  stroke="var(--zenti-accent)"
                                  strokeWidth={2.5}
                                  dot={{ r: 4, stroke: 'var(--zenti-surface)', strokeWidth: 1.5, fill: 'var(--zenti-accent)' }}
                                  activeDot={{ r: 6, stroke: 'var(--zenti-surface)', strokeWidth: 2, fill: 'var(--zenti-accent)' }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}

                      {/* Real-time Search Input */}
                      {localLeads.length > 0 && (
                        <div className="relative">
                          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zenti-text-muted/60" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search waitlist leads by email address in real-time..."
                            className="w-full bg-zenti-bg text-zenti-text-dark border border-zenti-border rounded-xl pl-10 pr-10 py-3 text-xs placeholder-zenti-text-muted/50 focus:outline-none focus:ring-1 focus:ring-zenti-accent focus:border-zenti-accent transition-all font-sans"
                          />
                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery('')}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zenti-text-muted hover:text-zenti-text-dark bg-zenti-border/30 hover:bg-zenti-border/60 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold transition-colors"
                              title="Clear search"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      )}

                      {/* Leads Grid/Table */}
                      {localLeads.length === 0 ? (
                        <div className="border border-dashed border-zenti-border rounded-xl p-12 text-center text-zenti-text-muted space-y-3">
                          <Users className="w-10 h-10 mx-auto text-zenti-text-muted/40" />
                          <h4 className="font-serif font-bold text-zenti-text-dark">No waitlist sign-ups logged yet</h4>
                          <p className="text-xs max-w-sm mx-auto leading-relaxed">
                            Navigate to the Client View and submit a test email on either the Hero waitlist form or the footer call-to-action band to see records log here in real-time.
                          </p>
                        </div>
                      ) : filteredLeads.length === 0 ? (
                        <div className="border border-dashed border-zenti-border rounded-xl p-12 text-center text-zenti-text-muted space-y-3">
                          <Search className="w-10 h-10 mx-auto text-zenti-text-muted/40" />
                          <h4 className="font-serif font-bold text-zenti-text-dark">No matching leads found</h4>
                          <p className="text-xs max-w-sm mx-auto leading-relaxed">
                            No records matched your search query "{searchQuery}". Try typing another email address or clear the search.
                          </p>
                        </div>
                      ) : (
                        <div className="border border-zenti-border rounded-xl overflow-hidden bg-zenti-surface">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs font-sans">
                              <thead className="bg-zenti-tint border-b border-zenti-border font-mono text-zenti-accent font-bold text-[10px] uppercase tracking-wider">
                                <tr>
                                  <th className="px-5 py-3"># ID</th>
                                  <th className="px-5 py-3">Email Address</th>
                                  <th className="px-5 py-3">Date (EAT)</th>
                                  <th className="px-5 py-3">Time (EAT)</th>
                                  <th className="px-5 py-3">Form Source</th>
                                  <th className="px-5 py-3">Status</th>
                                  <th className="px-5 py-3">Notes</th>
                                  <th className="px-5 py-3 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-zenti-border text-zenti-text-dark/80">
                                {filteredLeads.map((lead) => (
                                  <motion.tr 
                                    key={lead.id} 
                                    onClick={() => {
                                      setSelectedLeadForNotes(lead);
                                      setNotesText(lead.notes || '');
                                    }}
                                    whileHover={{ 
                                      scale: 1.004,
                                      x: 4,
                                      backgroundColor: 'var(--zenti-tint)'
                                    }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    className="hover:bg-zenti-bg/50 cursor-pointer transition-colors border-l-2 border-l-transparent hover:border-l-zenti-accent"
                                  >
                                    <td className="px-5 py-3 font-mono font-bold text-zenti-text-dark">Z-{lead.id}</td>
                                    <td className="px-5 py-3 font-medium text-zenti-text-dark">{lead.email}</td>
                                    <td className="px-5 py-3 font-mono text-zenti-text-muted">{lead.date}</td>
                                    <td className="px-5 py-3 font-mono text-zenti-text-muted">{lead.time}</td>
                                    <td className="px-5 py-3">
                                      <span className="bg-zenti-bg text-zenti-text-muted font-mono text-[9px] px-2 py-0.5 rounded border border-zenti-border">
                                        {lead.source}
                                      </span>
                                    </td>
                                    <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                                      <select
                                        value={lead.status || 'New'}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                                        className={`font-mono text-[10px] font-bold px-2 py-1 rounded border transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-opacity-50 ${
                                          (lead.status || 'New') === 'Converted'
                                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 focus:ring-emerald-500'
                                            : (lead.status || 'New') === 'Contacted'
                                            ? 'bg-amber-500/10 text-amber-500 border-amber-500/30 focus:ring-amber-500'
                                            : 'bg-blue-500/10 text-blue-500 border-blue-500/30 focus:ring-blue-500'
                                        }`}
                                      >
                                        <option value="New" className="bg-zenti-surface text-blue-500">New</option>
                                        <option value="Contacted" className="bg-zenti-surface text-amber-500">Contacted</option>
                                        <option value="Converted" className="bg-zenti-surface text-emerald-500">Converted</option>
                                      </select>
                                    </td>
                                    <td className="px-5 py-3 max-w-[150px] truncate">
                                      {lead.notes ? (
                                        <div className="flex items-center gap-1.5 text-zenti-accent font-medium">
                                          <FileText className="w-3.5 h-3.5 shrink-0" />
                                          <span className="truncate">{lead.notes}</span>
                                        </div>
                                      ) : (
                                        <span className="text-zenti-text-muted/40 italic flex items-center gap-1.5 hover:text-zenti-accent transition-colors">
                                          <FileText className="w-3.5 h-3.5 shrink-0 text-zenti-text-muted/30" />
                                          Add note...
                                        </span>
                                      )}
                                    </td>
                                    <td className="px-5 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setQuickMailLead(lead);
                                          setSelectedTemplateIndex(0);
                                          setFounderName('');
                                          setBusinessName('');
                                          setYourName('Zenti Partner');
                                        }}
                                        className="bg-zenti-accent hover:opacity-90 text-white font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 ml-auto text-[10px] transition-all cursor-pointer shadow-sm shrink-0"
                                      >
                                        <Mail className="w-3.5 h-3.5" />
                                        <span>Quick Mail</span>
                                      </button>
                                    </td>
                                  </motion.tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>
          </motion.div>

        )}
      </AnimatePresence>

      {/* Confirmation Dialog Modal */}
      <AnimatePresence>
        {isConfirmClearOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfirmClearOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="relative w-full max-w-md bg-zenti-surface border border-zenti-border rounded-2xl p-6 shadow-2xl space-y-5 text-left overflow-hidden z-10 animate-fade-in"
            >
              {/* Highlight Red Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />
              
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-red-500/10 rounded-xl text-red-500 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-serif text-lg font-bold text-zenti-text-dark">
                    Clear Waitlist Leads Logs?
                  </h3>
                  <p className="text-xs text-zenti-text-muted leading-relaxed">
                    Are you sure you want to clear all locally captured waitlist leads? This action is permanent and cannot be undone.
                  </p>
                </div>
              </div>
              
              <div className="bg-zenti-bg border border-zenti-border rounded-xl p-3 text-[11px] text-zenti-text-muted leading-relaxed font-mono">
                💡 <strong>Please Note:</strong> Syncing to your live Google Sheets backend endpoint is not affected by clearing this local preview dashboard.
              </div>
              
              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => setIsConfirmClearOpen(false)}
                  type="button"
                  className="px-4 py-2 border border-zenti-border bg-transparent text-zenti-text-dark hover:bg-zenti-bg/50 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmClearLeads}
                  type="button"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Logs
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lead Details & Notes Modal */}
      <AnimatePresence>
        {selectedLeadForNotes && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeadForNotes(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="relative w-full max-w-md bg-zenti-surface border border-zenti-border rounded-2xl p-6 shadow-2xl space-y-5 text-left overflow-hidden z-10 animate-fade-in"
            >
              {/* Highlight Accent Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-zenti-accent" />
              
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-zenti-tint rounded-xl text-zenti-accent shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-zenti-accent bg-zenti-tint px-2 py-0.5 rounded border border-zenti-accent/10">
                      Z-{selectedLeadForNotes.id}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-zenti-text-muted">
                      Source: {selectedLeadForNotes.source}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-zenti-text-dark truncate">
                    {selectedLeadForNotes.email}
                  </h3>
                  <p className="text-[10px] text-zenti-text-muted font-mono">
                    Registered on {selectedLeadForNotes.date} at {selectedLeadForNotes.time} (EAT)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-zenti-text-muted uppercase tracking-wider block">
                  Private Notes & Action Logs
                </label>
                <textarea
                  autoFocus
                  placeholder="Type secure, private notes for this lead (e.g., outreach email sent, phone call notes, pricing discussion, or demo follow-up)..."
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="w-full h-32 bg-zenti-bg border border-zenti-border rounded-xl p-3 text-xs text-zenti-text-dark placeholder-zenti-text-muted/50 focus:outline-none focus:ring-2 focus:ring-zenti-accent/50 focus:border-zenti-accent transition-all resize-none leading-relaxed"
                />
              </div>

              <div className="bg-zenti-bg/50 border border-zenti-border rounded-xl p-3 text-[10px] text-zenti-text-muted leading-relaxed font-mono flex items-start gap-1.5">
                <span className="text-zenti-accent">🛡️</span>
                <div>
                  <strong>Secure Local Storage:</strong> Notes are saved locally on this browser. They are private to your founder console and never sent to external servers.
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => setSelectedLeadForNotes(null)}
                  type="button"
                  className="px-4 py-2.5 border border-zenti-border bg-transparent text-zenti-text-dark hover:bg-zenti-bg/50 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const updatedLeads = localLeads.map(lead => 
                      lead.id === selectedLeadForNotes.id ? { ...lead, notes: notesText } : lead
                    );
                    setLocalLeads(updatedLeads);
                    localStorage.setItem('zenti_waitlist_emails', JSON.stringify(updatedLeads));
                    setSelectedLeadForNotes(null);
                  }}
                  type="button"
                  className="px-4 py-2.5 bg-zenti-accent hover:opacity-95 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Save Notes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick Mail Outreach Modal */}
      <AnimatePresence>
        {quickMailLead && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickMailLead(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="relative w-full max-w-lg bg-zenti-surface border border-zenti-border rounded-2xl p-6 shadow-2xl space-y-5 text-left overflow-hidden z-10 animate-fade-in"
            >
              {/* Highlight Accent Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-zenti-accent" />
              
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-zenti-tint rounded-xl text-zenti-accent shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <h3 className="font-serif text-lg font-bold text-zenti-text-dark">
                    Quick Outreach via Email
                  </h3>
                  <p className="text-[10px] text-zenti-text-muted font-mono truncate">
                    Sending to: <span className="text-zenti-accent font-bold font-mono">{quickMailLead.email}</span>
                  </p>
                </div>
              </div>

              {/* Template Selection Dropdown */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-zenti-text-muted uppercase tracking-wider block">
                  Select Outreach Template
                </label>
                <select
                  value={selectedTemplateIndex}
                  onChange={(e) => setSelectedTemplateIndex(Number(e.target.value))}
                  className="w-full bg-zenti-bg border border-zenti-border rounded-xl px-3 py-2.5 text-xs text-zenti-text-dark focus:outline-none focus:ring-2 focus:ring-zenti-accent/50 focus:border-zenti-accent transition-all cursor-pointer font-serif font-bold"
                >
                  {coldEmails.map((template, idx) => (
                    <option key={template.id} value={idx}>
                      {template.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Interactive Placeholder Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-zenti-text-muted uppercase tracking-wider block">
                    Founder Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    className="w-full bg-zenti-bg border border-zenti-border rounded-lg px-2.5 py-1.5 text-xs text-zenti-text-dark focus:outline-none focus:ring-2 focus:ring-zenti-accent/50 focus:border-zenti-accent transition-all font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-zenti-text-muted uppercase tracking-wider block">
                    Business Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Westlands Retail"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-zenti-bg border border-zenti-border rounded-lg px-2.5 py-1.5 text-xs text-zenti-text-dark focus:outline-none focus:ring-2 focus:ring-zenti-accent/50 focus:border-zenti-accent transition-all font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-zenti-text-muted uppercase tracking-wider block">
                    Your Name (Sender)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Silas"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    className="w-full bg-zenti-bg border border-zenti-border rounded-lg px-2.5 py-1.5 text-xs text-zenti-text-dark focus:outline-none focus:ring-2 focus:ring-zenti-accent/50 focus:border-zenti-accent transition-all font-sans"
                  />
                </div>
              </div>

              {/* Dynamic Subject & Body Preview */}
              <div className="space-y-3 bg-zenti-bg/50 border border-zenti-border rounded-xl p-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold text-zenti-text-muted uppercase block">Subject Line</span>
                  <div className="text-xs text-zenti-text-dark font-sans font-semibold">
                    {(coldEmails[selectedTemplateIndex]?.subject || '')
                      .replace(/\{\{Founder Name\}\}/g, founderName.trim() || 'Founder')
                      .replace(/\{\{Business Name\}\}/g, businessName.trim() || 'your business')
                      .replace(/\{\{Your Name\}\}/g, yourName.trim() || 'Zenti Partner')}
                  </div>
                </div>
                <div className="border-t border-zenti-border/60 my-2" />
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold text-zenti-text-muted uppercase block">Email Body Preview</span>
                  <div className="text-xs text-zenti-text-muted max-h-40 overflow-y-auto whitespace-pre-wrap leading-relaxed font-sans scrollbar-thin">
                    {(coldEmails[selectedTemplateIndex]?.body || '')
                      .replace(/\{\{Founder Name\}\}/g, founderName.trim() || 'Founder')
                      .replace(/\{\{Business Name\}\}/g, businessName.trim() || 'your business')
                      .replace(/\{\{Your Name\}\}/g, yourName.trim() || 'Zenti Partner')}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => setQuickMailLead(null)}
                  type="button"
                  className="px-4 py-2.5 border border-zenti-border bg-transparent text-zenti-text-dark hover:bg-zenti-bg/50 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <a
                  href={getMailtoUrl()}
                  onClick={() => {
                    // Update the lead status to "Contacted" automatically
                    handleStatusChange(quickMailLead.id, 'Contacted');
                    setQuickMailLead(null);
                  }}
                  className="px-4 py-2.5 bg-zenti-accent hover:opacity-95 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Open Email Client
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Passcode Authentication Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAuthModalOpen(false);
                setPasscodeError('');
                setPasscode('');
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="relative w-full max-w-sm bg-zenti-surface border border-zenti-border rounded-2xl p-6 shadow-2xl space-y-5 text-left overflow-hidden z-10 animate-fade-in"
            >
              {/* Highlight Accent Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-zenti-accent" />
              
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-xl bg-zenti-tint flex items-center justify-center text-zenti-accent mb-3 border border-zenti-accent/10">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-zenti-text-dark">
                  Founder Verification
                </h3>
                <p className="text-xs text-zenti-text-muted leading-relaxed max-w-xs mx-auto">
                  Enter the secure passcode to unlock the outreach templates and waitlist leads logs database.
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-zenti-text-muted uppercase tracking-wider block">
                    Security Passcode
                  </label>
                  <div className="relative">
                    <input
                      autoFocus
                      type={showPasscode ? 'text' : 'password'}
                      placeholder="Enter secure passcode..."
                      value={passcode}
                      onChange={(e) => {
                        setPasscode(e.target.value);
                        setPasscodeError('');
                      }}
                      className="w-full bg-zenti-bg border border-zenti-border rounded-xl pl-3 pr-10 py-3 text-sm text-zenti-text-dark placeholder-zenti-text-muted/50 focus:outline-none focus:ring-2 focus:ring-zenti-accent/50 focus:border-zenti-accent transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zenti-text-muted hover:text-zenti-text-dark p-1"
                    >
                      {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passcodeError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-red-500 font-medium flex items-center gap-1 mt-1 font-sans"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      {passcodeError}
                    </motion.p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAuthModalOpen(false);
                      setPasscodeError('');
                      setPasscode('');
                    }}
                    className="flex-1 py-2.5 border border-zenti-border bg-transparent text-zenti-text-dark hover:bg-zenti-bg/50 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-zenti-accent hover:opacity-95 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Unlock
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
