import { createResource, createSignal, For, onMount, Show } from "solid-js";
import axios from "axios";
import helper from "./utils/helper";
import Admin from "./pages/Admin/AdminPage";
import Navbar from "./components/Navbar";
import { Container } from "@hope-ui/solid";
import { Route, Routes } from "@solidjs/router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Help from "./pages/Help";

function App() {
	const [user, setUser] = createSignal(null);

	const checkSessionUser = () => {
		const sessionUser = JSON.parse(window.sessionStorage.getItem("userToken"));
		if (!sessionUser) return;
		setUser(sessionUser);
	};

	return (
		<Routes>
			<Route path="/admin" component={Admin} />
			<Route path="/help" component={Help} />
			<Route path="/login" component={Login} />
			<Route path="/" component={Home} />
		</Routes>
	);
}

export default App;
