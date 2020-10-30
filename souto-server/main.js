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
  .post("tickets/update", (request, response) => {
    console.log("Change ticket request")
    tickets.updateTicket(request.body.id, request.body, () => {
      response.sendStatus(200)
    })
  });
