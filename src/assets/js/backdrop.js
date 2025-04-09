import { useState } from "react";

const BackdropMethods = () => {
  const [isBackdrop, setIsBackdrop] = useState({
    open: false,
    type: "",
    result: {},
  });

  const setBackdrop = (backdrop) => {
    setIsBackdrop({
      ...isBackdrop,
      open: backdrop.type,
      layout: backdrop.type ? backdrop.layout : "",
      fullH: backdrop.layout !== "login" && backdrop.layout !== "menu",
      result: {},
    });
  };

  return { isBackdrop, setBackdrop };
};

export default BackdropMethods;
