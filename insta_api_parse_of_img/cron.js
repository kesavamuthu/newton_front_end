const cron = require("node-cron");

function scheduler(crud, main) {
  return cron.schedule("* * * * *", () => {
    console.log("*********************** cron started ***********************");
    crud("findAll").find({}, (error, data) => {
      data.forEach((element) => {
        let url = element.mainUrl;
        main.fetcher(url).then((res) => main.urlSaver(res, url));
      });
      console.log("*********************** cron ended ***********************");
    });
  });
}
module.exports = scheduler;
