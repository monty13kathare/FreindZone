import React, { useEffect } from "react";
import Post from "../Post/Post";
import User from "../User/User";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts, getMyPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import LeftSide from "../LeftSide/LeftSide";
import RightSide from "../RightSide/RightSide";

const Home = () => {
  

  const { user} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );

  const { error: likeError, message } = useSelector((state) => state.like);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
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

  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
   <main>
    <div className="home">
    <div className="homeLeft">
    <LeftSide/>
    </div>

      <div className="middle">
      <div className="stories">
        <div className="story">
            <div className="profile-pic">
                <img src={user.avatar.url}
                    alt=""/>
            </div>
            <p className="name">Your Story</p>
        </div>
        <div className="story">
            <div className="profile-pic">
                <img src="https://images.pexels.com/photos/1617366/pexels-photo-1617366.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""/>
            </div>
            <p className="name">Dinesh</p>
        </div>
        <div className="story">
            <div className="profile-pic">
                <img src="https://images.pexels.com/photos/1617366/pexels-photo-1617366.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""/>
            </div>
            <p className="name">Murari</p>
        </div>
        <div className="story">
            <div className="profile-pic">
                <img src="https://images.pexels.com/photos/1617366/pexels-photo-1617366.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""/>
            </div>
            <p className="name">Manish</p>
        </div>
    </div>

    <form class="create-post">
        <div class="profile-pic">
            <img src={user.avatar.url}
                alt=""/>
        </div>
        <input type="text" placeholder="What's on your mind, Arvind" id="create-post"/>
        <input type="submit" value="Post" class="btn btn-primary"/>
    </form>
    
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isAccount={false}
              isDelete={false}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
<div className="homeRight">
<RightSide/>
</div>
      

      {/* <div className="homeright">
        {/* {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              nameId={user.nameId}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )} */}

       
      {/* </div> */} 
    </div>
    </main>
  );
};

export default Home;







   






