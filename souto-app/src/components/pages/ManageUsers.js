import axios from "axios"
import React, { Component } from "react"
import Menu from "../menu"
import config from "../../config"
import { MobileStepper, Grid } from "@material-ui/core"

const styles = {
  progressBar: {
    width: "100vw",
    flexGrow: "1",
    backgroundColor: "transparent",
    paddingTop: "3vh",
    width: "90%",
  },
  Names: {
    textAlign: "center",
  },
  userProgressInfo: {
    marginTop: "5vh",
  },
  proDiv: {},
}

export default class ManageUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      UsersProgress: [],
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
        console.log(res)
        this.setState({ UsersProgress: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <Menu />
        {this.state.UsersProgress.map((element) => {
          return (
            <Grid style={styles.userProgressInfo} container spacing={3}>
              <Grid style={styles.Names} item xs={4}>
                <b>{element.Name}</b>
              </Grid>
              <Grid style={styles.proDiv} item xs={8}>
                <MobileStepper
                  variant="progress"
                  steps={element.c}
                  position="static"
                  activeStep={element.o}
                  style={styles.progressBar}
                />
              </Grid>
            </Grid>
          )
        })}
      </div>
    )
  }
}
