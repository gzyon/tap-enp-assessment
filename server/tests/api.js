process.env.NODE_ENV = 'test';

const server = require('../index');
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
var expect = chai.expect;

describe('Testing express app routes', () => {
    describe('Shorten URL API', () => { 
        it('shortens URL successfully',  (done) => {
            let url = {longURL: "https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/"}
            chai.request(server).get('/api/shorten')
            .query(url)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.string;
                done();
            });
        });
     });

     describe('Redirecting Shortened URL', () => { 
        it('redirects shortened url successfully',  (done) => {
            chai.request(server).get('/abc123')
            .end((err, res) => {
                expect(res).to.have.status(302);
                done();
            })
        });
    });
});
