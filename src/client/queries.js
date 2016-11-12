import Relay from 'react-relay'

export const viewerQuery = {
  viewer: Component => Relay.QL`
    query {
      viewer { ${Component.getFragment('viewer')} }
    }
  `
}
