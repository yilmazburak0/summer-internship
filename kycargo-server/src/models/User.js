import crypto from 'crypto';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import ShortId from 'shortid';
import _ from 'lodash';
import { userRole } from '../enums/user';
const { ObjectId } = mongoose.Schema.Types;

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
    set: (email) => _.toLower(email),
  },
  phone: {
    type: String,
    // match: [/^[+][1-9][0-9]{9,12}$/, 'Please add a valid phone number'],
  },
  role: {
    type: String,
    enum: Object.keys(userRole).map((el) => userRole[el]),
    default: userRole[Object.keys(userRole)[0]],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    select: false,
    default:"123456"
  },
  status: {
    type: String,
    enum: ['active', 'passive'],
    default: 'active',
  },
  // dbName: {
  //   type: String,
  //   required: true
  // },
  FCMToken: {
    type: String
  },
  agreement: {
    type: Boolean,
    default: true
  },
  agreementDate: {
    type: Date,
    unique: false
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  apiKey: {
    type: String,
    required: false,
  },
  secretKey: {
    type: String,
    required: false,
  },
  profile: {
    isUpdated: {
      type: Boolean,
      default: false,
    },
    firstName: {
      type: String,
      required: false,
      maxlength: 255,
      // set: (value) => _.startCase(_.toLower(value))
    },
    lastName: {
      type: String,
      required: false,
      maxlength: 255,
      // set: (value) => _.startCase(_.toLower(value))
    },
    dateOfBirth: {
      type: Date,
    },
    occupation: {
      type: String,
      required: false,
      maxlength: 255,
      default: '',
    },
    about: {
      type: String,
      required: false,
      maxlength: 1000,
      default: '',
    },
    profilePicture: {
      type: String,
      required: false,
      get: (value) => value || 'no-profile-picture.jpg',
    },
    address: [{
      addressType: { type: String, enum: ['home', 'work', 'other'] },
      addressLine: { type: String },
      zipCode: { type: Number },
      city: { type: String },
      country: { type: String }
    }],
    passaport: {
      type:String,
      required: [true, 'Please add a passaport']
    }
    // country: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: Country,
    //   get: (value) => value || null,
    // },
  },
  resetPasswordToken: {
    type: String,
    required: false,
    select: false,
  },
  resetPasswordExpire: {
    type: Date,
    required: false,
    select: false,
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
  }
});


UserSchema.pre("findOne", function (next) {
  this.populate("profile.spokenLanguages")
    .populate("settings.language")
    .populate("profile.country", "nameI18n");
  next();
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.modifiedAt = Date.now();
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

UserSchema.methods.getVerifyEmailSecret = function (verifyVia) {
  // Generate token
  const secret = verifyVia.code ? Math.floor(1000 + Math.random() * 9000).toString() : crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.verifyEmailToken = verifyVia.code ? secret : crypto.createHash('sha256').update(secret).digest('hex');

  const expireDateCode = new Date();
  expireDateCode.setMinutes(expireDateCode.getMinutes() + 3);

  const expireDateToken = new Date();
  expireDateToken.setDate(expireDateToken.getDate() + 3);

  // Set expire
  this.verifyEmailExpire = verifyVia.code ? expireDateCode : expireDateToken; // +3 minutes for code, +10days for token

  return this.verifyEmailToken;
};

UserSchema.methods.getVerifyPhoneCode = function () {
  // Generate token
  const code = Math.floor(1000 + Math.random() * 9000).toString();

  // Hash token and set to resetPasswordToken field
  this.verifyPhoneCode = code;

  // Set expire
  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + 3);

  this.verifyPhoneExpire = expireDate; // Date.now() + 3 * 60000; //+3 minutes in millisecond

  return code;
};

UserSchema.virtual('fullName').get((value, virtual, doc) => {
  const firstName = this.profile.firstName || '';
  const lastName = this.profile.lastName || '';
  return `${firstName} ${lastName}`; 
});

const User = mongoose.model('User', UserSchema); 
export default UserSchema;
// export default User;

// module.exports = {
//   User:User,
//   UserSchema: UserSchema,
// };