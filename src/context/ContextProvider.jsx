import { useState } from "react";

// Inner imports
import Context from "./index.js";

const ContextProvider = ({ children }) => {
  const [modalElement, setModalElement] = useState(null);

  return (
    <Context.Provider
      value={{
        modalElement,
        setModalElement,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
