import React from "react";
import { Button } from "react-bootstrap";

// const ref = React.createRef();

function MyDropzone(props) {
  return (
    <span>
      <Button variant="secondary" className={"mine"}>
        <input type="file" onChange={() => props.onRead()} ref={props.refer} />
        File upload
      </Button>
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
