const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/");
const db = require("./utils/db");
const app = express();
require("dotenv").config();
let port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);
app.use((req, res) => {
    return res.status(404).json({ status: false, message: "Path not found" });
});

app.listen(port, () => {
    console.log("Server running at port " + port);
});
