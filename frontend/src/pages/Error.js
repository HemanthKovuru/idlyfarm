import React from "react";
import "./../scss/Error.scss";

const Error = (props) => {
  return (
    <div className="message">
      {props.message ? props.message : "Error Not Found"}
    </div>
  );
};

export default Error;
