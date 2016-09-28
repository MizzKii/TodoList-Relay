class Todo {
  constructor(id, title, description) {
    this.id = id
    this.title = title
    this.description = description
  }
}

const todoList = [
  new Todo(1, 'Todo 1', 'To do something.'),
  new Todo(2, 'Todo 2', 'To do something.'),
  new Todo(3, 'Todo 3', 'To do something.'),
]

const getAll = () => todoList

const getByTitle = (title) => {
  const res = []
  for(let i = 0; i < todoList.length; i++) {
    if(todoList[i].title.includes(title)) {
      res.push(todoList[i])
    }
  }
  return res
}

const addTodo = (title, description) => {
  todoList.push(new Todo(todoList[todoList.length - 1].id + 1, title, description))
  return todoList
}

const editTodo = (id, title, description) => {
  for(let i = 0; i < todoList.length; i++) {
    if(todoList[i].id == id) {
      if(title != null) todoList[i].title = title
      if(description != null) todoList[i].description = description
      return todoList[i]
    }
  }
  return null
}

const deleteTodo = (id) => {
  for(let i = 0; i < todoList.length; i++) {
    if(todoList[i].id == id) {
      todoList.splice(i, 1)
    }
  }
  return todoList
}

export {
  getAll,
  getByTitle,
  addTodo,
  editTodo,
  deleteTodo
}
