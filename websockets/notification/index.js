const http = require("http");
const express = require("express");
const ws = require("ws");
const app = express();

app.use(express.json());

let mainData = [];

app.get("/:id", (req, res) => {
    res.send(
        mainData.filter((one) => {
            if (one.id == req.params.id) return one;
        })
    );
});

app.post("/", (req, res) => {
    // something done involving db
    // add to notifications
    console.log(req.body);
    const data = req.body;
    mainData.push(data);

    server.emit("new", data);

    res.send("Done");
});

//websocket
var serverWeb = http.createServer(app);
serverWeb.listen(8080, () => console.log("Ws listening on port 8080"));

let server = new ws.Server({ server: serverWeb });

server.on("connection", (wsOne, req) => {
    console.log("new Client Connected");

    wsOne.on("message", (data) => {
        if (!wsOne.id) wsOne.id = data;
        wsOne.send("not now");
    });

    wsOne.on("close", () => console.log("Client has disconnected"));
});

server.on("new", (data) => {
    // console.log("here", data);
    server.clients.forEach((client) => {
        if (client.readyState === ws.WebSocket.OPEN) {
            if (client.id == data.id) client.send(JSON.stringify(data));
        }
    });
});

app.listen(3000, () => console.log("Server listening on port 3000"));
