import mongoose from 'mongoose';
import ShortId from 'shortid';
const {ObjectId} = mongoose.Schema.Types;

const LogSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
    default: ShortId.generate,
  },
  logId: {
    type: ObjectId,
  },
  tableName: {
    type: String,
  },
  type: {
    type: String,
    default: 'C',
  },
  oldData: {
    type: Object,
  },
  newData: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creatorUser: {
    type: Object,
  },
});

const Log = mongoose.model('Log', LogSchema);
export default Log;
