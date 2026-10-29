import axios from "axios";

// One shared axios instance instead of every file hardcoding the full URL.
// REACT_APP_API_URL is read from .env at build time (CRA only exposes env
// vars prefixed with REACT_APP_) — locally it falls back to the Day 5/6
// Express server's default port; in production it's set to the deployed
// API's real URL (see ../../DEPLOYMENT_GUIDE.md).
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

export default api;