import mongoose from 'mongoose';
const { Schema } = mongoose;

const customerSchema = new Schema({
    email: String,
    first_name: String,
    last_name: String,
    address_1: String,
    address_2: String,
    city: String,
    state: String,
    country: String,
    zipcode: String,
    phone: String,
    order_total: Number,
    stripe_payment_id: String,
    ordered_at: { type: Date, default: Date.now },
    last_login: { type: Date, default: Date.now },
    hidden: Boolean
});
const Customer = mongoose.model('Customer', customerSchema);
export default Customer