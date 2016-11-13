import assert from 'assert'
import { tester } from 'graphql-tester'

// config tester
const test = tester({
  url: 'http://localhost:3000/graphql'
});
(async () => {
  let todoID = ''
  // case 1 test about insert todo item
  test(`
    mutation {
      createTodo(input: {title: "Title Test", description: "Description Test"}) {
        todoEdge {
          node {
            id
            title
            description
          }
        }
      }
    }
  `).then((response) => {
    console.log('Case 1: Start.')
    console.log('Input: {title: "Title Test", description: "Description Test"}')
    assert(response.success === true)
    console.log(`Connect's success: OK!`)
    assert(response.status === 200)
    console.log(`Status's 200: OK!`)
    assert(response.data.createTodo.todoEdge.node.title === 'Title Test')
    console.log(`Title's same input: OK!`)
    assert(response.data.createTodo.todoEdge.node.description === 'Description Test')
    console.log(`Description's same input: OK!\nCase 1: Success.\n`)
    todoID = response.data.createTodo.todoEdge.node.id
  }).catch(e => console.error('Case 1: fail!!!\n'))

  // case 2 test search todo by title
  await test(`
    query {
      viewer {
        todo(title: "Title Test") {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    }
  `).then((response) => {
    console.log('Case 2: Start.')
    console.log('Input: {title: "Title Test"}')
    assert(response.success === true)
    console.log(`Connect's success: OK!`)
    assert(response.status === 200)
    console.log(`Status's 200: OK!`)
    assert(response.data.viewer.todo.edges.find(edge => edge.node.id === todoID).node.id === todoID)
    console.log(`Todo id's same case 1: OK!\nCase 2: Success.\n`)
  }).catch(e => console.error('Case 2: fail!!!\n'))

  // case 3 test about delete todo item
  test(`
    mutation {
      deleteTodo(input: {todoID: "${todoID}"}) {
        viewer {
          todos {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  `).then((response) => {
    console.log('Case 3: Start.')
    console.log(`Input: ${todoID}`)
    assert(response.success === true)
    console.log(`Connect's success: OK!`)
    assert(response.status === 200)
    console.log(`Status's 200: OK!`)
    assert(response.data.deleteTodo.viewer.todos.edges.filter(edge => edge.node.id == todoID).length === 0)
    console.log(`Don't have todo's same input: OK!\nCase 3: Success.\n`)
  }).catch(e => console.error('Case 3: fail!!!\n'))
})()
