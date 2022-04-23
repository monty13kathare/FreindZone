import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import User from "../User/User";
import "./Search.css";
import {AiOutlineSearch} from "react-icons/ai";

const Search = () => {
  const [name, setName] = React.useState("");

  const { users, loading } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <h3 className='SearchTitle'>
          InstraSky
        </h3>

       <div className="searchInput">
       <input
          type="text"
          value={name}
          placeholder="Search Name"
          required
          onChange={(e) => setName(e.target.value)}
          className="searchField"
        />

        <button disabled={loading} type="submit" className="searchBtn">
          <AiOutlineSearch className="searchIcon"/>
        </button>
       </div>

        <div className="searchResults">
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
      </form>
    </div>
  );
};

export default Search;
