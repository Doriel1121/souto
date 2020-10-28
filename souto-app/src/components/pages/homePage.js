import React, { Component } from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Menu from '../menu'
import Progress from '../progress'

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
}

const bottomNavigators = [
    {name: "To do", icon: <FormatListBulletedIcon />},
    {name: "In progress", icon: <EditIcon />},
    {name: "Done", icon: <CheckCircleIcon />},
]

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentNav: "To do"
        }
    }

    render() {
        return (
            <div>
                <Menu title={this.state.currentNav} />
                <Progress steps={10} currentStep={3}/>
                <div style={styles.page}>
                    
                </div>
                <BottomNavigation
                style={styles.buttonNav}
                value={this.state.currentNav}
                onChange={(_, newList) => {
                    this.setState({currentNav: newList})
                }}
                showLabels
                >
                    {bottomNavigators.map((nav) => {
                        return <BottomNavigationAction label={nav.name} icon={nav.icon} value={nav.name}/>
                    })}
                </BottomNavigation>
            </div>
        )
    }
}
