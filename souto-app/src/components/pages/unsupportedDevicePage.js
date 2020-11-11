import React, { Component } from 'react'
import MobileImage from '../../resources/warning-mobile-device.png'

const styles = {
  page: {
    height: '90vh',
    background: 'linear-gradient(45deg, #00B4DB, #1C6F8C)',
    textAlign: 'center',
    paddingTop: '10vh',
    color: 'white',
  },
  title: {
    fontSize: '10vh',
  },
  message: {
    fontSize: '4vh',
  },
}

export default class UnsupportedDevicePage extends Component {
  render() {
    return (
      <div style={styles.page}>
        <div style={styles.title}>Unsupported device</div>
        <div style={styles.imageContainer}>
          <img alt="mobile device" src={MobileImage} />
        </div>
        <div style={styles.message}>
          Make sure the application runs on a mobile device or an emulator
        </div>
      </div>
    )
  }
}
