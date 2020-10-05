const express = require('express');
const BigmacRouter = express.Router();
const BigmacService = require('./bigmac-service')

BigmacRouter
    .route('/pricing')
    .get((req, res, next) => {
        BigmacService.getPricing()
            .then(result => {
                res.json(result)
            }
        )
    })

module.exports = BigmacRouter;