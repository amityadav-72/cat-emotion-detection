const API_BASE_URL = "http://127.0.0.1:8000";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`
});

export default API_BASE_URL;
