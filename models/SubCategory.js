const mongoose = require('mongoose');

let subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "subCategory name is required"],
            unique: [true, "subCategory name must be unique"],
            minlength: [3, "subCategory name must be larger than 3"],
            maxlength: [32, "subCategory name must be less than 32"]
        },
        slug: {
            type: String,
            lowercase: true
        },
        photo: String,
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            required: [true, "SubCategory must belong to parent category"]
        }
    },
    {
        timestamps: true
    }
);


let setImageUrl = function (doc) {
    if (doc.photo) {
        let url = `${process.env.BASE_URL}/subCategories/${doc.photo}`;
        doc.photo = url;
    }
};

subCategorySchema.post("init", doc => setImageUrl(doc));

subCategorySchema.post("save", doc => setImageUrl(doc));


module.exports = mongoose.model("SubCategory", subCategorySchema);