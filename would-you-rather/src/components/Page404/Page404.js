import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Page404() {
  const Header = () => {
    const title = "Welcome to Would You Rather App!";
    const subTitle = "Sorry! Page do not exist. ";
    return (
      <div className="header">
        <h3>{title}</h3>
        <p>{subTitle}</p>
      </div>
    );
  };
  return (
    <>
      {Header()}
      <div className="card-flexy">
        <p className="text-middle">Return back to</p>
        <button className="btnn">
          <Link to="/">Home</Link>
        </button>
      </div>
    </>
  );
}

function mapStateToProps({ authUser, users }) {
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
export default connect(mapStateToProps)(Page404);
