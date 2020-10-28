import React, { Component } from "react";
import { Typography, Avatar } from "@material-ui/core";

const styles = {
  pickBox: {
    marginBottom: "1.5vh",
    marginLeft: "2vh",
    position: "relative",
    top: "5vh",
    width: "90%",
    height: "8vh",
    borderRadius: "15px",
    backgroundColor: "white",
  },
  title: {
    fontSize: "small",
    color: "grey",
    marginLeft: "2vh",
    display: "inline-block",
  },
  avatar: {
    width: "5vh",
    height: "5vh",
    backgroundColor: "purple",
    display: "inline-block",
    transform: "translateY(30%)",
    marginLeft: "2vh",
  },
};

export default class Ticket extends Component {
  render() {
    return (
      <div style={styles.pickBox} square={false}>
        <Avatar style={styles.avatar}>
          <span style={styles.AvatarContent}></span>
        </Avatar>
        <Typography style={styles.title}>{this.props.list.task}</Typography>
      </div>
    );
  }
}
