import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Code, FileCode, Info, ShieldAlert } from 'lucide-react';

export default function AppsScriptBackend() {
  const [copied, setCopied] = useState(false);

  const appsScriptCode = `/**
 * Zenti AI Waitlist Backend
 * Google Apps Script Web App Webhook
 * 
 * Instructions:
 * 1. Go to sheet.new to create a new Google Sheet.
 * 2. Click Extensions > Apps Script.
 * 3. Delete any existing code and paste this script.
 * 4. Click "Deploy" > "New deployment".
 * 5. Select "Web app" as the type.
 * 6. Set "Execute as" to "Me" and "Who has access" to "Anyone".
 * 7. Copy the generated Web App URL and paste it into your index.html or React environment.
 */

// Timezone configuration for Nairobi, Kenya
const TIMEZONE = "Africa/Nairobi";

/**
 * Handles GET requests. Returns the current signup count.
 */
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    // Header takes 1 row, so count is lastRow - 1 (if sheet is empty, lastRow is 0, count is 0)
    const count = lastRow > 1 ? lastRow - 1 : 0;
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      signupCount: count,
      message: "Zenti AI Waitlist Backend is active 🇰🇪"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: "Error fetching signups: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles POST requests. Saves waitlist emails.
 */
function doPost(e) {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  
  try {
    // 1. Parse incoming JSON content
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No post data received");
    }
    
    const data = JSON.parse(e.postData.contents);
    const email = data.email ? data.email.toString().trim().toLowerCase() : "";
    const source = data.source ? data.source.toString().trim() : "Direct";
    
    // 2. Validate email format
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: "Invalid email address format. Please enter a valid email."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 3. Open Spreadsheet and initialize headers if empty
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    initializeSheetIfEmpty(sheet);
    
    // 4. Check for duplicate emails
    if (isEmailDuplicate(sheet, email)) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        duplicate: true,
        message: "You are already on the Zenti AI waitlist! Asante for your enthusiasm. 🇰🇪"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 5. Calculate date and time in Nairobi Timezone
    const now = new Date();
    const formattedDate = Utilities.formatDate(now, TIMEZONE, "yyyy-MM-dd");
    const formattedTime = Utilities.formatDate(now, TIMEZONE, "HH:mm:ss");
    
    // 6. Append new record
    const nextId = sheet.getLastRow(); // Row number matches ID because header is row 1, first record is row 2 (ID = 1)
    sheet.appendRow([
      nextId,
      email,
      formattedDate,
      formattedTime,
      source
    ]);
    
    // 7. Success Response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Asante! You have successfully joined the Zenti AI waitlist. We will contact you soon! 🇰🇪",
      id: nextId
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: "Backend server error: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Initializes the sheet headers if it is completely empty.
 * Styles headers with bold text and amber-green highlights.
 */
function initializeSheetIfEmpty(sheet) {
  if (sheet.getLastRow() === 0) {
    // Write headers
    const headers = ["# ID", "Email", "Date (EAT)", "Time (EAT)", "Source"];
    sheet.appendRow(headers);
    
    // Style headers
    const range = sheet.getRange(1, 1, 1, 5);
    range.setFontWeight("bold");
    range.setFontColor("#FFFFFF");
    range.setBackground("#0D7A3E"); // Zenti AI Accent Green
    range.setHorizontalAlignment("center");
    
    // Auto-fit columns
    sheet.autoResizeColumns(1, 5);
  }
}

/**
 * Checks if the email already exists in the "Email" column (Column 2)
 */
function isEmailDuplicate(sheet, email) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false; // Only headers exist
  
  const emailValues = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  for (let i = 0; i < emailValues.length; i++) {
    if (emailValues[i][0].toString().trim().toLowerCase() === email) {
      return true;
    }
  }
  return false;
}

/**
 * Handles CORS OPTIONS requests (preflight checks)
 */
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(appsScriptCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="bg-white border border-[#D8D6CF] rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
      
      {/* Title */}
      <div className="border-b border-[#EEF7F2] pb-6 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1C1A]">Google Apps Script Backend Code </h2>
          <p className="text-sm text-[#5A5A56] mt-1">Deploy this code in your Google Sheet environment to log all waitlist submissions automatically.</p>
        </div>
        <button
          onClick={handleCopy}
          className="bg-[#0D7A3E] text-white hover:bg-[#0D7A3E]/90 text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Script Code</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Code Box */}
        <div className="lg:col-span-8">
          <div className="relative border border-[#D8D6CF] rounded-xl overflow-hidden bg-gray-950">
            <div className="absolute top-3 right-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            </div>
            <div className="bg-gray-900 border-b border-gray-800 px-4 py-2.5 text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-emerald-500" />
              waitlist-backend.gs
            </div>
            <div className="p-4 overflow-x-auto max-h-[480px]">
              <pre className="text-xs font-mono text-emerald-400 leading-relaxed whitespace-pre font-medium">
                {appsScriptCode}
              </pre>
            </div>
          </div>
        </div>

        {/* Informational Columns */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-[#EEF7F2] border border-[#0D7A3E]/10 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 font-serif font-bold text-[#0D7A3E] text-sm">
              <Info className="w-4.5 h-4.5" />
              <span>Why Use Google Apps Script?</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#5A5A56] leading-relaxed">
              <li>
                <strong>No database hosting costs:</strong> Apps Script runs on Google&apos;s serverless infrastructure completely free.
              </li>
              <li>
                <strong>Zero setup code:</strong> Instantly connects the landing page directly to a spreadsheet you can open on any device.
              </li>
              <li>
                <strong>Nairobi Timezone:</strong> Configured out-of-the-box with <code>Africa/Nairobi</code> East Africa Time logging.
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 space-y-3 text-amber-900">
            <div className="flex items-center gap-2 font-serif font-bold text-sm">
              <ShieldAlert className="w-4.5 h-4.5 text-amber-600 shrink-0" />
              <span>Security Warnings</span>
            </div>
            <p className="text-xs leading-relaxed">
              Because you are deploying this code yourself inside your personal Google Account, Google will flag a security warning screen asking if you trust your own script. Simply click <strong>Advanced</strong> followed by <strong>Go to Project (unsafe)</strong> to proceed safely.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5 space-y-3.5 text-red-950 border-l-4 border-l-red-500">
            <div className="flex items-center gap-2 font-serif font-bold text-sm text-red-800">
              <ShieldAlert className="w-4.5 h-4.5 text-red-600 shrink-0" />
              <span>Fixing Google "403 Forbidden" Error</span>
            </div>
            <p className="text-xs leading-relaxed">
              Google returns this 403 error page when the Web App request is blocked or unauthorized. Follow these steps to resolve it instantly:
            </p>
            <ul className="space-y-2 text-xs">
              <li className="flex gap-1.5 items-start">
                <span className="text-red-600 font-bold shrink-0">1.</span>
                <span><strong>Who has access: Anyone</strong> — When deploying, ensure the dropdown menu next to <em>"Who has access"</em> is set to <strong>Anyone</strong>. If set to "Only myself", no external submissions will go through.</span>
              </li>
              <li className="flex gap-1.5 items-start">
                <span className="text-red-600 font-bold shrink-0">2.</span>
                <span><strong>Enterprise/G-Suite restriction</strong> — If you are using a workspace email (e.g. your_name@company.com), your organization probably has a security policy blocking external Web Apps. <strong>Deploy the script using a personal @gmail.com account instead</strong> to allow public access.</span>
              </li>
              <li className="flex gap-1.5 items-start">
                <span className="text-red-600 font-bold shrink-0">3.</span>
                <span><strong>Incognito / Cache Glitch</strong> — Google's multi-account login system frequently throws false 403s. Access your web app or test the submission form inside a private <strong>Incognito Tab</strong> or log out of other accounts.</span>
              </li>
              <li className="flex gap-1.5 items-start">
                <span className="text-red-600 font-bold shrink-0">4.</span>
                <span><strong>Publish as New Version</strong> — If you modified the script, go to Deploy &gt; Manage Deployments, click the edit icon, choose <strong>New version</strong>, and click Deploy.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
