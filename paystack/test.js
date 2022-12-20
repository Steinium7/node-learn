const https = require("https");

const params = JSON.stringify({
    amount: 100,
    email: "samthesentinel@hotmail.com",
    currency: "GHS",
    mobile_money: {
        phone: "0551234987",
        provider: "mtn",
    },
});

const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/charge",
    method: "POST",
    headers: {
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
        "Content-Type": "application/json",
    },
};

const req = https
    .request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });

        res.on("end", () => {
            console.log(JSON.parse(data));
        });
    })
    .on("error", (error) => {
        console.error(error);
    });

req.write(params);
req.end();
