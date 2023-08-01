import { Container, HStack, Input, VStack, Text, Divider, Center } from "@hope-ui/solid";
import { mergeProps } from "solid-js";
import DataCell from "../../../components/DataCell";
import DataWrapper from "../../../components/DataWrapper";

function UserData(props) {
  const merged = mergeProps({ user: null, name: null }, props);

  console.log(merged);

  return (
    <DataWrapper name={`${merged.name} Info`}>
      <HStack>
        <DataCell name="TIN" value={merged.user.tin} />
        <DataCell name="Name" value={merged.user.first_name} />
        <DataCell name="Surname" value={merged.user.last_name} />
        <DataCell name="Address" value={merged.user.address} />
        <DataCell name="Greek SEE" value={merged.user.doy} />
      </HStack>
    </DataWrapper>
  );
}

export default UserData;