import { createSignal, createContext, useContext, createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";
import loginService from "../services/login";
import accountService from "../services/account";
import { loadState, saveState } from "../utils/state";
import { accessToken, decodeToken, removeTokens, refreshToken } from "../utils/tokens";

// TODO: Find a better goddamn name. It is so ugly to call user().user ...

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

        // Failed login, create notification
        if (!tokenData) return;
        window.sessionStorage.setItem("access_token", JSON.stringify(loginResponse.access_token));

        // Special admin account object
        if (tokenData.admin) {
          setUser({ user: tokenData, account: { first_name: "Admin", last_name: "" } });
          saveState(user());
          return;
        }

        // Fetch account info for person
        accountService.setToken(accessToken());
        const accountToken = await accountService.getAccount(tokenData.tin);
        // FIXME: This is not handled
        console.log(`After logging in, I get this: ${accountToken}`);
        if (!accountToken) {
          console.log("404 error");
          setUser({ user: tokenData, account: undefined });
          saveState(user());
          return;
        }
        if (accountToken.name === "AxiosError") {
          if (accountToken.response.status === 404) {
            console.log("404 error");
            setUser({ user: tokenData, account: undefined });
            saveState(user());
            return;
          }
          console.log("error on setting account token");
          return;
        }
        window.sessionStorage.setItem("account_token", JSON.stringify(accountToken));
        setUser({ user: tokenData, account: accountToken });
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
          window.sessionStorage.setItem("accountToken", JSON.stringify(account_token));
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
      refreshUserTime(newToken) {
        const newTokenData = decodeToken(newToken.access_token);
        if (user().user.exp !== newTokenData.exp) {
          setUser({ ...user(), user: newTokenData });
          saveState(user());
          refreshToken(newToken.access_token);
        }
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