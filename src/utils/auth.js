const session = JSON.parse(sessionStorage.getItem("session"));

const isUserLoggedIn = () => {
  if (!session) return false;
  return true;
};

const isUserAdmin = () => {
  if (!isUserLoggedIn) return false;
  if (!session.user.roles.includes("ROLE_ADMIN")) return false;
  return true;
};

export { isUserLoggedIn, isUserAdmin };