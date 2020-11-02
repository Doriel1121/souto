import React, { Component } from 'react'
import { MobileStepper } from '@material-ui/core'
import expertIcon from '../resources/expert-icon.png'
import begginerIcon from '../resources/begginer-icon.png'

const styles = {
  progress: {
    display: 'flex',
    padding: '2vw',
  },
  progressBar: {
    width: '100vw',
    flexGrow: '1',
    backgroundColor: 'transparent',
    paddingTop: '3vh',
  },
  progressIcon: {
    width: '10vw',
  },
  iconImageBegginer: {
    paddingTop: '1.5vh',
    paddingRight: '5vw',
    width: '7vw',
    opacity: '0.7',
  },
  iconImageExpert: {
    paddingTop: '0.6vh',
    width: '10vw',
    opacity: '0.7',
  },
}

export default class Progress extends Component {
  render() {
    return (
      <div style={styles.progress}>
        <div style={styles.progressIcon}>
          <img
            style={styles.iconImageBegginer}
            src={begginerIcon}
            alt="begginer"
          />
        </div>

        <MobileStepper
          variant="progress"
          steps={this.props.steps + 1}
          position="static"
          activeStep={this.props.currentStep}
          style={styles.progressBar}
        />
        <div style={styles.progressIcon}>
          <img style={styles.iconImageExpert} src={expertIcon} alt="expert" />
        </div>
      </div>
    )
  }
}
