const express = require("express");
const app = express();
const port = 3000;
const router = require("./src/routes/routes.js");

app.use(express.json());

app.use("/api",router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
