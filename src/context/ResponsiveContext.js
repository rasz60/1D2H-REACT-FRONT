const { createContext, useState, useEffect, useContext } = require("react");

const ResponsiveContext = createContext();

export function ResponsiveProvider({ children }) {
  const [cwidth, setCwidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setCwidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContext.Provider value={{ cwidth }}>
      {children}
    </ResponsiveContext.Provider>
  );
}

export const useResponsive = () => useContext(ResponsiveContext);
