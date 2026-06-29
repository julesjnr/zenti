import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Smartphone, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  AlertCircle,
  Plus,
  Minus,
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { 
  coldCallOpening, 
  industryHooks, 
  discoveryQuestions, 
  generalPitch, 
  industryPitches, 
  objections, 
  closeScripts, 
  prepChecklist 
} from '../data/coldCallData';

const steps = [
  { id: 1, title: 'Opening' },
  { id: 2, title: 'The Hook' },
  { id: 3, title: 'Discovery' },
  { id: 4, title: 'The Pitch' },
  { id: 5, title: 'Objections' },
  { id: 6, title: 'The Close' },
  { id: 7, title: 'Tracker' }
];

export default function ColdCallScript() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [selectedHookIndustry, setSelectedHookIndustry] = useState(industryHooks[0].industry);
  const [selectedPitchIndustry, setSelectedPitchIndustry] = useState(industryPitches[0].industry);
  
  // Objection active states
  const [expandedObjection, setExpandedObjection] = useState<number | null>(null);

  // Pre-call checklist states
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  // Tracker stats counters
  const [stats, setStats] = useState({
    callsMade: 0,
    pickedUp: 0,
    interested: 0,
    booked: 0
  });

  // Load tracker stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('zenti_tracker_stats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const saveStats = (newStats: typeof stats) => {
    setStats(newStats);
    localStorage.setItem('zenti_tracker_stats', JSON.stringify(newStats));
  };

  const handleStatChange = (key: keyof typeof stats, amount: number) => {
    const nextVal = Math.max(0, stats[key] + amount);
    const nextStats = { ...stats, [key]: nextVal };
    
    // Safety logical checks
    if (key === 'callsMade' && nextVal < stats.pickedUp) {
      nextStats.pickedUp = nextVal;
    }
    if (key === 'pickedUp') {
      if (nextVal > stats.callsMade) nextStats.callsMade = nextVal;
      if (nextVal < stats.interested) nextStats.interested = nextVal;
    }
    if (key === 'interested') {
      if (nextVal > stats.pickedUp) nextStats.pickedUp = nextVal;
      if (nextVal < stats.booked) nextStats.booked = nextVal;
    }
    if (key === 'booked' && nextVal > stats.interested) {
      nextStats.interested = nextVal;
    }
    
    saveStats(nextStats);
  };

  const handleResetStats = () => {
    if (window.confirm('Reset all call tracker logs for this session?')) {
      saveStats({ callsMade: 0, pickedUp: 0, interested: 0, booked: 0 });
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 7) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (!completedSteps.includes(next)) {
        setCompletedSteps([...completedSteps, next]);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleToggleChecklist = (id: string) => {
    setCheckedItems({ ...checkedItems, [id]: !checkedItems[id] });
  };

  return (
    <div className="bg-white border border-[#D8D6CF] rounded-2xl p-6 md:p-8 shadow-sm">
      
      {/* Title */}
      <div className="border-b border-[#EEF7F2] pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1C1A]">Zenti AI — Interactive Sales Playbook 📞</h2>
          <p className="text-sm text-[#5A5A56] mt-1">Real-time script coach, objections handle-book, and live session cold call tracker.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#EEF7F2] px-3.5 py-2 border border-[#0D7A3E]/10 rounded-full text-[#0D7A3E]">
          <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
          Active calling session
        </div>
      </div>

      {/* Progress Pills */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-xs font-mono text-[#5A5A56]">Sales Conversation Roadmap</span>
          <span className="text-xs font-mono text-[#0D7A3E] font-bold">Step {currentStep} of 7 — {steps[currentStep - 1].title}</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 md:gap-3">
          {steps.map((st) => {
            const isCompleted = completedSteps.includes(st.id);
            const isActive = currentStep === st.id;
            return (
              <button
                key={st.id}
                onClick={() => handleStepClick(st.id)}
                className={`h-2.5 sm:h-3.5 rounded-full transition-all relative group ${
                  isActive 
                    ? 'bg-[#0D7A3E]' 
                    : isCompleted 
                      ? 'bg-[#EEF7F2] border border-[#0D7A3E]/40' 
                      : 'bg-gray-200'
                }`}
                title={st.title}
              >
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-[#1C1C1A] text-white text-[10px] px-2 py-0.5 rounded font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {st.id}. {st.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Playbook Content Area */}
      <div className="min-h-[420px] border border-[#D8D6CF] rounded-xl overflow-hidden bg-[#F7F6F2]/30 flex flex-col justify-between mb-6">
        
        {/* Header Title */}
        <div className="bg-[#EEF7F2] border-b border-[#D8D6CF] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-[#0D7A3E] text-white font-mono text-xs font-bold flex items-center justify-center">{currentStep}</span>
            <h3 className="font-serif font-bold text-[#1C1C1A] text-base">{steps[currentStep - 1].title}</h3>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#5A5A56] font-bold">Zenti Sales Flow</span>
        </div>

        {/* Dynamic Panel Reader */}
        <div className="p-6 md:p-8 flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              
              {/* STEP 1: Opening */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <p className="text-sm text-[#5A5A56] leading-relaxed">
                    Start with confidence. Admit you are cold-calling. It disarms the prospect because it is honest and stands out from corporate robotic sales calls.
                  </p>
                  
                  <div className="bg-white border-l-4 border-[#0D7A3E] rounded-r-xl p-5 shadow-sm font-sans text-base leading-relaxed text-[#1C1C1A] whitespace-pre-wrap italic">
                    {coldCallOpening.script}
                  </div>

                  <div className="space-y-3 pt-3">
                    <h5 className="text-xs font-mono font-bold text-[#5A5A56] uppercase tracking-wider">How to handle: &quot;I&quot;m busy right now&quot;</h5>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 italic">
                      {coldCallOpening.handlingBusy}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: The Hook */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <p className="text-sm text-[#5A5A56] leading-relaxed">
                    Hit them immediately with a localized operational pain statement that matches their sector. Select their business type below to adjust your hook script:
                  </p>

                  {/* Industry Select Grid */}
                  <div className="flex flex-wrap gap-2">
                    {industryHooks.map((h) => (
                      <button
                        key={h.industry}
                        onClick={() => setSelectedHookIndustry(h.industry)}
                        className={`text-xs px-3.5 py-2 font-semibold rounded-lg border transition-all ${
                          selectedHookIndustry === h.industry
                            ? 'bg-[#0D7A3E] text-white border-transparent'
                            : 'bg-white text-[#5A5A56] border-[#D8D6CF] hover:border-[#0D7A3E]'
                        }`}
                      >
                        {h.industry}
                      </button>
                    ))}
                  </div>

                  {/* Render Industry Hook */}
                  <div className="bg-white border-l-4 border-[#0D7A3E] rounded-r-xl p-6 shadow-sm font-sans text-base leading-relaxed text-[#1C1C1A] italic">
                    {industryHooks.find(h => h.industry === selectedHookIndustry)?.hookText}
                  </div>
                </div>
              )}

              {/* STEP 3: Discovery */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <p className="text-sm text-[#5A5A56] leading-relaxed">
                    Ask open-ended questions. Your job here is to listen, identify their manual bottlenecks, and get them to complain about their repetitive tasks (M-Pesa, spreadsheets, reports).
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {discoveryQuestions.questions.map((q, idx) => (
                      <div key={idx} className="bg-white border border-[#D8D6CF] p-4 rounded-xl shadow-sm text-xs text-[#1C1C1A] space-y-2 flex gap-3">
                        <span className="font-mono font-bold text-[#0D7A3E] shrink-0 text-sm">Q{idx + 1}</span>
                        <p className="italic leading-relaxed">{q}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3">
                    <h5 className="text-xs font-mono font-bold text-[#5A5A56] uppercase tracking-wider mb-2">Transition Line to Pitch</h5>
                    <div className="bg-[#EEF7F2] border border-[#0D7A3E]/20 text-[#0D7A3E] rounded-xl p-4 text-xs italic font-semibold leading-relaxed">
                      {discoveryQuestions.transition}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: The Pitch */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <p className="text-sm text-[#5A5A56] leading-relaxed">
                    We don&apos;t build generic, confusing tools. We connect M-Pesa, WhatsApp, and spreadsheets in the background so their staff does nothing different. Review general pitch or switch to target sectors:
                  </p>

                  {/* Selector */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedPitchIndustry('General')}
                      className={`text-xs px-3.5 py-2 font-semibold rounded-lg border transition-all ${
                        selectedPitchIndustry === 'General'
                          ? 'bg-[#0D7A3E] text-white border-transparent'
                          : 'bg-white text-[#5A5A56] border-[#D8D6CF] hover:border-[#0D7A3E]'
                      }`}
                    >
                      General 2-Min Pitch
                    </button>
                    {industryPitches.map((p) => (
                      <button
                        key={p.industry}
                        onClick={() => setSelectedPitchIndustry(p.industry)}
                        className={`text-xs px-3.5 py-2 font-semibold rounded-lg border transition-all ${
                          selectedPitchIndustry === p.industry
                            ? 'bg-[#0D7A3E] text-white border-transparent'
                            : 'bg-white text-[#5A5A56] border-[#D8D6CF] hover:border-[#0D7A3E]'
                        }`}
                      >
                        {p.industry}
                      </button>
                    ))}
                  </div>

                  {/* Render Pitch */}
                  <div className="bg-white border-l-4 border-[#0D7A3E] rounded-r-xl p-6 shadow-sm font-sans text-base leading-relaxed text-[#1C1C1A] whitespace-pre-wrap italic">
                    {selectedPitchIndustry === 'General' 
                      ? generalPitch 
                      : industryPitches.find(p => p.industry === selectedPitchIndustry)?.pitchText}
                  </div>
                </div>
              )}

              {/* STEP 5: Objections */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <p className="text-sm text-[#5A5A56] leading-relaxed">
                    Objections are a sign of interest, not rejection. They are seeking reassurance on price, speed, and safety. Expand to view the word-for-word responses:
                  </p>

                  <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                    {objections.map((obj, idx) => {
                      const isExpanded = expandedObjection === idx;
                      return (
                        <div key={idx} className="border border-[#D8D6CF] rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => setExpandedObjection(isExpanded ? null : idx)}
                            className="w-full px-4 py-3 text-left font-serif font-bold text-sm text-[#1C1C1A] flex justify-between items-center bg-[#EEF7F2]/20 hover:bg-[#EEF7F2]/50 transition-colors"
                          >
                            <span>Objection: {obj.objection}</span>
                            <span className="text-xs font-mono font-bold text-[#0D7A3E]">{isExpanded ? 'Hide Responses ▲' : 'Show Responses ▼'}</span>
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 border-t border-[#D8D6CF] text-xs text-gray-700 leading-relaxed font-sans italic bg-amber-50/20 whitespace-pre-wrap">
                                  {obj.response}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 6: The Close */}
              {currentStep === 6 && (
                <div className="space-y-5">
                  <p className="text-sm text-[#5A5A56] leading-relaxed">
                    Never end a call on: &quot;I&quot;ll think about it.&quot; Always close specifically for the next action: a 20-minute Zoom call where you provide a free, personalized automation audit blueprint.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-[#D8D6CF] p-4 rounded-xl shadow-sm space-y-2">
                      <span className="text-[10px] font-mono font-bold text-[#0D7A3E] uppercase tracking-wider bg-[#EEF7F2] px-2 py-0.5 rounded">Soft Close Book</span>
                      <p className="text-xs text-[#1C1C1A] italic leading-relaxed">{closeScripts.softClose}</p>
                    </div>

                    <div className="bg-white border border-[#D8D6CF] p-4 rounded-xl shadow-sm space-y-2">
                      <span className="text-[10px] font-mono font-bold text-[#0D7A3E] uppercase tracking-wider bg-[#EEF7F2] px-2 py-0.5 rounded">On the Fence Reassure</span>
                      <p className="text-xs text-[#1C1C1A] italic leading-relaxed">{closeScripts.onTheFence}</p>
                    </div>

                    <div className="bg-white border border-[#D8D6CF] p-4 rounded-xl shadow-sm space-y-2 md:col-span-2">
                      <span className="text-[10px] font-mono font-bold text-[#0D7A3E] uppercase tracking-wider bg-[#EEF7F2] px-2 py-0.5 rounded">Calendar Invite & Phone Sync Confirmation</span>
                      <p className="text-xs text-[#1C1C1A] italic leading-relaxed">{closeScripts.confirmation}</p>
                    </div>
                  </div>

                  <div className="bg-[#1C1C1A] text-white p-4 rounded-xl space-y-2.5">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">🚀 Send on WhatsApp within 5 mins of hanging up:</span>
                    <pre className="text-xs leading-relaxed font-sans whitespace-pre-wrap text-gray-300 italic">{closeScripts.whatsappFollowUp}</pre>
                  </div>
                </div>
              )}

              {/* STEP 7: Tracker & Checklist */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <p className="text-sm text-[#5A5A56] leading-relaxed">
                    Tick through your preparation checklist before you dial, then log your stats in real-time below. These metrics log directly to your browser memory.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Interactive Checklist */}
                    <div className="lg:col-span-7 space-y-3.5">
                      <h4 className="font-serif font-bold text-sm text-[#1C1C1A] border-b border-[#EEF7F2] pb-2">Pre-Call Audit Checklist</h4>
                      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                        {prepChecklist.map((item) => (
                          <label key={item.id} className="flex items-start gap-2.5 bg-white border border-[#D8D6CF] rounded-lg p-2.5 text-xs text-gray-700 hover:border-[#0D7A3E] cursor-pointer transition-colors shadow-xs">
                            <input
                              type="checkbox"
                              checked={!!checkedItems[item.id]}
                              onChange={() => handleToggleChecklist(item.id)}
                              className="mt-0.5 rounded border-[#D8D6CF] text-[#0D7A3E] focus:ring-[#0D7A3E]/20"
                            />
                            <span className={checkedItems[item.id] ? 'line-through text-gray-400' : ''}>{item.text}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Stats Counter UI */}
                    <div className="lg:col-span-5 bg-white border border-[#D8D6CF] rounded-xl p-5 space-y-4 shadow-xs">
                      <div className="flex justify-between items-center border-b border-[#EEF7F2] pb-3">
                        <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">Calling Stats Log</h4>
                        <button onClick={handleResetStats} className="text-[10px] text-red-600 hover:underline flex items-center gap-0.5">
                          <RefreshCw className="w-2.5 h-2.5" />
                          Reset session
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Stat 1 */}
                        <div className="bg-[#F7F6F2] p-2.5 rounded-lg border border-[#D8D6CF]/60 text-center flex flex-col justify-between h-20">
                          <span className="text-[10px] font-mono text-[#5A5A56] uppercase tracking-wider font-semibold">Calls Made</span>
                          <span className="text-xl font-mono font-bold text-[#1C1C1A]">{stats.callsMade}</span>
                          <div className="flex justify-center gap-3">
                            <button onClick={() => handleStatChange('callsMade', -1)} className="p-1 rounded bg-white hover:bg-gray-100 border border-gray-300"><Minus className="w-3 h-3 text-[#5A5A56]" /></button>
                            <button onClick={() => handleStatChange('callsMade', 1)} className="p-1 rounded bg-white hover:bg-gray-100 border border-gray-300"><Plus className="w-3 h-3 text-[#5A5A56]" /></button>
                          </div>
                        </div>

                        {/* Stat 2 */}
                        <div className="bg-[#F7F6F2] p-2.5 rounded-lg border border-[#D8D6CF]/60 text-center flex flex-col justify-between h-20">
                          <span className="text-[10px] font-mono text-[#5A5A56] uppercase tracking-wider font-semibold">Picked Up</span>
                          <span className="text-xl font-mono font-bold text-[#1C1C1A]">{stats.pickedUp}</span>
                          <div className="flex justify-center gap-3">
                            <button onClick={() => handleStatChange('pickedUp', -1)} className="p-1 rounded bg-white hover:bg-gray-100 border border-gray-300"><Minus className="w-3 h-3 text-[#5A5A56]" /></button>
                            <button onClick={() => handleStatChange('pickedUp', 1)} className="p-1 rounded bg-white hover:bg-gray-100 border border-gray-300"><Plus className="w-3 h-3 text-[#5A5A56]" /></button>
                          </div>
                        </div>

                        {/* Stat 3 */}
                        <div className="bg-[#F7F6F2] p-2.5 rounded-lg border border-[#D8D6CF]/60 text-center flex flex-col justify-between h-20">
                          <span className="text-[10px] font-mono text-[#5A5A56] uppercase tracking-wider font-semibold">Interested</span>
                          <span className="text-xl font-mono font-bold text-[#1C1C1A]">{stats.interested}</span>
                          <div className="flex justify-center gap-3">
                            <button onClick={() => handleStatChange('interested', -1)} className="p-1 rounded bg-white hover:bg-gray-100 border border-gray-300"><Minus className="w-3 h-3 text-[#5A5A56]" /></button>
                            <button onClick={() => handleStatChange('interested', 1)} className="p-1 rounded bg-white hover:bg-gray-100 border border-gray-300"><Plus className="w-3 h-3 text-[#5A5A56]" /></button>
                          </div>
                        </div>

                        {/* Stat 4 */}
                        <div className="bg-[#EEF7F2] p-2.5 rounded-lg border border-[#0D7A3E]/20 text-center flex flex-col justify-between h-20">
                          <span className="text-[10px] font-mono text-[#0D7A3E] uppercase tracking-wider font-bold">Booked ✅</span>
                          <span className="text-xl font-mono font-bold text-[#0D7A3E]">{stats.booked}</span>
                          <div className="flex justify-center gap-3">
                            <button onClick={() => handleStatChange('booked', -1)} className="p-1 rounded bg-white hover:bg-gray-100 border border-gray-300"><Minus className="w-3 h-3 text-[#5A5A56]" /></button>
                            <button onClick={() => handleStatChange('booked', 1)} className="p-1 rounded bg-white hover:bg-emerald-100 border border-gray-300"><Plus className="w-3 h-3 text-[#0D7A3E]" /></button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="bg-white border-t border-[#D8D6CF] px-6 py-4 flex justify-between items-center">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="text-xs font-semibold px-4 py-2 border border-[#D8D6CF] rounded-lg flex items-center gap-1.5 text-[#5A5A56] hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Previous Step
          </button>

          <div className="text-xs font-mono font-semibold text-gray-500">
            Step {currentStep} / 7
          </div>

          <button
            onClick={handleNextStep}
            disabled={currentStep === 7}
            className="text-xs font-bold px-4 py-2 bg-[#0D7A3E] hover:bg-[#0D7A3E]/90 disabled:bg-[#EEF7F2] text-white disabled:text-[#5A5A56]/60 border border-transparent disabled:border-[#D8D6CF]/40 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            Next Step
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Playbook advice bar */}
      <div className="bg-amber-50 border border-amber-300 text-amber-900 rounded-xl p-4 text-xs leading-relaxed flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-serif">The Golden Rule of Cold Calling:</strong> Always close specifically for the **next conversation action** (a 20-minute Zoom call on Thursday/Friday), never try to pitch pricing or sign up the client on the very first phone call. Treat the cold call purely as a 60-second filter.
        </div>
      </div>

    </div>
  );
}
