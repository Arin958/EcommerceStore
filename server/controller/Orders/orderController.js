const Order = require("../../model/Order/Order")

exports.getMyOrders = async(req,res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        }).sort({
            createdAt: -1
        })
        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}


exports.getOrderDetails = async(req,res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user","name email")

        if(!order){
            return res.status(404).json({
                success: false,
                error: "Order not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Order found",
            order
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}