export const API_BASE = import.meta.env.VITE_WEB_API || "http://localhost:3000";

export const ENDPOINTS = {
  // experience (momentos/posts)
  POSTS: `${API_BASE}/posts/experiences`,
  GET_POST: (id) => `${API_BASE}/posts/experiences/${id}`,
  DELETE_POST: (id) => `${API_BASE}/posts/experiences/${id}`,
  USER_POST: (userId) => `${API_BASE}/posts/experiences/user/${userId}`,

  // itineraries (plans)
  ITINERARIES: `${API_BASE}/itineraries`,
  POST_ITINERARIES: `${API_BASE}/itineraries`,
  GET_ITINERARY: (id) => `${API_BASE}/itineraries/${id}`,
  USER_ITINERARIES: (userId) => `${API_BASE}/itineraries/${userId}`,
  DELETE_ITINERARY: (id) => `${API_BASE}/itineraries/${id}`,

  // services
  POST_SERVICE: `${API_BASE}/posts/services`,
  ALL_SERVICES: `${API_BASE}/posts/services`,
  DELETE_SERVICE: (id) => `${API_BASE}/posts/services/${id}`,
  GET_SERVICE: (id) => `${API_BASE}/posts/services/${id}`,
  USER_SERVICE: (userId) => `${API_BASE}/posts/services/user/${userId}`,

  // featured treks
  GET_FEATURED_TREKS: (limit = 10) =>
    `${API_BASE}/posts/featured/treks?limit=${limit}`,

  // nearby treks (geo-based)
  GET_NEARBY_TREKS: ({ latitude, longitude }) =>
    `${API_BASE}/posts/nearby/treks?latitude=${latitude}&longitude=${longitude}`,

  // top rated treks
  GET_TOPRATED_TREKS: `${API_BASE}/posts/top-rated/treks`,

  // top rated hosts
  GET_TOPRATED_HOSTS: `${API_BASE}/users/top-rated/hosts`,
};
