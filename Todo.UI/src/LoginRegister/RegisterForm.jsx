import React, { useState } from "react";
import { Button, Form, Input } from "../SharedUI";
import axios from "axios";

function RegisterForm({ toggleLogin }) {
  const [state, setState] = useState({
    email: "",
    password: "",
    password_confirm: "",
    message: "",
  });

  function register(email, password) {
    return axios
      .post(process.env.REACT_APP_API + "auth/register", {
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
      <Input label="Email" name="email" state={state} setState={setState} />
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

export default RegisterForm;
