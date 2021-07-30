import axios from "axios";
import { useRef, useEffect, createRef } from "react";
import Input from "../controls/input";
import { Form, useForm } from "../hooks/useForm";

const initialState = {
  emailOrUsername: "",
  password: "",
};

const LoginForm = () => {
  const { userData, handleChange } = useForm(initialState);
  const { emailOrUsername, password } = userData;
  const childRef = createRef();
  const isValid = emailOrUsername && password;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(childRef);
    console.log(childRef.current.formRef);
    if (childRef.current.formRef.reportValidity()) {
      console.log("Come on, lets see if this works");
    }
  };

  useEffect(() => {
    document.title = "Login - Pixtas";
  }, []);

  return (
    <Form ref={childRef} onSubmit={handleSubmit}>
      <Input
        aria-label="Enter you email or username"
        aria-placeholder="Enter you email or username"
        placeholder="Enter your email or username"
        type="text"
        name="emailOrUsername"
        id="emailOrUsername"
        value={emailOrUsername}
        onChange={handleChange}
      />
      <Input
        aria-label="Enter you password"
        aria-placeholder="Enter your password"
        placeholder="Enter your password"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={handleChange}
      />

      <Input
        type="submit"
        value="LOG IN"
        className={`p-2 h-10 font-bold ${isValid ? undefined : "opacity-50"}`}
        disabled={isValid ? null : true}
        onClick={() => console.log("I was clicked bro.")}
      />
    </Form>
  );
};

export default LoginForm;
