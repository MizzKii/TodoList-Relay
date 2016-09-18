import path from 'path'
import express from 'express'
import graphQLHTTP from 'express-graphql'
// import historyApiFallback from 'connect-history-api-fallback';

import config from './config'
import schema from './data/schema'

const server = express()
let graphQLHTTPObject

if(config.env === 'development') {
  graphQLHTTPObject = {
    graphiql: true,
    pretty: true,
    schema
  }
  server.use('/graphql', graphQLHTTP(graphQLHTTPObject))
  console.log(`GraphQL is path '/graphql'`)
} else {
  graphQLHTTPObject = { schema }
  // server.use(historyApiFallback())
}

server.use('/', express.static(path.join(__dirname, '../../dist')))
server.listen(config.port, () => console.log(`Server is listening on port '${config.port}'`))
