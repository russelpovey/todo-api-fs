import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

function DataStore({ children }) {
  const [state, setState] = useState({
    user: null,
    token: null,
    message: "",
    todos: [
      {
        type: "string",
        title: "string",
        status: 0,
        detail: "string",
        instance: "string",
      },
    ],
  });

  function expireSession() {
    setState((p) => ({
      ...p,
      user: null,
      token: null,
      message: "Please login again, session expired",
    }));
  }

  function getToDos() {
    return axios
      .get(process.env.REACT_APP_API + "todos", {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((res) => {
        setState((p) => ({ ...p, todos: res.data }));
      });
  }

  function getConfig() {
    return { headers: { Authorization: `Bearer ${state.token}` } };
  }

  function addToDo({ title, description, isComplete = false }) {
    return axios.post(
      process.env.REACT_APP_API + "todos",
      {
        title,
        description,
        isComplete,
      },
      getConfig()
    );
  }

  function removeToDo(id) {
    return axios.delete(`http://localhost:5000/api/todos/${id}`, getConfig());
  }

  function editToDo(todo) {
    return axios.put(
      process.env.REACT_APP_API + "todos/" + todo.id,
      todo,
      getConfig()
    );
  }

  return (
    <DataContext.Provider
      value={{
        state,
        setState,
        getToDos,
        addToDo,
        editToDo,
        expireSession,
        removeToDo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useDataStore() {
  return useContext(DataContext);
}

export default DataStore;
export { useDataStore };
