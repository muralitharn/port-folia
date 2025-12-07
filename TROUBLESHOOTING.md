# Troubleshooting: Data Not Appearing in Google Sheets

If data from your form is not appearing in your Google Spreadsheet, follow these steps:

## Step 1: Verify the Script is Deployed Correctly

1. Open your Google Spreadsheet
2. Go to **Extensions** → **Apps Script**
3. Click **Deploy** → **Manage deployments**
4. Make sure you have an active deployment
5. Verify that "Who has access" is set to **Anyone**

## Step 2: Test the Script Manually

1. In the Apps Script editor, find the function dropdown (top center)
2. Select `testWriteToSheet`
3. Click the **Run** button (▶️)
4. Authorize if prompted
5. Check your spreadsheet - you should see a test row with "Test Name"
6. If this works, the script can write to your sheet

## Step 3: Check Execution Logs

1. In Apps Script editor, go to **View** → **Execution log** (or click the clock icon)
2. Look for recent executions when you submitted the form
3. Check for any error messages
4. Common errors:
   - **Permission denied**: Need to authorize the script
   - **Cannot find sheet**: Check the spreadsheet ID
   - **No data received**: Check the JavaScript code

## Step 4: Verify Spreadsheet ID

1. Open your spreadsheet
2. Check the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
3. The SPREADSHEET_ID should be: `1MGaITTSJfM6_k4NwyevIPxIHSw9yvSnsZAuKV6Cg_tg`
4. In the Apps Script, verify this ID matches in both `doPost` and `doGet` functions

## Step 5: Check Browser Console

1. Open your website
2. Press **F12** to open Developer Tools
3. Go to the **Console** tab
4. Submit the form
5. Look for:
   - "Sending data to Google Sheets: ..."
   - "Data sent to Google Sheets successfully"
   - Any error messages in red

## Step 6: Verify Headers Exist

1. Open your spreadsheet
2. Make sure Row 1 has these headers:
   - Column A: Timestamp
   - Column B: Name
   - Column C: Email
   - Column D: Phone
   - Column E: Profile URL
3. If headers don't exist:
   - In Apps Script editor, select `setupHeaders` function
   - Click **Run** (▶️)
   - Check your spreadsheet

## Step 7: Redeploy the Script

If nothing works, try redeploying:

1. In Apps Script editor, click **Deploy** → **Manage deployments**
2. Click the pencil icon (✏️) to edit
3. Create a **New version**
4. Click **Deploy**
5. Copy the new Web App URL
6. Update the URL in your `index.html` file (line 467)

## Step 8: Check Permissions

1. Make sure the script has permission to access the spreadsheet
2. When you first run the script, you should see an authorization prompt
3. Click **Allow** to grant permissions
4. If you denied permissions, you need to:
   - Go to https://myaccount.google.com/permissions
   - Find your Apps Script project
   - Remove it
   - Run the script again and authorize

## Step 9: Test with Direct URL

Test if the script works by visiting this URL directly in your browser (replace with your actual data):

```
https://script.google.com/macros/s/AKfycbwQbTj3V0WDuBa76HWjaYc7j233CmLlBLIUIxKdOJixJnpwGemREwK1FFXqETbdwu_HvA/exec?name=Test&email=test@test.com&phone=1234567890&url=https://github.com/test
```

If this adds a row to your spreadsheet, the script works and the issue is with the JavaScript code.

## Common Issues and Solutions

### Issue: "Script function not found"
**Solution**: Make sure you saved the script in Apps Script editor

### Issue: "Access denied" or "Permission denied"
**Solution**: 
- Redeploy with "Who has access" set to "Anyone"
- Re-authorize the script

### Issue: Data appears but is empty
**Solution**: Check the JavaScript is sending data correctly. Check browser console.

### Issue: Script works in test but not from website
**Solution**: 
- Check CORS settings
- Verify the Web App URL is correct
- Check browser console for errors

## Still Not Working?

1. Check the Apps Script execution logs for detailed error messages
2. Verify the spreadsheet ID is correct in the script
3. Make sure you're using the latest version of the deployed script
4. Try the `testWriteToSheet` function to verify basic functionality

