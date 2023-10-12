import { customAlphabet } from 'nanoid';
import formidable from 'formidable';
import path from 'path';
import deliveryStatus from 'enums/delivery';
import errors from 'enums/errors';
import { userRole } from 'enums/user';
import ErrorResponse from 'helpers/errorResponse';
import { search } from 'helpers/filterParser';
import Delivery from 'models/Delivery';
import mongoose from 'mongoose';
import FireStore from 'lib/firestore/index';
import { insertDocument, updateDocumentById, updateDocumentOne } from 'helpers/database';
import Warehouse from 'models/Warehouse';
import {insertDeliveryToWarehouse} from 'controllers/warehouse';
import { generateCode } from 'helpers/common';
import { reverse } from 'lodash';
// const {User,UserSchema} = require('models/User');
import {registerModel} from 'middleware/databaseAdapter';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 8);

const searchTextFields = ['code', 'orderCode', 'status','receiver','sender','packages','totalPrice','date'];
const adminFields = [];
const defaultProjection = [
  'receiver',
  'sender',
  'packages',
  'totalPrice',
  'totalPackageCount',
  'shortId',
  'code',
  'orderId',
  'orderCode',
  'companyId',
  'company.name',
  'warehouseId',
  'warehouse.name',
  'date',
  'completedDate',
  'packageCount',
  'acceptedPackageCount',
  'trackingNumber',
  'responsible',
  'totalQuantity',
  'totalAcceptedQuantity',
  'status',
  'createdAt',
  'modifiedAt',
  'products',
  ...adminFields,
];

const lookupInfo = [
  // {
  //   from: 'companies',
  //   localField: 'companyId',
  //   foreignField: '_id',
  //   as: 'company',
  //   isSingle: true,
  // },
  // {
  //   from: 'warehouses',
  //   localField: 'warehouseId',
  //   foreignField: '_id',
  //   as: 'warehouse',
  //   isSingle: true,
  // },
];

const User = registerModel('MASTER', 'User');


export const getDelivery = async (req, res) => {
  console.log("çalıştı")
  // const _id = req.params.id;
  // if (!_id) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, '_id missing');
  // res.send(await getFullDelivery(_id, req.user));
  
  //SADECE USERIN OLURŞTURDUĞU PAKETLER GELİYOR ŞUBE DİYE DÜZELT ONU!!!
  // const user = await User.findById(_id);
  const deliveries = await Delivery.find().lean();

  res.send(deliveries);//
};

export const getDeliveryByCode = async (req, res) => {
  const { code } = req.body;
  if (!code) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'code missing');
  const delivery = await Delivery.findOne({ code }).lean();
  if (!delivery) throw new ErrorResponse(errors.RECORD_NOT_FOUND);
  res.send(await getFullDelivery(delivery._id, req.user));
};

export const getArrivedDeliveryByCode = async (req, res) => {
  const { code } = req.body;
  if (!code) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'code missing');
  const delivery = await Delivery.findOne({ code }).lean();
  if (!delivery) throw new ErrorResponse(errors.RECORD_NOT_FOUND);
  if (delivery.status !== deliveryStatus.ARRIVED && delivery.status !== deliveryStatus.ACCEPTING) throw new ErrorResponse(errors.WRONG_STATUS);
  await Delivery.findByIdAndUpdate(delivery._id, { status: deliveryStatus.ACCEPTING });
  res.send(await getFullDelivery(delivery._id, req.user));
};

export const createDelivery = async (req, res) => {
  if (req.user.role === userRole.COMPANY_OWNER || req.user.role === userRole.COMPANY_USER || req.user.role === userRole.ADMIN) res.send(await insertDelivery(req.body, req.user));
  else throw new ErrorResponse(errors.UN_AUTHORIZED);

}; 

