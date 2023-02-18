import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-yup";
import { Anchor, Box, Button, Container, createDisclosure, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@hope-ui/solid";
import { createEffect, createSignal } from "solid-js";
import { mixed, number, object, string } from "yup";
import CSelect from "../../components/CSelect";
import declarationsService from "../../services/declarations";
import accountService from "../../services/account";

const categories = [
  "Διαμέρισμα",
  "Μονοκατοικία",
  "Επαγγελματική Στέγη",
  "Οικόπεδο ακάλυπτο",
  "Γεωργικά κτίρια",
];

const schema = object({
  propertyNumber: string().length(9).required(),
  propertyCategory: mixed().oneOf(categories).required(),
  propertyDescription: string().min(10).max(255).required(),
  purchaserTin: string().length(9).required(),
  sellerTin: string().length(9).required(),
  tax: number().moreThan(0).required(),
});

// TODO: Form checking

function NewDeclaration() {
  const [spinner, setSpinner] = createSignal(false);
  const { isOpen, onOpen, onClose } = createDisclosure();
  const { form, errors, isValid, setFields } = createForm({
    extend: validator({ schema }),
    onSubmit: async values => {
      console.log("SUBMITTED");
      setSpinner(true);
      console.log(values);
      declarationsService.setToken(JSON.parse(sessionStorage.getItem("userToken")).accessToken);
      await declarationsService.newDeclaration(values);
      setSpinner(false);
      onClose();
    },
  });

  const [purchaserTin, setPurchaserTin] = createSignal("");
  const [purchaserTinError, setPurchaserTinError] = createSignal();
  const [sellerTin, setSellerTin] = createSignal("");
  const [sellerTinError, setSellerTinError] = createSignal();

  createEffect(async () => {
    if (purchaserTin().length === 9) {
      console.log("Checking purchaser TIN... length: ", purchaserTin());
      // check if tin exists
      accountService.setToken(JSON.parse(sessionStorage.getItem("userToken")).accessToken);
      const actualTin = await accountService.getAccount(purchaserTin());
      if (!actualTin) {
        // TODO: print a message to the user that the tin does not exist
        setPurchaserTinError("Purchaser TIN does not exist.");
        console.log(purchaserTinError());
      }
    } else if (purchaserTin().length < 9 && purchaserTinError()) {
      setPurchaserTinError("");
    }
  });

  createEffect(async () => {
    if (sellerTin().length === 9) {
      console.log("Checking seller TIN... length: ", sellerTin());
      accountService.setToken(JSON.parse(sessionStorage.getItem("userToken")).accessToken);
      const actualTin = await accountService.getAccount(sellerTin());
      if (!actualTin) {
        // TODO: print a message to the user that the tin does not exist
        setSellerTinError("Seller TIN does not exist.");
      }
    } else if (sellerTin().length < 9 && sellerTinError()) {
      setSellerTinError("");
    }
  });

  return (
    <>
      <Anchor onClick={onOpen}>+</Anchor>
      <Modal
        opened={isOpen()}
        onClose={onClose}
        size="2xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <Box as="form" ref={form}>
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Νέα Δήλωση</ModalHeader>
            <Divider />
            <ModalBody>
              <FormControl required invalid={!!errors("propertyNumber")}>
                <FormLabel for="propertyNumber">Αριθμός Ακινήτου</FormLabel>
                <Input
                  name="propertyNumber"
                  minLength="9"
                  maxLength="9" />
                <FormErrorMessage>{errors("propertyNumber")[0]}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("propertyCategory")}>
                <FormLabel for="propertyCategory">Κατηγορίας Ακινήτου</FormLabel>
                <CSelect
                  selectList={categories}
                  name="propertyCategory"
                  placeholder="Διάλεξε κατηγορία"
                  setFields={setFields} />
                <FormErrorMessage>{errors("propertyCategory")[0]}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("propertyDescription")}>
                <FormLabel for="propertyDescription">Περιγραφή Ακινήτου</FormLabel>
                <Input name="propertyDescription" />
                <FormErrorMessage>{errors("propertyDescription")[0]}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("purchaserTin") || purchaserTinError()}>
                <FormLabel for="purchaserTin">ΑΦΜ Αγοραστή</FormLabel>
                <Input
                  name="purchaserTin"
                  value={purchaserTin()}
                  onChange={(e) => { setPurchaserTin(e.target.value); }}
                  minLength="9"
                  maxLength="9" />
                <FormErrorMessage>{purchaserTinError() ? purchaserTinError() : errors("purchaserTin")[0]}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("sellerTin") || sellerTinError()}>
                <FormLabel for="sellerTin">ΑΦΜ Πωλητή</FormLabel>
                <Input
                  name="sellerTin"
                  value={sellerTin()}
                  onChange={(e) => { setSellerTin(e.target.value); }}
                  minLength="9"
                  maxLength="9" />
                <FormErrorMessage>{sellerTinError() ? sellerTinError : errors("sellerTin")[0]}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("tax")}>
                <FormLabel for="tax">Φόρος</FormLabel>
                <Input
                  name="tax"
                  type="number" />
                <FormErrorMessage>{errors("tax")[0]}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" loading={spinner()} disabled={!isValid()}>Αποθήκευση</Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </>
  );
}

export default NewDeclaration;