
import React,{Component} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import store from './store'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'

import Register from './components/auth/Register'
import setAuthToken from './utillites/setAuthTo';
import { SET_CURRENT_USER } from './actions/types';
import jwt_decode from 'jwt-decode';
import { logoutUser } from './actions/authAction';

if(localStorage.jwtToken){
//decode token
const decoded = jwt_decode(localStorage.jwtToken);
  //check for expired token
const currentTime=Date.now()/1000;
if(decoded.exp < currentTime) {
  //Logout action
store.dispatch(logoutUser());
//redirect to lading page
  window.location.href = '/';
}

  //set auth header
  setAuthToken(localStorage.jwtToken);
  //dispatch call to write data to the store
  store.dispatch({
    type:SET_CURRENT_USER,
    payload: decoded
  });
}


class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="landing">
        
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        
        <Footer />
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
//testing comment
