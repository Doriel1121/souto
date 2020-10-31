import React, { Component } from "react";
import Ticket from "./ticket";
import TicketDescription from "./TicketDescription";
import SwipeableViews from "react-swipeable-views";
import FlipMove from "react-flip-move";
import { Avatar, Modal } from "@material-ui/core";

const styles = {
  hiddenTicket: {
    display: "none",
  },
  board: {
    height: "60vh",
    margin: "3vh",
    borderRadius: "15px",
    background: "linear-gradient(45deg, #00B4DB, rgb(28 111 140))",
    boxShadow: "0px 0px 20px 1px rgb(78 78 78)",
    marginTop: "5vw",
  },
};

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ModalApperanceStatus: false,
      ModalInfo: null,
    };
  }

  triggerModal = (ticket) => {
    if (!this.state.ModalApperanceStatus) {
      this.setState({ ModalApperanceStatus: true, ModalInfo: ticket });
    } else {
      this.setState({ ModalApperanceStatus: false });
    }

    return;
  };

  render() {
    return (
      <div>
        {this.state.ModalApperanceStatus ? (
          <TicketDescription
            ChangeStatus={this.triggerModal}
            ModalInfo={this.state.ModalInfo}
          />
        ) : null}
        <FlipMove
          typeName={null}
          maintainContainerHeight={true}
          duration={100}
          staggerDurationBy={50}
        >
          {this.props.tickets.map((ticket) => {
            return (
              <SwipeableViews
                key={ticket.id}
                axis="x-reverse"
                onChangeIndex={() => {
                  setTimeout(() => {
                    this.props.moveTicket(ticket);
                  }, 500);
                }}
              >
                <div onClick={() => this.triggerModal(ticket)}>
                  <Ticket info={ticket} />
                </div>
                <div style={styles.hiddenTicket}>cwecec</div>
              </SwipeableViews>
            );
          })}
        </FlipMove>
      </div>
    );
  }
}
