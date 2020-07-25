import React from "react";
import { Table } from "react-bootstrap";

function ShowPassedData(props) {
  let output = props.data.map((e, i) => {
    let ano = e.map((res) => {
      if (!i) {
        return <th>{res}</th>;
      }
      return <td>{res}</td>;
    });
    return <tr>{ano}</tr>;
  });

  return (
    <Table striped bordered hover size="sm" variant="dark">
      <thead>{output[0]}</thead>
      <tbody>{output.splice(1)}</tbody>
    </Table>
  );
}

export default ShowPassedData;
