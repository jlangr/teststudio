import React, { Component } from 'react'
import axios from 'axios'
import './styles.css'

export default class Async extends Component {
  constructor() {
    super()
    this.state = { message: '', info: '' }
  }

  retrieveInfo() {
    this.setState({ info: '... retrieving ...' })
    axios.get("http://localhost:3001/info")
      .then(response => {
        this.setState({ info: response.data })
      })
      .catch(response => {
        this.setState({ info: 'Unable to retrieve info' })
      })
  }

  render() {
    return (
      <div className='App'>
        <h3>Dealing With Asynchronicity</h3>
        <button onClick={this.retrieveInfo.bind(this)}>Submit</button>
        <p>{this.state.info}</p>

        <h3>Disclaimers</h3>
        <p>Ipsum dorum ...</p>
        <p>Ipsum dorum ...</p>
        <p>Ipsum dorum ...</p>
        <p>Ipsum dorum ...</p>
        <p>Ipsum dorum ...</p>
        <p>Ipsum dorum ...</p>
        <p>Ipsum dorum ...</p>
        <p>Ipsum dorum ...</p>
      </div>
    )
  }
}
