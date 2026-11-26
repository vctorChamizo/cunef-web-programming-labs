// Axios client for the Riverside FC API.
import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "/api" });

export async function getFixtures({ limit = 10, offset = 0 } = {}) {
  const response = await api.get("/fixtures", { params: { limit, offset } });
  return response.data.data;
}

export async function getSquad() {
  const response = await api.get("/squad");
  return response.data.data;
}
