import mongoose, {Schema, Types} from 'mongoose'

const Todo = new Schema({
  id: { type: Schema.ObjectId, default: Types.ObjectId },
  title: String,
  description: String
})

const TodoList = mongoose.model('TodoList', Todo)

const getAll = () => TodoList.find({})
const getById = id => TodoList.find({id})
const getByTitle = title => TodoList.find({title: new RegExp(title, 'i')})

const insertTodo = (title, description) => {
  const todo = new TodoList({title, description})
  todo.save()
  return todo
}
const updateTodo = (id, title, description) => {
  TodoList.update({ id }, {title, description})
  return TodoList.findOne({ id })
}
const deleteTodo = id => TodoList.find({ id: id.toString() }).remove()

export {
  Todo,
  getAll,
  getById,
  getByTitle,
  insertTodo,
  updateTodo,
  deleteTodo
}
