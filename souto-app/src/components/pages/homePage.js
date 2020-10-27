import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, IconButton, BottomNavigation, BottomNavigationAction, MobileStepper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const styles = {
    page: {
        height: '60vh',
        margin: '3vh',
        borderRadius: '15px',
        background: 'linear-gradient(45deg, #00B4DB, rgb(28 111 140))',
        boxShadow: '0px 0px 20px 1px rgb(78 78 78)',
        marginTop: '15vw'
    },
    buttonNav: {
        position: 'absolute',
        bottom: '0px',
        width: '100vw'
    },
    progressBar: {
        width: '100vw',
        flexGrow: '1',
      },
}

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentList: 0
        }
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        On boarding
                    </Typography>
                </Toolbar>
                </AppBar>
                <MobileStepper
                variant="progress"
                steps={6}
                position="static"
                activeStep={4}
                style={styles.progressBar}
                />
                <div style={styles.page}>
                    
                </div>
                <BottomNavigation
                style={styles.buttonNav}
                value={this.state.currentList}
                onChange={(_, newList) => {
                    this.setState({currentList: newList})
                }}
                showLabels
                >
                    <BottomNavigationAction label="To do" icon={<FormatListBulletedIcon />} />
                    <BottomNavigationAction label="In progress" icon={<EditIcon />} />
                    <BottomNavigationAction label="Done" icon={<CheckCircleIcon />} />
                </BottomNavigation>
            </div>
        )
    }
}
