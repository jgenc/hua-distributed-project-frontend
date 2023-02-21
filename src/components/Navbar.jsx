import { Anchor, Box, Button, Divider, Flex, Heading, HStack, Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuTrigger, Spacer, useColorMode } from "@hope-ui/solid";
import { Link, useNavigate } from "@solidjs/router";
import { createEffect, createMemo, createSignal, on, onMount, Show } from "solid-js";
import { useUser } from "../store/user";

function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
    </Button>
  );
}

function Navbar(props) {
  const [user, { logout, checkAndSet }] = useUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  console.log("User Info: ", user().account, user().user);

  return (
    <>
      <Flex p="$3">
        <Box p="$2">
          <Heading as={Link} href="/" size="xl" fontWeight="$bold">
            Δήλωση Φόρου Μεταβίβαση Ακινήτων
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <HStack spacing="$3">
            <Show when={user().account !== undefined} fallback={
              <Button as={Link} href="/login">Log in</Button>
            }>
              <p>
                Καλωσήρθατε, <b>{user().account.firstName} {user().account.lastName}</b>
              </p>
              <Menu>
                <MenuTrigger as={Button} variant="subtle" colorScheme="info">
                  Profile
                </MenuTrigger>
                <MenuContent>
                  <MenuGroup>
                    <MenuLabel>Help</MenuLabel>
                    <MenuItem as={Link} href="/about">About</MenuItem>
                    <MenuItem onSelect={toggleColorMode}> 
                      Toggle {colorMode() === 'light' ? 'dark' : 'light'} mode
                    </MenuItem>
                  </MenuGroup>
                  <Divider role="presentation" my="$1" />
                  <MenuGroup>
                    <MenuItem colorScheme="danger" onSelect={handleLogout}>Log Out</MenuItem>
                  </MenuGroup>
                </MenuContent>
              </Menu>
            </Show>
          </HStack>
        </Box>
      </Flex>

      <Divider />
    </>
  );
}

export default Navbar;