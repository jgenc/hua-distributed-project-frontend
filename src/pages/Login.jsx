import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Center, Container, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, VStack } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { createSignal, mergeProps, onMount, Show } from "solid-js";
import accountService from "../services/account";
import loginService from "../services/login";
import { useUser } from "../store/user";
import tokens from "../utils/tokens";

// !!!!!!!!!!!!!!!!!!!!
// TODO: Update form to be used with felte
// !!!!!!!!!!!!!!!!!!!!

function LoginForm(props) {
	const [user, { login, checkAndSet }] = useUser();
	const [username, setUsername] = createSignal("");
	const [password, setPassword] = createSignal("");

	const [notification, setNotification] = createSignal(false);
	const [spinner, setSpinner] = createSignal(false);

	const navigate = useNavigate();

	onMount(() => {
		// checkAndSet();
    // user already exists, cannot loging again
		if (user().user !== undefined) {
			navigate("/");
			return;
		}
	});

	const handleLogin = async (event) => {
		event.preventDefault();

		const credentials = {
			username: username(),
			password: password()
		};

		setSpinner(true);
		await login(credentials);
		setSpinner(false);

		setUsername("");
		setPassword("");

		if (!user()) {
			setNotification(true);
			return;
		}

		if (user().user.roles.includes("ROLE_ADMIN")) {
			navigate("/admin");
			return;
		}

		if (user().account === undefined) {
			// Navigate first time user to new account form
			navigate("/account/new");
			return;
		}
		// Navigate user with account to account
		navigate("/account");
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
								<Button type="submit" loading={spinner()}>Log In</Button>
							</HStack>
						</VStack>
					</form>

				</VStack>
			</Container>

		</Center>
	);
}

export default LoginForm;