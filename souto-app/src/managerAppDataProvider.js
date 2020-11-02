import React, { Component } from "react";
import axios from "axios";
import config from "./config";

const ManagerContext = React.createContext();

export class ManagerAppDataProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets: [],
      updatedT: null,
    };
  }

  componentDidMount = () => {
    this.sync();
  };

  sync = () => {
    axios
      .get(
        config.server +
          "/board/tickets/" +
          window.localStorage.getItem("captainBoardId")
      )
      .then((response) => {
        this.setState({
          tickets: response.data,
        });
        console.log(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  newTicket = (ticket, callback) => {
    axios
      .post(
        config.server +
          "/board/tickets/add/" +
          window.localStorage.getItem("captainBoardId"),
        ticket
      )
      .then((response) => {
        let newTicket = response.data;
        this.setState((prevState) => {
          let tickets = prevState.tickets;
          tickets.push(newTicket);
          return {
            tickets: tickets,
          };
        }, callback);
      })
      .catch((error) => {
        alert(error);
      });
  };

  updateTicket = (ticket, callback) => {
    console.log(ticket);
    axios
      .post(config.server + "/board/tickets/update", ticket)
      .then(() => {
        this.sync();
        callback();
      })
      .catch((error) => {
        alert(error);
      });
  };

  deleteTicketById = (id) => {
    axios
      .post(config.server + "/tickets/delete/" + id)
      .then(() => {
        this.deleteTicketByIdOffline(id);
      })
      .catch((error) => {
        alert(error);
      });
  };

  deleteTicketByIdOffline = (id) => {
    let tickets = this.state.tickets.filter((item) => item.id !== id);
    this.setState({
      tickets: tickets,
    });
  };

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
    );
  }
}

export default ManagerContext;
