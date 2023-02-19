import { breadcrumbLinkStyles, Button, containerStyles, createDisclosure, Divider, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, selectLabelStyles, SimpleOption, SimpleSelect, Textarea, VStack } from "@hope-ui/solid";
import { createEffect, createSignal, mergeProps, Show } from "solid-js";
import declarationsService from "../../../services/declarations";
import tokens from "../../../utils/tokens";
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
      contractDetails: contract(),
      paymentMethod: select()
    };
    declarationsService.setToken(tokens.userToken().accessToken);
    await declarationsService.completeDeclaration(merged.id, contractObject);
    setSpinner(false);
    merged.setContract(contract());
    merged.setPaymentMethod(select());
    setIsDeclarationCompleted(true);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} disabled={isDeclarationCompleted()} size="xs">Συμπλήρωση Συμβόλαιου</Button>
      <Modal opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Συμπλήρωση Συμβόλαιου</ModalHeader>
          <Divider />
          <ModalBody>
            <FormControl required>
              <FormLabel>Στοιχεία Συμβόλαιου</FormLabel>
              <Input
                onChange={(e) => setContract(e.target.value)}
                minlength={12}
                maxLength={25} />
            </FormControl>
            <FormControl required>
              <FormLabel>Τρόπος Πληρωμής</FormLabel>
              <SimpleSelect value={select()} onChange={setSelect}>
                <SimpleOption value="cash">Μετρητά</SimpleOption>
                <SimpleOption value="check">Επιταγή</SimpleOption>
                <SimpleOption value="card">Κάρτα</SimpleOption>
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
  switch(method) {
    case "cash":
      translated = "Μετρητά"
      break;
    case "check":
      translated = "Επιταγή"
      break;
    case "card":
      translated = "Κάρτα"
      break;
  }
  return translated;
}

function ContractData(props) {
  const merged = mergeProps({ name: null, contract: null, paymentMethod: null, id: null }, props);
  const [contract, setContract] = createSignal(merged.contract);
  const [paymentMethod, setPaymentMethod] = createSignal(merged.paymentMethod);
  const isNotary = tokens.userToken().roles.includes("ROLE_NOTARY");
  const isDeclarationCompleted = paymentMethod() && contract();

  return (
    <DataWrapper name={merged.name}>
      <HStack>
        <DataCell name="Αριθμός Συμβόλαιου" value={contract()} />
        <DataCell name="Τρόπος Πληρωμής" value={translatePayment(paymentMethod())} />
        <Show when={isNotary}>
          <DataCell name="Προσθήκη Συμβόλαιου" customRow={<CreateContract id={merged.id} setContract={setContract} setPaymentMethod={setPaymentMethod} isDeclarationCompleted={isDeclarationCompleted} />} />
        </Show>
      </HStack>
    </DataWrapper>
  );
}

export default ContractData;