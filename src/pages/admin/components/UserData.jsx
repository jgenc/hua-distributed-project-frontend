import { Container, HStack, Input, VStack, Text, Divider, Center } from "@hope-ui/solid";
import { mergeProps } from "solid-js";
import DataCell from "../../../components/DataCell";
import DataWrapper from "../../../components/DataWrapper";

function UserData(props) {
  const merged = mergeProps({ user: null, name: null }, props);

  console.log(merged)

  return (
    <DataWrapper name={`Στοιχεία ${merged.name}`}>
      <HStack>
        <DataCell name="ΑΦΜ" value={merged.user.tin} />
        <DataCell name="Όνομα" value={merged.user.first_name} />
        <DataCell name="Επίθετο" value={merged.user.last_name} />
        <DataCell name="Διεύθυνση" value={merged.user.address} />
        <DataCell name="ΔΟΥ" value={merged.user.doy} />
      </HStack>
    </DataWrapper>
  );
}

export default UserData;