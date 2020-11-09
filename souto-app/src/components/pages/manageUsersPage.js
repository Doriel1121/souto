import axios from "axios"
import React, { Component } from "react"
import Menu from "../menu"
import config from "../../config"
import ReactLoading from "react-loading"
import { MobileStepper, Grid } from "@material-ui/core"

const styles = {
  progressBar: {
    flexGrow: "1",
    backgroundColor: "transparent",
    paddingTop: "3vh",
    marginRight: "0",
  },
  names: {
    textAlign: "center",
    transform: "translateY(1.7vh)",
  },
  userProgressInfo: {
    marginTop: "5vh",
  },
  percent: {
    transform: "translateY(1.7vh)",
  },
  svgLoading: {
    display: "block",
    width: "10vw",
    height: "10vh",
    margin: "auto",
  },
  empty: {
    textAlign: "center",
  },
}

export default class ManageUsersPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      usersProgress: [],
      display: "block",
    }
  }

  componentDidMount = () => {
    axios
      .get(
        config.server +
          "/board/allusers/" +
          window.localStorage.getItem("captainBoardId")
      )
      .then((res) => {
        this.setState({ usersProgress: res.data, display: "none" })
      })
      .catch((err) => {
        console.log(err)
        alert("Sorry could not get the data please try again later ")
      })
  }

  render() {
    return (
      <div>
        <Menu isManager={true} title="My crew progress" />
        <Grid style={styles.userProgressInfo} container spacing={1}>
          <Grid style={{ display: `${this.state.display}` }} item xs={12}>
            <ReactLoading
              style={styles.svgLoading}
              type={"spinningBubbles"}
              color="blue"
            />
          </Grid>
          {this.state.usersProgress.length > 0 ? (
            this.state.usersProgress.map((element, index) => {
              let percent = 100 / element.c + 1 * element.o
              return (
                <React.Fragment key={index}>
                  <Grid style={styles.names} item xs={3}>
                    <b>{element.Name}</b>
                  </Grid>
                  <Grid style={styles.proDiv} item xs={7}>
                    <MobileStepper
                      variant="progress"
                      steps={element.c + 1}
                      position="static"
                      activeStep={element.o}
                      style={styles.progressBar}
                    />
                  </Grid>
                  <Grid style={styles.percent} item xs={2}>
                    {percent.toFixed(0)}%
                  </Grid>
                </React.Fragment>
              )
            })
          ) : this.state.display === "none" ? (
            <Grid style={styles.empty} item xs={12}>
              Empty
            </Grid>
          ) : null}
        </Grid>
      </div>
    )
  }
}
