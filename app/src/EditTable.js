import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import { Table, Button } from 'semantic-ui-react'
import './styles.css'
import { alwaysItems, newAlwaysItems } from './always-items'

let items = alwaysItems
//items = newAlwaysItems

export default class EditTable extends Component {
  state = { store: items, name: '', price: '' }
  firstEditable = React.createRef()

  trimSpaces(s) {
    return s.replace(/&nbsp;/g, '').replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<')
  }

  addRow = () => {
    const { store, name, price } = this.state
    const newRow = { name: this.trimSpaces(name), price, id: store.length + 1 }

    this.setState({
      store: [...store, newRow],
      name: '',
      price: ''
    })

    this.firstEditable.current.focus()
  }

  deleteRow = id => {
    const { store } = this.state
    this.setState({ store: store.filter(item => id !== item.id) })
  }

  disableNewlines = event => {
    const keyCode = event.keyCode || event.which
    if (keyCode === 13) {
      event.returnValue = false
      if (event.preventDefault) event.preventDefault()
    }
  }

  validateNumber = event => {
    const keyCode = event.keyCode || event.which
    const string = String.fromCharCode(keyCode)
    const regex = /[0-9,]|\./

    if (!regex.test(string)) {
      event.returnValue = false
      if (event.preventDefault) event.preventDefault()
    }
  }

  pasteAsPlainText = event => {
    event.preventDefault()
    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  highlightAll = () => {
    setTimeout(() => {
      document.execCommand('selectAll', false, null)
    }, 0)
  }

  updateState = event => {
    const key = event.target.id
    let value = event.target.value
    value = (key === 'name' && value) ? value.toLowerCase() : value
    this.setState({ [key]: value })
  } 

  handleContentEditableUpdate = event => {
    const { store } = this.state

    const {
      currentTarget: {
        dataset: { row, column },
      },
      target: { value },
    } = event

    let updatedRow = store.filter((item, i) => parseInt(i) === parseInt(row))[0]
    updatedRow[column] = value

    this.setState({ store: store.map(item => (item[column] === row ? updatedRow : item)), })
  }

  render() {
    const { store } = this.state 
    const s = store.sort((itemA, itemB) => itemA.name < itemB.name ? -1 : 1);

    return (
      <div className="App">
      <h1>Schedule of Items</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Retail Price</Table.HeaderCell>
            <Table.HeaderCell>w/ Markup</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            s.map((row, i) => {
            return (
              <Table.Row id={row.id} key={row.id}>
              <Table.Cell className="narrow">
              <ContentEditable
                html={row.name}
                data-column="name" data-row={i} className="content-editable"
                onKeyPress={this.disableNewlines} onPaste={this.pasteAsPlainText} onFocus={this.highlightAll} onChange={this.handleContentEditableUpdate}
              />
            </Table.Cell>
            <Table.Cell className="narrow">
              <ContentEditable html={row.price.toString()}
                data-column="price" data-row={i} className="content-editable"
                onKeyPress={this.validateNumber} onPaste={this.pasteAsPlainText} onFocus={this.highlightAll} onChange={this.handleContentEditableUpdate}
              />
            </Table.Cell>
            <Table.Cell>
              <span id={'calculatedAmount-'+row.id}>{(row.price * 2.5).toFixed(2)}</span>
            </Table.Cell>
            <Table.Cell className="narrow">
              <Button style={{visibility: row.always ? "hidden": "visible"}} onClick={() => { this.deleteRow(row.id) }} >Delete</Button>
            </Table.Cell>
            </Table.Row>
          )
          })}
        </Table.Body>
      </Table>

      <div>
        <label>Name</label>
        <input type="text" id="name" className="content-editable"
          onKeyPress={this.disableNewlines} onFocus={this.highlightAll} onChange={this.updateState} />

        <label>Price</label>
        <input type="text" id="price" className="content-editable"
          onKeyPress={this.validateNumber} onFocus={this.highlightAll} onChange={this.updateState} />
        <Button onClick={this.addRow}>Add</Button>
      </div>
    </div>
  )
  }
}
