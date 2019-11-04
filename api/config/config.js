  
var config = require('./config.json');

var env = process.env.NODE_ENV || 'development'; // check env.
var envConfig = config[env]; // fetch env. config
Object.keys(envConfig).forEach(function(key) { // add env. config values to process.env
  process.env[key] = envConfig[key]
});