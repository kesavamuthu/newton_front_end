import React from "react";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";

class DadJokeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.showAnswer = this.showAnswer.bind(this);
    this.fetcher = this.fetcher.bind(this);
  }

  componentDidMount() {
    this.fetcher();
  }

  showAnswer() {
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

  render() {
    return (
      <>
        <Alert variant="dark">{this.state.setup}</Alert>
        {this.state.show ? (
          <Alert variant="info">{this.state.punchline}</Alert>
        ) : (
          ""
        )}
        <Button onClick={this.showAnswer}>Click me</Button>
        <Button onClick={this.fetcher}>Next</Button>
      </>
    );
  }
}

export default DadJokeGenerator;
