import axios from 'axios'
import React, { Component } from 'react'
import Menu from '../menu'
import config from '../../config'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'
import {
  Grid,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core'
import Progress from '../progress'
import WhiteFlagImage from '../../resources/white-flag.png'
import RedFlagImage from '../../resources/red-flag.png'
import LogoImage from '../../resources/logo.png'

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
    height: '41vh',
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
  singlePersonFlagged: {
    textAlign: 'center',
    margin: '3vw auto',
    width: '20vw',
    height: '20vw',
    borderRadius: '15px',
    background: 'linear-gradient(45deg, rgb(165 72 72), rgb(255 151 151))',
    border: 'solid 1px',
    boxShadow: 'rgb(78, 78, 78) 4px 4px 15px 1px',
  },
  selectedPersonFlagged: {
    textAlign: 'center',
    margin: '3vw auto',
    width: '20vw',
    height: '20vw',
    borderRadius: '15px',
    background: 'linear-gradient(45deg, rgb(165, 72, 72), rgb(156 96 96))',
    border: 'solid 1px',
    boxShadow: 'rgb(78, 78, 78) 4px 4px 15px 1px',
  },
  card: {
    height: 'calc(60vh - 56px)',
    textAlign: 'center',
  },
  flagW: {
    height: '20vh',
    opacity: '0.3',
  },
}

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress color={'primary'} variant="static" {...props} />
      <CircularProgress
        style={{ position: 'absolute', top: '0', opacity: '0.5' }}
        color={'primary'}
        variant="static"
        value={100}
      />
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
      selectedPerson: {},
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
        this.setState(
          {
            usersProgress: res.data,
            open: false,
          },
          callback
        )
      })
      .catch((err) => {
        console.log(err)
        alert('Sorry could not get the data please try again later ')
      })
  }

  getUserFlaggedTickets = (userId) => {
    axios
      .get(config.server + '/tickets/getflag/' + userId)
      .then((response) => {
        let user = this.state.usersProgress.filter((item) => {
          return item.id === userId
        })[0]
        user.flagTickets = response.data
        this.setState({ selectedPerson: user, selectedPersonId: userId })
      })
      .catch((error) => {
        console.log(error)
        alert(
          'Sorry could not get the data about this user. Please try again later'
        )
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
                this.getUserFlaggedTickets(item.id)
              }}
            >
              <div
                style={
                  item.id === this.state.selectedPersonId
                    ? item.f
                      ? styles.selectedPersonFlagged
                      : styles.selectedPerson
                    : item.f
                    ? styles.singlePersonFlagged
                    : styles.singlePerson
                }
              >
                <div
                  style={{
                    fontSize: '12px',
                    marginTop: '5px',
                    marginBottom: '10px',
                  }}
                >
                  {item.Name}
                </div>
                <CircularProgressWithLabel value={percent} />
              </div>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  renderSelectedPerson = () => {
    return (
      <div style={styles.card}>
        {this.state.selectedPersonId === -1 ? (
          <React.Fragment>
            <img src={LogoImage} alt="logo" style={{ height: '30vh' }} />
            <Typography variant="h5" style={{ color: '#131313' }}>
              Select a user
            </Typography>
          </React.Fragment>
        ) : (
          <div style={{ padding: '2vh' }}>
            <Progress
              steps={this.state.selectedPerson.c}
              currentStep={this.state.selectedPerson.o}
              yar
            />
            <br />
            {!this.state.selectedPerson.f ? (
              <img src={WhiteFlagImage} style={styles.flagW} alt="flagWhite" />
            ) : (
              <div style={{ overflow: 'scroll', height: '35vh' }}>
                <List>
                  {this.state.selectedPerson.flagTickets.map((ticket) => {
                    return (
                      <React.Fragment key={ticket.id}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar
                              style={{ border: 'solid 1px' }}
                              alt="Remy Sharp"
                              src={RedFlagImage}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography
                                variant="subtitle2"
                                style={{ color: 'black' }}
                              >
                                {ticket.title}
                              </Typography>
                            }
                            secondary={ticket.description}
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    )
                  })}
                </List>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <div>
        <Menu
          isManager={true}
          title={
            this.state.selectedPersonId === -1
              ? 'My crew'
              : this.state.selectedPerson.Name
          }
        />
        {this.state.usersProgress.length > 0 && !this.state.open ? (
          <React.Fragment>
            {this.renderSelectedPerson()}
            <Divider />
            <div style={styles.userProgressInfo}>
              {this.renderCrew(this.state.usersProgress)}
            </div>
          </React.Fragment>
        ) : (
          <div style={styles.empty}>No crew members yet</div>
        )}
        <Backdrop style={styles.backdrop} open={this.state.open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
  }
}
