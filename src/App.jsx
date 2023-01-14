import { createSignal, For, onMount, Show } from "solid-js";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import helper from "./utils/helper";
import AdminPage from "./components/AdminPage";

function App() {
	const [user, setUser] = createSignal(null);

	onMount(() => {
		// Check on initial page load if the browser contains a token
		const sessionUser = JSON.parse(window.sessionStorage.getItem("userToken"));
		if (!sessionUser) return;
		setUser(sessionUser);
	});

	const handleLogin = async (loggedUser) => {
		// ? Session Storage or Local Storage
		window.sessionStorage.setItem("userToken", JSON.stringify(loggedUser));
		setUser(loggedUser);
	};

	const handleLogout = () => {
		window.sessionStorage.removeItem("userToken");
		setUser(null);
	};

	return (
		<>
			<Show when={user()} fallback={<LoginForm handle={handleLogin} />}>
				<Show
					when={!helper.isUserAdmin(user())}
					fallback={<AdminPage
						handleLogout={handleLogout}
						adminToken={user().accessToken} />}>
					<h1>Logged in as {user().username}</h1>
					<button onClick={handleLogout}>Log Out</button>
				</Show>
			</Show>
		</>
	);
}

export default App;
