import mkdirp from 'mkdirp';
import fs from 'fs';
import shortid from 'shortid';
import {customAlphabet} from 'nanoid';

export function isEmptyValue(value) {
  return (
    value === undefined ||
    value === 'undefined' ||
    value === null ||
    value === 'null' ||
    value === NaN ||
    value === 'NaN' ||
    value === '' ||
    value === '' ||
    value === '{}' ||
    value === '[]' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
}

export function mergeArrayField(array1, array2, f1, f2 = []) {
  array1.map((val) => {
    const found = array2.find((x) => x[f1] === val[f1]);
    found && f2.map((v) => (val[v] = found[v]));
    return val;
  });
}

export function mergeObjectFields(obj1, obj2, keys = []) {
  keys.map((key) => {
    !isEmptyValue(obj2[key]) && (obj1[key] = obj2[key]);
  });
  return obj1;
}
export function createTempFolder() {
  var tempFolder = 'temp-' + Math.round(Math.random() * 15002548102);
  var dir = 'src//downloadedPdfs//' + tempFolder;

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }

  return dir;
}
export function generateFileName(userId = '') {
  return userId + '_' + Date.now() + '_' + shortid.generate();
}

export function sortObjectByPropertieName(data) {
  return Object.keys(data)
    .sort()
    .reduce((acc, currValue) => {
      acc[currValue] = data[currValue];
      return acc;
    }, {});
}
export function changeTimeForFilter(date, isStart) {
  var d = new Date(date);
  if (isStart) {
    var utc = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - 1, 20, 59, 59, 999);
    return new Date(utc);
  } else {
    var utc = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 20, 59, 59, 999);
    return new Date(utc);
  }
}

export function getAsArray(json) {
  return Object.keys(json).map((el) => json[el]);
}

export function generateCode(prefix, customerCode, length = 5) {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nanoid = customAlphabet(alphabet, length);
  return `${prefix}${customerCode}${nanoid()}`;
}
