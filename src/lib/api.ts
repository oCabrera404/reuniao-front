const API_URL = "http://localhost:8080";

export const api = async (
  endpoint: string,
  method: string = "GET",
  body?: any
) => {

  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: body ? JSON.stringify(body) : undefined
  });

  return response.json();
};