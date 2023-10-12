import { userRole } from '../enums/user';
import { search } from 'helpers/filterParser';
import ErrorResponse from 'helpers/errorResponse';
import errors from 'enums/errors';
import { deleteDocumentById, insertDocument, updateDocumentById } from 'helpers/database';
import { registerModel } from 'middleware/databaseAdapter';
import Vehicle from 'models/Vehicle';
const searchTextFields = ['name', 'type', 'plate','volume','weightCapacity'];
const adminFields = ['plate'];
const defaultProjection = [
    'name',
    'type',
    'plate',
    'status',
    'volume',
    'weightCapacity',
    'weight',
    'createdAt',
    'modifiedAt'
];

const lookupInfo = [];

export const getVehicle = async (req, res) => {
    console.log("get vehicle")
    const { id } = req.params;
    if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {
        res.send(await Vehicle.find().lean());
    } else {
        throw new ErrorResponse(errors.UN_AUTHORIZED);
    }
};

export const createVehicle = async (req, res) => {
    // const Vehicle = registerModel(req.dbName, "Vehicle")
    if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {

        const addedVehicle = await insertDocument(Vehicle, req.user, req.body);
        res.send(addedVehicle);
    } else {
        throw new ErrorResponse(errors.UN_AUTHORIZED);
    }
};

export const updateVehicle = async (req, res) => {
    // const Vehicle = registerModel(req.dbName, "Vehicle")

    const { _id } = req.body;

    if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {

        const updatedVehicle = await updateDocumentById(Vehicle, req.user, _id, req.body);
        res.send(updatedVehicle);
    } else {
        throw new ErrorResponse(errors.UN_AUTHORIZED);
    }
};

export const deleteVehicle = async (req, res) => {
    // const Vehicle = registerModel(req.dbName, "Vehicle")
    const { id } = req.params;
    if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {
        //araç kullanılıyor ise silinmesin isDeleted eklenebilir ön yüzde gösterilmez yada kullanılıyor diye hata patlatılabilir

        const deletedVehicle = await deleteDocumentById(Vehicle, req.user, id);
        res.send(deletedVehicle);
    } else {
        throw new ErrorResponse(errors.UN_AUTHORIZED);
    }
};


export const searchVehicle = async (req, res) => {
    console.log("search vehicle")
    const filter = req.body.filter || {};
    // const Vehicle = registerModel(req.dbName, "Vehicle")
    if (!filter.fields) filter.fields = [];
    const result = await search(req.user, Vehicle, searchTextFields, filter, defaultProjection, adminFields, lookupInfo);
    res.send(result);
};
