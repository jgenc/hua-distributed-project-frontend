import axios from "axios";

const apiUrl = "/api/declarations";
let baseUrl = "http://localhost:8000";
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
    return e;
  }
};

const getDeclarationById = async (id) => {
  try {
    const config = {
      headers: {
        Authorization: token
      }
    };
    const response = await axios.get(baseUrl + `/${id}`, config);
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

const acceptDeclaration = async (id) => {
  try {
    const config = {
      headers: {
        Authorization: token
      }
    };
    const response = await axios.post(baseUrl + `/accept/${id}`, {}, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const completeDeclaration = async (id, contractObject) => {
  try {
    const config = {
      headers: {
        Authorization: token
      }
    };
    const response = await axios.post(baseUrl + `/complete/${id}`, contractObject, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default { setToken, getDeclarations, newDeclaration, getDeclarationById, acceptDeclaration, completeDeclaration };