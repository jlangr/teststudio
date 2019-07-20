import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Main from './Main'
import registerServiceWorker from './registerServiceWorker'

const Root = () => (
  <div>
    <Main/>
  </div>)

ReactDOM.render(Root(), document.getElementById('root'))
registerServiceWorker()
