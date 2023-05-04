import jwtDecode from "jwt-decode";

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};

export const accessToken = () => JSON.parse(window.sessionStorage.getItem("access_token"));

export const accountToken = () => JSON.parse(window.sessionStorage.getItem("account_token"));

export const removeTokens = () => {
  window.sessionStorage.removeItem("access_token");
  window.sessionStorage.removeItem("account_token");
}


// New token
// {
//     "username": "admin",
//     "tin": "0",
//     "admin": true,
//     "notary": false,
//     "exp": 1681503337
// }