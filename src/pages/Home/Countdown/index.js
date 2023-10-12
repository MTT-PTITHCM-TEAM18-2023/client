import React from "react";
import Countdown from "react-countdown";
import "./style.scss";

const rendererCountdown = ({ days, hours, minutes, seconds, completed }) => {
  return completed ? (
    <h1>Complete!</h1>
  ) : (
    <div className="countdown">
      <div className="countdown__item">
        <span>{days < 10 ? "0" + days : days}</span>
        <br></br>Days
      </div>
      <div className="countdown__item">
        <span>{hours < 10 ? "0" + hours : hours}</span>
        <br></br>Hours
      </div>
      <div className="countdown__item">
        <span>{minutes < 10 ? "0" + minutes : minutes}</span>
        <br></br>Mins
      </div>
      <div className="countdown__item">
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
        <br></br>Secs
      </div>
    </div>
  );
};

function CountdownTime(props) {
  return (
    <Countdown date={Date.now() + 2592000000} renderer={rendererCountdown} />
  );
}

export default CountdownTime;
