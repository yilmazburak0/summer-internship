import {search} from 'helpers/filterParser';
import {userRole} from 'enums/user';
import ErrorResponse from 'helpers/errorResponse';
import errors from 'enums/errors';
import bcrypt from 'bcrypt';

import mongoose, { model } from 'mongoose';
import {generatePublicUser, IsEqualID} from 'helpers/auth';
import {customAlphabet} from 'nanoid';
import {insertDocument, updateDocumentById} from 'helpers/database';
import {registerModel} from 'middleware/databaseAdapter';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const searchTextFields = ['profile.firstName', 'profile.lastName', 'role', 'email', 'phone'];
const adminFields = [];
const defaultProjection = [
  'shortId',
  'companyId',
  'company.name',
  'warehouseId',
  'warehouse.name',
  'email',
  'phone',
  'role',
  'status',
  'profile',
  'createdAt',
  'modifiedAt',
  ...adminFields,
];
const lookupInfo = [
  {
    from: 'companies',
    localField: 'companyId',
    foreignField: '_id',
    as: 'company',
    isSingle: true,
  },
  {
    from: 'warehouses',
    localField: 'warehouseId',
    foreignField: '_id',
    as: 'warehouse',
    isSingle: true,
  },
];
const User = registerModel('MASTER', 'User');
// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
export const getUser = async (req, res) => {
  let _id = req.body.id || req.params.id || 0;
  if (!_id) _id = req.user._id;
  // res.send(await getFullUser(_id, req.user));
  let users = await User.find().lean()
  res.send(users);
};

export const getApiUser = async (req, res) => {
  
  if (req.user.role === userRole.COMPANY_ADMIN) {
    const apiUser = await User.findOne({companyId: req.user.companyId, role: userRole.API_USER}).lean();
    if (!apiUser._id) throw new ErrorResponse(errors.RECORD_NOT_FOUND, 'Api user not found');
    res.send(apiUser);
  }
};

export const createUser = async (newUser, session) => {

  //COMPANY_USER
  //PAsswordu biz girmiyoruz
  const existingUser = await User.findOne({email: newUser.email}).lean();
  if (existingUser?._id) throw new ErrorResponse(errors.EMAIL_EXIST);
  const user = new User(newUser);
  let sessionObj;
  if (session) sessionObj = {session};
  return await user.save(sessionObj);
};

export const createCustomer = async (req,res) => {

  //req,res ekle
  const {phone, email, address, passaport,firstName,lastName,dateOfBird,country,city} = req.body;
  let existingUser = await User.findOne({email: req.body.email}).lean();
  if (existingUser?._id) throw new ErrorResponse(errors.EMAIL_EXIST,'email already in use');
  existingUser = await User.findOne({passaport: req.body.passaport}).lean();
  if (existingUser?._id) throw new ErrorResponse(errors.PASSAPORT_EXIST,'passaport already in use');
  if(!phone) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'phone missing');
  if(!email) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'email missing');
  if(!address) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address missing');
  if(!passaport) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'passaport missing');
  if(!firstName) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'firstName missing');
  if(!lastName) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'lastName missing');
  if(!dateOfBird) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'dateOfBirth missing');
  req.body.profile = {
      firstName:{
        type:String,
      },
      lastName:{
        type:String,
      },
      passaport:{
        type:Number,
      },
      dateOfBirth:{
        type:Number,
      },
      address: [{
        addressLine: { type: String },
        city: { type: String },
        country: { type: String }
      }],
  }
//ValidationError User validation failed: profile.address.0.zipCode: 
// Cast to Number failed for value "{ type: [Function: Number] }" (type Object) at path 
// "zipCode", password: Please add a password
  req.body.profile.firstName = firstName;
  req.body.profile.lastName = lastName;
  req.body.profile.passaport = passaport
  req.body.profile.dateOfBirth = dateOfBird
  //ADRESSİ ARR YAP(adres array olarak geldiği zaman)
  req.body.profile.address[0].addressLine = address;
  req.body.profile.address[0].country = country;
  req.body.profile.address[0].city = city;
  //companyCustomer
  req.body.role = userRole.COMPANY_CUSTOMER;

  // const user = new User(newUser);

  // let sessionObj;//
  // if (session) sessionObj = {session};//
  const customerUser = await insertDocument(User, req.user, req.body);
  res.send(customerUser);
  // return await user.save(sessionObj);//
};


