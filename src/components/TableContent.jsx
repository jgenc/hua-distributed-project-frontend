import userService from "../services/users";
import { mergeProps } from "solid-js";

import { Button, createDisclosure, Flex, FormControl, FormLabel, HStack, Icon, Input, Menu, MenuContent, MenuItem, MenuTrigger, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Spacer, Tag, Td, VStack } from "@hope-ui/solid";
import { CgDanger } from "solid-icons/cg";

function TableContent(props) {
	const merged = mergeProps({ user: {}, users: null, setUsers: null }, props);
	const { user } = merged;

	// ! This is ugly
	let modals = [];
	for (let i = 0; i < 4; i++) {
		const { isOpen, onOpen, onClose } = createDisclosure();
		modals.push({ isOpen, onOpen, onClose });
	}

	// ! Find a better place for this
	const deleteUser = async () => {
		userService.setToken(JSON.parse(window.sessionStorage.getItem("userToken")).accessToken);
		await userService.deleteUser(user.id);
		merged.setUsers(merged.users().filter(u => u.id !== user.id));
		// TODO: Spawn Successful Notification
	};

	const changePassword = async (event) => {
		event.preventDefault();

		const newPassword = event.target[0].value;
		const newPasswordConfirm = event.target[1].value;

		if (newPassword !== newPasswordConfirm) {
			// TODO: Spawn notification
			console.log("pwds not the same")
			return;
		}

		userService.setToken(JSON.parse(window.sessionStorage.getItem("userToken")).accessToken);
		userService.changePassword(user.id, newPassword)

		// TODO: Spawn successful notification
		
	}

	return (
		<tr>
			<Td>{user.id}</Td>
			<Td>{user.username}</Td>
			<Td>{user.tin}</Td>
			<Td>
				<Flex>
					<Tag
						size="md"
						colorScheme={user.role === "ROLE_ADMIN" ? "danger" : "primary"}
					>{user.role}</Tag>

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
								onSelect={() => modals[0].onOpen()}
								disabled={user.role === "ROLE_ADMIN"}
							>
								Διαγραφή
								<Modal opened={modals[0].isOpen()} onClose={() => modals[0].onClose()}>
									<ModalOverlay />
									<ModalContent>
										<ModalCloseButton />
										<ModalHeader>Επιβεβαίωση</ModalHeader>
										<ModalBody>
											<p>
												Είστε σίγουρος ότι θέλετε να διαγράψετε τον χρήστη <b>{user.username}</b> από το σύστημα;
											</p>
										</ModalBody>
										<ModalFooter>
											<Button colorScheme="danger" onClick={deleteUser}>Ναι</Button>
										</ModalFooter>
									</ModalContent>
								</Modal>
							</MenuItem>

							<MenuItem onSelect={() => modals[1].onOpen()}>
								Αλλαγή Username
								<Modal opened={modals[1].isOpen()} onClose={() => modals[1].onClose()}>
									<ModalOverlay />
									<ModalContent>
										<ModalCloseButton />
										<ModalHeader>Αλλαγή username</ModalHeader>
										<ModalBody>
											<form>
												<VStack spacing="$4" alignItems="stretch">
													<FormControl>
														<FormLabel>Από</FormLabel>
														<Input value={user.username} disabled />
													</FormControl>
													<FormControl required>
														<FormLabel>Σε</FormLabel>
														<Input />
													</FormControl>

													<HStack justifyContent="flex-end">
														<Button type="submit" colorScheme="success">Αλλαγή</Button>
													</HStack>
												</VStack>
											</form>
										</ModalBody>
									</ModalContent>
								</Modal>
							</MenuItem>

							<MenuItem onSelect={() => modals[2].onOpen()}>
								Αλλαγή Κωδικού
								<Modal opened={modals[2].isOpen()} onClose={() => modals[2].onClose()}>
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
							</MenuItem>

							<MenuItem onSelect={() => modals[3].onOpen()}>
								Αλλαγή Ρόλου
								<Modal opened={modals[3].isOpen()} onClose={() => modals[3].onClose()}>
									<ModalOverlay />
									<ModalContent>
										<ModalCloseButton />
										<ModalHeader>Αλλαγή Ρόλου</ModalHeader>
										<ModalBody>
											<form>
												<VStack spacing="$4" alignItems="stretch">
													<FormControl>
														<RadioGroup>
															<HStack spacing="$4">
																<Radio disabled={user.role === "ROLE_NOTARY"} value="ROLE_NOTARY">Notary</Radio>
																<Radio disabled={user.role === "ROLE_CITIZEN"} value="ROLE_CITIZEN">Citizen</Radio>
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
							</MenuItem>

						</MenuContent>
					</Menu>
				</Flex>
			</Td>
		</tr>
	);
}

export default TableContent;