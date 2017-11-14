const Contact = require('../models/contact');
const jwt = require('jsonwebtoken');
const config = require('../config');

// ROUTES
module.exports = (router) => {
// CREATE CONTACT
    router.post('/familycontacts', (req, res) => {
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
                            res.json({ success: false, message: 'An image of this person is required.' })
                        }
                    }
                }
            }
        }
    })
return router;    
}