const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

module.exports = {
  authenticate(req, res, next) {
    jwt.verify(
      req.cookies.usertoken,
      process.env.JWT_SECRET,
      (err, payload) => {
        if (err) {
          console.log('Error verifying JWT: ', err);
          res.status(401).json({ verified: false });
        } else {
          req.jwtpayload = payload;

          next();
        }
      }
    );
  },
};
