import { Routes, Route } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import Signup from "@compo/Signup";
import About from "@compo/about/about";
import SetUser from "@compo/SetUser";

const Main = () => {
  const { RouteGuard } = useAuth();

  return (
    <main id="main" role="main">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        <Route path="/admin" element={<RouteGuard type={2} />}>
          <Route path="/admin" element={<About />} />
        </Route>
        <Route path="/setUser" element={<RouteGuard type={1} />}>
          <Route path="/setUser" element={<SetUser />} />
        </Route>
      </Routes>
    </main>
  );
};

export default Main;
