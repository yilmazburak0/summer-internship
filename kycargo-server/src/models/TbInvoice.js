import mongoose from 'mongoose';
import ShortId from 'shortid';

const {ObjectId} = mongoose.Schema.Types;

const TbInvoiceSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
    default: ShortId.generate,
  },
  type: {
    type: String,
    enum: ['sale', 'saleCancel', 'return', 'damaged'],
    default: 'sale',
  },
  companyId: {
    type: ObjectId,
    ref: 'Company',
  },
  invoiceNumber: {
    type: String,
  },
  invoiceDate: {
    type: Date,
    default: Date.now,
  },
  barcode: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  contractPrice: {
    type: Number,
  },
  salePrice: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  processed: {
    type: Boolean,
    default: false,
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

const TbInvoice = mongoose.model('TbInvoice', TbInvoiceSchema);
export default TbInvoice;
