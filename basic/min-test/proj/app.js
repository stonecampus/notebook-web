
var express = require('express')
var app = express()

var cache = {}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/get', function (req, res) {
  res.send(cache[req.query.key])
})

app.post('/set', function (req, res) {
  var query = req.query
  Object.keys(query).forEach(function (key) {
    cache[key] = query[key]
  })
  res.status(200).end()
})

if (!module.parent) {
  app.listen(9000, function () {
    console.log('We are listening on port 9000')
  })
}

module.exports = app
