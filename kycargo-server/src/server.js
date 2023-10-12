//const { serviceWeeklyRenewCategories } = require('controllers/categoryFeature');
const express = require('express');
//import BynintuApi from 'lib/bynintu'
const config = require('./config');

const app = express();

const http = require('http').createServer(app);

config.initModules.forEach((init) => require(`./init/${init}`)(app, http));

config.middlewareModules.forEach((mw) => require(`./middleware/${mw}`)(app, http));

config.services.forEach((sc) => require(`./services/${sc}`).default(app, http));
//serviceWeeklyRenewCategories();
//const bynintuApi = new BynintuApi(process.env.BYNINTU_APIKEY, process.env.BYNINTU_SECRETKEY)
