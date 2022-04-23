import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMyProfile, getFollowingPosts, getMyPosts, loadUser, logoutUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";
import "./Account.css";
import {MdVerified} from "react-icons/md";
import {BiLogOut} from "react-icons/bi";
import {IoMdSettings} from "react-icons/io";
import {VscDebugRestart} from "react-icons/vsc";
import {IoColorPaletteSharp} from "react-icons/io5";
import {RiLockPasswordFill} from "react-icons/ri";
import {MdDelete} from "react-icons/md";
import {VscChromeClose} from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChatBubbleOutline, Delete, DeleteOutline, Favorite, FavoriteBorder } from "@mui/icons-material";
import { addCommentOnPost, deletePost, likePost, updatePost } from "../../Actions/Post";

const Account = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = true,
  isAccount = true,
}) => {

  


  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [settingToggle, setSettingToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
 
  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };

  

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, likeError, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
   <div className="main-Container">
     
<div className="Profile-container">


<div className="Profile-Box">

<div className="profile-img">
<img
        src={user.avatar.url}
      className="UserProfileImg"
      />
</div>
<div className="name-Div">
<h2 className="ownerName">{user.name}</h2>
  <div className="userId">
  <h1 className="username">{user.nameId}</h1>
  <MdVerified className="verifyIcon"/>
  </div>
  
  <p className="Bio">{user.tagLine}</p>
</div>
</div>

<div className="follow-Box">
<div className="box-container">
<div className="box">
 <h3 className="followLength">{user.posts.length}</h3>
        <button className="BoxBtn" >
        <span>Posts</span>
        </button>
</div>
 <div className="box">
          <h3 className="followLength">{user.followers.length}</h3>
        <button  onClick={() => setFollowersToggle(!followersToggle)} className="BoxBtn">
        <span>Followers</span>
        </button>
</div>
 <div className="box">
 <h3 className="followLength">{user.following.length}</h3>
        <button onClick={() => setFollowingToggle(!followingToggle)} className="BoxBtn">
        <span>Following</span>
        </button>
</div>
</div>

<div className="editAndsetting-Div">
<button className="EditProfile" >
<Link to="/update/profile" className="editLink">
<i class="fa-solid fa-user-pen"></i>
 Edit Profile
 </Link>
</button>
<button className="setting" onClick={() => setSettingToggle(!settingToggle)} >
<i class="fa-solid fa-gear"></i>
Setting
</button>
</div>
</div>





                 {/* followers Dialog */}
 
<Dialog
        open={followersToggle}
        onClose={() => setFollowersToggle(!followersToggle)}
      >
        <div className="DialogBoxFollow">
        <div className="followTitle">
            <h2 className="followTag">Followers</h2>
             <VscChromeClose className="deleteIcon"  onClick={() => setFollowersToggle(!followersToggle)}/>
          </div>

          {user && user.followers.length > 0 ? (
            user.followers.map((follower) => (
             
              <div className="followingDiv">
              <User
                key={follower._id}
                userId={follower._id}
                nameId={follower.nameId}
                name={follower.name}
                avatar={follower.avatar.url}
              />
              <button className="followBtn">Follow</button>
              </div>
            ))
          ) : (
            <Typography style={{ margin: "2vmax" }}>
              You have no followers
            </Typography>
          )}
       
        </div>
      </Dialog>

                  {/* following Dialog */}

      <Dialog
        open={followingToggle}
        onClose={() => setFollowingToggle(!followingToggle)}
      >
        <div className="DialogBox-following">
        <div className="followTitle">
            <h2 className="followTag">Following</h2>
             <VscChromeClose className="deleteIcon"  onClick={() => setFollowingToggle(!followingToggle)} />
          </div>

          {user && user.following.length > 0 ? (
            user.following.map((follow) => (
              /* <User
                key={follow._id}
                userId={follow._id}
                name={follow.name}
                avatar={follow.avatar.url}
              /> */
              <div className="followingDiv">
              <User
                key={follow._id}
                userId={follow._id}
                nameId={follow.nameId}
                name={follow.name}
                avatar={follow.avatar.url}
              />
              <button className="followingBtn">Following</button>
              </div>
           
            ))
          ) : (
            <Typography style={{ margin: "2vmax" }}>
              You're not following anyone
            </Typography>
          )}
        </div>
      </Dialog>


                      {/* setting popup */}



        <Dialog
        open={settingToggle}
        onClose={() => setSettingToggle(!settingToggle)}
      >
        <div className="DialogBoxSetting">
        <div className="SettingTitle">
            <h2 className="settingTag">Setting</h2>
             <VscChromeClose className="deleteIcon"  onClick={() => setSettingToggle(!settingToggle)} />
          </div>
          <div className="menu">
      <Link to="/password/reset/:token">
  <VscDebugRestart className="icons"/>
    Reset Password
  </Link>

  <Link to="/update/password" >
    <RiLockPasswordFill className="icons"/>
    Change Password
  </Link>
  
  <Link to="#"  
  onClick={deleteProfileHandler}
  disabled={deleteLoading}
  >
  <MdDelete className="icons"/>
    Delete My Profile
  </Link>
  
  <a href="#" >
    <IoColorPaletteSharp className="icons"/>
    Dark theme
  </a>
  <a href="#" >
    <IoMdSettings className="icons"/>
    setting
  </a>
  <a href="#" >
    <IoMdSettings className="icons"/>
    notifications
  </a>
  <a href="#" >
    <IoMdSettings className="icons"/>
    email & Password
  </a>
  
  <Link to="#"
   onClick={logoutHandler}>
  <BiLogOut className="icons"/>
    Logout
  </Link>
  
      </div>
        </div>
 </Dialog>                  


  

</div>

{/* post container */}

<div className="UserPostContainer">
<div className="filterPost">
<p><i class="fa-solid fa-border-all P"></i>Posts</p>
<p><i class="fa-solid fa-circle-play V"></i>Videos</p>
<p><i class="fa-solid fa-bookmark S"></i>Saved</p>
<p><i class="fa-solid fa-user-tag T"></i>Taged</p>
</div>
      <div className="UserPost">
      {posts && posts.length > 0 ? (
          posts.map((post) => (
            /* <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              className="PostUser"
            /> */
           
          <div className="PostDiv">
         
          <img src={post.image.url}
            likes={post.likes}
              comments={post.comments}
              key={post._id}
              postId={post._id}
              ownerId={post.owner._id}
              // isAccount={true}
             alt="pics" className="postImg" />

           <div className="iconsPost">
           <i class="fa-solid fa-trash-can"></i>
           <i class="fa-solid fa-heart"></i>
           <i class="fa-solid fa-pen-to-square"></i>
           </div>
           
          </div>
             
          ))
          
        ) : (
          <Typography variant="h6">User has not made any post</Typography>
        )}
      </div>
     
      </div>




      </div>


  );
};

export default Account;
