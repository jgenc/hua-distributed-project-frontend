import { Box, Button, createDisclosure, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Spacer, VStack } from "@hope-ui/solid";
import { createSignal, mergeProps } from "solid-js";
import userService from "../../../services/users";

import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-yup";
import { mixed, object, string } from "yup";
import createNotification from "../../../utils/notification";

import { accessToken } from "../../../utils/tokens";

const schema = object({
  username: string().min(3).max(30).required(),
  password: string().min(8).max(30).required(),
  tin: string().length(9).required(),
  role: mixed().oneOf(["ROLE_CITIZEN", "ROLE_NOTARY"]).required()
});

function NewUserForm(props) {
  const merged = mergeProps({ users: null, setUsers: null }, props);

  // Using Felte Forms and Yup Validator
  const { form, errors, isValid } = createForm({
    extend: validator({ schema }),
    onSubmit: async newUser => {
      setSpinner(true);
      userService.setToken(accessToken());
      const result = await userService.createUser(newUser);
      setSpinner(false);

      // if (result.name === "AxiosError") {
      //   createNotification("danger", "Σφάλμα", id.response.data.message);
      //   return;
      // }
      merged.setUsers([...merged.users(), { ...result }]);
      onClose();
      createNotification("success", "Επιτυχής Προσθήκη Χρήστη");
    }
  });

  const [spinner, setSpinner] = createSignal(false);

  const { isOpen, onOpen, onClose } = createDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Add New User</Button>
      <Modal
        closeOnOverlayClick={false}
        opened={isOpen()}
        onClose={onClose}
      >
        <ModalOverlay>
          <Box
            as="form"
            ref={form}
          >
            <ModalContent>
              <ModalCloseButton />
              <ModalHeader>Add new user</ModalHeader>
              <Divider />
              <ModalBody>
                <VStack
                  spacing="$5"
                  alignItems="stretch"
                  maxW="$96"
                  mx="auto"
                >
                  <FormControl required invalid={!!errors("username")}>
                    <FormLabel for="username">Username</FormLabel>
                    <Input
                      name="username"
                    />
                    <FormErrorMessage>{errors("username")[0]}</FormErrorMessage>
                  </FormControl>

                  <FormControl required invalid={!!errors("password")}>
                    <FormLabel for="password">Password</FormLabel>
                    <Input
                      name="password"
                      type="password"
                    />
                    <FormErrorMessage>{errors("password")[0]}</FormErrorMessage>
                  </FormControl>

                  <FormControl required invalid={!!errors("tin")}>
                    <FormLabel for="tin">TIN</FormLabel>
                    <Input
                      name="tin"
                      minLength="9"
                      maxLength="9"
                    />
                    <FormErrorMessage>{errors("tin")[0]}</FormErrorMessage>
                  </FormControl>

                  <FormControl as="fieldset" required invalid={!!errors("role")}>
                    <FormLabel for="role">Role</FormLabel>
                    <RadioGroup name="role">
                      <HStack spacing="$4">
                        <Radio value="ROLE_NOTARY">Notary</Radio>
                        <Radio value="ROLE_CITIZEN">Citizen</Radio>
                      </HStack>
                    </RadioGroup>
                    <FormErrorMessage>{errors("role")[0]}</FormErrorMessage>
                  </FormControl>

                  <HStack justifyContent="flex-end">
                  </HStack>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="success"
                  type="submit"
                  loading={spinner()}
                  disabled={!isValid()}
                >	Submit</Button>
              </ModalFooter>
            </ModalContent>
          </Box>
        </ModalOverlay>
      </Modal>
    </>
  );
}

export default NewUserForm;