import extend from 'lodash/fp/extend'

const config = {
  env: process.env.NODE_ENV == 'production' ? 'production' : 'development',
  port: process.env.PORT || 3000,
  graphql: {
    port: 8000
  }
}

export default extend(config, require(`./environments/${config.env}`).default)
