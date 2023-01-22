import axios from "axios";

const apiUrl = "/api/admin/user";
let baseUrl = "http://localhost:8080";
const backendUrl = import.meta.env.VITE_SOLID_BACKEND;
baseUrl = backendUrl
	? backendUrl.concat(apiUrl)
	: baseUrl.concat(apiUrl);

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

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
		const formattedData = response.data.map(value => {
			const role = value.roles[0];
			delete value.roles;
			return { ...value, role };
		});
		console.log(formattedData);
		return formattedData;
	} catch (e) {
		console.log(e);
		return null;
	}
};

const deleteUser = async (id) => {
	try {
		const config = {
			headers: {
				Authorization: token
			}
		};
		const response = await axios.delete(baseUrl.concat(`/${id}`), config);
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

		return response.data.message.split("id:")[1];
	} catch (e) {
		console.log(e);
		return null;
	}
};

const changePassword = async (id, password) => {
	try {
		const config = {
			headers: {
				Authorization: token,
				"Content-Type": "application/json"
			}
		};
		const passwordObject = {
			password
		};
		const response = await axios.post(baseUrl.concat(`/${id}`), passwordObject, config);
		return response.data;
	} catch (e) {
		console.log(e);
		return null;
	}
};

const updateUser = async (id, updatedUserObject) => {
	try {
		const config = {
			headers: {
				Authorization: token,
				"Content-Type": "application/json"
			}
		};
		const response = await axios.put(baseUrl.concat(`/${id}`), updatedUserObject, config);
		return response.data;
	} catch (e) {
		console.log(e);
		return null;
	}
};

export default { users, setToken, deleteUser, createUser, changePassword, updateUser }; 