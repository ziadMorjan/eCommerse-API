const mongoose = require("mongoose");

let productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            minlength: [3, "Too short product name"],
            trim: true
        },
        slug: {
            type: String,
            lowercase: true
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
            minlength: [20, "Too short product description"],
        },
        quantity: {
            type: Number,
            required: [true, "Product quantity is required"]
        },
        sold: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            required: [true, "Product price is required"]
        },
        priceAfterDiscount: {
            type: Number,
            validate: {
                validator: function (value) {
                    return value <= this.price;
                },
                message: "priceAfterDiscount must be less than price."
            }
        },
        colors: [String],
        coverImage: {
            type: String,
            required: [true, "Product cover Image is required"]
        },
        images: [String],
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            required: [true, "Product must belong to category"]
        },
        subCategory: [{
            type: mongoose.Types.ObjectId,
            ref: "SubCategory"
        }],
        brand: {
            type: mongoose.Types.ObjectId,
            ref: "Brand"
        },
        avgRatings: {
            type: Number,
            min: 1,
            max: 5
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

productSchema.pre(/^find/, function (next) {
    this.populate({
        path: "category",
        select: "name -_id"
    });
    this.populate({
        path: "subCategory",
        select: "name -_id"
    });
    this.populate({
        path: "brand",
        select: "name -_id"
    });
    next()
});


let setImageUrl = function (doc) {
    if (doc.coverImage) {
        let url = `${process.env.BASE_URL}/products/${doc.coverImage}`;
        doc.coverImage = url;
    }
    if (doc.images) {
        doc.images = doc.images.map(image => `${process.env.BASE_URL}/products/${image}`);
    }
};

productSchema.post("init", doc => setImageUrl(doc));

productSchema.post("save", doc => setImageUrl(doc));


module.exports = mongoose.model("Product", productSchema);