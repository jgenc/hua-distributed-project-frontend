import { mergeProps } from "solid-js";
import DataCell from "../../../components/DataCell";
import DataWrapper from "../../../components/DataWrapper";

function CompleteDeclaration(props) {
  props = mergeProps({}, props);
  return (
    <DataWrapper lastWrapperBottomRadius name="Complete declaration">
      <DataCell name="Action" />
    </DataWrapper>
  );
}

export default CompleteDeclaration;