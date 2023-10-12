import React from "react";
import "./style.scss";
import LoadingImg from "../../assets/images/loading.gif";
const Loading = () => {
  return (
    <div className="loading">
      <img src={LoadingImg} alt="loading" />
    </div>
  );
};

export default Loading;
