const mysql = require('mysql')

const keyGenerationRetries = 5

const connection_details = {
  host: 'resort-mgr.coywnuinrvp3.eu-central-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Password1',
  database: 'souto',
}

exports.connection = mysql.createConnection(connection_details)

exports.getConfigValue = (name, callback) => {
  this.connection.query(
    'SELECT Value from config WHERE Name = ?',
    [name],
    (error, rows) => {
      if (error) throw error
      callback(rows[0].Value)
    }
  )
}

exports.generateUniqueKey = (table, column, callback) => {
  this.generateUniqueKeyRecursive(keyGenerationRetries, table, column, callback)
}

exports.generateUniqueKeyRecursive = (retries, table, column, callback) => {
  if (retries < 1) {
    callback(null)
    return
  }

  let key = this.genetateKey()
  this.connection.query(
    'SELECT * FROM ' + table + ' WHERE ' + column + ' = ?',
    [key],
    (error, rows) => {
      if (error) throw error
      if (rows.length === 0) {
        callback(key)
      } else {
        this.generateUniqueKeyRecursive(retries - 1, table, column, callback)
      }
    }
  )
}

exports.genetateKey = () => {
  return (Math.floor(Math.random() * 8999) + 1000).toString()
}
