import React from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";

function LeaderBoard(props) {
  const { leadersBoard } = props;

  return (
    <div>
      <Navbar />

      {Object.keys(leadersBoard)
        .sort((a, b) => leadersBoard[b].total - leadersBoard[a].total)
        .map((user, index) => (
          <div className="card-flexy" key={leadersBoard[user].userId}>
            <div className="cardy">
              <div className="cardy-body">
                <div className="img-div">
                  <img
                    className="img-side"
                    src={leadersBoard[user].avatarURL}
                    alt="user"
                  />
                </div>
                <div className="poll-side">
                  <h3>{leadersBoard[user].name}</h3>
                  <div className="inner-flex">
                    <p>Answered Polls</p>
                    <p>{leadersBoard[user].sumOfAnswers}</p>
                  </div>
                  <div className="inner-flex">
                    <p>Created Polls</p>
                    <p>{leadersBoard[user].sumOfQuestions}</p>
                  </div>
                </div>
                <div className="score-div">
                  <p className="score-header">Score</p>
                  <p className="score-value">{leadersBoard[user].total}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default connect(mapStateToProps)(LeaderBoard);
// function that collect data from store and maps to the dashboard component
function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users).map((user) => user),
    users: users,
    leadersBoard: Object.keys(users).map(
      (user) =>
        (user = {
          userId: users[user].id,
          avatarURL: users[user].avatarURL,
          name: users[user].name,
          sumOfQuestions: users[user].questions.length,
          sumOfAnswers: Object.keys(users[user].answers).length,
          total:
            users[user].questions.length +
            Object.keys(users[user].answers).length,
        })
    ),
  };
}
