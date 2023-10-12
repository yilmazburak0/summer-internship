import Branch from 'models/Branch';
import {userRole} from '../enums/user';
import {search} from 'helpers/filterParser';
import ErrorResponse from 'helpers/errorResponse';
import errors from 'enums/errors';
import {insertDocument, updateDocumentById} from 'helpers/database';
import {registerModel} from 'middleware/databaseAdapter';

const User = registerModel('MASTER', 'User');

const searchTextFields = ['name','volume','address','occupancyPercentage']; //, 'code'
const adminFields = [];
const defaultProjection = [
  'shortId',
  'name',
  'code',
  'address',
  'capacity',
  'emptySpace',
  'quantity',
  'stocks',
  'createdAt',
  'modifiedAt',
  'volume',
  'occupancyPercentage',  

  ...adminFields,
];

const lookupInfo = [];

export const getWarehouse = async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {
    const warehouse = await Branch.findById(_id).lean();
    res.send(warehouse);
  }
};

export const createWarehouse = async (req, res) => {
  if (req.user.role === userRole.ADMIN || req.user.role === userRole.PRODUCT_ANALYST_MANAGER) {
    const {name, volume} = req.body;
    let id = req.user._id;
    const user = await User.findById(id).lean();
  //   const address = user.address[0];
  //   "address" : [
  //     {
  //         "_id" : ObjectId("64cfad2a44ca8f29687e2137"),
  //         "addressLine" : "Cumhuriyet Mahallesi Cinar Sokak ",
  //         "city" : "Antalya",
  //         "country" : "Turkey"
  //     }
  // ]
    const address =  {
      city: "izmir",
      country: "türkiye"
    };
    if (!name) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'name missing');
    if (!address?.country) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address.country missing');
    if (!address?.city) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address.city missing');
    // if (!address?.district) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address.district missing');
    // //if(!address?.street) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, "address.street missing");
    // if (!address?.doorNumber) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address.doorNumber missing');
    // if (!address?.fullAddress) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address.fullAddress missing');
    // if (!address?.postalCode) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address.postalCode missing');

    const warehouse = await Warehouse.findOne({name}).lean();
    if (warehouse) throw new ErrorResponse(errors.DUPLICATION, 'name already used');
    
    const Country = registerModel(req.dbName, 'Country')
    // const country = await Country.findOne({name: req.body.address.country});      neden??
    // req.body.address.countryCode = country.code2;
    
    req.body.address = address;
    req.body.volume = volume;
    req.body.modifierUser = req.user._id;
    req.body.creatorUser = req.user._id;
    req.body.stocks = [];
    req.body.occupancyPercentage = 100; 
    const newWarehouse = await insertDocument(Warehouse, req.user, req.body);
    res.send(newWarehouse);
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const updateWarehouse = async (req, res) => {
  if (req.user.role === userRole.ADMIN) {
    const {_id, name} = req.body;
    const address =  {
      city: "izmir",
      country: "türkiye"
    };
    req.body.address = address;
    if (!_id) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, '_id missing');
    if (!name) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'name missing');
    if (!address?.country) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address.country missing');
    if (!address?.city) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address.city missing');
    // if (!address?.district) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address.district missing');

    //if(!address?.street) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, "address.street missing");
    // if (!address?.doorNumber) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address.doorNumber missing');
    // if (!address?.fullAddress) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address.fullAddress missing');
    // if (!address?.postalCode) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address.postalCode missing');

    const warehouse = await Warehouse.findOne({name, _id: {$ne: {_id}}}).lean();
    if (warehouse) throw new ErrorResponse(errors.DUPLICATION, 'name already used');
    
    const Country = registerModel(req.dbName, 'Country')

    // const country = await Country.findOne({name: req.body.address.country});
    // req.body.address.countryCode = country.code2;

    req.body.modifierUser = req.user._id;

    const result = await updateDocumentById(Warehouse, req.user, _id, req.body);
    res.send(result);
  }else{
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  } 
};

// export const deleteWareHouse = (req, res) => {
//   //const oldOrder = Order.findById({_id: req.body._id}).lean();
// };

export const searchWarehouse = async (req, res) => {
  const filter = req.body.filter || {};
  if (!filter.fields) filter.fields = [];

  switch (req.user.role) {
    case userRole.ADMIN:
    case userRole.DEVELOPER:
    case userRole.PRODUCT_ANALYST_MANAGER:
    case userRole.PRODUCT_ANALYST:
      break;
    default:
      throw new ErrorResponse(errors.UN_AUTHORIZED);
  }

  res.send(await search(req.user, Warehouse, searchTextFields, filter, defaultProjection, adminFields, lookupInfo));
};
