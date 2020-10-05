const expressApp = require('../src/express-app');
const { expect } = require('chai')
const supertest = require('supertest')
const pricingMockResult = require('./data.js')

describe('App', () => {
    it('GET / responds with 200 containing "Hello, from the conversion-logix api!"', () => {
        return supertest(expressApp)
            .get('/')
            .expect(200, 'Hello, from the conversion-logix api!')
    });
    it('GET / responds with 200 containing object with countries big mac pricing', () => {
        return supertest(expressApp)
            .get('/api/bigmac/pricing')
            .expect(200, pricingMockResult)
    });
});