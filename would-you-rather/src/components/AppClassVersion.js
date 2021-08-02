import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import SignIn from "./SignIn/SignIn";
import Results from "./Results/Results";
import Home from "./Home/Home";
import Page404 from "./Page404/Page404";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import NewQuestion from "./NewQuestion/NewQuestion";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authUser } = this.props;
    return (
      <Router>
        {authUser === null || authUser === "" ? (
          // <Route render={() => <SignIn />} />
          <Route path="/" component={SignIn} />
        ) : (
          <Fragment>
            <div className="container">
              <div>
                <Route path="/" exact component={Home} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/add" component={NewQuestion} />
                <Route  component={Page404} />
                <Route path="/question/:id" component={Results} />
              </div>
            </div>
          </Fragment>
        )}
      </Router>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}
export default connect(mapStateToProps)(App);
