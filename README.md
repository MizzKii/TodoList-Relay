<h3>TodoList with relay</h3>

<h4>Requirement</h4>
<pre>
  node.js (recommend v6.6.0)
  npm (recommend v3.10.8)
</pre>

<h4>Dependency</h4>
<pre>
  babel
  express
  express-graphql
  graphql
</pre>

<h4>Update</h4>
<pre>  I make graphql for TodoList.
you can test on URL `http://localhost:3000/graphql`</pre>

<h4>Query</h4>
<u>example</u>
<pre>
  query {
    findTodo(title: "Todo 1") {
      id
      title
      description
    }
    allTodo {
      id
      title
      description
    }
  }
</pre>

<h4>Mutation</h4>
<u>example</u>
<pre>
  mutation {
    addTodo (title: "new 4", description: "To do something.") {
      id
      title
      description
    }
    editTodo (id: 4, title: "Todo 4", description: "Edit now") {
      id
      title
      description
    }
    deleteTodo(id: 4) {
      id
      title
      description
    }
  }
</pre>

<pre>Thank https://github.com/lvarayut/relay-fullstack
This project for learn.</pre>
