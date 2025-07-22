const mongoose =require("mongoose");

const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
        
    },
    name: String,
    price: Number,
    quantity: {
        type: Number,
        default: 1
    },
    size: String,
    image: String,
    gender: String
}, {
    _id: false
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    guestId: {
        type: String
    },
    products: [CartItemSchema],
    totalPrice: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart