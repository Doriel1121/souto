import React, { Component } from "react";
import axios from "axios";
import config from "./config";
import lodash from "lodash";

const ClientContext = React.createContext();

export class ClientAppDataProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoTickets: [],
      inProgressTickets: [],
      doneTickets: [],
    };
  }

  componentDidMount = () => {
    this.sync(() => {
      this.syncInterval(5000);
    });
  };

  syncInterval = (interval) => {
    setTimeout(() => {
      this.sync(() => {
        this.syncInterval(interval);
      });
    }, interval);
  };

  sync = (callback) => {
    axios
      .get(config.server + "/tickets/" + config.userId)
      .then((response) => {
        console.log(response);
        let data = lodash.groupBy(response.data, (item) => item.status);
        let todoT = data["TODO"] === undefined ? [] : data["TODO"];
        let inProgressT =
          data["INPROGRESS"] === undefined ? [] : data["INPROGRESS"];
        let doneT = data["DONE"] === undefined ? [] : data["DONE"];
        this.setState(
          {
            todoTickets: todoT,
            inProgressTickets: inProgressT,
            doneTickets: doneT,
          },
          callback
        );
      })
      .catch((error) => {
        alert(error);
      });
  };

  moveTicket = (ticket, next) => {
    switch (ticket.status) {
      case "TODO":
        ticket.status = "INPROGRESS";
        break;
      case "INPROGRESS":
        if (next) {
          ticket.status = "DONE";
        } else {
          ticket.status = "TODO";
        }
        break;
      case "DONE":
        ticket.status = "INPROGRESS";
        break;
      default:
        break;
    }

    axios
      .post(config.server + "/tickets/update", ticket)
      .then(() => {
        this.moveTicketOffline(ticket, next);
      })
      .catch((error) => {
        alert(error);
      });
  };

  moveTicketOffline = (ticket, next) => {
    let todoMatchingTickets = this.state.todoTickets.filter(
      (item) => item.id === ticket.id
    );
    if (todoMatchingTickets.length > 0) {
      this.setState((prevState) => {
        let inProgress = prevState.inProgressTickets;
        inProgress.push(ticket);
        let filtered = this.state.todoTickets.filter(
          (item) => item.id !== ticket.id
        );
        return {
          todoTickets: filtered,
          inProgressTickets: inProgress,
        };
      });
      return;
    }

    let inProgressMatchingTickets = this.state.inProgressTickets.filter(
      (item) => item.id === ticket.id
    );
    if (inProgressMatchingTickets.length > 0) {
      this.setState((prevState) => {
        let done = prevState.doneTickets;
        let todo = prevState.todoTickets;
        if (next) {
          done.push(ticket);
        } else {
          todo.push(ticket);
        }
        return {
          inProgressTickets: this.state.inProgressTickets.filter(
            (item) => item.id !== ticket.id
          ),
          doneTickets: done,
          todoTickets: todo,
        };
      });
      return;
    }

    let doneMatchingTickets = this.state.doneTickets.filter(
      (item) => item.id === ticket.id
    );
    if (doneMatchingTickets.length > 0) {
      this.setState((prevState) => {
        let inProgress = prevState.inProgressTickets;
        inProgress.push(ticket);
        let filtered = this.state.doneTickets.filter(
          (item) => item.id !== ticket.id
        );
        return {
          doneTickets: filtered,
          inProgressTickets: inProgress,
        };
      });
      return;
    }
  };

  render() {
    return (
      <ClientContext.Provider
        value={{
          state: this.state,
          moveTicket: this.moveTicket,
          sync: this.sync,
        }}
      >
        {this.props.children}
      </ClientContext.Provider>
    );
  }
}

export default ClientContext;
