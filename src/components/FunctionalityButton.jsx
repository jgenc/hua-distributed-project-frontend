import { Box, Grid, GridItem, IconButton, Text } from "@hope-ui/solid";
import { mergeProps } from "solid-js";

function FunctionalityButton(props) {
  const merged = mergeProps({ text: null, icon: null, onClick: null }, props);
  return (
    <Box
      maxW="$sm"
      borderWidth="1px"
      borderColor="$neutral6"
      borderRadius="$lg"
      overflow="hidden"
    >
      <Grid
        h="$20"
        templateColumns="repeat(5, 1fr)"
      >
        <GridItem
          colSpan={4}
          background="$primary6"
          p="$6"
        >
          <Text size="xl">
            {merged.text}
          </Text>
        </GridItem>
        <GridItem
          colSpan={1}
          background="$primary4"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            onClick={merged.onClick}
            icon={merged.icon}
            variant="ghost"
            height="$min"
            width="$full" />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default FunctionalityButton;