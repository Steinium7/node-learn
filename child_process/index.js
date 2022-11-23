const express = require("express");
const mainController = require("./controller/mainController");
const redis = require("redis");

const client = redis.createClient(6379, "127.0.0.1");

var fun = async (client) => await client.connect();

client.on("connect", async function () {
    console.log("Connected to redis!");

    const reply = await client.lPush("emails", ["a@to.com"]);
    console.log("Array lenght ", reply);
});

client.on("error", (error) => {
    console.log(error);
});
require("./child");
const app = express();

const controller = mainController.home(client);

app.get("/:id", controller);

app.listen(3000, () => console.log("listening on port 3000"));
fun(client);
