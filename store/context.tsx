import React from "react";
import { PersistentContextProvider } from "react-persist-context";

import { initialState } from "./initialState";
import { reducer } from "./reducer";

const AppProvider: React.FC = ({ children }) => (
  <PersistentContextProvider store={{ state: initialState, reducer }}>
    {children}
  </PersistentContextProvider>
);

export { AppProvider };
