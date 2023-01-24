/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import "./index.css";
import App from "./App";
import { HopeProvider } from "@hope-ui/solid";
import { UserProvider } from "./store/user";

render(() =>
	<Router>
		<HopeProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</HopeProvider>
	</Router>
	, document.getElementById("root"));
