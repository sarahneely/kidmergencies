const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

// ROUTES
module.exports = (router) => {
// REGISTER NEW USER
  router.post('/register', (req, res) => {
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
// LOG IN
  router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
      if (user) {
        if (user.password != req.body.password) {
          res.json({success: false, message: 'Invalid password.'});
        } else {
          const token = jwt.sign({ userId: user._id, firstName: user.firstName }, config.secret, { expiresIn: '24h' });
          console.log(token);
          res.json({success: true, message: 'Logged in!'});
        }
      } else {
        if (!user) {
          res.json({ success: false, message: 'User not found.' });
        } else {
          res.json({ success: false, message: err });
        }
      }
    });
  });
// GET ALL USERS
  router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
      if (!users) {
        res.json({success: false, message: 'No users found.'});
      } else {
        if (err) {
          res.json({success: false, message: err});
        } else {
          res.json(users);
        }
      }
    })
  });
  // Middleware. Routes that use middleware will come after this function.
  router.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send({ success: false, message: 'No token provided.' });
    } else {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          res.json({ success: false, message: 'Token invalid: ' + err });
        } else {
          req.decoded = decoded;
          // console.log(req.decoded.firstName);
          next();
        }
      });
    }
  });
// GET ONE USER
  router.get('/users/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (!user) {
        res.send('User not found.');
      } else {
        if (err) {
          res.json({success: false, message: err.errmsg});
        } else {
          res.json(user);
        }
      }
    });
  });
// EDIT A USER
router.put('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user) {
      res.send('User not found.');
    } else if (err) {
      res.json({success: false, message: err});
    } else {
      // Autofill form with existing date, req.body values CANNOT be blank or user will not save
      user.email = req.body.email;
      user.password = req.body.password;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.save((err) => {
        if (err) {
          res.json({success: false, message: err});
        } else {
          res.json({success: true, message: 'User updated!'});
        }
      });
    }
  });
});
// DELETE A USER
// ToDo: Add 'pre' to remove contacts, household and history(?) for user before deleting user.
router.delete('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user) {
      res.send('User not found.');
    } else if (err) {
      res.json({success: false, message: err});
    } else {
      user.remove((err) => {
        if (err) {
          res.json({success: false, message: err});
        } else {
          res.json({success: true, message: 'User deleted.'});
        }
      });
    }
  });
});
return router;
}
