const redis = require("redis");

const client = redis.createClient(6379, "127.0.0.1");

var fun = async (client) => await client.connect();

client.on("connect", async function () {
    console.log("Process Connected to redis!");
    myInterval();
});
// process.send({msg: 'started process'})
console.log("sub has started");

async function main() {
    let user = await client.rPop("emails");

    const mailgun = require("mailgun-js");
    const DOMAIN = "";
    const mg = mailgun({
        apiKey: "",
        domain: DOMAIN,
    });
    const data = {
        from: "Excited User <>",
        to: ", ",
        subject: "Hello",
        text: `Testing some Mailgun awesomness! ${user} has been sent`,
    };
    if (user)
        mg.messages().send(data, function (error, body) {
            console.log(body);
            if (!error) console.log("Email sent");
        });
}

function myInterval() {
    setInterval(() => {
        void (async () => {
            await main();
        })();
    }, 1000);
}

fun(client);
