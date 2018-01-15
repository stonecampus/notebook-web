
function PlainText () {
  var $ = function (selector) {
    return document.querySelector(selector);
  };

  var saveBtn = $('button#save');
  var loadBtn = $('button#load');
  var ta = $('textarea');
  var ls = window.localStorage || {
    vals: {},
    setItem: function (key, val) {
      ls.vals[key] = val;
    },
    getItem: function (key) {
      return ls.vals[key];
    }
  };

  saveBtn.addEventListener('click', function (e) {
    ls.setItem('plain-text', ta.value);
  });
  loadBtn.addEventListener('click', function (e) {
    ta.value = ls.getItem('plain-text') || '';
  });

  return {
    echo: function (x) {
      return x;
    }
  };
}

module.exports = PlainText;
