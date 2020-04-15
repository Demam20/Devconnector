
import React from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import store from './store'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Home from './components/layout/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="landing">
      
      <Route exact path="/" component={Landing} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Footer />
    </div>
    </Router>
    </Provider>
  );
}

export default App;
//testing comment
