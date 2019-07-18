import Promise from 'es6-promise'
import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = { message: '', selectedFile: null }
  }

  submit() {
    console.log('submitting request')
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

  validate(event) {
    const email = event.target.value
    const emailRegex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

    if (!emailRegex.test(email))
      this.setState({ message: 'invalid email' })
    else
      this.setState({ message: '' })
  }

  render() {
    return (
      <div>
        <hr />
           <p>Your email: <input type='text' id='email' onKeyUp={this.validate.bind(this)} /></p>
        <hr />
            <p>Upload a file to the server:</p>
            <input type='file' name='fileToUpload' onChange={this.changeFile.bind(this)} />
            <button onClick={this.submit.bind(this)}>Upload!</button>


            <p></p>

            <p><label id='errorMessage'>{this.state.message}</label></p>
      </div>
    )
  }
}

