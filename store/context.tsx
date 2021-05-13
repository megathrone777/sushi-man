import React, { createContext, useReducer } from "react";

import { TAction } from "./actions";
import { initialState, TState } from "./initialState";
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

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
