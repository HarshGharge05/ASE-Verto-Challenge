import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";

const api = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.map((cb) => cb(token));
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  console.log("Token From Api.js", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized AND not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");

          const response = await axios.post(
            "http://localhost:8181/realms/verto-onlineshop-security/protocol/openid-connect/token",
            new URLSearchParams({
              client_id: "verto-client-credentials",
              grant_type: "refresh_token",
              refresh_token: refreshToken,
            }),
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
          );

          const newAccessToken = response.data.access_token;
          localStorage.setItem("jwtToken", newAccessToken);

          isRefreshing = false;
          onRefreshed(newAccessToken);

          return api(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token expired. Logging out...");
          localStorage.clear();
          window.location.href = "/";
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
