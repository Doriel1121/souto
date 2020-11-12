import axios from 'axios'
import React, { Component } from 'react'
import Menu from '../menu'
import config from '../../config'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'
import { Grid, Box, Typography } from '@material-ui/core'

const styles = {
  progressBar: {
    flexGrow: '1',
    backgroundColor: 'transparent',
    paddingTop: '3vh',
    marginRight: '0',
  },
  names: {
    textAlign: 'center',
    transform: 'translateY(1.7vh)',
  },
  userProgressInfo: {
    overflow: 'auto',
    height: '40vh',
    position: 'absolute',
    bottom: '0px',
    borderTop: 'solid 1px',
    width: '100vw',
  },
  percent: {
    transform: 'translateY(1.7vh)',
  },
  svgLoading: {
    display: 'block',
    width: '10vw',
    height: '10vh',
    margin: 'auto',
  },
  empty: {
    textAlign: 'center',
    fontSize: '25px',
  },
  backdrop: {
    zIndex: 1,
    color: '#fff',
  },
  peopleContainer: {
    padding: '2vw',
  },
  singlePerson: {
    textAlign: 'center',
    margin: '3vw auto',
    width: '20vw',
    height: '20vw',
    borderRadius: '15px',
    background: 'linear-gradient(45deg, rgb(167 167 167), rgb(255 255 255))',
    border: 'solid 1px',
    boxShadow: 'rgb(78, 78, 78) 4px 4px 15px 1px',
  },
  selectedPerson: {
    textAlign: 'center',
    margin: '3vw auto',
    width: '20vw',
    height: '20vw',
    borderRadius: '15px',
    background: 'linear-gradient(45deg, rgb(167 167 167), rgb(124 124 124))',
    border: 'solid 1px',
    boxShadow: 'rgb(78, 78, 78) 4px 4px 15px 1px',
  },
  card: {
    margin: '10vw',
    width: '80vw',
    height: '40vh',
    borderRadius: '5px',
    background: 'linear-gradient(45deg, #00B4DB, rgb(28 111 140))',
    boxShadow: '0px 0px 20px 1px rgb(78 78 78)',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  circularCard: {
    borderRadius: '40vw',
    width: '60vw',
    height: '60vw',
    background: 'linear-gradient(225deg, #00B4DB, rgb(28 111 140))',
  },
}

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress color={'primary'} variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

export default class ManageUsersPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      usersProgress: [],
      open: true,
      selectedPersonId: -1,
    }
  }

  componentDidMount = () => {
    this.getUsersData(() => {
      this.syncInterval(5000)
    })
  }

  syncInterval = (interval) => {
    setTimeout(() => {
      this.getUsersData(() => {
        this.syncInterval(interval)
      })
    }, interval)
  }

  getUsersData = (callback) => {
    axios
      .get(
        config.server +
          '/board/allusers/' +
          window.localStorage.getItem('captainBoardId')
      )
      .then((res) => {
        this.setState({ usersProgress: res.data, open: false }, callback)
      })
      .catch((err) => {
        console.log(err)
        alert('Sorry could not get the data please try again later ')
      })
  }

  renderCrew = (list) => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignContent="center"
        spacing={0}
        style={styles.peopleContainer}
      >
        {list.map((item) => {
          let percent = (100 / item.c) * item.o
          return (
            <Grid
              item
              xs={3}
              key={item.id}
              onClick={() => {
                this.setState({ selectedPersonId: item.id })
              }}
            >
              <div
                style={
                  item.id === this.state.selectedPersonId
                    ? styles.selectedPerson
                    : styles.singlePerson
                }
              >
                <div style={{ fontSize: '12px', marginTop: '5px' }}>
                  {item.Name}
                </div>
                <br />
                <CircularProgressWithLabel value={percent} />
              </div>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  renderSelectedPerson = (person) => {
    return (
      <div style={styles.card}>
        <div style={styles.circularCard}></div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Menu isManager={true} title="My crew progress" />
        {this.state.usersProgress.length > 0
          ? this.renderSelectedPerson(this.state.selectedPerson)
          : null}
        <div style={styles.userProgressInfo}>
          {this.state.usersProgress.length > 0 ? (
            this.renderCrew(this.state.usersProgress)
          ) : !this.state.open ? (
            <div style={styles.empty}>No crew members yet</div>
          ) : null}
        </div>
        <Backdrop style={styles.backdrop} open={this.state.open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
  }
}
