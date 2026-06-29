import { ObjectionResponse } from '../types';

export interface IndustryHook {
  industry: string;
  hookText: string;
}

export interface IndustryPitch {
  industry: string;
  pitchText: string;
}

export const coldCallOpening = {
  script: `“Habari {{Name}}! This is {{Your Name}} calling from Zenti AI here in Nairobi.\n\nI’ll be completely honest with you—this is a cold call. I know you’re incredibly busy running the operations, but I was hoping you could give me just 60 seconds to tell you why I called, and you can decide if it’s worth continuing?”`,
  handlingBusy: `“I completely respect that, {{Name}}. I don’t want to interrupt your day. Would it be better if I called you back tomorrow morning at 9:30 AM, or is Wednesday afternoon around 3:00 PM more convenient for a quick 2-minute chat?”`
};

export const industryHooks: IndustryHook[] = [
  {
    industry: 'Clinics & Pharmacies',
    hookText: `“We find that many private clinics in Nairobi are losing hours having their front desk manually text patients appointment reminders, manually cross-check doctor calendars, and match M-Pesa receipts for consults. Is that a challenge you guys face at your practice?”`
  },
  {
    industry: 'Retailers & Supermarkets',
    hookText: `“We work with retailers who were spending 2 hours every evening manually matching M-Pesa transaction codes from their till SMS inbox with their sales sheets, and copying order details from WhatsApp. Is your team still doing that manual M-Pesa matching every day?”`
  },
  {
    industry: 'Property Managers',
    hookText: `“We find that real estate and property firms in Kilimani and Westlands are drowned in rent reconciliation. They are matching hundreds of M-Pesa rent payments manually and typing up receipts one by one. Does your team spend days on rent receipt matching every month?”`
  },
  {
    industry: 'Restaurants & Hotels',
    hookText: `“Most restaurants we talk to are flooded with WhatsApp reservation inquiries and manual menu requests, which means staff are answering the same 5 questions on their phone instead of serving guests. Is manual customer messaging holding your staff back?”`
  },
  {
    industry: 'General Business / Logistics',
    hookText: `“We help local companies automate their back-office admin—things like auto-generating invoices, sending client updates on WhatsApp, and matching payments automatically so you save 15+ hours a week. Is eliminating repetitive manual work a priority for you guys this quarter?”`
  }
];

export const discoveryQuestions = {
  questions: [
    `“What does your Monday morning look like? What are the manual spreadsheet or reporting tasks that eat up your team's first 3 hours of the week?”`,
    `“If there's one repetitive manual task that you absolutely dread doing or managing every day, what would that be?”`,
    `“How is your team currently handling M-Pesa reconciliations and sending invoices? Are they typing them out or copy-pasting codes?”`,
    `“Has anything ever slipped through the cracks? Like a payment that didn't get recorded, a customer message that went unanswered for 6 hours, or an order that was double-shipped?”`
  ],
  transition: `“Got it. That makes perfect sense, and honestly, you’re not alone. Most Nairobi businesses are running into these exact bottleneck roadblocks. Here's how we solve that at Zenti AI...”`
};

export const generalPitch = `“We don't sell generic software that you have to learn. Instead, we build custom background scripts and WhatsApp bots tailored specifically to your business. We connect your existing tools—like your M-Pesa Paybill, your Google Sheets, and your WhatsApp Business. \n\nFor example, instead of your staff matching M-Pesa codes, our system automatically detects the transaction, updates your spreadsheet in real-time, generates a PDF receipt, and WhatsApps it to the customer instantly. You change absolutely nothing about how you work, and the automation runs 24/7 in the background for KES 15,000 a month.”`;

export const industryPitches: IndustryPitch[] = [
  {
    industry: 'Property Managers',
    pitchText: `“We build a custom rent portal that connects to your Safaricom Paybill. When a tenant pays rent via M-Pesa, our script instantly matches their apartment number, updates your property Google Sheet, creates a rent receipt PDF, and sends it to their WhatsApp number automatically. Your office staff never have to cross-check rent payments again.”`
  },
  {
    industry: 'Clinics & Pharmacies',
    pitchText: `“We set up an automated WhatsApp Booking Assistant. When a patient messages your line, they can instantly see doctor availability, book an appointment, and get automated reminders sent to their WhatsApp 2 hours before their slot. If they pay via M-Pesa, the consult payment is reconciled and logged in your system instantly without human error.”`
  },
  {
    industry: 'Retailers & Supermarkets',
    pitchText: `“We build a WhatsApp Catalog Bot that lets clients browse your products, place orders, and pay directly on WhatsApp. Once M-Pesa confirms the payment, the order details are pushed to your packaging team's Google Sheet, and low stock warnings are sent to you automatically. Your staff never have to copy-paste shipping details manually again.”`
  },
  {
    industry: 'Restaurants & Hotels',
    pitchText: `“We set up an automated guest bot. Customers scan a QR code on their table to browse the menu, order, and pay. The kitchen gets an automated receipt printed or displayed, and the sales are logged instantly. For room bookings, the bot handles FAQs about check-in times and routes active bookings straight to your sheets.”`
  }
];

