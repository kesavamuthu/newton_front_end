import React from "react";
import readXlsxFile from "read-excel-file";
import util from "./utility";
import InitialLoad from "./initialUploadScreen";

class Manipulator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.reader = this.reader.bind(this);
    this.ref = React.createRef();
  }

  async reader() {
    try {
      const rows = await readXlsxFile(this.ref.current.files[0]);
      const request = {
        fileName: this.ref.current.files[0].name,
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
        let tmp = { ...request }; //need to spread it else previous value while passing
        util
          .requestMaker(tmp, "post", "excel")
          .then((res) => {
            if (res.status === 200) {
              this.setState({
                data: this.state.data.concat([util.parser(tmp.title)]),
              });
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

  render() {
    return (
      <InitialLoad
        show={!this.state.data.length}
        unacceptableFormat={!this.state.unacceptableFormat}
        onRead={this.reader}
        refer={this.ref}
        data={this.state.data}
      />
    );
  }
}

export default Manipulator;
