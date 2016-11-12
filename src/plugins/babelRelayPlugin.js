const getBabelRelayPlugin = require('babel-relay-plugin')
const Schema = require('./schema.json')

module.exports = getBabelRelayPlugin(Schema.data)
