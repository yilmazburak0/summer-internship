const deliveryStatus = {
  NEW: 'new',
  PREPARING: 'preparing',
  PREPARED: 'prepared',
  SHIPPED: 'shipped',
  ARRIVED: 'arrived',
  ACCEPTING: 'accepting',
  GONDER_ACCEPTED: 'gonderAccepted',
  COMPANY_ACCEPTED: 'companyAccepted',
  PACKAGING: 'packaging',
  PACKED: 'packed',
  COMPLETED: 'completed',
};

Object.freeze(deliveryStatus);
export default deliveryStatus;
