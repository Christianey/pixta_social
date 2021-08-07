import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../controls/input";
import { Form, useForm } from "../hooks/useForm";
import authActionTypes from "../redux/reducers/auth/auth.actionTypes";
import authThunk from "../redux/reducers/auth/auth.thunk";

const initialState = {
  emailOrUsername: "",
  password: "",
};

const LoginForm = () => {
  const { error, isLoading } = useSelector((state) => state.auth);
  const { userData, handleChange } = useForm(initialState);
  const { emailOrUsername, password } = userData;

  const dispatch = useDispatch();
  const isValid = emailOrUsername && password ? false : true;

  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(authThunk.signIn(userData));
  };

  useEffect(() => {
    document.title = "Login - Pixtas";
    ref.current.focus();

    return () => {
      dispatch({ type: authActionTypes.AUTH_CLEAR_ERROR });
    };
  }, [dispatch]);

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <p className="flex justify-center text-center text-red-500">{`*${error}`}</p>
      )}
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

      <button
        type="submit"
        className={`${
          isValid && "opacity-50 cursor-default"
        } mt-6 h-10 font-bold flex items-center justify-center w-full text-white bg-blue-medium`}
        disabled={isValid}
      >
        LOG IN{""} {isLoading && <span className="loading ml-2"></span>}
      </button>
    </Form>
  );
};

export default LoginForm;
