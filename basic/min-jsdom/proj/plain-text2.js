'use strict'

function PlainText(elem) {
  return new PlainTextClassic(elem);
}

var ls = typeof localStorage !== 'undefined' ? localStorage : {
  vals: {},
  setItem: function(key, val) {
    ls.vals[key] = val;
  },
  getItem: function(key) {
    return ls.vals[key];
  }
};

function PlainTextClassic(elem) {
  this.elem = elem;

  var doc = elem.ownerDocument;
  var saveBtn = doc.querySelector('button#save')
  var loadBtn = doc.querySelector('button#load')
  var ta = doc.querySelector('textarea')

  saveBtn.addEventListener('click', function(e) {
    ls.setItem('plain-text', ta.value)
  })
  loadBtn.addEventListener('click', function(e) {
    ta.value = ls.getItem('plain-text') || ''
  })
}

PlainTextClassic.prototype.echo = function(x) {
  return x;
};

typeof module === 'undefined' || (module.exports = PlainText);
