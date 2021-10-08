import React, { createContext, useContext, useEffect, useReducer } from "react";
import { set as setToLocalStorage } from "local-storage";

import { TState, initialState } from "./initialState";
import { TAction } from "./actions";
import { reducer } from "./reducer";

const AppContext = createContext<{
  state: TState;
  dispatch: React.Dispatch<TAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect((): void => {
    setToLocalStorage<TState>("state", state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useStore = () => useContext(AppContext);

export { AppContext, AppProvider, useStore };
