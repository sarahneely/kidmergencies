const User = require('../models/user');

module.exports = (router) => {
  router.post('/newUser', (req, res) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      // address: [{
      //   streetAddress: req.body.streetAddress,
      //   aptNumber: req.body.aptNumber,
      //   city: req.body.city,
      //   state: req.body.state,
      //   zip: req.body.zip
      // }],
    });
    user.save((err) => {
      if (err) {
        res.json({success: false, message: err.errmsg});
      } else {
        res.json({success: true, message: 'User saved!'});
        }
      });
    });

  router.get('/allUsers', (req, res) => {
    User.find({}, (err, blogs) => {
      if (err) {
        res.json({success: false, message: err});
      } else {
        if (!users) {
          res.json({success: false, message: 'No users found.'});
        } else {
          res.json({success: true, users: users});
        }
      }
    })
  });
  return router;
}
