import React, { useState } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import QuestionCard from "./QuestionCard";

function Home(props) {
  const [toggleAnswered, setToggleAnswered] = useState(false);

  const HeaderToggle = () => {
    const answeredTitle = "Answered Polls";
    const unansweredTitle = "Unanswered Polls";
    return (
      <div className="header-flexy">
        <button
          className={
            toggleAnswered !== true ? "active-header-tab" : "header-tab"
          }
          onClick={() => {
            setToggleAnswered(false);
          }}
        >
          {unansweredTitle}
        </button>
        <button
          className={
            toggleAnswered === true ? "active-header-tab" : "header-tab"
          }
          onClick={() => {
            setToggleAnswered(true);
          }}
        >
          {answeredTitle}
        </button>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      {HeaderToggle()}
      <div className="card-flexy">
        {toggleAnswered ? (
          <QuestionCard toggleAnswered={toggleAnswered} />
        ) : (
          <QuestionCard toggleAnswered={toggleAnswered} />
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Home);
// function that collect data from store and maps to the dashboard component
function mapStateToProps({ authUser, users}) {
  return {
    userIds: Object.keys(users).map((user) => user),
  };
}
