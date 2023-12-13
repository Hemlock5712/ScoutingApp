import { GCP_SERVICE_ACCOUNT_EMAIL, GCP_PRIVATE_KEY, GCP_PROJECT_ID } from "$env/static/private";


export const getGCPCredentials = () => {
    // for Vercel, use environment variables
    return GCP_PRIVATE_KEY
      ? {
          credentials: {
            client_email: GCP_SERVICE_ACCOUNT_EMAIL,
            private_key: GCP_PRIVATE_KEY,
          },
          projectId: GCP_PROJECT_ID,
        }
        // for local development, use gcloud CLI
      : {};
  };