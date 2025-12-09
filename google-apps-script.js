/**
 * Google Apps Script to save form data to Google Sheets
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Open your Google Spreadsheet:
 *    https://docs.google.com/spreadsheets/d/1MGaITTSJfM6_k4NwyevIPxIHSw9yvSnsZAuKV6Cg_tg/edit
 * 
 * 2. Click on "Extensions" → "Apps Script"
 * 
 * 3. Delete any existing code and paste this entire script
 * 
 * 4. Save the project (Ctrl+S or Cmd+S) and give it a name like "Form Data Handler"
 * 
 * 5. Click on "Deploy" → "New deployment"
 * 
 * 6. Click the gear icon (⚙️) next to "Select type" and choose "Web app"
 * 
 * 7. Set the following:
 *    - Description: "Form submission handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (this allows your website to send data)
 * 
 * 8. Click "Deploy"
 * 
 * 9. Copy the "Web app URL" that appears
 * 
 * 10. Go back to your index.html file and replace 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE' 
 *     with the copied URL
 * 
 * 11. Make sure your spreadsheet has headers in the first row:
 *     Column A: Timestamp
 *     Column B: Name
 *     Column C: Email
 *     Column D: Phone
 *     Column E: Profile URL
 */

function doPost(e) {
  try {
    // Get the active spreadsheet by ID (more reliable)
    const SPREADSHEET_ID = 'AKfycbwQbTj3V0WDuBa76HWjaYc7j233CmLlBLIUIxKdOJixJnpwGemREwK1FFXqETbdwu_HvA';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // Parse the JSON data from the POST request
    let data;
    
    if (e.postData && e.postData.contents) {
      // Parse JSON from request body
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // Fallback: handle URL-encoded parameters
      data = e.parameter;
    } else {
      Logger.log('Error: No data received');
      throw new Error('No data received');
    }
    
    Logger.log('Received data: ' + JSON.stringify(data));
    
    // Get current timestamp if not provided
    const timestamp = data.timestamp || new Date().toLocaleString();
    
    // Prepare the row data
    const rowData = [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.url || 'Not provided'
    ];
    
    Logger.log('Appending row: ' + JSON.stringify(rowData));
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    Logger.log('Data saved successfully');
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Alternative: doGet method (simpler, uses URL parameters)
 * This is more reliable for cross-origin requests
 */
function doGet(e) {
  try {
    // Get the active spreadsheet by ID (more reliable)
    const SPREADSHEET_ID = 'AKfycbwQbTj3V0WDuBa76HWjaYc7j233CmLlBLIUIxKdOJixJnpwGemREwK1FFXqETbdwu_HvA';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // Get parameters from URL
    const data = e.parameter;
    
    Logger.log('Received data via GET: ' + JSON.stringify(data));
    
    // Get current timestamp
    const timestamp = new Date().toLocaleString();
    
    // Prepare the row data
    const rowData = [
      timestamp,
      decodeURIComponent(data.name || ''),
      decodeURIComponent(data.email || ''),
      decodeURIComponent(data.phone || ''),
      decodeURIComponent(data.url || 'Not provided')
    ];
    
    Logger.log('Appending row: ' + JSON.stringify(rowData));
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    Logger.log('Data saved successfully via GET');
    
    // Return success response
    return ContentService.createTextOutput('Data saved successfully')
      .setMimeType(ContentService.MimeType.TEXT);
    
  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
    return ContentService.createTextOutput('Error: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

/**
 * OPTIONAL: Setup function to create headers if they don't exist
 * Run this once manually from the Apps Script editor if needed
 */
function setupHeaders() {
  const SPREADSHEET_ID = 'AKfycbwQbTj3V0WDuBa76HWjaYc7j233CmLlBLIUIxKdOJixJnpwGemREwK1FFXqETbdwu_HvA';
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getActiveSheet();
  
  // Check if first row is empty or doesn't have headers
  const firstRow = sheet.getRange(1, 1, 1, 5).getValues()[0];
  
  if (!firstRow[0] || firstRow[0] === '') {
    // Set headers
    sheet.getRange(1, 1, 1, 5).setValues([[
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Profile URL'
    ]]);
    
    // Style the header row
    sheet.getRange(1, 1, 1, 5)
      .setFontWeight('bold')
      .setBackground('#4285f4')
      .setFontColor('#ffffff');
    
    Logger.log('Headers created successfully!');
  } else {
    Logger.log('Headers already exist.');
  }
}

/**
 * TEST FUNCTION: Run this to test if the script can write to your spreadsheet
 * 1. Select this function from the dropdown in Apps Script editor
 * 2. Click Run (▶️)
 * 3. Check your spreadsheet - you should see a test row
 * 4. Check the Execution log (View → Execution log) for any errors
 */
function testWriteToSheet() {
  try {
    const SPREADSHEET_ID = 'AKfycbwQbTj3V0WDuBa76HWjaYc7j233CmLlBLIUIxKdOJixJnpwGemREwK1FFXqETbdwu_HvA';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    const testData = [
      new Date().toLocaleString(),
      'Test Name',
      'test@example.com',
      '1234567890',
      'https://github.com/test'
    ];
    
    sheet.appendRow(testData);
    Logger.log('Test data written successfully!');
    Logger.log('Check your spreadsheet for a row with "Test Name"');
    
    return 'Success! Check your spreadsheet.';
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    return 'Error: ' + error.toString();
  }
}

