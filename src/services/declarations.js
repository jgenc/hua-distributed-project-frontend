import axios from "axios";

const apiUrl = "/api/declaration";
let baseUrl = "http://localhost:8080";
const backendUrl = import.meta.env.VITE_SOLID_BACKEND;
baseUrl = backendUrl
  ? backendUrl.concat(apiUrl)
  : baseUrl.concat(apiUrl);

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getDeclarations = async () => {
  try {
    const config = {
      headers: {
        Authorization: token
      }
    };
    const response = await axios.get(baseUrl, config);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const newDeclaration = async (declarationObect) => {
  try {
    const config = {
      headers: {
        Authorization: token
      }
    };
    const response = await axios.post(baseUrl, declarationObect, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default { setToken, getDeclarations, newDeclaration };