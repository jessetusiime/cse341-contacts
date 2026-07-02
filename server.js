const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Contacts API is running");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});