import React, { Component } from 'react'
import Landing from './Landing'
import '../../App.css'
import Navbar from './Navbar'

export default class Home extends Component {
  render() {
    
    return (
      <div className="landing">
      
      <Landing history={this.props.history}/>

      
    </div>
    )
  }
}
