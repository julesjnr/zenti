import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, 
  Check, 
  Mail, 
  MessageSquare, 
  Linkedin, 
  Search, 
  MapPin, 
  AlertCircle,
  Stethoscope,
  ShoppingBag,
  Home,
  Truck,
  GraduationCap,
  Utensils,
  Coins,
  Scissors,
  Wrench,
  Briefcase
} from 'lucide-react';
import { coldEmails, whatsappScripts, linkedinScripts, targetBusinesses, leadSources } from '../data/outreachData';

// Map string icon names to Lucide elements
const IconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Stethoscope,
  ShoppingBag,
  Home,
  Truck,
  GraduationCap,
  Utensils,
  Coins,
  Scissors,
  Wrench,
  Briefcase
};

export default function OutreachToolkit() {
  const [activeTab, setActiveTab] = useState<'email' | 'whatsapp' | 'linkedin' | 'targets' | 'sourcing'>('email');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      // fallback
    }
  };

  return (
    <div className="bg-white border border-[#D8D6CF] rounded-2xl p-6 md:p-8 shadow-sm">
      
      {/* Title */}
      <div className="border-b border-[#EEF7F2] pb-6 mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1C1A]">Zenti AI — Founder Outreach Toolkit 🇰🇪</h2>
        <p className="text-sm text-[#5A5A56] mt-1">High-impact, localized scripts and playbook guides to sign your first 10 Kenyan SME customers.</p>
      </div>

      {/* Responsive Tab Bar */}
      <div className="flex overflow-x-auto gap-2 border-b border-[#D8D6CF] pb-px mb-8 scrollbar-thin">
        {[
          { id: 'email', label: 'Cold Email (3 Scripts)', icon: Mail },
          { id: 'whatsapp', label: 'WhatsApp (4 Scripts)', icon: MessageSquare },
          { id: 'linkedin', label: 'LinkedIn (4 Scripts)', icon: Linkedin },
          { id: 'targets', label: 'Target Businesses (10 Sectors)', icon: Briefcase },
          { id: 'sourcing', label: 'Where to Find Leads', icon: Search }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 font-sans text-sm font-semibold border-b-2 -mb-px transition-all ${
                isActive 
                  ? 'border-[#0D7A3E] text-[#0D7A3E]' 
                  : 'border-transparent text-[#5A5A56] hover:text-[#1C1C1A]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div>
        <AnimatePresence mode="wait">
          
          {/* Tab 1: Cold Email */}
          {activeTab === 'email' && (
            <motion.div
              key="tab-email"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Scripts Column */}
                <div className="lg:col-span-8 space-y-6">
                  {coldEmails.map((script) => (
                    <div key={script.id} className="border border-[#D8D6CF] rounded-xl overflow-hidden bg-[#F7F6F2]/30">
                      <div className="bg-[#EEF7F2] px-4 py-3 border-b border-[#D8D6CF] flex items-center justify-between">
                        <span className="font-serif font-bold text-[#0D7A3E] text-sm">{script.title}</span>
                        <button
                          onClick={() => handleCopy(script.id, `Subject: ${script.subject}\n\n${script.body}`)}
                          className="text-xs bg-white border border-[#D8D6CF] rounded px-2.5 py-1 text-[#1C1C1A] font-semibold flex items-center gap-1 hover:bg-[#EEF7F2] transition-colors"
                        >
                          {copiedId === script.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#0D7A3E]" />
                              <span className="text-[#0D7A3E]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Script</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-4 space-y-3 font-mono text-xs text-[#1C1C1A]">
                        {script.subject && (
                          <div className="border-b border-[#D8D6CF] pb-2 text-gray-700">
                            <strong>Subject:</strong> {script.subject}
                          </div>
                        )}
                        <pre className="whitespace-pre-wrap font-sans leading-relaxed text-sm text-[#5A5A56] pt-1">{script.body}</pre>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Advice Column */}
                <div className="lg:col-span-4">
                  <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 space-y-4 text-sm text-amber-900 sticky top-24">
                    <div className="flex items-center gap-2 font-serif font-bold">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>Cold Email Success Rules</span>
                    </div>
                    <ul className="space-y-3 text-xs leading-relaxed">
                      <li>
                        <strong>Target Direct Owners:</strong> Don&apos;t email info@... and hope for a reply. Search LinkedIn or ask around for the founder&apos;s real first name.
                      </li>
                      <li>
                        <strong>Nairobi Slang is Fine:</strong> Keeping the tone highly localized, friendly, and practical beats dry, boilerplate corporate jargon every time.
                      </li>
                      <li>
                        <strong>Keep follow-ups strict:</strong> Founders are flooded with operational emails. Following up exactly 3 days later generates up to 60% of our response volume.
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* Tab 2: WhatsApp */}
          {activeTab === 'whatsapp' && (
            <motion.div
              key="tab-wa"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Scripts */}
                <div className="lg:col-span-8 space-y-6">
                  {whatsappScripts.map((script) => (
                    <div key={script.id} className="border border-[#D8D6CF] rounded-xl overflow-hidden bg-[#F7F6F2]/30">
                      <div className="bg-[#EEF7F2] px-4 py-3 border-b border-[#D8D6CF] flex items-center justify-between">
                        <span className="font-serif font-bold text-[#0D7A3E] text-sm">{script.title}</span>
                        <button
                          onClick={() => handleCopy(script.id, script.body)}
                          className="text-xs bg-white border border-[#D8D6CF] rounded px-2.5 py-1 text-[#1C1C1A] font-semibold flex items-center gap-1 hover:bg-[#EEF7F2] transition-colors"
                        >
                          {copiedId === script.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#0D7A3E]" />
                              <span className="text-[#0D7A3E]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Script</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="bg-[#E2F4C5] text-[#112D24] p-3.5 rounded-xl text-sm max-w-lg leading-relaxed relative before:absolute before:-left-2 before:top-4 before:w-0 before:h-0 before:border-y-8 before:border-y-transparent before:border-r-[10px] before:border-r-[#E2F4C5]">
                          <pre className="whitespace-pre-wrap font-sans">{script.body}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Advice */}
                <div className="lg:col-span-4">
                  <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 space-y-4 text-sm text-amber-900 sticky top-24">
                    <div className="flex items-center gap-2 font-serif font-bold">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>WhatsApp Sells in Kenya</span>
                    </div>
                    <ul className="space-y-3 text-xs leading-relaxed">
                      <li>
                        <strong>Avoid massive essays:</strong> Keep spacing wide and use emoji indicators (🚀, 👇, ❌) to make the message highly readable in one quick phone thumb-scroll.
                      </li>
                      <li>
                        <strong>Check for Business Badges:</strong> If you see a green or gray business profile badge, you can confidently address them with professional confidence.
                      </li>
                      <li>
                        <strong>Use Voice Notes:</strong> If they reply warmly, send a short 30-second voice note in English/Sheng. Hearing a real, energetic Nairobi human instantly builds trust.
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* Tab 3: LinkedIn */}
          {activeTab === 'linkedin' && (
            <motion.div
              key="tab-linkedin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Scripts */}
                <div className="lg:col-span-8 space-y-6">
                  {linkedinScripts.map((script) => (
                    <div key={script.id} className="border border-[#D8D6CF] rounded-xl overflow-hidden bg-[#F7F6F2]/30">
                      <div className="bg-[#EEF7F2] px-4 py-3 border-b border-[#D8D6CF] flex items-center justify-between">
                        <span className="font-serif font-bold text-[#0D7A3E] text-sm">{script.title}</span>
                        <button
                          onClick={() => handleCopy(script.id, script.body)}
                          className="text-xs bg-white border border-[#D8D6CF] rounded px-2.5 py-1 text-[#1C1C1A] font-semibold flex items-center gap-1 hover:bg-[#EEF7F2] transition-colors"
                        >
                          {copiedId === script.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#0D7A3E]" />
                              <span className="text-[#0D7A3E]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Script</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-4 space-y-3 font-sans text-sm text-[#1C1C1A]">
                        {script.id === 'li-1' && <p className="text-xs font-semibold text-amber-700">⚠️ Rule: STRICTLY under 300 characters for LinkedIn connections</p>}
                        <pre className="whitespace-pre-wrap font-sans leading-relaxed text-[#5A5A56]">{script.body}</pre>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Advice */}
                <div className="lg:col-span-4">
                  <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 space-y-4 text-sm text-amber-900 sticky top-24">
                    <div className="flex items-center gap-2 font-serif font-bold">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>LinkedIn Thought Leadership</span>
                    </div>
                    <ul className="space-y-3 text-xs leading-relaxed">
                      <li>
                        <strong>Call Out the Industry:</strong> Use tag openers like &quot;Nairobi Founders&quot; or &quot;Property Managers in Westlands&quot; so targeted prospects halt their scrolling.
                      </li>
                      <li>
                        <strong>The Power of Contrast:</strong> Use the ❌ and 🚀 icons to divide painful manual realities from the frictionless automatic future.
                      </li>
                      <li>
                        <strong>Reply to all Comments:</strong> If someone comments &quot;AUTOMATE&quot;, send them a direct connection request and message them immediately with the video blueprint link.
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* Tab 4: Target Businesses */}
          {activeTab === 'targets' && (
            <motion.div
              key="tab-targets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-[#EEF7F2] p-5 rounded-xl border border-[#0D7A3E]/10 flex gap-3.5 items-start">
                <AlertCircle className="w-5 h-5 text-[#0D7A3E] shrink-0 mt-0.5" />
                <p className="text-xs text-[#0D7A3E] font-medium leading-relaxed">
                  These 10 business sectors represent the absolute sweet spot for Zenti AI. They handle daily transactional flow, manage large volumes of customer inquiries on WhatsApp, and heavily rely on manual spreadsheets. Target these first!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {targetBusinesses.map((biz) => {
                  const Icon = IconMap[biz.icon] || Briefcase;
                  const tagColors: { [key: string]: string } = {
                    'High pain': 'bg-red-50 text-red-700 border-red-200',
                    'High volume': 'bg-blue-50 text-blue-700 border-blue-200',
                    'High value': 'bg-purple-50 text-purple-700 border-purple-200',
                    'Quick win': 'bg-emerald-50 text-[#0D7A3E] border-emerald-200',
                    'Easy sell': 'bg-amber-50 text-amber-700 border-amber-200'
                  };
                  return (
                    <div key={biz.name} className="border border-[#D8D6CF] rounded-xl p-5 bg-white space-y-4 shadow-sm hover:border-[#0D7A3E] hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="p-2.5 rounded-lg bg-[#EEF7F2] text-[#0D7A3E]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border ${tagColors[biz.tag] || 'bg-gray-50 border-gray-200'}`}>
                          {biz.tag}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-serif text-lg font-bold text-[#1C1C1A]">{biz.name}</h4>
                        <p className="text-xs text-[#5A5A56] leading-relaxed">{biz.why}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Tab 5: Where to Find Them */}
          {activeTab === 'sourcing' && (
            <motion.div
              key="tab-sourcing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leadSources.map((src, idx) => (
                  <div key={src.title} className="border border-[#D8D6CF] rounded-xl p-6 bg-white space-y-4 shadow-sm hover:border-[#0D7A3E] transition-colors relative overflow-hidden">
                    <span className="absolute top-0 right-0 font-mono text-gray-200 font-bold text-5xl pr-4 pt-2 select-none pointer-events-none">0{idx + 1}</span>
                    
                    <h4 className="font-serif text-lg font-bold text-[#1C1C1A] border-b border-[#EEF7F2] pb-3 pr-8">{src.title}</h4>
                    
                    <ol className="space-y-3.5 text-xs text-[#5A5A56] list-decimal pl-4 leading-relaxed font-sans">
                      {src.steps.map((step, sIdx) => (
                        <li key={sIdx}>{step}</li>
                      ))}
                    </ol>

                    <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded p-3 text-[11px] leading-relaxed flex gap-2 items-start mt-4">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Pro Tip:</strong> {src.tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
