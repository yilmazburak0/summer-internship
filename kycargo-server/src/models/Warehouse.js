import mongoose from 'mongoose';
import ShortId from 'shortid';
const {ObjectId} = mongoose.Schema.Types;

const WarehouseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
  capacity: {
    type: Number,
    default: 0,
  },
  emptySpace: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  maxVolume:{
    type:Number,
    default:0,
  },
  currentVolume:{
    type:Number,
    default:0,
  },
  occupancyPercentage:{
    type:Number,
    default:0,
  },
  stocks: [],
    // {
    //   name: {
    //     type: String,
    //   },
    //   code: {
    //     type: String,
    //   },
    //   barcode: {
    //     type: String,
    //   },
    //   quantity: {
    //     type: Number,
    //   },
    // },
  
  address: {
    countryCode: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    street: {
      type: String,
    },
    doorNumber: {
      type: String,
    },
    fullAddress: {
      type: String,
      // required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creatorUser: {
    type: ObjectId,
    ref: 'User',
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  modifierUser: {
    type: ObjectId,
    ref: 'User',
  },
});

const Warehouse = mongoose.model('Warehouse', WarehouseSchema);
export default Warehouse;
