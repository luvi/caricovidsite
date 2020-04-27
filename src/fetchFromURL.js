var https = require("https");

export default (url, callback) => {
  var body = "";
  https
    .get(url, function (res) {
      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", (data) => {
        callback(body);
      });
    })
    .on("error", function (e) {
      console.log("Got an error: ", e);
    });
};
