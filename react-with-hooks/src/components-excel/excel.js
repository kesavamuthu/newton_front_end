import React from "react";
import { Form } from "react-bootstrap";

function MyDropzone(props) {
  return (
    <span>
      <Form>
        <Form.File
          id="custom-file"
          label="Upload your excel"
          onChange={() => props.onRead()}
          ref={props.refer}
          custom
        />
      </Form>
    </span>
  );
}

// function reader() {
//   console.log(ref.current.files);
//   readXlsxFile(ref.current.files[0])
//     .then((rows) => {
//       console.log(JSON.stringify(rows));
//       console.log(rows);
//     })
//     .catch(console.error);
// }
export default MyDropzone;
