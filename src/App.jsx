import { createSignal, For, onMount, Show } from "solid-js";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import helper from "./utils/helper";
import AdminPage from "./components/AdminPage";
import Header from "./components/Header";
import { Container } from "@hope-ui/solid";

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
		<Container p="$4">
			<Show when={user()} fallback={<LoginForm handle={handleLogin} />}>
				<Show
					when={!helper.isUserAdmin(user())}
					fallback={<AdminPage
						handleLogout={handleLogout}
						adminToken={user().accessToken} />}>
					<Header
						user={user()}
						handleLogout={handleLogout} />
				</Show>
			</Show>
		</Container>
	);
}

export default App;
