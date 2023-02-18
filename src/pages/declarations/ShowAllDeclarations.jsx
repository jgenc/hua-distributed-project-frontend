import { Button, Container, createDisclosure, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@hope-ui/solid";
import { createSignal, For } from "solid-js";
import users from "../../services/users";

import declarationsService from "../../services/declarations";
import tokens from "../../utils/tokens";

function ShowAllDeclarations() {
  const { isOpen, onClose, onOpen } = createDisclosure();
  const [declarations, setDeclarations] = createSignal([]);

  const handleAllDeclarations = async () => {
    // TODO: What am I fucking doing here
    declarationsService.setToken(tokens.userToken().accessToken);
    setDeclarations(await declarationsService.getDeclarations());
    onOpen();
  };

  return (
    <>
      <Button onClick={handleAllDeclarations}>O</Button>
      <Modal size="9xl" opened={isOpen()} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Δηλώσεις</ModalHeader>
            <Divider />
            <ModalBody>
              <Table dense highlightOnHover>
                <TableCaption>Data of all declarations</TableCaption>
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
                  <For each={declarations()}>
                    {(declaration) => <Tr>
                      <Td>{declaration.id}</Td>
                      <Td>{declaration.propertyNumber}</Td>
                      <Td>{declaration.propertyCategory}</Td>
                      <Td>{declaration.propertyDescription}</Td>
                      <Td>{declaration.purchaser.tin}</Td>
                      <Td>{declaration.seller.tin}</Td>
                      <Td>{declaration.notary.tin}</Td>
                      <Td>{declaration.tax}</Td>
                      <Td>{declaration.paymentMethod}</Td>
                      <Td>{declaration.sellerAcceptance ? "True" : "False"}</Td>
                      <Td>{declaration.purchaserAcceptance ? "True" : "False"}</Td>
                      <Td>{declaration.contractDetails}</Td>
                      <Td>{declaration.status}</Td>
                    </Tr>}
                  </For>
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