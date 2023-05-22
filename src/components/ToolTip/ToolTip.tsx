import React from "react";
import { ttText } from "./ToolTip.types";

const ToolTip = (props: ttText) => {
  return (
    <div className="tool-tip">
      <p>{props.text}</p>
    </div>
  );
};

export default ToolTip;
