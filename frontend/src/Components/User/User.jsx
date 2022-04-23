import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./User.css";
const User = ({ userId, name, avatar, nameId }) => {
  return (
    <div className="UserPopup">
  <Link to={`/user/${userId}`} className="homeUser">
      <img src={avatar} alt={name} className="Pic" />
      <div className="userNem">
      <h3 className='name'>{name}</h3>
      <h3 className='nameId'>{nameId}</h3>
      </div>
    </Link>
    {/* <button className="followBtn">Follow</button> */}
    </div>

  
  );
};

export default User;
