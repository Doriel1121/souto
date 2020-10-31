import React, { Component } from "react";
import { Typography, Avatar } from "@material-ui/core";

const styles = {
  pickBox: {
    margin: "2vh",
    top: "5vh",
    width: "90%",
    height: "100%",
    borderRadius: "15px",
    backgroundColor: "white",
    boxShadow: "0 0 10px 1px #3e3e3e",
  },
  title: {
    fontSize: "small",
    position: "relative",
    // top: 0,
    color: "#646261",
    // marginLeft: "2vh",
    // display: "inline",
    // fontWeight: "bolder",
  },
  avatar: {
    width: "5vh",
    height: "5vh",
    backgroundColor: "purple",
    display: "inline-block",
    transform: "translateY(50%)",
    marginLeft: "2vh",
  },
  rearInfo: {
    fontSize: "x-small",
    display: "block",
    color: "#BFBAB8 ",
    marginLeft: "9vh",
    // marginTop: "0",
    lineHeight: "0vh",
  },

  ticketForm: {
    display: "inline",
    // marginTop: "10%",
    marginLeft: "2vh",
    // verticalAlign: "middle",
  },
};

export default class Ticket extends Component {
  render() {
    return (
      <div style={styles.pickBox}>
        <div style={{ display: "inline" }}>
          <Avatar style={styles.avatar}>
            <span style={styles.AvatarContent}></span>
          </Avatar>
        </div>
        <div style={styles.ticketForm}>
          <b style={styles.title}>{this.props.info.title}</b>
          {this.props.info.description.length > 50 ? (
            <p style={styles.rearInfo}>
              {this.props.info.description.slice(0, 45) + ".."}
            </p>
          ) : (
            <p style={styles.rearInfo}>{this.props.info.description}</p>
          )}
        </div>
      </div>
    );
  }
}
