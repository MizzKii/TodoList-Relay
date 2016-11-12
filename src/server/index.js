import path from 'path'
import express from 'express'
import graphQLHTTP from 'express-graphql'
import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'

import config from './config'
import schema from './schema'
import mongoose from './database'
import ssr from './ssr'
import webpackConfig from '../../webpack.config'

mongoose()
let app = express()

if(config.env === 'development') {
  app.use('/', graphQLHTTP({ graphiql: true, pretty: true, schema }))
  app.listen(config.graphql.port, () => console.log(`GraphQL is listening on port '${config.graphql.port}'`))

  app = new webpackDevServer(webpack(webpackConfig), {
    contentBase: '/build/',
    stats: {
      colors: true
    },
    hot: true,
    inline: true,
    historyApiFallback: true,
    proxy: {
      '/graphql': `http://127.0.0.1:${config.graphql.port}`
    }
  })
} else {
  app.use('/graphql', graphQLHTTP({ schema }))
}

app.use(express.static(path.join(__dirname, '../../build')))
app.use('/', ssr)
app.listen(config.port, () => console.log(`Server is listening on port '${config.port}'`))

// if(config.env === 'development') {
//   app.use('/', graphQLHTTP({ graphiql: true, pretty: true, schema }))
//   app.listen(config.graphql.port, () => console.log(`GraphQL is listening on port '${config.graphql.port}'`))
//
//   app = new webpackDevServer(webpack(webpackConfig), {
//     contentBase: '/build/',
//     stats: {
//       colors: true
//     },
//     hot: true,
//     inline: true,
//     historyApiFallback: true
//   })
// } else {
//   app.use('/graphql', graphQLHTTP({ schema }))
// }
