import { useNavigate } from "@solidjs/router";
import { createEffect, onMount, Show } from "solid-js";
import { useUser } from "../../store/user";
import AdminContent from "./AdminContent";

function AdminPage(props) {

  const [user, { checkAndSet }] = useUser();
  const navigate = useNavigate();

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
  });

  return (
    <Show when={user().user}>
      <AdminContent />
    </Show>
  );
}

export default AdminPage;