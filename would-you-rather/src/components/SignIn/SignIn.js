import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthUser } from "../../actions/authUsers";
import { Redirect } from "react-router-dom";
import logo from "../../logo.svg";

function SignIn(props) {
  const [user, setUser] = useState(null);
  const [createUser, setCreateUser] = useState(false);

  function handleLogin() {
    const { dispatch } = props;
    dispatch(setAuthUser(user));
  }

  function handleChange(e) {
    e.preventDefault();
    if (e.target.value === "newUser") {
      setCreateUser(true);
    }
    if (e.target.value === "") {
      console.log("Kindly select a User ot Create One");
    } else {
      setUser(e.target.value);
    }
  }
  const { availableUsers } = props;
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
    <div className="sign-in-body">
      {props.authUser !== null && <Redirect to="/" />}
      {Header()}
      <img src={logo} className="logo" alt="logo" />
      <h5>Sign in</h5>
      {createUser === false && (
        <div className="form-container">
          <select
            onChange={(e) => handleChange(e)}
            className="form-input"
            name="authUserId"
          >
            <option value="">Select User</option>
            <option value="newUser">Create New User</option>
            {availableUsers.map((user) => (
              <option value={user.userId}>{user.name}</option>
            ))}
          </select>
          <br></br>
          <button type="submit" className="form-input" onClick={handleLogin()}>
            Submit
          </button>
        </div>
      )}
      {createUser === true && (
        <div className={createUser ? "form-container" : "previous-hide"}>
          <input type="text" placeholder="username" className="form-input" />
          <input type="text" placeholder="Name" className="form-input" />
          <input type="text" placeholder="Image Url" className="form-input" />
          <button
            type="submit"
            className="form-input"
            onClick={() => {
              console.log("New signup");
            }}
          >
            Submit
          </button>
          <p
            className="previous"
            onClick={() => {
              setCreateUser(false);
            }}
          >
            Back to signin
          </p>
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(SignIn);
// function that collect data from store and maps to the dashboard component
function mapStateToProps({ users}) {
  return {
    availableUsers: Object.keys(users).map((user) => ({
      userId: user,
      name: users[user].name,
      avatar: users[user].avatarURL,
    })),
  };
}
