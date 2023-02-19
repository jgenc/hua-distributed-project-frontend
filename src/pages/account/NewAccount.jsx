import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-yup";
import { Button, Center, Container, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, VStack } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { createSignal, onCleanup, onMount } from "solid-js";
import { mixed, object, string } from "yup";
import CustomSelect from "../../components/CustomSelect";
import accountService from "../../services/account";
import { useUser } from "../../store/user";

const doy = [
  "ΑΘΗΝΩΝ Α'",
  "ΑΘΗΝΩΝ Δ'",
  "ΑΓ. ΔΗΜΗΤΡΙΟΥ",
  "ΚΑΛΛΙΘΕΑΣ Α'",
  "ΝΕΑΣ ΙΩΝΙΑΣ",
  "ΝΕΑΣ ΣΜΥΡΝΗΣ",
  "ΧΑΛΑΝΔΡΙΟΥ",
  "ΑΜΑΡΟΥΣΙΟΥ",
  "ΑΙΓΑΛΕΩ",
  "ΠΕΡΙΣΤΕΡΙΟΥ Α'",
  "ΒΥΡΩΝΑ",
  "ΠΕΙΡΑΙΑ Α'",
  "ΒΟΛΟΥ Α'",
  "ΘΕΣΣΑΛΟΝΙΚΗΣ Α'",
];

const schema = object({
  firstName: string().min(3).max(20).required(),
  lastName: string().min(3).max(20).required(),
  address: string().min(3).max(50).required(),
  doy: mixed().oneOf(doy).required()
});

// ? Maybe rename Account component to AccountForm or something
function NewAccount(props) {
  const navigate = useNavigate();
  const [user, { setAccount }] = useUser();
  const [spinner, setSpinner] = createSignal(false);

  const { form, errors, isValid, setFields } = createForm({
    extend: validator({ schema }),
    onSubmit: async values => {
      setSpinner(true);
      accountService.setToken(JSON.parse(window.sessionStorage.getItem("userToken")).accessToken);
      const accountToken = await accountService.newAccount(values);
      setSpinner(false);
      // TODO: make helper functions for setting/unsetting tokens
      // TODO: Test If the account token is saved corecctly
      setAccount();
      navigate("/");
    }
  });

  onMount(async () => {
    // See if user is logged In
    // Check if token corresponds to an account
    // If it exists, redirect user to Home
    // If it does not, proceed to Account Creation

    const userToken = JSON.parse(window.sessionStorage.getItem("userToken"));
    if (userToken.roles.includes("ROLE_ADMIN")) {
      // Admin cannot create an account
      navigate("/");
      return;
    }
    if (!userToken) {
      // User not logged in
      navigate("/");
      return;
    }
    const accountToken = JSON.parse(window.sessionStorage.getItem("accountToken"));
    if (accountToken) {
      navigate("/account");
      return;
    }

    // accountService.setToken(userToken.accessToken);
    // const existingAccount = await accountService.getAccount(userToken.tin);
    // if (existingAccount) {
    // 	navigate("/");
    // 	return;
    // }

    // I assume that the backend CANNOT create a user with a role other than:
    // ROLE_NOTARY or ROLE_CITIZEN

  });

  // !!!!!!!!!!!!!!!!!!!
  // TODO: Should check if CITIZEN or NOTARY is creating an account. Different approach
  // !!!!!!!!!!!!!!!!!!!

  return (
    <Center h="$xl">
      <Container centerContent>
        <VStack
          as="form"
          ref={form}
          spacing="$5"
          alignItems="stretch"
          borderWidth="1px"
          borderColor="$neutral6"
          borderRadius="$lg"
          p="$5"
        >
          <Heading size="3xl">Δημιουργία Λογαριασμού</Heading>

          <FormControl required invalid={!!errors("firstName")}>
            <FormLabel for="firstName">Όνομα</FormLabel>
            <Input
              name="firstName"
            />
            <FormErrorMessage>{errors("firstName")[0]}</FormErrorMessage>
          </FormControl>

          <FormControl required invalid={!!errors("lastName")}>
            <FormLabel for="lastName">Επίθετο</FormLabel>
            <Input
              name="lastName"
            />
            <FormErrorMessage>{errors("lastName")[0]}</FormErrorMessage>
          </FormControl>

          <FormControl required invalid={!!errors("address")}>
            <FormLabel for="address">Διεύθυνση</FormLabel>
            <Input
              name="address"
            />
            <FormErrorMessage>{errors("address")[0]}</FormErrorMessage>
          </FormControl>

          <FormControl required invalid={!!errors("doy")}>
            <FormLabel for="address">ΔΟΥ</FormLabel>
            <CustomSelect
              setFields={setFields}
              selectList={doy}
              name="doy"
              placeholder="Διάλεξε ΔΟΥ" />
            <FormErrorMessage>{errors("doy")[0]}</FormErrorMessage>
          </FormControl>
      
          <HStack justifyContent="flex-end">
            <Button type="submit" colorScheme="success" disabled={!isValid()} loading={spinner()}>Δημιουργία</Button>
          </HStack>
        </VStack>
      </Container>
    </Center>
  );
}

export default NewAccount;