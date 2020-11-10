import React, { Component } from 'react'
import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'

const styles = {
  backdrop: {
    zIndex: 2,
    color: '#fff',
  },
  mainText: {
    textAlign: 'center',
  },
  warningSign: { fontSize: 100, color: '#444444' },
}

export default class LinkValidator extends Component {
  renderValidation = () => {
    return (
      <Backdrop style={styles.backdrop} open={true}>
        <Card>
          <CardContent>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={0}
              style={{ width: '70vw' }}
            >
              <Grid item xs={12}>
                <ErrorIcon style={styles.warningSign} />
              </Grid>
              <Grid item xs={12}>
                {this.props.message === undefined
                  ? 'Are you sure you want to continue?'
                  : this.props.message}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={5}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    if (this.props.cancel !== undefined) this.props.cancel(e)
                    this.props.close()
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={5}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={(e) => {
                    if (this.props.action !== undefined) this.props.action(e)
                    this.props.close()
                  }}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Backdrop>
    )
  }

  render() {
    return (
      <div>
        {this.props.open ? this.renderValidation() : this.props.children}
      </div>
    )
  }
}
