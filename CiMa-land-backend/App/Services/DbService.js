const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../knexfile.js')[environment];
const dbService = require('knex')(config);
module.exports = dbService;