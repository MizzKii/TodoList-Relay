import Relay from 'react-relay'
import Form from './FormComponent'

export default Relay.createContainer(Form, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `
  }
})