export const createApiUser = async (req, res) => {

  // const {id} = req.body;
  // if (!id) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'User id missing');
  // if (req.user.role !== userRole.COMPANY_ADMIN) throw new ErrorResponse(errors.UN_AUTHORIZED);

  // const existUser = await User.find({companyId: id, role: userRole.API_USER}).lean();
  // if (existUser?.length > 0) throw new ErrorResponse(errors.API_USER_CREATED);

  const company = await Company.findById(req.user.companyId).lean();
  const nanoid1 = customAlphabet(alphabet, 15);
  const nanoid2 = customAlphabet(alphabet, 32);

  const api = {
    apiKey: nanoid1(),
    secretKey: nanoid2(),
  };

  const user = await insertDocument(User, req.user, {
    companyId: req.user.companyId,
    role: userRole.API_USER,
    email: company.code + '@' + company.code + '.com',
    password: nanoid1(),
    apiKey: api.apiKey,
    secretKey: api.secretKey,
  });

  res.send(api);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const updateUser = async (req, res) => {
  const {id} = req.params;

  if (!id) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, ' id missing');
  const user = await User.findById(id).lean();
  if (
    req.user.role === userRole.ADMIN ||
    req.user.role === userRole.PRODUCT_ANALYST_MANAGER ||
    (IsEqualID(user.companyId, req.user.companyId) && req.user.role === userRole.COMPANY_ADMIN)
  ) {
    const userToUpdate = req.body;

    if (userToUpdate?.email) {
      const user = await User.findOne({email: userToUpdate.email, _id: {$ne: mongoose.Types.ObjectId(id)}}).lean();
      if (user) throw new ErrorResponse(errors.DUPLICATION, ' email already used');
    }

    if (userToUpdate?.password) {
      const salt = await bcrypt.genSalt(10);
      userToUpdate.password = await bcrypt.hash(userToUpdate.password, salt); //toDo
    }

    const updatedUser = await updateDocumentById(User, req.user, id, userToUpdate);
    res.send(updatedUser);
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const deleteUser = async (req, res) => {
  const {id} = req.params;

  const deletedUser = await updateDocumentById(User, req.user, id, {isDeleted: true, status: 'passive'});

  res.send(deletedUser);
};

export const searchUser = async (req, res) => {
  const filter = req.body.filter || {};
  if (!filter.fields) filter.fields = [];

  switch (req.user.role) {
    case userRole.ADMIN:
    case userRole.DEVELOPER:
    case userRole.PRODUCT_ANALYST_MANAGER:
      filter.fields.push({condition: 'null', value: req.user.companyId, dataField: 'companyId'});
      break;
    case userRole.PRODUCT_ANALYST:
      filter.fields.push({condition: 'equal', value: req.user._id + '', dataField: '_id'});
      break;
    case userRole.COMPANY_ADMIN:
      filter.fields.push({condition: 'equal', value: req.user.companyId, dataField: 'companyId'});
      break;
    // case userRole.COMPANY_USER:
    //   return;
    // case userRole.API_USER:
    //   return;

    default:
      throw new ErrorResponse(errors.UN_AUTHORIZED);
  }

  filter.fields.push({condition: 'not_equal', value: true, dataField: 'isDeleted'});

  const result = await search(req.user, User, searchTextFields, filter, defaultProjection, adminFields, lookupInfo);

  res.send(result);
};

export const getFullUser = async (_id, reqUser) => {
  if (
    _id === reqUser._id ||
    reqUser.role === userRole.ADMIN ||
    reqUser.role === userRole.PRODUCT_ANALYST_MANAGER ||
    reqUser.role === userRole.COMPANY_ADMIN
  ) {
    const user = await User.aggregate([
      {$match: {_id: {$eq: mongoose.Types.ObjectId(_id)}}},
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'company',
        },
      },
      {
        $unwind: {
          path: '$company',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'warehouses',
          localField: 'warehouseId',
          foreignField: '_id',
          as: 'warehouse',
        },
      },
      {
        $unwind: {
          path: '$warehouse',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]).exec();
    if (!user[0]) throw new ErrorResponse(errors.RECORD_NOT_FOUND);
    return generatePublicUser(user[0]);
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};
