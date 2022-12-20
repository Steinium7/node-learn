const axios = require("axios");
let params = {
    amount: 100,
    email: "samthehugh@hotmail.com",
    metadata: {
        custom_fields: [
            {
                value: "makurdi",
                display_name: "Donation for",
                variable_name: "donation_for",
            },
        ],
    },
    currency: "GHS",
    mobile_money: {
        phone: "0551234987",
        provider: "mtn",
    },
};

(async () => {
    try {
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

        console.log(response);
    } catch (error) {
        console.error(error);
    }
})();
