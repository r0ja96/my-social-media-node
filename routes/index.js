const accountRoute = require('./accountRoute/accountRoute');
const tokenRoute = require('./tokenRoute/tokenRoute');
const friendRoute = require('./friendRoute/friendRoute');
const postRoute = require('./postRoute/postRoute');
const imageRoute = require('./imageRoute/imageRoute');

module.exports = [accountRoute, tokenRoute, friendRoute, postRoute, imageRoute];