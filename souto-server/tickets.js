const dal = require("./data_access_core");

const connection = dal.connection;

exports.getAllTicketsByUserId = (userId, callback) => {
  connection.query(
    "SELECT * FROM Tickets WHERE user_id = ? AND active = 1",
    [userId],
    (error, rows) => {
      if (error) throw error;
      callback(rows)
    }
  );
};

exports.updateTicket = (ticketId, ticket, callback) => {
    connection.query("UPDATE Tickets SET title = ?, description = ?, status = ?, last_update_time = ? WHERE id = ?", 
    [ticket.title, ticket.desciption, ticket.status, (new Date()).toISOString(), ticketId], (error, _) => {
        if(error) throw error;
        callback()
    })
}