import { OutreachScript, BusinessTarget } from '../types';

export const coldEmails: OutreachScript[] = [
  {
    id: 'email-1',
    title: 'Initial Outreach',
    subject: 'Quick question about {{Business Name}}\'s operations',
    body: `Hi {{Founder Name}},\n\nI’ve been following {{Business Name}} in Nairobi, and I love what you’re doing. \n\nMany Kenyan SMEs I talk to are losing 10+ hours a week matching M-Pesa payments, manually sending PDFs to clients on WhatsApp, or compiling daily reports. \n\nAt Zenti AI, we build lightweight, custom AI automations that handle this repetitive work for you—without you changing how you run your business. Our custom bots can reconcile M-Pesa payments instantly, manage client requests on WhatsApp 24/7, and generate PDF invoices automatically.\n\nWould you be open to a brief, 20-minute intro call this Thursday or Friday to see how much manual work we can take off your plate?\n\nBest regards,\n\n{{Your Name}}\nCo-Founder, Zenti AI\nhello@zentiai.co | +254 XXX XXX XXX`
  },
  {
    id: 'email-2',
    title: 'Follow-Up (3 Days Later)',
    subject: 'Re: {{Business Name}}\'s operations / M-Pesa matching',
    body: `Hi {{Founder Name}},\n\nI know you’re busy running {{Business Name}}, so I’ll keep this short. \n\nJust to give you a concrete example: we recently helped a logistics hub in Nairobi automate their M-Pesa reconciliation. Instead of a manager spending 2 hours every evening matching transaction codes, an AI script now grabs the M-Pesa MPAN codes from their SMS/Daraja API and instantly marks invoices as paid in their sheet.\n\nWe can set up something very similar for you within 14 days.\n\nDo you have 20 minutes for a quick chat this week? Let me know if Thursday at 11:00 AM or Friday at 2:00 PM works.\n\nBest,\n\n{{Your Name}}\nZenti AI`
  },
  {
    id: 'email-3',
    title: 'Final Breakaway (5 Days Later)',
    subject: 'One last thing regarding {{Business Name}}',
    body: `Hi {{Founder Name}},\n\nI haven't heard back, so I assume automating your manual tasks isn't a priority right now. That is completely fine!\n\nIf you ever change your mind and want to stop spending evenings on manual reports, M-Pesa matching, or copying customer details, we're here to help.\n\nI put together a free, one-page automation audit showing exactly which 3 tasks in your sector are easiest to automate first. \n\nIf you'd like me to send that PDF over, just reply with "YES" and I'll drop it in your inbox. No calls needed.\n\nWishing you all the best with {{Business Name}},\n\n{{Your Name}}\nZenti AI`
  }
];

export const whatsappScripts: OutreachScript[] = [
  {
    id: 'wa-1',
    title: 'First Message (Cold)',
    body: `Habari {{Founder Name}}! This is {{Your Name}} from Zenti AI here in Nairobi. I noticed {{Business Name}} has been growing fast! 🚀\n\nWe build custom AI automations specifically for Kenyan SMEs to eliminate repetitive tasks. Things like: \n1. Auto-matching M-Pesa receipts \n2. WhatsApp customer service bots answering FAQs 24/7\n3. Generating daily PDF sales reports directly to your phone.\n\nDo you have 15 minutes for a quick WhatsApp call this Thursday to see if we can save your team 10+ hours a week?`
  },
  {
    id: 'wa-2',
    title: 'When They Reply With Interest',
    body: `Awesome! Thanks for reaching out, {{Founder Name}}. On our quick 15-minute call, I’ll show you:\n\n1. A live demo of our WhatsApp/M-Pesa integration in action.\n2. Exactly which of your manual tasks are costing you the most money.\n3. A step-by-step 14-day roadmap to go live.\n\nDoes Thursday at 10:00 AM or Friday at 3:00 PM work better for you?`
  },
  {
    id: 'wa-3',
    title: 'Follow-Up (No Reply after 2 Days)',
    body: `Hi {{Founder Name}}! Hope your week is going well. I know you're busy running the business. \n\nTo make it easy, instead of a call, would you prefer I send over a quick 2-minute screen recording showing how our M-Pesa and WhatsApp automation bot works? You can watch it whenever you have a minute. Let me know!`
  },
  {
    id: 'wa-4',
    title: 'If They Ask About Pricing',
    body: `Great question! Our pricing is highly accessible for Kenyan SMEs. We have standard packages starting at KES 15,000/month (Starter) and KES 35,000/month (Growth) which covers fully managed builds, hosting, and ongoing support. \n\nMost businesses save 10 to 15 hours of manual labor per week, meaning the system pays for itself in less than 4 weeks.\n\nLet’s book a quick 15-minute discovery call to see which tier fits {{Business Name}} best. Does tomorrow morning work?`
  }
];

