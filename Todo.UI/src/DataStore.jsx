import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

function DataStore({ children }) {
  const [state, setState] = useState({
    user: null,
    token: null,
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

  console.log(state);
  function logOut() {
    setState((p) => ({ ...p, user: null, token: null }));
  }

  function getToDos() {
    return axios
      .get("http://localhost:5000/api/todos", {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((res) => {
        setState((p) => ({ ...p, todos: res.data }));
        console.log({ res });
      });
  }

  function getConfig() {
    return { headers: { Authorization: `Bearer ${state.token}` } };
  }

  function addToDo({ title, description, isComplete = false }) {
    return axios.post(
      "http://localhost:5000/api/todos",
      {
        title,
        description,
        isComplete,
      },
      getConfig()
    );
  }

  function removeToDo() {}

  function editToDo(todo) {
    return axios.put(
      "http://localhost:5000/api/todos/" + todo.id,
      todo,
      getConfig()
    );
  }

  return (
    <DataContext.Provider
      value={{ state, setState, getToDos, addToDo, editToDo }}
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
