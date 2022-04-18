import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AppFunctional(props) {
  const [count, setCount] = useState(0);
  const [vertical, setVertical] = useState(2);
  const [horizontal, setHorizontal] = useState(2);
  const [moveError, setMoveError] = useState("");
  const [email, setEmail] = useState("");

  const goUp = () => {
    vertical > 1
      ? (setVertical((prevCount) => prevCount - 1),
        setCount((prevCount) => prevCount + 1),
        setMoveError(""))
      : setMoveError("You can't go up");
  };

  const goDown = () => {
    vertical < 3
      ? (setVertical((prevCount) => prevCount + 1),
        setCount((prevCount) => prevCount + 1),
        setMoveError(""))
      : setMoveError("You can't go down");
  };

  const goLeft = () => {
    horizontal > 1
      ? (setHorizontal((prevCount) => prevCount - 1),
        setCount((prevCount) => prevCount + 1),
        setMoveError(""))
      : setMoveError("You can't go left");
  };

  const goRight = () => {
    horizontal < 3
      ? (setHorizontal((prevCount) => prevCount + 1),
        setCount((prevCount) => prevCount + 1),
        setMoveError(""))
      : setMoveError("You can't go right");
  };

  const resetHandler = () => {
    setCount(0);
    setVertical(2);
    setHorizontal(2);
    setMoveError("");
    setEmail("");
  };

  const postNewSubmission = (newSubmission) => {
    axios
      .post("http://localhost:9000/api/result", newSubmission)
      .then((res) => {
        // console.log('Error:')
        // console.log(res.data)
        setMoveError(res.data.message);
      })
      .catch((err) => setMoveError(err.response.data.message));
  };

  const formSubmit = (e) => {
    const newSubmission = {
      x: horizontal,
      y: vertical,
      steps: count,
      email: email.trim(),
    };
    postNewSubmission(newSubmission);
    e.preventDefault();
    setEmail("");
  };
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({horizontal}, {vertical})
        </h3>
        <h3 id="steps">
          You moved {count} {count === 1 ? "time" : "times"}
        </h3>
      </div>
      <div id="grid">
        <div
          className={
            horizontal === 1 && vertical === 1 ? "square active" : "square"
          }
        >
          {(horizontal === 1) & (vertical === 1) ? "B" : ""}
        </div>
        <div
          className={
            horizontal === 2 && vertical === 1 ? "square active" : "square"
          }
        >
          {(horizontal === 2) & (vertical === 1) ? "B" : ""}
        </div>
        <div
          className={
            horizontal === 3 && vertical === 1 ? "square active" : "square"
          }
        >
          {(horizontal === 3) & (vertical === 1) ? "B" : ""}
        </div>
        <div
          className={
            horizontal === 1 && vertical === 2 ? "square active" : "square"
          }
        >
          {(horizontal === 1) & (vertical === 2) ? "B" : ""}
        </div>
        <div
          className={
            horizontal === 2 && vertical === 2 ? "square active" : "square"
          }
        >
          {(horizontal === 2) & (vertical === 2) ? "B" : ""}
        </div>
        <div
          className={
            horizontal === 3 && vertical === 2 ? "square active" : "square"
          }
        >
          {(horizontal === 3) & (vertical === 2) ? "B" : ""}
        </div>
        <div
          className={
            horizontal === 1 && vertical === 3 ? "square active" : "square"
          }
        >
          {(horizontal === 1) & (vertical === 3) ? "B" : ""}
        </div>
        <div
          className={
            horizontal === 2 && vertical === 3 ? "square active" : "square"
          }
        >
          {(horizontal === 2) & (vertical === 3) ? "B" : ""}
        </div>
        <div
          className={
            horizontal === 3 && vertical === 3 ? "square active" : "square"
          }
        >
          {(horizontal === 3) & (vertical === 3) ? "B" : ""}
        </div>
      </div>
      <div className="info">
        <h3 id="message">{moveError}</h3>
      </div>
      <div id="keypad">
        <button onClick={goLeft} id="left">
          LEFT
        </button>
        <button onClick={goUp} id="up">
          UP
        </button>
        <button onClick={goRight} id="right">
          RIGHT
        </button>
        <button onClick={goDown} id="down">
          DOWN
        </button>
        <button onClick={resetHandler} id="reset">
          reset
        </button>
      </div>
      <form>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="type email"
        ></input>
        <input id="submit" onClick={formSubmit} type="submit"></input>
      </form>
    </div>
  );
}
