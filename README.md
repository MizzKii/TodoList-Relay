This project follow https://github.com/lvarayut/relay-fullstack
for learn and recode to light and simple for understand.

Update
  I make server with graphql, Now It hard for me.

Test
  URL localhost:3000/graphql

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
