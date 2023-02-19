import { Button, Container, createDisclosure, Divider, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Skeleton, Table, TableCaption, Tbody, Td, Th, Thead, Tr, VStack } from "@hope-ui/solid";
import { createSignal, For, Show } from "solid-js";
import users from "../../services/users";

import declarationsService from "../../services/declarations";
import tokens from "../../utils/tokens";
import FunctionalityButton from "../../components/FunctionalityButton";
import { VsSearch } from "solid-icons/vs";
import ArrowRight from "../../components/ArrowRight";


function ShowAllDeclarations() {
  const { isOpen, onClose, onOpen } = createDisclosure();
  const [declarations, setDeclarations] = createSignal([]);

  const handleAllDeclarations = async () => {
    // TODO: What am I fucking doing here
    onOpen();
    declarationsService.setToken(tokens.userToken().accessToken);
    setDeclarations(await declarationsService.getDeclarations());
  };

  return (
    <>
      <FunctionalityButton
        text="Όλες οι δηλώσεις"
        icon={<VsSearch />}
        onClick={handleAllDeclarations} />
      <Modal size="xl" opened={isOpen()} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Δηλώσεις</ModalHeader>
            <Divider />
            <ModalBody>
              <Show when={declarations().length > 0} fallback={
                <VStack alignItems="stretch" spacing="$2">
                  <Skeleton height="30px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </VStack>
              }>
                <Table dense highlightOnHover>
                  <TableCaption>Data of all declarations</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Id</Th>
                      <Th>Αριθμός Ακίνητου</Th>
                      {/* <Th>Property Category</Th>
                      <Th>Property Description</Th>
                      <Th>Purchaser TIN</Th>
                      <Th>Seller TIN</Th>
                      <Th>Notary TIN</Th>
                      <Th>Tax</Th>
                      <Th>Payment Method</Th>
                      <Th>Seller Acceptance</Th>
                      <Th>Purchaser Acceptance</Th>
                      <Th>Contract Details</Th> */}
                      <Th>Κατάσταση</Th>
                      <Th>Επιλογές</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <For each={declarations()}>
                      {(declaration) => <Tr>
                        <Td>{declaration.id}</Td>
                        <Td>{declaration.propertyNumber}</Td>
                        {/* <Td>{declaration.propertyCategory}</Td>
                        <Td>{declaration.propertyDescription}</Td>
                        <Td>{declaration.purchaser.tin}</Td>
                        <Td>{declaration.seller.tin}</Td>
                        <Td>{declaration.notary.tin}</Td>
                        <Td>{declaration.tax}</Td>
                        <Td>{declaration.paymentMethod}</Td>
                        <Td>{declaration.sellerAcceptance ? "True" : "False"}</Td>
                        <Td>{declaration.purchaserAcceptance ? "True" : "False"}</Td>
                        <Td>{declaration.contractDetails}</Td> */}
                        <Td>{declaration.status}</Td>
                        <Td>
                          <ArrowRight id={declaration.id} />
                        </Td>
                      </Tr>}
                    </For>
                  </Tbody>
                </Table>
              </Show>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}

export default ShowAllDeclarations;