import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// Create the central client for database and auth
export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: appBaseUrl, // Changed from '' to appBaseUrl for stability
  requiresAuth: false,
  appBaseUrl
});