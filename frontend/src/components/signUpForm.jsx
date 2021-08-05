import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Input from "../controls/input";
import { Form, useForm } from "../hooks/useForm";

const initialState = {
  fullName: "",
  username: "",
  email: "",
  password: "",
};

const SignUpForm = () => {
  const { userData, handleChange } = useForm(initialState);
  const [errorMessage, setErrorMessage] = useState({});
  const { fullName, username, email, password } = userData;
  const isValid = fullName && username && email && password ? true : false;
  const errorMessages = {
    fullName: "*invalid full name",
    username: "*username must contain only alphabets, numbers.",
    email: "*invalid email format",
    password: `*password must be at least 6 characters long. Currently at ${password.length}.`,
  };
  const fullNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validInput =
      validateFullName(fullName) &&
      validateUsername(username) &&
      validateEmail(email) &&
      validatePassword(password);

    if (validInput) {
      setErrorMessage({});
      console.log(userData);
      axios({
        method: "POST",
        url: "/api/user/sign-up",
        data: userData,
      });
    }
  };

  function validateFullName(fullName) {
    const trimmedFullname = fullName.trim();
    const validFullname = RegExp(
      /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/i
    );
    if (validFullname.test(trimmedFullname)) return true;

    setErrorMessage({ fullName: errorMessages.fullName });
    fullNameRef.current.focus();
    return false;
  }

  function validateUsername(username) {
    const validUsername = /^[a-z0-9_]+$/i;
    if (username.trim().match(validUsername)) return true;

    setErrorMessage({ username: errorMessages.username });
    fullNameRef.current.focus();
    return false;
  }

  function validateEmail(email) {
    const validEmail = RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-z0-9-]+)*$/
    );
    if (validEmail.test(email)) return true;

    setErrorMessage({ email: errorMessages.email });
    emailRef.current.focus();
    return false;
  }

  function validatePassword(password) {
    if (password.length >= 6) return true;

    setErrorMessage({ password: errorMessages.password });
    passwordRef.current.focus();
    return false;
  }

  useEffect(() => {
    document.title = "Sign up - Pixta";

    fullNameRef.current.focus();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessage && (
        <p className="flex justify-center text-center text-red-500">
          {Object.values(errorMessage)[0]}
        </p>
      )}
      <div className="form-group">
        <Input
          ref={fullNameRef}
          error={Object.keys(errorMessage)[0]}
          aria-label="Enter your full name"
          aria-placeholder="Enter your full name"
          placeholder="Full name"
          type="text"
          name="fullName"
          id="fullName"
          value={fullName}
          onChange={handleChange}
        />
        <Input
          ref={usernameRef}
          error={Object.keys(errorMessage)[0]}
          aria-label="Enter your username"
          aria-placeholder="Enter your username"
          placeholder="Username"
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleChange}
        />
        <Input
          ref={emailRef}
          error={Object.keys(errorMessage)[0]}
          aria-label="Enter you email"
          aria-placeholder="Enter you email"
          placeholder="Email"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
        />
        <Input
          ref={passwordRef}
          error={Object.keys(errorMessage)[0]}
          aria-label="Enter you password"
          aria-placeholder="Enter your password"
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />

        <Input type="submit" isValid={isValid} value="SIGN UP" />
      </div>
    </Form>
  );
};

export default SignUpForm;
