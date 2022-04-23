import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./LeftSide.css";

const LeftSide = () => {

    const { user} = useSelector((state) => state.user);
    const [settingToggle, setSettingToggle] = useState(false);

  return (
    <div className="left">
    <a className="profile">
        <div className="profile-pic">
            <img src={user.avatar.url}
                alt=""/>
        </div>
        <div className="handle">
            <h4>{user.name}</h4>
            <p className="text-muted">
            {user.nameId}
            </p>
        </div>
    </a>

    {/* <!-- ----------SIDEBAR ----------------------> */}
    <div className="sidebar">
        <a className="menu-item ">
            <i className="fa-solid fa-house H"></i>
            <h3>Home</h3>
        </a>

        <Link to="/friends">
        <a className="menu-item ">
            <span><i class="fa-solid fa-users F"></i></span>
            <h3> find Friend</h3>
        </a>
        </Link>


        <a className="menu-item ">
            <span><i className="fa-solid fa-compass E"></i></span>
            <h3>Explore</h3>
        </a>

        <a className="menu-item ">
            <span><i class="fa-solid fa-dice G"></i></span>
            <h3>Games</h3>
        </a>

        <a className="menu-item ">
            <span><i class="fa-solid fa-clapperboard R"></i></span>
            <h3>Reals</h3>
        </a>
        <a className="menu-item ">
            <span><i class="fa-brands fa-facebook-messenger M"></i></span>
            <h3>Messanger</h3>
        </a>
        <a className="menu-item ">
            <span><i class="fa-solid fa-cloud-bolt W"></i></span>
            <h3>Weather</h3>
        </a>

        <a className="menu-item ">
            <span><i class="fa-solid fa-bookmark B"></i></span>
            <h3>Bookmark</h3>
        </a>
        <a className="menu-item ">
            <span><i class="fa-solid fa-flag P"></i></span>
            <h3>Pages</h3>
        </a>
        <a className="menu-item ">
            <span><i class="fa-solid fa-calendar-check E"></i></span>
            <h3>Events</h3>
        </a>

        <a className="menu-item" id="notifications">
            <span><i class="fa-solid fa-bell N"></i></span>
            <h3>Notifications</h3>
            {/* <!-- ----------------- Notification ----------------- --> */}
            <div className="notifications-popup">
                <div>
                    <div className="profile-pic">
                        <img src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""/>
                    </div>
                    <div className="notification-body">
                        <b>Gulshan Kathare</b> accepted your friend request
                        <small className="text-muted">2 days ago</small>
                    </div>
                </div>
                <div>
                    <div className="profile-pic">
                        <img src="https://images.pexels.com/photos/106695/pexels-photo-106695.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""/>
                    </div>
                    <div className="notification-body">
                        <b>Manish Sharma</b> accepted your friend request
                        <small className="text-muted">2 days ago</small>
                    </div>
                </div>
            </div>
            {/* <!-------------------------- END NOTIFICATION POPUP ----------------> */}
        </a>

        <a className="menu-item" id="messages-notifications">
            <span><i class="fa-solid fa-map-location-dot L"></i></span>
            <h3>location</h3>
        </a>
        <a className="menu-item">
            <span><i className="fa-solid fa-chart-column A"></i></span>
            <h3>Analytics</h3>
        </a>

        <a to="/theme" className="menu-item ">
            <span><i className="fa-solid fa-palette T"></i></span>
            <h3>Theme</h3>
        </a>

        <a className="menu-item " onClick={() => setSettingToggle(!settingToggle)}>
            <span><i className="fa-solid fa-gear S"></i></span>
            <h3>Settings</h3>
        </a>

    </div>
    </div>
  )
}

export default LeftSide;