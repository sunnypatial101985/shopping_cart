import mongoose from 'mongoose';
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    email: { type: String, index: true, unique: true },
    created_at: { type: Date, default: Date.now },
    hidden: Boolean
});
const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription