// src/services/eventService.js
import api from "./api";

export const eventService = {
  getAllEvents: async () => {
    // GET /api/events
    const res = await api.get("/api/events");
    return res.data;
  },

  getEventById: async (id) => {
    // GET /api/events/:id
    const res = await api.get(`/api/events/${id}`);
    return res.data;
  },

  createEvent: async (payload) => {
    // POST /api/events
    const res = await api.post("/api/events", payload);
    return res.data;
  },

  updateEvent: async (id, payload) => {
    // PUT /api/events/:id
    const res = await api.put(`/api/events/${id}`, payload);
    return res.data;
  },

  deleteEvent: async (id) => {
    // DELETE /api/events/:id
    const res = await api.delete(`/api/events/${id}`);
    return res.data;
  },
};