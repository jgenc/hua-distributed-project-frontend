import { Anchor, Box, Button, Divider, Flex, Heading, HStack, Icon, IconButton, Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuTrigger, Spacer, useColorMode } from "@hope-ui/solid";
import { Link, useNavigate } from "@solidjs/router";
import { createEffect, createMemo, createRenderEffect, createSignal, on, onMount, Show } from "solid-js";
import { useUser } from "../store/user";
import loginService from "../services/login";
import { accessToken } from "../utils/tokens";
import createNotification from "../utils/notification";
import { IoReload } from "solid-icons/io";
import { FaSolidMoon, FaSolidSun, FaSolidUser } from "solid-icons/fa";

function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
    </Button>
  );
}

function Navbar(props) {
  const [user, { logout, refreshUserTime }] = useUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const [timeRemaining, setTimeRemaining] = createSignal("00:00");
  let timerInterval;


  createEffect(() => {
    if (user().user) {
      let currentTime = new Date().getTime() / 1000;
      let countdownMinutes = Math.floor((user().user.exp - currentTime) / 60);
      let countdownSeconds = Math.floor((user().user.exp - currentTime) % 60);
      let countdown = `${countdownMinutes}:${countdownSeconds.toString().padStart(2, '0')}`;
      setTimeRemaining(countdown);

      timerInterval = setInterval(() => {
        console.log("Interval");
        let currentTime = new Date().getTime() / 1000;
        let countdownMinutes = Math.floor((user().user.exp - currentTime) / 60);
        if (countdownMinutes <= 0) {
          clearInterval(timerInterval);
          logout();
          createNotification("danger", "Logged Out", "You are logged out. Refresh the page");
          // navigate("/login");
        }
        let countdownSeconds = Math.floor((user().user.exp - currentTime) % 60);
        let countdown = `${countdownMinutes}:${countdownSeconds.toString().padStart(2, '0')}`;
        setTimeRemaining(countdown);
      }, 1000);
    }
  });

  const handleLogout = () => {
    clearInterval(timerInterval);
    logout();
  };

  const refreshTime = async () => {
    const newToken = await loginService.refresh(accessToken());
    clearInterval(timerInterval);
    refreshUserTime(newToken);
  };

  // console.log("User Info: ", user().account, user().user);

  return (
    <>
      <Flex p="$3">
        <Box p="$2">
          <Heading as={Link} href="/" size="xl" fontWeight="$bold">
            Property Tax Manager
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <HStack spacing="$3">
            <Show when={user().account !== undefined} fallback={
              <Button as={Link} href="/login">Log in</Button>
            }>
              <p>
                <b>{user().account.first_name} {user().account.last_name}</b>
              </p>

              {/* <p>
                {timeRemaining()}
              </p> */}

              {/* <IconButton
                title="Ανανέωση Χρόνου"
                aria-label="Ανανέωση Χρόνου"
                type="submit"
                variant="ghost"
                // icon={<svg xmlns="http://www.w3.org/2000/svg" color="white" width="24" height="24" viewBox="0 0 24 24"><path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z" /></svg>}
                icon={<IoReload />}
                onClick={refreshTime}>
                Ανανέωση Χρόνου
              </IconButton> */}

              <Menu>
                <MenuTrigger as={IconButton} variant="subtle" colorScheme="info">
                  {<FaSolidUser></FaSolidUser>}
                </MenuTrigger>

                <MenuContent>
                  <MenuGroup>
                    <MenuLabel>Time Remaining</MenuLabel>
                    <MenuItem disabled><b>{timeRemaining()}</b></MenuItem>
                    <MenuItem onSelect={refreshTime} closeOnSelect={false}>Refresh time</MenuItem>
                  </MenuGroup>

                  <MenuGroup>
                    <MenuLabel>Help</MenuLabel>
                    <MenuItem as={Link} href="/about">About</MenuItem>
                  </MenuGroup>

                  <Divider role="presentation" my="$1" />

                  <MenuGroup>
                    <MenuItem colorScheme="danger" onSelect={handleLogout}>Log Out</MenuItem>
                  </MenuGroup>
                </MenuContent>

              </Menu>
            </Show>

            <IconButton
              icon={colorMode() === "light" ? <FaSolidMoon /> : <FaSolidSun />}
              variant="ghost"
              onClick={toggleColorMode}
              colorScheme="neutral"
            ></IconButton>
          </HStack>
        </Box>
      </Flex>

      <Divider />
    </>
  );
}

export default Navbar;