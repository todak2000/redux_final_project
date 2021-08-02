import React, { useState } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";
import { handleAddQuestion } from "../../actions/questions";
import { FaArrowLeft } from "react-icons/fa";

function NewQuestion(props) {
  const location = useLocation();
  const loca = location.pathname;

  const history = useHistory();
  const loc = history.location.pathname;
  console.log(loc);

  const [optionOne, setOptionOne] = useState();
  const [optionTwo, setOptionTwo] = useState();
  const [backHome, setBackHome] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, authUserId } = props;

    let info = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      authedUser: authUserId[0],
    };
    console.log(info);
    dispatch(handleAddQuestion(info));
    setOptionOne("");
    setOptionTwo("");
    setBackHome(true);
  };
  if (backHome) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Navbar />
      <div className="card-flexy">
        <div className="back">
          <Link to="/">
            <FaArrowLeft />
          </Link>
        </div>
        <div className="cardy">
          <div className="cardy-header">
            <p>Create New Poll</p>
          </div>
          <div className="cardy-body">
            <div className="poll-new">
              <h5>Would you rather ...</h5>
              <form className="input-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input-formy"
                  placeholder="enter your first option"
                  value={optionOne}
                  onChange={(e) => setOptionOne(e.target.value)}
                />
                <input
                  type="text"
                  className="input-formy"
                  placeholder="enter your second option"
                  value={optionTwo}
                  onChange={(e) => setOptionTwo(e.target.value)}
                />

                <div className="submit-div">
                  <input
                    type="submit"
                    className="input-formy-submit"
                    value="Submit"
                    disabled={optionOne === ""}
                  />{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(NewQuestion);
// function that collect data from store and maps to the dashboard component
function mapStateToProps({ users, authUser }) {
  return {
    userIds: Object.keys(users).map((user) => user),
    users: users,
    authUser: Object.keys(users)
      .filter((user) => users[user].id === authUser)
      .map((user) => users[user].name),
    authUserId: Object.keys(users)
      .filter((user) => users[user].id === authUser)
      .map((user) => users[user].id),
  };
}
