import axios from "axios";
import { mockAuth } from "./mockAuth";

// Configure base URL - update this to match your Python backend
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Check if we should use mock auth (when backend is not available)
const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === "true" || false;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper to check if backend is available
async function checkBackendAvailable() {
  if (USE_MOCK_AUTH) return false;
  
  try {
    // Try a simple request to check if backend is up
    await axios.get(`${API_BASE_URL}/api/auth/verify`, { 
      timeout: 1000,
      validateStatus: () => true // Accept any status code
    });
    return true;
  } catch {
    return false;
  }
}

export const authAPI = {
  login: async (email, password) => {
    const backendAvailable = await checkBackendAvailable();
    
    if (!backendAvailable) {
      // Use mock auth
      console.log("🔧 Using mock authentication (backend not available)");
      return await mockAuth.login(email, password);
    }

    // Use real backend
    try {
      const response = await api.post("/api/auth/login", { email, password });
      return response.data;
    } catch (error) {
      // Fallback to mock if backend fails
      console.log("⚠️ Backend error, falling back to mock auth");
      return await mockAuth.login(email, password);
    }
  },

  signup: async (name, email, password) => {
    const backendAvailable = await checkBackendAvailable();
    
    if (!backendAvailable) {
      // Use mock auth
      console.log("🔧 Using mock authentication (backend not available)");
      return await mockAuth.signup(name, email, password);
    }

    // Use real backend
    try {
      const response = await api.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      // Fallback to mock if backend fails
      console.log("⚠️ Backend error, falling back to mock auth");
      return await mockAuth.signup(name, email, password);
    }
  },

  verifyToken: async (token) => {
    // Check if it's a mock token
    if (token && token.startsWith("mock_token_")) {
      return await mockAuth.verifyToken(token);
    }

    // Try real backend
    try {
      const response = await api.get("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.user;
    } catch (error) {
      // If it's a mock token, verify with mock
      if (token && token.startsWith("mock_token_")) {
        return await mockAuth.verifyToken(token);
      }
      return null;
    }
  },
};

export const phishingAPI = {
  checkURL: async (url) => {
    try {
      const response = await api.post("/api/phishing/check", { url });
      return response.data;
    } catch (error) {
      // Handle network errors or API errors
      if (error.response) {
        // Server responded with error status
        throw new Error(error.response.data?.detail || "Failed to check URL");
      } else if (error.request) {
        // Request made but no response (backend not running)
        throw new Error("Cannot connect to backend. Please ensure the Python backend is running.");
      } else {
        // Something else happened
        throw new Error(error.message || "An unexpected error occurred");
      }
    }
  },

  getExplanation: async (url, result) => {
    try {
      const response = await api.post("/api/phishing/explain", { url, result });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data?.detail || "Failed to get explanation");
      } else if (error.request) {
        throw new Error("Cannot connect to backend.");
      } else {
        throw new Error(error.message || "An unexpected error occurred");
      }
    }
  },
};

export default api;
