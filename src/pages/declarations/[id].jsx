import { Box, Center, Container, Divider, Heading, HStack, Input, Skeleton, Spinner, Text, VStack } from "@hope-ui/solid";
import { useBeforeLeave, useNavigate, useParams, useRouteData } from "@solidjs/router";
import { VsAccount } from "solid-icons/vs";
import { createEffect, createResource, createSelector, createSignal, onMount, Show, Suspense } from "solid-js";
import Acceptance from "../../components/Acceptance";
import CompleteDeclaration from "../../components/CompleteDeclaration";
import ContractData from "../../components/ContractData";
import PaymentData from "../../components/PaymentData";
import PropertyData from "../../components/PropertyData";
import UserData from "../../components/UserData";
import declarations from "../../services/declarations";
import { useUser } from "../../store/user";
import tokens from "../../utils/tokens";

function Declaration(props) {
  const params = useParams();
  declarations.setToken(tokens.userToken().accessToken);
  const [declaration] = createResource(() => params.id, declarations.getDeclarationById);
  const [user, { _ }] = useUser();
  const navigate = useNavigate();
  const [isDeclarationCompleted, setisDeclarationCompleted] = createSignal(false);

  createEffect(() => {
    if (declaration.state === "ready") {
      setisDeclarationCompleted(declaration().sellerAcceptance
        && declaration().purchaserAcceptance);
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

          <Center>
            <Heading size="2xl">Δήλωση {declaration().id}</Heading>
          </Center>

          <Divider />

          <Container>
            <UserData user={declaration().notary} name="Συμβολαιογράφου" />
            <Divider />

            <UserData user={declaration().purchaser} name="Αγοραστή" />
            <Divider />

            <UserData user={declaration().seller} name="Πωλητή" />
            <Divider />

            <PropertyData property={{ number: declaration().propertyNumber, category: declaration().propertyCategory, description: declaration().propertyDescription }} />
            <Divider />

            <Acceptance
              name="Πωλητή"
              user={declaration().seller}
              acceptance={declaration().sellerAcceptance}
              id={params.id} />
            <Divider />

            <Acceptance
              name="Αγοραστή"
              user={declaration().purchaser}
              acceptance={declaration().purchaserAcceptance}
              id={params.id} />
            <Divider />

            <Show when={isDeclarationCompleted()}>
              <ContractData name="Στοιχεία Συμβόλαιου" contract={declaration().contractDetails} paymentMethod={declaration().paymentMethod} id={params.id} />
              <Divider />
            </Show>

            {/* <PaymentData name="Στοιχεία Πληρωμής" tax={declaration().tax} purchaser={declaration().purchaser} /> */}
{/* 
            <Show when={isDeclarationCompleted()}>
              <CompleteDeclaration />
            </Show> */}
          </Container>
        </VStack>
      </Center>
    </Show>

  );
}

export default Declaration;