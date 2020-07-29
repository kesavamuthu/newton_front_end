import React from "react";
import Submit from "./submission";
import ProductDetails from "./productDetails";
import "./product.css";
import Axios from "axios";

class ProductParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      isValid: [],
    };
    this.validateFields = this.validateFields.bind(this);
  }

  validateFields() {
    let tmp = Object.values(this.state);
    let status = true;
    let valid = [];
    // console.table(this.state);
    tmp.slice(0, 2).forEach((e) => {
      if (e.length < 4) {
        valid.push(1);
        status = false;
      } else valid.push(0);
    });
    if (isNaN(+tmp[2]) || !+tmp[2]) {
      valid.push(1);
      status = false;
    } else valid.push(0);

    this.setState({
      isValid: [...valid],
    });
    if (!status) return;
    let data = {};
    Object.keys(this.state)
      .slice(0, 3)
      .forEach((e) => (data[e] = this.state[e]));
    console.log(data);
    Axios({
      method: "post",
      url: "https://nameless-taiga-33242.herokuapp.com/form/data",
      data,
    })
      .then((e) => {
        if (e) alert("data saved successfully");
      })
      .catch((e) => alert);
  }

  inputPlacer = (event) => {
    // console.log(
    //   event.nativeEvent.which,
    //   event.nativeEvent.key,
    //   event.nativeEvent.keyCode,
    //   event.nativeEvent.data,
    //   event.nativeEvent,
    //   event.nativeEvent.currentTarget.which
    // );
    if (this.state[event.target.name].length < 10 || !event.nativeEvent.data)
      this.setState({
        [event.target.name]: event.target.value,
      });
    // console.log(event);
    // this.validateFields();
  };

  render() {
    return (
      <form>
        {!this.state.isValid.length ? (
          <h2>
            Mandatory fields are denoted by start if didn't satisfy requirement
            it'll turn into red won't allow you to submit
          </h2>
        ) : null}
        <div onChange={this.inputPlacer}>
          <ProductDetails props={this.state} />
        </div>
        <Submit onValid={this.validateFields} />
      </form>
    );
  }
}

export default ProductParent;
