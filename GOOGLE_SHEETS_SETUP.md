# Google Sheets Integration Setup Guide

This guide will help you connect your contact form to your Google Spreadsheet.

## Step-by-Step Instructions

### Step 1: Open Your Google Spreadsheet
Open your spreadsheet: https://docs.google.com/spreadsheets/d/1MGaITTSJfM6_k4NwyevIPxIHSw9yvSnsZAuKV6Cg_tg/edit

### Step 2: Set Up Headers (First Row)
Make sure your spreadsheet has these headers in the first row:
- **Column A**: Timestamp
- **Column B**: Name
- **Column C**: Email
- **Column D**: Phone
- **Column E**: Profile URL

If you don't have headers, add them now.

### Step 3: Open Google Apps Script
1. In your spreadsheet, click **Extensions** → **Apps Script**
2. A new tab will open with the Apps Script editor

### Step 4: Paste the Script Code
1. Delete any existing code in the editor
2. Open the file `google-apps-script.js` from this project
3. Copy **ALL** the code from that file
4. Paste it into the Apps Script editor
5. Save the project (Ctrl+S or Cmd+S)
6. Give it a name like "Form Data Handler"

### Step 5: Deploy as Web App
1. Click on **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Fill in the deployment settings:
   - **Description**: "Form submission handler" (optional)
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** (important! This allows your website to send data)
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**

### Step 6: Copy the Web App URL
1. After deployment, you'll see a **Web app URL**
2. Copy this entire URL (it will look like: `https://script.google.com/macros/s/.../exec`)
3. **Important**: Keep this URL safe and don't share it publicly

### Step 7: Update Your HTML File
1. Open `index.html` in your project
2. Find this line (around line 428):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'` with your copied Web App URL
4. It should look like:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
5. Save the file

### Step 8: Test It!
1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your Google Spreadsheet - you should see a new row with the submitted data!

## Troubleshooting

### Data not appearing in spreadsheet?
- Make sure you set "Who has access" to **Anyone** when deploying
- Check the browser console (F12) for any error messages
- Verify the Web App URL is correct in your HTML file

### Getting authorization errors?
- Make sure you clicked "Allow" when authorizing the script
- Try redeploying the script

### Headers not showing?
- Run the `setupHeaders()` function once from the Apps Script editor:
  1. Select `setupHeaders` from the function dropdown
  2. Click the Run button (▶️)
  3. Authorize if prompted

## Security Note
The Web App URL allows anyone to write to your spreadsheet. While this is necessary for the form to work, be aware that:
- Don't share the Web App URL publicly
- Consider adding validation in the Google Apps Script if needed
- You can monitor submissions in your spreadsheet

## Need Help?
Check the Google Apps Script documentation or review the code comments in `google-apps-script.js`.

