import ErrorResponse from 'helpers/errorResponse';
import errors from './errors';

const companyStatus = {
  ACTIVE: 'active',
  PASSIVE: 'passive',
};

Object.freeze(companyStatus);
export const validateCompanyStatus = (status) => {
  const statusArray = Object.keys(companyStatus).map((el) => companyStatus[el]);
  if (statusArray.indexOf(status) == -1) {
    let errorMessage = ' Company.status must be ';
    for (let i = 0; i < statusArray.length; i++) errorMessage += statusArray[i] + (i == statusArray.length - 1 ? '.' : ' or ');
    throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, errorMessage);
  }
};
export default companyStatus;
