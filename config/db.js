import mongoose from "mongoose";

let connectDb = function (uri) {
    mongoose.connect(uri)
        .then(conn => console.log(`Db connected on: ${conn.connection.host}`))
        .catch(err => console.error(`Db error: ${err}`));
}

export default connectDb;