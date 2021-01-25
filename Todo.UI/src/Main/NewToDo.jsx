import React, { useState } from "react";
import { SplitButtons } from ".";
import { useDataStore } from "../DataStore";
import { Button, Form, Input } from "../SharedUI";
import { CardWrap } from "./Card";

function NewToDo() {
  const [newToDo, setNewToDo] = useState(false);
  const { addToDo, getToDos } = useDataStore();
  const [state, setState] = useState({
    title: "",
    description: "",
    isComplete: false,
  });

  return !newToDo ? (
    <div style={{ marginBottom: 10 }}>
      <Button onClick={() => setNewToDo(true)}>Add ToDo!</Button>
    </div>
  ) : (
    <CardWrap>
      <div>
        <Form>
          <Input name="title" state={state} setState={setState} />
          <Input name="description" state={state} setState={setState} />

          <SplitButtons>
            <Button
              onClick={() => {
                addToDo(state).then(() => {
                  setNewToDo(false);
                  setState({ title: "", description: "", isComplete: false });
                  getToDos();
                });
              }}
            >
              Save
            </Button>
            <Button onClick={() => setNewToDo(false)}>Cancel</Button>
          </SplitButtons>
        </Form>
      </div>
    </CardWrap>
  );
}

export default NewToDo;
