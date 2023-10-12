export const BBControlStatus = {
  OK: 'OK',
  MISSING_PRODUCT: 'missingProduct', // listede var ama ürün gelmemiş
  DAMAGED_PRODUCT: 'damagedProduct',
  IN_ORDER_BUT_NOT_RETURN: 'inOrderButNotReturn',
  EXTRA_PRODUCT: 'wrongProduct',
};

export const CompanyControlStatus = {
  ADD_TO_STOCK: 'addToStock',
  SEND_CUSTOMER: 'sendCustomer',
  EXTERMINATION: 'extermination',
  SEND_TO_COMPANY: 'sendToCompany',
};

export const returnStatus = {
  NEW: 'new',
  ACCEPTING: 'accepting',
  BLENDED_ACCEPTED: 'blendedAccepted',
  COMPANY_ANSWERED: 'companyAnswered',
  COMPLETED: 'completed',
};

Object.freeze(BBControlStatus);
Object.freeze(CompanyControlStatus);
Object.freeze(returnStatus);
