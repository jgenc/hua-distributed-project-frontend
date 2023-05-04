import { createSignal, createContext, useContext, createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";
import loginService from "../services/login";
import accountService from "../services/account";
import { loadState, saveState } from "../utils/state";
import { accessToken, decodeToken, removeTokens } from "../utils/tokens";

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

export function UserProvider(props) {
  const [user, setUser] = createSignal(loadState());
  const userStore = [user,
    {
      async login(credentials) {
        // Fetch login token
        const loginResponse = await loginService.login(credentials);
        const tokenData = decodeToken(loginResponse.access_token);

        // failed login, create notification
        if (!tokenData) return;

        window.sessionStorage.setItem("access_token", JSON.stringify(loginResponse.access_token));
        setUser({ user: tokenData });
        saveState(user());

        // ! special admin case
        if (tokenData.admin) {
          // if (userToken.roles.includes("ROLE_ADMIN")) {
          setUser({ ...user(), account: { firstName: "Admin", lastName: "" } });
          saveState(user());
          return;
        }

        // Fetch account info if it exists
        accountService.setToken(accessToken());
        const accountToken = await accountService.getAccount(user().user.tin);
        console.log("Token from trying to access account: ", accountToken);
        if (accountToken.name === "AxiosError") {
          console.log("error on setting account token");
          return;
        }
        window.sessionStorage.setItem("account_token", JSON.stringify(accountToken));
        setUser({ ...user(), account: accountToken });
        saveState(user());
      },
      logout() {
        removeTokens();
        setUser({ user: undefined, account: undefined });
        saveState(undefined);
      },
      async setAccount(account_token) {
        // TODO: Rewrite

        if (account_token) {
          setUser({ ...user(), account: account_token });
          saveState(user());
          return;
        }

        accountService.setToken(accessToken());
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