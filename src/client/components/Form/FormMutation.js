import Relay from 'react-relay'

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { createTodo }
    `
  }
  getVariables() {
    return {
      title: this.props.title,
      description: this.props.description
    }
  }
  getFatQuery() {
    return Relay.QL`
      fragment on CreateTodoPayload {
        todoEdge
        viewer {
          todos
        }
      }
    `
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'todos',
      edgeName: 'todoEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }]
  }
}
