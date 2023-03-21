const accountRoute = require('./accountRoute/accountRoute');
const tokenRoute = require('./tokenRoute/tokenRoute');
const friendRoute = require('./friendRoute/friendRoute');
const postRoute = require('./postRoute/postRoute');

module.exports = [accountRoute, tokenRoute, friendRoute, postRoute];