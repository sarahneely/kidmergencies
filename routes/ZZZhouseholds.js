const Household = require('../models/household');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (router) => {
    router.get('/households', (req, res) => {
        Household.find({}, (err, households) => {
            if (!households) {
                res.json({ success: false, message: 'No households found.' });
            } else {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    res.json(households);
                }
            }
        });
    });
    return router;  
}