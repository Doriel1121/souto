import { Switch, HashRouter as Router, Route } from 'react-router-dom'
import React, { Component } from 'react'
import { ManagerAppDataProvider } from './managerAppDataProvider'
import ManagerPage from './components/pages/managerPage'
import ManageUsersPage from './components/pages/ManageUsersPage'

export default class ManagerApp extends Component {
  render() {
    return (
      <ManagerAppDataProvider>
        <Router>
          <Switch>
            <Route exact path="/manager/main">
              <ManagerPage />
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
