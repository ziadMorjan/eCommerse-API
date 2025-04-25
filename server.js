const app = require("./app");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config({ path: "./config.env" });

let port = process.env.PORT || 8000;
let host = process.env.HOST || "localhost";
let env = process.env.NODE_ENV || "development";

let server = app.listen(port, () => {
    console.log(`Mode => ${env}`);
    console.log(`Server started at http://${host}:${port}`);
});

db.connectDb(process.env.DB_URI);

module.exports = server;