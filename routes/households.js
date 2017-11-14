const Household = require('../models/household');
const jwt = require('jsonwebtoken');
const config = require('../config');

// ROUTES
module.exports = (router) => {
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
                    next();
                }
            });
        }
    });
// GET ALL HOUSEHOLDS
    router.get('/households', (req, res) => {
        Household.find({}, (err, households) => {
            if (!households) {
                res.json({ success: false, message: 'No households were found.' });
            } else {
                res.json(households);
            }
        });
    });
// ADD A NEW HOUSEHOLD
    router.post('/households', (req, res) => {
        if (!req.body.phone) {
            res.json({ success: false, message: 'Phone number is required' });
        } else {
            if (!req.body.streetAddress) {
                res.json({ success: false, message: 'Address is required' }); 
            } else {
                if (!req.body.city) {
                    res.json({ success: false, message: 'City is required' });
                } else {
                    if (!req.body.state) {
                        res.json({ success: false, message: 'State is required' });
                    } else {
                        if (!req.body.zip) {
                            res.json({ success: false, message: 'Zip code is required' });
                        } else {
                            const household = new Household({
                                user: req.decoded.userId,
                                phone: req.body.phone,
                                address: {
                                    streetAddress: req.body.streetAddress,
                                    aptNumber: req.body.aptNumber,
                                    city: req.body.city,
                                    state: req.body.state,
                                    zip: req.body.zip
                                }
                            });
                            household.save((err) => {
                                if (err) {
                                    if (err.code === 11000) {
                                        res.json({ success: false, message: 'Household already exists.' });  
                                    } else {
                                        if (err.errors) {
                                            if (err.errors.phone) {
                                                res.json({ success: false, message: err.errors.phone.message });
                                            } else {
                                                if (err.errors.streetAddress) {
                                                    res.json({ success: false, message: err.errors.streetAddress.message });
                                                } else {
                                                    if (err.errors.city) {
                                                        res.json({ success: false, message: err.errors.city.message });
                                                    } else {
                                                        if (err.errors.zip) {
                                                            res.json({ success: false, message: err.errors.zip.message });
                                                        } else {
                                                            res.json({ success: false, message: err });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    res.json({ success: true, message: 'Household info saved!' });
                                }
                            });
                        }
                    }
                }
            }
        }
    });
// EDIT A HOUSEHOLD
    router.put('/households/:id', (req, res) => {
        Household.findById(req.params.id, (err, household) => {
            if (!household) {
                res.send('Househld not found.');
            } else {
                if (err) {
                    res.json({ success: false, message: err.errmsg });  
                } else {
                    // Autofill form with existing data, req.body values CANNOT be blank or user will not save
                    household.phone = req.body.phone;
                    household.address = {
                        streetAddress: req.body.streetAddress,
                        aptNumber: req.body.aptNumber,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip
                    };
                    household.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err }); 
                        } else {
                            res.json({ success: true, message: 'Household updated!' });
                        }
                    });
                }
            }
        });
    });
    return router;
}