const dal = require('./data_access_core')

const connection = dal.connection

exports.addBoard = (board, callback) => {
  dal.generateUniqueKey('Boards', 'public_key', (key) => {
    if (key === null) {
      callback(null)
    } else {
      dal.generateUniqueKey('Boards', 'secret', (secret) => {
        if (secret === null) {
          callback(null)
        } else {
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
      })
    }
  })
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
    [userId],
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

exports.getAllUsersProgress = (boardId, callback) => {
  connection.query(
    "SELECT a.id, a.Name, a.c, IFNULL(done.o, 0) as o FROM (SELECT u.id , u.Name , COUNT(*) AS c FROM UserTicketMigration AS utf JOIN Users AS u ON utf.user_id = u.id JOIN Tickets AS t ON t.id = utf.ticket_id WHERE t.active = 1 AND u.board_id = ? GROUP BY u.id) AS a LEFT JOIN (SELECT u.id , u.Name , COUNT(*) AS o FROM UserTicketMigration AS utm JOIN Users AS u ON utm.user_id = u.id JOIN Tickets AS t ON t.id = utm.ticket_id WHERE t.active = 1 AND u.board_id = ? AND utm.status = 'DONE' GROUP BY u.id) AS done ON a.id = done.id",
    [boardId, boardId],
    (error, rows) => {
      if (error) throw error
      callback(rows)
    }
  )
}

exports.getBoardById = (boardId, callback) => {
  connection.query(
    'SELECT * FROM Boards WHERE id = ?',
    [boardId],
    (error, rows) => {
      if (error) throw error
      if (rows.length === 0) {
        callback(null)
      } else {
        callback(rows[0])
      }
    }
  )
}
