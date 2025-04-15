const { appendFile } = require("fs");

module.exports = function logger(req) {
  
  const now = new Date().toISOString();
  const log = `Time: [${now}], Method: ${req.method}, Route: ${req.url}\n`;

  appendFile("app.log", log, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('added');
    }
  })
  

  console.log(`Time: [${now}], Method: ${req.method}, Route: ${req.url}`);
};
