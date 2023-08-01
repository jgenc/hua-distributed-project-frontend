import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-yup";
import { Anchor, Box, Button, Container, createDisclosure, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@hope-ui/solid";
import { createEffect, createSignal, on } from "solid-js";
import { mixed, number, object, string } from "yup";
import CustomSelect from "../../components/CustomSelect";
import declarationsService from "../../services/declarations";
import accountService from "../../services/account";
import FunctionalityButton from "../../components/FunctionalityButton";
import { VsAdd } from "solid-icons/vs";
import createNotification from "../../utils/notification";
import { accessToken } from "../../utils/tokens";

const categories = [
  "Apartment",
  "House",
  "Vacation Home",
  "Office Building",
  "Warehouse",
  "Hotel",
  "Vacant land",
  "Agricultural land",
  "Raw land"
];

const rate = 0.0309;

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

async function checkForTin(tin, setTinError, tinError) {
  if (tin().length === 9) {
    setTinError("Checking TIN...");
    accountService.setToken(accessToken());
    const actualTin = await accountService.getAccount(tin());
    if (actualTin.name === "AxiosError") {
      setTinError("TIN does not exist.");
    } else {
      setTinError("");
    }
  } else if (tin().length < 9 && tinError()) {
    setTinError("");
  }
}

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

  createEffect(async () => {
    checkForTin(purchaserTin, setPurchaserTinError, purchaserTinError);
    checkForTin(sellerTin, setSellerTinError, sellerTinError);
  });

  const [propertyCategory, setPropertyCategory] = createSignal(null);
  const [propertyValue, setPropertyValue] = createSignal(null);
  const [tax, setTax] = createSignal(0);

  createEffect(on(propertyValue, (value) => {
    setTax(value * rate);
    setData("tax", tax());
  }));

  return (
    <>
      <FunctionalityButton text="Create a new declaration" icon={<VsAdd />} onClick={onOpen} />
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
            <ModalHeader>New declaration</ModalHeader>
            <Divider />
            <ModalBody>
              <FormControl required invalid={!!errors("property_number")}>
                <FormLabel for="property_number">Property Number</FormLabel>
                <Input
                  name="property_number"
                  minLength="1"
                  maxLength="5" />
                <FormErrorMessage>{errors("property_number")[0].replace("property_number", "The property number")}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("property_category")}>
                <FormLabel for="property_category">Property Category</FormLabel>
                <CustomSelect
                  setPropertyCategory={setPropertyCategory}
                  selectList={categories}
                  name="property_category"
                  placeholder="Pick a category"
                  setFields={setFields} />
                <FormErrorMessage>{errors("property_category")[0]}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("properety_value")}>
                <FormLabel for="properety_value">Property Value</FormLabel>
                <Input name="properety_value" type="number" value={propertyValue()} onChange={(e) => setPropertyValue(e.target.value)}></Input>
                <FormErrorMessage>{errors("properety_value")[0].replace("property_value", "The property value")}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("property_description")}>
                <FormLabel for="property_description">Property Description</FormLabel>
                <Input name="property_description" />
                <FormErrorMessage>{errors("property_description")[0].replace("property_description", "The property description")}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("purchaser_tin") || purchaserTinError()}>
                <FormLabel for="purchaser_tin">Purchaser TIN</FormLabel>
                <Input
                  name="purchaser_tin"
                  value={purchaserTin()}
                  onChange={(e) => { setPurchaserTin(e.target.value); setData("purchaser_tin", purchaserTin()); }}
                  minLength="9"
                  maxLength="9" />
                <FormErrorMessage>{purchaserTinError() ? purchaserTinError() : errors("purchaser_tin")[0].replace("purchaser_tin", "The Purchaser's TIN")}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("seller_tin") || sellerTinError()}>
                <FormLabel for="seller_tin">Seller TIN</FormLabel>
                <Input
                  name="seller_tin"
                  value={sellerTin()}
                  onChange={(e) => { setSellerTin(e.target.value); setData("seller_tin", sellerTin()); }}
                  minLength="9"
                  maxLength="9" />
                <FormErrorMessage>{sellerTinError() ? sellerTinError : errors("seller_tin")[0].replace("seller_tin", "The Seller's TIN")}</FormErrorMessage>
              </FormControl>

              <FormControl required invalid={!!errors("tax")}>
                <FormLabel for="tax">Tax</FormLabel>
                <Input
                  value={tax()}
                  name="tax"
                  type="number"
                  disabled
                  bg="$blackAlpha8" />
                <FormErrorMessage>{errors("tax")[0].replace("tax", "The tax")}</FormErrorMessage>
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