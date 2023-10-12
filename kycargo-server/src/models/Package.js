import mongoose from 'mongoose';
import ShortId from 'shortid';
const {ObjectId} = mongoose.Schema.Types;

const PackageSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
    default: ShortId.generate,
  },
  branchId: {
    type: ObjectId,
    ref:'Branch'
  },
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  width: {
    type: Number,
  },
  length: {
    type: Number,
  },
  height: {
    type: Number,
  },
  volume: {
    type: Number,
  },
  status: {
    type: String,
    default: 'active',
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

const Package = mongoose.model('Package', PackageSchema);
export default Package;
