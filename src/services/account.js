import axios from "axios";

const apiUrl = "/api/person";
let baseUrl = "http://localhost:8080";
const backendUrl = import.meta.env.VITE_SOLID_BACKEND;
baseUrl = backendUrl
	? backendUrl.concat(apiUrl)
	: baseUrl.concat(apiUrl);

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const newAccount = async (accountObject) => {
	try {
		const config = {
			headers: {
				Authorization: token
			}
		};
		const response = await axios.post(baseUrl, accountObject, config);
		return response.data;
	} catch (e) {
		console.log(e);
		return e;
	}
};

const getAccount = async (tin) => {
	try {
		const config = {
			headers: {
				Authorization: token
			}
		};
		const response = await axios.get(baseUrl + `/${tin}`, config);
		console.log(response);
		return response.data;
	} catch (e) {
		return e;
	}
};

export default { setToken, newAccount, getAccount };