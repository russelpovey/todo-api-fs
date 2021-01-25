import React from "react";
import styled from "styled-components";
import { useDataStore } from "../DataStore";
function Main() {
  const { setState } = useDataStore();
  return (
    <Container>
      <Header>
        ToDo!{" "}
        <span onClick={() => setState((p) => ({ ...p, user: null }))}>
          Sign Out
        </span>
      </Header>
    </Container>
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

export default Main;
