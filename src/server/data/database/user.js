class User {
  constructor(id, username, email, sex) {
    this.id = id
    this.username = username
    this.email = email
    this.sex = sex
  }
}

const userList = [
  new User('1', 'User1', 'user1@mail.com', 'm'),
  new User('2', 'User2', 'user2@mail.com', 'f'),
  new User('3', 'User3', 'user3@mail.com', 'm'),
  new User('4', 'User4', 'user4@mail.com', 'f')
]

const getUser = (id) => userList.find(i => i.id == id)

const getUserAll = () => userList

export {
  getUser,
  getUserAll
}
