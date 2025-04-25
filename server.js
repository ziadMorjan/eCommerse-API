import app from "./app.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config({ path: "./config.env" });

let port = process.env.PORT || 8000;
let host = process.env.HOST || "localhost";
let env = process.env.NODE_ENV || "development";

let server = app.listen(port, () => {
    console.log(`Mode => ${env}`);
    console.log(`Server started at http://${host}:${port}`);
});

connectDb(process.env.DB_URI);

export default server;