import axios from "axios";
import { useEffect, useRef } from "react";
import Input from "../controls/input";
import { Form, useForm } from "../hooks/useForm";

const initialState = {
  emailOrUsername: "",
  password: "",
};

const LoginForm = () => {
  const { userData, handleChange } = useForm(initialState);
  const { emailOrUsername, password } = userData;
  const isValid = emailOrUsername && password ? true : false;

  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: "/user/sign-in",
      data: userData,
    });
  };

  useEffect(() => {
    document.title = "Login - Pixtas";
    ref.current.focus();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        ref={ref}
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
        isValid={isValid}
        onClick={() => console.log("I was clicked bro.")}
      />
    </Form>
  );
};

export default LoginForm;
