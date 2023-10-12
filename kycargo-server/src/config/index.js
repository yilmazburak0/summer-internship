const path = require('path');

module.exports.initModules = ['environment', 'asyncWrapper', 'database', 'listen'];

module.exports.middlewareModules = [/*'helmet',*/ 'language', 'express', 'cors', 'routes', /*'logging',*/ 'error', /*'socket'*/];

module.exports.wapiRoutes = [
  'account',
  'user',
  'country',
  'error',
  'warehouse',
  'delivery',
  'package',
  'menu',
  'imageApi',
  'vehicles',
  'company',
  'product',
  'transport'
];
module.exports.apiRoutes = [];
module.exports.services = [/*'category','payment'*/];

module.exports.supportedLanguages = ['tr', 'en', 'zn', 'de', 'nl'];
module.exports.defaultLanguage = 'tr';
module.exports.LanguagesAndCodes = {
  'tr': { name: 'Tükçe', code: 'tr', languageId: 1 },
  'en': { name: 'English', code: 'en', languageId: 2 },
  'de': { name: 'Deutsch', code: 'de', languageId: 3 },
  'nl': { name: 'Nederlands', code: 'nl', languageId: 4 }
};

module.exports.folders = {
  root: path.join(__dirname, '..'),
};

module.exports.excludedPhones = ['+905302378814', '+905373112917'];

module.exports.env = process.env;
