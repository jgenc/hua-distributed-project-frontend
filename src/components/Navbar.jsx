import { Box, Button, Divider, Flex, Heading, HStack, Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuTrigger, Spacer } from "@hope-ui/solid";
import { Link, useNavigate } from "@solidjs/router";
import { createSignal, onMount, Show } from "solid-js";
import AdminContent from "../pages/admin/AdminContent";

import accountService from "../services/account";

// TODO: 
// 			- Display user's account name instead of username
// 			- 

function Navbar(props) {
	const [account, setAccount] = createSignal(null);
	const navigate = useNavigate();

	onMount(() => {
		// TODO
		// Tokens expire. What to do with that???
		const userToken = JSON.parse(window.sessionStorage.getItem("userToken"));
		if (!userToken) return;

		if (userToken.roles.includes("ROLE_ADMIN")) {
			setAccount({
				firstName: "admin",
				lastname: ""
			});
			return;
		}

		let accountToken = window.sessionStorage.getItem("accountToken");
		if (!accountToken) {
			clearTokens();
			return;
		}
		setAccount(JSON.parse(accountToken));
	});

	const clearTokens = () => {
		window.sessionStorage.removeItem("userToken");
		window.sessionStorage.removeItem("accountToken");
	};

	const handleLogout = () => {
		clearTokens();
		setAccount(null);
		navigate("/");
	};

	return (
		<>
			<Flex p="$3">
				<Box p="$2">
					<Heading as={Link} href="/" size="xl" fontWeight="$bold">
						Distributed Project
					</Heading>
				</Box>
				<Spacer />
				<Box>
					<HStack spacing="$3">
						<Show when={account()} fallback={
							<Button as={Link} href="/login">Log in</Button>
						}>
							<p>
								Καλωσήρθατε, <b>{account().firstName} {account().lastName}</b>
							</p>
							<Menu>
								<MenuTrigger as={Button} variant="subtle" colorScheme="info">
									Profile
								</MenuTrigger>
								<MenuContent>
									<MenuGroup>
										<MenuLabel>Profile</MenuLabel>
										<MenuItem>My Account</MenuItem>
										<MenuItem>Payments </MenuItem>
									</MenuGroup>
									<Divider role="presentation" my="$1" />
									<MenuGroup>
										<MenuLabel>Help</MenuLabel>
										<MenuItem>Docs</MenuItem>
										<MenuItem>FAQ</MenuItem>
									</MenuGroup>
									<Divider role="presentation" my="$1" />
									<MenuGroup>
										<MenuItem colorScheme="danger" onSelect={handleLogout}>Log Out</MenuItem>
									</MenuGroup>
								</MenuContent>
							</Menu>
						</Show>
					</HStack>
				</Box>
			</Flex>

			<Divider />
		</>
	);
}

export default Navbar;