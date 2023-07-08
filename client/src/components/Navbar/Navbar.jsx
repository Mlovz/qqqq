import React from "react";
import "./navbar.scss";
import { NavAuth, NavUser } from "./";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuth, user } = useSelector((state) => state.auth);

  return (
    <div className="nav">
      <div className="container">
        <div className="nav_wrap">
          {/* to надо указывать обязательно, а то будет не понятная ошибка */}
          <Link to="/" className="nav_logo"></Link>

          {isAuth && user ? <NavUser avatar={user.avatar} /> : <NavAuth />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
