import React, { useState } from "react";
import { Button, Form, Input } from "../SharedUI";
import axios from "axios";
import { useDataStore } from "../DataStore";

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
        .get(process.env.REACT_APP_API + "auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((user) => {
          setAppState((p) => ({ ...p, user: user.data }));
        });
    });
  }

  function auth(username, password) {
    return axios
      .post(process.env.REACT_APP_API + "auth", {
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

export default LoginForm;
