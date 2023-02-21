import { Center, Container, Heading, HStack, VStack } from "@hope-ui/solid";
import { VsAdd, VsSearch } from 'solid-icons/vs';
import { Show } from "solid-js";
import FunctionalityButton from "../components/FunctionalityButton";
import Navbar from "../components/Navbar";
import { useUser } from "../store/user";
import NewDeclaration from "./declarations/NewDeclaration";
import ShowAllDeclarations from "./declarations/ShowAllDeclarations";


function Landing() {
  return (
    <Center p="$6" flexDirection="column">
      <VStack spacing="$3">

        <Heading
          size="3xl" >
          Καλωσήρθατε στο σύστημα Δήλωσης Mεταφοράς Ακινήτου.
        </Heading>
        <Heading level="2" size="md">
          Παρακαλώ συνδεθείτε με τα στοιχεία που σας έχουν δωθεί για να έχετε πρόσβαση στις υπηρεσίες του συστήματος
        </Heading>

      </VStack>
    </Center>
  );
}


function Home(props) {
  const [user, { _ }] = useUser();

  return (
    <>
      <Show when={user().account !== undefined} fallback={<Landing />}>
        <Container p="$10	">
          <Center>
            <HStack spacing="$4">
              <Show when={user().user.roles.includes("ROLE_NOTARY")}>
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