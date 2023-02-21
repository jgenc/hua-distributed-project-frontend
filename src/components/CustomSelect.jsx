import { SimpleOption, SimpleSelect } from "@hope-ui/solid";
import { For, mergeProps } from "solid-js";

function CustomSelect(props) {
  const merged = mergeProps({ setPropertyCategory: null, setFields: null, selectList: null, name: "Fill Name", placeholder: "Fill Placeholder" }, props);

  const handler = (value) => {
    merged.setFields(merged.name, value);
    if (!merged.setPropertyCategory)
      return;
    merged.setPropertyCategory(value);
  };

  return (
    <SimpleSelect name={merged.name} placeholder={merged.placeholder} onChange={handler}>
      <For each={merged.selectList}>
        {item => <SimpleOption value={item}>{item}</SimpleOption>}
      </For>
    </SimpleSelect>
  );
}

export default CustomSelect;