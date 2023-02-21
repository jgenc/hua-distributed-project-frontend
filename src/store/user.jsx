import { createSignal, createContext, useContext, createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";
import loginService from "../services/login";
import accountService from "../services/account";
import { loadState, saveState } from "../utils/state";
import tokens from "../utils/tokens";

const UserContext = createContext();

function checkTokens() {
  let result = 0;
  const userToken = window.sessionStorage.getItem("userToken");
  const accountToken = window.sessionStorage.getItem("loginToken");

  if (!accountToken) result = -1;
  if (!userToken) result = -2;
  console.log(result);
  return result;
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// 			Find better names
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export function UserProvider(props) {
  const [user, setUser] = createSignal(loadState());
  const userStore = [user,
    {
      async login(credentials) {
        // Fetch login token
        const userToken = await loginService.login(credentials);
        // failed login, create notification
        if (!userToken) return;
        window.sessionStorage.setItem("userToken", JSON.stringify(userToken));
        setUser({ ...user(), user: userToken });
        

        // ! special admin case
        if (userToken.roles.includes("ROLE_ADMIN")) {
          setUser({ ...user(), account: { firstName: "admin", lastName: "" } });
          saveState(user());
          return;
        }

        // Fetch account info if it exists
        accountService.setToken(userToken.accessToken);
        const accountToken = await accountService.getAccount(userToken.tin);
        if (accountToken.name === "AxiosError") {
          console.log("error on setting account token");
          return;
        }
        window.sessionStorage.setItem("accountToken", JSON.stringify(accountToken));
        setUser({ ...user(), account: accountToken });
        saveState(user());
      },
      logout() {
        loginService.logout();
        setUser({ user: undefined, account: undefined });
        saveState(undefined);
      },
      async setAccount() {
        accountService.setToken(tokens.userToken().accessToken);
        const accountToken = await accountService.getAccount(tokens.userToken().tin);
        console.log(accountToken);
        if (!accountToken) return;
        window.sessionStorage.setItem("accountToken", JSON.stringify(accountToken));
        setUser({ ...user(), account: accountToken });
        saveState(user());
      },
    }
  ];

  return (
    <UserContext.Provider value={userStore}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() { return useContext(UserContext); }