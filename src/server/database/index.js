import mongoose from 'mongoose'
import config from '../config'

export default () => {
  mongoose.set('debug', config.env === 'development')
  mongoose.connect(config.endpoint.mongodb)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
}
