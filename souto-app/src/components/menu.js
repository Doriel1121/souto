import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Drawer } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
    menu: {
        width: '45vw'
    }
}

export default class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false
        }
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => {this.setState({isOpen: !this.state.isOpen})}}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            {this.props.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.isOpen} onClose={() => {this.setState({isOpen: !this.state.isOpen})}}>
                <div style={styles.menu}></div>
                </Drawer>
            </div>
        )
    }
}
