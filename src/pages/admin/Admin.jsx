import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import Navbar from "../../components/Navbar";
import { useUser } from "../../store/user";
import AdminContent from "./AdminContent";

function AdminPage(props) {

	const [user, { checkAndSet }] = useUser();
	const navigate = useNavigate();

	console.log("admin load >> user state: ", user());

	onMount(() => {
		checkAndSet();
		if (!user()) {
			navigate("/");
			return;
		}
		if (!user().user.roles.includes("ROLE_ADMIN")) {
			navigate("/");
			return;
		}
	});

	return (
		<Show when={user()}>
			<Navbar />
			<AdminContent />
		</Show>
	);
}

export default AdminPage;