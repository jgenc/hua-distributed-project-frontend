import userService from "../../services/users";
import { createSignal, Show } from "solid-js";
import { Button, Container, HStack, IconButton, Input, VStack } from "@hope-ui/solid";
import TableUsers from "../../components/TableUsers";
import NewUserForm from "../../components/NewUserForm";

import { AiOutlineSearch } from "solid-icons/ai";

function AdminContent(props) {
	let allUsers = [];
	const [users, setUsers] = createSignal([]);
	const [spinner, setSpinner] = createSignal(false);

	const handleShowAllUsers = async () => {
		setSpinner(true);
		userService.setToken(JSON.parse(window.sessionStorage.getItem("userToken")).accessToken);
		const result = await userService.users();
		setSpinner(false);
		if (!result) {
			console.log("error retrieving all users");
			return;
		}
		setUsers(result.sort((a, b) => a.id - b.id));
		allUsers = [...users()];
	};

	const handleSearchUsers = async (event) => {
		event.preventDefault();
		const searchValue = document.getElementById("search").value;

		if (allUsers.length === 0) await handleShowAllUsers();

		const filteredUsers = allUsers.filter(a => a.username.includes(searchValue) ? a : null);
		setUsers(filteredUsers);
	};

	return (
		<Container p="$3">
			<VStack spacing="$10">
				<HStack spacing="$5" height="$10">
					<HStack spacing="$3">
						<Input id="search" onChange={handleSearchUsers} />
						<IconButton type="submit" variant="ghost" icon={<AiOutlineSearch />} />
					</HStack>

					<Button onClick={handleShowAllUsers} loading={spinner()}>Show all Users</Button>
					<NewUserForm users={users} setUsers={setUsers} />
				</HStack>

				<Show when={users().length !== 0}>
					<TableUsers users={users} setUsers={setUsers} />
				</Show>
			</VStack>
		</Container>
	);
}

export default AdminContent;