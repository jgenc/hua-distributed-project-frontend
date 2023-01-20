import { Anchor, Box, Button, Container, Divider, Flex, Heading, Spacer } from "@hope-ui/solid";
import { mergeProps } from "solid-js";

// TODO: Find a way to make this somewhat okay

function Footer(props) {
	return (
		<>
			<Divider />

			<Container p="$4" m="$4">
				<Flex p="$3">
					<Box w="70px" h="$10">
						<ul>
							<li>Link 1</li>
							<li>Link 2</li>
						</ul>
					</Box>
					<Spacer />
					<Box>
						<ul>
							<li>Link 1</li>
							<li>Link 2</li>
						</ul>
					</Box>
					<Spacer />
					<Box>
						<ul>
							<li>Link 1</li>
							<li>Link 2</li>
						</ul>
					</Box>
					<Spacer />
					<Box>
						<ul>
							<li>Link 1</li>
							<li>Link 2</li>
						</ul>
					</Box>
				</Flex>
			</Container>

			<Divider />
		</>
	);
}

export default Footer;