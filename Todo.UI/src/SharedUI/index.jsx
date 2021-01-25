import React from "react";
import styled from "styled-components";

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
      {!label ? name : label}
      <input
        value={state ? state[name] : value}
        name={name}
        type={type}
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
  text-transform: capitalize;
  input {
    padding: 10px;
    border-radius: 4px;
    border: none;
    box-shadow: 0 1px 1px 1px #00000038;
  }
`;
const Button = styled.button`
  border-radius: 4px;
  background: ${({ secondary }) => (secondary ? "#f44336" : "#009688")};
  box-shadow: 0 1px 1px 1px #00000040;
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

export { Input, Form, Button };
