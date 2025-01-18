import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

const Nav = ({search, setSearch}) => {
  return (
    <div className="Nav">
      <Search search={search} setSearch={setSearch}/>
      <ul>
      <li>
        {" "}
        <Link to="/">Home</Link>
      </li>
      <li>
        {" "}
        <Link to="/newPost">Post</Link>
      </li>

      <li>
        <Link to="/about">About</Link>
        </li>
        </ul>
    </div>
  );
};

export default Nav;
