import { Button, Center, Container, FormControl, FormLabel, Heading, HStack, Input, Select, SelectContent, SelectIcon, SelectListbox, SelectOption, SelectOptionIndicator, SelectOptionText, SelectPlaceholder, SelectTrigger, SelectValue, VStack } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import DoySelect from "../components/DoySelect";
import accountService from "../services/account";

// ? Maybe rename Account component to AccountForm or something
function Account(props) {
	const navigate = useNavigate();

	onMount(() => {
		// See if user is logged In
		// Check if token corresponds to an account
		// If it exists, redirect user to Home
		// If it does not, proceed to Account Creation

		const userToken = JSON.parse(window.sessionStorage.getItem("userToken"));
		// if (!userToken) {
		// User not logged in
		// navigate("/");
		// return;
		// }
		if (userToken.roles.includes("ROLE_ADMIN")) {
			// Admin cannot create an account
			navigate("/");
			return;
		}
		// I assume that the backend CANNOT create a user with a role other than:
		// ROLE_NOTARY or ROLE_CITIZEN

	});

	const handleForm = async (event) => {
		event.preventDefault();

		const newAccountObject = {
			firstName: event.target[0].value,
			lastName: event.target[1].value,
			address: event.target[2].value,
			// Special case for this one, it is not an input but a button
			doy: event.target[3].innerText,
		};

		accountService.setToken(JSON.parse(window.sessionStorage.getItem("userToken")).accessToken);
		await accountService.newAccount(newAccountObject);

		// TODO: notification
		navigate("/");
	};

	// !!!!!!!!!!!!!!!!!!!
	// TODO: Should check if CITIZEN or NOTARY is creating an account. Different approach
	// !!!!!!!!!!!!!!!!!!!

	return (
		<Center h="$xl">
			<Container centerContent>
				<VStack spacing="$5">
					<form onSubmit={handleForm}>
						<VStack
							spacing="$5"
							alignItems="stretch"
							borderWidth="1px"
							borderColor="$neutral6"
							borderRadius="$lg"
							p="$5"
						>
							<Heading size="3xl">Δημιουργία Λογαριασμού</Heading>

							<FormControl required>
								<FormLabel for="firstName">Όνομα</FormLabel>
								<Input
									id="firstName"
								/>
							</FormControl>

							<FormControl required>
								<FormLabel for="lastName">Επίθετο</FormLabel>
								<Input
									id="lastName"
								/>
							</FormControl>

							<FormControl required>
								<FormLabel for="address">Διεύθυνση</FormLabel>
								<Input
									id="address"
								/>
							</FormControl>

							<FormControl required>
								<FormLabel for="address">ΔΟΥ</FormLabel>
								<DoySelect />
							</FormControl>

							<HStack justifyContent="flex-end">
								<Button type="submit" colorScheme="success">Δημιουργία</Button>
							</HStack>
						</VStack>
					</form>
				</VStack>
			</Container>
		</Center>
	);
}

export default Account;