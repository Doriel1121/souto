import React, { Component } from "react";
import { Avatar, Modal } from "@material-ui/core";

const styles = {
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

export default class TicketDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ModalApperanceStatus: true,
    };
  }

  render() {
    return (
      <Modal
        onClose={() => this.props.ChangeStatus(false)}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
      >
        <div style={styles.modal}>
          <div style={styles.avatarDiv}>
            <Avatar onClick style={styles.avatar}></Avatar>
          </div>
          <div style={styles.modalContent}>
            <h3 style={styles.title}>{this.props.ModalInfo.title}</h3>
            <p style={styles.description}>{this.props.ModalInfo.description}</p>
          </div>
        </div>
      </Modal>
    );
  }
}
