import React, { Component } from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
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

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentBoard: 0,
            todoTickets: [{id: 0, title: 'Deploy the document1', description: 'Being able to deploy the tests right after push to master and after that remove all the code'},
            {id: 1, title: 'Deploy the document', description: 'Being able to deploy the tests right after push to master and after that remove all the code'},
            {id: 2, title: 'Deploy the document2', description: 'Being able to deploy the tests right after push to master and after that remove all the code'},
            {id: 3, title: 'Deploy the do3', description: 'Being able to deploy the tests right after push to master and after that remove all the code'}],
            inProgressTickets: [],
            doneTickets: []
        }
    }

    
    moveTicket = (ticket) => {
        let todoMatchingTickets = this.state.todoTickets.filter(item => item.id === ticket.id)
        if (todoMatchingTickets.length > 0) {
            this.setState((prevState) => {
                let inProgress = prevState.inProgressTickets
                inProgress.push(ticket)
                let filtered = this.state.todoTickets.filter(item => item.id !== ticket.id)
                return {
                    todoTickets: filtered,
                    inProgressTickets: inProgress
                }
            })
            return
        }

        let inProgressMatchingTickets = this.state.inProgressTickets.filter(item => item.id === ticket.id)
        if (inProgressMatchingTickets.length > 0) {
            this.setState((prevState) => {
                let done = prevState.doneTickets
                done.push(ticket)
                return {
                    inProgressTickets: this.state.inProgressTickets.filter(item => item.id !== ticket.id),
                    doneTickets: done
                }
            })
            return
        }
    }

    getBoardName = (id) => {
        return bottomNavigators.filter((item) => item.id === id)[0].name
    }

    countAllTickets = () => {
        return this.state.todoTickets.length +
         this.state.inProgressTickets.length +
         this.state.doneTickets.length
    }

    renderBoardById = (id) => {
        let tickets = []
        let boardName = "unknown"
        switch (id) {
            case 0:
                tickets = this.state.todoTickets 
                boardName = "todo"
                break;
            case 1:
                tickets = this.state.inProgressTickets
                boardName = "inprogress"
                break;
            case 2:
                tickets = this.state.doneTickets
                boardName = "done"
                break

        }
        return <Board tickets={tickets} moveTicket={this.moveTicket} name={boardName}/>
    }

    render() {
        return (
            <div>
                <Menu title={this.getBoardName(this.state.currentBoard)} />
                <Progress steps={this.countAllTickets()} currentStep={this.state.doneTickets.length}/>
                {this.renderBoardById(this.state.currentBoard)}
                <BottomNavigation
                style={styles.buttonNav}
                value={this.state.currentBoard}
                onChange={(_, newList) => {
                    this.setState({currentBoard: newList})
                }}
                showLabels
                >
                    {bottomNavigators.map((nav) => {
                        return <BottomNavigationAction key={nav.name} label={nav.name} icon={nav.icon} value={nav.id}/>
                    })}
                </BottomNavigation>
            </div>
        )
    }
}
