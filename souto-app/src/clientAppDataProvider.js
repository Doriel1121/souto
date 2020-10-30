import React, { Component } from "react";

const ClientContext = React.createContext();

export class ClientAppDataProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoTickets: [{id: 0, title: 'Deploy the document1', description: 'Being able to deploy the tests right after push to master and after that remove all the code'},
      {id: 1, title: 'Deploy the document', description: 'Being able to deploy the tests right after push to master and after that remove all the code'},
      {id: 2, title: 'Deploy the document2', description: 'Being able to deploy the tests right after push to master and after that remove all the code'},
      {id: 3, title: 'Deploy the do3', description: 'Being able to deploy the tests right after push to master and after that remove all the code'}],
      inProgressTickets: [],
      doneTickets: []
    };
  }

  moveTicket = (ticket, next) => {
    let todoMatchingTickets = this.state.todoTickets.filter(item => item.id === ticket.id)
    if (todoMatchingTickets.length > 0) {
        this.setState((prevState) => {
            let inProgress = prevState.inProgressTickets
            inProgress.push(ticket)
            let filtered = this.state.todoTickets.filter(item => item.id !== ticket.id)
            return {
                todoTickets: filtered,
                inProgressTickets: inProgress
            }
        })
        return
    }

    let inProgressMatchingTickets = this.state.inProgressTickets.filter(item => item.id === ticket.id)
    if (inProgressMatchingTickets.length > 0) {
        this.setState((prevState) => {
            let done = prevState.doneTickets
            let todo = prevState.todoTickets
            if (next) {
                done.push(ticket)
            } else {
                todo.push(ticket)
            }
            return {
                inProgressTickets: this.state.inProgressTickets.filter(item => item.id !== ticket.id),
                doneTickets: done,
                todoTickets: todo
            }
        })
        return
    }

    let doneMatchingTickets = this.state.doneTickets.filter(item => item.id === ticket.id)
    if (doneMatchingTickets.length > 0) {
        this.setState((prevState) => {
            let inProgress = prevState.inProgressTickets
            inProgress.push(ticket)
            let filtered = this.state.doneTickets.filter(item => item.id !== ticket.id)
            return {
                doneTickets: filtered,
                inProgressTickets: inProgress
            }
        })
        return
    }
}

  render() {
    return (
      <ClientContext.Provider
        value={{ state: this.state, moveTicket: this.moveTicket }}
      >
        {this.props.children}
      </ClientContext.Provider>
    );
  }
}

export default ClientContext;
