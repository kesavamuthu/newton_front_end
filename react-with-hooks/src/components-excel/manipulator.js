import React from "react";
import ExcelInput from "./excel";
import readXlsxFile from "read-excel-file";
import Warning from "./warning";
import ShowPassedData from "./dispaly";
import util from "./utility";
import { Jumbotron } from "react-bootstrap";

class Manipulator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      unacceptableFormat: false,
    };
    this.reader = this.reader.bind(this);
  }

  async reader(ref) {
    try {
      if (ref.current.files[0].name.match(/[^.]+$/)[0] != "xlsx") {
        this.unacceptableFormat();
        return;
      }
      const rows = await readXlsxFile(ref.current.files[0]);
      const request = {
        fileName: ref.current.files[0].name,
        title: rows[0],
      };
      this.setState({
        data: this.state.data.concat([util.parser(rows[0])]),
      });
      let response = await util.requestMaker(request, "post", "excel");
      request.message = response.data.message;
      request.fileName = response.data.fileName;

      rows.slice(1, 3).forEach((element, i) => {
        request.title = element;
        let tmp = { ...request }; //need to spread it else previous value only passing
        util
          .requestMaker(tmp, "post", "excel")
          .then((res) => {
            if (res.status === 200) {
              this.setState({
                data: this.state.data.concat([util.parser(tmp.title)]),
              });

              // console.log(
              //   "-------------------------------------------",
              //   i,
              //   res.data.fileName
              // );
            } else {
              throw TypeError(
                "server not accepting data there is no reason to send these data"
              );
            }
          })
          .catch((e) => console.error);
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

  // requestMaker = (request) => {
  //   return axios({
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: request,
  //     url: "http://localhost:9000/excel",
  //   });
  // };

  // whatTheHeck = (ref) => {
  //   console.log(ref.current.files[0]);
  //   if (ref.current.files[0].name.match(/[^.]+$/)[0] != "xlsx") {
  //     this.unacceptableFormat();
  //     return;
  //   }
  //   readXlsxFile(ref.current.files[0])
  //     .then(async (rows) => {
  //       let result = [];
  //       let request = {
  //         fileName: ref.current.files[0].name,
  //         title: rows[0],
  //       };
  //       let resp = await this.requestMaker(request);
  //       if (resp) {
  //         request.fileName = resp.data.fileName;
  //         request.message = resp.data.message;
  //         rows.slice(0).forEach((e) => {
  //           request.title = e;
  //           result.push({ ...request });
  //         });
  //       }
  //       return result;
  //     })
  //     .then((res) => {
  //       res.forEach((e) => this.requestMaker(e));
  //     });
  // };

  render() {
    return (
      <>
        <Jumbotron fluid>
          {!this.state.unacceptableFormat ? (
            <ExcelInput onRead={this.reader} />
          ) : (
            <Warning onClick={this.unacceptableFormat} />
          )}
          <ShowPassedData data={this.state.data} />
        </Jumbotron>
      </>
    );
  }
}

export default Manipulator;
