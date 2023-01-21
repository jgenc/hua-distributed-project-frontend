import { Table, TableCaption, Tbody, Td, Th, Tr, Thead, HStack, Button, Flex, Spacer, Tag, Divider, MenuTrigger, Menu, IconButton, MenuContent, MenuItem, SelectIcon, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from "@hope-ui/solid";
import { mergeProps } from "solid-js";
import TableContent from "../../components/TableContent";
import userService from "../../services/users";

function AllUsers(props) {
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

export default AllUsers;