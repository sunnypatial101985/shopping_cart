import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorieSchema = new Schema({
    title: { type: String, index: true, unique: true },
    inserted_at: { type: Date, default: Date.now },
    hidden: Boolean
});
const Categorie = mongoose.model('Categorie', categorieSchema);
export default Categorie