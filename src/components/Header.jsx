import { Button } from "@hope-ui/solid";
import { mergeProps } from "solid-js";

function Header(props) {
	const merged = mergeProps({ handleLogout: null, user: null }, props);
	return (
		<>
			<header>
				<h1>Logged in as {merged.user.username}</h1>
				<Button onClick={merged.handleLogout}>Log Out</Button>
			</header>
		</>
	);
}

export default Header;