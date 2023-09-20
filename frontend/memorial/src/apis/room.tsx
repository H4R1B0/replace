const BASE_URL = import.meta.env.VITE_APP_API_URL;

export async function deleteRoom() {
  const response = await fetch(`${BASE_URL}/room`, { method: "DELETE" });
  return response.json();
}