export const insertDelivery = async (orderId, reqUser) => {
  if (!orderId) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'orderId missing');
  const{packages,receiver,sender,totalPrice,warehouse} = orderId;
  let receiverEmail = receiver.email;
  let senderEmail = sender.email;

  const receiverUser = await User.findOne({"email":receiverEmail});
  const senderUser = await User.findOne({"email":senderEmail});

  if (!receiverUser) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'receiverUser missing');
  if (!senderUser) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'senderUser missing');

  let totalPackageCount = 0;
  let totalWeight = 0;
  for(let i = 0; i < packages.length; i++){
    const {height, length ,width, productTypes, volume,reference,name} = packages[i];
    //ADRESS GİR
    if (!reference) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'referance missing');
    if (!volume) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'volume missing');
    if (!productTypes) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'productTypes missing');
    if (!length) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'length missing');
    if (!height) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'height missing');
    if (!width) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'width missing');
    if (!name) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'name missing');
    for(let k = 0; k < productTypes.length;k++){
      const {name,weight,quantity} = productTypes[k]
     // if (!code_) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'name missing');//?
      if (!name) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'name missing');
      if (!weight) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'weight missing');
      if (!quantity) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'quantity missing');
      totalPackageCount += quantity;
      totalWeight += weight;
    }
  }
  if (!totalPrice) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'Price missing');
  orderId.totalPackageCount = totalPackageCount;
  orderId.totalWeight = totalWeight;
  orderId.receiver = receiverUser;
  orderId.sender = senderUser;
  orderId.warehouseId = warehouse;
  await insertDeliveryToWarehouse(warehouse,packages);
  //GÖNDERİCİ ALICI EKLE
  await insertDocument(Delivery, reqUser, orderId);
  }


  export const changeDeliveryStatus = async (req,res) =>{
    const {status,_id} = req.body;
    const currentDelivery = await Delivery.findById(_id);
    currentDelivery.status = status;
    await currentDelivery.save();
  }
  
  // const order = await Package.findById(orderId._id).lean(); 
  // if (!order?._id) throw new ErrorResponse(errors.RECORD_NOT_FOUND, 'Order not found');
  // let packages = order?.packages;
  // if (packages.length < 1) throw new ErrorResponse(errors.ITEMS_NOT_VALID, 'packages need to have at least 1 item');
  
  // for (let x = 0; x < packages.length; x++) {
    // const currentPackage = packages[x];
    // Delivery.findByIdAndUpdate(currentPackage._id, { weight: weight }, options)
    
    // await insertDocument(Delivery, req.user, req.body);

    // if (!currentPackage.productType.weight) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'weight missing');
    // if (!currentPackage.productType.name) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'name missing');
    // if (!currentPackage.length) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'length missing');
    // if (!currentPackage.height) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'height missing');
    // if (!currentPackage.width) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'width missing');
    // if (!currentPackage.code) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'product.code missing');
    // if (!currentPackage.barcode) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'product.barcode missing');
    // if (!currentPackage.quantity) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'product.quantity missing');
    // totalQuantity += product.quantity;
  // }

  // const company = await Company.findById(order?.companyId).lean();//req.user içine konulacak şirket bilgileri ve şube olabilir?

  // let code = '';
  // let existingDelivery = '';
  // do {
  //   code = generateCode('DL',company.code);
  //   existingDelivery = await Delivery.findOne({ code }).lean();
  // } while (existingDelivery?.code);

  // const delivery = await insertDocument(Delivery, reqUser, {
  //   code,
  //   orderId,
  //   orderCode: order.code,
  //   companyId: order.companyId,
  //   warehouseId: order.warehouseId,
  //   contractId: order.contractId,
  //   products,
  //   totalQuantity,
  //   responsible: order.responsible,
  // });

  // return delivery;
// };

