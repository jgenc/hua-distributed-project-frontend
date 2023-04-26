import jwtDecode from "jwt-decode";

export const decodeToken = (token) => jwtDecode(token);

export const accessToken = () => JSON.parse(window.sessionStorage.getItem("access_token"));

export const removeToken = () => window.sessionStorage.removeItem("access_token");


// New token
// {
//     "username": "admin",
//     "tin": "0",
//     "admin": true,
//     "notary": false,
//     "exp": 1681503337
// }