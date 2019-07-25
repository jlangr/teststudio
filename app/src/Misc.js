import React, { Component } from 'react'
import Modal from './Modal'
import './styles.css'

export default class Misc extends Component {
  constructor() {
    super()
    this.state = { 
      message: '', 
      dueDate: '',
      findme1: '',
      isOpen: false
    }
    this.findme1Click.bind(this)
  }

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  showConfirm() {
    let msg = document.getElementById('messageResult')
    if (!msg)
      return

    msg.innerText = ""

    const Args = { opener: window, message: 'Continue?'}
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

        <hr />
        <h3>Confirm Popup</h3>

        <div style={{ margin: 'auto', textAlign: 'left' }}>
           <input type='button' id='btnConfirm' style={{ width: '120px' }} name='btnConfirm' value='Show Confirm' onClick={this.showConfirm} tabIndex='1' />
        </div>
        <div id='messageResult'>
        </div>

        <hr />

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

