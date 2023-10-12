import Package from 'models/Package';
import {userRole} from '../enums/user';
import {search} from 'helpers/filterParser';
import ErrorResponse from 'helpers/errorResponse';
import errors from 'enums/errors';
import Delivery from 'models/Delivery';
import User from 'models/User';
import {deleteDocumentById, insertDocument, updateDocumentById} from 'helpers/database';
import UserSchema from 'models/User';
import error from 'middleware/error';
import { getFullDelivery } from './delivery';

const searchTextFields = ['name', 'type', 'width', 'height', 'length', 'volume', 'status'];
const adminFields = [];
const defaultProjection = [
  'shortId',
  'name',
  'type',
  'width',
  'height',
  'length',
  'volume',
  'status',
  'createdAt',
  'modifiedAt',
  ...adminFields,
];

const lookupInfo = [];

export const getPackage = async (req, res) => {
   if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {
      const packages = await Package.find().lean();
       res.send(packages);//
   } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
   }
};                                                                                                

export const createPackage = async (req, res) => {
  const {name, type, width, height, length} = req.body;
  req.body.branchId = req.user._id
  req.body.packages = req.body
  req.body.packages.productType = req.body
  if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {
    if (!name) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'name missing');
    if (!type) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'type missing');
    if (!width) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'width missing');
    if (!height) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'height missing');
    if (!length) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'length missing');
   

    if (width <= 0) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'width cannot be zero missing');
    if (height <= 0) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'height cannot be zero missing');
    if (length <= 0) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'length cannot be zero missing');
   
    
    req.body.volume = ((width || 0) * (length || 0) * (height || 0)) / (1000 * 1000);
    const createdPackage = await insertDocument(Package, req.user, req.body);
    // await insertDocument(Delivery, req.user, req.body);
    res.send(createdPackage);
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const updatePackage = async (req, res) => {
  const {_id, name, type, width, height, length} = req.body;

  if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {
    // const existPackage = await Package.findOne({packagesId: _id}).lean();
    // if (existPackage?._id) throw new ErrorResponse(errors.VALIDATION_ERROR, 'box already used. Cannot be changed');

    if (!_id) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, '_id missing');
    if (!name) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'name missing');
    if (!type) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'type missing');
    if (!width) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'width missing');
    if (!height) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'height missing');
    if (!length) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'length missing');
    

    if (width <= 0) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'width cannot be zero missing');
    if (height <= 0) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'height cannot be zero missing');
    if (length <= 0) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'length cannot be zero missing');
   

    req.body.volume = ((width || 0) * (length || 0) * (height || 0)) / (1000 * 1000);

    const packages = await updateDocumentById(Package, req.user, _id, req.body);
    res.send(packages);
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const deletePackage = async (req, res) => {
  const {id} = req.params;
  // if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {
  //   const existPackage = await Package.findOne({boxId: _id}).lean();
  //   if (existPackage?._id) throw new ErrorResponse(errors.VALIDATION_ERROR, 'box already used. Cannot be delete');
  
  if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER){
    const packages = await deleteDocumentById(Package, req.user, id);
    res.send(packages); 
    
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
    
  }
};

export const changePackageStatus = async (req, res) => {
  const {_id, status} = req.body;

  if (!status) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'status missing');

  if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {
    const packages = await updateDocumentById(Package, req.user, _id, req.body);
    res.send(packages);
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const searchPackage = async (req, res) => {
  const filter = req.body.filter || {};
  
  if (!filter.fields) filter.fields = [];

  const result = await search(req.user, Package, searchTextFields, filter, defaultProjection, adminFields, lookupInfo);
  res.send(result);
};
