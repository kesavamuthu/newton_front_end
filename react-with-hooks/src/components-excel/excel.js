import React from "react";
// import readXlsxFile from "read-excel-file";

const ref = React.createRef();

function MyDropzone(props) {
  return <input type="file" onChange={() => props.onRead(ref)} ref={ref} />;
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
