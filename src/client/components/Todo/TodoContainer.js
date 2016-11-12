import Relay from 'react-relay'
import Todo from './TodoComponent'

export default Relay.createContainer(Todo, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        id
        title
        description
      }
    `
  }
})
