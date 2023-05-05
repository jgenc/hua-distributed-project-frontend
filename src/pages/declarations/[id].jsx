import { Box, Center, Container, Divider, Heading, HStack, Input, Skeleton, Spinner, Text, VStack } from "@hope-ui/solid";
import { useBeforeLeave, useNavigate, useParams, useRouteData } from "@solidjs/router";
import { VsAccount } from "solid-icons/vs";
import { createEffect, createResource, createSelector, createSignal, onMount, Show, Suspense } from "solid-js";
import Acceptance from "./components/Acceptance";
import CompleteDeclaration from "./components/CompleteDeclaration";
import ContractData from "./components/ContractData";
import PaymentData from "./components/PaymentData";
import PropertyData from "./components/PropertyData";
import UserData from "../admin/components/UserData";
import declarations from "../../services/declarations";
import { useUser } from "../../store/user";
import { accessToken } from "../../utils/tokens";

function Declaration(props) {
  const params = useParams();
  declarations.setToken(accessToken());
  const [declaration] = createResource(() => params.id, declarations.getDeclarationById);
  const [user, { _ }] = useUser();
  const navigate = useNavigate();
  const [isDeclarationCompleted, setisDeclarationCompleted] = createSignal(false);


  createEffect(() => {
    if (declaration.state === "ready") {
      setisDeclarationCompleted(
        declaration().seller_acceptance
        && declaration().purchaser_acceptance);
      console.log("User is", user());
    }
  });

  createEffect(() => {
    if (!user().user) {
      navigate("/");
      return;
    }
  });

  return (
    <Show when={declaration()} fallback={
      <Center p="$10">
        <Spinner size="lg" />
      </Center>
    }>
      <Center p="$10">
        <VStack
          width="$5xl"
          spacing="$3"
          // alignItems="stretch"
          borderWidth="1px"
          borderColor="$neutral6"
          borderRadius="$lg"
          overflow="hidden" >

          <Container p="$1">
            <Center>
              <Text size="2xl">Δήλωση {declaration().id}</Text>
            </Center>
          </Container>
          <Divider />

          <Container>
            <UserData user={declaration().notary} name="Συμβολαιογράφου" />
            <Divider />

            <UserData user={declaration().purchaser} name="Αγοραστή" />
            <Divider />

            <UserData user={declaration().seller} name="Πωλητή" />
            <Divider />

            <PropertyData property={{ number: declaration().property_number, category: declaration().property_category, description: declaration().property_description }} />
            <Divider />

            <Acceptance
              name="Πωλητή"
              user={declaration().seller}
              acceptance={declaration().seller_acceptance}
              id={params.id} />
            <Divider />

            <Acceptance
              name="Αγοραστή"
              user={declaration().purchaser}
              acceptance={declaration().purchaser_acceptance}
              id={params.id} />
            <Divider />

            <Show when={isDeclarationCompleted() && user().user.tin === declaration().notary.tin}>
              <ContractData name="Στοιχεία Συμβόλαιου" contract={declaration().contract_details} paymentMethod={declaration().payment_method} id={params.id} />
              <Divider />
            </Show>

            <PaymentData name="Στοιχεία Φόρου" tax={declaration().tax} purchaser={declaration().purchaser} />

            {/* <Show when={isDeclarationCompleted()}>
              <CompleteDeclaration />
            </Show> */}
          </Container>
        </VStack>
      </Center>
    </Show>

  );
}

export default Declaration;