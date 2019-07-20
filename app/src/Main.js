import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import EditTable from './EditTable'
import Misc from './Misc'

function Main() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link> </li>
          <li><Link to="/table">Table Editing</Link> </li>
          <li><Link to="/misc">Misc</Link> </li>
        </ul>

      <hr />

        <Route exact path="/" component={Home} />
        <Route path="/table" component={EditTable} />
        <Route path="/misc" component={Misc} />
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
