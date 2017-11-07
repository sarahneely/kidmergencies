const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const bodyParser = require('body-parser');
// const path = require('path');
// const users = require('./routes/users')(router);
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
const router = express.Router();
// middleware to use for all requests
router.use(function(req, res, next) {
  console.log('using router');
  next();
});

// Test route
router.get('/', function(req, res) {
  res.json({message: 'api works!'});
});

// ROUTES
router.post('/users', (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  user.save((err) => {
    if (err) {
      res.json({success: false, message: err.errmsg});
    } else {
      res.json({success: true, message: 'User saved!'});
    }
  });
});

router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.json({success: false, message: err});
    } else {
      if (!users) {
        res.json({success: false, message: 'No users found.'});
      } else {
        res.json(users);
      }
    }
  })
});

app.use('/api', router);


app.post("api/users/new", (req, res) => {
  });

// START THE SERVER
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
