const {wapiRoutes, apiRoutes, env} = require('../config');
const path = require('path');

module.exports = (app) => {
  const {API_PREFIX, WAPI_PREFIX, PUBLIC_FOLDER} = env;
  const API_ROUTE_PREFIX = '../routes/api';
  const WAPI_ROUTE_PREFIX = '../routes/wapi';
  const buildPath = path.join(__dirname, PUBLIC_FOLDER, 'index.html');

  let routeUrl, routeModule;

  for (const routeName of wapiRoutes) {
    routeUrl = `${WAPI_PREFIX}/${routeName}`;
    console.log('WAPI_ROUTE_PREFIX', `${WAPI_ROUTE_PREFIX}/${routeName}`);
    routeModule = require(`${WAPI_ROUTE_PREFIX}/${routeName}`).default;
    app.use(routeUrl, routeModule);
  }

  for (const routeName of apiRoutes) {
    routeUrl = `${API_PREFIX}/${routeName}`;
    console.log('API_ROUTE_PREFIX', `${API_ROUTE_PREFIX}/${routeName}`);
    routeModule = require(`${API_ROUTE_PREFIX}/${routeName}`).default;
    app.use(routeUrl, routeModule);
  }

  console.log('build folder:', buildPath);
  app.get('/*', function (req, res) {
    res.sendFile(buildPath);
  });
};
