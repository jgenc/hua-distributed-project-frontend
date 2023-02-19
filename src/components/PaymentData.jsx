import { Button, HStack, Text } from "@hope-ui/solid";
import { mergeProps } from "solid-js";
import tokens from "../utils/tokens";
import DataCell from "./DataCell";
import DataWrapper from "./DataWrapper";

function Payment(props) {
  const merged = mergeProps({ tax: null, purchaser: null }, props);
  const disable = tokens.accountToken().tin !== merged.purchaser.tin;
  return (
    <HStack spacing="$3">
      <Text>{merged.tax}€</Text>
      <Button disabled={disable} colorScheme="success" size="xs">Πληρωμή</Button>
    </HStack>
  );
}

function PaymentData(props) {
  const merged = mergeProps({ name: null, tax: null, purchaser: null }, props);
  return (
    <DataWrapper name={merged.name}>
      <HStack>
        <DataCell name="Ποσό" value={<Payment tax={merged.tax} purchaser={merged.purchaser} />} />
      </HStack>
    </DataWrapper>
  );
}

export default PaymentData;