var toUnix = require('unix-timestamp')
var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/:value', function(req, res) {
  const value = req.params.value
  let year, month, day
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  // assume value is unix
  let unix = Number(value)
  let fullDate = new Date(unix*1000)
  year = fullDate.getFullYear()
  month = months[fullDate.getMonth()]
  day = fullDate.getDate()
  if (String(fullDate) !== 'Invalid Date') {
    res.send({ 'unix': unix, 'natural': month + " " + day + ", " + year })
  }

  // if not, then value is string
  else {
    let unix = toUnix.fromDate(value)
    if (String(unix) !== 'NaN') {
      let fullDate = new Date(unix*1000)
      year = fullDate.getFullYear()
      month = months[fullDate.getMonth()]
      day = fullDate.getDate()
      res.send({ 'unix': unix, 'natural': month + " " + day + ", " + year })
    } else {
      res.send({ 'unix': null, 'natural': null })
    }
  }

})

app.listen(process.env.PORT || 1000)
