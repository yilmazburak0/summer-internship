import mongoose from 'mongoose';
import ShortId from 'shortid';

const ProductSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
    default: ShortId.generate,
  },
  name: {
    type: String,
    unique:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creatorUser: {
    type: Object,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  modifierUser: {
    type: Object,
  },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
