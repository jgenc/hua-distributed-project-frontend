import { Box, Button, Center, Container, Divider, HStack, Icon, Radio, RadioGroup, SimpleOption, SimpleSelect, Tag, Text, VStack } from "@hope-ui/solid";
import { createEffect, createSignal, mergeProps } from "solid-js";
import declarationsService from "../../../services/declarations";
import { accessToken, accountToken } from "../../../utils/tokens";
import DataCell from "../../../components/DataCell";
import DataWrapper from "../../../components/DataWrapper";

function Option(props) {
  props = mergeProps({ tin: null, acceptance: null, setAcceptance: null, id: null }, props);
  const [disableButton, setDisableButton] = createSignal(accountToken().tin !== props.tin || props.acceptance() === null || props.acceptance());

  console.log("Merged Tin: ", props.tin, "Account Tin: ", accountToken().tin, "Acceptance: ", props.acceptance());

  const [spinner, setSpinner] = createSignal(false);
  const handleAcceptance = async () => {
    setSpinner(true);
    declarationsService.setToken(accessToken());
    await declarationsService.acceptDeclaration(props.id);
    setSpinner(false);
    props.setAcceptance(true);
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
          Accept
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
        {merged.acceptance() ? "Accepted" : "Not accepted"}
      </Tag>
    </Center>
  );
}

function Acceptance(props) {
  props = mergeProps({ name: null, user: null, acceptance: null, id: null }, props);
  const [acceptance, setAcceptance] = createSignal(props.acceptance);
  return (
    <DataWrapper name={`${props.name} Acceptance`}>
      <HStack>
        <DataCell name="TIN" value={props.user.tin} />
        <DataCell name="Name" value={props.user.first_name} />
        <DataCell name="Acceptance" customRow={<Option tin={props.user.tin} acceptance={acceptance} setAcceptance={setAcceptance} id={props.id} />} />
        <DataCell name="Status" customRow={<Status acceptance={acceptance} />} />
      </HStack>
    </DataWrapper>
  );
}

export default Acceptance;