import { Center, Container, Divider, HStack, VStack } from "@hope-ui/solid";
import { mergeProps } from "solid-js";
import DataCell from "../../../components/DataCell";
import DataWrapper from "../../../components/DataWrapper";


function PropertyData(props) {
  const merged = mergeProps({ property: null }, props);
  return (
    <DataWrapper name="Στοιχεία Ακινήτου">
      <HStack>
        <DataCell name="Αριθμός Ακινήτου" value={merged.property_number} />
        <DataCell name="Κατηγορία Ακινήτου" value={merged.property_category} />
        <DataCell name="Περιγραφή Ακινήτου" value={merged.property_description} />
      </HStack>
    </DataWrapper>
  );
}

export default PropertyData;