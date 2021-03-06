const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./models/user');
const bodyParser = require('body-parser');
// const path = require('path');
const users = require('./routes/users')(router);
// const cors = require('cors');

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
// app.use(cors({
//   origin: 'http://localhost:4200'
// }))

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
// Get routes from files in app/routes
app.use('/users', users);
// Prefix routes with /api
app.use('/api', router);

// START THE SERVER
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
