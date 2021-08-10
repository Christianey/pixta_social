import "./login.scss";
import LoginForm from "../components/loginForm";
import SignUpForm from "../components/signUpForm";
import { Redirect } from "react-router-dom";
import { useState } from "react";

import { useSelector } from "react-redux";

const LoginSignUp = () => {
  const [page, setPage] = useState(true);
  const { accessToken } = useSelector((state) => state.auth);

  console.log(!!accessToken);
  if (accessToken) return <Redirect to="/" />;
  return (
    <div className="login-page">
      <div className="phone-image-wrapper">
        <img src="/iphone-with-profile.jpg" alt="smartphone ui" />
      </div>
      <div className="login-form">
        <div className="bg-white px-4 py-6 pb-4 mb-3 border border-gray-100">
          <h1 className="flex justify-center h-10 mb-2">
            <img src="/logo.png" alt="" className="h-full" />
          </h1>
          {page ? <LoginForm /> : <SignUpForm />}
        </div>
        <div className="borderformRef border-gray-100 p-4 bg-white w-full flex justify-center">
          <p className="text-sm">
            {`${page ? "Don't H" : "H"}ave an account?`}
            <span
              className="font-bold text-blue-medium cursor-pointer"
              onClick={() => setPage(!page)}
            >
              {page ? " Sign Up" : " Log in"}.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
