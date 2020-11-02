import React, { Component } from 'react'
import { Button, TextField, Grid, Typography } from "@material-ui/core"
import SwipeableViews from "react-swipeable-views";
import axios from 'axios'
import config from '../../config'
import { Redirect } from 'react-router-dom';

const styles = {
    login: {
        position: 'absolute',
        bottom: '0',
        border: 'solid 1px',
        height: '45vh',
        width: '100vw',
    },
    typeButton: {
        width: '50vw'
    },
    singleView: {
        height: '40vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    views: {
        overflowX: 'hidden',
        width: 'inherit',
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    form: {
        width: '65vw'
    },
    text: {
        color: '#484848'
    }
}

export default class LoginPage extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            viewIndex: 0,
            captainBoardName: "",
            captainBoardFromServer: {},
            redirectCaptain: false,
            sailorBoardKey: "",
            sailorName: "",
            sailorBoardFromServer: {},
            redirectSailor: false
        }
    }

    registerUser = () => {
        let user = {name: this.state.sailorName}
        axios.post(config.server + "/users/add/" + this.state.sailorBoardFromServer.id, user)
        .then((response) => {
            window.localStorage.setItem("sailorUserId", response.data.id);
            this.setState({
                sailorName: "",
                redirectSailor: true
            })
        })
        .catch((error) => {
            alert(error)
        })
    }

    findABoardByKey = () => {
        axios.get(config.server + "/board/key/" + this.state.sailorBoardKey)
        .then((response) => {
            this.setState({
                sailorBoardKey: "",
                viewIndex: 4,
                sailorBoardFromServer: response.data
            })
        })
        .catch((error) => {
            alert(error)
        })
    }

    registerABoard = () => {
        let board = {name: this.state.captainBoardName}
        axios.post(config.server + "/boards/add", board)
        .then((response) => {
            this.setState({
                captainBoardName: "",
                captainBoardFromServer: response.data,
                viewIndex: 2
            })
        })
        .catch((error) => {
            alert(error)
        })
    }

    loginCaptain = () => {
        window.localStorage.setItem("captainBoardId", this.state.captainBoardFromServer.id);
        
        this.setState({
            redirectCaptain: true
        })
    }

    render() {
        if (this.state.redirectCaptain) {
            return <Redirect to="/manager/main"/>
        } else if (this.state.redirectSailor) {
            return <Redirect to="/client/main"/>
        }

        return (
            <div>
                <div>UP</div>
                <div style={styles.login}>
                    <SwipeableViews
                        index={this.state.viewIndex}
                        axis="x"
                        disabled
                        style={styles.views}
                    >
                        <div style={styles.singleView}>
                            <Button style={styles.typeButton} variant="contained" color="primary" onClick={() => {
                                this.setState({viewIndex: 1})
                            }}>
                            I am a Captain
                            </Button>
                            <br />
                            <Button style={styles.typeButton} variant="contained" color="primary" onClick={() => {
                                this.setState({viewIndex: 3})
                            }}>
                            I am a Sailor
                            </Button>
                        </div>
                        <div style={styles.singleView}>
                            <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={styles.form}
                            spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant={"h6"} style={styles.text}>What is your board name?</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth variant="outlined" onChange={(event) => {
                                    this.setState({ captainBoardName: event.target.value })
                                }}/>
                            </Grid>
                                <Grid item xs={6}>
                                    <Button
                                    variant="contained"
                                    fullWidth 
                                    onClick={() => {
                                        this.setState({viewIndex: 0})
                                    }}
                                    >
                                        Go back
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => {
                                        this.registerABoard()
                                    }}
                                    >
                                        Let's go!
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <div style={styles.singleView}>
                            <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={styles.form}
                            spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant={"h5"} style={{...styles.text, textAlign: 'center'}}>Your board is ready!</Typography>
                                </Grid>
                                <Grid item xs={12} style={{...styles.text, textAlign: 'center', padding: '0px'}}>
                                    Key:
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'center', fontSize: 'xxx-large', fontWeight: '800', color: '#0056b1', paddingTop: '0px'}}>
                                    {this.state.captainBoardFromServer.public_key}
                                </Grid>
                                <Grid item xs={12} style={{...styles.text, textAlign: 'center', padding: '0px'}}>
                                    Secret: 
                                </Grid>
                                <Grid item xs={12} style={{...styles.text, textAlign: 'center', padding: '0px'}}>
                                    {this.state.captainBoardFromServer.secret}
                                </Grid>
                                <Grid item xs={6} style={{...styles.text, textAlign: 'center'}}>
                                    <Button
                                        variant="contained"
                                        fullWidth 
                                        onClick={() => {
                                            this.setState({viewIndex: 0})
                                        }}
                                        >
                                            Go back
                                    </Button>
                                </Grid>
                                <Grid item xs={6} style={{...styles.text, textAlign: 'center'}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => {
                                            this.loginCaptain()
                                        }}
                                        >
                                            Start
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <div style={styles.singleView}>
                            <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={styles.form}
                            spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant={"h6"} style={styles.text}>What is your board key?</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth variant="outlined" onChange={(event) => {
                                    this.setState({ sailorBoardKey: event.target.value })
                                }}/>
                            </Grid>
                                <Grid item xs={6}>
                                    <Button
                                    variant="contained"
                                    fullWidth 
                                    onClick={() => {
                                        this.setState({viewIndex: 0})
                                    }}
                                    >
                                        Go back
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => {
                                        this.findABoardByKey()
                                    }}
                                    >
                                        Start!
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <div style={styles.singleView}>
                            <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={styles.form}
                            spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant={"h6"} style={styles.text}>What is your name?</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth variant="outlined" onChange={(event) => {
                                        this.setState({ sailorName: event.target.value })
                                    }}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => {
                                        this.registerUser()
                                    }}
                                    >
                                        Start!
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </SwipeableViews>
                </div>
            </div>
        )
    }
}
