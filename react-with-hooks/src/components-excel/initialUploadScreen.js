import React, { useState } from "react";
import ExcelInput from "./excel";
import Warning from "./warning";
import ShowPassedData from "./dispaly";
import { Jumbotron } from "react-bootstrap";

function InitialLoad(props) {
  const [show, setShow] = useState(true);
  if (props.show)
    return (
      <Jumbotron>
        {show ? (
          <ExcelInput show onRead={helper} refer={props.refer} />
        ) : (
          <Warning onClick={setShow} />
        )}
      </Jumbotron>
    );
  else return <ShowPassedData data={props.data} />;

  function helper() {
    if (props.refer.current.files[0].name.match(/[^.]+$/)[0] !== "xlsx")
      setShow(false);
    else props.onRead();
  }
}

export default InitialLoad;
