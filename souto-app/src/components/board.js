import React, { Component } from "react";
import Ticket from "./ticket";
import SwipeableViews from "react-swipeable-views";
import FlipMove from "react-flip-move";

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
};

export default class Board extends Component {
  render() {
    return (
      <div>
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
                <div>
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
