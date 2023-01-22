import { Table, TableCaption, Tbody, Th, Tr, Thead } from "@hope-ui/solid";
import { mergeProps, For } from "solid-js";
import TableContent from "./TableContent";

function TableUsers(props) {
	const merged = mergeProps({ users: [], setUsers: null }, props);

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
						{(user) => <TableContent user={user} users={merged.users} setUsers={merged.setUsers}/>}
					</For>
				</Tbody>
			</Table>
		</>
	);
}

export default TableUsers;