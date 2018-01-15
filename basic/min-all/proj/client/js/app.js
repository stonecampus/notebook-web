require('../less/site.less');

var PlainText = require('./plain-text');

document.addEventListener('DOMContentLoaded', function (event) {
  console.log('The page is loaded and ready to perform JS actions.');
  PlainText();
});
