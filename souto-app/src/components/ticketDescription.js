import React, { Component } from 'react'
import { Avatar, Modal, TextField, Grid, Fab } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

const styles = {
  modal: {
    backgroundColor: 'white',
    width: '80vw',
    height: '70vh',
    margin: 'auto',
    marginTop: '15vh',
    borderRadius: '10px',
    textAlign: 'center',
    backdropFilter: 'blur(3px)',
    opacity: '0.7',
    boxShadow: '0 0 16px 5px black',
  },

  avatar: {
    width: '8vh',
    height: '8vh',
  },
  avatarDiv: {
    backgroundColor: '#CFCDCC',
    borderRadius: '10px 10px 0 0',
    height: '15vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
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
}

export default class TicketDescription extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.ticket.id,
      title: this.props.ticket.title,
      description: this.props.ticket.description,
    }
  }

  isChangedFromInit = () => {
    return (
      this.state.title !== this.props.ticket.title ||
      this.state.description !== this.props.ticket.description
    )
  }

  getTicket = () => {
    return {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
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
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={3}
          style={styles.modalContent}
        >
          <Grid item xs={12}>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              value={this.state.title}
              fullWidth
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
                this.props.update(this.getTicket(), this.clean)
              }}
            >
              <SaveIcon />
            </Fab>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <div style={styles.modalContent}>
          <h3 style={styles.title}>{this.props.ticket.title}</h3>
          <p style={styles.description}>{this.props.ticket.description}</p>
        </div>
      )
    }
  }
  render() {
    return (
      <Modal
        onClose={() => this.props.close()}
        open={this.props.isOpen}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
      >
        <div style={styles.modal}>
          <div style={styles.avatarDiv}>
            <Avatar style={styles.avatar}></Avatar>
          </div>
          {this.renderTicketData()}
        </div>
      </Modal>
    )
  }
}
