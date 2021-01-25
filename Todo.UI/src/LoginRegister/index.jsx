import React, { useState } from "react";
import styled from "styled-components";
import { useDataStore } from "../DataStore";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function Login() {
  const [login, setLogin] = useState(false);
  const {
    state: { message },
  } = useDataStore();

  function toggleLogin() {
    return setLogin((p) => !p);
  }

  return (
    <LoginContainer>
      <LoginBox>
        {message.length > 0 ? <span className="error">{message}</span> : null}
        {!login ? (
          <LoginForm toggleLogin={toggleLogin} />
        ) : (
          <RegisterForm toggleLogin={toggleLogin} />
        )}
      </LoginBox>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: grey;
  --stripe: #cfd8dc;
  --bg: #e1e1e1;

  background: linear-gradient(135deg, var(--bg) 25%, transparent 25%) -50px 0,
    linear-gradient(225deg, var(--bg) 25%, transparent 25%) -50px 0,
    linear-gradient(315deg, var(--bg) 25%, transparent 25%),
    linear-gradient(45deg, var(--bg) 25%, transparent 25%);
  background-size: 100px 100px;
  background-color: var(--stripe);
`;
const LoginBox = styled.div`
  background: white;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 1px 1px 1px #00000038;
  span.error {
    color: red;
    font-weight: bold;
    text-align: center;
    display: block;
  }
`;

export default Login;
