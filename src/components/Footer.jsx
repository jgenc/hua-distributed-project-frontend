import { Anchor, Box, Button, Center, Container, Divider, Flex, Heading, Spacer, Text } from "@hope-ui/solid";
import { mergeProps } from "solid-js";

// TODO: Find a way to make this somewhat okay

function Footer(props) {
  return (
    <Box
      position="fixed"
      borderTopWidth="2px"
      borderColor="$blackAlpha6"
      bottom={0}
      width="$screenW"
    >
      <Center>
        <Text size="xl">
          Made with{<Text color="$primary9">SolidJS</Text>}
        </Text>
      </Center>
    </Box>
  );
}

export default Footer;