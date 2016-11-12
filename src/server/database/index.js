import mongoose from 'mongoose'
import config from '../config'

// This function for start and config database
export default () => {
  mongoose.set('debug', config.env === 'development')
  mongoose.Promise = global.Promise
  mongoose.connect(config.endpoint.mongodb)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
}
