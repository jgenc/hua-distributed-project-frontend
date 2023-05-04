import axios from "axios";
import { useUser } from "../store/user";
import { removeTokens } from "../utils/tokens";
import { useNavigate } from "@solidjs/router";

const apiUrl = "/api/admin/user";
let baseUrl = "http://localhost:8000";
const backendUrl = import.meta.env.VITE_SOLID_BACKEND;
baseUrl = backendUrl
  ? backendUrl.concat(apiUrl)
  : baseUrl.concat(apiUrl);

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// TODO: Find a way to quickly throw out user

const users = async () => {
  try {
    const config = {
      headers: {
        Authorization: token
      }
    };
    const response = await axios.get(baseUrl, config);
    // ! This is a workaround for the "roles" attribute the backend provides
    // We should change the backend
    // const formattedData = response.data.map(value => {
    // 	const role = value.roles[0];
    // 	delete value.roles;
    // 	return { ...value, role };
    // });
    // console.log(formattedData);
    // return formattedData;
    return response.data;
  } catch (e) {
    if (e.response.status == 401) {
      console.log("Unauthorized");
      removeTokens();
      // FIXME:
      sessionStorage.removeItem("session");
      return null;
    }
    return null;
  }
};

const deleteUser = async (tin) => {
  try {
    const config = {
      headers: {
        Authorization: token
      }
    };
    const response = await axios.delete(baseUrl.concat(`/${tin}`), config);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * 
 * @param {user} user 
 * User object to request a registration. Must contain username, password and tin
 * attributes
 * @returns {Number | null}
 * Id of registered user
 */
const createUser = async (user) => {
  try {
    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    };
    const response = await axios.post(baseUrl, user, config);
    console.log(response);
    return response.data;
  } catch (e) {
    return e;
  }
};

const changePassword = async (tin, password) => {
  try {
    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    };
    const response = await axios.post(baseUrl.concat(`/${tin}`), { password }, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const updateUser = async (tin, updatedUserObject) => {
  try {
    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    };
    // updatedUserObject.role = updatedUserObject.role.name;
    const response = await axios.put(baseUrl.concat(`/${tin}`), updatedUserObject, config);
    return response.data;
  } catch (e) {
    return e;
  }
};

export default { users, setToken, deleteUser, createUser, changePassword, updateUser }; 