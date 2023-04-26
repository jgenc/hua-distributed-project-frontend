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
		// checkAndSet();
		if (user().user === undefined) {
			navigate("/");
			return;
		}
		if (!user().user.admin) {
			navigate("/");
			return;
		}
	});

	createEffect(() => {
		if (user().user === undefined) {
			navigate("/");
			return;
		}
	})

	return (
		<Show when={user().user}>
			<AdminContent />
		</Show>
	);
}

export default AdminPage;