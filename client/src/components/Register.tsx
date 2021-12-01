import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "../axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail, isEmpty } from "validator";
import ReactDOM from "react-dom";
const Register = () => {
  const history = useNavigate();
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setConfirm(true);
    } else {
      try {
        await axios.post("/auth/register", {
          email: email,
          username: username,
          password: password,
        });
        history("/login");
      } catch (error) {
        if(error){
          // const element = <p>Email or username already exist</p>;
          // ReactDOM.render(element, document.getElementById("confirm"));
          setCheckEmail(true);
        }else{
          console.log(error);
        }
      }
    }
  };
  const required = (value: string) => {
    if (isEmpty(value)) {
      return (
        <small className="form-text text-danger">This field is required</small>
      );
    }
  };
  const validEmail = (value: string) => {
    if (!isEmail(value)) {
      return (
        <small className="form-text text-danger">Invalid email format</small>
      );
    }
  };
  const validUser = (value: string) => {
    if (value.trim().length < 4) {
      return (
        <small className="form-text text-danger">
          Username should be at least 4 characters long
        </small>
      );
    }
  };
  const minLength = (value: string) => {
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
        <Link to="/login">
          <button className="buttonLogin">Log in</button>
        </Link>
        <div className="wrapper">
          <Link to="/">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="container">
        <Form>
          <h1>Register</h1>
          <Input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLElement>) =>{
              setEmail((e.target as any).value)
              setCheckEmail(false)
            }}
            validations={[required, validEmail]}
          />
          {checkEmail && <div id="confirm">Email or username already exist</div>}
          <Input
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLElement>) =>
              setUsername((e.target as any).value)
            }
            validations={[required, validUser]}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLElement>) =>
              setPassword((e.target as any).value)
            }
            validations={[required, minLength]}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e: React.ChangeEvent<HTMLElement>) => {
              setConfirmPass((e.target as any).value)
              setConfirm(false)
            }}
          />
          {confirm && <div id="confirm">Password doesn't match</div>}
          <button className="loginButton" onClick={handleSubmit}>
            Register
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
