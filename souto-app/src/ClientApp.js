import { Switch, HashRouter as Router, Route } from 'react-router-dom'
import MainPage from './components/pages/mainPage'
import SummaryPage from './components/pages/summaryPage'
import React, { Component } from 'react'
import { ClientAppDataProvider } from './clientAppDataProvider'

export default class ClientApp extends Component {
  render() {
    return (
      <ClientAppDataProvider>
        <Router>
          <Switch>
            <Route exact path="/client/main">
              <MainPage />
            </Route>
            <Route exact path="/client/summary">
              <SummaryPage />
            </Route>
          </Switch>
        </Router>
      </ClientAppDataProvider>
    )
  }
}
