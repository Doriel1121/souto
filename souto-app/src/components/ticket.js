import React, { Component } from 'react'
import { Typography, Avatar, Grid, IconButton, Fab } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import TicketDescription from './ticketDescription'
import config from '../config'
import WhiteFlagImage from '../resources/white-flag.png'
import RedFlagImage from '../resources/red-flag.png'
import LinkValidator from './linkValidator'

const styles = {
  pickBox: {
    margin: '12px',
    width: 'auto',
    height: '65px',
    borderRadius: '15px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px 1px #3e3e3e',
    textAlign: 'left',
  },
  title: {
    fontSize: 'small',
    color: '#646261',
    display: 'inline-block',
    fontWeight: 'bolder',
  },
  avatar: {
    width: '40px',
    height: '40px',
    backgroundColor: '#50acce',
    border: 'solid 1px',
  },
  rearInfo: {
    fontSize: 'x-small',
    color: '#BFBAB8 ',
  },
  textBox: {
    paddingLeft: '0px',
  },
  avatarBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  deleteIcon: {
    color: '#737373',
  },
  flag: {
    height: '4vh',
  },
}

export default class Ticket extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      deleteValidationOpen: false,
    }
  }

  render() {
    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          wrap="nowrap"
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
            item
            xs={8}
            style={styles.textBox}
            onClick={() => {
              this.setState({ isOpen: true })
            }}
          >
            <Typography style={styles.title}>
              {this.props.info.title}
            </Typography>
            <Typography noWrap style={styles.rearInfo}>
              {this.props.info.description}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {this.props.isManager ? (
              <LinkValidator
                open={this.state.deleteValidationOpen}
                close={() => {
                  this.setState({ deleteValidationOpen: false })
                }}
                action={() => {
                  this.props.delete(this.props.info.id)
                }}
              >
                <IconButton
                  onClick={() => {
                    this.setState({ deleteValidationOpen: true })
                  }}
                  style={styles.deleteIcon}
                  edge="start"
                  color="inherit"
                >
                  <DeleteIcon />
                </IconButton>
              </LinkValidator>
            ) : (
              <Fab
                size={'small'}
                onClick={() => {
                  this.props.flag(this.props.info.id, !this.props.info.flag)
                }}
              >
                <img
                  alt="flag"
                  src={this.props.info.flag ? RedFlagImage : WhiteFlagImage}
                  style={styles.flag}
                />
              </Fab>
            )}
          </Grid>
        </Grid>
        <TicketDescription
          isOpen={this.state.isOpen}
          ticket={this.props.info}
          close={() => {
            this.setState({ isOpen: false })
          }}
          isManager={this.props.isManager}
          update={this.props.update}
        />
      </React.Fragment>
    )
  }
}
