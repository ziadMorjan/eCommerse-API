const fs = require("fs");
const dotenv = require("dotenv");
const db = require("../../config/db");
const Product = require("../../models/Product");

dotenv.config({ path: "../../config.env" });

db.connectDb(process.env.DB_URI);

let products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));

let deleteData = async () => {
    try {
        await Product.deleteMany();
        console.log("Data deleted successfully.");
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

let insertData = async () => {
    try {
        await Product.create(products);
        console.log("Data inserted successfully.");
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

if (process.argv[2] == "-d")
    deleteData();
else if (process.argv[2] == "-i")
    insertData();