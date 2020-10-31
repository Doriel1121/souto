const dal = require("./data_access_core");

const connection = dal.connection;

exports.getAllTicketsByUserId = (userId, callback) => {
  connection.query(
    "SELECT utm.id as id, t.title, t.description, utm.status FROM UserTicketMigration utm JOIN Tickets t ON t.id = utm.ticket_id WHERE utm.user_id = ? AND t.active = 1",
    [userId],
    (error, rows) => {
      if (error) throw error;
      callback(rows)
    }
  );
};

exports.updateTicket = (ticketId, ticket, callback) => {
    connection.query("UPDATE Tickets SET title = ?, description = ? WHERE id = ?", 
    [ticket.title, ticket.description, ticketId], (error, _) => {
        if(error) throw error;
        callback()
    })
}

exports.updateStatus = (id, status, callback) => {
  connection.query("UPDATE UserTicketMigration SET status = ? WHERE id = ?", [status, id], (error) => {
    if(error) throw error;
    callback()
  })
}

exports.deleteTicket = (ticketId, callback) => {
  connection.query("UPDATE Tickets SET active = 0 WHERE id = ?", [ticketId], (error) => {
    if(error) throw error;
    callback();
  })
}

exports.getAllTicketByBoardId = (boardId, callback) => {
  connection.query("SELECT * from Tickets WHERE board_id = ? AND active = 1", [boardId], (error, rows) => {
    if(error) throw error;
    callback(rows)
  })
}

exports.addTicket = (boardId, ticket, callback) => {
  connection.query("INSERT INTO Tickets (board_id, title, description, creation_time, active) VALUES (?, ?, ?, ?, 1)", 
  [boardId, ticket.title, ticket.description, (new Date()).toISOString()], (error) => {
    if(error) throw error;
    connection.query("SELECT * FROM Tickets WHERE board_id = ? AND title = ? ORDER BY creation_time DESC", [boardId, ticket.title], (error, rows) => {
      if (error) throw error;
      let newTicket = rows[0]
      connection.query("SELECT * FROM Users WHERE board_id = ?", [boardId], (error, registeredUser) => {
        if (error) throw error;
        let userRows = registeredUser.map(usr => {
          return [usr.id, newTicket.id, "TODO", (new Date()).toISOString()]
        })
        connection.query("INSERT INTO UserTicketMigration (user_id, ticket_id, statud, last_update) VALUES ?", [userRows], (error) => {
          if(error) throw error;
          callback(newTicket)
        })
      })
    })
  })
}