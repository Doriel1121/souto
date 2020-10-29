import React, { Component } from "react";
import { Typography, Avatar } from "@material-ui/core";

const styles = {
  pickBox: {
    margin: "2.5vh",
    top: "5vh",
    width: "90%",
    height: "8vh",
    borderRadius: "15px",
    backgroundColor: "white",
    boxShadow: "0 0 10px 1px #3e3e3e",
  },
  title: {
    fontSize: "small",
    position: "relative",
    top: -7,
    color: "#646261",
    marginLeft: "2vh",
    display: "inline-block",
    fontWeight: "bolder",
  },
  avatar: {
    width: "5vh",
    height: "5vh",
    backgroundColor: "purple",
    display: "inline-block",
    transform: "translateY(30%)",
    marginLeft: "2vh",
  },
  rearInfo: {
    fontSize: "x-small",
    color: "#BFBAB8 ",
    marginLeft: "9vh",
    lineHeight: "0.07",
  },
};

export default class Ticket extends Component {
  render() {
    console.log(this.props.info.description.length);
    return (
      <div style={styles.pickBox}>
        <Avatar style={styles.avatar}>
          <span style={styles.AvatarContent}></span>
        </Avatar>
        <Typography style={styles.title}>{this.props.info.title}</Typography>
        <Typography style={styles.rearInfo}>
          {this.props.info.description.length > 50
            ? this.props.info.description.slice(0, 45) + "..."
            : null}
        </Typography>
      </div>
    );
  }
}
