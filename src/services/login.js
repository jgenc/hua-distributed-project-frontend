import axios from "axios";

const apiUrl = "/api/auth/signin";
let baseUrl = "http://localhost:8080";
const backendUrl = import.meta.env.VITE_SOLID_BACKEND;
baseUrl = backendUrl
	? backendUrl.concat(apiUrl)
	: baseUrl.concat(apiUrl);

const login = async (credentials) => {
	try {
		const response = await axios.post(baseUrl, credentials);
		return response.data;
	} catch (e) {
		console.log(e);
		return null;
	}
};

const isLoggedIn = () => {
	return window.sessionStorage.getItem("userToken") !== null;
};

const logout = () => {
	window.sessionStorage.removeItem("userToken");
	window.sessionStorage.removeItem("accountToken");
};

export default { login, logout, isLoggedIn };