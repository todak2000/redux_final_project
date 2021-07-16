import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
// import Dashboard from './Dashboard'
// import NewTweet from './NewTweet'
// import TweetPage from './TweetPage'
// import Nav from './Nav'
import { LoadingBar } from 'react-redux-loading'  // from react-redux-laoding to handle loader
// import Tweet from './Tweet'


class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div>Hi there</div>
      // <Router>
      //    <Fragment>
      //       <LoadingBar />
      //       <div className="container">
      //         <Nav />
      //         {this.props.loading === true ? 
      //           null 
      //           : 
      //           <div>
      //             <Route path='/' exact component={Dashboard}/>
      //             <Route path='/tweet/:id' component={TweetPage}/>
      //             <Route path='/new' component={NewTweet}/>
      //           </div>
      //         }
      //       </div>
      //    </Fragment>
      // </Router>
    )
  }
}

{/* <TweetPage match={{params: {id:'8xf0y6ziyjabvozdd253nd'}}}/> */}

function mapStateToProps ({authUser}){
  return {
      loading: authUser === null
  }
}
export default connect(mapStateToProps)(App)