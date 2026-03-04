// src/services/authService.js
import api from "./api";

export const authService = {
  adminLogin: async (email, password) => {
    // Backend expected: POST /api/auth/admin/login -> { token, role, name, email }
    const res = await api.post("/api/auth/admin/login", { email, password });
    return res.data;
  },

  userLogin: async (email, password) => {
    // Backend expected: POST /api/auth/user/login -> { token, role, name, email }
    const res = await api.post("/api/auth/user/login", { email, password });
    return res.data;
  },
};