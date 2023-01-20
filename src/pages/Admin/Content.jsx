import userService from "../../services/users";
import { createSignal, mergeProps, Suspense, useTransition } from "solid-js";
import { avatarBadgeStyles, Button, Container, Divider, FormLabel, Heading, HStack, IconButton, Input, Modal, VStack } from "@hope-ui/solid";
import AllUsers from "./AllUsers";
import NewUser from "./NewUser";

import { AiOutlineSearch } from 'solid-icons/ai';

function AdminContent(props) {
	let allUsers = [];
	const [users, setUsers] = createSignal([]);

	const handleShowAllUsers = async () => {
		userService.setToken(JSON.parse(window.sessionStorage.getItem("userToken")).accessToken);
		const result = await userService.users();
		if (!result) {
			console.log("error retrieving all users");
			return;
		}
		setUsers(result.sort((a, b) => a.id - b.id));
		allUsers = [...users()];
	};

	const handleSearchUsers = async (event) => {
		event.preventDefault();
		const searchValue = event.target[0].value;

		if (allUsers.length === 0) await handleShowAllUsers();

		const filteredUsers = allUsers.filter(a => a.username.includes(searchValue) ? a : null);
		setUsers(filteredUsers);
	};

	return (
		<Container p="$3">
			<VStack spacing="$10">
				<HStack spacing="$5" height="$10">
					{/* Maybe do not do this as a form? */}
					<form onSubmit={handleSearchUsers}>
						<HStack spacing="$3">
							<Input onChange={handleSearchUsers} />
							<IconButton variant="ghost" icon={<AiOutlineSearch />} />
						</HStack>
					</form>

					<Button onClick={handleShowAllUsers}>Show all Users</Button>

					<NewUser users={users} setUsers={setUsers} />

				</HStack>
				{/* Users */}
				<Show when={users().length !== 0}>
					<AllUsers users={users} setUsers={setUsers} />
				</Show>
			</VStack>
		</Container>
	);
}

export default AdminContent;