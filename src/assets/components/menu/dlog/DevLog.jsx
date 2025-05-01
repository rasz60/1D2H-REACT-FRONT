/*-- AuthContext --*/
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import DevLogList from "@compo/menu/dlog/DevLogList";
import DevLogItem from "@compo/menu/dlog/DevLogItem";
import { useEffect } from "react";

const DevLog = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dlog") {
      navigate("/dlog/list");
    }
  }, []);

  return (
    <Routes>
      <Route path="list" element={<DevLogList />}></Route>
      <Route path="item/*" element={<DevLogItem />}></Route>
    </Routes>
  );
};

export default DevLog;
