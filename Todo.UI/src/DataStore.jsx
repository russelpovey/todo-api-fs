import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

function DataStore({ children }) {
  const [state, setState] = useState({ user: null });
  return (
    <DataContext.Provider value={{ state, setState }}>
      {children}
    </DataContext.Provider>
  );
}

function useDataStore() {
  return useContext(DataContext);
}

export default DataStore;
export { useDataStore };
