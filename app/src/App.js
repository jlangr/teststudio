import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = { 
      message: '', 
      selectedFile: null, 
      dueDate: '',
      findme1: '',
    }
    this.findme1Click.bind(this)
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
    this.setState({ dueDate: this.formatDate(due) + " " })
  }

  formatDate(date=new Date(), separator='/') {
    const dd = date.getDate()
    const mm = date.getMonth() + 1
    const yyyy = date.getFullYear()

    const dayOfWeek = date.getDay()
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return daysOfWeek[dayOfWeek] + ' ' + mm + separator + dd + separator + yyyy
 }

  addDays(fromDate, days) {
    var date = new Date(fromDate.valueOf())
    date.setDate(fromDate.getDate() + days);
    return date;
  }

  findme1Click(message1) {
    this.setState({ findme1: message1 })
  }

  render() {
    return (
      <div>
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
              <h3>Library System</h3>
              <p>today is {this.formatDate()}</p>
              <p>your book is due: </p>
              <div id="dueDate"><p>{this.state.dueDate}</p></div>
              <button onClick={this.checkout.bind(this)}>Check Out book</button>
        </div>

        <div id="duplicateId">
          <hr />
          <h3>Oh no, duplicate ID</h3>
          <div id="patientName">
            <h4>Patient Name</h4>
            <input type="text" />
            <button onClick={e => this.findme1Click("sorry, maybe next time")}>Submit</button><br />
          </div>
          <div id="operatingRoomName">
            <h4>Operating Room Name</h4>
            <input type="text" />
            <button onClick={e => this.findme1Click("you have chosen wisely!")}>Submit</button>
          </div>
          <p><label>{this.state.findme1}</label></p>
          <hr />
          <hr />
        </div>

        <div id="">
        <h3></h3>
        </div>

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

