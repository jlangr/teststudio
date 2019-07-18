import Promise from 'es6-promise'
import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = { 
      message: '', 
      selectedFile: null, 
      dueDate: '' }
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

  checkout(event) {
    const due = this.addDays(new Date(), 21)
    this.setState({ dueDate: this.formatDate(due) })
  }

  formatDate(date=new Date(), separator='/') {
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    const yyyy = date.getFullYear()

    if (dd < 10) dd='0'+dd
    if (mm < 10) mm='0'+mm

    return mm + separator + dd + separator + yyyy
 }

  addDays(fromDate, days) {
    var date = new Date(fromDate.valueOf())
    date.setDate(fromDate.getDate() + days);
    return date;
  }

  render() {
    return (
      <div>
        <hr />
           <h3>Email Validator</h3>
           <p>Your email: <input type='text' id='email' onKeyUp={this.validate.bind(this)} /></p>
        <hr />
           <h3>File Uploader</h3>
            <p>Upload a file to the server:</p>
            <input type='file' name='fileToUpload' onChange={this.changeFile.bind(this)} />
            <button onClick={this.submit.bind(this)}>Upload!</button>


            <p></p>

            <p><label id='errorMessage'>{this.state.message}</label></p>

        <hr />
        <hr />
            <h3>Library System</h3>
            <p>today is {this.formatDate()}</p>
            <p>your book is due ... {this.state.dueDate}</p>
            <button onClick={this.checkout.bind(this)}>Check Out book</button>
            <p></p>
      </div>
    )
  }
}

