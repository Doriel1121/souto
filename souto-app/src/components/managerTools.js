import React, { Component } from 'react'
import { ButtonGroup, Button } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

const styles = {
    tools: {
        marginBottom: '2vh'
    },
    buttonFull: {
        borderRadius: '0px'
    }
}

export default class ManagerTools extends Component {
    render() {
        return (
            <div style={styles.tools}>
                <ButtonGroup fullWidth color="primary" aria-label="outlined primary button group">
                    <Button style={styles.buttonFull}><AddIcon /></Button>
                    <Button style={styles.buttonFull} disabled>Remove</Button>
                </ButtonGroup>
            </div>
        )
    }
}
