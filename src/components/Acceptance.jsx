import { Box, Button, Center, Container, Divider, HStack, Icon, Radio, RadioGroup, SimpleOption, SimpleSelect, Text, VStack } from "@hope-ui/solid";
import { createEffect, createSignal, mergeProps } from "solid-js";
import declarationsService from "../services/declarations";
import tokens from "../utils/tokens";
import DataCell from "./DataCell";
import DataWrapper from "./DataWrapper";

function Option(props) {
  const merged = mergeProps({ tin: null, acceptance: null, id: null }, props);
  const [acceptance, setAcceptance] = createSignal(merged.acceptance);
  const disable = tokens.accountToken().tin !== merged.tin ||
    (acceptance() !== null && !acceptance());

  const [spinner, setSpinner] = createSignal(false);
  const handleAcceptance = async () => {
    setSpinner(true);
    console.log(tokens.userToken().accessToken)
    declarationsService.setToken(tokens.userToken().accessToken);
    await declarationsService.acceptDeclaration(merged.id);
    setSpinner(false);
  };


  return (
    <Center>
      <HStack spacing="$2">
        {/* <RadioGroup disabled={disable} onChange={(e) => setAcceptance(e)}>
          <HStack spacing="$2">
            <Radio defaultChecked={acceptance() === true} value={true}>Αποδοχή</Radio>
            <Radio defaultChecked={acceptance() === false} value={false}>Απόρριψη</Radio>
          </HStack>
        </RadioGroup> */}
        <Button
          loading={spinner()}
          disabled={disable}
          onClick={handleAcceptance}
          size="xs" >
          Αποδοχή
        </Button>
      </HStack>
    </Center>
  );
}

function Acceptance(props) {
  const merged = mergeProps({ name: null, user: null, acceptance: null, id: null }, props);
  console.log("accept:", merged.acceptance);
  return (
    <DataWrapper name={`Υποβολή Δήλωσης ${merged.name}`}>
      <HStack>
        <DataCell name="ΑΦΜ" value={merged.user.tin} />
        <DataCell name="Όνομα" value={merged.user.firstName} />
        <DataCell name="Υποβολή" customRow={<Option tin={merged.user.tin} acceptance={merged.user.acceptance} id={merged.id} />} />
      </HStack>
    </DataWrapper>
  );
}

export default Acceptance;