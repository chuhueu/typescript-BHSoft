import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/userSlice";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail, isEmpty } from "validator";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    //console.log(user);
  };
  const required = (value) => {
    if (isEmpty(value)) {
      return (
        <small className="form-text text-danger">This field is required</small>
      );
    }
  };
  const formEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <small className="form-text text-danger">Invalid email format</small>
      );
    }
  };

  const minLength = (value) => {
    if (value.trim().length < 6) {
      return (
        <small className="form-text text-danger">
          Password must be at least 6 characters long
        </small>
      );
    }
  };
  return (
    <div className="login">
      <div className="top">
        <Link to="/register">
          <button className="buttonLogin">Register</button>
        </Link>
        <div className="wrapper">
          <Link to="/register">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="container-login">
        <Form className="form-login">
          <h1>Log in</h1>
          <Input
            type="email"
            placeholder="Email or phone number"
            value={email}
            className="form-control"
            onChange={(e: React.ChangeEvent<HTMLElement>) =>
              setEmail((e.target as any).value)
            }
            validations={[required, formEmail]}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            className="form-control"
            onChange={(e: React.ChangeEvent<HTMLElement>) =>
              setPassword((e.target as any).value)
            }
            validations={[required, minLength]}
          />
          <button className="loginButton" onClick={handleSubmit}>
            Log in
          </button>
          {error && <span id="error">Wrong email or password!</span>}
        </Form>
      </div>
    </div>
  );
};

export default Login;
