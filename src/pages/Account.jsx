import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

import accountService from "../services/account";

function Account(props) {
	const navigate = useNavigate();

	onMount(async () => {
		const userToken = JSON.parse(window.sessionStorage.getItem("userToken"));
		if (!userToken) {
			navigate("/");
			return;
		}

		if (userToken.roles.includes("ROLE_ADMIN")) {
			navigate("/");
			return;
		}

		const accountToken = JSON.parse(window.sessionStorage.getItem("accountToken"));
		if (!accountToken) {
			navigate("/account/new");
			return;
		} else {
			accountService.setToken(userToken.accessToken);
			const account = await accountService.getAccount(userToken.tin);
			window.sessionStorage.setItem("accountToken", JSON.stringify(account));
			// setAccount(accountToken);
		}
	});

	return (
		<>
		</>
	);
}

export default Account;