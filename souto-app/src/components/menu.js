import React, { Component } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Redirect } from 'react-router-dom'

const styles = {
  menu: {
    width: '45vw',
  },
}

export default class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      redirectToLogin: false,
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
      return <Redirect to="/" />
    }

    return (
      <div>
        <AppBar position="static">
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
            <Typography variant="h6">{this.props.title}</Typography>
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
              <ListItem
                button
                key={'logout'}
                onClick={() => {
                  this.logout()
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    )
  }
}
