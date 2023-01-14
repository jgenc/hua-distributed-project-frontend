import userService from "../services/users";
import { createSignal, mergeProps } from "solid-js";

function AdminPage(props) {
	const [users, setUsers] = createSignal([]);
	const merged = mergeProps({ adminToken: "", handleLogout: null }, props);

	const handleShowAllUsers = async () => {
		userService.setToken(merged.adminToken);
		const allUsers = await userService.users();
		if (!allUsers) {
			console.log("error retrieving all users");
			return;
		}
		setUsers(allUsers);
	};

	return (
		<>
			<h2>Admin</h2>
			<div>
				<button onClick={merged.handleLogout}>Log Out</button>
			</div>
			<button onClick={handleShowAllUsers}>Show all Users</button>
			<Show when={users().length !== 0}>
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Username</th>
							<th>Tin</th>
							<th>Roles</th>
						</tr>
					</thead>
					<tbody>
						<For each={users()}>
							{(user) =>
								<tr>
									<td>{user.id}</td>
									<td>{user.username}</td>
									<td>{user.tin}</td>
									<td>{user.roles}</td>
								</tr>
							}
						</For>
					</tbody>
				</table>
			</Show>
		</>
	);
}

export default AdminPage;