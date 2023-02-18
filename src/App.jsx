import { Route, Routes } from "@solidjs/router";
import { lazy } from "solid-js";
import { loadState } from "./utils/state";
const NewDeclaration = lazy(() => import("./pages/declarations/NewDeclaration"));
const ShowAllDeclarations = lazy(() => import("./pages/declarations/ShowAllDeclarations"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const NewAccount = lazy(() => import("./components/NewAccount"));
const Account = lazy(() => import("./pages/Account"));

// ? Create a Layout component

function App() {
	return (
		<Routes>
			<Route path="/" component={Home} />
			<Route path="/admin" component={Admin} />
			<Route path="/login" component={Login} />
			<Route path="/account">
				<Route path="/" component={Account} />
				<Route path="/new" component={NewAccount} />
			</Route>
			<Route path="/declarations">
				<Route path="/" component={ShowAllDeclarations} />
        {/* ! This is dumb */}
				<Route path="/new" component={NewDeclaration} />
			</Route>
		</Routes>
	);
}

export default App;
