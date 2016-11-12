import Relay from 'react-relay'
import TodoList from './TodoListComponent'
import { Todo } from '../'

export default Relay.createContainer(TodoList, {
  fragments: {
    todos: () => Relay.QL`
      fragment on TodoConnection {
        edges {
          node {
            id
            ${Todo.getFragment('todo')}
          }
        }
      }
    `
  }
})
