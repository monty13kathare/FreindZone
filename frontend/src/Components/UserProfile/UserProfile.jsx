import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
} from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";
import {MdVerified } from "react-icons/md";
import "./UserProfile.css";
import { VscChromeClose } from "react-icons/vsc";

const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);

  const { user: me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);

  const params = useParams();
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };
  
  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, params.id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (followError) {
      alert.error(followError);
      dispatch({ type: "clearErrors" });
    }

    if (userError) {
      alert.error(userError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, followError, userError, dispatch]);

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
     
    
     {myProfile ? null : (
               <button
                style={{ background: following ? 
                 "green" : "rgb(33, 113, 216)",
                 color: "#fff",
                width: "8rem",
                 padding: "0.5rem 1.3rem",
                 fontSize: "18px",
                 borderRadius: "0.5rem",
                 border: "none",
                 marginBottom: "1rem",
                 cursor: "pointer"
                 }}
                 onClick={followHandler}
                 disabled={followLoading}
                 className="btnPro"
               >
                 {following ? "Unfollow" : "Follow"}
               </button>
             )}
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
                 
                
               <div className="PostDiv">
              
               <img src={post.image.url}
                 likes={post.likes}
                   comments={post.comments}
                   key={post._id}
                   postId={post._id}
                   ownerId={post.owner._id}
                   isAccount={true}
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

export default UserProfile;
