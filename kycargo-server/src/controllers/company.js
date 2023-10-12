import {userRole} from '../enums/user';
import {search} from 'helpers/filterParser';
import ErrorResponse from 'helpers/errorResponse';
import errors from 'enums/errors';
import {deleteDocumentById, insertDocument, updateDocumentById} from 'helpers/database';
import {registerModel} from 'middleware/databaseAdapter';
import { createUser } from './user';

const searchTextFields = ['name', 'type'];
const adminFields = ['plate'];
const defaultProjection = ['name', 'status', 'createdAt', 'modifiedAt'];

const lookupInfo = [];

export const getCompany = async (req, res) => {
  const {id} = req.params;
  if (req.user.role === userRole.ADMIN) {
    const Company = await Company.findById(id).lean();
    res.send(Company);
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const createCompany = async (req, res) => {
  const Company = registerModel("MASTER", 'Company');
    
  if (req.user.role === userRole.ADMIN) {
    const addedCompany = await insertDocument(Company, req.user, req.body.CompanyObj);
    //createUser() //kullanıcı oluşturulacak
    res.send(addedCompany);
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const updateCompany = async (req, res) => {
  const Company = registerModel("MASTER", 'Company');

  const {_id} = req.body;

  if (req.user.role === userRole.ADMIN) {
    const updatedCompany = await updateDocumentById(Company, req.user, _id, req.body);
    res.send(updatedCompany);
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const deleteCompany = async (req, res) => {
  const Company = registerModel("MASTER", 'Company');
  const {id} = req.params;
  if (req.user.role === userRole.ADMIN) {
    const deletedCompany = await deleteDocumentById(Company, req.user, id);
    res.send(deletedCompany);
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const searchCompany = async (req, res) => {
  const Company = registerModel('MASTER', 'Company');
  const filter = req.body.filter || {};

  if (!filter.fields) filter.fields = [];

  const result = await search(req.user, Company, searchTextFields, filter, defaultProjection, adminFields, lookupInfo);
  res.send(result);
};
