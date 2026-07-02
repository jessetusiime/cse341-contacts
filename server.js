const express = require("express");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes");

const { connectDB } = require("./mongodb");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);

const port = process.env.PORT || 8080;

connectDB();

app.get("/", (req, res) => {
    res.send("Contacts API is running");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});