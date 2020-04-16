
import React from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import store from './store'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'

import Register from './components/auth/Register'


function App() {
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

export default App;
//testing comment
