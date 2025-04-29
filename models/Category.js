const mongoose = require("mongoose");

let categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "category name is required"],
            unique: [true, "category name must be unique"],
            minlength: [3, "category name length must be larger than 3 characters"],
            maxlength: [32, "category name length must be less than 32 characters"]
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

module.exports = mongoose.model("Category", categorySchema);