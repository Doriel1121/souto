const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const tickets = require('./tickets')
const users = require('./users')
const boards = require('./boards')
var https = require('https')
var fs = require('fs')

var httpsOptions = {
  key: fs.readFileSync('/home/ubuntu/key.pem'),
  cert: fs.readFileSync('/home/ubuntu/cert.pem'),
}

const app = express()
const port = 3002

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Server started at port ${port}`)
})

// app.listen(port, () => {
//   console.log(`Server started at port ${port}`)
// })

app
  .use(bodyParser.json())
  .use(cors())
  .get('/tickets/:userId', (request, response) => {
    console.log('New tickets request arrived')
    tickets.getAllTicketsByUserId(request.params.userId, (tickets) => {
      response.send(tickets)
    })
  })
  .post('/tickets/update', (request, response) => {
    console.log('Change ticket request')
    tickets.updateStatus(request.body.id, request.body.status, () => {
      response.sendStatus(200)
    })
  })
  .post('/tickets/delete/:id', (request, response) => {
    console.log('Delete ticket request')
    tickets.deleteTicket(request.params.id, () => {
      response.sendStatus(200)
    })
  })
  .get('/board/tickets/:boardId', (request, response) => {
    console.log('Manager ticket request')
    tickets.getAllTicketByBoardId(request.params.boardId, (tickets) => {
      response.send(tickets)
    })
  })
  .post('/board/tickets/update', (request, response) => {
    console.log('Change ticket request')
    tickets.updateTicket(request.body.id, request.body, () => {
      response.sendStatus(200)
    })
  })
  .post('/board/tickets/add/:boardId', (request, response) => {
    console.log('New ticket request')
    tickets.addTicket(request.params.boardId, request.body, (ticket) => {
      response.send(ticket)
    })
  })
  .post('/boards/add', (request, response) => {
    console.log('New board request')
    boards.addBoard(request.body, (board) => {
      response.send(board)
    })
  })
  .post('/users/add/:boardId', (request, response) => {
    console.log('New register user request')
    users.addUser(request.params.boardId, request.body, (user) => {
      response.send(user)
    })
  })
  .get('/users/secret/:secretNumber', (request, response) => {
    console.log('user login by secret')
    users.logInUserBySecret(request.params.secretNumber, (user) => {
      if (user !== undefined) {
        response.send(user)
      } else {
        response.sendStatus(500)
      }
    })
  })
  .get('/board/key/:boardKey', (request, response) => {
    console.log('Board by key request')
    boards.getBoardByKey(request.params.boardKey, (board) => {
      if (board !== undefined) {
        response.send(board)
        return
      }
      response.sendStatus(500)
    })
  })
  .get('/board/secret/:boardSecret', (request, response) => {
    console.log('Board by secret request')
    boards.getBoardBySecret(request.params.boardSecret, (board) => {
      if (board !== undefined) {
        response.send(board)
        return
      }
      response.sendStatus(500)
    })
  })
  .get('/board/id/:boardId', (request, response) => {
    console.log('Board by id request')
    boards.getBoardById(request.params.boardId, (board) => {
      if (board !== null) {
        response.send(board)
      } else {
        response.sendStatus(500)
      }
    })
  })

  .get('/board/allusers/:boardId' , (request , response) => {
    boards.getAllUsersProgress(request.params.boardId , (data) => {
      response.send(data)
    })

  })
