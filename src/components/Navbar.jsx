import { Anchor, Box, Button, Container, Divider, Flex, Heading, HStack, Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuTrigger, Spacer } from "@hope-ui/solid";
import { Link, useNavigate } from "@solidjs/router";
import { createSignal, mergeProps, onMount, Show } from "solid-js";
import { isUserLoggedIn } from "../services/login";


function Navbar(props) {
	const [user, setUser] = createSignal(null);
	const navigate = useNavigate();

	onMount(() => {
		const token = JSON.parse(window.sessionStorage.getItem("userToken"));
		if (!token) return;
		setUser(token);
	});

	const handleLogout = () => {
		window.sessionStorage.removeItem("userToken");
		setUser(null);
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
						{/* <Anchor as={Link} href="/help">Help</Anchor> */}
						<Show when={user()} fallback={
							<Button as={Link} href="/login">Log in</Button>
						}>
							<p>
								Logged in as <b> {user().username}</b>
							</p>
							<Menu>
								<MenuTrigger as={Button} colorScheme="info">
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