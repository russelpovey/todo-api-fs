import React, { useState } from "react";
import styled from "styled-components";
import { useDataStore } from "../DataStore";
import { Button, Form, Input } from "../SharedUI";
import axios from "axios";

function Login() {
  const [login, setLogin] = useState(false);

  function toggleLogin() {
    return setLogin((p) => !p);
  }

  return (
    <LoginContainer>
      <LoginBox>
        {!login ? (
          <LoginForm toggleLogin={toggleLogin} />
        ) : (
          <RegisterForm toggleLogin={toggleLogin} />
        )}
      </LoginBox>
    </LoginContainer>
  );
}
function LoginForm({ toggleLogin }) {
  const [state, setState] = useState({
    username: "",
    password: "",
    message: "",
  });
  const { setState: setAppState, expireSession } = useDataStore();

  function login(username, password) {
    return auth(username, password).then((token) => {
      setAppState((p) => ({ ...p, token }));
      return axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((user) => {
          setAppState((p) => ({ ...p, user: user.data }));
        });
    });
  }

  function auth(username, password) {
    return axios
      .post("http://localhost:5000/api/auth", {
        email: username,
        username,
        password,
      })
      .then(
        (response) => {
          // success
          const token = response.data.token;
          setTimeout(expireSession, 900000);
          return token;
        },
        (error) => {
          setState((p) => ({
            ...p,
            message:
              "There was an error, please ensure you have the right details registered",
          }));
        }
      );
  }

  return (
    <Form>
      <h2>Login</h2>
      {state.message.length > 0 ? (
        <span className="error" onClick={toggleLogin}>
          {state.message}
        </span>
      ) : null}
      <Input
        label="Username"
        name="username"
        state={state}
        setState={setState}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        state={state}
        setState={setState}
      />
      <Button
        onClick={() => login(state.username, state.password)}
        disabled={state.username.length < 3 || state.password.length < 3}
      >
        Login
      </Button>
      <span onClick={toggleLogin} className="link">
        New here? - register now!
      </span>
    </Form>
  );
}

function RegisterForm({ toggleLogin }) {
  const [state, setState] = useState({
    email: "",
    password: "",
    password_confirm: "",
    message: "",
  });

  function register(email, password) {
    return axios
      .post("http://localhost:5000/api/auth/register", {
        email,
        username: email,
        password,
      })
      .then(
        (response) => {
          // success
          toggleLogin();
        },
        (error) => {
          const message = error.response.data;
          setState((p) => ({ ...p, message }));
        }
      );
  }
  return (
    <Form>
      <h2>Register</h2>
      <Input label="email" name="email" state={state} setState={setState} />
      <Input
        label="Password"
        name="password"
        type="password"
        state={state}
        setState={setState}
      />

      <Input
        label="Confirm Password"
        name="password_confirm"
        type="password"
        state={state}
        setState={setState}
      />
      {state.message.length > 0 ? (
        <span className="error" onClick={toggleLogin}>
          {state.message}
        </span>
      ) : null}
      <Button
        onClick={() => {
          setState((p) => ({ ...p, message: "" }));
          register(state.email, state.password);
        }}
        disabled={
          state.password !== state.password_confirm ||
          state.password.length < 3 ||
          state.email.length < 3
        }
      >
        Register
      </Button>
      <span className="link" onClick={toggleLogin}>
        Already registered? - Login!
      </span>
    </Form>
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
`;

export default Login;
