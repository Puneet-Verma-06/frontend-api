
export const API_BASE = import.meta.env.VITE_WEB_API || "http://localhost:3000";

export const ENDPOINTS = {
  // experience
  POSTS: `${API_BASE}/posts`,
  GET_POST: (id) => `${API_BASE}/posts/${id}`,
  DELETE_POST: (id) => `${API_BASE}/posts/${id}`,

  // post
  ALL_POST: `${API_BASE}/posts/treks`,
  FEATURED_POST: `${API_BASE}/posts/featured/treks`,

  // itineraries (plans)
  ITINERARIES: `${API_BASE}/itineraries`,
  GET_ITINERARY: (id) => `${API_BASE}/itineraries/${id}`,
};
