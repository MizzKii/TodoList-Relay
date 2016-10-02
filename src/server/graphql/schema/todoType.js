import {
  GraphQLNonNull,
  GraphQLUnionType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import {
  getAll,
  getByTitle,
  addTodo as addTodoItem,
  editTodo as editTodoItem,
  deleteTodo as deleteTodoItem
} from '../database/todo'

const Todo = new GraphQLObjectType({
  name: 'Todo',
  description: 'todo item description',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString, description: 'title for todo item' },
    description: { type: GraphQLString, description: 'description for todo item' }
  })
})

const allTodo = {
  type: new GraphQLList(Todo),
  description: `get all todo list`,
  resolve: () => getAll()
}

const findTodo = {
  type: new GraphQLList(Todo),
  description: `find by title`,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (root, {title}) => getByTitle(title)
}

const addTodo = {
  type: Todo,
  description: `new todo item`,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString }
  },
  resolve: (root, {title, description}) => addTodoItem(title, description)
}

const editTodo = {
  type: Todo,
  description: `edit todo item`,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLString },
    description: { type: GraphQLString }
  },
  resolve: (root, {id, title, description}) => editTodoItem(id, title, description)
}

const deleteTodo = {
  type: new GraphQLList(Todo),
  description: `delete todo item`,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (root, {id}) => deleteTodoItem(id)
}

export {
  allTodo,
  findTodo,
  addTodo,
  editTodo,
  deleteTodo
}
