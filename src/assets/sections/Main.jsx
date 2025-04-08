import { Routes, Route } from "react-router-dom";
import Signup from "@compo/Signup";
const Main = () => {
  return (
    <main id="main" role="main">
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </main>
  );
};

export default Main;
