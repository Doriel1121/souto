import React, { Component } from 'react'
import Ticket from './ticket'
import SwipeableViews from 'react-swipeable-views'
import FlipMove from 'react-flip-move'
import EmptyBoard from '../resources/board-empty.png'
import { Typography } from '@material-ui/core'

const styles = {
  hiddenTicket: {
    display: 'none',
  },
  board: {
    height: 'calc(100vh - 56px - 62px - 56px)',
    overflow: 'auto',
    textAlign: 'center',
  },
  emptyBoardImage: {
    marginTop: '20px',
    height: '60vh',
    opacity: '15%',
  },
  emptyBoardText: {
    color: '#464646',
  },
}

export default class Board extends Component {
  renderViews = (ticket) => {
    let result = []
    if (this.props.movePrev !== undefined) {
      result.push(<div key={'prev'} style={styles.hiddenTicket}></div>)
    }
    result.push(
      <div key={'ticket'}>
        <Ticket
          info={ticket}
          isManager={false}
          delete={this.props.deleteTicket}
          flag={this.props.flag}
        />
      </div>
    )
    if (this.props.moveNext !== undefined) {
      result.push(<div key={'next'} style={styles.hiddenTicket}></div>)
    }
    return result
  }

  render() {
    return (
      <div style={styles.board}>
        <FlipMove
          typeName={null}
          maintainContainerHeight={true}
          duration={100}
          staggerDurationBy={50}
        >
          {this.props.tickets.length === 0 ? (
            <div>
              <img
                src={EmptyBoard}
                style={styles.emptyBoardImage}
                alt="empty board"
              />
              <Typography variant="h4" style={styles.emptyBoardText}>
                No tickets here!
              </Typography>
            </div>
          ) : (
            this.props.tickets.map((ticket) => {
              return (
                <SwipeableViews
                  index={this.props.movePrev === undefined ? 0 : 1}
                  key={ticket.id}
                  axis="x-reverse"
                  onChangeIndex={(a, b) => {
                    setTimeout(() => {
                      if (a > b && this.props.moveNext !== undefined) {
                        this.props.moveNext(ticket)
                      } else if (this.props.movePrev !== undefined) {
                        this.props.movePrev(ticket)
                      }
                    }, 500)
                  }}
                >
                  {this.renderViews(ticket)}
                </SwipeableViews>
              )
            })
          )}
        </FlipMove>
      </div>
    )
  }
}
