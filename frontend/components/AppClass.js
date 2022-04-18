import React from "react";
import axios from "axios";

const initialState = {
  count: 0,
  vertical: 2,
  horizontal: 2,
  moveError: "",
  email: "",
};

const URL = "http://localhost:9000/api/result";

export default class AppClass extends React.Component {
  state = initialState;
  verticalControl = (key, value) => {
    key === "up" && value > 1
      ? this.setState({
          ...this.state,
          vertical: value - 1,
          count: this.state.count + 1,
          moveError: "",
        })
      : key === "up" && value === 1
      ? this.setState({
          ...this.state,
          moveError: "You can't go up",
        })
      : key === "down" && value < 3
      ? this.setState({
          ...this.state,
          vertical: value + 1,
          count: this.state.count + 1,
          moveError: "",
        })
      : this.setState({
          ...this.state,
          moveError: "You can't go down",
        });
  };
  horizontalControl = (key, value) => {
    key === "left" && value > 1
      ? this.setState({
          ...this.state,
          horizontal: value - 1,
          count: this.state.count + 1,
          moveError: "",
        })
      : key === "left" && value === 1
      ? this.setState({
          ...this.state,
          moveError: "You can't go left",
        })
      : key === "right" && value < 3
      ? this.setState({
          ...this.state,
          horizontal: value + 1,
          count: this.state.count + 1,
          moveError: "",
        })
      : this.setState({
          ...this.state,
          moveError: "You can't go right",
        });
  };

  resetHandler = () => {
    this.setState({
      ...this.state,
      moveError: "",
      email: "",
      horizontal: 2,
      vertical: 2,
      count: 0,
    });
  };
  onChange = (e) => {
    this.setState({ email: e.target.value });
  };

  postToAxios = (e) => {
    e.preventDefault();
    const newSubs = {
      x: this.state.horizontal,
      y: this.state.vertical,
      steps: this.state.count,
      email: this.state.email,
    };
    axios
      .post(URL, newSubs)
      .then((res) => {
        this.setState({ moveError: res.data.message });
      })
      .catch((err) => this.setState({ moveError: err.response.data.message }));
    this.setState({
      ...this.state,
      email: "",
    });
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({this.state.horizontal}, {this.state.vertical})
          </h3>
          <h3 id="steps">
            You moved {this.state.count}{" "}
            {this.state.count === 1 ? "time" : "times"}
          </h3>
        </div>
        <div id="grid">
          <div
            className={
              this.state.horizontal === 1 && this.state.vertical === 1
                ? "square active"
                : "square"
            }
          >
            {(this.state.horizontal === 1) & (this.state.vertical === 1)
              ? "B"
              : ""}
          </div>
          <div
            className={
              this.state.horizontal === 2 && this.state.vertical === 1
                ? "square active"
                : "square"
            }
          >
            {(this.state.horizontal === 2) & (this.state.vertical === 1)
              ? "B"
              : ""}
          </div>
          <div
            className={
              this.state.horizontal === 3 && this.state.vertical === 1
                ? "square active"
                : "square"
            }
          >
            {(this.state.horizontal === 3) & (this.state.vertical === 1)
              ? "B"
              : ""}
          </div>
          <div
            className={
              this.state.horizontal === 1 && this.state.vertical === 2
                ? "square active"
                : "square"
            }
          >
            {(this.state.horizontal === 1) & (this.state.vertical === 2)
              ? "B"
              : ""}
          </div>
          <div
            className={
              this.state.horizontal === 2 && this.state.vertical === 2
                ? "square active"
                : "square"
            }
          >
            {(this.state.horizontal === 2) & (this.state.vertical === 2)
              ? "B"
              : ""}
          </div>
          <div
            className={
              this.state.horizontal === 3 && this.state.vertical === 2
                ? "square active"
                : "square"
            }
          >
            {(this.state.horizontal === 3) & (this.state.vertical === 2)
              ? "B"
              : ""}
          </div>
          <div
            className={
              this.state.horizontal === 1 && this.state.vertical === 3
                ? "square active"
                : "square"
            }
          >
            {(this.state.horizontal === 1) & (this.state.vertical === 3)
              ? "B"
              : ""}
          </div>
          <div
            className={
              this.state.horizontal === 2 && this.state.vertical === 3
                ? "square active"
                : "square"
            }
          >
            {(this.state.horizontal === 2) & (this.state.vertical === 3)
              ? "B"
              : ""}
          </div>
          <div
            className={
              this.state.horizontal === 3 && this.state.vertical === 3
                ? "square active"
                : "square"
            }
          >
            {(this.state.horizontal === 3) & (this.state.vertical === 3)
              ? "B"
              : ""}
          </div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.moveError}</h3>
        </div>
        <div id="keypad">
          <button
            id="left"
            onClick={() =>
              this.horizontalControl("left", this.state.horizontal)
            }
          >
            LEFT
          </button>
          <button
            id="up"
            onClick={() => this.verticalControl("up", this.state.vertical)}
          >
            UP
          </button>
          <button
            id="right"
            onClick={() =>
              this.horizontalControl("right", this.state.horizontal)
            }
          >
            RIGHT
          </button>
          <button
            id="down"
            onClick={() => this.verticalControl("down", this.state.vertical)}
          >
            DOWN
          </button>
          <button id="reset" onClick={() => this.resetHandler()}>
            reset
          </button>
        </div>
        <form>
          <input
            id="email"
            type="email"
            placeholder="type email"
            onChange={this.onChange}
            value={this.state.email}
          ></input>
          <input id="submit" onClick={this.postToAxios} type="submit"></input>
        </form>
      </div>
    );
  }
}
