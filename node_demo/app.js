const http = require("http");
const hostname = "localhost";
const port = 8080;
const fs = require("fs");

fs.readFile("index.html", (error, fileContent) => {
  if (error) throw error;
  else {
    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader("content-type", "text/html");
      res.end(fileContent);
    });

    server.listen(port, hostname, () => console.log("port : ", port));
  }
});
