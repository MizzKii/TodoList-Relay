import path from 'path'
import express from 'express'
import graphQLHTTP from 'express-graphql'

import config from './config'
import schema from './graphql/schema'
import mongoose from './database'

mongoose()
const server = express()
let graphQLHTTPObject

if(config.env === 'development') {
  graphQLHTTPObject = {
    graphiql: true,
    pretty: true,
    schema
  }
  console.log(`GraphQL is path '/graphql'`)
} else {
  graphQLHTTPObject = { schema }
}

server.use('/graphql', graphQLHTTP(graphQLHTTPObject))
server.use('/', express.static(path.join(__dirname, '../../dist')))
server.listen(config.port, () => console.log(`Server is listening on port '${config.port}'`))
