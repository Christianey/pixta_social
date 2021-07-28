import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const initialState = {
  emailOrUsername: "",
  password: "",
};

const Login = () => {
  const [userData, setUserData] = useState(initialState);
  const { emailOrUsername, password } = userData;
  const dispatch = useDispatch();
  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ref.reportValidity()) {
      axios({
        url: "local",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    document.title = "Login - Pixta";
  }, []);

  return (
    <div className="login-page">
      <div className="phone-image-wrapper">
        <img src="/iphone-with-profile.jpg" alt="smartphone ui" srcset="" />
      </div>
      <div className="login-form">
        <h1>Login</h1>
        <form action="" ref={ref} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailOrUsername">Email Or Username</label>
            <input
              type="email"
              name="emailOrUsername"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="SUBMIT"
            disabled={emailOrUsername && password ? false : true}
          />
          <p>
            You don't have an account? <Link to="/register">Register Now</Link>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
