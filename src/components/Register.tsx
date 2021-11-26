import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "../axios";
const Register = () => {
  const history = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", {
        email: email,
        username: username,
        password: password,
      });
      history("/login");
    } catch (error) {
      console.log(error);
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
        <form>
          <h1>Register</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleSubmit}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
