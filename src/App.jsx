import { Route, Routes } from "@solidjs/router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/admin/Admin";
import NewAccount from "./components/NewAccount";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";

// ? Create a Layout component

function App() {
	return (
		<Routes>
			{/* Below is a test */}
			<Route path="*" component={Navbar} />
			<Route path="/" component={Home} />
			<Route path="/admin" component={Admin} />
			<Route path="/login" component={Login} />
			<Route path="/account" component={Account} />
			<Route path="/account/new" component={NewAccount} />
		</Routes>
	);
}

export default App;
