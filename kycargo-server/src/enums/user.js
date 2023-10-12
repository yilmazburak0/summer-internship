//first value is default value
export const userRole = {
  MASTER_ADMIN: 'masterAdmin',//CRM'i kullanacak kişi
  ADMIN: 'admin',
  CUSTOMER: 'customer',//kargo gönderen veya alan kişi //bir
  COMPANY_ADMIN: 'companyAdmin',//Kargo firmasının ilk kullanıcı
  COMPANY_CUSTOMER: 'companyCustomer',
  BRANCH_ADMIN: 'branchAdmin',//Kargo firmansının şubesinin ilk kullanıcısı
  BRANCH_WORKER: 'branchWorker',//şube çalışanı
  WAREHOUSE_WORKER: 'warehouseWorker',
  PRODUCT_ANALYST: 'productAnalyst',
  PRODUCT_ANALYST_MANAGER: 'productAnalystManager',
  DEVELOPER: 'developer',
  COMPANY_OWNER: 'companyOwner',
  COMPANY_USER: 'companyUser',
  API_USER: 'apiUser', //???
  ACCOUNTANT: 'accountant',
};

Object.freeze(userRole);
