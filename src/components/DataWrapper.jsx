import { Container, HStack, Input, VStack, Text, Divider, Center, SimpleGrid, Grid } from "@hope-ui/solid";
import { children, mergeProps } from "solid-js";

function DataWrapper(props) {
  props = mergeProps({ user: null, name: null, br: false }, props);

  return (
    <VStack
      borderWidth="1px"
      borderColor="$neutral6"
      // borderRadius="$lg"
      borderBottomRadius={props.br ? "$lg" : "$none"}
      overflow="hidden" >

      <Container
        background="$neutral5"
        p="$1"
      >
        <Text as="b">
          {props.name}
        </Text>
      </Container>

      <Divider />

      <Container>
        {props.children}
      </Container>
    </VStack>
  );
}

export default DataWrapper;