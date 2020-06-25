const crud = require("./db.js");
const https = require("https");
const cron = require("./cron");

const fetchAndSave = {
  fetcher(url) {
    //fetch resource like api call
    console.log("----------> ", url);
    return new Promise(function (resolve, reject) {
      https
        .get(url, (resp) => {
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });

          resp.on("end", () => {
            resolve(JSON.parse(data));
          });
        })
        .on("error", (err) => {
          console.log("Error: " + err.message);
        });
    });
  },

  urlSaver(data, url) {
    //data find, save and delete happen
    const favoriteThings = data.graphql.user.edge_felix_video_timeline.edges;
    return new Promise(function (resolve, reject) {
      crud(
        "find",
        url,
        favoriteThings
      )(function (err, value) {
        let tmp = [];
        let isDelete;
        if (value.length) {
          favoriteThings.forEach((element, index) => {
            //used only if value changes in array.
            if (value[0].imageUrls[index] != element.node.display_url) {
              if (!tmp.length) {
                tmp.push(...value[0].imageUrls);
                isDelete = true;
              }
              tmp[index] = element.node.display_url;
            }
          });
        } else if (!value.length) {
          favoriteThings.forEach((element) =>
            tmp.push(element.node.display_url)
          );
        }

        if (isDelete) crud("delete", url);

        if (tmp.length) crud("save", url, tmp)();
        resolve(favoriteThings);
      });
    });
  },
};

cron(crud, fetchAndSave);

module.exports = fetchAndSave;
