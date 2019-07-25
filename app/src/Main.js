import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import EditTable from './EditTable'
import Misc from './Misc'
import FileUpload from './FileUpload'
import Async from './Async'

function Main() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link> </li>
          <li><Link to="/table">Table Editing</Link> </li>
          <li><Link to="/misc">Misc</Link> </li>
          <li><Link to="/fileupload">File Upload</Link> </li>
          <li><Link to="/async">Async</Link> </li>
        </ul>

      <hr />

        <Route exact path="/" component={Home} />
        <Route path="/table" component={EditTable} />
        <Route path="/misc" component={Misc} />
        <Route path="/fileupload" component={FileUpload} />
        <Route path="/async" component={Async} />
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

export default Main
