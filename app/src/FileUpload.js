import React, { Component } from 'react'
import axios from 'axios'
import './styles.css'

export default class FileUpload extends Component {
  constructor() {
    super()
    this.state = { message: '', selectedFile: null }
  }

  submit() {
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

  changeFile(event) {
    this.setState({ selectedFile: event.target.files[0], loaded: 0 })
  }

  render() {
    return (
      <div className='App'>
        <div>

          <hr />
          <h3>File Uploader</h3>
          <p>Upload a file to the server:</p>
          <input type='file' name='fileToUpload' onChange={this.changeFile.bind(this)} />
          <button onClick={this.submit.bind(this)}>Upload!</button>
          <p></p>
          <p><label id='errorMessage'>{this.state.message}</label></p>

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

