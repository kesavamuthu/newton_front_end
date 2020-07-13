import React from "react";

export default function ButtonComponent(props) {
  console.log(props);
  return (
    <button
      onClick={props.onClick}
      className={props.className}
      style={props.style}
      id={props.id}
    >
      {props.children}
    </button>
  );
}
