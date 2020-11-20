import React, { Component } from 'react'
import { Button, TextField, Grid, Typography, Fab } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import axios from 'axios'
import config from '../../config'
import { Redirect } from 'react-router-dom'
import logoWhite from '../../resources/logo-white.png'
import OnBoarding from '../onBoarding'
import InfoIcon from '@material-ui/icons/Info'

const styles = {
  logoImage: {
    width: '100vw',
    height: '60vh',
    minHeight: '400px',
    background: 'linear-gradient(45deg, rgb(28, 111, 140), rgb(0, 180, 219))',
  },
  loginImage: {
    width: '100vw',
  },
  login: {
    bottom: '0',
    height: '40vh',
    width: '100vw',
  },
  typeButton: {
    width: '50vw',
  },
  singleView: {
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '50px',
  },
  views: {
    overflowX: 'hidden',
    width: 'inherit',
    height: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  form: {
    width: '65vw',
  },
  text: {
    color: '#484848',
  },
  openOnBoarding: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
}

export default class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onBoard: false,
      viewIndex: 0,
      captainBoardName: '',
      captainBoardSecret: '',
      captainBoardFromServer: {},
      redirectCaptain: false,
      sailorBoardKey: '',
      sailorName: '',
      sailorSecret: '',
      sailorBoardFromServer: {},
      redirectSailor: false,
    }
  }

  componentDidMount = () => {
    if (window.localStorage.getItem('sailorUserId')) {
      this.setState({ redirectSailor: true })
    } else if (window.localStorage.getItem('captainBoardId')) {
      this.setState({ redirectCaptain: true })
    } else if (!window.localStorage.getItem('soutoOnBoarded')) {
      this.setState({ onBoard: true })
    }
  }

  registerUser = () => {
    let user = { name: this.state.sailorName }
    axios
      .post(
        config.server + '/users/add/' + this.state.sailorBoardFromServer.id,
        user
      )
      .then((response) => {
        window.localStorage.setItem('sailorUserId', response.data.id)
        this.setState({
          sailorName: '',
          redirectSailor: true,
        })
      })
      .catch((error) => {
        console.log(error)
        alert('Sorry! could not register. Please try again later')
      })
  }

  loginBySecret = () => {
    console.log(this.state.sailorSecret)
    axios
      .get(config.server + '/users/secret/' + this.state.sailorSecret)
      .then((response) => {
        window.localStorage.setItem('sailorUserId', response.data.id)
        this.setState({
          sailorSecret: '',
          redirectSailor: true,
        })
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 500) {
          alert('Seems like your secret is not correct')
        } else {
          alert('Sorry! Could not log in. Please try again later')
        }
      })
  }

  findABoardByKey = () => {
    axios
      .get(config.server + '/board/key/' + this.state.sailorBoardKey)
      .then((response) => {
        this.setState({
          sailorBoardKey: '',
          viewIndex: 5,
          sailorBoardFromServer: response.data,
        })
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 500) {
          alert('Could not find a board with this key')
        } else {
          alert('Sorry! could not search for the board. Please try again later')
        }
      })
  }

  registerABoard = () => {
    let board = { name: this.state.captainBoardName }
    axios
      .post(config.server + '/boards/add', board)
      .then((response) => {
        this.setState({
          captainBoardName: '',
          captainBoardFromServer: response.data,
          viewIndex: 3,
        })
      })
      .catch((error) => {
        console.log(error)
        alert('Sorry! could not register a board. Please try again later')
      })
  }

  loginACaptainBoard = () => {
    axios
      .get(config.server + '/board/secret/' + this.state.captainBoardSecret)
      .then((response) => {
        this.setState(
          {
            captainBoardFromServer: response.data,
          },
          this.loginCaptain
        )
      })
      .catch((error) => {
        console.log(error)
        alert('Sorry! could not log you in. Please try again later')
      })
  }

  loginCaptain = () => {
    window.localStorage.setItem(
      'captainBoardId',
      this.state.captainBoardFromServer.id
    )

    this.setState({
      redirectCaptain: true,
    })
  }

  render() {
    if (this.state.redirectCaptain) {
      return <Redirect to="/manager/main" />
    } else if (this.state.redirectSailor) {
      return <Redirect to="/client/main" />
    }

    return (
      <div>
        {this.state.onBoard ? (
          <OnBoarding
            close={() => {
              this.setState({ onBoard: false })
            }}
          />
        ) : (
          ''
        )}
        <div style={styles.logoImage}>
          <img alt="logo" src={logoWhite} style={styles.loginImage} />
          <Fab
            size="small"
            style={styles.openOnBoarding}
            onClick={() => {
              this.setState({ onBoard: true })
            }}
          >
            <InfoIcon />
          </Fab>
        </div>
        <div style={styles.login}>
          <SwipeableViews
            index={this.state.viewIndex}
            axis="x"
            disabled
            style={styles.views}
          >
            <div
              style={{
                ...styles.singleView,
                paddingTop: '0',
                justifyContent: 'center',
              }}
            >
              <Button
                style={styles.typeButton}
                variant="contained"
                color="primary"
                onClick={() => {
                  this.setState({ viewIndex: 1 })
                }}
              >
                I am a Captain
              </Button>
              <br />
              <Button
                style={styles.typeButton}
                variant="contained"
                color="primary"
                onClick={() => {
                  this.setState({ viewIndex: 4 })
                }}
              >
                I am a Sailor
              </Button>
            </div>
            <div style={styles.singleView}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={styles.form}
                spacing={3}
              >
                <Grid item xs={12}>
                  <Typography variant={'subtitle1'} style={styles.text}>
                    What is your board name?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputProps={{
                      maxLength: 40,
                    }}
                    fullWidth
                    variant="outlined"
                    onChange={(event) => {
                      this.setState({ captainBoardName: event.target.value })
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      this.setState({ viewIndex: 0 })
                    }}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={this.state.captainBoardName.length === 0}
                    onClick={() => {
                      this.registerABoard()
                    }}
                  >
                    Start
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    color="primary"
                    fullWidth
                    onClick={() => {
                      this.setState({ viewIndex: 2 })
                    }}
                  >
                    I have a board secret
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div style={styles.singleView}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={styles.form}
                spacing={3}
              >
                <Grid item xs={12}>
                  <Typography variant={'subtitle1'} style={styles.text}>
                    What is your board secret?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 4)
                    }}
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={(event) => {
                      this.setState({ captainBoardSecret: event.target.value })
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      this.setState({ viewIndex: 1 })
                    }}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={this.state.captainBoardSecret.length === 0}
                    onClick={() => {
                      this.loginACaptainBoard()
                    }}
                  >
                    Start
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div style={styles.singleView}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={styles.form}
                spacing={3}
              >
                <Grid item xs={12}>
                  <Typography
                    variant={'h5'}
                    style={{ ...styles.text, textAlign: 'center' }}
                  >
                    Your board is ready!
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    ...styles.text,
                    textAlign: 'center',
                    padding: '0px',
                  }}
                >
                  Key:
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                    fontSize: 'xxx-large',
                    fontWeight: '800',
                    color: '#0056b1',
                    paddingTop: '0px',
                  }}
                >
                  {this.state.captainBoardFromServer.public_key}
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    ...styles.text,
                    textAlign: 'center',
                    padding: '0px',
                  }}
                >
                  Secret:
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    ...styles.text,
                    textAlign: 'center',
                    padding: '0px',
                  }}
                >
                  {this.state.captainBoardFromServer.secret}
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ ...styles.text, textAlign: 'center' }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      this.setState({ viewIndex: 0 })
                    }}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ ...styles.text, textAlign: 'center' }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      this.loginCaptain()
                    }}
                  >
                    Start
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div style={styles.singleView}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={styles.form}
                spacing={3}
              >
                <Grid item xs={12}>
                  <Typography variant={'subtitle1'} style={styles.text}>
                    What is your board key?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 4)
                    }}
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={(event) => {
                      this.setState({ sailorBoardKey: event.target.value })
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      this.setState({ viewIndex: 0 })
                    }}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={this.state.sailorBoardKey.length === 0}
                    onClick={() => {
                      this.findABoardByKey()
                    }}
                  >
                    Start
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    color="primary"
                    fullWidth
                    onClick={() => {
                      this.setState({ viewIndex: 6 })
                    }}
                  >
                    I have a user secret
                  </Button>
                </Grid>
              </Grid>
            </div>

            <div style={styles.singleView}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={styles.form}
                spacing={3}
              >
                <Grid item xs={12}>
                  <Typography variant={'subtitle1'} style={styles.text}>
                    What is your name?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputProps={{
                      maxLength: 30,
                    }}
                    fullWidth
                    variant="outlined"
                    onChange={(event) => {
                      this.setState({ sailorName: event.target.value })
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={this.state.sailorName.length === 0}
                    onClick={() => {
                      this.registerUser()
                    }}
                  >
                    Start
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div style={styles.singleView}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={styles.form}
                spacing={3}
              >
                <Grid item xs={12}>
                  <Typography variant={'subtitle1'} style={styles.text}>
                    What is your secret?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 4)
                    }}
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={(event) => {
                      this.setState({ sailorSecret: event.target.value })
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      this.setState({ viewIndex: 4 })
                    }}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={this.state.sailorSecret.length === 0}
                    onClick={() => {
                      this.loginBySecret()
                    }}
                  >
                    Start
                  </Button>
                </Grid>
              </Grid>
            </div>
          </SwipeableViews>
        </div>
      </div>
    )
  }
}
