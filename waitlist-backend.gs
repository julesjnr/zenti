/**
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
 * Handles GET requests. Returns the current signup count and full leads list.
 */
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    // Header takes 1 row, so count is lastRow - 1 (if sheet is empty, lastRow is 0, count is 0)
    const count = lastRow > 1 ? lastRow - 1 : 0;
    const leads = [];
    
    if (lastRow > 1) {
      const dataRange = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
      for (let i = 0; i < dataRange.length; i++) {
        const row = dataRange[i];
        
        let dateVal = row[2];
        let dateStr = "";
        if (dateVal) {
          if (dateVal instanceof Date) {
            dateStr = Utilities.formatDate(dateVal, TIMEZONE, "yyyy-MM-dd");
          } else {
            dateStr = dateVal.toString();
          }
        }
        
        let timeVal = row[3];
        let timeStr = "";
        if (timeVal) {
          if (timeVal instanceof Date) {
            timeStr = Utilities.formatDate(timeVal, TIMEZONE, "HH:mm:ss");
          } else {
            timeStr = timeVal.toString();
          }
        }
        
        leads.push({
          id: Number(row[0]) || (i + 1),
          email: row[1] ? row[1].toString() : "",
          date: dateStr,
          time: timeStr,
          source: row[4] ? row[4].toString() : "Direct",
          status: "New",
          notes: ""
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      signupCount: count,
      leads: leads,
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
}
