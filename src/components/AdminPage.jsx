import userService from "../services/users";
import { createSignal, mergeProps, Suspense, useTransition } from "solid-js";
import { Button, CircularProgress, Heading, HStack, Table, TableCaption, Tbody, Td, Th, Thead, Tr, VStack } from "@hope-ui/solid";

import "../index.css";

function AdminPage(props) {
	const [users, setUsers] = createSignal([]);
	const [pending, start] = useTransition();
	const updateUsers = () => start(() => handleShowAllUsers());
	const merged = mergeProps({ adminToken: "", handleLogout: null }, props);

	const handleShowAllUsers = async () => {
		userService.setToken(merged.adminToken);
		const allUsers = await userService.users();
		if (!allUsers) {
			console.log("error retrieving all users");
			return;
		}
		setUsers(allUsers.sort((a, b) => a.id - b.id));
	};

	return (
		<VStack spacing="$3">
			<Heading size="3xl">Admin Page</Heading>
			<HStack spacing="$3">
				<div>
					<Button onClick={merged.handleLogout}>Log Out</Button>
				</div>
				<Button onClick={updateUsers}>Show all Users</Button>
			</HStack>
			<Show when={users().length !== 0}>
				<Table striped="odd" highlightOnHover>
					<TableCaption>Data of all users in the system</TableCaption>
					<Thead>
						<Tr>
							<Th fontSize="$l">Id</Th>
							<Th fontSize="$l">Username</Th>
							<Th fontSize="$l">Tin</Th>
							<Th fontSize="$l">Role</Th>
						</Tr>
					</Thead>
					<Tbody classList={{ pending: pending() }}>
						<Suspense fallback={<h2>LOL</h2>}>
							<For each={users()}>
								{(user) =>
									<tr>
										<Td>{user.id}</Td>
										<Td>{user.username}</Td>
										<Td>{user.tin}</Td>
										<Td>{user.roles}</Td>
									</tr>
								}
							</For>
						</Suspense>
					</Tbody>
				</Table>
			</Show>
		</VStack>
	);
}

export default AdminPage;