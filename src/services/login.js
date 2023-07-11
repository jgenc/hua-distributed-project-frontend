import axios from "axios";

const apiUrl = "/api/auth/login";
let baseUrl = location.hostname;
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

const refresh = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get(baseUrl + "/refresh", config);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default { login, refresh };