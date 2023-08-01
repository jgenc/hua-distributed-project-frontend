import { Button, Container, createDisclosure, Divider, HStack, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Skeleton, Spacer, Table, TableCaption, Tag, Tbody, Td, Th, Thead, Tr, VStack } from "@hope-ui/solid";
import { createSignal, For, Show } from "solid-js";
import users from "../../services/users";

import declarationsService from "../../services/declarations";
import { accessToken, accountToken } from "../../utils/tokens";
import FunctionalityButton from "../../components/FunctionalityButton";
import { VsSearch } from "solid-icons/vs";
import ArrowRight from "../../components/ArrowRight";
import createNotification from "../../utils/notification";


function ShowAllDeclarations() {
  const { isOpen, onClose, onOpen } = createDisclosure();
  const [declarations, setDeclarations] = createSignal([]);

  const isPurchaser = (purchaserTin) => { return tokens.accountToken().tin === purchaserTin; };

  const typeOfDeclaration = (purchaserTin, sellerTin, notaryTin) => {
    const tin = accountToken().tin;
    let types = [];
    if (tin === purchaserTin)
      types.push({ type: "Purchase", color: "info" });
    if (tin === sellerTin)
      types.push({ type: "Sell", color: "accent" });
    if (tin === notaryTin)
      types.push({ type: "Manage", color: "primary" });
    return types;
  };

  const handleAllDeclarations = async () => {
    declarationsService.setToken(accessToken());
    const res = await declarationsService.getDeclarations();
    console.log(res);
    if (res.name === "AxiosError") {
      createNotification("danger", "System error, please try again later");
      return;
    }
    if (res.length === 0) {
      createNotification("danger", "No declarations found");
      return;
    }
    onOpen();
    setDeclarations(res);
  };


  return (
    <>
      <FunctionalityButton
        text="See your declarations"
        icon={<VsSearch />}
        onClick={handleAllDeclarations}
      />

      <Modal size="xl" opened={isOpen()} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Δηλώσεις</ModalHeader>
            <Divider />
            <ModalBody p="$8">
              <Show when={declarations().length > 0} fallback={
                <VStack alignItems="stretch" spacing="$2">
                  <Skeleton height="30px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </VStack>
              }>
                <Table dense highlightOnHover>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Property Number</Th>
                      <Th>State</Th>
                      <Th>Type</Th>
                      <Th>Options</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <For each={declarations()}>
                      {(declaration) => <Tr>
                        {console.log(declaration)}
                        <Td>{declaration.id}</Td>
                        <Td>{declaration.property_number}</Td>
                        <Td>
                          <Tag
                            colorScheme={declaration.status === "completed" ? "success" : "warning"}
                          >
                            {declaration.status === "completed" ? "Completed" : "Pending"}
                          </Tag>
                        </Td>
                        <Td>
                          <VStack spacing="$2">
                            <For each={typeOfDeclaration(declaration.purchaser.tin, declaration.seller.tin, declaration.notary.tin)}>
                              {res =>
                                <Tag colorScheme={res.color}>{res.type}</Tag>
                              }
                            </For>
                          </VStack>
                        </Td>
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