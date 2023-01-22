import { Select, SelectContent, SelectIcon, SelectListbox, SelectOption, SelectOptionIndicator, SelectOptionText, SelectPlaceholder, SelectTrigger, SelectValue, SimpleOption, SimpleSelect } from "@hope-ui/solid";
import { For } from "solid-js";
function DoySelect(props) {

	const doy = [
		"ΑΘΗΝΩΝ Α'",
		"ΑΘΗΝΩΝ Δ'",
		"ΑΓ. ΔΗΜΗΤΡΙΟΥ",
		"ΚΑΛΛΙΘΕΑΣ Α'",
		"ΝΕΑΣ ΙΩΝΙΑΣ",
		"ΝΕΑΣ ΣΜΥΡΝΗΣ",
		"ΧΑΛΑΝΔΡΙΟΥ",
		"ΑΜΑΡΟΥΣΙΟΥ",
		"ΑΙΓΑΛΕΩ",
		"ΠΕΡΙΣΤΕΡΙΟΥ Α'",
		"ΒΥΡΩΝΑ",
		"ΠΕΙΡΑΙΑ Α'",
		"ΒΟΛΟΥ Α'",
		"ΘΕΣΣΑΛΟΝΙΚΗΣ Α'",
	];

	return (
		// <Select>
		// 	<SelectTrigger>
		// 		<SelectPlaceholder>Διάλεξε ΔΟΥ</SelectPlaceholder>
		// 		<SelectValue />
		// 		<SelectIcon />
		// 	</SelectTrigger>
		// 	<SelectContent>
		// 		<SelectListbox>
		// 			<For each={doy}>
		// 				{item => (
		// 					<SelectOption value={item}>
		// 						<SelectOptionText>{item}</SelectOptionText>
		// 						<SelectOptionIndicator />
		// 					</SelectOption>
		// 				)}
		// 			</For>
		// 		</SelectListbox>
		// 	</SelectContent>
		// </Select>
		<SimpleSelect placeholder="Διάλεξε ΔΟΥ">
			<For each={doy}>
				{item => <SimpleOption value={item}>{item}</SimpleOption>}
			</For>
		</SimpleSelect>
	);
}

export default DoySelect;