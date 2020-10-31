import React, { Component } from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import ClientContext from "../../clientAppDataProvider"
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Menu from '../menu'
import Progress from '../progress'
import Board from '../board'

const styles = {
    buttonNav: {
        position: 'absolute',
        bottom: '0px',
        width: '100vw'
    },
}

const bottomNavigators = [
    {id: 0, name: "To do", icon: <FormatListBulletedIcon />},
    {id: 1, name: "In progress", icon: <EditIcon />},
    {id: 2, name: "Done", icon: <CheckCircleIcon />},
]

export default class MainPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentBoard: 0
        }
    }

    getBoardName = (id) => {
        return bottomNavigators.filter((item) => item.id === id)[0].name
    }

    countAllTickets = (ctx) => {
        return ctx.state.todoTickets.length +
         ctx.state.inProgressTickets.length +
         ctx.state.doneTickets.length
    }

    renderBoardById = (id, ctx) => {
        let tickets = []
        let boardName = "unknown"
        let moveNext, movePrev
        switch (id) {
            case 0:
                tickets = ctx.state.todoTickets
                moveNext = (t) => ctx.moveTicket(t, true) 
                boardName = "todo"
                break;
            case 1:
                tickets = ctx.state.inProgressTickets
                moveNext = (t) => ctx.moveTicket(t, true) 
                movePrev = (t) => ctx.moveTicket(t, false) 
                boardName = "inprogress"
                break;
            case 2:
                tickets = ctx.state.doneTickets
                movePrev = (t) => ctx.moveTicket(t, false) 
                boardName = "done"
                break;
            default:
                break;
        }
        return <Board tickets={tickets} moveNext={moveNext} movePrev={movePrev} name={boardName} />
    }

    render() {
        return (
            <div>
                <Menu title={this.getBoardName(this.state.currentBoard)} />
                <ClientContext.Consumer>
                    {(ctx) => {
                        return (
                            <React.Fragment>
                                <Progress steps={this.countAllTickets(ctx)} currentStep={ctx.state.doneTickets.length}/>
                                {this.renderBoardById(this.state.currentBoard, ctx)}
                            </React.Fragment>
                        )
                    }}
                </ClientContext.Consumer>
                <BottomNavigation
                style={styles.buttonNav}
                value={this.state.currentBoard}
                onChange={(_, newList) => {
                    this.setState({currentBoard: newList})
                }}
                showLabels
                >
                {bottomNavigators.map((nav) => {
                    return <BottomNavigationAction key={nav.id} label={nav.name} icon={nav.icon} value={nav.id}/>
                })}
                </BottomNavigation>
            </div>
        )
    }
}
