const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const tickets = require("./tickets");
var https = require("https");
var fs = require("fs");

var httpsOptions = {
  key: fs.readFileSync("/home/ubuntu/key.pem"),
  cert: fs.readFileSync("/home/ubuntu/cert.pem"),
};

const app = express();
const port = 3002;

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Server started at port ${port}`);
});

app
  .use(bodyParser.json())
  .use(cors())
  .get("/tickets/:userId", (request, response) => {
    console.log("New tickets request arrived");
    tickets.getAllTicketsByUserId(request.params.userId, (tickets) => {
      response.send(tickets)
    })
  })
  .post("/tickets/update", (request, response) => {
    console.log("Change ticket request")
    tickets.updateStatus(request.body.id, request.body.status, () => {
      response.sendStatus(200)
    })
  })
  .post("/tickets/delete/:id", (request, response) => {
    console.log("Delete ticket request")
    tickets.deleteTicket(request.params.id, () => {
      response.sendStatus(200)
    })
  })
  .get("/board/tickets/:boardId", (request, response) => {
    console.log("Manager ticket request")
    tickets.getAllTicketByBoardId(request.params.boardId, (tickets) => {
      response.send(tickets)
    })
  });
