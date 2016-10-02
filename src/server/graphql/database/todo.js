import TodoList from '../../database/TodoList'

const getAll = () => TodoList.find()
const getByTitle = (title) => TodoList.find({title: new RegExp(title, 'i')})

const addTodo = (title, description) => {
  const todo = new TodoList({title, description})
  todo.save((err, doc) => console.log(err, doc))
  return todo
}
const editTodo = (id, title, description) => {
  // const todo = TodoList.findByIdAndUpdate(id, {title, description}, {new: true}, (err, res) => console.log(err, res))
  TodoList.update({_id: id}, {title, description}, (err, res) => console.log(err, res))
  return TodoList.findOne({_id: id})
}
const deleteTodo = (id) => {
  TodoList.find({_id: id}).remove((err, doc) => console.log(err, doc))
  return TodoList.find()
}

export {
  getAll,
  getByTitle,
  addTodo,
  editTodo,
  deleteTodo
}
