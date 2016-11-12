import React, { Component, PropTypes } from 'react'
import style from './app.scss'

export default class extends Component {
  static props = {
    viewer: PropTypes.object.isRequired
  }
  render() {
    return (
      <app>
        <div className={style.container}>
          <span className={style.title}>Total todo {this.props.viewer.todos.edges.length} item</span>
          {this.props.children}
        </div>
      </app>
    )
  }
}
