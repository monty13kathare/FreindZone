import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { useSelector } from "react-redux";


const Header = () => {
  const { user} = useSelector((state) => state.user);
  const [tab, setTab] = useState(window.location.pathname);
  return (
    

<nav>
        <div className="container">
        <i class="fa-solid fa-shield-dog logo"></i>
            <h2 className="logoName"> FriendZone</h2>
           <div className="navField">
           <Link to="/">
            <label className=" createPost navIcons" for="create-post"><i class="fa-solid fa-house"></i></label>
            </Link>
            <Link to="/friends">
            <label className=" createPost navIcons" for="create-post"><i class="fa-solid fa-user-group"></i></label>
            </Link>
            <Link to="/newpost">
            <label className=" createPost navIcons" for="create-post"><i class="fa-solid fa-play"></i></label>
            </Link>
            <Link to="/newpost">
            <label className=" createPost navIcons" for="create-post"><i class="fa-solid fa-ghost"></i></label>
            </Link>
           </div>
          
            <div className="create">
            <Link to="/newpost">
            <label className=" createPost" for="create-post"><i class="fa-solid fa-plus"></i></label>
            </Link>

          
            <Link to="/newpost">
            <label className="createPost notification" for="create-post"><i class="fa-solid fa-bell"></i></label>
            <div className="counter">2</div>
            </Link>

            <Link to="/account">
               <div className="profile-pic">
                    <img src={user.avatar.url}
                        className="profileImg" />
                </div>
            </Link>
               
            </div>
        </div>
    </nav>


  );
};

export default Header;
