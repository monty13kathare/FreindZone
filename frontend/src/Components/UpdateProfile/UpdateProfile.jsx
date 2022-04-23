import { Avatar, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateProfile.css";
import { loadUser, updateProfile } from "../../Actions/User";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";

const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);

  const [name, setName] = useState(user.name);
  const [nameId, setNameId] = useState(user.nameId);
  
  const [tagLine, setTagLine] = useState(user.tagLine);
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);

        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, nameId, tagLine,  avatar));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, alert, updateError, message]);
  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
      <i class="fa-solid fa-shield-dog logo"></i>
        <h3 className="updateHeader">
          FriendZone
        </h3>

        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "8rem", width: "8rem" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        
        <input
          type="text"
          value={name}
          placeholder="Name"
          className="updateProfileInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />


         <input
          type="text"
          value={nameId}
          placeholder="UserName"
          className="updateProfileInputs"
          required
          onChange={(e) => setNameId(e.target.value)}
        />
         <textarea
          type="text"
          value={tagLine}
          placeholder="Bio"
          className="updateBio"
          required
          onChange={(e) => setTagLine(e.target.value)}
        />

       

        <button disabled={updateLoading} type="submit" className="updateBtn">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
