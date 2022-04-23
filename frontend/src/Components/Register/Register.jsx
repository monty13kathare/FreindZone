import { Avatar, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Register = () => {
   const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName] = useState("");
  const [nameId, setNameId] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name,nameId, email, password, avatar));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, alert]);
  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
      <i class="fa-solid fa-shield-dog logo"></i>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          FriendZone
        </Typography>

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "8vmax", width: "8vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="registerInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />
          <input
          type="text"
          value={nameId}
          placeholder="UserName"
          className="registerInputs"
          required
          onChange={(e) => setNameId(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="registerInputs"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/">
          <p>Already Signed Up? Login Now</p>
        </Link>

        <button
         disabled={loading} 
         type="submit"
          className="registerBtn"
          >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
