import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import { Table, Button } from 'semantic-ui-react'
import './styles.css'
import { alwaysItems } from './always-items'

export default class EditTable extends Component {
  initialState = {
    store: alwaysItems,
    row: {
      name: '',
      price: '',
    }
  }

  state = this.initialState
  firstEditable = React.createRef()

  addRow = () => {
    const { store, row } = this.state
    const trimSpaces = string => {
      return string
        .replace(/&nbsp;/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
    }
    const trimmedRow = { ...row, name: trimSpaces(row.name) }

    this.setState({
      store: [...store, trimmedRow],
      row: { ...this.initialState.row, id: store.length + 1 }
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

  handleContentEditable = event => {
    const { row } = this.state
    const {
      currentTarget: { dataset: { column }, },
      target: { value },
    } = event

    this.setState({ row: { ...row, [column]: value } })
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
    const {
      store,
      row: { name, price },
    } = this.state

    const s = store.sort((itemA, itemB) => itemA.name < itemB.name ? -1 : 1);

    return (
      <div className="App">
      <h1>Schedule of Items</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            s.map((row, i) => {
            return (
              <Table.Row key={row.id}>
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
            <Table.Cell className="narrow">
              <Button style={{visibility: row.always ? "hidden": "visible"}} onClick={() => { this.deleteRow(row.id) }} >Delete</Button>
            </Table.Cell>
            </Table.Row>
          )
          })}
          <Table.Row>
            <Table.Cell className="narrow">
              <ContentEditable html={name}
                data-column="name" className="content-editable" innerRef={this.firstEditable}
                onKeyPress={this.disableNewlines} onPaste={this.pasteAsPlainText} onFocus={this.highlightAll} onChange={this.handleContentEditable}
              />
            </Table.Cell>
            <Table.Cell className="narrow">
              <ContentEditable html={price}
                data-column="price" className="content-editable"
                onKeyPress={this.validateNumber} onPaste={this.pasteAsPlainText} onFocus={this.highlightAll} onChange={this.handleContentEditable}
              />
            </Table.Cell>
            <Table.Cell className="narrow">
              <Button onClick={this.addRow}>Add</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
  }
}

// disabled={!name || !price}
