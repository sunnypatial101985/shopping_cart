import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    categorie_id: { type: Schema.Types.ObjectId, ref: 'Categorie' },
    title: { type: String, index: true, unique: true },
    description: String,
    image: String,
    price: Number,
    disc_price: Number,
    inserted_at: { type: Date, default: Date.now },
    hidden: Boolean
});
const Product = mongoose.model('Product', productSchema);
export default Product