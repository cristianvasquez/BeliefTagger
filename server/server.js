// server.js

// set up ========================
var express = require('express');
var app = express(); // This is an express ap
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)

// options =================
var argv = require('optimist')
    .default('port', 8080)
    .argv;
// configuration =================

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// static stuff -------------------------------------------------------------
app.use(express.static('app'));
app.use(express.static('server/rdf'));

// listen (start app with node server.js) ======================================
app.listen(argv.port);
console.log("App listening on port " + argv.port);

// api ---------------------------------------------------------------------

