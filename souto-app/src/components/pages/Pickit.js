import React, { Component } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const style = {
  pickBox: {
    marginBottom: "8px",
    marginLeft: "10px",
    position: "relative",
    top: "20px",
    width: "90%",
    borderRadius: "15px",
  },
  title: {
    transform: "translateY(17%)",
    fontSize: "small",
    color: "grey",
    marginLeft: "10px",
  },
  avatar: {
    width: "25px",
    height: "25px",
    backgroundColor: "purple",
  },
};

export default class Pickit extends Component {
  render() {
    return this.props.list.map((Pick, index) => {
      return (
        <Accordion key={index} style={style.pickBox} square={false}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Avatar style={style.avatar}>DA</Avatar>
            <Typography style={style.title}>{Pick.task}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={style.expandedBox}>{Pick.extra}</Typography>
          </AccordionDetails>
        </Accordion>
      );
    });
  }
}
