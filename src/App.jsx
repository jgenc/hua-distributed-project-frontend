import { Route, Routes } from "@solidjs/router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/admin/Admin";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";

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
		</Routes>
	);
}

export default App;
