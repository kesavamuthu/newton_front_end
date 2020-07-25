import React from "react";

function ShowPassedData(props) {
  let output = props.data.map((e) => {
    let ano = e.map((res) => <span>{res}</span>);
    return <div>{ano}</div>;
  });

  return output;
}

export default ShowPassedData;
