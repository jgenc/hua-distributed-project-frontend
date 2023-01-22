import { Container } from "@hope-ui/solid";
import Navbar from "../components/Navbar";

function Home(props) {
	return (
		<>
			<Navbar />

			<Container p="$4">
				<p>
					Καλωσήρθατε στο Σύστημα Υποβολής Φόρου Μεταβίβασης
				</p>
			</Container>

			{/* Footer */}
		</>
	);
}

export default Home;