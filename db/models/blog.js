import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    uid: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    image: String,
    inserted_at: { type: Date, default: Date.now },
    hidden: Boolean
});
const Blog = mongoose.model('Blog', blogSchema);
export default Blog