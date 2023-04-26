import axios from "axios";

const apiUrl = "/api/auth/login";
let baseUrl = "http://localhost:8000";
const backendUrl = import.meta.env.VITE_SOLID_BACKEND;
baseUrl = backendUrl
  ? backendUrl.concat(apiUrl)
  : baseUrl.concat(apiUrl);

const login = async (credentials) => {
  try {
    const headers = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    const response = await axios.post(baseUrl, credentials, headers);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const logout = () => {
  window.sessionStorage.removeItem("userToken");
  window.sessionStorage.removeItem("accountToken");
};

export default { login, logout };