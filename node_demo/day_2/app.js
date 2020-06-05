const http = require("http");
const fs = require("fs");

function serveStaticFile(res, path, contentType) {
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.writeHead(200, { contentType });
      res.end(data);
    }
  });
}
http
  .createServer((req, res) => {
    const path = req.url;
    console.log(path);
    switch (path) {
      case "/":
        serveStaticFile(res, "/public/home.html", "text/html");
        break;
      case "/about":
        serveStaticFile(res, "/public/about.html", "text/html");
        break;
      default:
        res.writeHead(404, { contentType: " bruttt!!!" });
        res.end("Pge not found bruuuuuuuuu");
    }
  })
  .listen(8000);
