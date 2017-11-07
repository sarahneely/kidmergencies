const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
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
mongoose.connect('mongodb://charliebrown:snoopy@ds143245.mlab.com:43245/kidmergency', (err) => {
  useMongoClient: true;
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + 'kidmergency');
  }
});
// Middleware
// app.use(cors({
//   origin: 'http://localhost:4200'
// }))

// app.use(express.static(__dirname + '/dist'));

// API ROUTING
// middleware to use for all requests
router.use(function(req, res, next) {
  console.log('using router');
  next();
});
// Test route
router.get('/', (req, res) => {
  res.json({message: 'api works!'});
});
// Prefix routes with /api
app.use('/api', router);
// Get routes from files in app/routes
app.use('/users', users);

// START THE SERVER
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
