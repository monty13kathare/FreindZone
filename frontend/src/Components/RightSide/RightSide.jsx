import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import User from "../User/User";
import "./RightSide.css";

const RightSide = () => {
    const [name, setName] = React.useState("");

  const { users} = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
      
    <div className="right">
    {/* <!-- --------------- MESSAGES ---------------- --> */}
    <form className="messages" onSubmit={submitHandler}>
        <div className="heading">
            <h4>Friends</h4><i className="fa-regular fa-pen-to-square"></i>
        </div>
        {/* <!-- ---------------- SEARCH BAR -------------- --> */}
        <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search"
             placeholder="Search friends"
             value={name}
             required
             onChange={(e) => setName(e.target.value)}
             />
        </div>
        {/* <!-- -----------------MESSAGES CATEGORY ----------------- --> */}
        <div className="category">
            <h6 className="active">Primary</h6>
            <h6>General</h6>
            <h6 className="message-requests">Requests(6)</h6>
        </div>
        {/* <!-- --------------- MESSAGE -------------------- --> */}
        <div className="message">
       <div className="friendZone">
       {users &&
            users.map((user) => (
                <User
                key={user._id}
                userId={user._id}
                name={user.name}
                nameId={user.nameId}
                avatar={user.avatar.url}
              />
             
            ))}
       </div>
       
        </div>
       
       

    </form>
    {/* <!--  ------------------------- MESSAGES END -------------------- --> */}

    {/* <!-- ------------------------- FRIEND REQUESTS --------------- --> */}
     <div className="friend-requests">
        <h4>Requests</h4>
      
        {users &&
            users.map((user) => (
               

              <div className="request">
            <div className="info">
                <div className="profile-pic">
                    <img src={user.avatar.url}
                        alt=""/>
                </div>
                <div className="InfoName">
                <h5>{user.name}</h5>
            <p className="text-muted">{user.nameId}</p>
                </div>
            </div>
            <div className="action">
                <button className="btn btn-primary">
                    Accept
                </button>
                <button className="btn">
                    Decline
                </button>
            </div>
        </div>
             
            ))}
        
    </div> 
</div>









  )
}

export default RightSide