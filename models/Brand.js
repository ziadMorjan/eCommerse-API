const mongoose = require("mongoose");

let brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            unique: [true, "brand name must be unique"],
            minlength: [3, "name length must br larger than 3"],
            maxlength: [32, "name length must br less than 32"]
        },
        slug: {
            type: String,
            lowercase: true
        },
        photo: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Brand", brandSchema);