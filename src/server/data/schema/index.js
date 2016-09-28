import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

import {
  allTodo,
  findTodo,
  addTodo,
  editTodo,
  deleteTodo
} from './todoType'

// root type of query
const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    allTodo,
    findTodo
  })
})

// root type of mutation
const mutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    addTodo,
    editTodo,
    deleteTodo
  })
})

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
  // subscription: not now
  // fragment: not now
})
