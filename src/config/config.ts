// Configuration file for storing base URLs
// These URLs are imported from environment variables defined in .env file

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;
const OAUTH2_REDIRECT_URL = import.meta.env.VITE_OAUTH2_REDIRECT_URL;

export { 
    API_BASE_URL,
    GOOGLE_AUTH_URL,
    OAUTH2_REDIRECT_URL
 };