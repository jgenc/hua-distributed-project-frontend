import { Anchor, Box, Button, Divider, Flex, Heading, HStack, Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuTrigger, Spacer } from "@hope-ui/solid";
import { Link, useNavigate } from "@solidjs/router";
import { createEffect, createMemo, createSignal, on, onMount, Show } from "solid-js";
import { useUser } from "../store/user";

function Navbar(props) {
	const [user, { logout, checkAndSet }] = useUser();

	const navigate = useNavigate();

	onMount(() => {
		checkAndSet();
	});

	const handleLogout = () => {
		logout();
	};

	console.log(user());

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
						<Show when={user()} fallback={
							<Button as={Link} href="/login">Log in</Button>
						}>
							<p>
								Καλωσήρθατε, <b>{user().account.firstName} {user().account.lastName}</b>
							</p>
							<Menu>
								<MenuTrigger as={Button} variant="subtle" colorScheme="info">
									Profile
								</MenuTrigger>
								<MenuContent>
									<MenuGroup>
										<MenuLabel>Profile</MenuLabel>
										<MenuItem onSelect={() => navigate("/account")}>My Account</MenuItem>
									</MenuGroup>
									<Divider role="presentation" my="$1" />
									<MenuGroup>
										<MenuLabel>Help</MenuLabel>
										<MenuItem>Docs</MenuItem>
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