'use strict'

function PlainText(elem) {
  return Object.create(PlainTextPrototype).init(elem);
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

var PlainTextPrototype = {
  init: function(elem) {
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

    return this;
  },

  echo: function(x) {
    return x;
  },
};

typeof module === 'undefined' || (module.exports = PlainText);
