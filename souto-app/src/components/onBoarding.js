import React, { Component } from 'react'
import { Backdrop, Fab, Button, Grid, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import dragAnimation from '../resources/onBoardingDrag.gif'
import welcomePageImage from '../resources/onBoardingWelcome.png'
import captainKeyImage from '../resources/onBoardCaptainKey.png'
import sailorKeyImage from '../resources/onBoardSailorKey.png'

const styles = {
  backdrop: {
    zIndex: 2,
    color: '#fff',
  },
  container: {
    border: 'solid 1px',
    width: '80vw',
    height: '80vh',
    borderRadius: '15px',
    color: '#252525',
    padding: '3vh',
    background: 'linear-gradient(225deg, #f9f9f9, #6d6d6d)',
  },
  animationContainer: {
    border: 'solid 1px',
    width: '70vw',
    height: '45vh',
    boxShadow: '0 0 5px 0px black',
    padding: '0px',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  data: {
    height: '20vh',
  },
  actions: {
    border: 'solid 1px',
    margin: '3vh',
  },
  animationImage: {
    width: '68vw',
    height: '-webkit-fill-available',
  },
  dataTitle: {
    color: 'black',
    fontWeight: '800',
  },
}

const onBoardStages = [
  {
    image: welcomePageImage,
    title: 'Welcome',
    text:
      'Work with me is super simple. If you are an employer who wants his people come aboard, then you are a Captain! If you are an employee who needs to join aboard, then you are a Sailor!',
  },
  {
    image: captainKeyImage,
    title: 'Captain!',
    text:
      'Give the key to your employees so they can connect to your board. And make sure you remmember the secret, you need it to re-connect to your board in the future!',
  },
  {
    image: sailorKeyImage,
    title: 'Sailor!',
    text:
      'Ask your employer for a board key. Just put it here, and you good to go.',
  },
  {
    image: dragAnimation,
    title: 'Pick a ticket',
    text:
      "It's super simple! Just pick a ticket you want to work on, and drag it to the right.",
  },
]

export default class OnBoarding extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,
    }
  }

  successfullyClose = () => {
    window.localStorage.setItem('soutoOnBoarded', 'true')
    this.props.close()
  }

  renderPageByIndex = (index) => {
    return (
      <React.Fragment>
        <Grid item xs={12} style={styles.animationContainer}>
          <img
            src={onBoardStages[index].image}
            alt={'onBoard'}
            style={styles.animationImage}
          />
        </Grid>
        <Grid item xs={12} style={styles.data}>
          <Typography variant="h6" style={styles.dataTitle}>
            {onBoardStages[index].title}
          </Typography>
          <Typography variant="body2" style={{ color: 'black' }}>
            {onBoardStages[index].text}
          </Typography>
        </Grid>
      </React.Fragment>
    )
  }

  render() {
    return (
      <Backdrop style={styles.backdrop} open={true}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
          style={styles.container}
        >
          {this.renderPageByIndex(this.state.currentIndex)}
          <Grid item xs={6} style={{ paddingLeft: '0px' }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<NavigateBeforeIcon />}
              disabled={this.state.currentIndex === 0}
              onClick={() => {
                this.setState({
                  currentIndex: this.state.currentIndex - 1,
                })
              }}
            >
              Back
            </Button>
          </Grid>
          {this.state.currentIndex === onBoardStages.length - 1 ? (
            <Grid item xs={6} style={{ paddingRight: '0px' }}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                endIcon={<CloseIcon />}
                onClick={this.successfullyClose}
              >
                Close
              </Button>
            </Grid>
          ) : (
            <Grid item xs={6} style={{ paddingRight: '0px' }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                endIcon={<NavigateNextIcon />}
                onClick={() => {
                  this.setState({
                    currentIndex: this.state.currentIndex + 1,
                  })
                }}
              >
                Next
              </Button>
            </Grid>
          )}
        </Grid>
        <Fab size="small" style={styles.closeButton} onClick={this.props.close}>
          <CloseIcon />
        </Fab>
      </Backdrop>
    )
  }
}
