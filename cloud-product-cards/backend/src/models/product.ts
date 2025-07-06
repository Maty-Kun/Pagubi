import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true }
});

const Product = model('Product', productSchema);

export default Product;