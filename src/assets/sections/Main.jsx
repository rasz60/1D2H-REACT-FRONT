import { Routes, Route } from "react-router-dom";
import Signup from "@compo/Signup";
import About from "@compo/about/about";
const Main = () => {
  return (
    <main id="main" role="main">
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </main>
  );
};

export default Main;
