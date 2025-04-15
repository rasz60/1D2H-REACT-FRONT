import { Routes, Route } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import Signup from "@compo/Signup";
import About from "@compo/about/about";

const Main = () => {
  const { RouteGuard } = useAuth();

  return (
    <main id="main" role="main">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        {/*-- 권한이 필요한 페이지 
          <Route path="${path}" element={<RouteGuard />}>
            <Route path="${path}" element={<${ele} />}/>
          </Route>        
        --*/}
      </Routes>
    </main>
  );
};

export default Main;
