import React, { Component } from 'react'
import axios from 'axios'
import config from './config'

const ManagerContext = React.createContext()

export class ManagerAppDataProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tickets: [],
      board: {},
    }
  }

  componentDidMount = () => {
    axios
      .get(
        config.server +
          '/board/id/' +
          window.localStorage.getItem('captainBoardId')
      )
      .then((response) => {
        this.setState({ board: response.data }, this.sync)
      })
      .catch((error) => {
        console.log(error)
        alert('Sorry, could not get the data! Please try again later')
      })
  }

  sync = () => {
    axios
      .get(
        config.server +
          '/board/tickets/' +
          window.localStorage.getItem('captainBoardId')
      )
      .then((response) => {
        this.setState({
          tickets: response.data,
        })
      })
      .catch((error) => {
        console.log(error)
        alert(
          'Oops! Seems like there is error! Make sure your device is well connected to the internet!'
        )
      })
  }

  newTicket = (ticket, callback) => {
    axios
      .post(
        config.server +
          '/board/tickets/add/' +
          window.localStorage.getItem('captainBoardId'),
        ticket
      )
      .then((response) => {
        let newTicket = response.data
        this.setState((prevState) => {
          let tickets = prevState.tickets
          tickets.push(newTicket)
          return {
            tickets: tickets,
          }
        }, callback)
      })
      .catch((error) => {
        console.log(error)
        alert('Sorry! Could not add the ticket. Please try again later')
      })
  }

  updateTicket = (ticket, callback) => {
    axios
      .post(config.server + '/board/tickets/update', ticket)
      .then(() => {
        this.setState((prevState) => {
          let oldTickets = prevState.tickets
          for (let i = 0; i < oldTickets.length; i++) {
            if (oldTickets[i].id === ticket.id) {
              oldTickets[i] = ticket
            }
          }
          return {
            tickets: oldTickets,
          }
        }, callback)
      })
      .catch((error) => {
        console.log(error)
        alert('Sorry! Could not change ticket. Please try again later')
      })
  }

  deleteTicketById = (id) => {
    axios
      .post(config.server + '/tickets/delete/' + id)
      .then(() => {
        this.deleteTicketByIdOffline(id)
      })
      .catch((error) => {
        console.log(error)
        alert('Sorry! Could not delete ticket. Please try again later')
      })
  }

  deleteTicketByIdOffline = (id) => {
    let tickets = this.state.tickets.filter((item) => item.id !== id)
    this.setState({
      tickets: tickets,
    })
  }

  render() {
    return (
      <ManagerContext.Provider
        value={{
          state: this.state,
          deleteTicket: this.deleteTicketById,
          updateTicket: this.updateTicket,
          newTicket: this.newTicket,
        }}
      >
        {this.props.children}
      </ManagerContext.Provider>
    )
  }
}

export default ManagerContext
