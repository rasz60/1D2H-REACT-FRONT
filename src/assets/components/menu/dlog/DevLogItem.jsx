import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DevLogItemView from "./DevLogItemView";
import DevLogItemForm from "./DevLogItemForm";
const DevLogItem = () => {
  const location = useLocation();
  const [pageMode, setPageMode] = useState(null);
  useEffect(() => {
    let pageMode = "";
    if (location.pathname.includes("form")) {
      pageMode = "form";
    } else {
      pageMode = "view";
    }
    setPageMode(pageMode);
  }, []);

  return pageMode ? (
    pageMode === "view" ? (
      <DevLogItemView />
    ) : (
      <DevLogItemForm />
    )
  ) : (
    <></>
  );
};

export default DevLogItem;
