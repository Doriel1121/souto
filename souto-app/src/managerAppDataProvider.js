import React, { Component } from "react";
import axios from "axios"
import config from "./config"

const ManagerContext = React.createContext();

export class ManagerAppDataProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets: []
    };
  }

  componentDidMount = () => {
    this.sync()
  }

  sync = () => {
    axios.get(config.server + "/board/tickets/1")
    .then((response) => {
      this.setState({
        tickets: response.data
      })
    })
    .catch((error) => {
      alert(error)
    })
  }

  deleteTicketById = (id) => {
    axios.post(config.server + "/tickets/delete/" + id)
    .then(() => {
      this.deleteTicketByIdOffline(id)
    })
    .catch((error) => {
      alert(error)
    })
  }

  deleteTicketByIdOffline = (id) => {
    let tickets = this.state.tickets.filter(item => item.id !== id)
    this.setState({
      tickets: tickets
    })
  }

  render() {
    return (
      <ManagerContext.Provider
        value={{ state: this.state, deleteTicket: this.deleteTicketById }}
      >
        {this.props.children}
      </ManagerContext.Provider>
    );
  }
}

export default ManagerContext;
