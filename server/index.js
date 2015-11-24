var apiKeys = require('./apiKeys');
var Linkedin = require('node-linkedin')(apiKeys.CLIENT_ID, apiKeys.CLIENT_SECRET, '/auth/linkedin/callback/');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.listen('3000', function () {
  console.log('listening on 3000');
});

module.exports = app;
