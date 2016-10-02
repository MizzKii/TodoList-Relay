import mongoose, {Schema} from 'mongoose'

const todoList = new Schema({
  title: String,
  description: String
})

const TodoList = mongoose.model('TodoList', todoList)

export default TodoList
