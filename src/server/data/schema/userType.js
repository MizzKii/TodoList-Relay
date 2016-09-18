import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  globalIdField
} from 'graphql-relay'

import { getUser, getUserAll } from '../database/user'

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User description',
  fields: () => ({
    id: globalIdField('User'),
    username: {
      type: GraphQLString,
      description: 'Users\'s username'
    },
    email: {
      type: GraphQLString,
      description: 'User\'s e-mail'
    },
    sex: {
      type: GraphQLString,
      description: 'User\'s sex'
    }
  })
})

const { connectionType: userConnection } = connectionDefinitions({ name: 'User', nodeType: userType });

const users = {
  type: userConnection,
  args: connectionArgs,
  resolve: (_, args) => connectionFromArray(getUserAll(), args)
}

const user = {
  type: userType,
  args: {
    id: {
      description: `User's ID`,
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (value, { id }) => getUser(id)
}

export {
  user,
  users
}
