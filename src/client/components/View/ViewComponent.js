import React, { Component, PropTypes } from 'react'
import { Col } from 'react-bootstrap'
import { Form, TodoList } from '../'

export default class extends Component {
  static props = {
    viewer: PropTypes.object.isRequred,
    relay: PropTypes.object.isRequred
  }
  render() {
    return (
      <div>
        <Col xs={6}>
          <Form viewer={this.props.viewer} />
        </Col>
        <Col xs={6}>
          <TodoList todos={this.props.viewer.todos} viewerID={this.props.viewer.id} />
        </Col>
      </div>
    )
  }
}
