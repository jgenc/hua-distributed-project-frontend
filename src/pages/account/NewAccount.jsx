import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-yup";
import { Button, Center, Container, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, VStack } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { createSignal, onCleanup, onMount } from "solid-js";
import { mixed, object, string } from "yup";
import CustomSelect from "../../components/CustomSelect";
import accountService from "../../services/account";
import { useUser } from "../../store/user";
import createNotification from "../../utils/notification";
import { accessToken, decodeToken } from "../../utils/tokens";

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
  first_name: string().min(3).max(20).required(),
  last_name: string().min(3).max(20).required(),
  address: string().min(3).max(50).required(),
  doy: mixed().oneOf(doy).required()
});

// ? Maybe rename Account component to AccountForm or something
function NewAccount(props) {
  const navigate = useNavigate();
  const [user, { setAccount, logout }] = useUser();
  const [spinner, setSpinner] = createSignal(false);

  const { form, errors, isValid, setFields } = createForm({
    extend: validator({ schema }),
    onSubmit: async values => {
      accountService.setToken(accessToken());
      setSpinner(true);
      const accountToken = await accountService.newAccount(values);
      setSpinner(false);

      await setAccount(accountToken);
      navigate("/");
    }
  });

  onMount(() => {
    // See if user is logged In
    // Check if token corresponds to an account
    // If it exists, redirect user to Home
    // If it does not, proceed to Account Creation

    const token = decodeToken(accessToken());

    if (!user().user) {
      // User not logged in
      navigate("/");
      return;
    }
    if (token.admin) {
      // Admin cannot create an account
      navigate("/");
      return;
    }
    // If account already exists, go to home
    // const accountToken = token.accountToken();
    // console.log(accountToken);
    // if (accountToken) {
    // navigate("/");
    // return;
    // }
  });

  onCleanup(() => {
    // If user leaves for some reason, cleanup tokens
    if (accessToken()) {
      logout();
    }
  });

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

          <FormControl required invalid={!!errors("first_name")}>
            <FormLabel for="first_name">Όνομα</FormLabel>
            <Input
              name="first_name"
            />
            <FormErrorMessage>{errors("first_name")[0]}</FormErrorMessage>
          </FormControl>

          <FormControl required invalid={!!errors("last_name")}>
            <FormLabel for="last_name">Επίθετο</FormLabel>
            <Input
              name="last_name"
            />
            <FormErrorMessage>{errors("last_name")[0]}</FormErrorMessage>
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