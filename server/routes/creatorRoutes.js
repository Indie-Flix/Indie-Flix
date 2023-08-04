const express = require('express');
const app = express();
const { authenticate } = require('../config/jwt.config'); 

const creatorController = require('../controllers/CreatorController');

const auth = require('../middleware/findUser');

// CREATOR / USER ROUTE HANDLERS
module.exports = function (app) {
  // POST request to create new user and add data into mongoose
  app.post('/api/creators/register', creatorController.register, (req, res) => {
    return res.json(res.locals.register);
  });

  // POST request to authenticate user
  app.post(
    '/api/creators/login',
    auth.findCreator,
    creatorController.validateAndLogin,
    (req, res) => {
      return res.status(200).json(res.locals.responseData);
    }
  );

  // // POST request to log out the user and clear the cookie associated with the user
  app.post('/api/creators/logout', creatorController.logout, (req, res) => {
    return res.status(201).json(res.locals.logoutMessage);
  });
  
  // POST request to check if user is logged in
  app.post('/api/creators/auth', creatorController.getLoggedInCreator, (req, res) => {
    return res.status(200).json(res.locals.foundCreator);
  });
};
