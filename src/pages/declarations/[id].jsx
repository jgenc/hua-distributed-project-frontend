import { Box, Button, Center, Container, Divider, Heading, HStack, Input, Skeleton, Spacer, Spinner, Text, VStack } from "@hope-ui/solid";
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
import createNotification from "../../utils/notification";

function Declaration(props) {
  const params = useParams();
  declarations.setToken(accessToken());
  const [declaration] = createResource(() => params.id, declarations.getDeclarationById);
  const [user, { _ }] = useUser();
  const navigate = useNavigate();
  const [isDeclarationCompleted, setisDeclarationCompleted] = createSignal(false);

  onMount(() => {
    if (!user().user) {
      createNotification("danger", "Δεν είστε συνδεδεμένος");
      navigate("/");
    }
  });

  createEffect(() => {
    if (declaration.state === "ready") {
      setisDeclarationCompleted(
        declaration().seller_acceptance
        && declaration().purchaser_acceptance);
    }
  });

  createEffect(() => {
    if (!user().user) {
      navigate("/");
      return;
    }
  });

  console.log(user());

  return (
    <Show when={user().user !== undefined}>
      <Show when={declaration()}
        fallback={
          <Center
            p="$10"
          >
            <Spinner></Spinner>
          </Center>
        }
      >

        <VStack>
          <Center p="$10">
            <VStack
              width="$5xl"
              // spacing="$"
              // alignItems="stretch"
              borderWidth="1px"
              borderColor="$neutral6"
              borderRadius="$lg"
              overflow="hidden" >

              <Container
                p="$5"
              >
                <Center>
                  <Text size="2xl">
                    Declaration <b>#{declaration().id}</b>
                  </Text>
                </Center>
              </Container>
              <Divider color="$blackAlpha8" />

              <Container>
                <UserData user={declaration().notary} name="Notary" />
                <Divider color="$blackAlpha10" />

                <UserData user={declaration().purchaser} name="Purchaser" />
                <Divider color="$blackAlpha10" />

                <UserData user={declaration().seller} name="Seller" />
                <Divider color="$blackAlpha10" />

                <PropertyData property={{ number: declaration().property_number, category: declaration().property_category, description: declaration().property_description }} />
                <Divider color="$blackAlpha10" />

                <Acceptance
                  name="Seller"
                  user={declaration().seller}
                  acceptance={declaration().seller_acceptance}
                  id={params.id} />
                <Divider color="$blackAlpha10" />

                <Acceptance
                  name="Purchaser"
                  user={declaration().purchaser}
                  acceptance={declaration().purchaser_acceptance}
                  id={params.id} />
                <Divider color="$blackAlpha10" />

                <Show when={isDeclarationCompleted() && user().user.tin === declaration().notary.tin}>
                  <ContractData name="Contract Info" contract={declaration().contract_details} paymentMethod={declaration().payment_method} id={params.id} />
                  <Divider color="$blackAlpha10" />
                </Show>

                <PaymentData name="Tax info" tax={declaration().tax} purchaser={declaration().purchaser} />
                {/* <Divider color="$blackAlpha10" /> */}

                {/* <Show when={isDeclarationCompleted()}>
              <CompleteDeclaration />
            </Show> */}
              </Container>
            </VStack>
          </Center>

          <Button
            onClick={() => navigate("/")}
            variant="subtle"
          >
            Go back
          </Button>

        </VStack>

      </Show>
    </Show>

  );
}

export default Declaration;