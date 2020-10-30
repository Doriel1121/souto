const mysql = require('mysql')

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
