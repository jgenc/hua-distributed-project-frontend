import { Button, Center, Container, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, VStack } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { useUser } from "../store/user";
import createNotification from "../utils/notification";

// !!!!!!!!!!!!!!!!!!!!
// TODO: Update form to be used with felte
// !!!!!!!!!!!!!!!!!!!!

function LoginForm(props) {
  const [user, { login }] = useUser();
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [spinner, setSpinner] = createSignal(false);
  const navigate = useNavigate();

  onMount(() => {
    // user already exists, cannot loging again
    if (user().user !== undefined) {
      navigate("/");
      return;
    }
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    const credentials = {
      username: username(),
      password: password()
    };

    setSpinner(true);
    await login(credentials);
    setSpinner(false);

    console.log("error");

    setUsername("");
    setPassword("");

    if (!user().user) {
      createNotification("danger", "Λάθος κωδικός", "Παρακαλώ ελέγξτε τα στοιχεία σας");
      return;
    }

    if (user().user.roles.includes("ROLE_ADMIN")) {
      navigate("/admin");
      return;
    }

    if (user().account === undefined) {
      // Navigate first time user to new account form
      navigate("/account/new");
      return;
    }
    // Navigate user to main app 
    navigate("/");
  };

  return (
    <Center h="$xl">
      <Container centerContent>
        <VStack spacing="$5">
          <form onSubmit={handleLogin}>
            <VStack
              spacing="$5"
              alignItems="stretch"
              maxW="$96"
              mx="auto"
              borderWidth="1px"
              borderColor="$neutral6"
              borderRadius="$lg"
              p="$5"
            >
              <Heading size="3xl">Συνδεθείτε</Heading>
              <FormControl required>
                <FormLabel for="username">Username</FormLabel>
                <Input
                  id="username"
                  onChange={(event) => setUsername(event.target.value)}
                  value={username()}
                />
                <FormHelperText>I.e johndoexd</FormHelperText>
              </FormControl>

              <FormControl required>
                <FormLabel for="password">Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password()}
                />
                <FormHelperText>mysekretpass123</FormHelperText>
              </FormControl>

              <HStack justifyContent="flex-end">
                <Button type="submit" loading={spinner()}>Log In</Button>
              </HStack>
            </VStack>
          </form>

        </VStack>
      </Container>

    </Center>
  );
}

export default LoginForm;