import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    mobile: String,
    email: { type: String, index: true, unique: true },
    password: String,
    registered_at: { type: Date, default: Date.now },
    last_login: { type: Date, default: Date.now },
    hidden: Boolean
});
const User = mongoose.model('User', userSchema);
export default User