/* @refresh reload */
import { render } from "solid-js/web";
import { Router, hashIntegration } from "@solidjs/router";

import "./index.css";
import App from "./App";
import { HopeProvider, NotificationsProvider } from "@hope-ui/solid";
import { UserProvider } from "./store/user";

render(() =>
  <Router source={hashIntegration()}>
    <HopeProvider>
      <NotificationsProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NotificationsProvider>
    </HopeProvider>
  </Router>
  , document.getElementById("root"));
