
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

describe('App', function () {
  var app, server, request;

  before(function () {
    app = require('../app');
    request = chai.request(app);
    server = app.listen(app.get('port') + 10);
  });

  describe('/set?somekey=somevalue', function () {
    it('responds with status 200', function (done) {
      request
        .post('/set?somekey=somevalue')
        .end(function (err, res) {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('/get', function () {
    it('responds with status 200', function (done) {
      request
        .post('/set?somekey=somevalue')
        .then(function () {
          request
            .get('/get?key=somekey')
            .end(function (err, res) {
              expect(err).to.equal(null);
              expect(res).to.have.status(200);
              expect(res.text).to.equal('somevalue');
              done();
            });
        });
    });
  });

  after(function () {
    server.close();
  });
});
