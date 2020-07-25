import React from "react";
import { Alert } from "react-bootstrap";

function Warning(props) {
  return (
    <Alert variant="danger" onClose={() => props.onClick(true)} dismissible>
      <Alert.Heading>Error! format not allowed</Alert.Heading>
      <p>
        Consider only excel file with <b>(.xlxs)</b> format
      </p>
    </Alert>
  );
}

export default Warning;
