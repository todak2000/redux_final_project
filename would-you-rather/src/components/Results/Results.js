import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import checker from "../../check2.png";
import { handleAddAnswer } from "../../actions/questions";

function Results(props) {
  const { detailQuestion, id, authUserId } = props;
  const handleAnswer = (answer, qid) => {
    const { dispatch, authUserId } = props;

    let info = {
      authedUser: authUserId[0],
      qid: qid,
      answer: answer,
    };
    dispatch(handleAddAnswer(info));
  };
  if (typeof detailQuestion[0] === "undefined") {
    return <Redirect to="/404" />;
  }

  let optionOneVotes = detailQuestion[0].optionOne.votes.length;
  let optionTwoVotes = detailQuestion[0].optionTwo.votes.length;
  let totalVotes = optionOneVotes + optionTwoVotes;
  // progress bar
  const ProgressBar = (props) => {
    const { bgcolor, completed } = props;

    const containerStyles = {
      height: 25,
      width: "100%",
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      marginBottom: 10,
    };

    const fillerStyles = {
      height: "100%",
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: "inherit",
      textAlign: "center",
      lineHeight: "1.5rem",
    };

    const labelStyles = {
      padding: 5,
      color: "white",
      fontWeight: "bold",
    };

    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="card-flexy">
        <div className="back">
          <Link to="/">
            <FaArrowLeft />
          </Link>
        </div>
        <div className="cardy" key={id}>
          <div className="cardy-header">
            <p>Poll Results for {detailQuestion[0].name}'s question:</p>
          </div>
          <div className="cardy-body">
            <img
              className="img-side"
              src={detailQuestion[0].avatarURL}
              alt="avatar"
            />
            <div className="poll-side">
              <h5>Would you rather ...</h5>
              <ul>
                <li className="first-child">
                  <button
                    type="button"
                    name="Option"
                    className={
                      detailQuestion[0].optionOne.votes.includes(authUserId[0])
                        ? "button-disabled"
                        : "button"
                    }
                    disabled={
                      detailQuestion[0].optionOne.votes.includes(
                        authUserId[0]
                      ) ||
                      detailQuestion[0].optionTwo.votes.includes(authUserId[0])
                    }
                    onClick={() => {
                      handleAnswer("optionOne", detailQuestion[0].qid);
                    }}
                  >
                    {detailQuestion[0].optionOne.text}{" "}
                    <span>
                      {detailQuestion[0].optionOne.votes.includes(
                        authUserId[0]
                      ) ? (
                        <img src={checker} alt="checker" />
                      ) : (
                        ""
                      )}
                    </span>
                  </button>
                </li>
                <li className="first-child">
                  <span className="text-righty">
                    {totalVotes > 0 ? (
                      <span>
                        {optionOneVotes}/{totalVotes} voted they would rather{" "}
                        {detailQuestion[0].optionOne.text}
                      </span>
                    ) : (
                      <span>0 Votes</span>
                    )}
                  </span>
                </li>
                <li className="first-child">
                  {totalVotes > 0 ? (
                    <ProgressBar
                      bgcolor="#57e6c7"
                      completed={((optionOneVotes / totalVotes) * 100).toFixed(
                        2
                      )}
                    />
                  ) : (
                    ""
                  )}
                </li>
                <li className="first-child">
                  <button
                    type="button"
                    name="Option"
                    className={
                      detailQuestion[0].optionTwo.votes.includes(authUserId[0])
                        ? "button-disabled"
                        : "button"
                    }
                    disabled={
                      detailQuestion[0].optionTwo.votes.includes(
                        authUserId[0]
                      ) ||
                      detailQuestion[0].optionOne.votes.includes(authUserId[0])
                    }
                    onClick={() => {
                      handleAnswer("optionTwo", detailQuestion[0].qid);
                    }}
                  >
                    {detailQuestion[0].optionTwo.text}{" "}
                    <span>
                      {detailQuestion[0].optionTwo.votes.includes(
                        authUserId[0]
                      ) ? (
                        <img src={checker} alt="checker" />
                      ) : (
                        ""
                      )}
                    </span>
                  </button>
                </li>

                <li className="first-child">
                  <span className="text-righty">
                    {totalVotes > 0 ? (
                      <span>
                        {optionTwoVotes}/{totalVotes} voted they would rather{" "}
                        {detailQuestion[0].optionTwo.text}
                      </span>
                    ) : (
                      <span>0 Votes</span>
                    )}
                  </span>
                </li>
                <li className="first-child">
                  {totalVotes > 0 ? (
                    <ProgressBar
                      bgcolor="#5D928B"
                      completed={((optionTwoVotes / totalVotes) * 100).toFixed(
                        2
                      )}
                    />
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function mapStateToProps({ authUser, users, questions }, props) {
  const { id } = props.match.params;
  return {
    id,
    loading: authUser === null,
    authUser: Object.keys(users)
      .filter((user) => users[user].id === authUser)
      .map((user) => users[user].name),
    authUserId: Object.keys(users)
      .filter((user) => users[user].id === authUser)
      .map((user) => users[user].id),
    users,
    avatar: Object.keys(users)
      .filter((user) => users[user].id === authUser)
      .map((user) => users[user].avatarURL),
    detailQuestion: Object.keys(questions)
      .filter((question) => questions[question].id === id)
      .map(
        (question) =>
          (question = {
            qid: questions[question].id,
            author: questions[question].author,
            name: Object.keys(users)
              .filter((user) => users[user].id === questions[question].author)
              .map((user) => users[user].name),
            avatarURL: Object.keys(users)
              .filter((user) => users[user].id === questions[question].author)
              .map((user) => users[user].avatarURL),
            timestamp: questions[question].timestamp,
            optionOne: {
              text: questions[question].optionOne.text,
              votes: questions[question].optionOne.votes,
            },
            optionTwo: {
              text: questions[question].optionTwo.text,
              votes: questions[question].optionTwo.votes,
            },
          })
      ),
  };
}
export default withRouter(connect(mapStateToProps)(Results));
