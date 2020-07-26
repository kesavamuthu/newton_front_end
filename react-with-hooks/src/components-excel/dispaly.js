import React from "react";
import { Table } from "react-bootstrap";

function ShowPassedData(props) {
  let output = props.data.map((e, i) => {
    let ano = e.map((res, j) => {
      if (!i) {
        return !j ? (
          <>
            <th>#</th>
            <th>{res}</th>
          </>
        ) : (
          <th>{res}</th>
        );
      }
      return !j ? (
        <>
          <td>{i}</td>
          <td>{res}</td>
        </>
      ) : (
        <td>{res}</td>
      );
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
