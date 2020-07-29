import React from "react";
import Form from "react-bootstrap/Form";

function MainTitle() {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Control type="text" placeholder="Form description" />
      </Form.Group>
    </Form>
  );
}

export default MainTitle;
