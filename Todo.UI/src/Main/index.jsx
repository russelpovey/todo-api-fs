import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDataStore } from "../DataStore";
import { Button, Form, Input } from "../SharedUI";

function Main() {
  const { state, setState, getToDos } = useDataStore();
  useEffect(getToDos, []);
  return (
    <Container>
      <Header>
        ToDo!{" "}
        <span onClick={() => setState((p) => ({ ...p, user: null }))}>
          Sign Out
        </span>
      </Header>
      <Body>
        <NewToDo />
        {state.todos.map((c) => (
          <Card key={c.id} {...c} />
        ))}
      </Body>
    </Container>
  );
}
function NewToDo() {
  const [newToDo, setNewToDo] = useState(false);
  const { addToDo, getToDos } = useDataStore();
  const [state, setState] = useState({
    title: "",
    description: "",
    isComplete: false,
  });

  return !newToDo ? (
    <div>
      <Button onClick={() => setNewToDo(true)}>Add ToDo!</Button>
    </div>
  ) : (
    <CardWrap>
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

          <div>
            <Button
              onClick={() => {
                console.log("SAVING: ", state);
                addToDo(state).then(() => {
                  setNewToDo(false);
                  getToDos();
                });
              }}
            >
              Save
            </Button>
            <Button onClick={() => setNewToDo(false)}>Cancel</Button>
            <Button onClick={() => setNewToDo(false)}>Save</Button>
          </div>
        </Form>
      </div>
    </CardWrap>
  );
}

function Card(props) {
  const [state, setState] = useState(props);
  const [edit, setEdit] = useState(false);
  const { editToDo, getToDos } = useDataStore();
  const visible = edit ? state : props;
  console.log("CARD: ", state);
  console.log("CARD comp: ", props.isComplete);
  return (
    <CardWrap>
      {!edit ? (
        <div>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
          <p>{`Complete:   ${props.isComplete ? "✔" : "❌"}`}</p>
          <Button onClick={() => setEdit(true)}>Edit</Button>
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

            <div>
              <Button
                onClick={() => {
                  console.log("SAVING: ", state);
                  editToDo(state).then(() => {
                    setEdit(false);
                    getToDos();
                  });
                }}
              >
                Save
              </Button>
              <Button onClick={() => setEdit(false)}>Cancel</Button>
            </div>
          </Form>
        </div>
      )}
    </CardWrap>
  );
}

const Container = styled.div`
  width: 100vw;
  overflow-x: hidden;
`;
const Header = styled.div`
  background: grey;
  padding: 20px;
  text-align: center;
  color: white;
  font-size: 26px;
  font-weight: bold;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: white;
    font-size: 12px;
    font-weight: 300;
    cursor: pointer;
    margin-right: 50px;
  }
`;
const Body = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

const CardWrap = styled.div`
  border: 1px solid black;
`;

export default Main;
