import { Button, HStack, Text } from "@hope-ui/solid";
import { mergeProps } from "solid-js";
import tokens from "../../../utils/tokens";
import DataCell from "../../../components/DataCell";
import DataWrapper from "../../../components/DataWrapper";

function Payment(props) {
  const merged = mergeProps({ tax: null, purchaser: null }, props);
  const disable = tokens.accountToken().tin !== merged.purchaser.tin;
  return (
    <HStack spacing="$3">
      <Text>{merged.tax}€</Text>
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