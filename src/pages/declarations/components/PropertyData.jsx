import { Center, Container, Divider, HStack, VStack } from "@hope-ui/solid";
import { mergeProps } from "solid-js";
import DataCell from "../../../components/DataCell";
import DataWrapper from "../../../components/DataWrapper";


function PropertyData(props) {
  props = mergeProps({ property: null }, props);
  return (
    <DataWrapper name="Property Info">
      <HStack>
        <DataCell name="Number" value={props.property.number} />
        <DataCell name="Category" value={props.property.category} />
        <DataCell name="Description" value={props.property.description} />
      </HStack>
    </DataWrapper>
  );
}

export default PropertyData;