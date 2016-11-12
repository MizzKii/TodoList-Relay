import React, { Component, PropTypes } from 'react'
import { Well } from 'react-bootstrap'
import style from './todolist.scss'
import { Todo } from '../'

export default class extends Component {
  static props = {
    todos: PropTypes.object.isRequired
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos
  }
  render() {
    return (
      <Well className={style.todolist}>
        {this.props.todos.edges.map(({node}) => node).map((todo) => <Todo key={todo.id} todo={todo} viewerID={this.props.viewerID} />)}
      </Well>
    )
  }
}
