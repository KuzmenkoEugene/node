const { Transform } = require("stream");

const transformPassword = new Transform({
  transform(chunk, encoding, callback) {
    callback(
      null,
      chunk
        .toString()
        .split(" ")
        .map((el) => (el === 'password' ? '*'.repeat(el.length) : el))
        .join(" ")
    );
  },
});

transformPassword.on("data", (chunk) => {
  console.log(chunk.toString());
});

transformPassword.write("test1 password test2");
transformPassword.end();
