/**
 * Google Indexing API Integration
 * Automatically notifies Google when new merchant pages are published
 */

interface IndexingRequest {
  url: string;
  type: 'URL_UPDATED' | 'URL_DELETED';
}

interface IndexingResponse {
  urlNotificationMetadata: {
    url: string;
    latestUpdate: {
      url: string;
      type: string;
      notifyTime: string;
    };
  };
}

/**
 * Submit a URL to Google Indexing API for crawling
 * @param url - The URL to submit for indexing
 * @param type - The type of update (URL_UPDATED for new/published content)
 * @returns Promise<boolean> - Success status
 */
export async function submitToGoogleIndexing(url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'): Promise<boolean> {
  try {
    // Check if Google Indexing API credentials are configured
    const serviceAccountKey = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_KEY;
    const serviceAccountEmail = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_EMAIL;

    if (!serviceAccountKey || !serviceAccountEmail) {
      console.warn('Google Indexing API credentials not configured. Skipping indexing notification.');
      return false;
    }

    // Get access token
    const accessToken = await getGoogleAccessToken(serviceAccountKey, serviceAccountEmail);

    if (!accessToken) {
      console.error('Failed to obtain Google access token for indexing API');
      return false;
    }

    // Prepare the request
    const requestBody: IndexingRequest = {
      url,
      type
    };

    // Submit to Google Indexing API
    const response = await fetch(`https://indexing.googleapis.com/v3/urlNotifications:publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google Indexing API error:', errorData);
      return false;
    }

    const data: IndexingResponse = await response.json();
    console.log('Successfully submitted URL to Google Indexing API:', data.urlNotificationMetadata.url);
    return true;

  } catch (error) {
    console.error('Error submitting URL to Google Indexing API:', error);
    return false;
  }
}

/**
 * Get Google access token for service account
 * @param serviceAccountKey - Base64 encoded service account private key
 * @param serviceAccountEmail - Service account email
 * @returns Promise<string | null> - Access token or null if failed
 */
async function getGoogleAccessToken(serviceAccountKey: string, serviceAccountEmail: string): Promise<string | null> {
  try {
    // Decode the service account key (full JSON)
    const serviceAccountJson = Buffer.from(serviceAccountKey, 'base64').toString('utf-8');
    const serviceAccount = JSON.parse(serviceAccountJson);

    // Extract the private key and email from the JSON
    const privateKey = serviceAccount.private_key;
    const email = serviceAccount.client_email || serviceAccountEmail;

    // Create JWT payload
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: email,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600, // 1 hour
      iat: now,
    };

    // Create JWT header
    const header = {
      alg: 'RS256',
      typ: 'JWT',
    };

    // Base64 encode header and payload
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');

    // Create signature
    const crypto = await import('crypto');
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(`${encodedHeader}.${encodedPayload}`);
    const signature = sign.sign(privateKey, 'base64url');

    // Create JWT
    const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;

    // Exchange JWT for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    if (!tokenResponse.ok) {
      console.error('Failed to get access token from Google OAuth2');
      return null;
    }

    const tokenData = await tokenResponse.json();
    return tokenData.access_token;

  } catch (error) {
    console.error('Error getting Google access token:', error);
    return null;
  }
}

/**
 * Notify Google about a new merchant page
 * @param merchantSlug - The merchant slug for the URL
 * @returns Promise<boolean> - Success status
 */
export async function notifyMerchantIndexed(merchantSlug: string): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';
  const merchantUrl = `${baseUrl}/merchants/${merchantSlug}`;

  return await submitToGoogleIndexing(merchantUrl, 'URL_UPDATED');
}

/**
 * Notify Google about multiple merchant pages
 * @param merchantSlugs - Array of merchant slugs
 * @returns Promise<boolean[]> - Array of success statuses
 */
export async function notifyMultipleMerchantsIndexed(merchantSlugs: string[]): Promise<boolean[]> {
  const promises = merchantSlugs.map(slug => notifyMerchantIndexed(slug));
  return await Promise.all(promises);
}