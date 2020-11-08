import { Switch, HashRouter as Router, Route } from 'react-router-dom'
import React, { Component } from 'react'
import { ManagerAppDataProvider } from './managerAppDataProvider'
import ManagerPage from './components/pages/managerPage'
import ManageUsers from './components/pages/ManageUsers'

export default class ManagerApp extends Component {
  render() {
    return (
      <ManagerAppDataProvider>
        <Router>
          <Switch>
            <Route exact path="/manager/main">
              <ManagerPage />
            </Route>
            <Route exact path ="/manager/UserProgress">
              <ManageUsers/>
            </Route>
          </Switch>
        </Router>
      </ManagerAppDataProvider>
    )
  }
}
