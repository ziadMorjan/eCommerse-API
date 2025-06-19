const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { asyncErrorHandler } = require("../middlewares/ErrorMiddleware");
const CustomError = require("../utils/CustomError");
const {
    getAll,
    getOne,
    updateOne
} = require("./Controller");
const getOrders = getAll(Order);

const createOrder = asyncErrorHandler(async function (req, res, next) {
    // 1- find cart
    const cart = await Cart.findOne({ user: req.user.id });

    // 2- check quirites that exist
    cart.cartItems.forEach(async item => {
        let product = await Product.findOne(item.product);
        if (product.quantity < item.quantity)
            next(new CustomError(`There is no enough quantity for the ${item.color} ${product.name}`, 400));
    });

    // 3- create Order
    let orderBody = {
        user: cart.user,
        cartItems: cart.cartItems,
        orderPrice: cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice,
        paymentMethod: req.body.paymentMethod ? req.body.paymentMethod : "cash",
        shippingAddress: req.body.shippingAddress
    }

    orderBody.taxValue = parseFloat((orderBody.orderPrice * 0.025).toFixed(2));
    orderBody.shippingValue = parseFloat((orderBody.orderPrice * 0.025).toFixed(2));
    orderBody.totalOrderPrice = orderBody.orderPrice + orderBody.taxValue + orderBody.shippingValue;

    const order = await Order.create(orderBody);

    // 4- decrement quantities & increment sold
    cart.cartItems.forEach(async item => await Product.findOneAndUpdate(item.product, { $inc: { quantity: -item.quantity, sold: item.quantity } }));

    // 5- clear Cart
    await Cart.findByIdAndDelete(cart.id);

    res.status(201).json({
        status: "success",
        data: {
            order
        }
    });

});

const getOrder = getOne(Order, "order");

const updateOrder = updateOne(Order, "order");

module.exports = {
    getOrders,
    createOrder,
    getOrder,
    updateOrder
}
