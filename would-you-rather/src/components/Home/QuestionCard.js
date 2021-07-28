import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddAnswer } from "../../actions/questions";
import checker from "../../check2.png";
function QuestionCard(props) {
  let filteredQuestions = {};
  const {
    answeredQuestions,
    UnansweredQuestions,
    toggleAnswered,
    authUserId,
  } = props;

  const handleAnswer = (answer, qid) => {
    const { dispatch, authUserId } = props;

    let info = {
      authedUser: authUserId[0],
      qid: qid,
      answer: answer,
    };
    dispatch(handleAddAnswer(info));
  };
  return (
    <>
      {Object.keys(
        (filteredQuestions = toggleAnswered
          ? answeredQuestions
          : UnansweredQuestions)
      )
        .sort(
          (a, b) =>
            filteredQuestions[b].timestamp - filteredQuestions[a].timestamp
        )
        .map((question, index) => (
          <div className="cardy" key={filteredQuestions[question].qid}>
            <div className="cardy-header">
              <p>{filteredQuestions[question].name} asked:</p>
            </div>
            <div className="cardy-body">
              <img
                className="img-side"
                src={filteredQuestions[question].avatarURL}
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
                        filteredQuestions[question].optionOne.votes.includes(
                          authUserId[0]
                        )
                          ? "button-disabled"
                          : "button"
                      }
                      disabled={
                        filteredQuestions[question].optionOne.votes.includes(
                          authUserId[0]
                        ) ||
                        filteredQuestions[question].optionTwo.votes.includes(
                          authUserId[0]
                        )
                      }
                      onClick={() => {
                        handleAnswer(
                          "optionOne",
                          filteredQuestions[question].qid
                        );
                      }}
                    >
                      {filteredQuestions[question].optionOne.text}{" "}
                      <span>
                        {filteredQuestions[question].optionOne.votes.includes(
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
                    <button
                      type="button"
                      name="Option"
                      className={
                        filteredQuestions[question].optionTwo.votes.includes(
                          authUserId[0]
                        )
                          ? "button-disabled"
                          : "button"
                      }
                      disabled={
                        filteredQuestions[question].optionTwo.votes.includes(
                          authUserId[0]
                        ) ||
                        filteredQuestions[question].optionOne.votes.includes(
                          authUserId[0]
                        )
                      }
                      onClick={() => {
                        handleAnswer(
                          "optionTwo",
                          filteredQuestions[question].qid
                        );
                      }}
                    >
                      {filteredQuestions[question].optionTwo.text}{" "}
                      <span>
                        {filteredQuestions[question].optionTwo.votes.includes(
                          authUserId[0]
                        ) ? (
                          <img src={checker} alt="checker" />
                        ) : (
                          ""
                        )}
                      </span>
                    </button>
                  </li>

                  <li className="second-child">
                    <Link to={`/question/${filteredQuestions[question].qid}`}>
                      {" "}
                      View Poll
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

function mapStateToProps({ authUser, users, questions, dispatch }) {
  return {
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
    answeredQuestions: Object.keys(questions)
      .filter(
        (question) =>
          questions[question].optionOne.votes.includes(authUser) ||
          questions[question].optionTwo.votes.includes(authUser)
      )
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
    UnansweredQuestions: Object.keys(questions)
      .filter(
        (question) =>
          !questions[question].optionOne.votes.includes(authUser) &&
          !questions[question].optionTwo.votes.includes(authUser)
      )
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
export default connect(mapStateToProps)(QuestionCard);
