import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import "./ForgotPassword.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
      <i class="fa-solid fa-shield-dog logo"></i>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
        FriendZone
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button disabled={loading} type="submit" className="forgetPswd">
          Send Token
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
