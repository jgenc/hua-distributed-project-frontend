import { Box, Button, Center, Flex, Grid, GridItem, Heading, Icon, IconButton, Spacer, Text, VStack } from "@hope-ui/solid";
import { mergeProps } from "solid-js";

function FunctionalityButton(props) {
  props = mergeProps({ text: null, icon: null, onClick: null }, props);

  return (
    <Box
      h="$40"
      w="$60"
      borderWidth="1px"
      borderColor="$neutral6"
      borderRadius="$lg"
    >
      <Flex direction="column">
        <Box
          h="$28"
          bgColor="$neutral5"
          borderTopRadius="$lg"
        >
          <Center
            h="inherit"
            mx="$10"
          >
            <Heading size="2xl">
              {props.text}
            </Heading>
          </Center>
        </Box>

        <Spacer />

        <Box
          h="$12"
          bgColor="$info9"
          borderTopRadius={"$none"}
          borderBottomRadius="$lg"
          as={Button}
          onClick={props.onClick}
          colorScheme="info"
        >
          <Center h="inherit">
            {props.icon}
          </Center>
        </Box>
      </Flex>
    </Box >
  );
}

export default FunctionalityButton;





















  // return (
  //   <Box
  //     maxW="$lg"
  //     borderWidth="1px"
  //     borderColor="$neutral6"
  //     borderRadius="$lg"
  //     overflow="hidden"
  //   >
  //     <Grid
  //       h="$20"
  //       templateColumns="repeat(5, 1fr)"
  //     >
  //       <GridItem
  //         colSpan={4}
  //         background="$primary6"
  //         p="$6"
  //       >
  //         <Text size="xl">
  //           {merged.text}
  //         </Text>
  //       </GridItem>
  //       <GridItem
  //         colSpan={1}
  //         background="$primary4"
  //         display="flex"
  //         alignItems="center"
  //         justifyContent="center"
  //       >
  //         <IconButton
  //           onClick={merged.onClick}
  //           icon={merged.icon}
  //           variant="ghost"
  //           height="$min"
  //           width="$full" />
  //       </GridItem>
  //     </Grid>
  //   </Box>
  // );