const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');

// ROUTES
module.exports = (router) => {
// REGISTER NEW USER
  router.post('/register', (req, res) => {
    if (!req.body.email) {
      res.json({ success: false, message: 'Email is required.' });
    } else {
      if (!req.body.firstName) {
        res.json({ success: false, message: 'First name is required.' });
      } else {
        if (!req.body.lastName) {
          res.json({ success: false, message: 'Last name is required.' }); 
        } else {
          if (!req.body.password) {
            res.json({ success: false, message: 'Password is required.' });
          } else {
            if (req.body.password != req.body.confirmPassword) {
              res.json({ success: false, message: 'Passwords do not match.' });
            } else {
              const user = new User({
                email: req.body.email.toLowerCase(),
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
              });
              user.save((err) => {
                if (err) {
                  if (err.code === 11000) {
                    res.json({ success: false, message: 'Email already exists.' });
                  } else {
                    if (err.errors) {
                      if (err.errors.email) {
                        res.json({ success: false, message: err.errors.email.message });
                      } else {
                        if (err.errors.password) {
                          res.json({ success: false, message: err.errors.password.message });
                        } else {
                          res.json({success: false, message: err});
                        }
                      }
                    }
                  }
                } else {
                  res.json({success: true, message: 'User saved!'});
                }
              });

            }
          }
        }
      }
    }
  });
// LOG IN
  router.post('/login', (req, res) => {
    if (!req.body.email) {
      res.json({ success: false, message: 'You did not enter an email.' });
    } else {
      if (!req.body.password) {
        res.json({ success: false, message: 'You did not enter a password.' });
      } else {
        User.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
          if (!user) {
            res.json({ success: false, message: 'User not found.' });
          } else {
            if (err) {
              res.json({ success: false, message: err });
            } else {
              const validPassword = user.comparePassword(req.body.password);
              if (!validPassword) {
                res.json({ success: false, message: 'Invalid password.' });
              } else {
                const token = jwt.sign({ userId: user._id, firstName: user.firstName }, config.secret, { expiresIn: '24h' });
                res.json({ success: true, message: 'Logged in!', token });
              }
            }
          }
        });
      }
    }
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
          console.log(req.decoded.userId);
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
      // Autofill form with existing data, req.body values CANNOT be blank or user will not save
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
router.delete('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user) {
      res.send('User not found.');
    } else if (err) {
      res.json({ success: false, message: err});
    } else {
      user.remove((err) => {
        if (err) {
          res.json({ success: false, message: "something went wrong"});
        } else {
          res.json({success: true, message: 'User deleted.'});
        }
      });
    }
  });
});
return router;
}

// SLIGHTLY MODIFIED FUNCTION TO REMOVE ALL CONTACTS
// userSchema.pre('remove', function (next) {
//   console.log('arrived to pre');
//   Contact.remove({ user: this._id }, (err, contact) => {
//     if (err) {
//       console.log("contact remove all failed");