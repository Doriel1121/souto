import React, { Component } from 'react'
import ManagerContext from "../../managerAppDataProvider"
import Ticket from '../ticket'
import ManagerTools from "../managerTools"
import FlipMove from "react-flip-move";
import Menu from "../menu"

const styles = {
    ticketsHolder: {
        position: 'absolute',
        height: '85vh',
        overflow: 'auto',
        bottom: '0px'
    }
}

export default class ManagerPage extends Component {
    renderTickets = (ctx) => {
        return (
            <FlipMove
            typeName={null}
            maintainContainerHeight={true}
            duration={100}
            staggerDurationBy={50}>
                {ctx.state.tickets.map((ticket) => {
                    return <Ticket key={ticket.id} info={ticket} isManager={true} delete={ctx.deleteTicket} update={ctx.updateTicket}/>
                })}
            </FlipMove>
        )
    }

    render() {
        return (
            <div>
                <Menu title={"Manager"} />
                <ManagerContext.Consumer>
                    {(ctx) => {
                        return (
                        <div>
                            <ManagerTools addTicket={ctx.newTicket}/>
                            <div style={styles.ticketsHolder}>
                                {this.renderTickets(ctx)}
                            </div>
                        </div>
                        )
                    }}
                </ManagerContext.Consumer>
            </div>
        )
    }
}
