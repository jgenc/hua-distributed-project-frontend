import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Center, Container, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, VStack } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { createSignal, onMount, Show } from "solid-js";
import loginService from "../services/login";

function LoginForm(props) {
	const [username, setUsername] = createSignal("");
	const [password, setPassword] = createSignal("");

	const [notification, setNotification] = createSignal(false);

	const navigate = useNavigate();

	onMount(() => {
		const sessionUser = JSON.parse(window.sessionStorage.getItem("userToken"));
		if (!sessionUser) return;
		navigate("/");
	});

	const handleLogin = async (event) => {
		event.preventDefault();

		const credentials = {
			username: username(),
			password: password()
		};

		const response = await loginService.login(credentials);

		setUsername("");
		setPassword("");

		if (!response) {
			console.log("error logging in");
			setNotification(true);
			return;
		}

		window.sessionStorage.setItem("userToken", JSON.stringify(response));

		console.log(response, window.sessionStorage.getItem("userToken"));

		if (response.roles.includes("ROLE_ADMIN")) {
			navigate("/admin");
		} else {
			// Navigate normal user to his page
			navigate("/account");
		}
	};

	return (
		<Center h="$xl">
			<Container centerContent>
				<VStack spacing="$5">
					<Show when={notification()}>
						<Alert variant="left-accent" status="danger">
							<AlertIcon mr="$2_5" />
							<AlertTitle mr="$2_5">Η σύνδεση ήταν αδύνατη!</AlertTitle>
							<AlertDescription>Ελέγξτε ξανά τα στοιχεία σας.</AlertDescription>
						</Alert>
					</Show>

					<form onSubmit={handleLogin}>
						<VStack
							spacing="$5"
							alignItems="stretch"
							maxW="$96"
							mx="auto"
							borderWidth="1px"
							borderColor="$neutral6"
							borderRadius="$lg"
							p="$5"
						>
							<Heading size="3xl">Συνδεθείτε</Heading>
							<FormControl required>
								<FormLabel for="username">Username</FormLabel>
								<Input
									id="username"
									onChange={(event) => setUsername(event.target.value)}
									value={username()}
								/>
								<FormHelperText>I.e johndoexd</FormHelperText>
							</FormControl>

							<FormControl required>
								<FormLabel for="password">Password</FormLabel>
								<Input
									type="password"
									id="password"
									onChange={(event) => setPassword(event.target.value)}
									value={password()}
								/>
								<FormHelperText>mysekretpass123</FormHelperText>
							</FormControl>

							<HStack justifyContent="flex-end">
								<Button type="submit">Log In</Button>
							</HStack>
						</VStack>
					</form>

				</VStack>
			</Container>

		</Center>
	);
}

export default LoginForm;