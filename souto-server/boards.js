const dal = require('./data_access_core')

const connection = dal.connection

exports.addBoard = (board, callback) => {
  let key = genetateKey()
  let secret = genetateKey()
  connection.query(
    'INSERT INTO Boards (name, public_key, secret, creation_time) VALUES (?, ?, ?, ?)',
    [board.name, key, secret, new Date().toISOString()],
    (error) => {
      if (error) throw error
      connection.query(
        'SELECT * FROM Boards WHERE name = ? ORDER BY creation_time DESC',
        [board.name],
        (error, rows) => {
          if (error) throw error
          callback(rows[0])
        }
      )
    }
  )
}

exports.getBoardByKey = (boardKey, callback) => {
  connection.query(
    'SELECT * FROM Boards WHERE public_key = ?',
    [boardKey],
    (error, rows) => {
      if (error) throw error
      if (rows.length > 0) {
        callback(rows[0])
      } else {
        callback(undefined)
      }
    }
  )
}

exports.getBoardBySecret = (boardSecret, callback) => {
  connection.query(
    'SELECT * FROM Boards WHERE secret = ?',
    [boardSecret],
    (error, rows) => {
      if (error) throw error
      if (rows.length > 0) {
        callback(rows[0])
      } else {
        callback(undefined)
      }
    }
  )
}

exports.getBoardByUserId = (userId, callback) => {
  connection.query(
    'SELECT b.* FROM Boards b JOIN Users u ON b.id = u.board_id WHERE u.id = ?',
    [boardId],
    (error, rows) => {
      if (error) throw error
      if (rows.length > 0) {
        callback(rows[0])
      } else {
        callback(null)
      }
    }
  )
}

let genetateKey = () => {
  return (Math.floor(Math.random() * 8999) + 1000).toString()
}
