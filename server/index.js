var express = require('express')
var app = express()
var path = require('path')

require('./config')(app)

require('./models')(app)

app.use('/api', require('./api'))

app.get('/*', function (req, res) {
  // console.log(process.env.NODE_ENV)
  // if (process.env.NODE_ENV === 'production') {
  //   res.sendFile(path.join(__dirname, '../client/index.html'))
  // } else if (process.env.NODE_ENV === 'development') {
  res.sendFile(path.join(__dirname, '../client/index.html'))
  // } else {
  //   res.send('Environment not defined')
  // }
})

app.set('port', (process.env.PORT || 4000))
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})
