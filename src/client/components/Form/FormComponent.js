import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import { Well, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import style from './form.scss'
import FormMutation from './FormMutation'

const FieldGroup = ({id, label, ...props}) => (
  <FormGroup controlId={id} >
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props}/>
  </FormGroup>
)

export default class extends Component {
  static props = {
    viewer: PropTypes.object.isRequered
  }
  state = {
    title: '',
    description: '',
    disabled: false
  }
  handleClear() {
    this.setState({
      title: '',
      description: ''
    })
  }
  handleAdd() {
    if (this.state.tittle === '' || this.state.description === '') return false
    this.setState({disabled: true})
    Relay.Store.commitUpdate(
      new FormMutation({
        title: this.state.title, description: this.state.description, viewerId: this.props.viewer.id
      }
    ), {
      onSuccess: (obj) => {this.setState({disabled: false});this.handleClear.bind(this)()},
      onFailure: () => {this.setState({disabled: false})}
    })
  }
  render() {
    return (
      <Well>
        <ControlLabel>Add Todo</ControlLabel>
        <br /><br />
        <FieldGroup
          id="title"
          label="Title"
          type="text"
          placeholder="Enter title"
          onChange={e => this.setState({title: e.target.value})}
          value={this.state.title}
          disabled={this.state.disabled}
        />
        <FieldGroup
          id="description"
          label="Description"
          type="text"
          placeholder="Enter description"
          onChange={e => this.setState({description: e.target.value})}
          value={this.state.description}
          disabled={this.state.disabled}
        />
        <div className={style.action}>
          <Button onClick={this.handleClear.bind(this)} disabled={this.state.disabled}>
            Clear
          </Button>
          <div className={style.space} />
          <Button bsStyle="primary" onClick={this.handleAdd.bind(this)} disabled={this.state.disabled}>
            Add
          </Button>
        </div>
      </Well>
    )
  }
}
