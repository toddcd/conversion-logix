const express = require('express');
const LocationRouter = express.Router();
const LocationService = require('./location-service')

LocationRouter
    .route('/country')
    .get((req, res, next) => {
        LocationService.getCountry()
            .then(result =>{
                res.json(result)
            })
    })

module.exports = LocationRouter;