
var chai = require('chai');
var expect = chai.expect;

const jsdom = require('jsdom/lib/old-api.js');
const virtualConsole = jsdom.createVirtualConsole().sendTo(console);

describe('App plain-text', function () {
  var app, server;

  var $ = function (selector) {
    return window.document.querySelector(selector);
  };
  var trigger = function (el, ev) {
    var e = window.document.createEvent('UIEvents');
    e.initEvent(ev, true, true);
    el.dispatchEvent(e);
  };

  before(function (done) {
    app = require('../app');
    let port = app.get('port') + 11;
    server = app.listen(port);
    jsdom.env({
      virtualConsole,
      runScripts: 'dangerously',
      url: `http://localhost:${port}/plain-text`,
      features: {
        FetchExternalResources: ['script'],
        ProcessExternalResources: ['script']
      },
      done: function (errors, window) {
        if (errors != null) return done(errors);
        global.window = window;
        global.document = window.document;
        done();
      }
    });
  });

  it('loadjs works', function () {
    let saveBtn = $('#save');
    let loadBtn = $('#load');
    let ta = $('textarea');
    ta.value = 'xxx';
    expect(ta.value).to.equal('xxx');

    trigger(saveBtn, 'click');
    expect(ta.value).to.equal('xxx');

    ta.value = 'yyy';
    expect(ta.value).to.equal('yyy');

    trigger(loadBtn, 'click');
    expect(ta.value).to.equal('xxx');
  });

  after(function () {
    server.close();
  });
});
