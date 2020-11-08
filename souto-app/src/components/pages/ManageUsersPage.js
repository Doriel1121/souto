import axios from "axios"
import React, { Component } from "react"
import Menu from "../menu"
import config from "../../config"
import { MobileStepper, Grid } from "@material-ui/core"

const styles = {
  progressBar: {
    width: "50vw",
    flexGrow: "1",
    backgroundColor: "transparent",
    paddingTop: "3vh",
  },
  names: {
    textAlign: "center",
    transform: "translateY(1.7vh)",
  },
  userProgressInfo: {
    marginTop: "5vh",
  },
}

export default class ManageUsersPage extends Component {
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
        alert("Sorry could not get the data ")
      })
  }

  render() {
    return (
      <div>
        <Menu isManager={true} />
        {this.state.UsersProgress.map((element) => {
          return (
            <Grid style={styles.userProgressInfo} container spacing={3}>
              <Grid style={styles.names} item xs={4}>
                <b>{element.Name}</b>
              </Grid>
              <Grid style={styles.proDiv} item xs={8}>
                <MobileStepper
                  variant="progress"
                  steps={element.c + 1}
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
