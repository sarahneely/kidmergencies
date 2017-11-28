const Contact = require('../models/contact');
const jwt = require('jsonwebtoken');
const config = require('../config');

// ROUTES
module.exports = (router) => {
    // Middleware. Routes that use middlware will come after this function.
    router.use((req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).send({ success: false, message: 'No tken provided.' });
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
    // ADD A NEW CONTACT
    router.post('/contacts', (req, res) => {
        if (!req.body.phone) {
            res.json({ success: false, message: 'Phone number is required.' });
        } else {
            if (!req.body.firstName) {
                res.json({ success: false, message: 'First name is required.' });
            } else {
                if (!req.body.lastName) {
                    res.json({ success: false, message: 'Last name is required.' });
                } else {
                    if (!req.body.relationship) {
                        res.json({ succes: false, message: 'Relationship to family is required.' });
                    } else {
                        if (!req.body.image) {
                            res.json({ success: false, message: 'An image of this person is required.' });
                        } else {
                            const contact = new Contact({
                                user: req.decoded.userId,
                                phone: req.body.phone,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                relationship: req.body.relationship,
                                image: req.body.image,
                            });
                            contact.save((err) => {
                                if (err) {
                                    if (err.errors) {
                                        if (err.errors.phone) {
                                            res.json({ success: false, message: err.errors.phone.message });
                                        } else {
                                            if (err.errors.firstName) {
                                                res.json({ success: false, message: err.errors.firstName.message });
                                            } else {
                                                if (err.errors.lastName) {
                                                    res.json({ success: false, message: err.errors.lastName.message });
                                                } else {
                                                    if (err.errors.relationship) {
                                                        res.json({ success: false, message: err.errors.relationship.message });
                                                    } else {
                                                        if (err.errors.image) {
                                                            res.json({ success: false, message: err.errors.image.message });
                                                        } else {
                                                            res.json({ success: false, message: err });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    res.json({ success: true, message: 'Contact saved!' });
                                }
                            });
                        }
                    }
                }
            }
        }
    });
    // GET ALL CONTACTS
    router.get('/contacts', (req, res) => {
        Contact.find({ }, (err, contacts) => {
            if (!contacts) {
                res.json({ success: false, message: 'No contacts were found.' });
            } else {
                res.json(contacts);
            }
        })
    });
    // GET ONE CONTACT
    router.get('/contacts/:id', (req, res) => {
        Contact.findById(req.params.id, (err, contact) => {
            if (!contact) {
                res.send('Contact not found.');
            } else {
                if (err) {
                    res.json({ success: false, message: err.errmsg });
                } else {
                    res.json(contact);
                }
            }
        });
    });
    // EDIT A CONTACT
    router.put('/contacts/:id', (req, res) => {
        Contact.findById(req.params.id, (err, contact) => {
            if (!contact) {
                res.send('Contact not found.');
            } else {
                if (err) {
                    res.json({ success: false, message: err.errmsg });
                } else {
                    // Autofill form with existing data, req.body values CANNOT be blank or user will not save
                    contact.phone = req.body.phone;
                    contact.firstName = req.body.firstName;
                    contact.lastName = req.body.lastName;
                    contact.relationship = req.body.relationship;
                    contact.image = req.body.image;
                    contact.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err.errmsg });
                        } else {
                            res.json({ success: true, message: 'Contact information updated.' });
                        }
                    });
                }
            }
        });
    });
    // DELETE A CONTACT
    router.delete('/contacts/:id', (req, res) => {
        Contact.findById(req.params.id, (err, contact) => {
            if (!contact) {
                res.send('Contact not found.');
            } else if (err) {
                res.json({ success: false, message: err });
            } else {
                contact.remove((err) => {
                    if (err) {
                        res.json({ success: false, message: 'Something didn\'t work.' });
                    } else {
                        res.json({ success: true, message: 'Contact deleted.' });
                    }
                });
            }
        });
    });
return router;    
}