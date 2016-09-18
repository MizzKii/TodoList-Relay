<pre>This project follow https://github.com/lvarayut/relay-fullstack
for learn and recode to light and simple for understand.</pre>

<h4>Update</h4>
<pre>  I make server with graphql, Now It hard for me.</pre>

<h4>Test</h4>
<pre>  URL localhost:3000/graphql

  {
    user (id: "2") {
      id
      username
      email
      sex
    }
  }

  {
    users {
      edges {
        node {
          id
          username
          email
          sex
        }
      }
    }
  }
</pre>
