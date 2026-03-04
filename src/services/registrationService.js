// src/services/registrationService.js
import api from "./api";

export const registrationService = {
  register: async (eventId) => {
    const res = await api.post("/api/registrations", { eventId });
    return res.data; // expected: { registrationId, eventId, ... }
  },

  myRegistrations: async () => {
    const res = await api.get("/api/registrations/me");
    return res.data; // expected array with { registrationId, event: {...} }
  },
};