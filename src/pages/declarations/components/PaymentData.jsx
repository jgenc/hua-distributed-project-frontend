import { Button, HStack, Text } from "@hope-ui/solid";
import { mergeProps } from "solid-js";
import { accountToken } from "../../../utils/tokens";
import DataCell from "../../../components/DataCell";
import DataWrapper from "../../../components/DataWrapper";

function Payment(props) {
  const merged = mergeProps({ tax: null, purchaser: null }, props);
  const disable = accountToken().tin !== merged.purchaser.tin;
  return (
    <HStack spacing="$3">
      <Text>{merged.tax}€</Text>
    </HStack>
  );
}

function PaymentData(props) {
  props = mergeProps({ name: null, tax: null, purchaser: null }, props);
  return (
    <DataWrapper br name={props.name}>
      <HStack>
        <DataCell name="Amount" value={<Payment tax={props.tax} purchaser={props.purchaser} />} />
      </HStack>
    </DataWrapper>
  );
}

export default PaymentData;