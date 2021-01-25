import React, { useState } from "react";
import styled from "styled-components";
import { SplitButtons } from ".";
import { useDataStore } from "../DataStore";
import { Button, Form, Input } from "../SharedUI";

function Card(props) {
  const [state, setState] = useState(props);
  const [edit, setEdit] = useState(false);
  const { editToDo, getToDos, removeToDo } = useDataStore();
  return (
    <CardWrap>
      {!edit ? (
        <div>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
          <p>{`Complete:   ${props.isComplete ? "✔" : "❌"}`}</p>
          <SplitButtons>
            <Button onClick={() => setEdit(true)}>Edit</Button>
            <Button
              secondary
              onClick={() => removeToDo(props.id).then(getToDos)}
            >
              Delete
            </Button>
          </SplitButtons>
        </div>
      ) : (
        <div>
          <Form>
            <Input name="title" state={state} setState={setState} />
            <Input name="description" state={state} setState={setState} />
            <label>
              Is Complete:
              <input
                type={"checkbox"}
                checked={state.isComplete}
                onChange={(e) =>
                  setState((p) => ({ ...p, isComplete: e.target.checked }))
                }
              />
            </label>

            <SplitButtons>
              <Button
                onClick={() => {
                  editToDo(state).then(() => {
                    setEdit(false);
                    getToDos();
                  });
                }}
              >
                Save
              </Button>
              <Button onClick={() => setEdit(false)}>Cancel</Button>
            </SplitButtons>
          </Form>
        </div>
      )}
    </CardWrap>
  );
}

const CardWrap = styled.div`
  margin-bottom: 20px;
  box-shadow: 0 1px 1px 1px #0000003b;
  border-radius: 4px;
  padding: 10px;
`;

export { CardWrap };

export default Card;
