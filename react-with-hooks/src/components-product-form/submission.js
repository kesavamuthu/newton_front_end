import React from "react";

function submit(props) {
  return <input type="button" value="Submit" onClick={() => props.onValid()} />;
}

export default submit;
