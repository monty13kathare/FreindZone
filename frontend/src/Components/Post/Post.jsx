import { Avatar, Button, Typography, Dialog } from "@mui/material";
import React, { useEffect } from "react";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
   PublicOutlinedIcon,
   Delete,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Post.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentOnPost,
  deletePost,
  likePost,
  updatePost,
} from "../../Actions/Post";
import { getFollowingPosts, getMyPosts, loadUser } from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
import {BsThreeDotsVertical} from "react-icons/bs";
import {TiDeleteOutline} from "react-icons/ti";
import { VscChromeClose } from "react-icons/vsc";



const Post = ({
  postId,
  caption,
  
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = true,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLike = async () => {
    setLiked(!liked);

    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts());
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="feeds">
      {/* <div className="top">
     <div className="userDetails">
       <div className="profile_img">
       <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
            
          }}
        />
       </div>
       <h3>{ownerName}<br/><span>Raipur,Chhattisgarh</span></h3>


     </div>
     <button
      className="dot"
       onClick={() => setCaptionToggle(!captionToggle)}
       
       >
       <BsThreeDotsVertical className='threeDot'/>
     </button>

      </div>

      <img src={postImage} alt="Post" />

      <div className="postFooter">
        <Button onClick={handleLike} >
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>

        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>

       

        {isAccount ? (
        <Button
         onClick={deletePostHandler}
         style={{marginLeft:"1vmax"}}
         >
          <DeleteOutline />
        </Button>
      ) : ownerId === user._id ? (
        <Button onClick={deletePostHandler}>
          <Delete />
        </Button>
      ) : null}
      </div>

      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <h2 className="likes">{likes.length} likes</h2>
      </button>
      <h4 className="message"><b>{ownerName}  </b>{caption}</h4>

     <button
      style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          
        }}
       onClick={() => setCommentToggle(!commentToggle)}
       >
       <h4 className="comments">View all {comments.length} comments</h4>
       </button>
       
      <div className="addComments">
        <div className="userImg">
        <Avatar
          src={user.avatar.url}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
            
          }} />
        </div>
       <button
         onClick={() => setCommentToggle(!commentToggle)}
         style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          
        }}
         >
       <input type="text" className="text" placeholder="Add a comment..." />
       </button>
      </div>
      <h5 className="postTime">2 min ago </h5> */}





      <div class="feed">
            <div class="head">
                <div class="user">
                    <div class="profile-pic">
                        <img src={ownerImage}
                            alt=""/>
                    </div>
                    <div class="info">
                        <h2>{ownerName}</h2>
                        <small>Raipur, 15 min ago</small>
                    </div>
                </div>
                <button
           className="dot"
           onClick={() => setCaptionToggle(!captionToggle)}
       
         >
          <BsThreeDotsVertical className='threeDot'/>
         </button>

            </div>
            <div class="photo">
                <img src={postImage}
                    alt=""/>
            </div>

            <div class="action-buttons">
                <div class="interaction-buttons">
                <Button onClick={handleLike} >
              {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
             </Button>
               <Button onClick={() => setCommentToggle(!commentToggle)}>
                   <ChatBubbleOutline />
              </Button>
              {isDelete ? (
          <Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>
        ) : null}
              {isAccount ? (
        <Button
         onClick={deletePostHandler}
         style={{marginLeft:"1vmax"}}
         >
          <DeleteOutline />
        </Button>
      ) : ownerId === user._id ? (
        <Button onClick={deletePostHandler}>
          <Delete />
        </Button>
      ) : null}
                    <span><i class="fa-solid fa-share-nodes"></i></span>
                </div>
              
                <div class="bookmark">
                    <span><i class="fa-regular fa-bookmark"></i></span>
                </div>
            </div>

            <div class="liked-by">
                <span><img
                  src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""/></span>
                <span><img
                        src="https://images.pexels.com/photos/9712732/pexels-photo-9712732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt=""/></span>
                <span><img
                        src="https://images.
                        pexels.com/photos/8837170/pexels-photo-8837170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt=""/></span>
                         <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <p>Liked by <b>Arvind </b>and <b>{likes.length} others</b></p>
      </button>
               
            </div>

            <div class="caption">
                <p><b>{ownerName}</b> {caption} <span
                        class="harsh-tag">#showTime</span></p>
            </div>
            <button
      style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          padding: 0,
        }}
       onClick={() => setCommentToggle(!commentToggle)}
       >
         <div class="comments text-muted">View all  {comments.length} comments</div>
       </button>
          
        </div>

      <Dialog
       open={likesUser} 
       onClose={() => setLikesUser(!likesUser)}
      >
        <div className="DialogBoxFollow">
        <div className="followTitle">
            <h2 className="followTag">Likes</h2>
             <VscChromeClose className="deleteIcon"  onClick={() => setLikesUser(!likesUser)}/>
          </div>
            {likes.map((like) => (
             
              <div className="followingDiv">
              <User
                key={like._id}
              userId={like._id}
              name={like.name}
              nameId={like.nameId}
              avatar={like.avatar.url}
              />
              <button className="followBtn">Follow</button>
              </div>
            ))}
         
       
        </div>
      </Dialog>



      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBoxFollow">
          <div className="followTitle">
            <h2 className="followTag">Comments</h2>
             <VscChromeClose className="deleteIcon"  onClick={() => setCommentToggle(!commentToggle)} />
          </div>

          <form className="commentForm" onSubmit={addCommentHandler}>
<div className="userComments">
{comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
        
          <div className="addComments1" >
      
        <Avatar
          src={user.avatar.url}
          alt="User"
          sx={{
            height: "2.5vmax",
            width: "2.5vmax",
            border: "2px solid black",
            marginLeft:"5px"
          }} />
        
        <input
         type="text"
         className="text1"
         placeholder="Comment on post.."
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        required
        />
         <button type="submit" className="comtBtn">
              Post
        </button>
      </div>
          </form>
        </div>
      </Dialog>




      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox-Caption">
        <div className="SettingTitle">
            <h2 className="settingTag">Update Caption</h2>
             <VscChromeClose className="deleteIcon"  onClick={() =>  setCaptionToggle(!captionToggle)} />
          </div>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
                  <div className="addComments1" >
        <div className="userImg1">
        <Avatar
          src={user.avatar.url}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
            border: "2px solid black",
          }} />
        </div>
        <input
         type="text"
         className="text1"
        //  placeholder="Comment on post.."
        value={captionValue}
        onChange={(e) => setCaptionValue(e.target.value)}
        required
        />
         <button type="submit" className="captionBtn">
              Update
        </button>
      </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
