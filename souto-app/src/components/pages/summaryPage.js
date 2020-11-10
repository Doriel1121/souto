import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import ClientContext from '../../clientAppDataProvider'
import Menu from '../menu'

const styles = {
  content: {
    width: '80vw',
    border: 'solid 1px',
    margin: 'auto',
    marginTop: '10vh',
  },
}

export default class SummaryPage extends Component {
  render() {
    return (
      <div>
        <Menu title="Board managment" />
        <ClientContext.Consumer>
          {(ctx) => {
            return (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
                style={styles.content}
              >
                <Grid item xs={12}>
                  {ctx.state.board.name}
                </Grid>
                <Grid item xs={12}>
                  world
                </Grid>
              </Grid>
            )
          }}
        </ClientContext.Consumer>
      </div>
    )
  }
}
