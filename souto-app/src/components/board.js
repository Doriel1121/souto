import React, { Component } from "react";
import Ticket from "./ticket";
import SwipeableViews from "react-swipeable-views";
import FlipMove from "react-flip-move";

const styles = {
  hiddenTicket: {
    display: "none",
  },
};

export default class Board extends Component {
  renderViews = (ticket) => {
    let result = [];
    if (this.props.movePrev !== undefined) {
      result.push(<div key={"prev"} style={styles.hiddenTicket}></div>);
    }
    result.push(
      <div key={"ticket"}>
        <Ticket
          info={ticket}
          isManager={false}
          delete={this.props.deleteTicket}
        />
      </div>
    );
    if (this.props.moveNext !== undefined) {
      result.push(<div key={"next"} style={styles.hiddenTicket}></div>);
    }
    return result;
  };

  render() {
    return (
      <div style={{ height: "80%" }}>
        <FlipMove
          typeName={null}
          maintainContainerHeight={true}
          duration={100}
          staggerDurationBy={50}
        >
          {this.props.tickets.map((ticket) => {
            return (
              <SwipeableViews
                index={this.props.movePrev === undefined ? 0 : 1}
                key={ticket.id}
                axis="x-reverse"
                onChangeIndex={(a, b) => {
                  setTimeout(() => {
                    if (a > b && this.props.moveNext !== undefined) {
                      this.props.moveNext(ticket);
                    } else if (this.props.movePrev !== undefined) {
                      this.props.movePrev(ticket);
                    }
                  }, 500);
                }}
              >
                {this.renderViews(ticket)}
              </SwipeableViews>
            );
          })}
        </FlipMove>
      </div>
    );
  }
}
