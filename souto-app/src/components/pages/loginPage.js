import React, { Component } from 'react'
import { Button, TextField, Grid, Typography, Input } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import axios from 'axios'
import config from '../../config'
import { Redirect } from 'react-router-dom'
import { autoPlay } from 'react-swipeable-views-utils'
import loginImage0 from '../../resources/login-image-0.jpg'
import loginImage1 from '../../resources/login-image-1.jpg'
import loginImage2 from '../../resources/login-image-2.jpg'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const styles = {
  imagesGallery: {
    height: '60vh',
  },
  loginImage: {
    height: '60vh',
  },
  login: {
    position: 'absolute',
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
    justifyContent: 'center',
    alignItems: 'center',
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
}

export default class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageIndex: 0,
      viewIndex: 0,
      captainBoardName: '',
      captainBoardSecret: '',
      captainBoardFromServer: {},
      redirectCaptain: false,
      sailorBoardKey: '',
      sailorName: '',
      sailorBoardFromServer: {},
      redirectSailor: false,
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
        alert(error)
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
        alert(error)
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
        alert(error)
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
        alert(error)
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
        <div style={styles.imagesGallery}>
          <AutoPlaySwipeableViews
            index={this.state.imageIndex}
            axis="x"
            interval={5000}
            onChangeIndex={(index) => {
              this.setState({ imageIndex: index })
            }}
            style={styles.views}
          >
            <div>
              <img src={loginImage0} alt={'image0'} style={styles.loginImage} />
            </div>
            <div>
              <img src={loginImage1} alt={'image1'} style={styles.loginImage} />
            </div>
            <div>
              <img src={loginImage2} alt={'image2'} style={styles.loginImage} />
            </div>
          </AutoPlaySwipeableViews>
        </div>
        <div style={styles.login}>
          <SwipeableViews
            index={this.state.viewIndex}
            axis="x"
            disabled
            style={styles.views}
          >
            <div style={styles.singleView}>
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
                  <Typography variant={'h6'} style={styles.text}>
                    What is your board name?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
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
                    Go back
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
                    Let's go!
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
                  <Typography variant={'h6'} style={styles.text}>
                    What is your board secret?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Input
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
                    Go back
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
                    Let's go!
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
                    Go back
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
                  <Typography variant={'h6'} style={styles.text}>
                    What is your board key?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Input
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
                    Go back
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
                  <Typography variant={'h6'} style={styles.text}>
                    What is your name?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
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
          </SwipeableViews>
        </div>
      </div>
    )
  }
}
