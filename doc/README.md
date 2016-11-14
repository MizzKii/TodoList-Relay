<h2>Documentation</h2>
<h3>File layout</h3>
<pre>
  .
  ├── README.md
  ├── doc
  │   ├── README.md
  │   ├── TestCase.md
  │   └── assets
  │       ├── Screen.png
  │       └── ScreenGraphql.png
  ├── package.json
  ├── src
  │   ├── client
  │   │   ├── components
  │   │   │   ├── App
  │   │   │   │   ├── AppComponent.js
  │   │   │   │   ├── AppContainer.js
  │   │   │   │   └── app.scss
  │   │   │   ├── Form
  │   │   │   │   ├── FormComponent.js
  │   │   │   │   ├── FormContainer.js
  │   │   │   │   ├── FormMutation.js
  │   │   │   │   └── form.scss
  │   │   │   ├── Todo
  │   │   │   │   ├── TodoComponent.js
  │   │   │   │   ├── TodoContainer.js
  │   │   │   │   └── TodoMutation.js
  │   │   │   ├── TodoList
  │   │   │   │   ├── TodoListComponent.js
  │   │   │   │   ├── TodoListContainer.js
  │   │   │   │   └── todolist.scss
  │   │   │   ├── View
  │   │   │   │   ├── ViewComponent.js
  │   │   │   │   └── ViewContainer.js
  │   │   │   └── index.js
  │   │   ├── index.js
  │   │   ├── queries.js
  │   │   └── routes.js
  │   ├── index.js
  │   ├── plugins
  │   │   ├── babelRelayPlugin.js
  │   │   ├── schema.graphql
  │   │   └── schema.json
  │   ├── scripts
  │   │   └── updateSchema.js
  │   └── server
  │       ├── config
  │       │   ├── environments
  │       │   │   ├── development.js              // Config in development
  │       │   │   └── production.js               // Config in production
  │       │   └── index.js                        // Main config
  │       ├── database
  │       │   ├── index.js                        // Config and connect
  │       │   ├── todo.js                         // Todo schema from database
  │       │   └── viewer.js                       // viewer schema
  │       ├── index.js                            // Main server
  │       ├── schema
  │       │   └── index.js                        // Main schema
  │       └── ssr.js                              // Middleware for rendering
  ├── test
  │   └── graphqlServer.js
  ├── webpack.config.js
  └── yarn.lock
</pre>
<h3>Install</h3>
  The first time you will install dependencies first.
<pre>
  npm i
</pre>
<h3>Server</h3>
  The server side this project used GraphQL, Express, Mongoose.<br/>
  So it will have schema of GraphQL by implement Express's middleware like this.
<pre>
  const app = express()
  ...
  app.use('/graphql', graphQLHTTP({ schema }))
  // If you would to use GraphQL tool and format pretty query
  app.use('/', graphQLHTTP({ graphiql: true, pretty: true, schema }))
</pre>
  The path '/graphql' is default GraphQL path for Relay.
<h4>GraphQL Schema</h4>
  You can use GraphQL by define schema.<br/>
  The first time you will create schema.
<pre>
  new GraphQLSchema({
    query: new GraphQLObjectType({
      ...
    }),
    mutation: new GraphQLObjectType({
      ...
    })
  })
</pre>
  Query object's type of query for fetch data from server.
  Mutation object's type of insert, update, delete data from server.
<h4>MongoDB with Mongoose</h4>
  After you define schema for GraphQL, You will resolve data from database.
  This database in project I extract file by database schemas and index.js is  config and connect MongoDB.
<h4>Config</h4>
  Config in this project I extract by environments and merge with main config's index.js
<pre>
  extend(config, require(`./environments/${config.env}`).default)
</pre>

<br/>

<h3>Client</h3>
  The client side this project used React, Relay.<br/>
  First step you will generate schema.js and make plugin for compile Relay.
<h4>Create & Update schema</h4>
  You can generate schema.json by GraphQL schema in server side like this
<pre>
  // This's schema file in server
  import Schema from '../server/schema'
  ...
  fs.writeFileSync (
    path.join (__dirname, `${dataPath}schema.json`),
    JSON.stringify(graphql(Schema, introspectionQuery), null, 2)
  )
</pre>
<h4>Plugin</h4>
  After you get schema.json when you would to start web.<br/>
  You much will compile Relay with plugin.<br/>
<pre>
  const Schema = require('./schema.json')
  module.exports = getBabelRelayPlugin(Schema.data)
</pre>  
<h4>Route</h4>
  If you used react-router, That you will apply middleware react-router-relay.
<pre>
  Router render={applyRouterMiddleware(useRelay.default)}
</pre>
<h4>Root Query</h4>
  Routes will be got query. That it send query to Relay container.
<pre>
  // Component's route component
  const viewerQuery = {
    viewer: Component => Relay.QL`
      query {
        viewer { ${Component.getFragment('viewer')} }
      }
    `
  }
  <Route path="/" component={App} queries={viewerQuery}>
  ...
</pre>
  It will send query to relay container.
<h4>Container</h4>
  Next container get object query and query by fragment again.<br/>
  And Relay container would React component.
<pre>
  Relay.createContainer(App, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          todos(first: 1000) {
            edges
          }
        }
      `
    }
  })
</pre>
<h4>Component</h4>
  Component's a plain React's component but component will get props by Relay.<br/>
<pre>
  static props = {
    viewer: PropTypes.object.isRequired
  }
  render() {
    return (
      ...
      <span className={style.title}>Total todo {this.props.viewer.todos.edges.length} item</span>
      ...
    )
  }
</pre>
