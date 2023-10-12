import Product from 'models/Product';
import {userRole} from '../enums/user';
import {search} from 'helpers/filterParser';
import ErrorResponse from 'helpers/errorResponse';
import errors from 'enums/errors';
import {deleteDocumentById, insertDocument, updateDocumentById} from 'helpers/database';

const searchTextFields = ['name'];
const adminFields = [];
const defaultProjection = [
  'shortId',
  'name',,
  'createdAt',
  'modifiedAt',
  ...adminFields,
];

const lookupInfo = [];

export const getProduct = async (req, res) => {
  if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {
    const product = await Product.find();
    res.send(product);
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const createProduct = async (req, res) => {
  const {name} = req.body;

  if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {
    if (!name) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'name missing');
      
    const product = await insertDocument(Product, req.user, req.body);
    res.send(product);
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const updateProduct = async (req, res) => {
  const {_id, name} = req.body;
  if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {
    if (!_id) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, '_id adamissing');
    if (!name) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'name missing');

    const product = await updateDocumentById(Product, req.user, _id, req.body);
    res.send(product);
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const deleteProduct = async (req, res) => {
  const {id} = req.params;  
  if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER){
    const product = await deleteDocumentById(Product, req.user, id);
    res.send(product); 
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const searchProduct = async (req, res) => {
  const filter = req.body.filter || {};
  if (!filter.fields) filter.fields = [];
  const result = await search(req.user, Product, searchTextFields, filter, defaultProjection, adminFields, lookupInfo);
  res.send(result);
};
