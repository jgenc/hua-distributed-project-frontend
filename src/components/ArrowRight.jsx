import { Anchor, Icon } from "@hope-ui/solid";
import { VsArrowRight } from 'solid-icons/vs';
import { mergeProps } from "solid-js";

function ArrowRight(props) {
  const merged = mergeProps({ id: null }, props);

  function MyButton() {
    return (
      <Icon as={VsArrowRight} />
    );
  }

  return (
    <Anchor href={`#/declarations/${merged.id}`}>
      <MyButton />
    </Anchor>
  );
}

export default ArrowRight;