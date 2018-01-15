var chai = require('chai')
var expect = chai.expect

var jsdom = require('jsdom/lib/old-api.js')

var PlainText = require('./plain-text')

describe('PlainText', function () {
  var window

  var $ = function (selector) {
    return window.document.querySelector(selector)
  }
  var trigger = function (el, ev) {
    var e = window.document.createEvent('UIEvents')
    e.initEvent(ev, true, true)
    el.dispatchEvent(e)
  }

  before(function (done) {
    jsdom.env({
      virtualConsole: jsdom.createVirtualConsole().sendTo(console),
      html:
      `<html>
        <head></head>
        <body>
          <textarea></textarea>
          <button id="save">Save</button>
          <button id="load">Load</button>
        </body>
      </html>`,
      done: function (errors, win) {
        if (errors) return done(errors)
        require('sclib/dev').setJsdomGlobal(window = win)
        done()
      }
    })
  })
  it('works', function (done) {
    let saveBtn = $('#save')
    let loadBtn = $('#load')
    let ta = $('textarea')
    ta.value = 'xxx'
    expect(ta.value).not.to.be.null;
    expect(ta.value).to.equal('xxx')

    let plainText = Object.create(PlainText).init(window.document.body)
    expect(plainText.echo('abc')).to.equal('abc')
    trigger(saveBtn, 'click')
    expect(ta.value).to.equal('xxx')

    ta.value = 'yyy'
    expect(ta.value).to.equal('yyy')

    trigger(loadBtn, 'click')
    expect(ta.value).to.equal('xxx')
    done()
  })
})
