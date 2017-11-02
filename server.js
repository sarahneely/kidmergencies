const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const path = require('path');
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

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
