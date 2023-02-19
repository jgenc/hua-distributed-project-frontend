import { mergeProps } from "solid-js";
import DataCell from "../../../components/DataCell";
import DataWrapper from "../../../components/DataWrapper";

function CompleteDeclaration(props) {
  const merged = mergeProps({}, props);
  return (
    <DataWrapper name="Ολοκλήρωση Δήλωσης">
      <DataCell name="Κίνηση"/>
    </DataWrapper>
  );
}

export default CompleteDeclaration;