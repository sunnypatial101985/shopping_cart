import mongoose from 'mongoose';
const { Schema } = mongoose;

const order_itemSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer' },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    product_price: Number,
    quantity: Number,
    final_price: Number,
    created_at: { type: Date, default: Date.now },
    hidden: Boolean
});
const Order_item = mongoose.model('Order_item', order_itemSchema);
export default Order_item