const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Creator = require('../models/creatorModel');

const creatorController = {
  // Adds new creator to database - POST request to '/api/creators/register'
  register: async (req, res, next) => {
    try {
      // Sanitize information in request body
      const { username, email, password, studio, confirmPassword } = req.body;
      // Create new creator in database from sanitized request body
      const creator = new Creator({ username, email, password, studio, confirmPassword });
      // Save new creator to database
      const newCreator = await creator.save();

      // Attach to res.locals to return to frontend with creator information from database
      res.locals.register = {
        successMessage: 'Thanks for registering.',
        creator: newCreator,
      };

      return next();
    } catch (err) {
      return next({
        log: `CreatorController.register failed to register new creator: ERROR: ${err.message}.`,
        status: 500,
        message: { err: 'Failed to register new creator.' },
      });
    }
  },

  // Validates creator login and signs JWT token - POST to '/api/creators/login'
  validateAndLogin: async (req, res, next) => {
    try {
      // Bcrpyt compares creator password input against database record
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        req.creatorRecord.password
      );

      // If creator enters wrong password, return error object to global error handler
      if (!isPasswordValid) {
        return next({
          log: 'Invalid creator login attempt.',
          status: 401,
          message: { err: 'Invalid login attempt.' },
        });
      }

      // Signs JWT token using secret key stored in .env
      const token = jwt.sign(
        {
          id: req.creatorRecord._id,
          email: req.creatorRecord.email,
          creatorName: req.creatorRecord.username,
        },
        process.env.JWT_SECRET
      );

      // Adds cookie to creator browser with signed JWT token
      res.cookie('usertoken', token, {
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        expires: new Date(Date.now() + 9000000),
      });

      // Attaches creator username, studio, and id to res.locals to return to frontend
      res.locals.responseData = {
        message: 'Successfully logged in.',
        creatorLoggedIn: req.creatorRecord.username,
        studioName: req.creatorRecord.studio,
        creatorId: req.creatorRecord._id,
      };

      return next();
    } catch (err) {
      // catch to handle errors
      return next({
        log: `CreatorController.validateAndLogin failed to login creator: ERROR: ${err.message}.`,
        status: 500,
        message: { err: 'Failed to login creator.' },
      });
    }
  },

  // Logs user out and clears cookie with JWT - POST to '/api/creators/logout/'
  logout: async (req, res, next) => {
    try {
      // the clearCookie method is invoked and the 'usertoken' cookie will be erased
      res.clearCookie('usertoken');
      // a message is stored in the res.locals object and will be sent as a response in the creatorRoutes file
      res.locals.logoutMessage = {
        message: 'You have successfully been logged out.',
      };

      return next();
    } catch (err) {
      return next({
        log: `CreatorController.logout failed to log out creator: ERROR: ${err.message}.`,
        status: 500,
        message: { err: 'Failed to log out creator.' },
      });
    }
  },

  // retrieves information of the logged in creator
  getLoggedInCreator: async (req, res, next) => {
    try {
      // invoking the jwt.decode method to decode the 'usertoken' cookie, which allows the user to access the token information
      const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
      // finds and assigns the Creator model document associated with the _id of the usertoken to the creator variable
      const creator = await Creator.findOne({ _id: decodedJWT.payload.id });
      // assigns the creator document to the res.locals.foundCreator property so that it can be sent as a response in creatorRoutes
      res.locals.foundCreator = creator;

      return next();
    } catch (err) {
      return next({
        log: `CreatorController.getLoggedInCreator failed to find creator: ERROR: ${err.message}.`,
        status: 500,
        message: { err: 'Failed to get logged in creator.' },
      });
    }
  },
};

module.exports = creatorController;
