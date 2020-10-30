import {Switch, HashRouter as Router, Route} from 'react-router-dom'
import MainPage from "./components/pages/mainPage"
import React, { Component } from 'react'
import { ClientAppDataProvider } from './clientAppDataProvider'

export default class ClientApp extends Component {
    render() {
        return (
            <ClientAppDataProvider>
                <Router>
                    <Switch>
                        <Route exact path="/client/main"><MainPage /></Route>
                    </Switch>
                </Router>
            </ClientAppDataProvider>
        )
    }
}
