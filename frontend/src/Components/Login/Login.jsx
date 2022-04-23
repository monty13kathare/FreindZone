import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
      <i class="fa-solid fa-shield-dog logo"></i>
        <Typography variant="h3" style={{ padding: "1vmax" }}>
          FriendZone
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

<div className="showPassword">
<input
          type={show ? "text" : "password"}
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <button  onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </button>
</div>
        

        <Link to="/forgot/password">
          <p >Forgot Password?</p>
        </Link>

        <button className="loginBtn" type="submit">Login</button>

        <Link to="/register">
          <p>New User?</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
