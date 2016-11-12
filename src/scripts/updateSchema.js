import fs from 'fs'
import path from 'path'
import { graphql } from 'graphql'
import { introspectionQuery, printSchema } from 'graphql/utilities'
import Schema from '../server/schema'

const dataPath = '../plugins/';

(async () => {
  const result = await (graphql(Schema, introspectionQuery))
  if (result.errors) {
    console.error (`Error introspecting schema: `, JSON.stringify(result.errors, null, 2))
  } else {
    fs.writeFileSync (
      path.join (__dirname, `${dataPath}schema.json`),
      JSON.stringify(result, null, 2)
    )
  }
})()

fs.writeFileSync (
  path.join (__dirname, `${dataPath}schema.graphql`),
  printSchema (Schema)
)
