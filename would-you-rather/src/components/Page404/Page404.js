import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Page404(props) {
  const Header = () => {
    const title = "Welcome to Would You Rather App!";
    const subTitle = "Please sign or create a new user to continue";
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
        <p>
          Sorry! Page do not exist. Return back to <Link to="/">Home</Link>
        </p>
      </div>
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
export default connect(mapStateToProps)(Page404);
