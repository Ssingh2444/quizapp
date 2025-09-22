import axios from "axios";

// ✅ Configure Axios instance with baseURL
const instance = axios.create({
  baseURL: "http://localhost:8080", // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Optional: log requests & responses (for debugging)
instance.interceptors.request.use(
  (config) => {
    console.log("➡️ Request:", config.method?.toUpperCase(), config.url, config.data || config.params);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default instance;
