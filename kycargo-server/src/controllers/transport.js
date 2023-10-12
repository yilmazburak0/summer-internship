
import { userRole } from '../enums/user';
import { search } from 'helpers/filterParser';
import ErrorResponse from 'helpers/errorResponse';
import errors from 'enums/errors';
import { deleteDocumentById, insertDocument, updateDocumentById } from 'helpers/database';
import { registerModel } from 'middleware/databaseAdapter';
import Transport from 'models/Transport';
import { sortedUniq } from 'lodash';
const searchTextFields = ['transportNo', 'vehicleName', 'transportDate'];
const adminFields = [];
const defaultProjection = [
    'transportNo',
    'transportDate',
    'vehicleName',
    'createdAt',
    'modifiedAt'
];

const lookupInfo = [];
export const getTransport = async (req, res) => {
    console.log("get");
    const {id} = req.params;
    if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {
        res.send(Transport.findById(id).lean());
    } else {
        throw new ErrorResponse(errors.UN_AUTHORIZED);
    }
};

export const createTransport = async (req, res) => {
    console.log("create");

    const addedTransport = await insertDocument(Transport, req.user, req.body);
    res.send(addedTransport);
};

export const updateTransport = async (req, res) => {
    console.log("Update");
    const {_id} = req.body;
    const updatedTransport= await updateDocumentById(Transport, req.user,_id, req.body);
    res.send(updatedTransport);
};

export const deleteTransport = async (req, res) => {
    const {id} =req.params;
    const deletedTransport = await deleteDocumentById(Transport, req.user, id);
    res.send(deletedTransport);
};


export const searchTransport = async (req, res) => {
    const filter = req.body.filter || {};
    if (!filter.fields) filter.fields = [];
    const result = await search(req.user, Transport, searchTextFields, filter, defaultProjection, adminFields, lookupInfo);
    res.send(result);
};
