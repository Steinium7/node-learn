const children = require("child_process");
const path = require("path");

let subPath = path.resolve(__dirname, ".//mailing.js");
// let child = children.spawn('node', [subPath])

const child = children.spawn("node", [subPath], {
    detached: false,
});

child.unref();

child.on("message", function (m) {
    console.log("Parent process received");
    // if(m.data) return res.send(m)
});

child.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
});
