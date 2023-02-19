import { Route, Routes } from "@solidjs/router";
import { lazy } from "solid-js";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
const NewDeclaration = lazy(() => import("./pages/declarations/NewDeclaration"));
const ShowAllDeclarations = lazy(() => import("./pages/declarations/ShowAllDeclarations"));
const Declaration = lazy(() => import("./pages/declarations/[id].jsx"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const NewAccount = lazy(() => import("./pages/account/NewAccount"));
const About = lazy(() => import("./pages/About"));

// ? Create a Layout component

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About}/>
        <Route path="/account">
          <Route path="/new" component={NewAccount} />
        </Route>
        <Route path="/declarations">
          <Route path="/" component={ShowAllDeclarations} />
          <Route path="/:id" component={Declaration} />
          <Route path="/new" component={NewDeclaration} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
