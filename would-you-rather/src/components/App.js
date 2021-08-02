import React, { useEffect, Fragment, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import SignIn from "./SignIn/SignIn";
import Results from "./Results/Results";
import Home from "./Home/Home";
import Page404 from "./Page404/Page404";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import NewQuestion from "./NewQuestion/NewQuestion";

function App(props) {
  const { authUser, dispatch } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authUser !== null || authUser !== "") {
      dispatch(handleInitialData());
      setUser(authUser);
    }
  }, [authUser, user, dispatch]);

  return (
    <Router>
      {!user ? (
        <Route render={() => <SignIn />} />
      ) : (
        <Fragment>
          <div className="container">
            <div>
              <Route path="/" exact component={Home} {...props} user={user} />
              <Route
                path="/leaderboard"
                component={LeaderBoard}
                {...props}
                user={user}
              />
              <Route
                path="/add"
                component={NewQuestion}
                {...props}
                user={user}
              />
              <Route path="/404" component={Page404} {...props} user={user} />
              <Route
                path="/question/:id"
                component={Results}
                {...props}
                user={user}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Router>
  );
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}
export default connect(mapStateToProps)(App);
