import React, { Component } from 'react'
import Ticket from './ticket'

const styles = {
    board: {
        height: '60vh',
        margin: '3vh',
        borderRadius: '15px',
        background: 'linear-gradient(45deg, #00B4DB, rgb(28 111 140))',
        boxShadow: '0px 0px 20px 1px rgb(78 78 78)',
        marginTop: '7vw'
    },
}

export default class Board extends Component {
    render() {
        return (
            <div style={styles.board}>
                {this.props.tickets.map((ticket) => {
                    return <Ticket info={ticket}/>
                })}
            </div>
        )
    }
}
