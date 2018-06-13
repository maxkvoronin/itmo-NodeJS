const cp = require("child_process");

let child = cp.fork(`${__dirname}/child.js`);

child.on('message', (data) => {
  console.log("Parent got message: " + data);
  child.kill();
});