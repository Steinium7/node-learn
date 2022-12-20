const express = require("express");
const axios = require("axios");
const app = express();

app.get("/pay", async (req, res) => {
    try {
        let params = {
            amount: 100,
            email: "samthehugh@hotmail.com",
            currency: "GHS",
            mobile_money: {
                phone: "0551234987",
                provider: "mtn",
            },
        };

        let response = await axios({
            baseURL: "https://api.paystack.co:443",
            url: "/charge",
            method: "post",
            headers: {
                Authorization: `Bearer ${process.env.SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            data: params,
        });
        return res.send({
            msg: response.data.data.status,
            ref: response.data.data.reference,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send("FAILED");
    }
});

app.get("/verify/:ref", async (req, res) => {
    let response = await axios({
        baseURL: "https://api.paystack.co:443",
        url: `/transaction/verify/${req.params.ref}`,
        method: "get",
        headers: {
            Authorization: `Bearer ${process.env.SECRET_KEY}`,
            "Content-Type": "application/json",
        },
    });
    return res.send({
        msg: response.data.data.status,
    });
});

app.listen("4000", () => console.log("listening on Port 4000"));
