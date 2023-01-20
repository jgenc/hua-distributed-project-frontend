import { useNavigate } from "@solidjs/router";
import { createSignal, onMount, Show } from "solid-js";
import Navbar from "../../components/Navbar";
import AdminContent from "./Content";

function AdminPage(props) {

	const [admin, setAdmin] = createSignal(null);
	const navigate = useNavigate();

	onMount(() => {
		// Check on initial page load if the browser contains a token
		const sessionUser = JSON.parse(window.sessionStorage.getItem("userToken"));
		if (!sessionUser) return;
		if (!sessionUser.roles.includes("ROLE_ADMIN")) return;
		setAdmin(sessionUser);
		// navigate("/login");
	});

	return (
		<Show when={admin()} fallback={<h1>404</h1>}>
			<Navbar />
			<AdminContent />
		</Show>
	);
}

export default AdminPage;