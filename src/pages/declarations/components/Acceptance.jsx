import { Box, Button, Center, Container, Divider, HStack, Icon, Radio, RadioGroup, SimpleOption, SimpleSelect, Tag, Text, VStack } from "@hope-ui/solid";
import { createEffect, createSignal, mergeProps } from "solid-js";
import declarationsService from "../../../services/declarations";
import tokens from "../../../utils/tokens";
import DataCell from "../../../components/DataCell";
import DataWrapper from "../../../components/DataWrapper";

function Option(props) {
  const merged = mergeProps({ tin: null, acceptance: null, setAcceptance: null, id: null }, props);
  const [disableButton, setDisableButton] = createSignal(tokens.accountToken().tin !== merged.tin || merged.acceptance() === null || merged.acceptance());

  const [spinner, setSpinner] = createSignal(false);
  const handleAcceptance = async () => {
    setSpinner(true);
    declarationsService.setToken(tokens.userToken().accessToken);
    await declarationsService.acceptDeclaration(merged.id);
    setSpinner(false);
    merged.setAcceptance(true);
    setDisableButton(true);
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
          disabled={disableButton()}
          onClick={handleAcceptance}
          size="xs" >
          Αποδοχή
        </Button>
      </HStack>
    </Center>
  );
}

function Status(props) {
  const merged = mergeProps({ acceptance: null }, props);

  return (
    <Center>
      <Tag colorScheme={merged.acceptance() ? "success" : "danger"}>
        {merged.acceptance() ? "Αποδεκτή" : "Μη αποδεκτή"}
      </Tag>
    </Center>
  );
}

function Acceptance(props) {
  const merged = mergeProps({ name: null, user: null, acceptance: null, id: null }, props);
  const [acceptance, setAcceptance] = createSignal(merged.acceptance);
  return (
    <DataWrapper name={`Υποβολή Δήλωσης ${merged.name}`}>
      <HStack>
        <DataCell name="ΑΦΜ" value={merged.user.tin} />
        <DataCell name="Όνομα" value={merged.user.firstName} />
        <DataCell name="Υποβολή" customRow={<Option tin={merged.user.tin} acceptance={acceptance} setAcceptance={setAcceptance} id={merged.id} />} />
        <DataCell name="Κατάσταση" customRow={<Status acceptance={acceptance} />} />
      </HStack>
    </DataWrapper>
  );
}

export default Acceptance;