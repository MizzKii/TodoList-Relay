import Relay from 'react-relay'
import View from './ViewComponent'
import { Form, TodoList } from '../'

export default Relay.createContainer(View, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        ${Form.getFragment('viewer')}
        todos (first: 1000) {
          ${TodoList.getFragment('todos')}
        }
      }
    `
  }
})
