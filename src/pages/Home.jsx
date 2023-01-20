import { Container, Divider } from "@hope-ui/solid";
import Footer from "../components/Footer";
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