import Relay from 'react-relay'

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { deleteTodo }
    `
  }
  getVariables() {
    return {
      todoID: this.props.todoID
    }
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteTodoPayload {
        todoID
        viewer
      }
    `
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewerID,
      connectionName: 'todo',
      deletedIDFieldName: 'todoID'
    }]
  }
  getOptimisticResponse () {
    return {
      todoID: this.props.todoID,
    }
  }
}
