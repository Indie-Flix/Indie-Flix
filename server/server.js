require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('./config/mongoose.config');


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));


app.use(express.static(path.join(__dirname, '../dist')));

// require routers
require('./routes/creatorRoutes')(app);
require('./routes/videoRoutes')(app);

// Local error handler
app.use((req, res) =>
  res.status(404).send('This is not the page you\'re looking for...')
);


// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
