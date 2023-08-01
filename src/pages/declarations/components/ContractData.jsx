import { breadcrumbLinkStyles, Button, containerStyles, createDisclosure, Divider, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, selectLabelStyles, SimpleOption, SimpleSelect, Textarea, VStack } from "@hope-ui/solid";
import { createEffect, createSignal, mergeProps, Show } from "solid-js";
import declarationsService from "../../../services/declarations";
import { accessToken, accountToken, decodeToken } from "../../../utils/tokens";
import DataCell from "../../../components/DataCell";
import DataWrapper from "../../../components/DataWrapper";

function CreateContract(props) {
  const merged = mergeProps({ id: null, setContract: null, setPaymentMethod: null, isDeclarationCompleted: null }, props);
  const { isOpen, onOpen, onClose } = createDisclosure();
  const [spinner, setSpinner] = createSignal(false);
  const [contract, setContract] = createSignal(null);
  const [select, setSelect] = createSignal(null);
  const [isFormReady, setIsFormReady] = createSignal(false);
  const [isDeclarationCompleted, setIsDeclarationCompleted] = createSignal(merged.isDeclarationCompleted);

  createEffect(() => {
    if (contract() === null || !select()) return;
    if (contract().length >= 12 && select()) {
      setIsFormReady(true);
    } else {
      setIsFormReady(false);
    }
  });

  const handleSave = async () => {
    setSpinner(true);
    const contractObject = {
      contract_details: contract(),
      payment_method: select()
    };
    declarationsService.setToken(accessToken());
    await declarationsService.completeDeclaration(merged.id, contractObject);
    setSpinner(false);
    merged.setContract(contract());
    merged.setPaymentMethod(select());
    setIsDeclarationCompleted(true);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} disabled={isDeclarationCompleted()} size="xs">Fill contract</Button>
      <Modal opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Contract form</ModalHeader>
          <Divider />
          <ModalBody>
            <FormControl required>
              <FormLabel>Contract ID</FormLabel>
              <Input
                onChange={(e) => setContract(e.target.value)}
                minlength={12}
                maxLength={25} />
            </FormControl>
            <FormControl required>
              <FormLabel>Payment Method</FormLabel>
              <SimpleSelect value={select()} onChange={setSelect}>
                <SimpleOption value="cash">Cash</SimpleOption>
                <SimpleOption value="check">Check</SimpleOption>
                <SimpleOption value="card">Card</SimpleOption>
              </SimpleSelect>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button loading={spinner()} colorScheme="success" onClick={handleSave} disabled={!isFormReady()}>Αποθήκευση</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function translatePayment(method) {
  let translated = "";
  switch (method) {
    case "cash":
      translated = "Μετρητά";
      break;
    case "check":
      translated = "Επιταγή";
      break;
    case "card":
      translated = "Κάρτα";
      break;
  }
  return translated;
}

function ContractData(props) {
  props = mergeProps({ name: null, contract: null, paymentMethod: null, id: null }, props);
  const [contract, setContract] = createSignal(props.contract);
  const [paymentMethod, setPaymentMethod] = createSignal(props.paymentMethod);
  const isNotary = decodeToken(accessToken()).notary;
  const isDeclarationCompleted = paymentMethod() && contract();

  return (
    <DataWrapper name={props.name}>
      <HStack>
        <DataCell name="Contract Number" value={contract()} />
        <DataCell name="Payment method" value={paymentMethod()} />
        <Show when={isNotary}>
          <DataCell name="Upload contract" customRow={<CreateContract id={props.id} setContract={setContract} setPaymentMethod={setPaymentMethod} isDeclarationCompleted={isDeclarationCompleted} />} />
        </Show>
      </HStack>
    </DataWrapper>
  );
}

export default ContractData;