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
      open: backdrop.type ? !isBackdrop.open : false,
      layout: backdrop.type ? backdrop.layout : "",
      result: {},
    });
  };

  return { isBackdrop, setBackdrop };
};

export default BackdropMethods;
