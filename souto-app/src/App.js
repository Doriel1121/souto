import React from 'react'
import { Switch, HashRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './App.css'
import ClientApp from './ClientApp'
import ManagerApp from './ManagerApp'
import LoginPage from './components/pages/loginPage'

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1c6f8c',
    },
    secondary: {
      main: '#CC0000',
    },
  },
  typography: {
    allVariants: {
      color: '#dadada;',
    },
  },
})

const styles = {
  background: {
    height: '100vh',
    background: 'linear-gradient(45deg, rgb(195 195 195), rgb(234 234 234))',
    overflow: 'hidden',
  },
}

function App() {
  return (
    <div style={styles.background}>
      <ThemeProvider theme={mainTheme}>
        <Router>
          <Switch>
            <Route path="/client">
              <ClientApp />
            </Route>
            <Route path="/manager">
              <ManagerApp />
            </Route>
            <Route exact path="/">
              <LoginPage />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
