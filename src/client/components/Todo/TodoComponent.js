import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import { Panel } from 'react-bootstrap'
import TodoMutation from './TodoMutation'

export default class extends Component {
  static props = {
    todo: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequred
  }
  handleDelete() {
    Relay.Store.commitUpdate(
      new TodoMutation({todoID: this.props.todo.id, viewerID: this.props.viewerID})
    )
  }
  render() {
    const { title, description } = this.props.todo
    return (
      <Panel onClick={this.handleDelete.bind(this)}>
        <label>{title}</label><br/>
        <span>{description}</span>
      </Panel>
    )
  }
}
