import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

import { user, users} from './userType'

// root type for query
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user,
    users
  })
})

export default new GraphQLSchema({
  query: queryType,
  // mutation: not now
  // subscription: not now
  // fragment: not now
})
