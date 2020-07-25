import React from "react";
import axios from "axios";
// import { Button, Alert } from "react-bootstrap";
import ButtonComponent from "./button";
import "./dad.css";

class DadJokeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.showAnswer = this.showAnswer.bind(this);
    this.fetcher = this.fetcher.bind(this);
    this.showData = this.showData.bind(this);
  }

  componentDidMount() {
    this.fetcher();
  }

  showAnswer() {
    console.log("hai");
    this.setState({
      show: !this.state.show,
    });
  }

  fetcher() {
    axios
      .get("https://official-joke-api.appspot.com/random_joke")
      .then((response) => {
        let { setup, punchline } = response.data;
        this.setState({
          setup,
          punchline,
          show: false,
        });
      })
      .catch((e) => console.log);
  }

  showData() {
    let a = (
      <div className={"shower"} style={{ backgroundColor: "#af23b8" }}>
        {this.state.setup}
      </div>
    );
    if (this.state.show) {
      return (
        <>
          <div className={"center"}>
            {a}
            <div
              className={"shower"}
              style={{
                backgroundColor: "#4487cd",
                textAlign: "right",
                position: "relative",
                left: "17%",
              }}
            >
              {this.state.punchline}
            </div>
          </div>
          <ButtonComponent onClick={this.fetcher} className={"another"}>
            Another
          </ButtonComponent>
        </>
      );
    } else {
      return (
        <>
          <div className={"center"}>{a}</div>
          <ButtonComponent onClick={this.showAnswer} id={"tell-me"}>
            Tell me!
          </ButtonComponent>
        </>
      );
    }
  }

  render() {
    return (
      <>
        <div id="sub-root">
          <div className="marque">
            <img
              src={"https://dadjokegenerator.com/logo.png"}
              alt={"something"}
            />
          </div>
          {this.showData()}
        </div>
      </>
    );
  }
}

export default DadJokeGenerator;
