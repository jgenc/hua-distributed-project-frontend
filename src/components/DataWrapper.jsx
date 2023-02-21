import { Container, HStack, Input, VStack, Text, Divider, Center, SimpleGrid, Grid } from "@hope-ui/solid";
import { children, mergeProps } from "solid-js";

function DataWrapper(props) {
  const merged = mergeProps({ user: null, name: null }, props);

  return (
    <VStack
      borderWidth="1px"
      borderColor="$neutral6"
      borderRadius="$lg"
      m="$2"
      overflow="hidden" >

      <Container
        background="$neutral5"
        p="$1">
        {merged.name}
      </Container>

      <Divider />

      <Container>
        {props.children}
      </Container>
    </VStack>
  );
}

export default DataWrapper;