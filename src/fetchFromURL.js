import https from 'https'

export default (url) => {
  return new Promise((resolve,rej) => {

    var body = "";
    https
      .get(url, function (res) {
        res.on("data", function (chunk) {
          body += chunk;
        });
  
        res.on("end", () => {
          resolve(body);
        });
      })
      .on("error", function (e) {
        rej(e);
        console.log("Got an error: ", e);
      });



  })
  
};
