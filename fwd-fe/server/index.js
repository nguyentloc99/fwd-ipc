process.env.NODE_ENV = process.env.NODE_ENV || process.argv[2] || 'production';

exports = module.exports = require('./app');
