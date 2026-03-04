// src/services/attendanceService.js
import api from "./api";

export const attendanceService = {
  scan: async (registrationId) => {
    // Backend handles IN/OUT automatically
    const res = await api.post("/api/attendance/scan", { registrationId });
    return res.data;
    // expected response example:
    // { registered:true, studentName, eventTitle, nextAction:"IN/OUT/DONE", message }
  },

  getByEvent: async (eventId) => {
    const res = await api.get(`/api/attendance/event/${eventId}`);
    return res.data; // array
  },
};