export const linkedinScripts: OutreachScript[] = [
  {
    id: 'li-1',
    title: 'Connection Note (Under 300 chars)',
    body: `Hi {{Founder Name}}, love your work at {{Business Name}} in Nairobi. We build custom AI automations (M-Pesa matching, WhatsApp bots, automated invoicing) for Kenyan SMEs to eliminate repetitive work. Would love to connect and share some local automation blueprints!`
  },
  {
    id: 'li-2',
    title: 'Follow-Up After Connecting',
    body: `Hi {{Founder Name}}, thanks for connecting!\n\nMany founders I talk to in Nairobi are swamped with admin work—matching M-Pesa transaction SMS texts, sending manual WhatsApp receipts, or updating Excel sheets late at night.\n\nAt Zenti AI, we build custom solutions starting at KES 15k/mo that run in the background. We handle the design, setup, and continuous maintenance so you don't need any tech skills.\n\nAre you open to a brief 20-minute call this Thursday or Friday to find out how much time we can save your team?`
  },
  {
    id: 'li-3',
    title: 'Post Variant 1 (Pain Points List)',
    body: `Nairobi founders: Stop doing work a machine can do for you. 🇰🇪\n\nIf you or your team are still doing any of these daily, you are burning valuable hours: \n\n❌ Copy-pasting M-Pesa transaction codes to match orders\n❌ Manually typing "Habari, yes we are open" on WhatsApp 50 times a day\n❌ Copying customer details from WhatsApp into an Excel invoice sheet\n❌ Checking inventory manually and sending frantic WhatsApp messages when stock is low\n❌ Generating end-of-day reports in Excel by hand\n\nThese aren't "jobs." They are tasks. And they can be automated in under 14 days for less than the cost of a part-time intern.\n\nAt Zenti AI, we build custom background workflows that connect M-Pesa, WhatsApp, and Google Sheets so your business runs on autopilot. \n\nWant to see a free 2-minute demo of how it works? \n\n👇 Comment "AUTOMATE" below or send me a DM and I’ll drop it in your inbox.`
  },
  {
    id: 'li-4',
    title: 'Post Variant 2 (Social Proof Story)',
    body: `A retail store owner in Westlands, Nairobi was spending 2 hours every single evening doing "The Reconciliation Dance." 💃❌\n\nHe would:\n1. Open his phone M-Pesa messages.\n2. Open his Google Sheet of orders.\n3. Match transaction codes one-by-one.\n4. Mark them as "Paid".\n5. Generate a manual invoice PDF.\n6. Search for the customer's WhatsApp chat and send the PDF.\n\nThis is a recipe for burnout. It’s also where errors happen—missing payments, double-shipping, or delaying orders.\n\nWe built a simple AI automation for him:\n🚀 Customer pays via M-Pesa\n🚀 Instant Daraja notification matches the order ID in Google Sheets automatically\n🚀 A PDF receipt is generated on the fly\n🚀 A WhatsApp bot instantly delivers the receipt with a warm "Asante" message\n\nTotal time spent by the owner? Zero minutes.\nTotal cost? KES 15,000/month.\nHours saved? 14 hours every single week.\n\nStop doing manual copy-paste work. Your team deserves better.\n\nDM us "DEMO" and let's get your Nairobi SME running on autopilot. 🇰🇪\n\n#NairobiSMEs #BusinessAutomation #Mpesa #ZentiAI`
  }
];

export const targetBusinesses: BusinessTarget[] = [
  {
    icon: 'Stethoscope',
    name: 'Clinics & Pharmacies',
    why: 'Manual patient booking, checking doctor schedules, and manually WhatsApping appointment reminders or test results.',
    tag: 'High pain'
  },
  {
    icon: 'ShoppingBag',
    name: 'Retailers & Supermarkets',
    why: 'Manually reconciling multiple Till/Paybill numbers, low stock alerts, and copying orders from WhatsApp into Excel.',
    tag: 'High volume'
  },
  {
    icon: 'Home',
    name: 'Property Managers',
    why: 'Matching rent payments on M-Pesa, sending automated monthly rent receipts, and dispatching maintenance text alerts.',
    tag: 'High value'
  },
  {
    icon: 'Truck',
    name: 'Logistics & Couriers',
    why: 'Client booking via WhatsApp, automated dispatch notifications, rider trip assignment alerts, and PDF waybill generation.',
    tag: 'Quick win'
  },
  {
    icon: 'GraduationCap',
    name: 'Schools & Colleges',
    why: 'Automating termly fee reminder notifications, matching bank/M-Pesa school fees payments, and sending report cards.',
    tag: 'High value'
  },
  {
    icon: 'Utensils',
    name: 'Restaurants & Hotels',
    why: 'WhatsApp-based table/food ordering, feedback collection, automated chef order slips, and supplier stock alerts.',
    tag: 'Easy sell'
  },
  {
    icon: 'Coins',
    name: 'SACCOs & Microfinance',
    why: 'Automating loan repayment reminders, member balance checking via SMS bots, and weekly spreadsheet report compilation.',
    tag: 'High value'
  },
  {
    icon: 'Scissors',
    name: 'Beauty Salons & Spas',
    why: 'Manually booking appointments, sending automated WhatsApp reminders 2 hours before, and managing stylist commissions.',
    tag: 'Easy sell'
  },
  {
    icon: 'Wrench',
    name: 'Construction Contractors',
    why: 'Tracking material deliveries, compiling field worker timesheets, and generating instant client quote PDFs from simple inputs.',
    tag: 'High pain'
  },
  {
    icon: 'Briefcase',
    name: 'Wholesalers & Distributors',
    why: 'Handling massive WhatsApp orders, verifying bulk M-Pesa transactions, and auto-notifying delivery drivers of new routes.',
    tag: 'Quick win'
  }
];

