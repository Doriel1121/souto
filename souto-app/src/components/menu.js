import React, { Component } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'
import GroupIcon from '@material-ui/icons/Group'
import SettingsIcon from '@material-ui/icons/Settings'
import { Redirect, Link } from 'react-router-dom'
import LinkValidator from './linkValidator'

const styles = {
  menu: {
    width: '45vw',
    color: '#444444',
  },
  appBar: {
    background: 'linear-gradient(45deg, rgb(28, 111, 140), rgb(0, 180, 219))',
  },
}

export default class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      redirectToLogin: false,
      validatorOpen: false,
    }
  }

  logout = () => {
    window.localStorage.removeItem('captainBoardId')
    window.localStorage.removeItem('sailorUserId')
    this.setState({
      redirectToLogin: true,
    })
  }

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />
    }
    if (this.props.title !== undefined) {
      var titleLength = this.props.title.length
    }
   
    return (
      <div>
        <AppBar style={styles.appBar} position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                this.setState({ isOpen: !this.state.isOpen })
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant = {titleLength < 29 ? "h6" : "subtitle1" } >{this.props.title}</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.state.isOpen}
          onClose={() => {
            this.setState({ isOpen: !this.state.isOpen })
          }}
        >
          <div style={styles.menu}>
            <List>
              <Link
                to={this.props.isManager ? '/manager/main' : '/client/main'}
              >
                <ListItem button key={'home'}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  Home
                </ListItem>
              </Link>
              {this.props.isManager ? (
                <Link to="/manager/userProgress">
                  <ListItem button key={'crew'}>
                    <ListItemIcon>
                      <GroupIcon />
                    </ListItemIcon>
                    My crew
                  </ListItem>
                </Link>
              ) : null}
              <Link
                to={
                  this.props.isManager ? '/manager/summary' : '/client/summary'
                }
              >
                <ListItem button key={'settings'}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  {this.props.isManager ? 'My board' : 'My user'}
                </ListItem>
              </Link>
              <LinkValidator
                close={() => {
                  this.setState({ validatorOpen: false })
                }}
                open={this.state.validatorOpen}
                action={this.logout}
                message={
                  this.props.isManager
                    ? 'Make sure you remember your secret for re-connect to your board as Captain'
                    : 'Please make sure you remember your secret key with whom you can log-in'
                }
              >
                <ListItem
                  button
                  onClick={() => {
                    this.setState({ validatorOpen: true })
                  }}
                  key={'logout'}
                >
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  Logout
                </ListItem>
              </LinkValidator>
            </List>
          </div>
        </Drawer>
      </div>
    )
  }
}
