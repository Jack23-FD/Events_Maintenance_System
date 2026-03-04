// src/services/userService.js
import api from "./api";

export const userService = {
  registerForEvent: async (eventId) => {
    // POST /api/registrations  { eventId }
    const res = await api.post("/api/registrations", { eventId });
    return res.data;
  },

  getMyEvents: async () => {
    // GET /api/registrations/me
    const res = await api.get("/api/registrations/me");
    return res.data;
  },

  getMyCertificates: async () => {
    // GET /api/certificates/me
    const res = await api.get("/api/certificates/me");
    return res.data;
  },
};