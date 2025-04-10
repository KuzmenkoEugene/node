const fs = require("fs");

fs.readdir(".", (err, files) => {
  if (err) throw err;

  let maxSize = 0;
  let largestFile = "";
  let filesProcessedCount = 0;

  files.map((file) => {
    fs.stat(file, (err, stat) => {
      if (stat.size > maxSize) {
        maxSize = stat.size;
        largestFile = file;
      }

      filesProcessedCount++;

      if (filesProcessedCount === files.length) {
        console.log(`File: ${largestFile}, size: ${maxSize}`);
      }
    });
  });
});
