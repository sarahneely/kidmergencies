const express = require('express');
const cors = require('cors');
// const multer = require('multer');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./models/user');
const bodyParser = require('body-parser');
// const path = require('path');
const users = require('./routes/users')(router);
const households = require('./routes/households')(router);
const contacts = require('./routes/contacts')(router);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// CONNECT TO DATABASE
mongoose.Promise = global.Promise;
mongoose.connect(config.database, (err) => {
  useMongoClient: true;
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + 'kidmergency');
  }
});
app.set('superSecret', config.secret);
// Middleware
app.use(cors({
  origin: 'http://localhost:4200'
}));

// app.use(multer({ dest: './uploads/',
//   rename: function (fieldname, filename) {
//     return filename;
//   },
//  }));

// app.use(express.static(__dirname + '/dist'));

// API ROUTING
// middleware to use for all requests

app.use(function(req, res, next) {
  console.log('using router');
  next();
});

// Test route
router.get('/', function(req, res) {
  res.json({message: 'api works!'});
});

// Prefix routes with /api
app.use('/api', router);

// Get routes from files in app/routes
app.use('/users', users);
app.use('/households', households);
app.use('/contacts', contacts);

// START THE SERVER
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
