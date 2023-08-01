import { Center, Container, Heading, HStack, VStack } from "@hope-ui/solid";
import { VsAdd, VsSearch } from 'solid-icons/vs';
import { onMount, Show } from "solid-js";
import FunctionalityButton from "../components/FunctionalityButton";
import Navbar from "../components/Navbar";
import { useUser } from "../store/user";
import NewDeclaration from "./declarations/NewDeclaration";
import ShowAllDeclarations from "./declarations/ShowAllDeclarations";
import { useNavigate } from "@solidjs/router";


function Landing() {
  return (
    <Center p="$6" flexDirection="column">
      <VStack spacing="$3">

        <Heading
          size="3xl" >
          Welcome to the Property Tax Manager System
        </Heading>
        <Heading level="2" size="md">
          To use the website you need to login with the username and password you've been provided with
        </Heading>

      </VStack>
    </Center>
  );
}


function Home(props) {
  const [user, { _ }] = useUser();
  const navigate = useNavigate();

  onMount(() => {
    if (!user().user) return;
    if (user().user.admin) {
      navigate("/admin");
      return;
    }
  });

  return (
    <>
      <Show when={user().account !== undefined} fallback={<Landing />}>
        <Container p="$10	">
          <Center>
            <HStack spacing="$4">
              <Show when={user().user.notary}>
                <NewDeclaration />
              </Show>
              <ShowAllDeclarations />
            </HStack>
          </Center>
        </Container>
      </Show>
    </>
  );
}

export default Home;