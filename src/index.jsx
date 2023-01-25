/* @refresh reload */
import { render } from "solid-js/web";
import { Router, hashIntegration } from "@solidjs/router";

import "./index.css";
import App from "./App";
import { HopeProvider } from "@hope-ui/solid";
import { UserProvider } from "./store/user";

render(() =>
	<Router source={hashIntegration()}>
		<HopeProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</HopeProvider>
	</Router>
	, document.getElementById("root"));
