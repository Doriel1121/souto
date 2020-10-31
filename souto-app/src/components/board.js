import React, { Component } from "react";
import Ticket from "./ticket";
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
  modal: {
    backgroundColor: "white",
    width: "80%",
    height: "60%",
    margin: "auto",
    marginTop: "30%",
    borderRadius: "10px",
    textAlign: "center",
  },

  avatar: {
    width: "8vh",
    height: "8vh",
  },
  avatarDiv: {
    backgroundColor: "#CFCDCC",
    borderRadius: "10px 10px 0 0",
    height: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: "small",
    textAlign: "left",
  },
  modalContent: {
    width: "90%",
    margin: "auto",
  },
};

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ModalApperanceStatus: false,
      ModalInfoId: null,
    };
  }

  triggerModal = (ticket) => {
    this.setState({ ModalApperanceStatus: true, ModalInfoId: ticket });
    return;
  };

  render() {
    return (
      <div>
        {this.state.ModalApperanceStatus ? (
          <Modal
            onClose={() => this.setState({ ModalApperanceStatus: false })}
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
          >
            <div style={styles.modal}>
              <div style={styles.avatarDiv}>
                <Avatar style={styles.avatar}></Avatar>
              </div>
              <div style={styles.modalContent}>
                <h3 style={styles.title}>{this.state.ModalInfoId.title}</h3>
                <p style={styles.description}>
                  {this.state.ModalInfoId.description}
                </p>
              </div>
            </div>
          </Modal>
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
