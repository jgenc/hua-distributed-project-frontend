import { mergeProps, createSignal } from "solid-js";
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

		if (!response) {
			console.log("error logging in");
			return;
		}
		merged.handle(response);
	};

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<div>
					Username:
					<input
						required
						value={username()}
						onChange={(event) => setUsername(event.target.value)}></input>
				</div>
				<div>
					Password:
					<input
						required
						type="password"
						value={password()}
						onChange={(event) => setPassword(event.target.value)}></input>
				</div>
				<button>Login</button>
			</form>
		</>
	);
}

export default LoginForm;