export const startPreparingDelivery = async (req, res) => {
  const { _id } = req.body;

  if (req.user.role === userRole.COMPANY_OWNER || req.user.role === userRole.COMPANY_USER) {
    const oldDelivery = await Delivery.findById(_id).lean();

    if (!oldDelivery) throw new ErrorResponse(errors.RECORD_NOT_FOUND);
    if (oldDelivery?.status !== deliveryStatus.NEW) throw new ErrorResponse(errors.WRONG_STATUS, ' Delivery status must be new');

    const delivery = await updateDocumentById(Delivery, req.user, _id, { status: deliveryStatus.PREPARING });
    res.send(await getFullDelivery(delivery._id));
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};
export const PreparedDelivery = async (req, res) => {
  const { _id } = req.body;

  if (req.user.role === userRole.COMPANY_OWNER || req.user.role === userRole.COMPANY_USER) {
    const oldDelivery = await Delivery.findById(_id).lean();

    if (!oldDelivery) throw new ErrorResponse(errors.RECORD_NOT_FOUND);
    if (oldDelivery?.status !== deliveryStatus.PREPARING) throw new ErrorResponse(errors.WRONG_STATUS, ' Delivery status must be preparing');

    const delivery = await updateDocumentById(Delivery, req.user, _id, { status: deliveryStatus.PREPARED });
    res.send(await getFullDelivery(delivery._id));
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};
export const shippedDelivery = async (req, res) => {
  const { _id, packageCount, trackingNumber } = req.query;

  // if (!packageCount) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, ' packageCount missing');
  // if (!trackingNumber) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, ' trackingNumber missing');

  if (req.user.role === userRole.COMPANY_OWNER || req.user.role === userRole.COMPANY_USER) {
    const oldDelivery = await Delivery.findById(_id).lean();

    if (!oldDelivery) throw new ErrorResponse(errors.RECORD_NOT_FOUND);
    if (oldDelivery?.status !== deliveryStatus.PREPARED && oldDelivery?.status !== deliveryStatus.SHIPPED)
      throw new ErrorResponse(errors.WRONG_STATUS, ' Delivery status must be prepared');

    const form = formidable({ multiples: true });
    console.log('files coming');
    const fireStore = new FireStore();
    form.parse(req, async (err, fields, files) => {
      if (err) throw new ErrorResponse(errors.UPLOAD_ERROR, err.message);
      // const file = files

      let uploadUrls = [];
      console.log('files', files);
      // const keys = Object.keys(files);
      console.log('files', files);

      if (Array.isArray(files.file)) {
        for (let file of files.file) {
          const uploadUrl = await fireStore.createFileFromLocal('gonderSatalim/deliveryInvoice', generateFilename(_id, file.name), file.path);
          const ob = {
            name: file.name,
            url: decodeURIComponent(uploadUrl),
          };
          uploadUrls.push(ob);
        }
      } else {
        if (Object.keys(files).length) {
          const uploadUrl = await fireStore.createFileFromLocal(
            'gonderSatalim/deliveryInvoice',
            generateFilename(_id, files.file.name),
            files.file.path
          );
          const ob = {
            name: files.file.name,
            url: decodeURIComponent(uploadUrl),
          };
          uploadUrls.push(ob);
        }
      }

      let delivery = await updateDocumentById(Delivery, req.user, _id, { packageCount, trackingNumber, $push: { invoiceUrls: { $each: uploadUrls } } });

      if (delivery?.packageCount && delivery?.trackingNumber && delivery?.invoiceUrls && delivery?.invoiceUrls?.length > 0)
        delivery = await updateDocumentById(Delivery, req.user, _id, { status: deliveryStatus.SHIPPED });

      res.send(await getFullDelivery(delivery._id));
    });
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const addFileToDelivery = async (req, res) => {
  const { _id } = req.query;

  const form = formidable({ multiples: true });
  console.log('files coming');
  const fireStore = new FireStore();
  form.parse(req, async (err, fields, files) => {
    if (err) throw new ErrorResponse(errors.UPLOAD_ERROR, err.message);
    // const file = files

    let uploadUrls = [];
    console.log('files', files);
    // const keys = Object.keys(files);
    console.log('files', files);

    if (Array.isArray(files.file)) {
      for (let file of files.file) {
        const uploadUrl = await fireStore.createFileFromLocal('gonderSatalim/deliveryInvoice', generateFilename(_id, file.name), file.path);
        const ob = {
          name: file.name,
          url: decodeURIComponent(uploadUrl),
        };
        uploadUrls.push(ob);
      }
    } else {
      if (Object.keys(files).length) {
        const uploadUrl = await fireStore.createFileFromLocal(
          'gonderSatalim/deliveryInvoice',
          generateFilename(_id, files.file.name),
          files.file.path
        );
        const ob = {
          name: files.file.name,
          url: decodeURIComponent(uploadUrl),
        };
        uploadUrls.push(ob);
      }
    }

    let delivery = await updateDocumentById(Delivery, req.user, _id, { $push: { invoiceUrls: { $each: uploadUrls } } });

    const deliveryInvoice = await DeliveryInvoice.findOne({ deliveryId: _id }).lean();

    if (deliveryInvoice) await updateDocumentById(DeliveryInvoice, req.user, deliveryInvoice._id, { $push: { invoiceUrls: { $each: uploadUrls } } });

    res.send(await getFullDelivery(delivery._id));
  });
};

export const deleteFileFromDelivery = async (req, res) => {
  const { _id, url } = req.body;

  const urlParts = url.split('/');

  const fileName = urlParts[urlParts.length - 1];

  if (fileName.indexOf(_id) == -1) throw ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'file missing');
  const fireStore = new FireStore();

  await fireStore.deleteFile('gonderSatalim/deliveryInvoice', fileName);

  await updateDocumentById(Delivery, req.user, _id, { $pull: { invoiceUrls: { url: url } } });

  const deliveryInvoice = await DeliveryInvoice.findOne({ deliveryId: _id }).lean();

  if (deliveryInvoice) await updateDocumentById(DeliveryInvoice, req.user, deliveryInvoice._id, { $pull: { invoiceUrls: { url: url } } });

  res.send(await getFullDelivery(_id, req.user));
};

function generateFilename(productId, fileName) {
  console.log('generateReturnPicFilename', productId, fileName);
  return `${productId}__${Date.now()}${path.extname(fileName)}`.toLowerCase(); // e.g. 5eaaab8a2c34f832dc3785f1_1588271407808.png
}

export const customDeliveryEnterWarehouse = async (req, res) => {
  const { _id } = req.body;

  const delivery = await Delivery.findById(_id).lean();
  if (!delivery?._id) throw new ErrorResponse(errors.RECORD_NOT_FOUND);
  if (delivery?.status !== deliveryStatus.SHIPPED) throw new ErrorResponse(errors.WRONG_STATUS, 'Delivery status must be shipped');

  const newDelivery = await updateDocumentById(Delivery, req.user, delivery._id, { status: deliveryStatus.ARRIVED });
  res.send(await getFullDelivery(newDelivery._id));
};

export const deliveryEnterWarehouse = async (req, res) => {
  const { code } = req.body;

  const delivery = await Delivery.findOne({ code }).lean();

  if (!delivery?._id) throw new ErrorResponse(errors.RECORD_NOT_FOUND);

  if (delivery?.status === deliveryStatus.SHIPPED || delivery?.status === deliveryStatus.ARRIVED) {
    let newDelivery;
    if (delivery.packageCount === delivery.acceptedPackageCount + 1) {
      newDelivery = await updateDocumentById(Delivery, req.user, delivery._id, { $inc: { acceptedPackageCount: 1 }, status: deliveryStatus.ARRIVED });
    } else {
      newDelivery = await updateDocumentById(Delivery, req.user, delivery._id, { $inc: { acceptedPackageCount: 1 } });
    }
    res.send(await getFullDelivery(newDelivery._id));
  } else throw new ErrorResponse(errors.WRONG_STATUS, 'status must be shipped or arrived');
};

export const acceptProduct = async (req, res) => {
  const { _id, barcode } = req.body;

  if (!_id) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, ' _id missing');
  if (!barcode) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, ' barcode missing');

  const oldDelivery = await Delivery.findById(_id).lean();
  if (!oldDelivery?._id) throw new ErrorResponse(errors.RECORD_NOT_FOUND);

  if (req.user.role === userRole.WAREHOUSE_WORKER) {
    const delivery = await updateDocumentOne(
      Delivery,
      req.user,
      { _id, 'products.barcode': barcode },
      { $inc: { 'products.$.acceptedQuantity': 1, totalAcceptedQuantity: 1 } }
    );

    if (!delivery?._id) throw new ErrorResponse(errors.RECORD_NOT_FOUND);

    await updateDocumentOne(Product, req.user, { barcode }, { $inc: { quantity: 1 } });

    await updateDocumentOne(Warehouse, req.user, { _id: delivery.warehouseId }, { $inc: { quantity: 1 } });

    res.send(await getFullDelivery(delivery?._id));
  } else {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

export const deliveryAcceptedByGonderSatalim = async (req, res) => {
  const { _id } = req.body;
  if (!_id) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, ' _id missing');

  const delivery = await Delivery.findById(_id).lean();

  let status = deliveryStatus.COMPANY_ACCEPTED;

  for (let x = 0; x < delivery.products.length; x++) {
    const product = delivery.products[x];
    if (product.quantity !== product.acceptedQuantity) {
      status = deliveryStatus.GONDER_ACCEPTED;
    }
  }
  // burada priceları hesaplarını yapıyoruz
  let totalPrice = 0;
  let products = delivery.products;
  for (let product of products) {
    product.totalPrice = product.buyingPrice * product.acceptedQuantity || 0;
    totalPrice += product.totalPrice;
  }

  const newDelivery = await updateDocumentById(Delivery, req.user, _id, { status, products, totalPrice, completedDate: Date.now() });

  if (status === deliveryStatus.COMPANY_ACCEPTED) {
    await createDeliveryInvoice(newDelivery._id, req.user);
  }

  res.send(await getFullDelivery(newDelivery._id));
};
export const deliveryAcceptedByCompany = async (req, res) => {
  const { _id } = req.body;
  if (!_id) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, ' _id missing');

  const newDelivery = await updateDocumentById(Delivery, req.user, _id, { status: deliveryStatus.COMPANY_ACCEPTED });
  await createDeliveryInvoice(newDelivery._id, req.user);

  res.send(await getFullDelivery(newDelivery._id));
};

export const deliverySearch = async (req, res) => {
  // const filter = req.body.filter || {};
  // if (!filter.fields) filter.fields = [];

  // switch (req.user.role) {
  //   case userRole.ADMIN:
  //   case userRole.DEVELOPER:
  //   case userRole.PRODUCT_ANALYST_MANAGER:
  //     break;
  //   case userRole.WAREHOUSE_WORKER:
  //     filter.fields.push({ condition: 'equal', value: req.user.warehouseId, dataField: 'warehouseId' });
  //     break;
  //   case userRole.PRODUCT_ANALYST:
  //     filter.fields.push({ condition: 'equal', value: req.user._id, dataField: 'responsible.id' });
  //     break;
  //   case userRole.COMPANY_OWNER:
  //   case userRole.COMPANY_USER:
  //     filter.fields.push({ condition: 'equal', value: req.user.companyId, dataField: 'companyId' });
  //     break;
  //   // case userRole.API_USER:
  //   //   filter.fields.push({condition: 'equal', value: req.user.companyId, dataField: 'companyId'});
  //   //   break;
  //   default:
  //     throw new ErrorResponse(errors.UN_AUTHORIZED);
  // }
  // console.log(filter);
  // res.send(await search(req.user, Delivery, searchTextFields, filter, defaultProjection, adminFields, lookupInfo));
  const filter = req.body.filter || {};
  if (!filter.fields) filter.fields = [];
  const result = await search(req.user, Delivery, searchTextFields, filter, defaultProjection, adminFields, lookupInfo);
  // console.log(result.data[1].sender);
  // result.data[1].sender = 0;
  // console.log(result.data[1].sender);
  for(let i=0; i < result.data.length; i++){
    let currentReceiver = result.data[i].receiver;
    let receiver = await User.findById(currentReceiver);
    let currentReceiverFirstName = receiver.profile.firstName;
    let currentReceiverLastName = receiver.profile.lastName;
    result.data[i].receiver = [currentReceiverFirstName+" "+currentReceiverLastName,receiver.profile.address[0].country,receiver.profile.address[0].city];
    
    let currentSender = result.data[i].sender;
    let sender = await User.findById(currentSender);
    let currentSenderFirstName = sender.profile.firstName;
    let currentSenderLastName = sender.profile.lastName;
    result.data[i].sender = [currentSenderFirstName+" "+currentSenderLastName,sender.profile.address[0].country,sender.profile.address[0].city];
  
  }
  res.send(result);
};

export const getFullDelivery = async (_id, reqUser) => {
  const deliveries = await Delivery.aggregate([
    { $match: { _id: { $eq: mongoose.Types.ObjectId(_id) } } },
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

  if (!deliveries) throw new ErrorResponse(errors.RECORD_NOT_FOUND);
  if (!deliveries?.[0]) throw new ErrorResponse(errors.RECORD_NOT_FOUND);

  const delivery = deliveries[0];
  return delivery;
};
