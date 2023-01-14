const isUserAdmin = (user) => {
	return user.roles.includes("ROLE_ADMIN")
		? true
		: false;
};

export default { isUserAdmin };