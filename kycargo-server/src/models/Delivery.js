import mongoose from 'mongoose';
import ShortId from 'shortid';
const {ObjectId} = mongoose.Schema.Types;

const DeliverySchema = new mongoose.Schema({
  code: {
    type: String,
    //değiş true yap
    required: false,
  },
  branchId: {
    type: ObjectId,
    ref: 'Branch',
  },
  warehouseId: {
    type: ObjectId,
    ref: 'Warehouse',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  completedDate: {
    type: Date,
  },
  receiver: {
    type:ObjectId,
    ref:'User'
  },
  sender: {
    type:ObjectId,
    ref:'User'
  },
  packages: [
    {
      reference: String,
      height: Number,
      length: Number,
      width: Number,
      packageWeight: Number,
      volume: Number,
      price: Number,
      description: String,
      name:String,
      productTypes: [
        {
          name: String,
          quantity: Number,
          weight: Number,
        },
      ],
    },
  ],
  totalPackageCount: {
    type: Number,
    default: 0,
  },
  cargoCompany: {
    type: String,
  },
  trackingNumber: {
    type: String,
  },
  status: {
    type: String,
    default: 'new',
  },
  totalPrice: {
    type: Number,
  },
  responsible: {
    id: {type: ObjectId},
    name: {type: String},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creatorUser: {
    type: ObjectId,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  modifierUser: {
    type: ObjectId,
  },
});

const Delivery = mongoose.model('Delivery', DeliverySchema);
export default Delivery;