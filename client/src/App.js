import React from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import store from './store'
import PrivateRoute from './components/common/PrivateRoute';
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import { Component } from 'react';
import setAuthToken from './utils/setAuthToken';



import Posts from './components/posts/Posts';
import Post from './components/post/Post';


import { SET_CURRENT_USER } from './actions/types';
import Profiles from './components/profiles/Profiles'
import jwt_decode from 'jwt-decode'
import { logoutUser } from './actions/authActions';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/layout/Home'
import EditProfile from './components/edit-profile/EditProfile';
import CreateProfile from './components/create-profile/CreateProfile';
import Profile from './components/profile/Profile';

if(localStorage.jwtToken) {
  //Decode
  const decoded = jwt_decode(localStorage.jwtToken)


  //check for expired token
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime) {
    //token expired so logout the user - clear the redux, local storage
    store.dispatch(logoutUser())
    //redirect to login
    window.location.href = '/'
  }

  //set Auth Header
  setAuthToken(localStorage.jwtToken)
  
  //Dispatch call
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  })
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>

      <div>
      
        <Route exact path="/" component={Home} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:user_id" component={Profile}/>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
          <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
          </div>

      {/* <div className="landing">
      <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
         */}
        {/* <Route exact path="/dashboard" component={Navbar} /> */}

        <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
        
        <Footer />
      </div>
      </Router>
      </Provider>
    );
  }
  
}

export default App;
