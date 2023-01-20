import userService from "../../services/users";
import { createSignal, mergeProps, Suspense, useTransition } from "solid-js";

import { Button, Container, Divider, FormLabel, Heading, HStack, Input, VStack } from "@hope-ui/solid";
import AllUsers from "./AllUsers";


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
			<VStack spacing="$3">
				<HStack spacing="$3" height="$10">
					<form onSubmit={handleSearchUsers}>
						<HStack spacing="$3">
							<FormLabel>Search</FormLabel>
							<Input onChange={handleSearchUsers} />
						</HStack>
					</form>
					<Divider orientation="vertical" />
					<Button onClick={handleShowAllUsers}>Show all Users</Button>
				</HStack>
				{/* Users */}
				<Show when={users().length !== 0}>
					<AllUsers users={users()} />
				</Show>
			</VStack>
		</Container>
	);
}

export default AdminContent;