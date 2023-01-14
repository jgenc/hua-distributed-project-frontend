import axios from 'axios';

const apiUrl = "/api/auth/signin";
let baseUrl = "http://localhost:8080";
const backendUrl = import.meta.env.BACKEND;
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

export default { login }; 