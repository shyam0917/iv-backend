require('dotenv').config({path: '.env'});
var env = process.env.ENV || 'development';
var config = module.exports = require('./projconfig.js').data;
config.env = env;