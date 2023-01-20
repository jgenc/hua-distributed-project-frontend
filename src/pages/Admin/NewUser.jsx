import { Button, createDisclosure, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, VStack } from "@hope-ui/solid";
import { createSignal, mergeProps } from "solid-js";
import userService from "../../services/users";

function NewUser(props) {
	const merged = mergeProps({ users: null, setUsers: null }, props);

	const handleNewUser = async (event) => {
		event.preventDefault();

		// TODO:
		// 			- Check for TIN, Password length, Username Length, correct role etc.
		//      - Pass data to Database
		// 			- Check if ID technique is correct

		const role = event.target.role.value;
		setNewUser({ ...newUser(), role });

		userService.setToken(JSON.parse(window.sessionStorage.getItem("userToken")).accessToken);
		const id = await userService.createUser(newUser());
		
		// TODO: Notify user for error
		if (!id) return;

		setNewUser({...newUser(), id})

		merged.setUsers([...merged.users(), newUser()]);
		onClose();
	};

	const [newUser, setNewUser] = createSignal();
	const { isOpen, onOpen, onClose } = createDisclosure();

	return (
		<>
			<Button onClick={onOpen}>Add New User</Button>
			<Modal opened={isOpen()} onClose={onClose}>
				<ModalOverlay>
					<ModalContent>
						<ModalCloseButton />
						<ModalHeader>Add new user</ModalHeader>
						<ModalBody>
							<form onSubmit={handleNewUser}>
								<VStack
									spacing="$5"
									alignItems="stretch"
									maxW="$96"
									mx="auto"
								>
									{/* TODO: Add form checks */}
									<FormControl required>
										<FormLabel for="username">Username</FormLabel>
										<Input
											id="username"
											onChange={(event) => setNewUser({ ...newUser(), username: event.target.value })}
										/>
									</FormControl>

									<FormControl required>
										<FormLabel for="password">Password</FormLabel>
										<Input
											type="password"
											id="password"
											onChange={(event) => setNewUser({ ...newUser(), password: event.target.value })}
										/>
									</FormControl>

									<FormControl required>
										<FormLabel for="tin">TIN</FormLabel>
										<Input
											id="tin"
											onChange={(event) => setNewUser({ ...newUser(), tin: event.target.value })}
										/>
									</FormControl>

									<FormControl required>
										<FormLabel for="role">Role</FormLabel>
										<RadioGroup name="role">
											<HStack spacing="$4">
												<Radio value="ROLE_NOTARY">Notary</Radio>
												<Radio value="ROLE_CITIZEN">Citizen</Radio>
											</HStack>
										</RadioGroup>
									</FormControl>

									<Button colorScheme="success" type="submit">Submit</Button>
								</VStack>
							</form>
						</ModalBody>

						<ModalFooter>
						</ModalFooter>
					</ModalContent>
				</ModalOverlay>
			</Modal>
		</>
	);
}

export default NewUser;