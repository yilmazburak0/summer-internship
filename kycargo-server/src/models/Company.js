import mongoose from 'mongoose';
import companyStatus from 'enums/company';
import BranchSchema from './Branch';
import {getAsArray} from 'helpers/common';
//branch schema oluştur import et!
const {ObjectId} = mongoose.Schema.Types;

const CompanySchema = new mongoose.Schema({
  //USER SCHEMA ile bağlantı kurup companyAdmin'i ekle!
  name: {
    type: String,
    required: true,
  },
  companyCode:{
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: getAsArray(companyStatus),
    default: 'active',
  },
  branch: {
    type: [BranchSchema],
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

export default CompanySchema;
