import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID
} from 'graphql'
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions
} from 'graphql-relay'
import {
  connectionFromMongooseQuery
} from 'relay-mongodb-connection'
import {
  Todo,
  getAll,
  getById,
  getByTitle,
  insertTodo,
  updateTodo,
  deleteTodo
} from '../database/todo'
import {
  Viewer,
  getViewer
} from '../database/viewer'

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId)
    console.log(type, id)
    if (type === 'Todo') {
      return getById(id)
    } else if (type === 'Viewer') {
      return getViewer()
    }
    return null
  },
  (obj) => {
    if (obj instanceof Todo) {
      return todoType
    } else if (obj instanceof Viewer) {
      return viewerType
    }
    return null
  }
)

const todoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'todo item description',
  fields: () => ({
    id: globalIdField('Todo'),
    title: { type: GraphQLString, description: 'title for todo item' },
    description: { type: GraphQLString, description: 'description for todo item' }
  }),
  interfaces: [nodeInterface]
})

const {connectionType: todoConnection, edgeType: todoEdge} = connectionDefinitions({name: 'Todo', nodeType: todoType})

// parent of todo
const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Parent of todo queries.',
  fields: () => ({
    id: globalIdField('Viewer'),
    todo: {
      name: 'Todo',
      type: todoConnection,
      description: `find by title`,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        ...connectionArgs
      },
      resolve: (_, args) => connectionFromMongooseQuery(getByTitle(args.title), args)
    },
    todos: {
      name: 'Todos',
      type: todoConnection,
      description: `get all todo list`,
      args: connectionArgs,
      resolve: (_, args) => connectionFromMongooseQuery(getAll(), args)
    }
  }),
  interfaces: [nodeInterface]
})

const createTodoMutation = mutationWithClientMutationId({
  name: 'CreateTodo',
  inputFields: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: new GraphQLNonNull(GraphQLString)}
  },
  outputFields: {
    todoEdge: {
      type: todoEdge,
      resolve: (obj) => ({node: obj, cursor: connectionFromMongooseQuery(getAll(), obj)})
    },
    viewer: {
      type: viewerType,
      resolve: () => getViewer()
    }
  },
  mutateAndGetPayload: ({title, description}) => insertTodo(title, description)
})

const deleteTodoMutation = mutationWithClientMutationId({
  name: 'DeleteTodo',
  inputFields: {
    todoID: { type: GraphQLID }
  },
  outputFields: {
    viewer: {
      type: viewerType,
      resolve: () => getViewer()
    },
    todoID: {
      type: GraphQLID,
      resolve: todos => todos.id
    }
  },
  mutateAndGetPayload: ({todoID}) => deleteTodo(fromGlobalId(todoID).id)
})

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      node: nodeField,
      viewer: {
        type: viewerType,
        resolve: () => getViewer()
      }
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createTodo: createTodoMutation,
        // editTodo: {
        //   type: todoType,
        //   description: `edit todo item`,
        //   args: {
        //     id: { type: new GraphQLNonNull(GraphQLString) },
        //     title: { type: GraphQLString },
        //     description: { type: GraphQLString }
        //   },
        //   resolve: (root, {id, title, description}) => editTodoItem(id, title, description)
        // },
        deleteTodo: deleteTodoMutation
    })
  })
})
