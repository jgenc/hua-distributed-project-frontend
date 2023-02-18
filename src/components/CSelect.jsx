import { SimpleOption, SimpleSelect } from "@hope-ui/solid";
import { For, mergeProps } from "solid-js";

function CSelect(props) {
  const merged = mergeProps({ setFields: null, selectList: null, name: "Fill Name", placeholder: "Fill Placeholder" }, props);

  return (
    <SimpleSelect name={merged.name} placeholder={merged.placeholder} onChange={value => merged.setFields(merged.name, value)}>
      <For each={merged.selectList}>
        {item => <SimpleOption value={item}>{item}</SimpleOption>}
      </For>
    </SimpleSelect>
  );
}

export default CSelect;