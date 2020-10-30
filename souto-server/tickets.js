const dal = require("./data_access_core");

const connection = dal.connection;

exports.getAllTicketsByUserId = (userId, callback) => {
  connection.query(
    "SELECT * FROM tickets WHERE user_id = ? AND active = 1",
    [userId],
    (error, rows) => {
      if (error) throw error;
      callback(rows)
    }
  );
};