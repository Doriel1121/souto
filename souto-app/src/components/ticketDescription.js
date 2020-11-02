import React, { Component } from "react";
import {
  Avatar,
  Modal,
  TextField,
  Grid,
  Fab,
  Popover,
  Button,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";

const styles = {
  modal: {
    backgroundColor: "white",
    width: "80vw",
    height: "70vh",
    margin: "auto",
    marginTop: "15vh",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 0 16px 5px black",
  },

  avatar: {
    width: "8vh",
    height: "8vh",
    border: "1px #E9E9E9  solid",
  },
  avatarDiv: {
    backgroundColor: "#CFCDCC",
    borderRadius: "10px 10px 0 0",
    height: "15vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #2193b0, #6dd5ed)",
  },
  description: {
    fontSize: "small",
    textAlign: "left",
  },
  modalContent: {
    width: "90%",
    margin: "auto",
    paddingTop: "2vh",
  },
  icons: {
    width: "8vh",
    height: "8vh",
    border: "1px white  solid",
    borderRadius: "30px",
  },
  iconsPop: {
    width: "100%",
    height: "max-content",
    backgroundColor: "#EDEDED",
    backdropFilter: "opacity(0.4)",
    margin: "0",
    borderRadius: "8px",
  },
};

export default class TicketDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.ticket.id,
      title: this.props.ticket.title,
      description: this.props.ticket.description,
      icon: null,
      anchorEl: null,
    };
  }

  isChangedFromInit = () => {
    return (
      this.state.title !== this.props.ticket.title ||
      this.state.description !== this.props.ticket.description ||
      this.state.icon !== this.props.ticket.icon
    );
  };

  getTicket = () => {
    return {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      icon: this.state.icon,
    };
  };

  clean = () => {
    this.setState(
      {
        title: "",
        description: "",
        icon: "",
      },
      this.props.close
    );
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
    console.log(event.currentTarget);
  };

  GetImgValue = (value) => {
    this.setState({ icon: value, anchorEl: null });
    this.forceUpdate();
  };

  renderTicketData = () => {
    if (this.props.isManager) {
      return (
        <div>
          <div style={styles.avatarDiv}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(event) => this.handleClick(event)}
            >
              <Avatar
                src={
                  this.state.icon !== null
                    ? `icon${this.state.icon}.png`
                    : `icon${this.props.ticket.icon}.png`
                }
                style={styles.avatar}
              ></Avatar>
            </Button>
            <EditIcon
                style={{
                  width: "8vw",
                  height: "8vh",
                  position: "relative",
                  bottom: 0,
                  filter: "opacity(0.5)",
                }}
              />

            <Popover
              open={Boolean(this.state.anchorEl)}
              anchorEl={this.state.anchorEl}
              onClose={() => this.setState({ anchorEl: null })}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Grid style={styles.iconsPop} container spacing={1}>
                <Grid item xs={4}>
                  <img
                    onClick={() => {
                      this.GetImgValue(4);
                    }}
                    style={styles.icons}
                    src={`icon4.png`}
                  />
                </Grid>

                <Grid item xs={4}>
                  <img
                    onClick={() => {
                      this.GetImgValue(5);
                    }}
                    style={styles.icons}
                    src="icon5.png"
                  />
                </Grid>
                <Grid item xs={4}>
                  <img
                    onClick={() => {
                      this.GetImgValue(6);
                    }}
                    style={styles.icons}
                    src="icon6.png"
                  />
                </Grid>
                <Grid item xs={4}>
                  <img
                    onClick={() => {
                      this.GetImgValue(7);
                    }}
                    style={styles.icons}
                    src="icon7.png"
                  />
                </Grid>
                <Grid item xs={4}>
                  <img
                    onClick={() => {
                      this.GetImgValue(8);
                    }}
                    style={styles.icons}
                    src="icon8.png"
                  />
                </Grid>
              </Grid>
            </Popover>
          </div>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={3}
            style={styles.modalContent}
          >
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                value={this.state.title}
                fullWidth
                onChange={(event) => {
                  this.setState({ title: event.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                value={this.state.description}
                fullWidth
                onChange={(event) => {
                  this.setState({ description: event.target.value });
                }}
                multiline
                rows={6}
                rowsMax={6}
              />
            </Grid>
            <Grid item xs={6}>
              <Fab
                onClick={() => {
                  this.props.close();
                }}
              >
                <CancelIcon />
              </Fab>
            </Grid>
            <Grid item xs={6}>
              <Fab
                disabled={!this.isChangedFromInit()}
                color="primary"
                onClick={() => {
                  this.props.update(this.getTicket(), this.clean);
                }}
              >
                <SaveIcon />
              </Fab>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <div style={styles.avatarDiv}>
            <Avatar
              src={
                this.props.ticket !== null
                  ? `icon${this.props.ticket.icon}.png`
                  : `icon${this.state.icon}.png`
              }
              style={styles.avatar}
            ></Avatar>
          </div>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={3}
            style={styles.modalContent}
          >
            <Grid item xs={12}>
              <h3>{this.state.title}</h3>
            </Grid>
            <Grid item xs={12}>
              <p>{this.state.description}</p>
            </Grid>
          </Grid>
        </div>
      );
    }
  };
  render() {
    return (
      <Modal
        onClose={() => this.props.close()}
        open={this.props.isOpen}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
      >
        <div style={styles.modal}>{this.renderTicketData()}</div>
      </Modal>
    );
  }
}
