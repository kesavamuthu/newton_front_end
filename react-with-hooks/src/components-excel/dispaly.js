import React from "react";

function ShowPassedData(props) {
  console.log(
    "in showed passed data",
    ...props.data,
    Array.isArray(props.data)
  );
  let output = props.data.map((e) => {
    let ano = e.map((res) => <span>{res}</span>);
    return <div>{ano}</div>;
  });

  return output;
}

export default ShowPassedData;
