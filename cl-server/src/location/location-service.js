const fetch = require('node-fetch');

const LocationService = {
    getCountry() {
        return fetch('http://api.ipify.org?format=json')
            .then(res =>{
                return res.json()
            })
            .then(result =>{
                //return  fetch(`https://ipvigilante.com/json/${result.ip}`)
                return fetch(`http://ip-api.com/json/${result.ip}`)
            })
            .then(res => {
                return res.json()
            })
    },
};

module.exports = LocationService;
