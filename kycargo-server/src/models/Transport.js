import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types;
import ShortId from 'shortid';

const TransportSchema = new mongoose.Schema({
  transportNo: {
    type: String,
    required: true,
    unique: true,
    default: ShortId.generate,
  },
  vehicleName: {
    type:String,
    // type: ObjectId,
    // ref:'Vehicle',
  },
  transportDate: {
    type: String,
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

const Transport = mongoose.model('Transport', TransportSchema);
export default Transport;