import { Anchor, Box, Button, Center, Container, Divider, HStack, Icon, IconButton, TabList, Tabs } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { onMount, Show } from "solid-js";
import Navbar from "../components/Navbar";

import { useUser } from "../store/user";

function Account(props) {
	const navigate = useNavigate();
	const [user, { checkAndSet }] = useUser();

	onMount(async () => {
		if (!user().account) {
			navigate("/");
			return;
		}
		if (user().user.roles.includes("ROLE_ADMIN")) {
			navigate("/");
			return;
		}
	});

	return (
		<>
			<Navbar />
			<h1>Account Page</h1>
		</>
	);
}

export default Account;