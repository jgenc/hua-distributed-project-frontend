import { Button, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, VStack } from "@hope-ui/solid";
import { mergeProps, createSignal, For } from "solid-js";
import loginService from "../services/login";

function LoginForm(props) {
	const [username, setUsername] = createSignal("");
	const [password, setPassword] = createSignal("");

	const merged = mergeProps({ handle: {} }, props);

	const handleLogin = async (event) => {
		event.preventDefault();

		const credentials = {
			username: username(),
			password: password()
		};

		const response = await loginService.login(credentials);

		setUsername("");
		setPassword("");

		console.log(credentials);

		if (!response) {
			console.log("error logging in");
			return;
		}
		merged.handle(response);
	};

	return (
		<form onSubmit={handleLogin}>
			<VStack
				spacing="$5"
				alignItems="stretch"
				maxW="$96"
				mx="auto"
			>
				<Heading size="3xl">Log In</Heading>
				<FormControl required>
					<FormLabel for="username">Username</FormLabel>
					<Input
						id="username"
						onChange={(event) => setUsername(event.target.value)} />
					<FormHelperText>I.e johndoexd</FormHelperText>
				</FormControl>

				<FormControl required>
					<FormLabel for="password">Password</FormLabel>
					<Input
						type="password"
						id="password"
						onChange={(event) => setPassword(event.target.value)}
					/>
					<FormHelperText>mysekretpass123</FormHelperText>
				</FormControl>

				<HStack justifyContent="flex-end">
					<Button type="submit">Log In</Button>
				</HStack>
			</VStack>
		</form>
	);
}

export default LoginForm;