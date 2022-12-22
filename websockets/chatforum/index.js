const http = require("http");
const express = require("express");
const ws = require("ws");
const app = express();

var serverWeb = http.createServer(app);
serverWeb.listen(8080, () => console.log("Ws listening on port 8080"));

let server = new ws.Server({ server: serverWeb });

let chat = [{ id: 1, data: "Hello" }];

server.on("connection", (wsOne) => {
    console.log("new Client Connected");

    wsOne.send(JSON.stringify(chat));

    wsOne.on("message", (data) => {
        data = data.toString("utf8");
        data = data.split("|");

        if (!wsOne.id) wsOne.id = data[1];

        let main = { id: chat.length + 1, data: data[0], name: wsOne.id };
        chat.push(main);
        wsOne.send("Done");

        server.clients.forEach((client) => {
            if (client.readyState === ws.WebSocket.OPEN && client != wsOne) {
                client.send(JSON.stringify(main));
            }
        });
    });

    wsOne.on("close", () => console.log("Client has disconnected"));
});
