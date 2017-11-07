const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const path = require('path');
const users = require('./routes/users')(router);
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;


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
app.use(cors({
  origin: 'http://localhost:4200'
}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist'));

app.get("/api/users", (req, res) => {
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

app.post("api/users/new", (req, res) => {
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

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
