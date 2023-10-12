const VehicleType = {
  SHIP: 'ship',
  MINIVAN: 'minivan',
  TRUCK: 'truck',
};

const VehicleStatus = {
  ACTIVE: 'active',
  PASSIVE: 'passive',
  REPAIR: 'repair',
};

Object.freeze(VehicleType);
Object.freeze(VehicleStatus);

export { VehicleStatus, VehicleType };
