import axios from "axios";

const API_BASE = import.meta.env.VITE_WEB_API;

export async function getProfileByIdApi(userId) {
  const token = localStorage.getItem("auth_token");

  const res = await axios.get(
    `${API_BASE}/users/profile/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data; // { success, data }
}
