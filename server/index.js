var apiKeys = require('./apiKeys');
var Linkedin = require('node-linkedin')(apiKeys.CLIENT_ID, apiKeys.CLIENT_SECRET, 'http://localhost:3000/auth/linkedin/callback');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.get('/auth/linkedin', function(req, res) {
  var scope = ['r_basicprofile'];
  Linkedin.auth.authorize(res, scope);
});

app.get('/auth/linkedin/callback/', function(req, res) {
  Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
    if ( err ) {
      res.sendStatus(400);
      return console.error(err);
    }

    console.log(results);

    var linkedin = Linkedin.init(results.access_token);
    linkedin.people.me(['id', 'first-name', 'last-name', 'picture-urls::(original)'], function(err, $in) {
      console.log($in);
      // Loads the profile of access token owner.
    });
    // linkedin.connections.retrieve(function(err, connections) {
    //   debugger;
    // });
    return res.redirect('/');
  });
});

app.listen('3000', function () {
  console.log('listening on 3000');
});

module.exports = app;
