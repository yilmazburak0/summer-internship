import mongoose from 'mongoose';
import ShortId from 'shortid';

const {ObjectId} = mongoose.Schema.Types;

const PaymentSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
    default: ShortId.generate,
  },
  companyId: {
    type: ObjectId,
    ref: 'Company',
  },
  code: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  paymentDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['notPaid', 'paid'],
    default: 'notPaid',
  },
  products: [
    {
      code: {
        type: String,
      },
      name: {
        type: String,
      },
      barcode: {
        type: String,
      },
      invoiceNumber: {
        type: String,
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
      totalPrice: {
        type: Number,
      },
    },
  ],
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

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;
