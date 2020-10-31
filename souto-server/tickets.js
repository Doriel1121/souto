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
    connection.query("UPDATE Tickets SET title = ?, description = ?, status = ?, last_update_time = ? WHERE id = ?", 
    [ticket.title, ticket.description, ticket.status, (new Date()).toISOString(), ticketId], (error, _) => {
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