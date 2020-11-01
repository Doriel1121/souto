import React, { Component } from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TicketDescription from "./ticketDescription";

const styles = {
  tools: {
    marginBottom: "2vh",
  },
  buttonFull: {
    borderRadius: "0px",
  },
};

export default class ManagerTools extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddModalOpen: false,
    };
  }

  render() {
    return (
      <div style={styles.tools}>
        <ButtonGroup fullWidth color="primary">
          <Button
            style={styles.buttonFull}
            onClick={() => {
              this.setState({ isAddModalOpen: true });
            }}
          >
            <AddIcon />
          </Button>
        </ButtonGroup>
        <TicketDescription
          isOpen={this.state.isAddModalOpen}
          ticket={{ id: -1, title: "", description: "", icon: "" }}
          isManager={true}
          close={() => {
            this.setState({ isAddModalOpen: false });
          }}
          update={this.props.addTicket}
        />
      </div>
    );
  }
}
