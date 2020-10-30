import React, { Component } from "react";
import { Typography, Avatar, Grid } from "@material-ui/core";

const styles = {
  pickBox: {
    margin: "2.5vh",
    width: "92.5vw",
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
    backgroundColor: "purple",
    display: "inline-block",
  },
  rearInfo: {
    fontSize: "x-small",
    color: "#BFBAB8 ",
  },
  textBox: {
    paddingLeft: "0px"
  },
  avatarBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  }
};

export default class Ticket extends Component {
  render() {
    return (
      <Grid container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={3}
      style={styles.pickBox}>
        <Grid item xs={2} style={styles.avatarBox}>
          <Avatar style={styles.avatar}>
            <span style={styles.AvatarContent}></span>
          </Avatar>
        </Grid>
        <Grid item xs={10} style={styles.textBox}>
          <Typography style={styles.title}>{this.props.info.title}</Typography>
          <Typography style={styles.rearInfo}>
            {this.props.info.description}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
