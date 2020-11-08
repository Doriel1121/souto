const dal = require('./data_access_core')
const tickets = require('./tickets')

const connection = dal.connection

exports.addUser = (boardId, user, callback) => {
  dal.generateUniqueKey('Users', 'secret', (secret) => {
    if (secret === null) {
      callback(null)
    } else {
      connection.query(
        'INSERT INTO Users (name, board_id, creation_time, secret) VALUES (?, ?, ? , ?)',
        [user.name, boardId, new Date().toISOString(), secret],
        (error) => {
          if (error) throw error
          connection.query(
            'SELECT * FROM Users WHERE name = ? ORDER BY creation_time DESC',
            [user.name],
            (error, rows) => {
              if (error) throw error
              let user = rows[0]

              tickets.getAllTicketByBoardId(boardId, (tickets) => {
                if (tickets.length > 0) {
                  //TODO: Bring also the inactive tickets
                  let userTickets = tickets.map((ticket) => {
                    return [
                      user.id,
                      ticket.id,
                      'TODO',
                      new Date().toISOString(),
                      0,
                    ]
                  })
                  tickets
                  connection.query(
                    'INSERT INTO UserTicketMigration (user_id, ticket_id, status, last_update, flag) VALUES ?',
                    [userTickets],
                    (error) => {
                      if (error) throw error
                      callback(user)
                    }
                  )
                } else {
                  callback(user)
                }
              })
            }
          )
        }
      )
    }
  })
}

exports.logInUserBySecret = (secretNumber, callback) => {
  connection.query(
    `SELECT * FROM Users WHERE secret = ?`,
    [secretNumber],
    (error, res) => {
      if (error) throw error
      if (res.length > 0) {
        callback(res[0])
      } else {
        callback(undefined)
      }
    }
  )
}
