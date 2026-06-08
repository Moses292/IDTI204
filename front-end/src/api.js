// Central API configuration
// In production (Render), REACT_APP_API_URL is set as an environment variable.
// In development, it falls back to localhost:5000.
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default API_URL;
