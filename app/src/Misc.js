import React, { Component } from 'react'
import axios from 'axios'
import Modal from './Modal'
import './styles.css'

export default class Misc extends Component {
  constructor() {
    super()
    this.state = { 
      message: '', 
      selectedFile: null, 
      dueDate: '',
      findme1: '',
      isOpen: false
    }
    this.findme1Click.bind(this)
  }

  submit() {
    console.log('submitting request')
    //this.setState({ message: '' })
    let data
    if (typeof FormData == "undefined") {
      data = []
      data.push('fileToUpload', this.state.selectedFile)
    }
    else{
      data = new FormData()
      data.append('fileToUpload', this.state.selectedFile)
    }
    axios.post("http://localhost:3001/upload", data, {})
      .then(response => { 
        console.log('success')
        this.setState({ message: 'file uploaded' })
      })
      .catch(response => {
        console.log('fail', response)
        this.setState({ message: 'File too large' })
      })
  }

  toggleModal = () => {
    console.log("toggle modal")
    this.setState({
      isOpen: !this.state.isOpen
    });
    console.log(this.state.isOpen)
  }

  changeFile(event) {
    this.setState({ selectedFile: event.target.files[0], loaded: 0 })
  }

  showConfirm() {
console.log('SHOWCONFIRM')
    let msg = document.getElementById('messageResult')
console.log("messageResult:", msg)
    if (!msg)
      return

    msg.innerText = ""

    let Args = new Object()
    Args.opener = window
    Args.message = "Do you want to continue?"
    
    const blnCnfrmDelete = window.showModalDialog("ConfirmYesNo.htm", Args, "resizable:no; dialogHeight:170px; dialogWidth:300px; status:no")
        
    if (blnCnfrmDelete)
      msg.innerText = "true"
    else
      msg.innerText = "false"
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
      <div className='App'>
        <div>
          <div>
            <button onClick={this.toggleModal}>
              Open the modal
             </button>

            <Modal show={this.state.isOpen}
              onClose={this.toggleModal}>
              Here's some content for the modal
            </Modal>        
          </div>
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

        <hr />
        <h3>File Uploader</h3>

        <div style={{ margin: 'auto', textAlign: 'left' }}>
           <input type='button' id='btnConfirm' style={{ width: '120px' }} name='btnConfirm' value='Show Confirm' onClick={this.showConfirm} tabIndex='1' />
        </div>
        <div id='messageResult'>
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

