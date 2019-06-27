import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = { message: '', selectedFile: null }
  }

  submit() {
    //this.setState({ message: '' })
    const data = new FormData()
    data.append('fileToUpload', this.state.selectedFile)
    axios.post("http://localhost:3001/upload", data, {})
      .then(response => this.setState({ message: 'file uploaded' }))
      .catch(response => this.setState({ message: 'File too large' }))
  }

  changeFile(event) {
    this.setState({ selectedFile: event.target.files[0], loaded: 0 })
  }

  render() {
    return (
      <div>
        <p>Upload a file to the server:</p>
          <input type='file' name='fileToUpload' onChange={this.changeFile.bind(this)} />
          <button onClick={this.submit.bind(this)}>Upload!</button>
        <p></p>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

