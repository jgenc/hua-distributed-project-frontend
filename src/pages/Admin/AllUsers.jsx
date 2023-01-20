import { Table, TableCaption, Tbody, Td, Th, Tr, Thead, HStack, Button, Flex, Spacer, Tag, Divider, MenuTrigger, Menu, IconButton, MenuContent, MenuItem, SelectIcon } from "@hope-ui/solid";
import { mergeProps } from "solid-js";
import userService from "../../services/users";

function AllUsers(props) {
	const merged = mergeProps({ users: [], setUsers: null }, props);

	const deleteUser = async (userToDelete) => {
		userService.setToken(JSON.parse(window.sessionStorage.getItem("userToken")).accessToken);

		await userService.deleteUser(userToDelete.id);

		merged.setUsers(merged.users().filter(u => u.id !== userToDelete.id));
	};

	return (
		<>
			<Table dense highlightOnHover>
				<TableCaption>Data of all users in the system</TableCaption>
				<Thead>
					<Tr>
						<Th fontSize="$l">Id</Th>
						<Th fontSize="$l">Username</Th>
						<Th fontSize="$l">Tin</Th>
						<Th fontSize="$l">Role</Th>
					</Tr>
				</Thead>
				<Tbody>
					<For each={merged.users()}>
						{(user) =>
							<tr>
								<Td>{user.id}</Td>
								<Td>{user.username}</Td>
								<Td>{user.tin}</Td>
								<Td>
									<Flex>
										<Tag
											size="md"
											colorScheme={user.roles.includes("ROLE_ADMIN") ? "danger" : "primary"}
										>{user.roles}</Tag>

										<Spacer />

										<Menu>
											<MenuTrigger
												as={Button}
												variant="subtle"
												colorScheme="neutral"
												rightIcon=""
											>
												Actions
											</MenuTrigger>
											<MenuContent>
												<MenuItem
													colorScheme="danger"
													disabled={user.roles.includes("ROLE_ADMIN") ? true : false}
													onSelect={() => deleteUser(user)}
												>
													Delete User
												</MenuItem>
												<MenuItem>Change Username</MenuItem>
												<MenuItem>Change Password</MenuItem>
												<MenuItem>Set Roles</MenuItem>
											</MenuContent>
										</Menu>
									</Flex>
								</Td>
							</tr>
						}
					</For>
				</Tbody>
			</Table>
		</>
	);
}

export default AllUsers;