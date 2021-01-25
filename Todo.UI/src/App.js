import "./App.css";
import styled from "styled-components";
import { createContext, useState } from "react";
import axios from "axios";
import { useDataStore } from "./DataStore";

function App() {
  const { state } = useDataStore();

  return state.user ? <Main /> : <Login />;
}

function Login() {
  const [login, setLogin] = useState(false);
  const [message, seMessage] = useState("");

  function toggleLogin() {
    console.log("SWAP: ", login);
    return setLogin((p) => !p);
  }

  return (
    <LoginContainer>
      <LoginBox>
        {login ? (
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
  const { setState: setAppState } = useDataStore();

  function login(username, password) {
    return auth(username, password);
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
          setAppState((p) => ({ ...p, user: { username } }));
          console.log({ response });
        },
        (error) => {
          setState((p) => ({
            ...p,
            message:
              "There was an error, please ensure you have the right details registered",
          }));
          console.log({ error, msg: error.response.data });
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
    console.log("Attempting to register: ", email, password);
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
          console.log({ response });
        },
        (error) => {
          const message = error.response.data;
          setState((p) => ({ ...p, message }));
          console.log({ error, msg: error.response.data });
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

function Input({
  name,
  type = "text",
  label,
  state,
  value,
  setState,
  onChange,
}) {
  return (
    <Label>
      {label}
      <input
        value={state ? state[name] : value}
        name={name}
        type={type}
        autoComplete={false}
        onChange={
          onChange
            ? onChange
            : (e) => setState((p) => ({ ...p, [name]: e.target.value }))
        }
      />
    </Label>
  );
}

const Label = styled.label`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  input {
    padding: 10px;
    border-radius: 4px;
    border: none;
    box-shadow: 0 1px 1px 1px #00000038;
  }
`;
const Button = styled.button`
  border-radius: 4px;
  background: blue;
  color: white;
  cursor: pointer;
  width: 100%;
  border: none;
  padding: 10px;
  transition: 0.2s all ease-in-out;
  &:disabled {
    cursor: not-allowed;
    filter: grayscale(1);
  }
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
  .error {
    color: red;
  }
  .link {
    cursor: pointer;
    transition: 0.2s all ease-in-out;
    &:hover {
      /* transform: translateY(-2px); */
    }
  }
`;
const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginBox = styled.div`
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 1px 1px 1px #00000038;
`;

function Main() {
  return <MainContainer>Main</MainContainer>;
}

const MainContainer = styled.div``;
const Container = styled.div``;

export default App;
