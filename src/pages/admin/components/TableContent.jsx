import { createSignal, mergeProps } from "solid-js";
import userService from "../../../services/users";

import { Button, Container, createDisclosure, Flex, FormControl, FormLabel, HStack, Input, Menu, MenuContent, MenuItem, MenuTrigger, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Spacer, Tag, Td, VStack } from "@hope-ui/solid";
import createNotification from "../../../utils/notification";
import { accessToken } from "../../../utils/tokens";

function TableContent(props) {
  const merged = mergeProps({ user: null, users: null, setUsers: null }, props);
  const [role, setRole] = createSignal(merged.user.role || merged.user.role.name);
  const [spinner, setSpinner] = createSignal(false);

  const modalDelete = createDisclosure();
  const modalUpdateInfo = createDisclosure();
  const modalUpdatePassword = createDisclosure();

  // ! Find a better place for handlers and fix the seira
  const deleteUser = async () => {
    setSpinner(true);
    userService.setToken(accessToken());
    await userService.deleteUser(merged.user.tin);
    setSpinner(false);
    merged.setUsers(merged.users().filter(u => u.id !== merged.user.id));
    createNotification("success", "Διαγραφή Χρήστη Επιτυχής!");
  };

  const changePassword = async (event) => {
    event.preventDefault();

    const newPassword = event.target[0].value;
    const newPasswordConfirm = event.target[1].value;


    if (newPassword !== newPasswordConfirm) {
      // TODO: Spawn notification
      console.log("pwds not the same");
      return;
    }

    userService.setToken(accessToken());
    await userService.changePassword(merged.user.tin, newPassword);

    modalUpdatePassword.onClose();
  };

  const changeInformation = async (event) => {
    event.preventDefault();

    const newUsername = event.target[0].value;
    const newTin = event.target[1].value;

    // TODO: Form VALIDATION 

    const updatedUser = {
      username: newUsername,
      tin: newTin,
      role: role()
    };

    // Check if values have changed
    if (newUsername === merged.user.username) {
      delete updatedUser.username;
    }

    if (newTin === merged.user.tin) {
      delete updatedUser.tin;
    }

    if (role() == merged.user.role) {
      delete updatedUser.role;
    }

    userService.setToken(accessToken());
    const result = await userService.updateUser(merged.user.tin, updatedUser);

    console.log(result);

    merged.setUsers(merged.users().map(
      val => val.id === merged.user.id ?
        ({ ...val, ...updatedUser}) :
        val
    ));
    console.log(merged.users())
    createNotification("success", "Επιτυχής αλλαγή στοιχείων χρήστη");
  };

  return (
    <tr>
      <Td>{merged.user.id}</Td>
      <Td>{merged.user.username}</Td>
      <Td>{merged.user.tin}</Td>
      <Td>
        <Container>
          <HStack spacing="$3">

            <Tag
              size="md"
              colorScheme={merged.user.role.name === "ROLE_ADMIN" ? "danger" : "primary"}
            >{merged.user.role.name}</Tag>

            <Spacer />

            <Menu>
              <MenuTrigger
                as={Button}
                variant="subtle"
                colorScheme="neutral"
                rightIcon=""
              >
                Επιλογές
              </MenuTrigger>
              <MenuContent>
                <MenuItem
                  colorScheme="danger"
                  onSelect={() => modalDelete.onOpen()}
                  disabled={merged.user.role.name === "ROLE_ADMIN"}
                >
                  Διαγραφή
                </MenuItem>
                <MenuItem onSelect={() => modalUpdateInfo.onOpen()} disabled={merged.user.role.name === "ROLE_ADMIN"}>
                  Αλλαγή Στοιχείων
                </MenuItem>
                <MenuItem onSelect={() => modalUpdatePassword.onOpen()}>
                  Αλλαγή Κωδικού
                </MenuItem>
              </MenuContent>
            </Menu>

            {/* Hacky fix, modals under menu items will cause the children to rerender. Don't know if it's the library's error or mine */}

            <Modal opened={modalDelete.isOpen()} onClose={modalDelete.onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Επιβεβαίωση</ModalHeader>
                <ModalBody>
                  <p>
                    Είστε σίγουρος ότι θέλετε να διαγράψετε τον χρήστη <b>{merged.user.username}</b> από το σύστημα;
                  </p>
                </ModalBody>
                <ModalFooter>
                  <HStack spacing="$4">
                    <Button colorScheme="danger" onClick={deleteUser} loading={spinner()}>Ναι</Button>
                  </HStack>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Modal opened={modalUpdateInfo.isOpen()} onClose={() => modalUpdateInfo.onClose()}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Αλλαγή Στοιχείων Χρήστη <b>{merged.user.username}</b></ModalHeader>
                <ModalBody>
                  <form onSubmit={changeInformation}>
                    <VStack spacing="$3" alignItems="stretch">
                      <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input value={merged.user.username} minLength="2" maxLength="20" />
                      </FormControl>

                      <FormControl>
                        <FormLabel>TIN</FormLabel>
                        <Input value={merged.user.tin} minLength="8" maxLength="9" />
                      </FormControl>

                      <FormControl>
                        <RadioGroup name="role">
                          <HStack spacing="$3">
                            <Radio defaultChecked={role() === "ROLE_NOTARY"} value="ROLE_NOTARY" onChange={(e) => setRole(e.target.value)}>Notary</Radio>
                            <Radio defaultChecked={role() === "ROLE_CITIZEN"} value="ROLE_CITIZEN" onChange={(e) => setRole(e.target.value)}>Citizen</Radio>
                          </HStack>
                        </RadioGroup>
                      </FormControl>

                      <HStack justifyContent="flex-end">
                        <Button type="submit" colorScheme="success">Αλλαγή</Button>
                      </HStack>
                    </VStack>
                  </form>
                </ModalBody>
              </ModalContent>
            </Modal>

            <Modal opened={modalUpdatePassword.isOpen()} onClose={() => modalUpdatePassword.onClose()}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Αλλαγή Κωδικού</ModalHeader>
                <ModalBody>
                  <form onSubmit={changePassword}>
                    <VStack spacing="$4" alignItems="stretch">
                      <FormControl required >
                        <FormLabel>Καινούριος Κωδικός</FormLabel>
                        <Input type="password" minLength="8" />
                      </FormControl>
                      <FormControl required >
                        <FormLabel>Επαλήθευση Κωδικού</FormLabel>
                        <Input type="password" minLength="8" />
                      </FormControl>

                      <HStack justifyContent="flex-end">
                        <Button type="submit" colorScheme="success">Αλλαγή</Button>
                      </HStack>
                    </VStack>
                  </form>
                </ModalBody>
              </ModalContent>
            </Modal>

          </HStack>
        </Container>
      </Td>
    </tr >
  );
}

export default TableContent;