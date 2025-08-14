const express = require("express");
const axios = require("axios");

const PORT = 9009;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/gateway", async (req, res) => {
    const { endPoint, method, body, headers } = req.body;

    try {
        const response = await axios.request({
            url: endPoint,
            method,
            headers,
            data: body
        });

        res.json({
            status: "success",
            message: "API call successful",
            data: response.data
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "API call failed",
            error: error.message || error
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
