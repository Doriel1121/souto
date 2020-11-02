const dal = require("./data_access_core");

const connection = dal.connection;

exports.addBoard = (board, callback) => {
    let key = genetateKey()
    let secret = genetateKey()
    connection.query("INSERT INTO Boards (name, public_key, secret, creation_time) VALUES (?, ?, ?, ?)", [board.name, key, secret, (new Date()).toISOString()], (error) => {
        if(error) throw error;
        connection.query("SELECT * FROM Boards WHERE name = ? ORDER BY creation_time DESC", [board.name], (error, rows) => {
            if(error) throw error;
            callback(rows[0])
        })
    })
}

exports.getBoardByKey = (boardKey, callback) => {
    connection.query("SELECT * FROM Boards where public_key = ?", [boardKey], (error, rows) => {
        if(error) throw error;
        if (rows.length > 0) {
            callback(rows[0])
        } else {
            callback(undefined)
        }
    })
}

let genetateKey = () => {
    return (Math.floor(Math.random() * 8999) + 1000).toString()
}