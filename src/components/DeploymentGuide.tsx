import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Database, 
  Link, 
  Globe, 
  CheckCircle,
  HelpCircle,
  Code,
  DollarSign,
  Briefcase
} from 'lucide-react';

export default function DeploymentGuide() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepNum: number) => {
    if (completedSteps.includes(stepNum)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNum));
    } else {
      setCompletedSteps([...completedSteps, stepNum]);
    }
  };

  const phases = [
    {
      title: "Phase 1 — Google Sheets Backend Setup",
      icon: Database,
      color: "text-[#0D7A3E]",
      bg: "bg-[#EEF7F2]",
      steps: [
        {
          num: 1,
          title: "Create a new Google Sheet",
          desc: "Go to sheets.google.com or simply type sheet.new in your web browser. Give your sheet a name like Zenti AI Signups or Nairobi SME Waitlist."
        },
        {
          num: 2,
          title: "Open the Apps Script editor",
          desc: "In the Google Sheet top menu, click Extensions > Apps Script. This opens a cloud-hosted development environment directly attached to your spreadsheet."
        },
        {
          num: 3,
          title: "Paste our backend script code",
          desc: "Delete any boilerplate code inside the editor (like function myFunction() {}). Copy the exact code from our waitlist-backend.gs file and paste it in. Save the project with a title like Waitlist Webhook."
        },
        {
          num: 4,
          title: "Deploy the script as a Web App",
          desc: "Click Deploy (top right) > New deployment. Click the gear icon next to Select type, choose Web app. Set Execute as to 'Me (your email)' and Who has access to 'Anyone'. This allows anyone to submit waitlist signups without requiring them to log into Google."
        },
        {
          num: 5,
          title: "Copy your deployment Web App URL",
          desc: "Click Deploy. If prompted, click Authorize access and sign in with your Google account. Google will display a security warning (this is safe and normal because you wrote the script yourself)—click Advanced > Go to Untitled project (unsafe). Once approved, copy the generated Web App URL."
        }
      ]
    },
    {
      title: "Phase 2 — Connect Landing Page Webhook",
      icon: Link,
      color: "text-blue-600",
      bg: "bg-blue-50",
      steps: [
        {
          num: 6,
          title: "Configure your local webhook constant",
          desc: "Open your Zenti AI code editor, find the App.tsx waitlist handler, and paste the copied Google Apps Script Web App URL into the GOOGLE_SHEETS_SCRIPT_URL variable constant."
        },
        {
          num: 7,
          title: "Save changes and build testing build",
          desc: "Run a test email submission on your local dev server preview (e.g. hello-test@zentiai.co). Verify that the success banner pops up and your spreadsheet immediately logs the first waitlist row in EAT timezone."
        }
      ]
    },
    {
      title: "Phase 3 — Deploy on Netlify (Or Vercel)",
      icon: Globe,
      color: "text-purple-600",
      bg: "bg-purple-50",
      steps: [
        {
          num: 8,
          title: "Sign up at netlify.com",
          desc: "Create a free developer account on Netlify. You can log in using GitHub, GitLab, or your standard email address."
        },
        {
          num: 9,
          title: "Drag and drop build folder (dist)",
          desc: "Compile your web build (npm run build produces the dist folder). Drag the entire dist folder directly into Netlify's deployment dropzone in your browser. Your site will go live on a random subdomain (e.g., dynamic-sunset-1029.netlify.app) in under 3 seconds."
        },
        {
          num: 10,
          title: "Setup custom Kenyan domain (.co.ke)",
          desc: "Go to your registrar of choice (e.g., Kenic licensed registrars, Hostpins, Safaricom, or Namecheap). Purchase your domain zentiai.co or zentiai.co.ke (~KES 1,000–1,500/yr). Point your DNS Nameservers to Netlify's system. Netlify will configure automated secure SSL (HTTPS) for your domain completely free."
        }
      ]
    },
    {
      title: "Phase 4 — Verify Live Web Integration",
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      steps: [
        {
          num: 11,
          title: "Submit a live test sign-up",
          desc: "Navigate to your new custom live domain (e.g., https://zentiai.co) in an incognito browser. Type in a real test email, hit Enter, and look for our success indicator: 'Asante! You have successfully joined... 🇰🇪'"
        },
        {
          num: 12,
          title: "Check Google Sheet for live logging",
          desc: "Open your Google Sheet. Verify that the table contains your test email, matching ID, Africa/Nairobi EAT timestamp, and correct form source (e.g., 'Hero Form' or 'Footer Form'). You are officially open for business!"
        }
      ]
    }
  ];

  const totalSteps = phases.reduce((acc, p) => acc + p.steps.length, 0);
  const progressPercent = Math.round((completedSteps.length / totalSteps) * 100);

  return (
    <div className="bg-white border border-[#D8D6CF] rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
      
      {/* Title */}
      <div className="border-b border-[#EEF7F2] pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1C1A]">Zenti AI — Deployment Manual 🚀</h2>
          <p className="text-sm text-[#5A5A56] mt-1">Simple, 12-step roadmap to connect your Google Sheet database and launch your agency landing page.</p>
        </div>
        
        {/* Progress Display */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-mono text-[#5A5A56] block uppercase font-bold">Launch Progress</span>
            <span className="text-sm font-mono font-bold text-[#0D7A3E]">{completedSteps.length} of {totalSteps} Completed ({progressPercent}%)</span>
          </div>
          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden border border-[#D8D6CF]">
            <div className="h-full bg-[#0D7A3E] transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Accordion List Steps */}
      <div className="space-y-8">
        {phases.map((phase, pIdx) => (
          <div key={pIdx} className="space-y-4">
            
            {/* Phase Header */}
            <div className="flex items-center gap-3 border-b border-[#D8D6CF] pb-2">
              <div className={`p-2 rounded-lg ${phase.bg} ${phase.color}`}>
                <phase.icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1C1C1A]">{phase.title}</h3>
            </div>

            {/* Steps Timeline Grid */}
            <div className="space-y-3 pl-3">
              {phase.steps.map((st) => {
                const isChecked = completedSteps.includes(st.num);
                return (
                  <label 
                    key={st.num} 
                    className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                      isChecked 
                        ? 'bg-[#EEF7F2]/30 border-[#0D7A3E]' 
                        : 'bg-white border-[#D8D6CF] hover:border-gray-400 shadow-xs'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleStep(st.num)}
                      className="mt-1 h-4 w-4 rounded border-[#D8D6CF] text-[#0D7A3E] focus:ring-[#0D7A3E]/20 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-sm text-[#1C1C1A] flex items-center gap-2">
                        <span className="font-mono text-[#0D7A3E]">Step {st.num}:</span>
                        {st.title}
                      </h4>
                      <p className="text-xs text-[#5A5A56] leading-relaxed">{st.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>

          </div>
        ))}
      </div>

      {/* Dark Final Summary Card */}
      <div className="bg-[#1C1C1A] text-white p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-md">
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#0D7A3E] opacity-10 blur-2xl"></div>
        
        <div className="space-y-5 relative z-10">
          <div className="flex items-center gap-2.5 text-emerald-400 border-b border-gray-800 pb-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <h4 className="font-serif text-lg font-bold">Zenti Launch Architecture Complete!</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-gray-300">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-[#0D7A3E] font-bold">✔️</span>
                <span><strong>Public Landing Page:</strong> Hosted completely free on Netlify (or Vercel) global CDN.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#0D7A3E] font-bold">✔️</span>
                <span><strong>Waitlist database:</strong> Handled securely by your personal Google Sheets App script.</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-[#0D7A3E] font-bold">✔️</span>
                <span><strong>Playbook Workspace:</strong> Hosted locally or kept in private bookmark for active dialing.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#0D7A3E] font-bold">✔️</span>
                <span><strong>Setup Overhead Cost:</strong> <span className="text-emerald-400 font-bold font-mono">KES 0.00</span> (Free tier Google Sheets + Netlify setup).</span>
              </div>
            </div>
          </div>

          <div className="bg-[#2A2A26] rounded-xl p-4 border border-[#5A5A56]/30 text-xs flex gap-3 items-start">
            <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-serif font-bold text-white block mb-1">Optional Upgrade: Custom .co.ke Domain</span>
              <p className="text-gray-300 leading-relaxed">
                While you can use Netlify&apos;s free subdomains, acquiring a local <strong>.co.ke</strong> domain from authorized registrars like Kenic, Hostpins, or Safaricom for roughly <strong>KES 1,500/year</strong> builds maximum institutional credibility with Nairobi business clients.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
