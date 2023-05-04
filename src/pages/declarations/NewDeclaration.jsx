import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-yup";
import { Anchor, Box, Button, Container, createDisclosure, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@hope-ui/solid";
import { createEffect, createSignal } from "solid-js";
import { mixed, number, object, string } from "yup";
import CustomSelect from "../../components/CustomSelect";
import declarationsService from "../../services/declarations";
import accountService from "../../services/account";
import FunctionalityButton from "../../components/FunctionalityButton";
import { VsAdd } from "solid-icons/vs";
import createNotification from "../../utils/notification";
import { accessToken } from "../../utils/tokens";

const categories = [
  "Διαμέρισμα",
  "Μονοκατοικία",
  "Επαγγελματική",
  "Οικόπεδο",
  "Γεωργικά",
];

const rates = [
  0.05,
  0.1,
  0.2,
  0.25,
  0.1
];

const schema = object({
  property_number: string().min(1).max(5).required(),
  property_value: number().min(500).max(10000000).notRequired(),
  property_category: mixed().oneOf(categories).required(),
  property_description: string().min(10).max(255).required(),
  purchaser_tin: string().length(9).required(),
  seller_tin: string().length(9).required(),
  tax: number()
});

// TODO: Form checking

function NewDeclaration() {
  const [spinner, setSpinner] = createSignal(false);
  const { isOpen, onOpen, onClose } = createDisclosure();
  const { form, errors, isValid, setFields, setData } = createForm({
    extend: validator({ schema }),
    onSubmit: async values => {
      delete values.properety_value;
      console.log(values);
      setSpinner(true);
      declarationsService.setToken(accessToken());
      await declarationsService.newDeclaration(values);
      setSpinner(false);
      createNotification("success", "Επιτυχής δημιουργία καινούριας δήλωσης!");
      onClose();
    },
    onError: async error => {
      console.log(error);
    }
  });

  const [purchaserTin, setPurchaserTin] = createSignal("");
  const [purchaserTinError, setPurchaserTinError] = createSignal();
  const [sellerTin, setSellerTin] = createSignal("");
  const [sellerTinError, setSellerTinError] = createSignal();

  // TODO: Merge the two Effectis into one

  createEffect(async () => {
    if (purchaserTin().length === 9) {
      // check if tin exists
      setPurchaserTinError("Checking TIN...");
      accountService.setToken(accessToken());
      const actualTin = await accountService.getAccount(purchaserTin());
      if (actualTin.name === "AxiosError") {
        setPurchaserTinError("TIN does not exist.");
      } else {
        setPurchaserTinError("");
      }
    } else if (purchaserTin().length < 9 && purchaserTinError()) {
      setPurchaserTinError("");
    }
  });

  createEffect(async () => {
    if (sellerTin().length === 9) {
      setSellerTinError("Checking TIN...");
      accountService.setToken(accessToken());
      const actualTin = await accountService.getAccount(sellerTin());
      if (actualTin.name === "AxiosError") {
        setSellerTinError("TIN does not exist.");
      } else {
        setSellerTinError("");
      }
    } else if (sellerTin().length < 9 && sellerTinError()) {
      setSellerTinError("");
    }
  });

  const [propertyCategory, setPropertyCategory] = createSignal(null);
  const [propertyValue, setPropertyValue] = createSignal(null);
  const [tax, setTax] = createSignal(0);

  createEffect(() => {
    if (!propertyCategory() || !propertyValue())
      return;
    setTax(propertyValue() * rates[categories.indexOf(propertyCategory())]);
    setData("tax", tax());
  });

  return (
    <>
      <FunctionalityButton text="Καινούρια δήλωση" icon={<VsAdd />} onClick={onOpen} />
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
              <FormControl required invalid={!!errors("property_number")}>
                <FormLabel for="property_number">Αριθμός Ακινήτου</FormLabel>
                <Input
                  name="property_number"
                  minLength="1"
                  maxLength="5" />
                <FormErrorMessage>{errors("property_number")[0]}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("property_category")}>
                <FormLabel for="property_category">Κατηγορίας Ακινήτου</FormLabel>
                <CustomSelect
                  setPropertyCategory={setPropertyCategory}
                  selectList={categories}
                  name="property_category"
                  placeholder="Διάλεξε κατηγορία"
                  setFields={setFields} />
                <FormErrorMessage>{errors("property_category")[0]}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("properety_value")}>
                <FormLabel for="properety_value">Αξία Ακινήτου</FormLabel>
                <Input name="properety_value" type="number" value={propertyValue()} onChange={(e) => setPropertyValue(e.target.value)}></Input>
                <FormErrorMessage>{errors("properety_value")[0]}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("property_description")}>
                <FormLabel for="property_description">Περιγραφή Ακινήτου</FormLabel>
                <Input name="property_description" />
                <FormErrorMessage>{errors("property_description")[0]}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("purchaser_tin") || purchaserTinError()}>
                <FormLabel for="purchaser_tin">ΑΦΜ Αγοραστή</FormLabel>
                <Input
                  name="purchaser_tin"
                  value={purchaserTin()}
                  onChange={(e) => { setPurchaserTin(e.target.value); setData("purchaser_tin", purchaserTin()); }}
                  minLength="9"
                  maxLength="9" />
                <FormErrorMessage>{purchaserTinError() ? purchaserTinError() : errors("purchaser_tin")[0]}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("seller_tin") || sellerTinError()}>
                <FormLabel for="seller_tin">ΑΦΜ Πωλητή</FormLabel>
                <Input
                  name="seller_tin"
                  value={sellerTin()}
                  onChange={(e) => { setSellerTin(e.target.value); setData("seller_tin", sellerTin()); }}
                  minLength="9"
                  maxLength="9" />
                <FormErrorMessage>{sellerTinError() ? sellerTinError : errors("seller_tin")[0]}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("tax")}>
                <FormLabel for="tax">Φόρος</FormLabel>
                <Input
                  value={tax()}
                  name="tax"
                  type="number"
                  disabled
                  bg="$blackAlpha8" />
                <FormErrorMessage>{errors("tax")[0]}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" loading={spinner()} disabled={!isValid() || (sellerTinError() || purchaserTinError())}>Αποθήκευση</Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </>
  );
}

export default NewDeclaration;