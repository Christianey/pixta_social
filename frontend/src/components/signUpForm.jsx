import axios from "axios";
import { useRef, useEffect } from "react";
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
  const { fullName, username, email, password } = userData;
  const ref = useRef();
  const isValid = fullName && username && email && password;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({});
  };

  useEffect(() => {
    document.title = "Sign up - Pixta";
  }, []);

  return (
    <Form ref={ref} onSubmit={handleSubmit}>
      <div className="form-group">
        <Input
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
          aria-label="Enter you email"
          aria-placeholder="Enter you email"
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
        />
        <Input
          aria-label="Enter you password"
          aria-placeholder="Enter your password"
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />

        <Input
          type="submit"
          className={`p-2 h-10 font-bold ${isValid ? undefined : "opacity-50"}`}
          disabled={isValid ? null : true}
          onClick={() => console.log("I was clicked bro.")}
          value="SIGN UP"
        />
      </div>
    </Form>
  );
};

export default SignUpForm;
