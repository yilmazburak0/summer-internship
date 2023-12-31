export const errorPriorities = {
  Fatal: 5,
  High: 4,
  Medium: 3,
  Low: 2,
};

const errors = {
  WRONG_PASSWORD: {
    code: 1001,
    message: 'Wrong Password.',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  UN_AUTHORIZED: {
    code: 1002,
    message: 'un authorized user.',
    statusCode: 400,
    priority: errorPriorities.High,
  },
  DUPLICATION: {
    code: 1003,
    message: 'Duplicate field value entered',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  CAST_ERROR: {
    code: 1004,
    message: 'Resource not found',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  VALIDATION_ERROR: {
    code: 1005,
    message: 'ValidationError',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  EMAIL_EXIST: {
    code: 1006,
    message: 'Email already exists',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  PASSAPORT_EXIST: {
    code: 1006,
    message: 'Passaport already exists',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  USER_NOT_ACTIVE: {
    code: 1006,
    message: 'User is not active',
    statusCode: 401,
    priority: errorPriorities.Low,
  },
  ITEMS_NOT_VALID: {
    code: 1007,
    message: 'Must be at least 1 item',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  ITEMS_NOT_ARRAY: {
    code: 1008,
    message: 'Items must be Array',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  INVALID_OR_MISSING_PROPERTY: {
    code: 1009,
    message: 'Invalid or missing property : ',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  RECORD_NOT_FOUND: {
    code: 1010,
    message: 'Record not found.',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  PRODUCT_COLLECTED: {
    code: 1011,
    message: 'Product already collected.',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  STOCK_CODE_EXIST: {
    code: 1012,
    message: 'Stock code must be unique.',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  RECORD_APPROVED: {
    code: 1013,
    message: 'Record already approved.',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  STOCK_NOT_FOUND: {
    code: 1014,
    message: 'Stock not found.',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  STOCK_NOT_ENOUGH: {
    code: 1015,
    message: 'Stock not enough.',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  INTERNAL_MAIN_ERROR: {
    code: 1016,
    message: 'Internal main error.',
    statusCode: 400,
    priority: errorPriorities.High,
  },
  WRONG_BLENDED_RETURN_BARCODE: {
    code: 1017,
    message: 'Blended return barcode is wrong.',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  WRONG_RACK: {
    code: 1018,
    message: 'Wrong rack.',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  WRONG_STOCK: {
    code: 1019,
    message: 'Wrong stock.',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  ORDER_STATUS_INVALID: {
    code: 1020,
    message: 'Order Status Invalid.',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  ORDER_NOT_PREPARED: {
    code: 1021,
    message: 'Order is not ready to shipping.',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  RETURN_STATUS_INVALID: {
    code: 1022,
    message: 'Return status invalid.',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  RACK_BARCODE_EXIST: {
    code: 1023,
    message: 'Rack barcode already exist.',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  INVALID_COMPANY: {
    code: 1024,
    message: 'Company of user is invalid.',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  RACK_HAS_PRODUCT: {
    code: 1023,
    message: 'Rack Has product.',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  RETURN_ALREADY_ACCEPTED: {
    code: 1024,
    message: 'Return already accepted',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  WRONG_STATUS: {
    code: 1025,
    message: 'wrong status',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  CAN_NOT_COMPLETE_RETURN: {
    code: 1026,
    message: 'You can not complete this return',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  CAN_NOT_SAVE_RETURN: {
    code: 1027,
    message: 'You can not save this return',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  RETURN_ALREADY_COMPLETED: {
    code: 1028,
    message: 'This return already completed',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  API_USER_CREATED: {
    code: 1029,
    message: 'Api user already created',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  CANNOT_DELETE: {
    code: 1030,
    message: 'Record can not delete.',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  DELIVERY_ALREADY_ACCEPTED: {
    code: 1031,
    message: 'Delivery already accepted',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  PRODUCT_ALREADY_ADDED: {
    code: 1031,
    message: 'Product already added',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  CONTRACT_FOR_FUTURE: {
    code: 1032,
    message: 'Contract start day arrange for future',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  CONTRACT_FOR_PAST: {
    code: 1033,
    message: 'Contract end day arrange for past',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  PRICE_NOT_ZERO: {
    code: 1034,
    message: 'Price must be greater than zero',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  COMPANY_HAS_ACTIVE_CONTRACT: {
    code: 1035,
    message: 'Company has already active contract',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  LOAD_INVOICE_DOC: {
    code: 1036,
    message: 'Invoice document must be loaded',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  PRODUCT_PACKED: {
    code: 1037,
    message: 'Product packed',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  ALREADY_ACTIVATED: {
    code: 1038,
    message: 'Already Activated',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  CONTRACT_DATE_ERROR: {
    code: 1039,
    message: 'Contract start date must be lower than end date',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  PACKAGE_ALREADY_ADDED: {
    code: 1040,
    message: 'Package already added.',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  WRONG_FILE_EXTENSION: {
    code: 1041,
    message: 'wrong file extension',
    statusCode: 400,
    priority: errorPriorities.Low,
  },
  TOKEN_NOT_VALID: {
    code: 1042,
    message: 'Failed to verify token',
    statusCode: 400,
    priority: errorPriorities.High,
  },
};
Object.freeze(errors);
Object.freeze(errorPriorities);

export default errors;