export const leadSources = [
  {
    title: 'Google Maps Lead Sourcing',
    steps: [
      'Open Google Maps and search: "[Industry] in [Nairobi Area]" (e.g. "Clinics in Westlands", "Pharmacies in Kilimani", "Hardware in Kamukunji").',
      'Look for active businesses with 3+ star reviews but outdated or nonexistent websites. These are high-intent but low-automation candidates.',
      'Find their phone numbers (usually mobile SAFARICOM numbers prefixed with +254 7... or +254 1...).',
      'Save the number, check if they have a WhatsApp Business account. Write down their business name and physical location.',
      'Call them first using our Cold Call Script, and if they don\'t pick up, send the WhatsApp First Message script immediately.'
    ],
    tip: 'Avoid massive corporate chains. Target family-owned businesses or mid-sized multi-location shops where the owner is actively involved and feels the pain.'
  },
  {
    title: 'LinkedIn Prospecting',
    steps: [
      'Search LinkedIn for: "Owner", "Founder", "Director", "General Manager", or "Operations" AND location: "Nairobi".',
      'Filter by industry: Retail, Real Estate, Logistics, Hospitality, Education, or Medical Practice.',
      'Send 10–15 customized connection requests every day. Use our 300-char connection note.',
      'Once they accept, wait 2 hours and send the follow-up message referencing specific manual pains (M-Pesa, Excel sheets).',
      'Publish our pain-point list posts 2 times a week. Actively reply to anyone who likes or comments.'
    ],
    tip: 'Keep your personal profile updated! Ensure your tagline reads: "I help Nairobi SMEs automate M-Pesa, WhatsApp, and daily reports so they can scale without hiring."'
  },
  {
    title: 'Kenya Yellow Pages & Directories',
    steps: [
      'Visit yellowpageskenya.com or kenyabiz.com.',
      'Search for wholesalers, logistics hubs, property firms, and private colleges in Nairobi and Mombasa.',
      'Extract the general inquiries email address (e.g., info@... or admin@...) and office mobile phone numbers.',
      'Send our Cold Email Outreach Script to the general email, but replace {{Founder Name}} with "Operations Manager" if you cannot find the owner\'s name.',
      'Track emails sent in a Google Sheet to follow up exactly 3 days and 5 days later.'
    ],
    tip: 'Always look for the direct mobile number. Landlines (e.g., +254 20...) are hard to reach and don\'t support WhatsApp outreach.'
  },
  {
    title: 'WhatsApp & Facebook Business Groups',
    steps: [
      'Join Facebook groups like "Nairobi Business Network", "Kenya Entrepreneurs", "SMEs in Kenya", or industry-specific SACCO circles.',
      'Do NOT spam your link or offer immediately. Instead, look for posts where people complain about admin issues, accounting errors, or losing customers.',
      'Provide a helpful comment explaining how they can fix it (e.g., "You can connect your Till to Google Sheets using Apps Script to stop matching codes manually").',
      'At the end of your helpful answer, add: "I built a free guide on how to do this for a shop in Westlands, feel free to DM me and I\'ll send it to you."',
      'Take the conversation to DM and book the 15-minute discovery call.'
    ],
    tip: 'Valuable education beats sales pitching every single time. Show them you understand their local business struggle before asking for a shilling.'
  },
  {
    title: 'Your Own Local Network',
    steps: [
      'Scroll through your phone book and identify 10 people you know who own businesses or work in operational roles in Nairobi.',
      'Send them a casual WhatsApp: "Hey [Name], hope you\'re well! I just launched Zenti AI. We build custom automations to eliminate manual work like M-Pesa tracking or updating spreadsheets. Do you know any local clinic/retailer/property manager who is currently drowned in manual tasks? I’d love to buy them a coffee in Westlands and show them what’s possible."',
      'Offer a 20% commission on the first month\'s setup/subscription fee for any referral that signs up.'
    ],
    tip: 'Your first 3 clients will almost always come from referrals or warm intros. Do excellent work for them, and they will tell every other business owner in their circle.'
  }
];
