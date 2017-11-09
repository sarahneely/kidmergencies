const User = require('../models/user');

// ROUTES
module.exports = (router) => {
// ADD A NEW USER
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
