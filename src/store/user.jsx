import { createSignal, createContext, useContext } from "solid-js";
import loginService from "../services/login";
import accountService from "../services/account";

const UserContext = createContext();

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// 			Find better names
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export function UserProvider(props) {
	const [user, setUser] = createSignal(null);
	const userStore = [user,
		{
			async login(credentials) {
				// Fetch login token
				const userToken = await loginService.login(credentials);
				if (!userToken) return;
				window.sessionStorage.setItem("userToken", JSON.stringify(userToken));
				setUser({ user: userToken });

				// special admin case
				if (userToken.roles.includes("ROLE_ADMIN")) {
					setUser({ ...user(), account: { firstName: "admin", lastName: "admin" } });
					return;
				}

				// Fetch account info if it exists
				accountService.setToken(userToken.accessToken);
				const accountToken = await accountService.getAccount(userToken.tin);
				if (!accountToken) return;
				window.sessionStorage.setItem("accountToken", JSON.stringify(accountToken));
				setUser({ ...user(), account: accountToken });
			},
			logout() {
				loginService.logout();
				setUser(null);
			},
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			// This was used in the place of a more standard approach, Redux. 
			// Maybe I will implement state management using redux later.
			checkAndSet() {
				if (user()) return;

				const userToken = JSON.parse(window.sessionStorage.getItem("userToken"));
				const accountToken = JSON.parse(window.sessionStorage.getItem("accountToken"));

				if (!userToken) return;
				if (userToken.roles.includes("ROLE_ADMIN")) {
					setUser({ user: userToken, account: { firstName: "admin", lastName: "admin" } });
					return;
				}
				if (!accountToken) return;
				setUser({ user: userToken, account: accountToken });
			}
		}
	];

	return (
		<UserContext.Provider value={userStore}>
			{props.children}
		</UserContext.Provider>
	);
}

export function useUser() { return useContext(UserContext); }