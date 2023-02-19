import { Center, Container, Divider, HStack, VStack } from "@hope-ui/solid";
import { mergeProps } from "solid-js";
import DataCell from "./DataCell";
import DataWrapper from "./DataWrapper";


function PropertyData(props) {
  const merged = mergeProps({ property: null }, props);
  return (
    <DataWrapper name="Στοιχεία Ακινήτου">
      <HStack>
        <DataCell name="Αριθμός Ακινήτου" value={merged.property.number} />
        <DataCell name="Κατηγορία Ακινήτου" value={merged.property.category} />
        <DataCell name="Περιγραφή Ακινήτου" value={merged.property.description} />
      </HStack>
    </DataWrapper>
  );
}

export default PropertyData;