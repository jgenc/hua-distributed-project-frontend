import axios from 'axios';

const apiUrl = "/api/admin/user";
let baseUrl = "http://localhost:8080";
const backendUrl = import.meta.env.BACKEND;
baseUrl = backendUrl
	? backendUrl.concat(apiUrl)
	: baseUrl.concat(apiUrl);

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
}

const users = async () => {
	try {
		const config = {
			headers: {
				Authorization: token 
			}
		};
		const response = await axios.get(baseUrl, config);
		return response.data;
	} catch (e) {
		console.log(e);
		return null;
	}
};

export default { users, setToken }; 