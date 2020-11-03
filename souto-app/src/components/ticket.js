import React, { Component } from "react";
import { Typography, Avatar, Grid, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import TicketDescription from "./ticketDescription";
import config from "../config";

const styles = {
  pickBox: {
    margin: "1.5vh",
    width: "auto",
    height: "10vh",
    borderRadius: "15px",
    backgroundColor: "white",
    boxShadow: "0 0 10px 1px #3e3e3e",
  },
  title: {
    fontSize: "small",
    color: "#646261",
    display: "inline-block",
    fontWeight: "bolder",
  },
  avatar: {
    width: "5vh",
    height: "5vh",
    backgroundColor: "#50acce",
    border: "solid 1px",
  },
  rearInfo: {
    fontSize: "x-small",
    color: "#BFBAB8 ",
  },
  textBox: {
    paddingLeft: "0px",
  },
  avatarBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  deleteIcon: {
    color: "#737373",
  },
};

export default class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={3}
          style={styles.pickBox}
        >
          <Grid item xs={2} style={styles.avatarBox}>
            <Avatar
              src={config.iconImages[this.props.info.icon]}
              style={styles.avatar}
            />
          </Grid>
          <Grid
            zeroMinWidth
            item
            xs={this.props.isManager ? 8 : 10}
            style={styles.textBox}
            onClick={() => {
              this.setState({ isOpen: true });
            }}
          >
            <Typography maxLength="2" style={styles.title}>
              {this.props.info.title}
            </Typography>
            <Typography noWrap style={styles.rearInfo}>
              {this.props.info.description}
            </Typography>
          </Grid>
          {this.props.isManager ? (
            <Grid item xs={2}>
              <IconButton
                onClick={() => {
                  this.props.delete(this.props.info.id);
                }}
                style={styles.deleteIcon}
                edge="start"
                color="inherit"
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        <TicketDescription
          isOpen={this.state.isOpen}
          ticket={this.props.info}
          close={() => {
            this.setState({ isOpen: false });
          }}
          isManager={this.props.isManager}
          update={this.props.update}
        />
      </React.Fragment>
    );
  }
}
