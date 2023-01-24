import { Button, Container, createDisclosure, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableCaption, Tbody, Th, Thead, Tr } from "@hope-ui/solid";
import { For } from "solid-js";
import users from "../../services/users";

import declarationService from "../../services/declarations";
import tokens from "../../utils/tokens";

function ShowAllDeclarations() {
	const { isOpen, onClose, onOpen } = createDisclosure();

	const handleAllDeclarations = async () => {
		onOpen();
		declarationService.setToken(tokens.userToken().accessToken);
		console.log(await declarationService.declarations());
	};

	return (
		<>
			<Button onClick={handleAllDeclarations}>O</Button>
			<Modal size="7xl" opened={isOpen()} onClose={onClose}>
				<ModalOverlay>
					<ModalContent>
						<ModalCloseButton />
						<ModalHeader>Δηλώσεις</ModalHeader>
						<Divider />
						<ModalBody>
							<Table dense highlightOnHover>
								<TableCaption>Data of all users in the system</TableCaption>
								<Thead>
									<Tr>
										<Th>Id</Th>
										<Th>Property Number</Th>
										<Th>Property Category</Th>
										<Th>Property Description</Th>
										<Th>Purchaser TIN</Th>
										<Th>Seller TIN</Th>
										<Th>Notary TIN</Th>
										<Th>Tax</Th>
										<Th>Payment Method</Th>
										<Th>Seller Acceptance</Th>
										<Th>Purchaser Acceptance</Th>
										<Th>Contract Details</Th>
										<Th>Status</Th>
									</Tr>
								</Thead>
								<Tbody>
								</Tbody>
							</Table>
						</ModalBody>
					</ModalContent>
				</ModalOverlay>
			</Modal>
		</>
	);
}

export default ShowAllDeclarations;