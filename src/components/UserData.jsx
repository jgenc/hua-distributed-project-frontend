import { Container, HStack, Input, VStack, Text, Divider, Center } from "@hope-ui/solid";
import { mergeProps } from "solid-js";
import DataCell from "./DataCell";
import DataWrapper from "./DataWrapper";

function UserData(props) {
  const merged = mergeProps({ user: null, name: null }, props);

  return (
    <DataWrapper name={`Στοιχεία ${merged.name}`}>
      <HStack>
        <DataCell name="ΑΦΜ" value={merged.user.tin} />
        <DataCell name="Όνομα" value={merged.user.firstName} />
        <DataCell name="Επίθετο" value={merged.user.lastName} />
        <DataCell name="Διεύθυνση" value={merged.user.address} />
        <DataCell name="ΔΟΥ" value={merged.user.doy} />
      </HStack>
    </DataWrapper>
  );
}

export default UserData;