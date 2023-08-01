import userService from "../../services/users";
import { createSignal, Show } from "solid-js";
import { Button, Container, HStack, IconButton, Input, VStack } from "@hope-ui/solid";
import TableUsers from "./components/TableUsers";
import NewUserForm from "./components/NewUserForm";

import { IoSearch } from "solid-icons/io";
import createNotification from "../../utils/notification";
import { accessToken } from "../../utils/tokens";

function AdminContent(props) {
  let allUsers = [];
  const [users, setUsers] = createSignal([]);
  const [spinner, setSpinner] = createSignal(false);

  const handleShowAllUsers = async () => {
    setSpinner(true);
    userService.setToken(accessToken());
    const result = await userService.users();
    setSpinner(false);

    console.log("All users: ", result);

    // TODO: Find a way to handle the error;
    //  look at the services folder. Should return something weird there and handle it here
    // if (!result) {
    //   createNotification("warning", "Σφάλμα", result.response.data.message);
    //   return;
    // }
    setUsers(result.sort((a, b) => a.id - b.id));
    allUsers = [...users()];
  };

  const handleSearchUsers = async (event) => {
    event.preventDefault();
    console.log("Searching users");
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
            <IconButton type="submit" variant="ghost" icon={<IoSearch />} />
          </HStack>

          <Button onClick={handleShowAllUsers} loading={spinner()}>Show all Users</Button>
          <NewUserForm users={users} setUsers={setUsers} />
        </HStack>

        <Show when={users().length > 0}>
          <TableUsers users={users} setUsers={setUsers} />
        </Show>

      </VStack>
    </Container>
  );
}

export default AdminContent;