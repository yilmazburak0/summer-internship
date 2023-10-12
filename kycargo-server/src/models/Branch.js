import mongoose from 'mongoose';
import {branchStatus} from 'enums/branch';
import {getAsArray} from 'helpers/common';
//branch schema oluştur import et!
const {ObjectId} = mongoose.Schema.Types;

const BranchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyId: {
    type: ObjectId,
  },
  status: {
    type: String,
    enum: getAsArray(branchStatus),
    default: 'active',
  },
  city: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  address: {
    addressLine: {type: String},
    zipCode: {type: Number},
    city: {type: String},
    country: {type: String},
  },
  billingAdress: [
    {
      addressLine: {type: String},
      zipCode: {type: Number},
      city: {type: String},
      country: {type: String},
    },
  ],
  taxNo: {
    type: String,
    required: true,
  },
  taxAdministration: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
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

export default BranchSchema;
