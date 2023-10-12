import errors from 'enums/errors';
import {userRole} from 'enums/user';
import {insertDocument, updateDocumentOne} from 'helpers/database';
import ErrorResponse from 'helpers/errorResponse';
import {search} from 'helpers/filterParser';


const searchTextFields = ['company.name', 'invoiceNumber', 'barcode'];
const adminFields = [];

const lookupInfo = [
  {
    from: 'companies',
    localField: 'companyId',
    foreignField: '_id',
    as: 'company',
    isSingle: true,
  },
  {
    from: 'products',
    localField: 'barcode',
    foreignField: 'barcode',
    as: 'product',
    isSingle: true,
  },
];

const defaultProjection = [
  'shortId',
  'companyId',
  'company.name',
  'invoiceNumber',
  'product',
  'barcode',
  'contractPrice',
  'date',
  'createdAt',
  'modifiedAt',
  ...adminFields,
];

export const createItems = async (req, res) => {
  let {product} = req.body.product;

  const stock = await Product.findOne({barcode: product.barcode}).lean();

  if (!stock) throw ErrorResponse(errors.RECORD_NOT_FOUND, 'product not found');

  const deliveryInvoice = await DeliveryInvoice.findOne({
    'products.barcode': product.barcode,
    $expr: {$gt: ['$products.acceptedQuantity', '$products.soldQuantity']},
  }).lean();
  if (!deliveryInvoice) throw ErrorResponse(errors.RECORD_NOT_FOUND, 'contract not found');

  const contractProduct = deliveryInvoice.products.find((el) => el.barcode === product.barcode);

  product.companyId = stock.companyId;

  let productQuantity = 0;
  switch (product.type) {
    case 'sale':
      product.contractPrice = contractProduct.buyingPrice;
      productQuantity = -1 * product.quantity;
      break;
    case 'saleCancel':
      product.contractPrice = -1 * contractProduct.buyingPrice;
      productQuantity = product.quantity;

      break;
    case 'return':
      product.contractPrice = -1 * contractProduct.buyingPrice;
      productQuantity = product.quantity;
      break;
    case 'damaged':
      product.contractPrice = -1 * contractProduct.buyingPrice;
      productQuantity = 0 * product.quantity;

      break;
    default:
      product.contractPrice = contractProduct.buyingPrice;
      productQuantity = product.quantity;

      break;
  }

  const result = await insertDocument(TbInvoice, null, {product});

  await updateDocumentOne(
    DeliveryInvoice,
    null,
    {_id: deliveryInvoice._id, 'products.$.barcode': product.barcode},
    {$inc: {'product.soldQuantity': productQuantity}}
  );

  res.send(result);
};

export const searchTbInvoice = async (req, res) => {
  const filter = req.body.filter || {};
  if (!filter.fields) filter.fields = [];

  switch (req.user.role) {
    case userRole.ADMIN:
    case userRole.DEVELOPER:
    case userRole.PRODUCT_ANALYST_MANAGER:
      break;
    case userRole.COMPANY_OWNER:
    case userRole.COMPANY_USER:
      filter.fields.push({condition: 'equal', value: req.user.companyId, dataField: 'companyId'});
      break;
    // case userRole.API_USER:
    //   filter.fields.push({condition: 'equal', value: req.user.companyId, dataField: 'companyId'});
    //   break;
    default:
      throw new ErrorResponse(errors.UN_AUTHORIZED);
  }

  res.send(await search(req.user, TbInvoice, searchTextFields, filter, defaultProjection, adminFields, lookupInfo));
};
