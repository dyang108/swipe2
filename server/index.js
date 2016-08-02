var express = require('express')
var app = express()
var path = require('path')

require('./config')(app)

require('./models')(app)

app.use('/api', require('./api'))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.set('port', (process.env.PORT || 4000))
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})
