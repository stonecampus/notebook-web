'use strict'
/* global localStorage */

var PlainText = {
  init: function (elem) {
    this.elem = elem

    var doc = elem.ownerDocument
    var saveBtn = doc.querySelector('button#save')
    var loadBtn = doc.querySelector('button#load')
    var ta = doc.querySelector('textarea')

    saveBtn.addEventListener('click', function (e) {
      localStorage.setItem('plain-text', ta.value)
    })
    loadBtn.addEventListener('click', function (e) {
      ta.value = localStorage.getItem('plain-text') || ''
    })

    return this
  },

  echo: function (x) {
    return x
  }
}

module.exports = PlainText
