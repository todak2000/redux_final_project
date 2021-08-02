import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthUser } from "../../actions/authUsers";
import { FaPowerOff } from "react-icons/fa";
import SignIn from "../SignIn/SignIn";

function Navbar(props) {
  const [logout, setLogout] = useState(false);
  const { authUser, avatar, dispatch } = props;
  if (authUser === null && logout === true) {
    return <SignIn />;
  }
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active">
              New Poll
            </NavLink>
          </li>
          <li className="space">
            <NavLink to="/leaderboard" activeClassName="active">
              Leader's Board
            </NavLink>
          </li>
          <li>Hello, {authUser} </li>
          <li>
            <img src={avatar} alt="avatar" className="avatar" />{" "}
          </li>
          <li
            onClick={() => {
              setLogout(true);
              dispatch(setAuthUser(null));
            }}
          >
            <FaPowerOff className="signout" />
          </li>
        </ul>
      </nav>
    </>
  );
}

function mapStateToProps({ authUser, users, setAuthUser }) {
  return {
    loading: authUser === null,
    authUser: Object.keys(users)
      .filter((user) => users[user].id === authUser)
      .map((user) => users[user].name),
    users,
    avatar: Object.keys(users)
      .filter((user) => users[user].id === authUser)
      .map((user) => users[user].avatarURL),
  };
}
export default withRouter(connect(mapStateToProps)(Navbar));
