import { mergeProps } from "solid-js";
import DataCell from "./DataCell";
import DataWrapper from "./DataWrapper";

function CompleteDeclaration(props) {
  const merged = mergeProps({}, props);
  return (
    <DataWrapper name="Ολοκλήρωση Δήλωσης">
      <DataCell name="Κίνηση"/>
    </DataWrapper>
  );
}

export default CompleteDeclaration;