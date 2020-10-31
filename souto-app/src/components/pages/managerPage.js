import React, { Component } from 'react'
import ManagerContext from "../../managerAppDataProvider"
import Ticket from '../ticket'
import ManagerTools from "../managerTools"
import FlipMove from "react-flip-move";
import Menu from "../menu"

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
                            <ManagerTools />
                            {this.renderTickets(ctx)}
                        </div>
                        )
                    }}
                </ManagerContext.Consumer>
            </div>
        )
    }
}
