import React, { Component } from 'react'
import { Button } from "@material-ui/core"

const styles = {
    login: {
        position: 'absolute',
        bottom: '0',
        border: 'solid 1px',
        height: '40vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    typeButton: {
        width: '50vw'
    }
}

export default class LoginPage extends Component {
    render() {
        return (
            <div>
                <div>UP</div>
                <div style={styles.login}>
                    <Button style={styles.typeButton} variant="contained" color="primary">
                    I am a Captain
                    </Button>
                    <br />
                    <Button style={styles.typeButton} variant="contained" color="primary">
                    I am a Sailor
                    </Button>
                </div>
            </div>
        )
    }
}
