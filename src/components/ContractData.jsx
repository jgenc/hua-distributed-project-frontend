import { mergeProps } from "solid-js";
import DataCell from "./DataCell";
import DataWrapper from "./DataWrapper";

function ContractData(props) {
  const merged = mergeProps({ name: null, contract: null }, props);
  return (
    <DataWrapper name={merged.name}>
      <DataCell name="Λεπτομέριες" value={merged.contract} />
    </DataWrapper>
  );
}

export default ContractData;