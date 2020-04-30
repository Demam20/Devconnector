import React, { Component } from 'react'

class Sample extends Component {
  constructor(props){
    super(props)
    this.state={
      toggleView: false,
      nameClass:''
    }
    this.onClick = this.onClick.bind(this)
  }  

  onClick() {
    this.setState({
      toggleView: !this.state.toggleView
    })
    
  }

  render() {
    return (
      <div>
        <button className={(this.state.toggleView)? "fas fa-bookmark" : "far fa-bookmark"} onClick={this.onClick}></button>
      </div>
    )
  }
}
export default Sample
