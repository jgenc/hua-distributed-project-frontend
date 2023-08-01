import { createSignal, mergeProps } from "solid-js";
import userService from "../../../services/users";

import { Button, Container, createDisclosure, FormControl, FormLabel, HStack, Input, Menu, MenuContent, MenuItem, MenuTrigger, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Spacer, Tag, Td, VStack } from "@hope-ui/solid";
import createNotification from "../../../utils/notification";
import { accessToken } from "../../../utils/tokens";

function TableContent(props) {
  props = mergeProps({ user: null, users: null, setUsers: null }, props);
  const [role, setRole] = createSignal(props.user.role);
  const [spinner, setSpinner] = createSignal(false);

  const modalDelete = createDisclosure();
  const modalUpdateInfo = createDisclosure();
  const modalUpdatePassword = createDisclosure();

  const deleteUser = async () => {
    setSpinner(true);
    userService.setToken(accessToken());
    await userService.deleteUser(props.user.tin);
    setSpinner(false);

    props.setUsers(props.users().filter(u => u.id !== props.user.id));
    createNotification("success", "Deleted user successfuly");
  };

  const changePassword = async (event) => {
    event.preventDefault();

    const newPassword = event.target[0].value;
    const newPasswordConfirm = event.target[1].value;


    if (newPassword !== newPasswordConfirm) {
      createNotification("danger", "Wrong confirmation password");
      return;
    }

    userService.setToken(accessToken());
    await userService.changePassword(props.user.tin, newPassword);

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
    if (newUsername === props.user.username) {
      delete updatedUser.username;
    }

    if (newTin === props.user.tin) {
      delete updatedUser.tin;
    }

    if (role() == props.user.role) {
      delete updatedUser.role;
    }

    userService.setToken(accessToken());
    const result = await userService.updateUser(props.user.tin, updatedUser);

    console.log(result);

    props.setUsers(props.users().map(
      val => val.id === props.user.id ?
        // TODO: Fix this, it's a hacky way to update the role
        ({ ...val, ...updatedUser }) :
        val
    ));
    console.log(props.users());
    createNotification("success", "Επιτυχής αλλαγή στοιχείων χρήστη");
  };

  return (
    <tr>
      <Td>{props.user.id}</Td>
      <Td>{props.user.username}</Td>
      <Td>{props.user.tin}</Td>
      <Td>{props.user.account ?
        <Tag colorScheme="success">Created</Tag> :
        <Tag colorScheme="info">Not Created</Tag>}</Td>
      <Td>
        <Container>
          <HStack spacing="$3">

            <Tag
              size="md"
              colorScheme={props.user.role === "ROLE_ADMIN" ? "danger" : "primary"}
            >{props.user.role}</Tag>

            <Spacer />

            <Menu>
              <MenuTrigger
                as={Button}
                variant="subtle"
                colorScheme="neutral"
                rightIcon=""
              >
                Options
              </MenuTrigger>
              <MenuContent>
                <MenuItem
                  colorScheme="danger"
                  onSelect={() => modalDelete.onOpen()}
                  disabled={props.user.role === "ROLE_ADMIN"}
                >
                  Delete
                </MenuItem>
                <MenuItem onSelect={() => modalUpdateInfo.onOpen()} disabled={props.user.role === "ROLE_ADMIN"}>
                  Update Details
                </MenuItem>
                <MenuItem onSelect={() => modalUpdatePassword.onOpen()}>
                  Update Password
                </MenuItem>
              </MenuContent>
            </Menu>

            {/* Hacky fix, modals under menu items will cause the children to rerender. Don't know if it's the library's error or mine */}

            <Modal opened={modalDelete.isOpen()} onClose={modalDelete.onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Confirmation</ModalHeader>
                <ModalBody>
                  <p>
                    Are you sure you want to delete user <b>{props.user.username}</b> from the system?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <HStack spacing="$4">
                    <Button colorScheme="danger" onClick={deleteUser} loading={spinner()}>Yes</Button>
                    <Button colorScheme="neutral" onClick={modalDelete.onClose} loading={spinner()}>No</Button>
                  </HStack>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Modal opened={modalUpdateInfo.isOpen()} onClose={() => modalUpdateInfo.onClose()}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />

                <ModalHeader>Update <b>{props.user.username}</b> details</ModalHeader>

                <form onSubmit={changeInformation}>
                  <ModalBody>
                    <VStack spacing="$3" alignItems="stretch">
                      <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input value={props.user.username} minLength="2" maxLength="20" />
                      </FormControl>

                      <FormControl>
                        <FormLabel>TIN</FormLabel>
                        <Input value={props.user.tin} minLength="8" maxLength="9" />
                      </FormControl>

                      <FormControl>
                        <RadioGroup name="role">
                          <HStack spacing="$3">
                            <Radio defaultChecked={role() === "ROLE_NOTARY"} value="ROLE_NOTARY" onChange={(e) => setRole(e.target.value)}>Notary</Radio>
                            <Radio defaultChecked={role() === "ROLE_CITIZEN"} value="ROLE_CITIZEN" onChange={(e) => setRole(e.target.value)}>Citizen</Radio>
                          </HStack>
                        </RadioGroup>
                      </FormControl>
                    </VStack>
                  </ModalBody>

                  <ModalFooter>
                    <HStack justifyContent="flex-end">
                      <Button type="submit" colorScheme="success">Change</Button>
                    </HStack>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>

            <Modal opened={modalUpdatePassword.isOpen()} onClose={() => modalUpdatePassword.onClose()}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />

                <ModalHeader>Update Password</ModalHeader>

                <form onSubmit={changePassword}>
                  <ModalBody>
                    <VStack spacing="$4" alignItems="stretch">
                      <FormControl required >
                        <FormLabel>New Password</FormLabel>
                        <Input type="password" minLength="8" />
                      </FormControl>
                      <FormControl required >
                        <FormLabel>Confirm Password</FormLabel>
                        <Input type="password" minLength="8" />
                      </FormControl>
                    </VStack>
                  </ModalBody>

                  <ModalFooter>
                    <HStack justifyContent="flex-end">
                      <Button type="submit" colorScheme="success">Change</Button>
                    </HStack>
                  </ModalFooter>
                </form>

              </ModalContent>
            </Modal>

          </HStack>
        </Container>
      </Td>
    </tr >
  );
}

export default TableContent;