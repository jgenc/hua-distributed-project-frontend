const parseToken = (token) => JSON.parse(window.sessionStorage.getItem(token));

const userToken = () => parseToken("userToken");
const accountToken = () => parseToken("accountToken");

export default { userToken, accountToken };