export const objections: ObjectionResponse[] = [
  {
    objection: '“Not interested.”',
    response: `“I completely understand, {{Name}}. Just so I know, is it because you already have your systems fully automated, or is saving time not a major priority for your business right now?”`
  },
  {
    objection: '“This sounds too expensive.”',
    response: `“I hear you. KES 15,000 a month is a real expense. But if you think about it, it's less than the salary of a part-time intern. If our automation saves your manager just 10 hours a week, that’s 40 hours of manual labor saved a month. The system usually pays for itself in the first 2 weeks. Plus, we handle the setup, maintenance, and host everything—meaning you have no overhead.”`
  },
  {
    objection: '“We already use an ERP / Accounting Software / specialized CRM.”',
    response: `“That’s excellent! It means you already value structure. We don’t replace your ERP. Most ERPs are terrible at connecting to local Kenyan tools like M-Pesa or WhatsApp. We build the lightweight bridges that sit in between your ERP and your daily workflows—filling the manual gaps so you don’t have to copy-paste data in and out of your software.”`
  },
  {
    objection: '“I don’t have time for this right now.”',
    response: `“I hear you, you’re busy running the business. That’s actually why we’re calling. We only need 20 minutes to show you how to buy back 10 hours of your weekly schedule. We do 100% of the build and maintenance ourselves—you don't have to lift a finger. Would this Thursday morning at 10:00 AM work, or is Friday afternoon around 3:00 PM easier?”`
  },
  {
    objection: '“My team won’t adapt to new technology or AI.”',
    response: `“That’s the beauty of our custom builds: your team doesn’t have to learn a single new app or software. We build the automations to run in the background. If they are used to Google Sheets and WhatsApp, they continue using exactly those. They’ll just notice that the manual copy-pasting, matching, and messaging has magically stopped. We also provide a free 1-hour training session with your staff to make sure they are comfortable.”`
  },
  {
    objection: '“We tried automation or custom software before and it didn’t work.”',
    response: `“I am really sorry to hear that. Often, developers build a tool, hand it over, and walk away—leaving you stranded when things break. At Zenti AI, we operate as a managed service. We don't just build it; we host it, monitor it, and adapt it as your business changes. You have a direct Safaricom phone number to call whenever you need an update. If it doesn't work, we don't get paid.”`
  },
  {
    objection: '“Just send me some information or a PDF first.”',
    response: `“I’d be happy to email you a PDF! But because we build custom workflows, a generic PDF won't show you much. Let me ask you one quick question: what is the single biggest manual task your team spends time on every week? If you tell me, I can write a short, 3-sentence custom blueprint for you, email it over, and we can catch up for 10 minutes on Friday to discuss it. How does that sound?”`
  }
];

export const closeScripts = {
  softClose: `“Based on what you've shared, I'm confident we can save you at least 12 hours a week. Let’s do this: we have a 20-minute slot open on Thursday at 10:30 AM or Friday at 2:00 PM. We'll hop on a quick Zoom call, and I’ll sketch out a live, 3-step automation blueprint for your business—absolutely free. Which of those two times works best for you?”`,
  confirmation: `“Perfect. I’ve booked you for Thursday at 10:30 AM. I’m sending a calendar invite to your email right now—is it still {{Email}}? Great. I’m also going to send a quick WhatsApp message to this number so you have my direct line. If anything changes, just let me know. Asante, and have a fantastic week!”`,
  onTheFence: `“Look, there's absolutely no pressure or sales pitch on this call. If we map out the blueprint and you decide you want to build it yourself or keep doing it manually, you keep the blueprint for free. There’s zero risk to you. Does that sound fair?”`,
  whatsappFollowUp: `“Hi {{Name}}! This is {{Your Name}} from Zenti AI. Great speaking with you just now. As promised, I’ve booked our 20-minute automation blueprint call for Thursday at 10:30 AM. Here is the Google Meet link: meet.google.com/xxx-xxxx-xxx. Looking forward to showing you how to put those manual M-Pesa sheets on autopilot! Have a great day. 🇰🇪”`
};

export const prepChecklist = [
  { id: 'prep-1', text: 'Locate owner/manager\'s real first name and check spelling' },
  { id: 'prep-2', text: 'Verify their primary business location in Nairobi (e.g., Westlands, Kilimani, Industrial Area)' },
  { id: 'prep-3', text: 'Check if they have an active WhatsApp Business number or a Safaricom Till/Paybill number listed' },
  { id: 'prep-4', text: 'Confirm the exact industry sector and pick the matching industry hook statement' },
  { id: 'prep-5', text: 'Ensure your microphone is clear, sit upright, and have water nearby' },
  { id: 'prep-6', text: 'Have the Zenti AI KES pricing structure open and memorized' },
  { id: 'prep-7', text: 'Be ready to listen 80% of the time and speak only 20% of the time' }
];
