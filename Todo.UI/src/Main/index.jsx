import React, { useEffect } from "react";
import styled from "styled-components";
import { useDataStore } from "../DataStore";
import Card from "./Card";
import NewToDo from "./NewToDo";

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

//=========
// STYLES
//=========

const SplitButtons = styled.div`
  display: flex;
  & > button:first-child {
    margin-right: 5px;
  }
  & > button:last-child {
    margin-left: 5px;
  }
`;
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

export { SplitButtons };

export default Main;
