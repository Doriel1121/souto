import { Switch, HashRouter as Router, Route } from 'react-router-dom'
import React, { Component } from 'react'
import { ManagerAppDataProvider } from './managerAppDataProvider'
import ManagerPage from './components/pages/managerPage'
import ManagerSummaryPage from './components/pages/managerSummaryPage'
import ManageUsersPage from './components/pages/manageUsersPage.js'

export default class ManagerApp extends Component {
  render() {
    return (
      <ManagerAppDataProvider>
        <Router>
          <Switch>
            <Route exact path="/manager/main">
              <ManagerPage />
            </Route>
            <Route exact path="/manager/summary">
              <ManagerSummaryPage />
            </Route>
            <Route exact path ="/manager/userProgress">
              <ManageUsersPage/>
              </Route>
          </Switch>
        </Router>
      </ManagerAppDataProvider>
    )
  }
}
