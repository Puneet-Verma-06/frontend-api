// src/api/authApi.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseURL = import.meta.env.VITE_WEB_API;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ---------------- Normalizers ---------------- */

const ok = (res) => {
  const data = res.data || {};

  return {
    ok: data.success === true, // ✅ IMPORTANT
    status: res.status,
    message: data.message || data.msg || "",
    data,
  };
};

const toNiceError = (error) => {
  if (error?.response) {
    const { status, data } = error.response;
    return {
      ok: false,
      status,
      message: data?.message || data?.msg || `Request failed (${status}).`,
      data,
    };
  }

  if (error?.request) {
    return {
      ok: false,
      status: 0,
      message: "Network error: could not reach server.",
      data: null,
    };
  }

  return {
    ok: false,
    status: 0,
    message: error?.message || "Unexpected error.",
    data: null,
  };
};

/* ---------------- Auth APIs ---------------- */

// Step 1: Signup initiate
export async function signupInitiateApi(payload) {
  try {
    const res = await api.post("/auth/signup/initiate", payload);
    return ok(res);
  } catch (err) {
    return toNiceError(err);
  }
}

// Step 2: Signup complete (OTP)
export async function signupCompleteApi(payload) {
  try {
    const res = await api.post("/auth/signup/complete", payload);
    return ok(res);
  } catch (err) {
    return toNiceError(err);
  }
}

// Login
export async function signinApi({ email, password }) {
  try {
    const res = await api.post("/auth/signin", { email, password });
    return ok(res);
  } catch (err) {
    return toNiceError(err);
  }
}

// Fetch logged-in user
export async function getUserDetailsApi() {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("No token");

    const decoded = jwtDecode(token);
    const res = await api.get(`/users/profile/${decoded.userId}`);
    return ok(res);
  } catch (err) {
    return toNiceError(err);
  }
}
