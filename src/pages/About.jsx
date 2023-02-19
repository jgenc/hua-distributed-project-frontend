import { Anchor, Container, Heading, Icon, List, ListItem, Text, UnorderedList, VStack } from "@hope-ui/solid";

function About(props) {

  const anchorColor = "$primary9";

  return (
    <Container>
      <VStack spacing="$2" p="$5">
        <Heading level="1" size="4xl"><i>Σχετικά με την εργασία</i></Heading>
        <Text size="2xl">
          Αυτό είναι το frontend σύστημα της εργασίας των
          <b> Κατανεμημένων Συστημάτων</b>, μάθημα 3ου έτους στο Τμήμα
          Πληροφορικής και Τηλεματικής στο Χαροκόπειο Πανεπιστήμιο. Για το
          κομμάτι αυτό χρησιμοποιήθηκε το <Anchor external color={anchorColor} href="https://solidjs.com">SolidJS</Anchor>, μια βιβλιοθήκη δημιουργίας
          reactive web UI, η οποία μοιάζει αρκετά με την ReactJS. Ενώ είναι από
          μόνη της αρκετά δυνατή βιβλιοθήκη, για το DX χρησιμοποιήθηκαν διάφορα
          libraries extra, όπως to <Anchor external color={anchorColor} href="https://felte.dev">felte</Anchor>,
          <Anchor external color={anchorColor} href="https://hope-ui.com/">hope-ui</Anchor>,
          <Anchor external color={anchorColor} href="https://axios-http.com">axios</Anchor> κ.α.
          <br />
          <br />
          Το backend αλλά και η βάση δεδομένων έχουνε γίνει deployed στο Google Cloud, ενώ το frontend έχει γίνει deployed στο <Anchor external color={anchorColor} href="https://netlify.com/">Netlify</Anchor>
          <br />
          <br />
          <Heading level="2" size="3xl" paddingBottom="$2">Παραδοχές</Heading>
          <UnorderedList>
            <ListItem>Δεν έχει υλοποιηθεί τρόπος πληρωμής του φόρου, καθώς δεν έχουμε αυτή την δυνατότητα</ListItem>
          </UnorderedList>
          <br />
          <Heading level="2" size="3xl" paddingBottom="$2">Repos</Heading>
          <UnorderedList>
            <ListItem>
              <Anchor external color={anchorColor} href="https://github.com/jgenc/hua-distributed-project-backend">Backend</Anchor>
            </ListItem>
            <ListItem>
              <Anchor external color={anchorColor} href="https://github.com/jgenc/hua-distributed-project-frontend">Frontend</Anchor>
            </ListItem>
            <ListItem>
              <Anchor external color={anchorColor} href="https://github.com/jgenc/hua-distributed-project-specs">specs</Anchor>
            </ListItem>
          </UnorderedList>
        </Text>

      </VStack>
    </Container>
  );
}

export default About;