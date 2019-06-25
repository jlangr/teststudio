import React, { Component } from 'react'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div>
        <p>Upload a file to the server:</p>
        <form ref='uploadForm'
              id='uploadForm'
              action='http://localhost:3001/upload'
              method='post'
              encType='multipart/form-data'>
          <input type='file' name='fileToUpload' />
          <input type='submit' value='Upload!' />
        </form>
      </div>
    )
  }
}
