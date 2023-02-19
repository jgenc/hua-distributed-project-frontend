import { Center, Container, Divider, VStack, Text } from "@hope-ui/solid";
import { mergeProps, Show } from "solid-js";

function DataCell(props) {
  const merged = mergeProps({ name: null, value: null, customRow: null }, props);

  return (
    <Container
      h="$14"
      borderWidth="1px"
      borderColor="$neutral6"
    >
      <VStack>
        <Container
          background="$neutral3">
          <Center>
            {merged.name}
          </Center>
        </Container>
        <Divider />

        <Container>
          <Center h="$7">
            <Show when={merged.customRow === null} fallback={merged.customRow}>
              <Text>{merged.value} </Text>
            </Show>
          </Center>
        </Container>
      </VStack>
    </Container>
  );
}

export default DataCell;