
import React from "react";

export const makeStore = (reducer, initialState) => {
  const StoreContext = React.createContext();
  const DispatchContext = React.createContext();

  const StoreProvider = ({children}) => {
    const [store, dispatch] = React.useReducer(reducer, initialState);

    return(
      <DispatchContext.Provider value={dispatch}> 
        <StoreContext.Provider value={store}>
          {children}
        </StoreContext.Provider>
      </DispatchContext.Provider>
    )
  };

  const useStore = () => React.useContext(StoreContext);
  const useDispatch = () => React.useContext(DispatchContext);

  return [StoreProvider, useStore, useDispatch];
}
