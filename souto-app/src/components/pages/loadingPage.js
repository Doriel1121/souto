import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Logo from '../../resources/logo-color.png'

const styles = {
  logo: {
    width: '60vw',
  },
  container: {
    textAlign: 'center',
    paddingTop: '25vh',
  },
}

export default class LoadingPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false,
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ redirect: true })
    }, 1500)
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />
    }
    return (
      <div style={styles.container}>
        <img src={Logo} alt="logo" style={styles.logo} />
      </div>
    )
  }
}
