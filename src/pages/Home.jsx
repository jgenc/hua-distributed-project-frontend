import { Anchor, Box, Center, Container, Divider, HStack } from "@hope-ui/solid";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import Navbar from "../components/Navbar";
import tokens from "../utils/tokens";
import ShowAllDeclarations from "./declarations/ShowAllDeclarations";
import loginService from "../services/login";
import { useUser } from "../store/user";

function Home(props) {
	const [user, { _ }] = useUser();

	return (
		<>
			<Navbar />
			<Show when={user()} fallback={<h1>Welcome to the app, please Log in.</h1>}>
				<Container p="$10	">
					<Center>
						<HStack spacing="$4">

							<Box
								background="$primary5"
								borderRadius="$md"
							>
								<HStack spacing="$1" height="$10">
									<Box m="1">
										<Center>
											Νέα Δήλωση
										</Center>
									</Box>
									<Divider orientation="vertical" color="black" />
									<Box>
										<Center>
											<Anchor href="/declarations/new">+</Anchor>
										</Center>
									</Box>
								</HStack>
							</Box>

							<Box
								background="$primary5"
								borderRadius="$md"
							>
								<HStack spacing="$1" height="$10">
									<Box m="1">
										<Center>
											Όλες οι δηλώσεις
										</Center>
									</Box>
									<Divider orientation="vertical" color="black" />
									<Box>
										<Center>
											<ShowAllDeclarations />
										</Center>
									</Box>
								</HStack>
							</Box>
						</HStack>
					</Center>
				</Container>
			</Show>
		</>
	);
}

export default Home;