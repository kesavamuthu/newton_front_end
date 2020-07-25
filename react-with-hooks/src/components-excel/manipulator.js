import React from "react";
import ExcelInput from "./excel";
import readXlsxFile from "read-excel-file";
import axios from "axios";
import Warning from "./warning";

class Manipulator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      unacceptableFormat: false,
    };
    this.reader = this.reader.bind(this);
  }

  async reader(ref) {
    try {
      console.log(ref.current.files[0]);
      if (ref.current.files[0].name.match(/[^.]+$/)[0] != "xlsx") {
        this.unacceptableFormat();
        return;
      }
      const rows = await readXlsxFile(ref.current.files[0]);
      const request = {
        fileName: ref.current.files[0].name,
        title: [],
      };
      rows.forEach(async (element, i) => {
        request.title = element;
        let res = await axios({
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: request,
          url: "http://localhost:9000/excel",
        });
        console.log(request);
        if (res.status == 200) {
          request.message = res.data.message;
          request.fileName = res.data.fileName;
          console.log("-------------------------------------------");
        } else {
          throw TypeError(
            "server not accepting data there is no reason to send these data"
          );
        }
        console.log(res.data.message);
      });
    } catch (error) {
      console.error(error);
    }
  }

  unacceptableFormat = () => {
    this.setState({
      unacceptableFormat: !this.state.unacceptableFormat,
    });
  };

  render() {
    return (
      <>
        {!this.state.unacceptableFormat ? (
          <ExcelInput onRead={this.reader} />
        ) : (
          <Warning onClick={this.unacceptableFormat} />
        )}
      </>
    );
  }
}

export default Manipulator;
