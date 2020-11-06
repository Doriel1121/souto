import React, { Component } from 'react'
import { Avatar, Modal, TextField, Grid, Fab, Select } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import config from '../config'

const styles = {
  modal: {
    backgroundColor: 'white',
    width: '80vw',
    margin: 'auto',
    marginTop: '15vh',
    borderRadius: '10px',
    textAlign: 'center',
    backdropFilter: 'blur(3px)',
    opacity: '0.7',
    boxShadow: '0 0 16px 5px black',
    outline: 'none',
  },
  avatar: {
    width: '15vw',
    height: '15vw',
    margin: '0 auto',
    backgroundColor: 'white',
    border: 'solid 1px black',
    marginTop: '3vh',
  },
  avatarDiv: {
    backgroundColor: '#CFCDCC',
    borderRadius: '10px 10px 0 0',
    background: 'linear-gradient(45deg, #00B4DB, rgb(28 111 140))',
    minHeight: '15vh',
    display: 'flex',
  },
  description: {
    fontSize: 'small',
    textAlign: 'left',
  },
  modalContent: {
    width: '90%',
    margin: 'auto',
    paddingTop: '2vh',
  },
  changeIconSelect: {
    color: '#464646',
  },
}

export default class TicketDescription extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.ticket.id,
      title: this.props.ticket.title,
      description: this.props.ticket.description,
      icon: this.props.ticket.icon,
    }
  }

  isChangedFromInit = () => {
    return (
      this.state.title !== this.props.ticket.title ||
      this.state.description !== this.props.ticket.description ||
      this.state.icon !== this.props.ticket.icon
    )
  }

  getTicket = () => {
    return {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      icon: this.state.icon,
    }
  }

  clean = () => {
    this.setState(
      {
        title: '',
        description: '',
      },
      this.props.close
    )
  }

  renderTicketData = () => {
    if (this.props.isManager) {
      return (
        <div>
          <div style={styles.avatarDiv}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={12}>
                <Avatar
                  src={config.iconImages[this.state.icon]}
                  style={styles.avatar}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  native
                  value={this.state.icon}
                  onChange={(e) => {
                    this.setState({ icon: e.target.value })
                  }}
                >
                  <option style={styles.changeIconSelect} value={0}>
                    Communication
                  </option>
                  <option style={styles.changeIconSelect} value={1}>
                    Development
                  </option>
                  <option style={styles.changeIconSelect} value={2}>
                    Research
                  </option>
                  <option style={styles.changeIconSelect} value={3}>
                    Registration
                  </option>
                </Select>
              </Grid>
            </Grid>
          </div>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={3}
            style={styles.modalContent}
          >
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                value={this.state.title}
                fullWidth
                inputProps={{
                  maxLength: 40,
                }}
                onChange={(event) => {
                  this.setState({ title: event.target.value })
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                value={this.state.description}
                fullWidth
                onChange={(event) => {
                  this.setState({ description: event.target.value })
                }}
                multiline
                rows={6}
                rowsMax={6}
                inputProps={{
                  maxLength: 300,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Fab
                onClick={() => {
                  this.props.close()
                }}
              >
                <CancelIcon />
              </Fab>
            </Grid>
            <Grid item xs={6}>
              <Fab
                disabled={!this.isChangedFromInit()}
                color="primary"
                onClick={() => {
                  this.props.update(this.getTicket(), this.props.close)
                }}
              >
                <SaveIcon />
              </Fab>
            </Grid>
          </Grid>
        </div>
      )
    } else {
      return (
        <div>
          <div style={styles.avatarDiv}>
            <Avatar
              src={config.iconImages[this.props.ticket.icon]}
              style={styles.avatar}
            />
          </div>
          <div style={styles.modalContent}>
            <h3 style={styles.title}>{this.props.ticket.title}</h3>
            <p style={styles.description}>{this.props.ticket.description}</p>
          </div>
        </div>
      )
    }
  }
  render() {
    return (
      <Modal
        onClose={() => this.props.close()}
        open={this.props.isOpen}
        style={styles.modalOut}
      >
        <div style={styles.modal}>{this.renderTicketData()}</div>
      </Modal>
    )
  }
}
