# Google Indexing API Setup for Automatic Merchant Page Indexing

This document explains how to set up automatic indexing of merchant pages using Google's Indexing API.

## Overview

When merchants are activated, their profile pages are now automatically submitted to Google for indexing, eliminating the need for manual submission through Google Search Console.

## Setup Instructions

### 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Indexing API:
   - Go to "APIs & Services" > "Library"
   - Search for "Indexing API"
   - Click "Enable"

### 2. Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `merchant-indexing-service`
   - Description: `Service account for automatic merchant page indexing`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 3. Generate Service Account Key

1. Find your new service account in the credentials list
2. Click on it to open the details
3. Go to the "Keys" tab
4. Click "Add Key" > "Create new key"
5. Select "JSON" format
6. Download the JSON key file

### 4. Grant Permissions

1. In Google Cloud Console, go to the Indexing API page
2. Click "Manage" or find the service account
3. Make sure the service account has the "Owner" role for the Indexing API

### 5. Configure Environment Variables

Add these environment variables to your `.env.local` file:

```env
# Google Indexing API Credentials
GOOGLE_INDEXING_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_INDEXING_SERVICE_ACCOUNT_KEY=base64-encoded-private-key
```

To get the base64 encoded private key:
```bash
# On Linux/Mac
cat path/to/service-account-key.json | base64 -w 0

# On Windows (PowerShell)
[System.Convert]::ToBase64String([System.IO.File]::ReadAllBytes("path/to/service-account-key.json"))
```

Copy the entire base64 string (including the JSON content) to the `GOOGLE_INDEXING_SERVICE_ACCOUNT_KEY` variable.

### 6. Verify Domain Ownership

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain (`citywitty.com`)
3. Verify ownership using one of the available methods (DNS, HTML file, etc.)

## Usage

### Activating Merchants

Use the new admin API endpoint to activate merchants:

```bash
curl -X POST http://localhost:3000/api/admin/activate-merchant \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "your-merchant-id",
    "action": "activate"
  }'
```

Available actions:
- `activate` - Activate merchant and notify Google
- `suspend` - Suspend merchant
- `deactivate` - Deactivate merchant

### What Happens When a Merchant is Activated

1. **Database Update**: Merchant status changes to "active"
2. **Google Indexing API**: URL is submitted to Google for immediate indexing
3. **ISR Revalidation**: Next.js page cache is invalidated for instant updates
4. **Sitemap Update**: Sitemap cache is refreshed to include the new merchant

## Monitoring

Check your application logs for indexing notifications:

```
Successfully notified Google about new merchant: merchant-slug
```

If indexing fails, you'll see warnings but the activation will still succeed.

## Troubleshooting

### Common Issues

1. **"Google Indexing API credentials not configured"**
   - Check that environment variables are set correctly
   - Verify the base64 encoding of the service account key

2. **"Failed to obtain Google access token"**
   - Verify the service account email matches the JSON key
   - Check that the service account has proper permissions

3. **Indexing API returns errors**
   - Ensure domain ownership is verified in Google Search Console
   - Check that the service account is properly configured

### Testing

To test the setup without affecting production:

1. Create a test merchant
2. Activate it using the API
3. Check logs for successful indexing notification
4. Verify the merchant appears in your sitemap faster (now every 30 minutes instead of 1 hour)

## Benefits

- **Automatic Indexing**: No more manual Google Search Console submissions
- **Faster Discovery**: Merchants appear in search results within hours instead of days/weeks
- **Improved SEO**: Better search engine visibility for new merchants
- **Reduced Manual Work**: Admins don't need to remember to submit new pages

## Testing the Integration

### Automated Tests

Run the comprehensive test suite:

```bash
# Using Node.js script
node test-indexing.js

# Or test individual endpoints
curl http://localhost:3000/api/test-indexing
curl -X POST http://localhost:3000/api/test-activation
```

### Manual Testing

1. **Test Indexing API**:
   ```bash
   curl http://localhost:3000/api/test-indexing
   ```
   Should return test results showing if credentials are configured and API calls succeed.

2. **Test Full Activation Flow**:
   ```bash
   curl -X POST http://localhost:3000/api/test-activation
   ```
   Creates a test merchant, activates it, tests indexing notification, and cleans up.

3. **Verify Sitemap**:
   ```bash
   curl http://localhost:3000/sitemap.xml
   ```
   Should contain merchant URLs and update every 30 minutes.

4. **Test Real Merchant Activation**:
   ```bash
   curl -X POST http://localhost:3000/api/admin/activate-merchant \
     -H "Content-Type: application/json" \
     -d '{"merchantId": "real-merchant-id", "action": "activate"}'
   ```

### Expected Results

- ✅ **All tests pass**: Full integration working
- ⚠️ **Indexing fails but activation works**: Check Google credentials
- ❌ **Activation fails**: Database or API issues

## Security Notes

- Store the service account key securely
- Never commit the key to version control
- Use environment variables for all sensitive credentials
- Regularly rotate service account keys