import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core'
import ClientContext from '../../clientAppDataProvider'
import LogoImage from '../../resources/logo-white.png'
import Menu from '../menu'

const styles = {
  content: {
    width: '80vw',
    borderRadius: '15px',
    background: 'linear-gradient(45deg, #00B4DB, rgb(28 111 140))',
    boxShadow: '0px 0px 20px 1px rgb(78 78 78)',
    margin: 'auto',
    marginTop: '4vh',
    paddingTop: '4vh',
  },
  item: {
    textAlign: 'center',
  },
  bottomSubItem: {
    marginTop: '0px',
    fontWeight: '800',
  },
  topSubItem: {
    marginBottom: '0px',
  },
  logo: {
    width: '40vw',
    height: '40vw',
  },
}

export default class SummaryPage extends Component {
  render() {
    return (
      <div>
        <Menu title={'My user'} isManager={false} />
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
                <Grid item xs={12} style={styles.item}>
                  <Typography variant="h4" style={styles.topSubItem}>
                    {ctx.state.user.name}
                  </Typography>
                  <Typography variant="h4" style={styles.bottomSubItem}>
                    {ctx.state.board.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={styles.item}>
                  <Typography variant="h5" style={styles.topSubItem}>
                    Board key
                  </Typography>
                  <Typography variant="h5" style={styles.bottomSubItem}>
                    {ctx.state.board.public_key}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={styles.item}>
                  <Typography variant="h5" style={styles.topSubItem}>
                    My secret
                  </Typography>
                  <Typography variant="h5" style={styles.bottomSubItem}>
                    {ctx.state.user.secret}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={styles.item}>
                  <img src={LogoImage} alt="logo" style={styles.logo} />
                </Grid>
              </Grid>
            )
          }}
        </ClientContext.Consumer>
      </div>
    )
  }
}
